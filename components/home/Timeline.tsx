import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Section } from "@/components/ui";
import { ui } from "@/data/profile";
import { growth, phaseLabels, timeline, type Phase } from "@/data/timeline";
import { localePath, type Lang } from "@/lib/i18n";

// Tone deepens along the growth direction, from muted software work to accented agent/system work.
const chip: Record<Phase, string> = {
  early: "border-line-strong text-muted",
  product: "border-line-strong text-ink-2",
  research: "border-ink-2/50 text-ink-2",
  ai: "border-ink/60 text-ink",
  agents: "border-accent/60 text-accent",
  systems: "border-accent bg-accent-soft text-accent",
  base: "border-dashed border-line-strong text-muted",
};
const dot: Record<Phase, string> = {
  early: "bg-line-strong",
  product: "bg-muted",
  research: "bg-ink-2",
  ai: "bg-ink",
  agents: "bg-accent",
  systems: "bg-accent",
  base: "bg-line-strong",
};

export function Timeline({ lang }: { lang: Lang }) {
  return (
    <Section id="timeline" n="05" title={ui.sections.timeline[lang]} intro={ui.sections.timelineIntro[lang]}>
      <Reveal>
        <ol aria-label={lang === "ko" ? "성장 방향" : "Direction of growth"} className="flex flex-wrap items-center gap-2">
          {growth.map((ph, i) => (
            <li key={ph} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-muted">→</span>}
              <span className={`rounded-full border px-3 py-1 font-mono text-xs ${chip[ph]}`}>{phaseLabels[ph][lang]}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      <ol className="mt-12 border-l border-line">
        {timeline.map((t, i) => (
          <li key={i} className="relative grid gap-2 py-6 pl-7 md:grid-cols-[9.5rem_1fr] md:gap-8 md:pl-10">
            <span aria-hidden className={`absolute -left-[5px] top-[1.85rem] size-[9px] rounded-full ring-4 ring-bg ${dot[t.phase]}`} />
            <p className="font-mono text-sm text-muted tabular-nums">{t.date}</p>
            <Reveal>
              <span className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider ${chip[t.phase]}`}>
                {phaseLabels[t.phase][lang]}
              </span>
              <h3 className="mt-2 text-lg font-medium leading-snug">
                {t.slug ? (
                  <Link href={localePath(lang, `/projects/${t.slug}/`)} className="group inline-flex items-start gap-1 hover:text-accent">
                    {t.title[lang]}
                    <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                ) : (
                  t.title[lang]
                )}
              </h3>
              <p className="mt-1.5 max-w-2xl leading-relaxed text-ink-2">{t.body[lang]}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
