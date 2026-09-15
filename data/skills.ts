import { tx, type L } from "@/lib/i18n";

export type Level = "shipped" | "prototype" | "in-progress" | "coursework" | "planned";

export const levelLabels: Record<Level, L> = {
  shipped: tx("Shipped", "실사용·제출"),
  prototype: tx("Prototype", "프로토타입"),
  "in-progress": tx("In progress", "진행 중"),
  coursework: tx("Coursework", "학습"),
  planned: tx("Planned", "계획"),
};

/** `slug` links to a case study; `href` to anything else. */
export type Where = { label: L; slug?: string; href?: string };
export type Skill = { name: L; level: Level; where: Where[] };

const router: Where = { label: tx("Notification router", "알림 라우터"), slug: "message-notification-router" };
const bow: Where = { label: tx("Buy or Wait?", "Buy or Wait?"), slug: "buy-or-wait" };
const voice: Where = { label: tx("Voice agent", "음성 에이전트"), slug: "in-cabin-voice-agent" };
const med: Where = { label: tx("Medical data pipeline", "의료 데이터 파이프라인"), slug: "medical-imaging-data-pipeline" };
const edge: Where = { label: tx("Edge AI", "엣지 AI"), slug: "edge-ai-jetson" };
const vet: Where = { label: tx("VETWEEN", "베트윈"), slug: "vetween" };
const uam: Where = { label: tx("UAM research", "UAM 연구"), slug: "uam-knowledge-graph" };
const posco: Where = { label: tx("POSCO K-Digital course", "POSCO K-디지털 과정") };
const drone: Where = { label: tx("UE5 drone simulator", "UE5 드론 시뮬레이터") };

const s = (en: string, ko: string, level: Level, where: Where[]): Skill => ({ name: tx(en, ko), level, where });

export const skills: { category: L; items: Skill[] }[] = [
  {
    category: tx("AI / Agents", "AI · 에이전트"),
    items: [
      s("LLM APIs (Anthropic, Gemini)", "LLM API (Anthropic, Gemini)", "shipped", [router, bow, voice]),
      s("Structured outputs & typed intents", "구조화 출력 · 타입 의도", "shipped", [router, voice]),
      s("Multimodal pipelines (vision, OCR, speech)", "멀티모달 파이프라인 (비전 · OCR · 음성)", "shipped", [router]),
      s("Evaluation harnesses & held-out design", "평가 하니스 · 홀드아웃 설계", "shipped", [router, voice, bow]),
      s("Prompt-injection handling", "프롬프트 인젝션 대응", "shipped", [router, bow]),
      s("Audit ledger for agent decisions", "에이전트 결정 감사 원장", "shipped", [router]),
      s("Conformal risk control", "Conformal risk control", "shipped", [bow]),
      s("Retrieval — rule-based candidate ranking", "검색 — 규칙 기반 후보 순위화", "shipped", [router]),
      s("RAG with vector search (sqlite-vec)", "벡터 검색 RAG (sqlite-vec)", "in-progress", [edge]),
    ],
  },
  {
    category: tx("Machine learning & data", "머신러닝 · 데이터"),
    items: [
      s("Python data stack (pandas, NumPy)", "Python 데이터 스택 (pandas, NumPy)", "shipped", [med, edge]),
      s("Medical imaging data (DICOM, pydicom)", "의료 영상 데이터 (DICOM, pydicom)", "shipped", [med]),
      s("Statistical validation (VIF, LR tests, confounders)", "통계 검증 (VIF · LR 검정 · 교란변수)", "prototype", [edge]),
      s("scikit-learn, statsmodels", "scikit-learn, statsmodels", "prototype", [edge]),
      s("Knowledge graphs (Stardog, SPARQL)", "지식그래프 (Stardog, SPARQL)", "prototype", [uam]),
      s("Computer vision (OpenCV, camera frames)", "컴퓨터비전 (OpenCV, 카메라 프레임)", "coursework", [posco]),
      s("PyTorch, CNN architectures (ResNet, EfficientNet)", "PyTorch, CNN 구조 (ResNet, EfficientNet)", "coursework", [posco, med]),
    ],
  },
  {
    category: tx("Systems & backend", "시스템 · 백엔드"),
    items: [
      s("REST APIs (Node.js, Express)", "REST API (Node.js, Express)", "shipped", [vet]),
      s("AWS, domain & DNS, operations", "AWS · 도메인 · DNS · 운영", "shipped", [vet]),
      s("Databases (MySQL, SQLite)", "데이터베이스 (MySQL, SQLite)", "shipped", [vet, router]),
      s("CI (GitHub Actions smoke test)", "CI (GitHub Actions 스모크 테스트)", "shipped", [router]),
      s("Static web (Next.js, TypeScript) — this site", "정적 웹 (Next.js, TypeScript) — 이 사이트", "shipped", []),
    ],
  },
  {
    category: tx("Edge & embedded", "엣지 · 임베디드"),
    items: [
      s("On-device speech recognition (faster-whisper int8)", "온디바이스 음성 인식 (faster-whisper int8)", "prototype", [voice, router]),
      s("Jetson Orin Nano", "Jetson Orin Nano", "in-progress", [edge]),
      s("Local LLM inference (Ollama, Q4 models)", "로컬 LLM 추론 (Ollama, Q4 모델)", "in-progress", [edge]),
      s("TensorRT, INT8 quantization", "TensorRT, INT8 양자화", "planned", [edge]),
      s("Raspberry Pi, MQTT (2018)", "라즈베리파이, MQTT (2018)", "prototype", [{ label: tx("CDI India IoT", "CDI 인도 IoT") }]),
    ],
  },
  {
    category: tx("Programming", "프로그래밍"),
    items: [
      s("Python", "Python", "shipped", [router, bow, voice, med]),
      s("C++", "C++", "prototype", [drone]),
      s("JavaScript / TypeScript", "JavaScript / TypeScript", "shipped", [vet]),
      s("SQL (SQLD certified)", "SQL (SQLD 자격)", "shipped", [vet]),
      s("AI-assisted development (Claude Code)", "AI 코딩 도구 활용 (Claude Code)", "shipped", [router, bow, voice]),
    ],
  },
];
