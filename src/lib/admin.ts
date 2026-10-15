import "server-only";
import { createAuthClient } from "@/lib/supabase/auth";

// Supabase lets anyone sign up with the public anon key, so being logged in
// isn't enough: the email must also be listed in ADMIN_EMAILS.
function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export type AdminState =
  | { status: "signed-out" }
  | { status: "not-admin"; email: string }
  | { status: "admin"; email: string };

export async function getAdminState(): Promise<AdminState> {
  const supabase = await createAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return { status: "signed-out" };
  const email = user.email.toLowerCase();
  return adminEmails().includes(email)
    ? { status: "admin", email }
    : { status: "not-admin", email };
}

/** Throws unless the current request comes from a listed admin. */
export async function requireAdmin() {
  const state = await getAdminState();
  if (state.status !== "admin") throw new Error("Not authorized");
  return state;
}
