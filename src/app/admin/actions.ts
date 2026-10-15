"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { SiteContent } from "@/content/site";
import { requireAdmin } from "@/lib/admin";
import {
  CONTENT_BUCKET,
  CONTENT_PATH,
  CONTENT_TAG,
  MEDIA_BUCKET,
  ensureBuckets,
} from "@/lib/content";
import { createAuthClient } from "@/lib/supabase/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function signIn(
  _prev: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  const supabase = await createAuthClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (error) {
    // 400 = bad credentials; anything else means Supabase itself failed.
    return error.status === 400
      ? { error: "Wrong email or password." }
      : { error: "Couldn't reach the login service. Try again shortly." };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createAuthClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

const REQUIRED_KEYS: (keyof SiteContent)[] = [
  "siteConfig",
  "about",
  "research",
  "ballet",
  "movementLiteracy",
  "schoolRoles",
  "internship",
  "awards",
];

export async function saveContent(
  content: SiteContent,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Your session expired — sign in again." };
  }

  const missing = REQUIRED_KEYS.filter(
    (key) => typeof content?.[key] !== "object" || content[key] === null,
  );
  if (missing.length > 0) {
    return { ok: false, error: `Missing sections: ${missing.join(", ")}` };
  }

  try {
    await ensureBuckets();
    const { error } = await supabaseAdmin.storage
      .from(CONTENT_BUCKET)
      .upload(CONTENT_PATH, JSON.stringify(content, null, 2), {
        upsert: true,
        contentType: "application/json",
        cacheControl: "0",
      });
    if (error) throw error;
  } catch (err) {
    return {
      ok: false,
      error: `Couldn't save: ${err instanceof Error ? err.message : String(err)}`,
    };
  }

  updateTag(CONTENT_TAG);
  revalidatePath("/");
  return { ok: true };
}

const ALLOWED_TYPES = /^(image\/|video\/|application\/pdf$)/;

/**
 * Returns a one-time signed URL the browser uploads a file to directly —
 * large videos would exceed the request size limit if sent through here.
 */
export async function createUpload(
  fileName: string,
  contentType: string,
): Promise<
  | { ok: true; path: string; token: string; publicUrl: string }
  | { ok: false; error: string }
> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Your session expired — sign in again." };
  }
  if (!ALLOWED_TYPES.test(contentType)) {
    return { ok: false, error: "Only images, videos and PDFs can be uploaded." };
  }

  const safeName =
    fileName
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/^-+|-+$/g, "") || "file";
  const path = `uploads/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID().slice(0, 8)}-${safeName}`;

  try {
    await ensureBuckets();
    const { data, error } = await supabaseAdmin.storage
      .from(MEDIA_BUCKET)
      .createSignedUploadUrl(path);
    if (error) throw error;
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(path);
    return { ok: true, path, token: data.token, publicUrl };
  } catch (err) {
    return {
      ok: false,
      error: `Upload failed: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
