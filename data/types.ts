import type { StaticImageData } from "next/image";
import type { L } from "@/lib/i18n";

/** Every number on the site says where it comes from. */
export type EvidenceKind =
  | "official" // published by an external organizer
  | "measured" // measured by me, reproducible from the repo or files
  | "record" // career documents, databases, press
  | "implemented" // behavior verified in code / self-tests, not a performance number
  | "estimated" // calculated, not measured
  | "in-progress"
  | "planned"; // not started or not measured yet

export type Metric = { value: string; label: L; context?: L; evidence: EvidenceKind };

export type StageKind = "input" | "llm" | "model" | "code" | "gate" | "output";
export type Stage = { kind: StageKind; label: L; detail?: L };

export type Decision = { title: L; why: L; rejected?: L };
export type LinkItem = { label: L; href: string };

export type ProjectDetail = {
  context: L; // 01
  roleShort: L; // one line, shown at the top of the case study
  role: { mine: L[]; others?: L[] }; // 02 — what I did vs. what others / tools did
  problem: L[]; // 03
  architecture: { stages: (Stage | Stage[])[]; note?: L }; // 04 — nested array = parallel stages
  decisions: Decision[]; // 05
  evaluation: L[]; // 06
  results: Metric[]; // 07
  resultTable?: { caption: L; head: L[]; rows: (string | L)[][]; note?: L };
  bars?: { caption: L; items: { label: string; value: number }[] };
  tracks?: { status: EvidenceKind; title: L; items: L[] }[];
  image?: { src: StaticImageData; alt: L; caption: L };
  lessons: L[]; // 08
  links: LinkItem[]; // 09
};

export type Cover =
  | { kind: "flow" }
  | { kind: "funnel"; steps: { label: L; value: number }[] }
  | { kind: "budget"; items: { value: string; label: L }[] };

export type Project = {
  slug: string;
  title: L;
  category: L;
  year: string;
  status: L;
  summary: L;
  technologies: string[];
  highlights: Metric[]; // shown on cards
  featured: boolean;
  github?: string;
  demo?: string;
  paper?: string;
  cover?: Cover;
  detail?: ProjectDetail; // present → gets a case-study page
  href?: string; // card target when there is no detail page (language-neutral path)
  note?: L;
};
