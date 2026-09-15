import { Menu } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { HtmlLang, LangToggle } from "@/components/LangToggle";
import { MotionProvider } from "@/components/motion";
import { GithubIcon } from "@/components/ui";
import { profile, ui } from "@/data/profile";
import { localePath, type Lang } from "@/lib/i18n";

export function Site({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <div lang={lang} className="flex min-h-screen flex-col">
      <HtmlLang lang={lang} />
      <a
        href="#main"
        className="fixed left-4 top-2 z-50 -translate-y-20 rounded-md bg-ink px-4 py-2 text-sm text-bg transition-transform focus:translate-y-0"
      >
        {ui.skip[lang]}
      </a>
      <Header lang={lang} />
      <MotionProvider>
        <main id="main" className="flex-1">
          {children}
        </main>
      </MotionProvider>
      <Footer lang={lang} />
    </div>
  );
}

function NavLinks({ lang, className }: { lang: Lang; className: string }) {
  return (
    <ul className={className}>
      {ui.nav.map((item) => (
        <li key={item.href}>
          <Link href={localePath(lang, item.href)} className="block rounded-md px-2 py-1.5 transition-colors hover:text-ink">
            {item.label[lang]}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Header({ lang }: { lang: Lang }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95">
      <div className="container-x flex h-14 items-center justify-between gap-4">
        <Link href={localePath(lang, "/")} className="shrink-0 font-medium tracking-tight">
          {profile.name[lang]}
          <span className="hidden text-muted sm:inline"> · AI Engineer</span>
        </Link>
        <nav aria-label={lang === "ko" ? "주 메뉴" : "Primary"} className="hidden md:block">
          <NavLinks lang={lang} className="flex items-center gap-3 text-sm text-ink-2" />
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle lang={lang} />
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden size-9 place-items-center rounded-full text-ink-2 transition-colors hover:text-ink md:grid"
          >
            <GithubIcon className="size-[18px]" />
          </a>
          <details className="relative md:hidden">
            <summary
              aria-label={ui.menu[lang]}
              className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-line [&::-webkit-details-marker]:hidden"
            >
              <Menu aria-hidden className="size-4" />
            </summary>
            <nav aria-label={lang === "ko" ? "주 메뉴" : "Primary"} className="absolute right-0 mt-2 w-48 rounded-xl border border-line bg-surface p-2 shadow-lg">
              <NavLinks lang={lang} className="flex flex-col text-sm text-ink-2" />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-4 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © 2026 {profile.name[lang]} · {ui.footer[lang]}
        </p>
        <ul className="flex gap-5">
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 hover:text-ink">
              GitHub
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="inline-block py-1.5 hover:text-ink">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
