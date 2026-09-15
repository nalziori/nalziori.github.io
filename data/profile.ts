import { tx, type L } from "@/lib/i18n";
import type { EvidenceKind, Metric } from "./types";

export const profile = {
  name: tx("Jaeyoung Choi", "최재영"),
  altName: tx("최재영", "Jaeyoung Choi"),
  role: "AI Engineer",
  kicker: tx("AI Engineer · Agents · Multimodal · Edge AI", "AI Engineer · 에이전트 · 멀티모달 · 엣지 AI"),
  headline: tx(
    "Building AI systems that can reason, act, and fail safely.",
    "추론하고, 행동하고, 안전하게 실패하는 AI 시스템을 만듭니다.",
  ),
  intro: tx(
    "I decide what a model should judge and what code must guarantee — then I measure before I trust it. Recent work: a multimodal agent checked on held-out data, a financial agent whose math never touches the LLM, and a voice agent that cannot approve its own actions.",
    "모델이 판단할 것과 코드가 보장해야 할 것을 먼저 나누고, 믿기 전에 측정합니다. 최근에는 홀드아웃으로 검증한 멀티모달 에이전트, 금융 계산을 LLM에 맡기지 않는 금융 에이전트, 스스로 행동을 승인할 수 없는 차량 음성 에이전트를 만들었습니다.",
  ),
  email: "wodud00744@gmail.com",
  github: "https://github.com/nalziori",
  currently: tx(
    "Currently in POSCO's K-Digital on-device AI program (560 h, until Nov 2026) and building an offline agent on Jetson Orin Nano with a team of four.",
    "현재 POSCO K-디지털 온디바이스 AI 과정(560시간, 2026년 11월 수료 예정)을 수강하며, 4인 팀으로 Jetson Orin Nano 위의 오프라인 에이전트를 만들고 있습니다.",
  ),
  education: tx(
    "B.S. Global Software Convergence, Kyungpook National University (2018–2024) · Statistics minor · SQLD",
    "경북대학교 글로벌SW융합전공 졸업 (2018–2024) · 통계학 부전공 · SQLD",
  ),
};

export const proof: Metric[] = [
  {
    value: "85 / 3,019",
    label: tx("HackerRank Orchestrate · Sep 2026", "HackerRank Orchestrate · 2026.09"),
    context: tx("Buy or Wait? financial agent · top 2.8%", "Buy or Wait? 금융 에이전트 · 상위 2.8%"),
    evidence: "official",
  },
  {
    value: "129 / 1,983",
    label: tx("HackerRank Orchestrate · Aug 2026", "HackerRank Orchestrate · 2026.08"),
    context: tx("Multimodal notification router · top 6.5%", "멀티모달 알림 라우터 · 상위 6.5%"),
    evidence: "official",
  },
  {
    value: "31,796",
    label: tx("DICOM images validated for training", "학습용으로 검증한 DICOM 영상"),
    context: tx("from 85,054 raw · medical AI internship", "원본 85,054건 중 · 의료 AI 현장실습"),
    evidence: "measured",
  },
  {
    value: "7",
    label: tx("safety checks enforced in code", "코드로 강제한 안전 검사"),
    context: tx("vehicle voice agent · the model can't approve itself", "차량 음성 에이전트 · 모델의 자기 승인 불가"),
    evidence: "implemented",
  },
];

export const about: L[] = [
  tx(
    "I care less about building a model than about how a model should behave inside a real system: what it is allowed to decide, what must stay deterministic, and what happens when it is wrong.",
    "저는 AI 모델을 만드는 것보다, 모델이 실제 시스템 안에서 어떻게 동작해야 하는지를 더 고민합니다. 모델에게 무엇을 판단하게 둘지, 무엇을 결정론적으로 고정할지, 틀렸을 때 어떤 일이 벌어지는지가 제 관심사입니다.",
  ),
  tx(
    "Across a multimodal notification agent, a financial decision agent, a vehicle voice agent, a medical-imaging data pipeline and edge-AI prototypes, I have designed the problem definition, evaluation criteria, deterministic logic and delivery together — not the model in isolation.",
    "텍스트·이미지·음성을 처리하는 멀티모달 에이전트부터 금융 판단 에이전트, 차량 음성 에이전트, 의료 영상 데이터 파이프라인, 엣지 AI 프로토타입까지 — 모델 하나가 아니라 문제 정의, 평가 기준, 결정론 로직, 배포를 함께 설계해 왔습니다.",
  ),
  tx(
    "Before AI, I shipped and operated a web service as a startup's only developer. The habit stuck: define the cost of failure first, then ship the smallest system that handles it.",
    "AI를 하기 전에는 스타트업의 유일한 개발자로 웹 서비스를 출시하고 운영했습니다. 그때 생긴 습관이 지금도 기준입니다. 실패 비용을 먼저 정의하고, 그것을 감당하는 가장 작은 시스템부터 내놓습니다.",
  ),
];

export const principles: { title: L; body: L; proof: L; slug: string }[] = [
  {
    title: tx("Measure Before Optimizing", "최적화 전에 측정한다"),
    body: tx(
      "I don't guess where the bottleneck is. Before building a reranker for weak evidence F1, I measured the candidate set offline: the gold evidence was already in the top 12 for 97% of cases. The leak was selection — 2.93 ids chosen per message against 1.03 in the answers.",
      "병목을 추측하지 않습니다. 근거 F1이 낮을 때 재랭커를 만들기 전에 API 비용 없이 후보 집합부터 측정했습니다. 정답 근거는 이미 상위 12개 안에 97% 들어 있었고, 실제 누수는 선택 단계였습니다. 메시지당 2.93개를 고르는데 정답은 평균 1.03개였습니다.",
    ),
    proof: tx("Message Notification Router", "메시지 알림 라우터"),
    slug: "message-notification-router",
  },
  {
    title: tx("Use LLMs Where They Fit", "LLM은 맞는 곳에만 쓴다"),
    body: tx(
      "LLMs read messy evidence; code does the money. In Buy or Wait?, Gemini only turns messages and document images into typed facts. The 90-day cash-flow simulation, safe amount, plan selection and even the explanation text are deterministic Python.",
      "LLM은 지저분한 증거를 읽고, 돈 계산은 코드가 합니다. Buy or Wait?에서 Gemini는 메시지와 증빙 이미지를 타입이 정해진 사실로 바꾸는 일만 합니다. 90일 현금흐름 시뮬레이션, 안전 금액, 플랜 선택, 설명문까지 결정론적인 Python이 맡습니다.",
    ),
    proof: tx("Buy or Wait? Financial Agent", "Buy or Wait? 금융 에이전트"),
    slug: "buy-or-wait",
  },
  {
    title: tx("Fail Safely", "안전하게 실패한다"),
    body: tx(
      "When a value is missing, ask. When an action can't be undone, confirm. When the vehicle state makes it unsafe, refuse — and never let the model approve its own action. Pending confirmations live in local code the model can't write to.",
      "값이 없으면 되묻고, 되돌릴 수 없는 동작은 확인을 받고, 차량 상태상 위험하면 거부합니다. 그리고 모델이 자기 행동을 승인하지 못하게 합니다. 확인 대기 상태는 모델이 건드릴 수 없는 로컬 코드에만 있습니다.",
    ),
    proof: tx("In-Cabin Voice Agent", "차량 인캐빈 음성 에이전트"),
    slug: "in-cabin-voice-agent",
  },
  {
    title: tx("Ship the System", "시스템을 끝까지 내놓는다"),
    body: tx(
      "A model is one stage of a system. When an outsourced app had stalled for nearly three months, I proposed launching on the web first and shipped it in 3–4 weeks — about 30 APIs, AWS, MySQL, a domain — then kept it running.",
      "모델은 시스템의 한 단계일 뿐입니다. 외주 앱이 석 달 가까이 진척이 없을 때 웹 선출시를 제안했고, 3~4주 만에 API 30여 개와 AWS·MySQL·도메인까지 연결해 출시한 뒤 운영했습니다.",
    ),
    proof: tx("VETWEEN", "베트윈"),
    slug: "vetween",
  },
];

export const evidenceLabels: Record<EvidenceKind, { name: L; desc: L }> = {
  official: { name: tx("Official", "공식"), desc: tx("Published by an external organizer", "외부 주최 측이 발표한 결과") },
  measured: { name: tx("Measured", "실측"), desc: tx("Measured by me; reproducible from the repo or source files", "직접 측정, 저장소·원본 파일로 재현 가능") },
  record: { name: tx("Record", "기록"), desc: tx("From career documents, databases or press", "경력 문서·DB·기사 기록") },
  implemented: { name: tx("Implemented", "구현"), desc: tx("Behavior verified in code and self-tests — not a performance number", "코드와 셀프테스트로 확인한 동작 — 성능 수치 아님") },
  estimated: { name: tx("Estimated", "추정"), desc: tx("Calculated on paper, not measured", "계산으로 낸 추정치, 미측정") },
  "in-progress": { name: tx("In progress", "진행 중"), desc: tx("Being built now", "현재 만드는 중") },
  planned: { name: tx("Planned", "계획"), desc: tx("Not started, or not measured yet", "미착수 또는 아직 미측정") },
};

export const research = {
  papers: [
    {
      title: tx(
        "Analysis and Prediction of Passenger Departure Rate by UAM Latency Using Knowledge Graph",
        "지식그래프를 활용한 UAM 지연시간에 따른 승객 이탈률 분석 및 예측",
      ),
      venue: tx(
        "Korea Intelligent Information Systems Society (KIISS), 2023 Spring Conference · May 26, 2023",
        "한국지능정보시스템학회 2023 춘계학술대회 · 2023.05.26",
      ),
      role: tx(
        "Presented · co-first author (four undergraduates, equal contribution) · with SK Telecom",
        "발표 · 공동 제1저자(학부생 4인 동등 기여) · SK텔레콤 공동",
      ),
    },
    {
      title: tx(
        "Analysis of the Passenger Abandonment Rate in Relation to UAM Traffic Connection Delay",
        "UAM 교통 연계 지연 시간에 따른 승객 이탈률 분석",
      ),
      venue: tx("The Korean Society for Aeronautical and Space Sciences (KSAS), 2023 Fall Conference", "한국항공우주학회 2023 추계학술대회"),
      role: tx("Presented · co-author", "발표 · 공저자"),
    },
  ],
  feature: {
    label: tx("Project featured on SK Telecom's DEVOCEAN tech blog (Aug 2023)", "SK텔레콤 기술 블로그 DEVOCEAN에 프로젝트 소개 (2023.08)"),
    href: "https://devocean.sk.com/search/techBoardDetail.do?ID=165226",
  },
  interest: {
    title: tx("Research interest: UAM-based tactical support platform", "연구 관심: UAM 기반 미래 전술 지원 플랫폼"),
    body: tx(
      "Small-unit tactical UAM and a drone-carrier concept, examined through unit economics, autonomy, and when a remote human should intervene.",
      "소부대 전술 UAM과 드론 캐리어 개념을, 단위 비용 구조·자율성·원격 개입이 필요한 시점이라는 관점에서 검토하고 있습니다.",
    ),
    status: tx("Idea stage — no implementation or publication", "아이디어 단계 — 구현·발표 없음"),
  },
};

export const ui = {
  nav: [
    { href: "/#work", label: tx("Work", "프로젝트") },
    { href: "/#principles", label: tx("Principles", "원칙") },
    { href: "/#timeline", label: tx("Timeline", "타임라인") },
    { href: "/#skills", label: tx("Skills", "기술") },
    { href: "/#contact", label: tx("Contact", "연락처") },
  ],
  skip: tx("Skip to content", "본문으로 건너뛰기"),
  menu: tx("Menu", "메뉴"),
  scroll: tx("Scroll", "스크롤"),
  sections: {
    about: tx("About", "소개"),
    principles: tx("How I Build AI Systems", "AI 시스템을 만드는 방식"),
    principlesIntro: tx("Four rules I keep coming back to — each tied to the project where it was tested.", "반복해서 돌아가는 네 가지 기준입니다. 각각 실제로 검증된 프로젝트와 연결했습니다."),
    featured: tx("Featured Projects", "주요 프로젝트"),
    featuredIntro: tx(
      "Problem first, then the boundary between model and code, then how it was measured. Every number carries its source.",
      "문제를 먼저 정의하고, 모델과 코드의 경계를 정하고, 어떻게 측정했는지까지 보여줍니다. 모든 숫자에는 출처를 붙였습니다.",
    ),
    other: tx("Other Projects", "그 밖의 프로젝트"),
    timeline: tx("Experience & Timeline", "경험과 타임라인"),
    timelineIntro: tx(
      "Not a list of fields — one direction: putting software, then AI, into systems that have to work.",
      "여러 분야를 찍어 본 기록이 아니라 한 방향입니다. 소프트웨어를, 그리고 AI를 실제로 동작해야 하는 시스템에 넣는 일.",
    ),
    skills: tx("Skills, with Evidence", "기술 — 사용처와 함께"),
    skillsIntro: tx(
      "Each skill links to where it was used, and says honestly how deep that use went.",
      "각 기술을 실제로 쓴 곳과 연결하고, 어느 수준까지 썼는지 그대로 표시했습니다.",
    ),
    research: tx("Research", "연구"),
    contact: tx("Contact", "연락처"),
    contactBody: tx(
      "Open to AI Engineer and Agent Engineer roles. Email is the fastest way to reach me.",
      "AI Engineer · Agent Engineer 포지션에 열려 있습니다. 이메일이 가장 빠른 연락 방법입니다.",
    ),
  },
  evidenceLegend: tx("How to read the numbers", "숫자 읽는 법"),
  readCase: tx("Read case study", "케이스 스터디 보기"),
  viewRepo: tx("View repository", "저장소 보기"),
  evidenceIn: tx("Evidence", "근거"),
  pending: tx("확인 필요", "확인 필요"),
  detail: {
    back: tx("All projects", "전체 프로젝트"),
    onThisPage: tx("On this page", "목차"),
    context: tx("Context", "배경"),
    role: tx("My Role", "내 역할"),
    problem: tx("Problem", "문제"),
    architecture: tx("Architecture", "아키텍처"),
    decisions: tx("Key Engineering Decisions", "핵심 설계 결정"),
    evaluation: tx("Evaluation", "평가 방법"),
    results: tx("Results", "결과"),
    lessons: tx("What I Learned", "배운 점"),
    links: tx("Links", "링크"),
    mine: tx("What I did", "제가 한 일"),
    others: tx("Done by others or with tools", "다른 사람·도구가 한 일"),
    why: tx("Why", "이유"),
    rejected: tx("Rejected", "기각한 대안"),
    next: tx("Next project", "다음 프로젝트"),
    status: tx("Status", "상태"),
    stack: tx("Stack", "기술"),
    year: tx("When", "기간"),
    parallel: tx("in parallel", "병렬"),
  },
  stages: {
    input: tx("Input", "입력"),
    llm: tx("LLM", "LLM"),
    model: tx("Local model", "로컬 모델"),
    code: tx("Deterministic code", "결정론 코드"),
    gate: tx("Gate / validation", "게이트·검증"),
    output: tx("Output", "출력"),
  },
  footer: tx(
    "Every claim on this site was checked against source files, repositories or official results (Sep 2026).",
    "이 사이트의 모든 내용은 원본 파일·저장소·공식 결과와 대조해 작성했습니다 (2026.09).",
  ),
};
