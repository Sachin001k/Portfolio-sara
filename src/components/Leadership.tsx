import { DocumentLinks } from "@/components/DocumentLink";
import { Gallery } from "@/components/Gallery";
import type {
  Internship,
  SchoolRoleItem,
  TspClub,
} from "@/content/site";

export function Leadership({
  schoolRoles,
  tspClub,
  internship,
}: {
  schoolRoles: SchoolRoleItem[];
  tspClub: TspClub;
  internship: Internship;
}) {
  return (
    <section id="leadership" className="bg-sand/60 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-4xl">Leadership &amp; Entrepreneurship</h2>

        <h3 className="mt-10 font-display text-xl text-ink/70">
          School Leadership
        </h3>
        <div className="mt-4 grid items-start gap-6 sm:grid-cols-2">
          {schoolRoles.map((item) => {
            // Roles with a big gallery get the full row so photos stay a
            // readable size instead of making one very tall card.
            const wide = item.gallery.length > 4;
            return (
              <div
                key={item.role}
                className={`overflow-hidden rounded-2xl border border-ink/10 bg-cream p-4 sm:p-5 ${wide ? "sm:col-span-2" : ""}`}
              >
                <h4 className="font-display text-lg">{item.role}</h4>
                {item.context && (
                  <p className="mt-1 max-w-3xl text-sm text-ink/65">
                    {item.context}
                  </p>
                )}
                {item.gallery.length > 0 && (
                  <div className="mt-4">
                    <Gallery
                      items={item.gallery}
                      columns={
                        wide
                          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                          : item.gallery.length > 1
                            ? "grid-cols-2"
                            : "grid-cols-1"
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
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
            <DocumentLinks documents={tspClub.documents} />
            <div className="mt-5">
              <Gallery items={tspClub.gallery} />
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl text-ink/70">Internship</h3>
            <h4 className="mt-3 font-display text-2xl">{internship.title}</h4>
            <p className="mt-3 leading-relaxed text-ink/75">
              {internship.description}
            </p>
            <DocumentLinks documents={internship.documents} />
          </div>
        </div>
      </div>
    </section>
  );
}
