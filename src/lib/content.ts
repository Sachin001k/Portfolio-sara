import "server-only";
import { defaultContent, type SiteContent } from "@/content/site";
import { supabaseAdmin } from "@/lib/supabase/server";

// Edited content lives as one JSON file in a private Supabase Storage
// bucket; uploaded photos/videos/PDFs go in a public one.
export const CONTENT_BUCKET = "site-content";
export const CONTENT_PATH = "content.json";
export const MEDIA_BUCKET = "site-media";
export const CONTENT_TAG = "site-content";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Saved content is layered over the defaults in src/content/site.ts, so a
// section added to the code later still shows up before anyone edits it.
function withDefaults(stored: Partial<SiteContent>): SiteContent {
  return { ...defaultContent, ...stored };
}

async function fetchContent(init: RequestInit): Promise<SiteContent> {
  try {
    const res = await fetch(
      `${supabaseUrl}/storage/v1/object/${CONTENT_BUCKET}/${CONTENT_PATH}`,
      {
        ...init,
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
      },
    );
    // Nothing saved yet (or bucket not created yet): use the defaults.
    if (!res.ok) return defaultContent;
    return withDefaults(await res.json());
  } catch {
    // Supabase unreachable — keep the site up with the defaults.
    return defaultContent;
  }
}

/** Content for the public site, cached until the admin panel saves. */
export function getContent() {
  return fetchContent({
    cache: "force-cache",
    next: { tags: [CONTENT_TAG] },
  });
}

/** Uncached read for the admin editor, so it never edits a stale copy. */
export function getContentFresh() {
  return fetchContent({ cache: "no-store" });
}

let bucketsReady: Promise<void> | null = null;

/** Creates the two storage buckets on first use if they don't exist. */
export function ensureBuckets() {
  bucketsReady ??= (async () => {
    const { data, error } = await supabaseAdmin.storage.listBuckets();
    if (error) throw error;
    const existing = new Set(data.map((b) => b.name));
    if (!existing.has(CONTENT_BUCKET)) {
      const { error } = await supabaseAdmin.storage.createBucket(
        CONTENT_BUCKET,
        { public: false },
      );
      if (error) throw error;
    }
    if (!existing.has(MEDIA_BUCKET)) {
      const { error } = await supabaseAdmin.storage.createBucket(MEDIA_BUCKET, {
        public: true,
        fileSizeLimit: "50MB",
        allowedMimeTypes: ["image/*", "video/*", "application/pdf"],
      });
      if (error) throw error;
    }
  })().catch((err) => {
    bucketsReady = null;
    throw err;
  });
  return bucketsReady;
}
