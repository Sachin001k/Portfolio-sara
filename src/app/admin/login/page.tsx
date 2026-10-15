import { redirect } from "next/navigation";
import { getAdminState } from "@/lib/admin";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if ((await getAdminState()).status === "admin") redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-sand/50 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-cream p-8 shadow-sm">
        <h1 className="font-display text-3xl">Admin sign in</h1>
        <p className="mt-1 text-sm text-ink/60">
          Edit the text, photos and videos on the portfolio.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
