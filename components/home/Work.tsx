import { Reveal } from "@/components/motion";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/ui";
import { ui } from "@/data/profile";
import { featured, others } from "@/data/projects";
import type { Lang } from "@/lib/i18n";

export function Featured({ lang }: { lang: Lang }) {
  return (
    <Section id="work" n="01" title={ui.sections.featured[lang]} intro={ui.sections.featuredIntro[lang]}>
      <ul className="grid gap-6 lg:grid-cols-12">
        {featured.map((p, i) => (
          <li key={p.slug} className={i === 0 ? "lg:col-span-12" : "lg:col-span-6"}>
            <Reveal className="h-full">
              <ProjectCard p={p} lang={lang} layout={i === 0 ? "wide" : "stack"} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Others({ lang }: { lang: Lang }) {
  return (
    <Section id="other" n="04" title={ui.sections.other[lang]}>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {others.map((p) => (
          <li key={p.slug}>
            <Reveal className="h-full">
              <ProjectCard p={p} lang={lang} layout="compact" />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
