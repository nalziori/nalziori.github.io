import { ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import { Bars, Budget, FlowMini } from "@/components/diagrams";
import { Evidence } from "@/components/ui";
import { ui } from "@/data/profile";
import type { Project } from "@/data/types";
import { localePath, type Lang } from "@/lib/i18n";

type Layout = "wide" | "stack" | "compact";

function Cover({ p, lang, vertical }: { p: Project; lang: Lang; vertical: boolean }) {
  const c = p.cover;
  if (!c) return null;
  if (c.kind === "funnel") return <Bars items={c.steps.map((s) => ({ label: s.label[lang], value: s.value }))} highlightLast />;
  if (c.kind === "budget") return <Budget items={c.items} lang={lang} />;
  return p.detail ? <FlowMini stages={p.detail.architecture.stages} lang={lang} vertical={vertical} /> : null;
}

export function ProjectCard({ p, lang, layout }: { p: Project; lang: Lang; layout: Layout }) {
  const internal = p.detail ? `/projects/${p.slug}/` : p.href;
  const external = internal ? undefined : p.github;
  const cta = internal ? ui.readCase[lang] : external ? ui.viewRepo[lang] : null;
  const wide = layout === "wide";

  // The title link stretches over the whole card (after:inset-0).
  const stretch = "after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none";
  const title = internal ? (
    <Link href={localePath(lang, internal)} className={stretch}>
      {p.title[lang]}
    </Link>
  ) : external ? (
    <a href={external} target="_blank" rel="noopener noreferrer" className={stretch}>
      {p.title[lang]}
    </a>
  ) : (
    p.title[lang]
  );

  return (
    <article
      className={`group relative flex h-full flex-col rounded-xl border border-line bg-surface transition duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent ${wide ? "lg:grid lg:grid-cols-[1.05fr_1fr]" : ""}`}
    >
      {layout !== "compact" && p.cover && (
        <div
          className={`overflow-hidden rounded-t-xl border-b border-line bg-bg p-5 ${wide ? "lg:order-2 lg:flex lg:items-center lg:rounded-r-xl lg:rounded-tl-none lg:border-b-0 lg:border-l lg:p-10" : ""}`}
        >
          <div className="w-full origin-top-left transition duration-500 group-hover:scale-[1.02]">
            <Cover p={p} lang={lang} vertical={wide} />
          </div>
        </div>
      )}

      <div className={`flex flex-1 flex-col p-6 ${wide ? "lg:p-8" : ""}`}>
        <p className="kicker">
          {p.category[lang]} · <span className="whitespace-nowrap">{p.year}</span>
        </p>
        <h3 className={`mt-3 font-medium leading-snug tracking-tight text-ink ${layout === "compact" ? "text-lg" : "text-2xl"}`}>{title}</h3>
        <p className={`mt-3 leading-relaxed text-ink-2 ${layout === "compact" ? "text-sm" : ""}`}>{p.summary[lang]}</p>

        {p.highlights.length > 0 && (
          <dl className={`mt-6 grid gap-4 ${layout === "compact" ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
            {p.highlights.map((m, i) => (
              <div key={i} className="flex min-w-0 flex-col border-l border-line pl-3">
                <dt className="order-2 mt-1 text-xs leading-snug text-muted">{m.label[lang]}</dt>
                <dd className="order-1 font-mono text-lg leading-tight text-ink tabular-nums">{m.value}</dd>
                <dd className="order-3 mt-2">
                  <Evidence kind={m.evidence} lang={lang} />
                </dd>
              </div>
            ))}
          </dl>
        )}

        {p.note && (
          <p className="mt-5 flex items-center gap-1.5 text-xs text-muted">
            <Lock aria-hidden className="size-3.5 shrink-0" />
            {p.note[lang]}
          </p>
        )}

        <ul aria-label={lang === "ko" ? "기술" : "Technologies"} className="mt-6 flex flex-wrap gap-1.5">
          {p.technologies.slice(0, layout === "compact" ? 4 : 7).map((t) => (
            <li
              key={t}
              className="rounded-md border border-line bg-bg px-2 py-0.5 font-mono text-[11px] text-ink-2 transition-colors duration-300 group-hover:border-line-strong group-hover:text-ink"
            >
              {t}
            </li>
          ))}
        </ul>

        {cta && (
          <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
            {cta}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </article>
  );
}
