"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

// Renders a PDF as a column of "paper" pages on the site's own background,
// instead of the browser's built-in viewer (dark toolbar, thumbnails, etc).
// Pages are drawn lazily as they scroll near the viewport.
export function PdfReader({ src }: { src: string }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [ratios, setRatios] = useState<number[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: { destroy: () => Promise<void> } | null = null;

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const task = pdfjs.getDocument({ url: src });
        loadingTask = task;
        const doc = await task.promise;
        if (cancelled) return;
        // Size every page placeholder up front so the scrollbar is stable.
        const sizes = await Promise.all(
          Array.from({ length: doc.numPages }, async (_, i) => {
            const page = await doc.getPage(i + 1);
            const { width, height } = page.getViewport({ scale: 1 });
            return height / width;
          }),
        );
        if (cancelled) return;
        setRatios(sizes);
        setPdf(doc);
      } catch {
        if (!cancelled) setError(true);
      }
    })();

    return () => {
      cancelled = true;
      loadingTask?.destroy();
    };
  }, [src]);

  if (error) {
    return (
      <p className="p-10 text-center text-ink/60">
        This document couldn&apos;t be displayed. Try the Download button.
      </p>
    );
  }

  if (!pdf) {
    return (
      <p className="animate-pulse p-10 text-center text-sm text-ink/50">
        Loading document…
      </p>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 sm:px-8">
      {ratios.map((ratio, i) => (
        <PdfPage key={i} pdf={pdf} pageNumber={i + 1} ratio={ratio} />
      ))}
      <p className="pb-2 text-center text-xs text-ink/40">
        End of document · {ratios.length} {ratios.length === 1 ? "page" : "pages"}
      </p>
    </div>
  );
}

function PdfPage({
  pdf,
  pageNumber,
  ratio,
}: {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  ratio: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || rendered) return;

    let task: { cancel: () => void } | null = null;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const canvas = canvasRef.current;
        if (!canvas) return;
        const page = await pdf.getPage(pageNumber);
        const scale =
          (wrapper.clientWidth / page.getViewport({ scale: 1 }).width) *
          Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const renderTask = page.render({ canvas, viewport });
        task = renderTask;
        try {
          await renderTask.promise;
          setRendered(true);
        } catch {
          // cancelled when the reader closes mid-render
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      task?.cancel();
    };
  }, [pdf, pageNumber, rendered]);

  return (
    <div
      ref={wrapperRef}
      style={{ aspectRatio: `1 / ${ratio}` }}
      className="relative w-full overflow-hidden rounded-lg bg-white shadow-[0_2px_20px_-6px_rgba(36,31,28,0.25)] ring-1 ring-ink/5"
    >
      <canvas
        ref={canvasRef}
        aria-label={`Page ${pageNumber}`}
        className={`h-full w-full transition-opacity duration-300 ${rendered ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
