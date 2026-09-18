import { media } from "@/content/site";

export function Media() {
  return (
    <section id="media" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-display text-4xl">In the Media</h2>

      <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {media.map((item) => (
          <li key={`${item.outlet}-${item.title}`}>
            <a
              href={item.url}
              className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-display text-xl">{item.title}</span>
              <span className="flex items-center gap-3 text-sm font-semibold text-clay-dark">
                {item.outlet}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
