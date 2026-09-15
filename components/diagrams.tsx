import { RotateCcw } from "lucide-react";
import { Fragment } from "react";
import { ui } from "@/data/profile";
import type { Stage, StageKind } from "@/data/types";
import { tx, type L, type Lang } from "@/lib/i18n";

/** One visual language for every diagram: orange = LLM, dashed = local model, ink = code, double = gate. */
export const stageBox: Record<StageKind, string> = {
  input: "border-line-strong bg-bg",
  llm: "border-accent bg-accent-soft",
  model: "border-dashed border-ink-2 bg-surface",
  code: "border-ink/70 bg-surface",
  gate: "border-ink bg-surface shadow-[inset_0_0_0_1px_var(--ink)]",
  output: "border-line-strong bg-bg",
};

const stageText: Record<StageKind, string> = {
  input: "text-muted",
  llm: "text-accent",
  model: "text-ink-2",
  code: "text-ink-2",
  gate: "text-ink",
  output: "text-muted",
};

function StageBox({ s, n, lang }: { s: Stage; n: string; lang: Lang }) {
  return (
    <div className={`min-w-0 flex-1 rounded-lg border px-4 py-3 ${stageBox[s.kind]}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <span className="font-mono text-[11px] text-muted">{n}</span>
        <span className={`font-mono text-[10.5px] uppercase tracking-wider ${stageText[s.kind]}`}>{ui.stages[s.kind][lang]}</span>
      </div>
      <p className="mt-1 font-medium text-ink">{s.label[lang]}</p>
      {s.detail && <p className="mt-0.5 text-sm leading-relaxed text-ink-2">{s.detail[lang]}</p>}
    </div>
  );
}

const Down = () => (
  <svg aria-hidden viewBox="0 0 12 22" className="mx-auto my-1 h-5 w-3 text-line-strong">
    <path d="M6 0v19M1.5 14.5 6 19l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/** Vertical architecture flow. A nested array renders as parallel stages. */
export function Flow({ stages, lang }: { stages: (Stage | Stage[])[]; lang: Lang }) {
  return (
    <ol className="flex flex-col">
      {stages.map((st, i) => {
        const n = String(i + 1).padStart(2, "0");
        return (
          <li key={n}>
            {i > 0 && <Down />}
            {Array.isArray(st) ? (
              <div role="group" aria-label={ui.detail.parallel[lang]} className="flex flex-col gap-2 sm:flex-row">
                {st.map((s, j) => (
                  <StageBox key={j} s={s} n={n + "abc"[j]} lang={lang} />
                ))}
              </div>
            ) : (
              <StageBox s={st} n={n} lang={lang} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function FlowLegend({ lang }: { lang: Lang }) {
  const kinds: StageKind[] = ["llm", "model", "code", "gate"];
  return (
    <ul className="flex flex-wrap gap-2">
      {kinds.map((k) => (
        <li key={k} className={`rounded-md border px-2.5 py-1 font-mono text-xs text-ink-2 ${stageBox[k]}`}>
          {ui.stages[k][lang]}
        </li>
      ))}
    </ul>
  );
}

/** Compact flow for project cards; `vertical` stacks it on large screens (wide card). */
export function FlowMini({ stages, lang, vertical = false }: { stages: (Stage | Stage[])[]; lang: Lang; vertical?: boolean }) {
  const items = stages.map((st) =>
    Array.isArray(st) ? { kind: st[0].kind, label: st.map((s) => s.label[lang]).join(" + ") } : { kind: st.kind, label: st.label[lang] },
  );
  return (
    <div aria-hidden className={`flex flex-wrap items-center gap-x-1.5 gap-y-2 ${vertical ? "lg:flex-col lg:items-start lg:gap-1" : ""}`}>
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span className={`font-mono text-xs text-muted ${vertical ? "lg:pl-4" : ""}`}>
              {vertical ? (
                <>
                  <span className="lg:hidden">→</span>
                  <span className="hidden lg:inline">↓</span>
                </>
              ) : (
                "→"
              )}
            </span>
          )}
          <span
            className={`rounded-md border px-2 py-1 text-[11.5px] leading-tight text-ink ${vertical ? "lg:px-3 lg:py-1.5 lg:text-[13px]" : ""} ${stageBox[it.kind]}`}
          >
            {it.label}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export function Bars({ items, highlightLast }: { items: { label: string; value: number }[]; highlightLast?: boolean }) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <ol className="space-y-2.5">
      {items.map((it, i) => (
        <li key={it.label}>
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="text-ink-2">{it.label}</span>
            <span className="font-mono text-ink tabular-nums">{it.value.toLocaleString("en-US")}</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-sm bg-line">
            <div
              className={`h-full rounded-sm ${highlightLast && i === items.length - 1 ? "bg-accent" : "bg-ink/75"}`}
              style={{ width: `${(it.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Budget({ items, lang }: { items: { value: string; label: L }[]; lang: Lang }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((it) => (
          <div key={it.value} className="rounded-md border border-dashed border-line-strong bg-surface px-3 py-2.5">
            <div className="font-mono text-lg text-ink tabular-nums">≤ {it.value}</div>
            <div className="text-[11px] text-muted">{it.label[lang]}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-wider text-muted">
        {tx("Deployment budget · on-device numbers not measured yet", "배포 예산 · 온디바이스 실측 전")[lang]}
      </p>
    </div>
  );
}

const heroSteps: { name: L; detail: L; box: string; sub: string }[] = [
  { name: tx("Input", "입력"), detail: tx("text · image · voice · records", "텍스트 · 이미지 · 음성 · 기록"), box: stageBox.input, sub: "text-ink-2" },
  { name: tx("Perception", "인지"), detail: tx("format checks · OCR · local speech recognition", "포맷 판별 · OCR · 로컬 음성 인식"), box: stageBox.model, sub: "text-ink-2" },
  { name: tx("Reasoning", "추론"), detail: tx("an LLM, bounded by a typed schema", "타입 스키마로 경계를 정한 LLM"), box: stageBox.llm, sub: "text-ink-2" },
  { name: tx("Decision", "결정"), detail: tx("deterministic rules and math", "결정론적 규칙과 계산"), box: stageBox.code, sub: "text-ink-2" },
  { name: tx("Action", "행동"), detail: tx("execute · confirm · re-ask · refuse", "실행 · 확인 · 재질문 · 거부"), box: stageBox.gate, sub: "text-ink-2" },
  { name: tx("Evaluation", "평가"), detail: tx("held-out · repeated · logged — feeds back", "홀드아웃 · 반복 측정 · 기록 — 다시 반영"), box: "border-ink bg-ink text-bg", sub: "text-bg/75" },
];

/** Hero visual: the shape shared by the systems on this site. */
export function HeroPipeline({ lang }: { lang: Lang }) {
  const caption = tx("The shape of the systems I build", "제가 만드는 시스템의 구조")[lang];
  return (
    <figure className="w-full" aria-label={caption}>
      <figcaption className="kicker mb-4">{caption}</figcaption>

      <div className="relative hidden pl-7 sm:block">
        <span aria-hidden className="absolute bottom-5 left-[7px] top-5 w-px bg-line-strong" />
        <span aria-hidden className="rail-dot absolute left-1 size-[7px] rounded-full bg-accent" />
        <ol className="space-y-2.5">
          {heroSteps.map((s, i) => (
            <li key={i} className={`relative rounded-lg border px-4 py-2.5 ${s.box}`}>
              <span aria-hidden className="absolute -left-6 top-1/2 size-[7px] -translate-y-1/2 rounded-full border border-line-strong bg-bg" />
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-medium">{s.name[lang]}</span>
                <span className={`font-mono text-[10.5px] ${s.sub}`}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className={`flex items-center gap-1.5 text-sm ${s.sub}`}>
                {i === heroSteps.length - 1 && <RotateCcw aria-hidden className="size-3.5 shrink-0" />}
                {s.detail[lang]}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2 sm:hidden">
        {heroSteps.map((s, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden className="font-mono text-xs text-muted">→</span>}
            <span className={`rounded-md border px-2.5 py-1 text-sm ${s.box}`}>{s.name[lang]}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
