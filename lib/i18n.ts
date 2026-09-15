export type Lang = "en" | "ko";
export type L = Record<Lang, string>;

export const langs: Lang[] = ["en", "ko"];

/** Shorthand for bilingual strings in data files. */
export const tx = (en: string, ko: string): L => ({ en, ko });

/** Full public URL of the deployed site, including any GitHub Pages base path. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nalziori.github.io").replace(/\/$/, "");

/** English lives at the root, Korean under /ko. `path` is language-neutral ("/", "/#work", "/projects/x/"). */
export const localePath = (lang: Lang, path = "/") => (lang === "ko" ? `/ko${path}` : path);

/** Inverse of localePath: "/ko/projects/x/" → "/projects/x/". */
export const neutralPath = (pathname: string) => pathname.replace(/^\/ko(?=\/|$)/, "") || "/";
