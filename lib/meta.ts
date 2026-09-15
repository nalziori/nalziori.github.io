import type { Metadata } from "next";
import { localePath, type Lang } from "@/lib/i18n";

/** Canonical + hreflang alternates + Open Graph for one page in one language. */
export function pageMetadata(lang: Lang, path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: localePath(lang, path),
      languages: { en: path, ko: localePath("ko", path), "x-default": path },
    },
    openGraph: {
      title,
      description,
      url: localePath(lang, path),
      siteName: "Jaeyoung Choi — AI Engineer",
      locale: lang === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
  };
}
