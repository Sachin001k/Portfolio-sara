"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

export function Gallery({
  items,
  columns = "grid-cols-2 sm:grid-cols-3",
}: {
  items: MediaItem[];
  columns?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  if (items.length === 0) return null;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) =>
    setIndex((i) => (i + delta + items.length) % items.length);

  const active = items[index];

  return (
    <>
      <div className={`grid gap-4 ${columns}`}>
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => open(i)}
            className="group overflow-hidden rounded-2xl border border-ink/10 bg-cream p-1.5 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-sand">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 90vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <>
                  <Image
                    src={item.poster}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 90vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/30">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/90 text-base text-ink">
                      ▶
                    </span>
                  </span>
                </>
              )}
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto w-[min(90vw,56rem)] rounded-2xl bg-ink p-0 backdrop:bg-ink/80"
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-sm font-semibold text-ink"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="relative h-[80vh] w-full overflow-hidden rounded-t-2xl bg-black">
            {active?.type === "image" ? (
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            ) : active ? (
              <video
                key={active.src}
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            ) : null}
          </div>

          {items.length > 1 && (
            <div className="flex items-center justify-between px-4 py-3 text-sm font-medium text-cream/80">
              <button type="button" onClick={() => step(-1)} className="hover:text-cream">
                ← Previous
              </button>
              <span>
                {index + 1} / {items.length}
              </span>
              <button type="button" onClick={() => step(1)} className="hover:text-cream">
                Next →
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
