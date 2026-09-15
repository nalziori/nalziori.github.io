import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Section } from "@/components/ui";
import { ui } from "@/data/profile";
import { levelLabels, skills, type Level } from "@/data/skills";
import { localePath, type Lang } from "@/lib/i18n";

const levelTone: Record<Level, string> = {
  shipped: "border-ink bg-ink text-bg",
  prototype: "border-ink text-ink",
  "in-progress": "border-accent/60 text-accent",
  coursework: "border-line-strong text-muted",
  planned: "border-dashed border-line-strong text-muted",
};

const LevelChip = ({ level, lang }: { level: Level; lang: Lang }) => (
  <span className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wider ${levelTone[level]}`}>
    {levelLabels[level][lang]}
  </span>
);

export function Skills({ lang }: { lang: Lang }) {
  return (
    <Section id="skills" n="06" title={ui.sections.skills[lang]} intro={ui.sections.skillsIntro[lang]}>
      <ul aria-label={lang === "ko" ? "수준 표시" : "Levels"} className="mb-8 flex flex-wrap gap-2">
        {(Object.keys(levelLabels) as Level[]).map((l) => (
          <li key={l}>
            <LevelChip level={l} lang={lang} />
          </li>
        ))}
      </ul>
      <div className="grid gap-6 lg:grid-cols-2">
        {skills.map((group) => (
          <Reveal key={group.category.en} className="rounded-xl border border-line bg-surface">
            <h3 className="kicker border-b border-line px-5 py-3.5">{group.category[lang]}</h3>
            <ul className="divide-y divide-line">
              {group.items.map((s) => (
                <li key={s.name.en} className="grid gap-2 px-5 py-3.5 sm:grid-cols-[1fr_auto] sm:gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">{s.name[lang]}</p>
                    {s.where.length > 0 && (
                      <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                        {s.where.map((w) =>
                          w.slug ? (
                            <Link
                              key={w.label.en}
                              href={localePath(lang, `/projects/${w.slug}/`)}
                              className="underline decoration-line-strong underline-offset-2 hover:text-ink hover:decoration-accent"
                            >
                              {w.label[lang]}
                            </Link>
                          ) : (
                            <span key={w.label.en}>{w.label[lang]}</span>
                          ),
                        )}
                      </p>
                    )}
                  </div>
                  <div className="sm:text-right">
                    <LevelChip level={s.level} lang={lang} />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
