import { tx, type L } from "@/lib/i18n";

export type Phase = "early" | "product" | "research" | "ai" | "agents" | "systems" | "base";

export const phaseLabels: Record<Phase, L> = {
  early: tx("Software", "소프트웨어"),
  product: tx("Backend & product", "백엔드 · 제품"),
  research: tx("Research & data", "연구 · 데이터"),
  ai: tx("Medical AI data", "의료 AI 데이터"),
  agents: tx("AI agents", "AI 에이전트"),
  systems: tx("Systems & edge", "시스템 · 엣지"),
  base: tx("Foundation", "기반"),
};

/** Direction shown above the timeline. */
export const growth: Phase[] = ["early", "product", "research", "ai", "agents", "systems"];

export type TimelineItem = { date: string; phase: Phase; title: L; body: L; slug?: string };

export const timeline: TimelineItem[] = [
  {
    date: "2018.07–08",
    phase: "early",
    title: tx("IoT at Christ University's Center for Digital Innovation, India", "인도 Christ University 디지털혁신센터 IoT 연수"),
    body: tx(
      "Selected as one of 20 through an English interview. A four-person team built a Raspberry Pi + MQTT alarm that detects wild animals approaching farmland, presented in English.",
      "영어 면접을 거쳐 20명 중 한 명으로 선발. 4인 팀으로 농경지에 유해조수가 접근하면 감지해 경보를 울리는 라즈베리파이 + MQTT 장치를 만들고 영어로 발표했습니다.",
    ),
  },
  {
    date: "2018.09–11",
    phase: "early",
    title: tx("Startup idea competitions", "창업 아이디어 경진대회"),
    body: tx(
      "KNU PRIME Startup League idea competition, grand prize → ISCC 2018 (Shaoxing, China), Excellence Creativity Award for comforTABLE, a table-ordering app concept that was my idea; I led planning and screen layout.",
      "경북대 PRIME창업리그 창업아이디어 공모전 최우수상 → ISCC 2018(중국 샤오싱) Excellence Creativity Award. 출전작은 제 아이디어인 테이블오더 앱 comforTABLE이며, 기획과 화면 레이아웃 설계를 맡았습니다.",
    ),
  },
  {
    date: "2020.04–2021.10",
    phase: "base",
    title: tx("Military service, Republic of Korea Army", "병역 · 육군 병장 만기 전역"),
    body: tx("Defense Security Support Command — communications and network.", "군사안보지원사령부 통신·네트워크."),
  },
  {
    date: "2022.02–12",
    phase: "product",
    title: tx("VETWEEN — lead and sole developer", "베트윈 — 리드·유일 개발자"),
    body: tx("Proposed a web-first launch and shipped it in 3–4 weeks: Node.js, Express, MySQL, AWS. Operated it to 1,000 members.", "웹 선출시를 제안해 3~4주 만에 출시(Node.js · Express · MySQL · AWS). 회원 1,000명까지 운영."),
    slug: "vetween",
  },
  {
    date: "2023.03–06",
    phase: "research",
    title: tx("SK Telecom industry-academia project — UAM knowledge graph", "SK텔레콤 산학협력 — UAM 지식그래프"),
    body: tx("Knowledge graph, research design and paper writing; presented at KIISS 2023 Spring (co-first author) and KSAS 2023 Fall.", "지식그래프 구축·연구 설계·논문 작성, 한국지능정보시스템학회 2023 춘계(공동 제1저자)와 한국항공우주학회 2023 추계에서 발표."),
    slug: "uam-knowledge-graph",
  },
  {
    date: "2023.06–07",
    phase: "ai",
    title: tx("Beamworks R&D internship — medical AI data", "빔웍스 연구개발팀 현장실습 — 의료 AI 데이터"),
    body: tx("Validated 85,054 mammography DICOM images down to a 31,796-image training set with traceable rejection flags.", "유방촬영 DICOM 85,054건을 추적 가능한 탈락 플래그와 함께 검증해 학습용 31,796건으로 확정."),
    slug: "medical-imaging-data-pipeline",
  },
  {
    date: "2023.10–11",
    phase: "base",
    title: tx("C++ and data-engineering coursework", "C++ · 데이터 엔지니어링 수료"),
    body: tx(
      "Coursera: C++ Programming for Unreal Game Development specialization (UC Colorado Springs, 4 courses), Linux & Bash and Python & SQL for data engineering.",
      "Coursera: C++ Programming for Unreal Game Development 전문과정(UC Colorado Springs, 4개 강좌), Linux·Bash 및 Python·SQL 데이터 엔지니어링 과정.",
    ),
  },
  {
    date: "2024.02",
    phase: "base",
    title: tx("B.S., Kyungpook National University", "경북대학교 졸업"),
    body: tx("Global Software Convergence (School of Computer Science & Engineering) · Statistics minor.", "IT대학 컴퓨터학부 글로벌소프트웨어융합전공 · 통계학 부전공."),
  },
  {
    date: "2026.05–06",
    phase: "early",
    title: tx("UE5 drone flight simulator (C++)", "UE5 드론 비행 시뮬레이터 (C++)"),
    body: tx("Physics, PID attitude control and input handling in Unreal Engine 5.1–5.3.", "언리얼 엔진 5.1~5.3에서 물리, PID 자세 제어, 입력 처리를 구현."),
  },
  {
    date: "2026.06",
    phase: "agents",
    title: tx("HackerRank Orchestrate, June — multimodal damage-claim verification", "HackerRank Orchestrate 6월 — 멀티모달 파손 보상 청구 판정"),
    body: tx(
      "762 / 1,773. A single vision call per claim, scored on 11 of 20 samples after quota failures, with a different model version than the one submitted — the evaluation lesson that shaped August.",
      "762 / 1,773위. 청구마다 비전 모델을 한 번 호출했고, 할당량 실패로 샘플 20건 중 11건만 채점했으며, 채점한 모델 버전과 제출 버전이 달랐습니다. 이 평가의 허점이 8월 방식을 바꿨습니다.",
    ),
  },
  {
    date: "2026.07–",
    phase: "systems",
    title: tx("POSCO K-Digital: On-device AI industrial software (560 h)", "POSCO K-디지털: 온디바이스 AI 기반 산업용 소프트웨어 개발 (560시간)"),
    body: tx("Machine learning → deep learning → computer vision on concrete, die-casting and steel process data. Until Nov 2026.", "콘크리트·다이캐스팅·철강 공정 데이터로 머신러닝 → 딥러닝 → 컴퓨터비전. 2026년 11월 수료 예정."),
  },
  {
    date: "2026.08",
    phase: "agents",
    title: tx("Multimodal message notification router", "멀티모달 메시지 알림 라우터"),
    body: tx("Held-out evaluation, a rollback after regression, 129 / 1,983.", "홀드아웃 평가, 퇴보 후 롤백, 129 / 1,983위."),
    slug: "message-notification-router",
  },
  {
    date: "2026.08–",
    phase: "systems",
    title: tx("On-device heart disease risk PoC", "온디바이스 심장병 리스크 PoC"),
    body: tx("Jetson deployment budget fixed first; hypothesis-driven validation.", "Jetson 배포 예산을 먼저 고정하고 가설 기반으로 검증."),
    slug: "edge-ai-jetson",
  },
  {
    date: "2026.09",
    phase: "agents",
    title: tx("In-cabin voice agent and Buy or Wait? financial agent", "차량 음성 에이전트 · Buy or Wait? 금융 에이전트"),
    body: tx("Seven code-enforced safety checks; an LLM limited to evidence extraction — 85 / 3,019.", "코드로 강제한 안전 검사 7단계, 증거 추출로만 제한한 LLM — 85 / 3,019위."),
    slug: "buy-or-wait",
  },
  {
    date: "2026.09–",
    phase: "systems",
    title: tx("ShiftLink — offline agent on Jetson Orin Nano (team)", "ShiftLink — Jetson Orin Nano 오프라인 에이전트 (팀)"),
    body: tx("AI role in a four-person team: model comparison, extraction and grounding validation, synthetic data. In progress.", "4인 팀의 AI 담당: 모델 비교, 추출·근거 검증, 합성 데이터. 진행 중."),
    slug: "edge-ai-jetson",
  },
];
