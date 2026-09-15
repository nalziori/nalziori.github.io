import type { Metadata } from "next";
import { About, Principles } from "@/components/home/About";
import { Contact, Research } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Skills } from "@/components/home/Skills";
import { Timeline } from "@/components/home/Timeline";
import { Featured, Others } from "@/components/home/Work";
import { profile } from "@/data/profile";
import { SITE_URL, tx, type Lang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/meta";

const title = tx("Jaeyoung Choi — AI Engineer Portfolio", "최재영 — AI Engineer 포트폴리오");
const description = tx(
  "Jaeyoung Choi (최재영), AI Engineer: evaluation-first, safety-aware AI agents — multimodal pipelines, LLM + deterministic decision systems, medical imaging data and edge AI on Jetson Orin Nano.",
  "최재영 (Jaeyoung Choi), AI Engineer: 평가를 먼저 설계하고 안전하게 실패하는 AI 에이전트 — 멀티모달 파이프라인, LLM과 결정론 코드를 분리한 의사결정 시스템, 의료 영상 데이터, Jetson Orin Nano 엣지 AI.",
);

export const homeMetadata = (lang: Lang): Metadata => pageMetadata(lang, "/", title[lang], description[lang]);

export function Home({ lang }: { lang: Lang }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jaeyoung Choi",
    alternateName: "최재영",
    jobTitle: "AI Engineer",
    url: SITE_URL,
    email: `mailto:${profile.email}`,
    sameAs: [profile.github, ...(profile.linkedin ? [profile.linkedin] : [])],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Kyungpook National University" },
    knowsAbout: ["AI agents", "Multimodal AI", "LLM evaluation", "Python", "C++", "Computer vision", "Edge AI", "Medical imaging data", "AWS"],
  };
  return (
    <>
      <Hero lang={lang} />
      <Featured lang={lang} />
      <Principles lang={lang} />
      <About lang={lang} />
      <Others lang={lang} />
      <Timeline lang={lang} />
      <Skills lang={lang} />
      <Research lang={lang} />
      <Contact lang={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
    </>
  );
}
