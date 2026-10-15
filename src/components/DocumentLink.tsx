"use client";

import { useRef, useState } from "react";
import { PdfReader } from "@/components/PdfReader";

export type DocumentItem = { title: string; href: string };

export function DocumentLinks({ documents }: { documents: DocumentItem[] }) {
  if (documents.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {documents.map((doc) => (
        <DocumentLink key={doc.href} document={doc} />
      ))}
    </div>
  );
}

function DocumentLink({ document: doc }: { document: DocumentItem }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Only load the PDF once the reader is opened, not on page load.
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          dialogRef.current?.showModal();
        }}
        className="rounded-full border border-clay/30 bg-clay/10 px-4 py-1.5 text-sm font-medium text-clay-dark transition-colors hover:bg-clay/20"
      >
        {doc.title} ↗
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setIsOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto h-[90vh] w-[min(94vw,56rem)] overflow-hidden rounded-2xl bg-sand p-0 shadow-2xl backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-ink/10 bg-cream px-5 py-3">
            <h3 className="min-w-0 truncate font-display text-lg">{doc.title}</h3>
            <div className="flex shrink-0 items-center gap-3">
              <a
                href={doc.href}
                download
                className="rounded-full bg-clay px-4 py-1.5 text-sm font-semibold text-cream transition-colors hover:bg-clay-dark"
              >
                Download
              </a>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isOpen && <PdfReader src={doc.href} />}
          </div>
        </div>
      </dialog>
    </>
  );
}
