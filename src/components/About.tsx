import { about, siteConfig } from "@/content/site";

export function About() {
  return (
    <section id="about" className="bg-sand/60 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-4xl">{about.heading}</h2>

        <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/80">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <a
          href={siteConfig.resumeUrl}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-clay-dark underline decoration-clay/40 underline-offset-4 transition-colors hover:text-clay"
        >
          View résumé →
        </a>
      </div>
    </section>
  );
}
