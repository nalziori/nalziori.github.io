import type { ReactNode, SVGProps } from "react";
import { CountUp, Reveal } from "@/components/motion";
import { evidenceLabels, ui } from "@/data/profile";
import type { EvidenceKind, Metric } from "@/data/types";
import type { Lang } from "@/lib/i18n";

export const pad = (n: number) => String(n).padStart(2, "0");

export const pillButton =
  "inline-flex h-10 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg";

export function Section({ id, n, title, intro, children }: { id: string; n: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <p className="kicker">{n}</p>
          <h2 id={`${id}-title`} className="mt-3 max-w-3xl text-[clamp(1.85rem,3.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.025em] text-balance">
            {title}
          </h2>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{intro}</p>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

const tone: Record<EvidenceKind, string> = {
  official: "border-ok/40 text-ok",
  measured: "border-ok/40 text-ok",
  record: "border-line-strong text-ink-2",
  implemented: "border-info/40 text-info",
  estimated: "border-dashed border-warn/70 text-warn",
  "in-progress": "border-accent/50 text-accent",
  planned: "border-dashed border-line-strong text-muted",
};

export function Evidence({ kind, lang }: { kind: EvidenceKind; lang: Lang }) {
  const e = evidenceLabels[kind];
  return (
    <span
      title={e.desc[lang]}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10.5px] uppercase leading-4 tracking-wide ${tone[kind]}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {e.name[lang]}
    </span>
  );
}

export function EvidenceLegend({ lang }: { lang: Lang }) {
  return (
    <details className="group">
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 py-1.5 font-mono text-xs uppercase tracking-wider text-muted hover:text-ink [&::-webkit-details-marker]:hidden">
        <span aria-hidden className="inline-block transition-transform group-open:rotate-90">›</span>
        {ui.evidenceLegend[lang]}
      </summary>
      <dl className="mt-4 grid gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
        {(Object.keys(evidenceLabels) as EvidenceKind[]).map((k) => (
          <div key={k} className="flex items-start gap-3">
            <dt className="w-28 shrink-0">
              <Evidence kind={k} lang={lang} />
            </dt>
            <dd className="text-ink-2">{evidenceLabels[k].desc[lang]}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

export function MetricCard({ m, lang }: { m: Metric; lang: Lang }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <span className="font-mono text-[1.7rem] leading-tight tracking-tight text-ink tabular-nums">
          <CountUp value={m.value} />
        </span>
        <Evidence kind={m.evidence} lang={lang} />
      </div>
      <p className="mt-3 text-sm font-medium text-ink">{m.label[lang]}</p>
      {m.context && <p className="mt-1 text-xs leading-relaxed text-muted">{m.context[lang]}</p>}
    </div>
  );
}

/** Marks a missing link. Visible in `next dev` only, so an unfinished link never ships. */
export function Pending({ label }: { label: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <li>
      <span className="inline-flex h-10 items-center rounded-full border border-dashed border-warn px-4 text-sm text-warn">{label} · 확인 필요</span>
    </li>
  );
}

export const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
  </svg>
);

export const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
