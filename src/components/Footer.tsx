import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-ink py-6 text-center text-xs text-cream/50">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
    </footer>
  );
}
