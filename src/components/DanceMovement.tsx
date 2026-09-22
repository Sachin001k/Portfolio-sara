import { Gallery } from "@/components/Gallery";
import { ballet, movementLiteracy } from "@/content/site";

export function DanceMovement() {
  return (
    <section id="dance" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-4xl">Dance &amp; Movement</h2>

      <div className="mt-10 space-y-14">
        <div>
          <h3 className="font-display text-2xl">{ballet.heading}</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">
            {ballet.description}
          </p>
          <div className="mt-5">
            <Gallery items={ballet.gallery} columns="grid-cols-2 sm:grid-cols-3" />
          </div>
        </div>

        <div>
          <h3 className="font-display text-2xl">{movementLiteracy.heading}</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">
            {movementLiteracy.description}
          </p>
          <div className="mt-5">
            <Gallery items={movementLiteracy.gallery} columns="grid-cols-2 sm:grid-cols-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
