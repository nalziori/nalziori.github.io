import type { MetadataRoute } from "next";
import { detailed } from "@/data/projects";
import { langs, localePath, SITE_URL } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...detailed.map((p) => `/projects/${p.slug}/`)];
  return paths.flatMap((path) =>
    langs.map((lang) => ({
      url: SITE_URL + localePath(lang, path),
      alternates: { languages: { en: SITE_URL + path, ko: SITE_URL + localePath("ko", path) } },
    })),
  );
}
