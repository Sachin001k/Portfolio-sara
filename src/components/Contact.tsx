import { siteConfig } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="bg-ink py-20 text-cream">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl">Let&apos;s connect</h2>
        <p className="mt-4 text-lg text-cream/75">
          Have an idea, opportunity, or just want to say hi? My inbox is
          always open.
        </p>

        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-8 inline-block rounded-full bg-clay px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-dark"
        >
          {siteConfig.email}
        </a>

        <div className="mt-8 flex justify-center gap-6 text-sm font-medium text-cream/75">
          <a href={siteConfig.socials.instagram} className="hover:text-cream">
            Instagram
          </a>
          <a href={siteConfig.socials.linkedin} className="hover:text-cream">
            LinkedIn
          </a>
          <a href={siteConfig.socials.youtube} className="hover:text-cream">
            YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
