"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { DocumentItem } from "@/components/DocumentLink";
import type { MediaItem } from "@/components/Gallery";
import { uploadFile, uploadMedia } from "./upload";

// Small building blocks for the admin editor. Every field is controlled:
// it gets a value and reports the whole new value through onChange.

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm leading-relaxed outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20";
const smallButton =
  "rounded-full border border-ink/15 bg-white px-3 py-1 text-xs font-medium transition hover:border-ink/40 disabled:opacity-40";

export function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5 rounded-2xl border border-ink/10 bg-cream p-5 sm:p-7">
      <header>
        <h2 className="font-display text-2xl">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-ink/60">{description}</p>
        )}
      </header>
      {children}
    </section>
  );
}

export function TextField({
  label,
  value,
  onChange,
  multiline,
  rows = 4,
  hint,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
      {hint && <span className="mt-1 block text-xs text-ink/50">{hint}</span>}
    </label>
  );
}

function move<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function ReorderButtons({
  index,
  count,
  onMove,
  onRemove,
  removeLabel = "Remove",
}: {
  index: number;
  count: number;
  onMove: (to: number) => void;
  onRemove: () => void;
  removeLabel?: string;
}) {
  return (
    // preventDefault stops a click here from also opening/closing the
    // surrounding <details> when these sit inside its <summary>.
    <div className="flex shrink-0 gap-1.5" onClick={(e) => e.preventDefault()}>
      <button
        type="button"
        className={smallButton}
        disabled={index === 0}
        onClick={() => onMove(index - 1)}
        aria-label="Move up"
      >
        ↑
      </button>
      <button
        type="button"
        className={smallButton}
        disabled={index === count - 1}
        onClick={() => onMove(index + 1)}
        aria-label="Move down"
      >
        ↓
      </button>
      <button
        type="button"
        className={`${smallButton} text-clay-dark`}
        onClick={() => {
          if (confirm(`${removeLabel}?`)) onRemove();
        }}
      >
        {removeLabel}
      </button>
    </div>
  );
}

export function StringList({
  label,
  items,
  onChange,
  multiline,
  addLabel = "Add",
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  multiline?: boolean;
  addLabel?: string;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            {multiline ? (
              <textarea
                value={item}
                rows={4}
                onChange={(e) =>
                  onChange(items.map((x, j) => (j === i ? e.target.value : x)))
                }
                className={inputClass}
              />
            ) : (
              <input
                value={item}
                onChange={(e) =>
                  onChange(items.map((x, j) => (j === i ? e.target.value : x)))
                }
                className={inputClass}
              />
            )}
            <ReorderButtons
              index={i}
              count={items.length}
              onMove={(to) => onChange(move(items, i, to))}
              onRemove={() => onChange(items.filter((_, j) => j !== i))}
              removeLabel="✕"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className={`${smallButton} mt-2`}
        onClick={() => onChange([...items, ""])}
      >
        + {addLabel}
      </button>
    </div>
  );
}

/** A list of cards (research projects, awards, ...) that can be reordered. */
export function ItemList<T>({
  items,
  onChange,
  newItem,
  itemTitle,
  addLabel,
  renderItem,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  itemTitle: (item: T) => string;
  addLabel: string;
  renderItem: (item: T, setItem: (item: T) => void) => ReactNode;
}) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-xl border border-ink/10 bg-sand/40"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
            <span className="min-w-0 truncate font-display text-lg">
              <span className="mr-2 inline-block text-ink/40 transition group-open:rotate-90">
                ▸
              </span>
              {itemTitle(item) || "Untitled"}
            </span>
            <ReorderButtons
              index={i}
              count={items.length}
              onMove={(to) => onChange(move(items, i, to))}
              onRemove={() => onChange(items.filter((_, j) => j !== i))}
            />
          </summary>
          <div className="space-y-5 border-t border-ink/10 px-4 py-5">
            {renderItem(item, (next) =>
              onChange(items.map((x, j) => (j === i ? next : x))),
            )}
          </div>
        </details>
      ))}
      <button
        type="button"
        className={smallButton}
        onClick={() => onChange([...items, newItem()])}
      >
        + {addLabel}
      </button>
    </div>
  );
}

/**
 * Uploads finish after the user may have kept editing, so their callbacks
 * must append to the *current* list via the *current* onChange — not the
 * ones captured when the upload started.
 */
function useLatest<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}

/** Tracks in-flight uploads and their errors for one field. */
function useUploader() {
  const [busy, setBusy] = useState(0);
  const [error, setError] = useState<string | null>(null);
  async function run<T>(task: () => Promise<T>): Promise<T | null> {
    setBusy((n) => n + 1);
    setError(null);
    try {
      return await task();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return null;
    } finally {
      setBusy((n) => n - 1);
    }
  }
  const status =
    busy > 0 ? (
      <span className="animate-pulse text-xs text-ink/60">
        Uploading {busy} {busy === 1 ? "file" : "files"}…
      </span>
    ) : error ? (
      <span className="text-xs text-red-700">{error}</span>
    ) : null;
  return { run, status, busy: busy > 0 };
}

function FilePicker({
  accept,
  multiple,
  label,
  disabled,
  onFiles,
}: {
  accept: string;
  multiple?: boolean;
  label: string;
  disabled?: boolean;
  onFiles: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="rounded-full bg-clay px-4 py-1.5 text-sm font-semibold text-cream transition hover:bg-clay-dark disabled:opacity-50"
      >
        {label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(e) => {
          const files = [...(e.target.files ?? [])];
          e.target.value = "";
          if (files.length) onFiles(files);
        }}
      />
    </>
  );
}

function Thumb({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-sand">
      {src && (
        <Image src={src} alt={alt} fill sizes="200px" className="object-cover" />
      )}
    </span>
  );
}

export function MediaListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: MediaItem[];
  onChange: (items: MediaItem[]) => void;
}) {
  const { run, status, busy } = useUploader();
  const latest = useLatest({ items, onChange });

  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.src}
              className="space-y-2 rounded-xl border border-ink/10 bg-white p-2"
            >
              <div className="relative">
                <Thumb
                  src={item.type === "video" ? item.poster : item.src}
                  alt={item.alt}
                />
                {item.type === "video" && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-semibold text-cream">
                    ▶ Video
                  </span>
                )}
              </div>
              <input
                value={item.alt}
                placeholder="Describe this (for accessibility)"
                onChange={(e) =>
                  onChange(
                    items.map((x, j) =>
                      j === i ? { ...x, alt: e.target.value } : x,
                    ),
                  )
                }
                className={`${inputClass} py-1 text-xs`}
              />
              <div className="flex justify-between gap-1">
                <button
                  type="button"
                  className={smallButton}
                  disabled={i === 0}
                  onClick={() => onChange(move(items, i, i - 1))}
                  aria-label="Move left"
                >
                  ←
                </button>
                <button
                  type="button"
                  className={`${smallButton} text-clay-dark`}
                  onClick={() => {
                    if (confirm("Remove from this gallery?"))
                      onChange(items.filter((_, j) => j !== i));
                  }}
                >
                  Remove
                </button>
                <button
                  type="button"
                  className={smallButton}
                  disabled={i === items.length - 1}
                  onClick={() => onChange(move(items, i, i + 1))}
                  aria-label="Move right"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <FilePicker
          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
          multiple
          label="+ Add photos / videos"
          disabled={busy}
          onFiles={(files) =>
            files.forEach((file) =>
              run(() => uploadMedia(file)).then((item) => {
                if (item)
                  latest.current.onChange([...latest.current.items, item]);
              }),
            )
          }
        />
        {status}
      </div>
    </div>
  );
}

export function DocumentListEditor({
  items,
  onChange,
}: {
  items: DocumentItem[];
  onChange: (items: DocumentItem[]) => void;
}) {
  const { run, status, busy } = useUploader();
  const latest = useLatest({ items, onChange });

  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold">
        Documents (PDF)
      </span>
      <div className="space-y-2">
        {items.map((doc, i) => (
          <div
            key={doc.href}
            className="flex flex-wrap items-center gap-2 rounded-xl border border-ink/10 bg-white p-2"
          >
            <input
              value={doc.title}
              placeholder="Button label"
              onChange={(e) =>
                onChange(
                  items.map((x, j) =>
                    j === i ? { ...x, title: e.target.value } : x,
                  ),
                )
              }
              className={`${inputClass} min-w-48 flex-1`}
            />
            <a
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-clay-dark underline"
            >
              View PDF
            </a>
            <ReorderButtons
              index={i}
              count={items.length}
              onMove={(to) => onChange(move(items, i, to))}
              onRemove={() => onChange(items.filter((_, j) => j !== i))}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <FilePicker
          accept="application/pdf"
          multiple
          label="+ Add PDF"
          disabled={busy}
          onFiles={(files) =>
            files.forEach((file) =>
              run(() => uploadFile(file, file.name)).then((href) => {
                if (href)
                  latest.current.onChange([
                    ...latest.current.items,
                    { title: file.name.replace(/\.pdf$/i, ""), href },
                  ]);
              }),
            )
          }
        />
        {status}
      </div>
    </div>
  );
}

/** A single uploaded file (an award image, the résumé PDF). */
export function FileField({
  label,
  value,
  onChange,
  accept,
  kind,
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept: string;
  kind: "image" | "pdf";
  hint?: string;
}) {
  const { run, status, busy } = useUploader();
  const latest = useLatest(onChange);
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <div className="flex flex-wrap items-center gap-3">
        {value && kind === "image" && (
          <span className="w-40">
            <Thumb src={value} alt={label} />
          </span>
        )}
        {value && kind === "pdf" && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-clay-dark underline"
          >
            View current PDF
          </a>
        )}
        <FilePicker
          accept={accept}
          label={value ? "Replace" : "Upload"}
          disabled={busy}
          onFiles={([file]) =>
            run(() => uploadFile(file, file.name)).then((url) => {
              if (url) latest.current(url);
            })
          }
        />
        {value && kind === "pdf" && (
          <button
            type="button"
            className={`${smallButton} text-clay-dark`}
            onClick={() => onChange("")}
          >
            Remove
          </button>
        )}
        {status}
      </div>
      {hint && <span className="mt-1 block text-xs text-ink/50">{hint}</span>}
    </div>
  );
}
