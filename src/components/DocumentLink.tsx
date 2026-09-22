"use client";

import { useRef } from "react";

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

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="rounded-full border border-clay/30 bg-clay/10 px-4 py-1.5 text-sm font-medium text-clay-dark transition-colors hover:bg-clay/20"
      >
        {doc.title} ↗
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto h-[85vh] w-[min(90vw,60rem)] rounded-2xl bg-cream p-0 backdrop:bg-ink/80"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
            <h3 className="font-display text-lg">{doc.title}</h3>
            <div className="flex items-center gap-3">
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
          <iframe src={doc.href} title={doc.title} className="flex-1" />
        </div>
      </dialog>
    </>
  );
}
