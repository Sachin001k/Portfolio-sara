import { redirect } from "next/navigation";
import { getAdminState } from "@/lib/admin";
import { getContentFresh } from "@/lib/content";
import { signOut } from "./actions";
import { AdminEditor } from "./AdminEditor";

export default async function AdminPage() {
  const state = await getAdminState();
  if (state.status === "signed-out") redirect("/admin/login");

  if (state.status === "not-admin") {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-display text-3xl">No access</h1>
        <p className="mt-3 text-ink/70">
          {state.email} isn&apos;t on the admin list. Ask the site owner to
          add it to <code>ADMIN_EMAILS</code>.
        </p>
        <form action={signOut} className="mt-6">
          <button
            type="submit"
            className="rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold"
          >
            Sign out
          </button>
        </form>
      </main>
    );
  }

  return <AdminEditor initial={await getContentFresh()} email={state.email} />;
}
