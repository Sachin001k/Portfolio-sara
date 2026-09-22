import { DocumentLinks } from "@/components/DocumentLink";
import { Gallery } from "@/components/Gallery";
import { research } from "@/content/site";

export function Research() {
  return (
    <section id="research" className="bg-sand/60 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-4xl">Research &amp; Innovation</h2>

        <div className="mt-10 space-y-12">
          {research.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-ink/10 bg-cream p-6 sm:p-8"
            >
              <span className="w-fit rounded-full bg-clay/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-clay-dark">
                {item.tag}
              </span>
              <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">
                {item.description}
              </p>

              {item.bullets.length > 0 && (
                <ul className="mt-4 space-y-1.5 text-sm text-ink/70">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-clay">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              <DocumentLinks documents={item.documents} />

              {item.gallery.length > 0 && (
                <div className="mt-6">
                  <Gallery items={item.gallery} />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
