import { hasContact, type SiteConfig } from "@/content/site";

export function Contact({ config: siteConfig }: { config: SiteConfig }) {
  if (!hasContact(siteConfig)) return null;

  return (
    <section id="contact" className="bg-ink py-20 text-cream">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl">Let&apos;s connect</h2>
        <p className="mt-4 text-lg text-cream/75">
          Have an idea, opportunity, or just want to say hi? My inbox is
          always open.
        </p>

        {siteConfig.email && (
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-8 inline-block rounded-full bg-clay px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-dark"
          >
            {siteConfig.email}
          </a>
        )}

        {siteConfig.socials.length > 0 && (
          <div className="mt-8 flex justify-center gap-6 text-sm font-medium text-cream/75">
            {siteConfig.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream"
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
