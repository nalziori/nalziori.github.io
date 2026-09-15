"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localePath, neutralPath, type Lang } from "@/lib/i18n";

const options: { lang: Lang; short: string; long: string }[] = [
  { lang: "en", short: "EN", long: "English" },
  { lang: "ko", short: "KO", long: "한국어" },
];

/** Segmented EN / 한국어 switch. Links to the same page in the other language. */
export function LangToggle({ lang, size = "sm" }: { lang: Lang; size?: "sm" | "lg" }) {
  const path = neutralPath(usePathname());
  const lg = size === "lg";
  return (
    <div
      role="group"
      aria-label="Language / 언어"
      className={`relative inline-grid grid-cols-2 rounded-full border border-line-strong bg-surface p-1 ${lg ? "min-w-72 shadow-[0_8px_24px_-18px_rgba(0,0,0,0.4)]" : ""}`}
    >
      <span
        aria-hidden
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-300 ease-out ${lang === "ko" ? "translate-x-full" : ""}`}
      />
      {options.map((o) => {
        const active = o.lang === lang;
        return (
          <Link
            key={o.lang}
            href={localePath(o.lang, path)}
            hrefLang={o.lang}
            lang={o.lang}
            scroll={false}
            aria-current={active ? "page" : undefined}
            aria-label={lg ? undefined : o.long}
            className={`relative z-10 rounded-full text-center font-medium transition-colors duration-300 ${lg ? "px-7 py-3 text-base" : "px-3 py-1.5 text-xs"} ${active ? "text-bg" : "text-ink-2 hover:text-ink"}`}
          >
            {lg ? o.long : o.short}
          </Link>
        );
      })}
    </div>
  );
}

/** The root layout renders lang="en"; correct it for Korean pages (also after client navigation). */
export function HtmlLang({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
