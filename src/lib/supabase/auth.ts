import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Per-request Supabase client that reads/writes the admin's login session
// cookies. Uses the anon key — data writes go through supabaseAdmin after
// requireAdmin() has checked the user.
export async function createAuthClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component, where cookies are read-only;
            // the proxy refreshes the session instead.
          }
        },
      },
    },
  );
}
