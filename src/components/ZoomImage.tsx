"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";

const ZOOM = 2.5;

/**
 * A full-size image inside a lightbox. Click/tap to magnify at that spot,
 * move the mouse (or drag a finger) to look around, click again to reset.
 */
export function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  // Where the pointer went down, so a drag (panning on touch screens)
  // isn't mistaken for a tap that toggles the zoom.
  const downAt = useRef<{ x: number; y: number } | null>(null);

  function pointAt(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${origin ? "cursor-zoom-out touch-none" : "cursor-zoom-in"}`}
      onPointerDown={(e) => {
        downAt.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const start = downAt.current;
        downAt.current = null;
        const dragged =
          start &&
          Math.hypot(e.clientX - start.x, e.clientY - start.y) > 8;
        if (!dragged) setOrigin(origin ? null : pointAt(e));
      }}
      onPointerMove={(e) => {
        if (origin) setOrigin(pointAt(e));
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        // Request a sharp enough file to stay crisp when magnified.
        sizes="100vw"
        quality={90}
        draggable={false}
        className="select-none object-contain transition-transform duration-200 ease-out"
        style={{
          transform: origin ? `scale(${ZOOM})` : undefined,
          transformOrigin: origin ? `${origin.x}% ${origin.y}%` : undefined,
        }}
      />
      {!origin && (
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink/60 px-3 py-1 text-xs text-cream/90">
          <span className="pointer-coarse:hidden">Click to zoom</span>
          <span className="hidden pointer-coarse:inline">Tap to zoom</span>
        </span>
      )}
    </div>
  );
}

/**
 * Wraps any image so clicking it opens a lightbox with the zoomable
 * full-size version. Used where there's a single image (hero, awards).
 */
export function ZoomableImage({
  src,
  alt,
  className,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          dialogRef.current?.showModal();
        }}
        className={`group block cursor-zoom-in ${className ?? ""}`}
        aria-label={`View larger: ${alt}`}
      >
        {children}
      </button>
      <dialog
        ref={dialogRef}
        onClose={() => setIsOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto w-[min(94vw,64rem)] overflow-hidden rounded-2xl bg-black p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        <div className="relative h-[85vh] w-full">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-sm font-semibold text-ink"
            aria-label="Close"
          >
            ✕
          </button>
          {isOpen && <ZoomImage src={src} alt={alt} />}
        </div>
      </dialog>
    </>
  );
}
