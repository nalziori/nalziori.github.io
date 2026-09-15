import { ArrowLeft, ArrowRight, ArrowUpRight, FileText, Globe } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Bars, Flow, FlowLegend } from "@/components/diagrams";
import { Reveal } from "@/components/motion";
import { Evidence, EvidenceLegend, GithubIcon, MetricCard, pad, pillButton } from "@/components/ui";
import { ui } from "@/data/profile";
import { detailed, findProject } from "@/data/projects";
import { localePath, tx, type L, type Lang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/meta";

export const projectParams = () => detailed.map((p) => ({ slug: p.slug }));

export function projectMetadata(lang: Lang, slug: string): Metadata {
  const p = findProject(slug);
  if (!p) return {};
  return pageMetadata(lang, `/projects/${slug}/`, `${p.title[lang]} — ${lang === "ko" ? "최재영" : "Jaeyoung Choi"}`, p.summary[lang]);
}

const t = ui.detail;
const sections: [id: string, title: L][] = [
  ["context", t.context],
  ["role", t.role],
  ["problem", t.problem],
  ["architecture", t.architecture],
  ["decisions", t.decisions],
  ["evaluation", t.evaluation],
  ["results", t.results],
  ["lessons", t.lessons],
  ["links", t.links],
];

function Block({ index, lang, children }: { index: number; lang: Lang; children: ReactNode }) {
  const [id, title] = sections[index];
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-20 border-t border-line py-12 first:border-t-0 first:pt-0">
      <Reveal>
        <p className="font-mono text-sm text-accent">{pad(index + 1)}</p>
        <h2 id={`${id}-h`} className="mt-1 text-2xl font-medium tracking-tight md:text-3xl">
          {title[lang]}
        </h2>
      </Reveal>
      <Reveal delay={0.05} className="mt-6">
        {children}
      </Reveal>
    </section>
  );
}

const Bullets = ({ items, lang }: { items: L[]; lang: Lang }) => (
  <ul className="space-y-3">
    {items.map((x, i) => (
      <li key={i} className="flex gap-3 leading-relaxed text-ink-2">
        <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
        <span>{x[lang]}</span>
      </li>
    ))}
  </ul>
);

export function ProjectPage({ lang, slug }: { lang: Lang; slug: string }) {
  const p = findProject(slug);
  const d = p?.detail;
  if (!p || !d) notFound();
  const next = detailed[(detailed.indexOf(p) + 1) % detailed.length];

  return (
    <article>
      <header className="border-b border-line">
        <div className="container-x pb-12 pt-8 md:pb-16 md:pt-12">
          <Link href={localePath(lang, "/#work")} className="inline-flex items-center gap-2 py-1.5 text-sm text-muted hover:text-ink">
            <ArrowLeft aria-hidden className="size-4" />
            {t.back[lang]}
          </Link>
          <p className="kicker mt-10">{p.category[lang]}</p>
          <h1 className="mt-3 max-w-4xl text-[clamp(2.1rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-balance">{p.title[lang]}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-2 md:text-xl">{p.summary[lang]}</p>

          {(p.github || p.demo || p.paper) && (
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {p.github && (
                <li>
                  <a className={pillButton} href={p.github} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="size-4" />
                    GitHub
                  </a>
                </li>
              )}
              {p.demo && (
                <li>
                  <a className={pillButton} href={p.demo} target="_blank" rel="noopener noreferrer">
                    <Globe aria-hidden className="size-4" />
                    Demo
                  </a>
                </li>
              )}
              {p.paper && (
                <li>
                  <a className={pillButton} href={p.paper} target="_blank" rel="noopener noreferrer">
                    <FileText aria-hidden className="size-4" />
                    Paper
                  </a>
                </li>
              )}
            </ul>
          )}

          <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-[auto_1fr_1.5fr]">
            <div className="bg-surface p-4 md:pr-8">
              <dt className="kicker">{t.year[lang]}</dt>
              <dd className="mt-1.5 font-mono text-sm tabular-nums">{p.year}</dd>
            </div>
            <div className="bg-surface p-4">
              <dt className="kicker">{t.status[lang]}</dt>
              <dd className="mt-1.5 text-sm">{p.status[lang]}</dd>
            </div>
            <div className="bg-surface p-4">
              <dt className="kicker text-accent">{t.role[lang]}</dt>
              <dd className="mt-1.5 text-sm font-medium">{d.roleShort[lang]}</dd>
            </div>
            <div className="bg-surface p-4 md:col-span-3">
              <dt className="kicker">{t.stack[lang]}</dt>
              <dd className="mt-1.5 text-sm">{p.technologies.join(" · ")}</dd>
            </div>
          </dl>

          {p.highlights.length > 0 && (
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {p.highlights.map((m, i) => (
                <li key={i}>
                  <MetricCard m={m} lang={lang} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="container-x grid gap-12 py-14 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
        <nav aria-label={t.onThisPage[lang]} className="hidden lg:block">
          <div className="sticky top-24">
            <p className="kicker">{t.onThisPage[lang]}</p>
            <ol className="mt-3 text-sm">
              {sections.map(([id, title], i) => (
                <li key={id}>
                  <a href={`#${id}`} className="flex gap-3 py-1.5 text-ink-2 transition-colors hover:text-ink">
                    <span className="font-mono text-muted">{pad(i + 1)}</span>
                    {title[lang]}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="min-w-0 max-w-3xl">
          <Block index={0} lang={lang}>
            <p className="text-lg leading-relaxed text-ink-2">{d.context[lang]}</p>
          </Block>

          <Block index={1} lang={lang}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-ink/60 bg-surface p-5">
                <h3 className="kicker text-ink">{t.mine[lang]}</h3>
                <div className="mt-4">
                  <Bullets items={d.role.mine} lang={lang} />
                </div>
              </div>
              {d.role.others && (
                <div className="rounded-xl border border-dashed border-line-strong p-5">
                  <h3 className="kicker">{t.others[lang]}</h3>
                  <ul className="mt-4 space-y-3">
                    {d.role.others.map((x, i) => (
                      <li key={i} className="flex gap-3 leading-relaxed text-ink-2">
                        <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full border border-muted" />
                        <span>{x[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Block>

          <Block index={2} lang={lang}>
            <ol className="space-y-4">
              {d.problem.map((x, i) => (
                <li key={i} className="flex gap-4 border-b border-line pb-4 last:border-b-0 last:pb-0">
                  <span className="pt-1 font-mono text-xs text-muted">{pad(i + 1)}</span>
                  <p className="leading-relaxed text-ink-2">{x[lang]}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block index={3} lang={lang}>
            <FlowLegend lang={lang} />
            <div className="mt-5 rounded-xl border border-line bg-surface/50 p-4 sm:p-6">
              <Flow stages={d.architecture.stages} lang={lang} />
            </div>
            {d.architecture.note && <p className="mt-4 text-sm leading-relaxed text-muted">{d.architecture.note[lang]}</p>}
          </Block>

          <Block index={4} lang={lang}>
            <ol className="space-y-4">
              {d.decisions.map((dec, i) => (
                <li key={i} className="rounded-xl border border-line bg-surface p-5 md:p-6">
                  <h3 className="flex gap-3 text-lg font-medium leading-snug">
                    <span className="pt-1 font-mono text-sm text-accent">{pad(i + 1)}</span>
                    {dec.title[lang]}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{dec.why[lang]}</p>
                  {dec.rejected && (
                    <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3 text-sm text-muted">
                      <span className="font-mono text-[11px] uppercase tracking-wider">{t.rejected[lang]}</span>
                      <span>{dec.rejected[lang]}</span>
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </Block>

          <Block index={5} lang={lang}>
            <Bullets items={d.evaluation} lang={lang} />
          </Block>

          <Block index={6} lang={lang}>
            <div className="grid gap-3 sm:grid-cols-2">
              {d.results.map((m, i) => (
                <MetricCard key={i} m={m} lang={lang} />
              ))}
            </div>
            <div className="mt-5">
              <EvidenceLegend lang={lang} />
            </div>

            {d.tracks && (
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {d.tracks.map((tr) => (
                  <div key={tr.title.en} className="rounded-xl border border-line bg-surface p-5">
                    <Evidence kind={tr.status} lang={lang} />
                    <h3 className="mt-3 font-medium">{tr.title[lang]}</h3>
                    <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-ink-2">
                      {tr.items.map((x, i) => (
                        <li key={i}>{x[lang]}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {d.bars && (
              <figure className="mt-8 rounded-xl border border-line bg-surface p-5">
                <figcaption className="kicker mb-4">{d.bars.caption[lang]}</figcaption>
                <Bars items={d.bars.items} />
              </figure>
            )}

            {d.resultTable && (
              <figure className="mt-8">
                <figcaption className="text-sm font-medium">{d.resultTable.caption[lang]}</figcaption>
                <div className="mt-3 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[34rem] text-left text-sm">
                    <thead className="bg-bg">
                      <tr>
                        {d.resultTable.head.map((h, i) => (
                          <th key={i} scope="col" className="px-4 py-2.5 font-mono text-[11px] font-normal uppercase tracking-wider text-muted">
                            {h[lang]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line bg-surface">
                      {d.resultTable.rows.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => {
                            const v = typeof cell === "string" ? cell : cell[lang];
                            return j === 0 ? (
                              <th key={j} scope="row" className="px-4 py-2.5 font-medium">
                                {v}
                              </th>
                            ) : (
                              <td key={j} className="px-4 py-2.5 text-ink-2 tabular-nums">
                                {v}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {d.resultTable.note && <p className="mt-3 text-sm leading-relaxed text-muted">{d.resultTable.note[lang]}</p>}
              </figure>
            )}

            {d.image && (
              <figure className="mt-8">
                <Image
                  src={d.image.src}
                  alt={d.image.alt[lang]}
                  sizes="(min-width: 1024px) 48rem, 100vw"
                  className="h-auto w-full rounded-xl border border-line"
                />
                <figcaption className="mt-2 text-sm text-muted">{d.image.caption[lang]}</figcaption>
              </figure>
            )}
          </Block>

          <Block index={7} lang={lang}>
            <ul className="space-y-4">
              {d.lessons.map((x, i) => (
                <li key={i} className="border-l-2 border-accent pl-4 text-lg leading-relaxed">
                  {x[lang]}
                </li>
              ))}
            </ul>
          </Block>

          <Block index={8} lang={lang}>
            {d.links.length > 0 ? (
              <ul className="space-y-2">
                {d.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-surface px-4 py-3 transition-colors hover:border-ink"
                    >
                      <span>{l.label[lang]}</span>
                      <ArrowUpRight aria-hidden className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-ink-2">
                {tx("No public links — this was internal company data.", "공개 링크 없음 — 회사 내부 데이터라 공개하지 않습니다.")[lang]}
              </p>
            )}
          </Block>

          <Link
            href={localePath(lang, `/projects/${next.slug}/`)}
            className="group mt-4 flex items-center justify-between gap-6 rounded-xl border border-line bg-surface p-6 transition-colors hover:border-ink"
          >
            <span>
              <span className="kicker">{t.next[lang]}</span>
              <span className="mt-2 block text-xl font-medium">{next.title[lang]}</span>
            </span>
            <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
