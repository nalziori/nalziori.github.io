import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { pad, Section } from "@/components/ui";
import { about, principles, profile, ui } from "@/data/profile";
import { localePath, tx, type Lang } from "@/lib/i18n";

export function About({ lang }: { lang: Lang }) {
  return (
    <Section id="about" n="03" title={ui.sections.about[lang]}>
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <Reveal className="space-y-5 leading-relaxed text-ink-2">
          {about.map((p, i) => (
            <p key={i} className={i === 0 ? "text-xl leading-relaxed text-ink md:text-2xl" : "text-lg"}>
              {p[lang]}
            </p>
          ))}
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 self-start rounded-xl border border-line bg-surface p-6 text-sm leading-relaxed">
          <div>
            <p className="kicker">{tx("Now", "지금")[lang]}</p>
            <p className="mt-2 text-ink-2">{profile.currently[lang]}</p>
          </div>
          <div className="border-t border-line pt-5">
            <p className="kicker">{tx("Education", "학력")[lang]}</p>
            <p className="mt-2 text-ink-2">{profile.education[lang]}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Principles({ lang }: { lang: Lang }) {
  return (
    <Section id="principles" n="02" title={ui.sections.principles[lang]} intro={ui.sections.principlesIntro[lang]}>
      <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
        {principles.map((p, i) => (
          <li key={p.slug} className="bg-surface">
            <Reveal delay={i * 0.05} className="flex h-full flex-col p-6 md:p-8">
              <span className="font-mono text-sm text-accent">{pad(i + 1)}</span>
              <h3 className="mt-3 text-2xl font-medium tracking-tight">{p.title[lang]}</h3>
              <p className="mt-4 leading-relaxed text-ink-2">{p.body[lang]}</p>
              <Link
                href={localePath(lang, `/projects/${p.slug}/`)}
                className="group mt-auto inline-flex items-center gap-2 self-start pt-6 text-sm font-medium"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-muted">{ui.evidenceIn[lang]} →</span>
                <span className="underline decoration-line-strong underline-offset-4 group-hover:decoration-accent">{p.proof[lang]}</span>
                <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
