import Image from "next/image";
import { hasContact, type SiteConfig } from "@/content/site";

export function Hero({ config: siteConfig }: { config: SiteConfig }) {
  const initial = siteConfig.name.charAt(0).toUpperCase();

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24">
      <div>
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-clay">
          {siteConfig.pronouns}
        </p>

        <h1 className="font-display text-5xl leading-tight sm:text-6xl md:text-7xl">
          Hi, I&apos;m {siteConfig.name}.
        </h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {siteConfig.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink/15 bg-sand px-4 py-1.5 text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80">
          {siteConfig.heroIntro}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#research"
            className="rounded-full bg-clay px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-dark"
          >
            See my work
          </a>
          {hasContact(siteConfig) && (
            <a
              href="#contact"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-ink/40"
            >
              Get in touch
            </a>
          )}
        </div>
      </div>

      {siteConfig.photo ? (
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-sand shadow-[0_20px_50px_-20px_rgba(36,31,28,0.35)]">
          <Image
            src={siteConfig.photo}
            alt={siteConfig.name}
            fill
            priority
            sizes="(min-width: 768px) 24rem, 90vw"
            className="object-cover object-[50%_25%]"
          />
        </div>
      ) : (
        <div className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-sand via-clay/20 to-moss/20">
          <span className="font-display text-9xl text-clay-dark/70">
            {initial}
          </span>
        </div>
      )}
    </section>
  );
}
