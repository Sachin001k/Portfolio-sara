import { experience } from "@/content/site";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="font-display text-4xl">Work Experience</h2>

      <ol className="mt-10 space-y-10 border-l border-ink/15 pl-8">
        {experience.map((item) => (
          <li key={`${item.role}-${item.org}`} className="relative">
            <span className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full bg-clay" />
            <p className="text-sm font-medium uppercase tracking-wide text-ink/50">
              {item.period}
            </p>
            <h3 className="mt-1 font-display text-2xl">{item.role}</h3>
            <p className="text-sm font-semibold text-clay-dark">{item.org}</p>
            <p className="mt-2 leading-relaxed text-ink/75">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
