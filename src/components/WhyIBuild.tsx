"use client";

import { useRef, useState } from "react";
import type { PitchVideo } from "@/content/site";

export function WhyIBuild({ pitch }: { pitch: PitchVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Show our own play button until the first play; after that the
  // browser's controls take over (pause, scrub, volume, fullscreen).
  const [started, setStarted] = useState(false);

  if (!pitch.video) return null;

  return (
    <section id="why-i-build" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-ink/10 bg-gradient-to-br from-sand via-cream to-clay/10 p-6 shadow-[0_30px_60px_-30px_rgba(36,31,28,0.35)] sm:p-10 md:grid-cols-[1fr_auto] md:gap-14 md:p-14">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">
              {pitch.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              {pitch.heading}
            </h2>
            {pitch.description && (
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/75">
                {pitch.description}
              </p>
            )}
          </div>

          <div className="relative mx-auto aspect-[9/16] w-full max-w-[17rem] overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_25px_50px_-15px_rgba(36,31,28,0.5)] ring-8 ring-cream sm:max-w-[19rem]">
            <video
              ref={videoRef}
              src={pitch.video}
              poster={pitch.poster}
              preload="none"
              playsInline
              controls={started}
              onPlay={() => setStarted(true)}
              className="h-full w-full object-cover"
            />
            {!started && (
              <button
                type="button"
                onClick={() => videoRef.current?.play()}
                className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-ink/50 via-transparent to-transparent"
                aria-label={`Play video: ${pitch.heading}`}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 text-xl text-clay-dark shadow-lg transition-transform group-hover:scale-110">
                  ▶
                </span>
                {pitch.duration && (
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink/60 px-3 py-1 text-xs font-medium text-cream">
                    {pitch.duration}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
