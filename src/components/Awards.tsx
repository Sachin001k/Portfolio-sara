import Image from "next/image";
import { awards } from "@/content/site";

export function Awards() {
  return (
    <section id="awards" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-4xl">Awards &amp; Recognition</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((award) => (
          <div
            key={award.title}
            className="overflow-hidden rounded-2xl border border-ink/10 bg-sand/60"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={award.image}
                alt={award.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg">{award.title}</h3>
              <p className="mt-1 text-sm text-ink/65">{award.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
