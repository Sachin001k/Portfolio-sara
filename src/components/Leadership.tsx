import Image from "next/image";
import { internship, schoolRoles, tspClub } from "@/content/site";

export function Leadership() {
  return (
    <section id="leadership" className="bg-sand/60 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-4xl">Leadership &amp; Entrepreneurship</h2>

        <h3 className="mt-10 font-display text-xl text-ink/70">
          School Leadership
        </h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {schoolRoles.map((item) => (
            <div
              key={item.role}
              className="overflow-hidden rounded-2xl border border-ink/10 bg-cream"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.role}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-display text-lg">{item.role}</h4>
                <p className="mt-1 text-sm text-ink/65">{item.context}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl text-ink/70">
              Club &amp; Community
            </h3>
            <h4 className="mt-3 font-display text-2xl">{tspClub.name}</h4>
            <p className="mt-3 leading-relaxed text-ink/75">
              {tspClub.description}
            </p>
            <div className="relative mt-5 aspect-video overflow-hidden rounded-2xl bg-sand">
              <Image
                src={tspClub.image.src}
                alt={tspClub.image.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl text-ink/70">Internship</h3>
            <h4 className="mt-3 font-display text-2xl">{internship.title}</h4>
            <p className="mt-3 leading-relaxed text-ink/75">
              {internship.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
