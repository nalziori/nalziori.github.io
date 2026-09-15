import { ArrowUpRight, FileText } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Evidence, GithubIcon, LinkedinIcon, Pending, pillButton, Section } from "@/components/ui";
import { profile, research, ui } from "@/data/profile";
import type { Lang } from "@/lib/i18n";

export function Research({ lang }: { lang: Lang }) {
  return (
    <Section id="research" n="07" title={ui.sections.research[lang]}>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <ol className="space-y-4">
          {research.papers.map((p) => (
            <li key={p.title.en}>
              <Reveal className="rounded-xl border border-line bg-surface p-6">
                <p className="kicker">{lang === "ko" ? "학술대회 발표" : "Conference paper"}</p>
                <h3 className="mt-2 text-lg font-medium leading-snug">{p.title[lang]}</h3>
                {lang === "en" && (
                  <p lang="ko" className="mt-1 text-sm text-muted">
                    {p.title.ko}
                  </p>
                )}
                <p className="mt-3 text-sm text-ink-2">{p.venue[lang]}</p>
                <p className="mt-1 text-sm text-ink-2">{p.role[lang]}</p>
              </Reveal>
            </li>
          ))}
          <li>
            <a
              href={research.feature.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 py-1.5 text-sm underline decoration-line-strong underline-offset-4 hover:decoration-accent"
            >
              {research.feature.label[lang]}
              <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </li>
        </ol>
        <Reveal delay={0.1} className="self-start rounded-xl border border-dashed border-line-strong p-6">
          <Evidence kind="planned" lang={lang} />
          <h3 className="mt-3 text-lg font-medium leading-snug">{research.interest.title[lang]}</h3>
          <p className="mt-2 leading-relaxed text-ink-2">{research.interest.body[lang]}</p>
          <p className="mt-4 font-mono text-xs text-muted">{research.interest.status[lang]}</p>
        </Reveal>
      </div>
    </Section>
  );
}

export function Contact({ lang }: { lang: Lang }) {
  return (
    <Section id="contact" n="08" title={ui.sections.contact[lang]} intro={ui.sections.contactBody[lang]}>
      <Reveal>
        <a
          href={`mailto:${profile.email}`}
          className="group inline-flex max-w-full items-center gap-3 break-all text-[clamp(1.4rem,4.5vw,3rem)] font-medium tracking-tight underline decoration-line-strong decoration-2 underline-offset-8 hover:decoration-accent"
        >
          {profile.email}
          <ArrowUpRight aria-hidden className="size-[0.8em] shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
        <ul className="mt-10 flex flex-wrap gap-3">
          <li>
            <a className={pillButton} href={profile.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="size-4" />
              github.com/nalziori
            </a>
          </li>
          {profile.linkedin ? (
            <li>
              <a className={pillButton} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
            </li>
          ) : (
            <Pending label="LinkedIn" />
          )}
          {profile.resume ? (
            <li>
              <a className={pillButton} href={profile.resume}>
                <FileText aria-hidden className="size-4" />
                {lang === "ko" ? "이력서" : "Resume"}
              </a>
            </li>
          ) : (
            <Pending label={lang === "ko" ? "이력서" : "Resume"} />
          )}
        </ul>
      </Reveal>
    </Section>
  );
}
