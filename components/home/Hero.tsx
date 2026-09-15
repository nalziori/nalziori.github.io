import { ArrowDown, FileText, Mail } from "lucide-react";
import { HeroPipeline } from "@/components/diagrams";
import { LangToggle } from "@/components/LangToggle";
import { CountUp } from "@/components/motion";
import { Evidence, EvidenceLegend, GithubIcon, LinkedinIcon, Pending, pillButton } from "@/components/ui";
import { profile, proof, ui } from "@/data/profile";
import { tx, type Lang } from "@/lib/i18n";

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]"
      />
      <div className="container-x relative pb-16 pt-10 md:pt-14">
        <div className="flex flex-col items-center gap-3">
          <p className="kicker">
            {lang === "en" ? "Language" : "언어"} · <span lang={lang === "en" ? "ko" : "en"}>{lang === "en" ? "언어" : "Language"}</span>
          </p>
          <LangToggle lang={lang} size="lg" />
        </div>

        <div className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <p className="kicker">{profile.kicker[lang]}</p>
            <h1 id="hero-title" className="mt-5 text-[clamp(2.75rem,7vw,5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
              {profile.name[lang]}
              <span className="mt-3 block text-[0.4em] font-normal leading-tight tracking-[-0.01em] text-muted">
                {profile.altName[lang]} · {profile.role}
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-[clamp(1.45rem,2.6vw,2rem)] leading-snug tracking-[-0.02em] text-balance">{profile.headline[lang]}</p>
            <p className="mt-5 max-w-xl leading-relaxed text-ink-2">{profile.intro[lang]}</p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              <li>
                <a href="#work" className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-bg transition-colors hover:bg-accent">
                  {tx("View projects", "프로젝트 보기")[lang]}
                  <ArrowDown aria-hidden className="size-4" />
                </a>
              </li>
              <li>
                <a className={pillButton} href={profile.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="size-4" />
                  GitHub
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
              <li>
                <a className={pillButton} href={`mailto:${profile.email}`}>
                  <Mail aria-hidden className="size-4" />
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>
          <HeroPipeline lang={lang} />
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((m) => (
            <div key={m.value} className="flex flex-col bg-surface p-5">
              <dt className="order-2 mt-2 text-sm font-medium text-ink">{m.label[lang]}</dt>
              <dd className="order-1 font-mono text-3xl tracking-tight tabular-nums">
                <CountUp value={m.value} />
              </dd>
              {m.context && <dd className="order-3 mt-1 text-xs leading-relaxed text-muted">{m.context[lang]}</dd>}
              <dd className="order-4 mt-auto pt-4">
                <Evidence kind={m.evidence} lang={lang} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap items-start justify-between gap-6">
          <EvidenceLegend lang={lang} />
          <a href="#work" className="hidden items-center gap-2 py-1 font-mono text-xs uppercase tracking-widest text-muted hover:text-ink md:inline-flex">
            {ui.scroll[lang]}
            <ArrowDown aria-hidden className="scroll-cue size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
