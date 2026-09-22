import Image from "next/image";
import { ballet, movementLiteracy } from "@/content/site";

export function DanceMovement() {
  return (
    <section id="dance" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-4xl">Dance &amp; Movement</h2>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl">{ballet.heading}</h3>
          <p className="mt-3 leading-relaxed text-ink/75">
            {ballet.description}
          </p>
          <video
            className="mt-5 aspect-[9/16] w-full max-w-xs rounded-2xl bg-ink object-cover"
            src={ballet.video.src}
            controls
            preload="none"
            poster={ballet.video.poster}
          />
        </div>

        <div>
          <h3 className="font-display text-2xl">{movementLiteracy.heading}</h3>
          <p className="mt-3 leading-relaxed text-ink/75">
            {movementLiteracy.description}
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {movementLiteracy.images.map((image) => (
              <div
                key={image.src}
                className="relative aspect-square overflow-hidden rounded-xl bg-sand"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
