import { projects } from "@/content/site";

export function Projects() {
  return (
    <section id="projects" className="bg-sand/60 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl">Projects &amp; Community Involvement</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link ?? "#"}
              className="group flex flex-col rounded-2xl border border-ink/10 bg-cream p-6 transition-shadow hover:shadow-lg"
            >
              <span className="w-fit rounded-full bg-moss/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-moss">
                {project.tag}
              </span>
              <h3 className="mt-4 font-display text-xl">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                {project.description}
              </p>
              <span className="mt-4 text-sm font-semibold text-clay-dark transition-colors group-hover:text-clay">
                Learn more →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
