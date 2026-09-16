import leaderboard from "@/assets/router-leaderboard.png";
import { tx } from "@/lib/i18n";
import type { Project } from "./types";

/**
 * Project content. Facts come from the public repos, the Obsidian wiki and source files;
 * numbers must match those sources. Add a project by appending an object — `detail` makes a case-study page.
 */
export const projects: Project[] = [
  // ───────────────────────────────────────────── 1. Message Notification Router
  {
    slug: "message-notification-router",
    featured: true,
    title: tx("Multimodal Message Notification Router", "멀티모달 메시지 알림 라우터"),
    category: tx("Multimodal AI agent · Evaluation", "멀티모달 AI 에이전트 · 평가"),
    year: "2026.08",
    status: tx("Hackathon submission · 24 h · solo", "해커톤 제출 · 24시간 · 개인 참가"),
    summary: tx(
      "Decides whether a text, image or voice message should interrupt a user now, wait for a digest, or be muted — citing evidence, checked on a held-out set, and rolled back when a “better” prompt regressed.",
      "텍스트·이미지·음성 메시지를 받아 지금 알릴지, 모아서 보여줄지, 끌지를 근거와 함께 결정합니다. 홀드아웃으로 검증했고, ‘개선’이 퇴보로 확인되자 되돌렸습니다.",
    ),
    technologies: ["Python", "Anthropic API (vision · JSON schema)", "faster-whisper", "Pillow", "SQLite", "Audit ledger", "GitHub Actions"],
    github: "https://github.com/nalziori/message-notification-router",
    cover: { kind: "flow" },
    highlights: [
      { value: "129 / 1,983", label: tx("official rank", "공식 순위"), context: tx("69.7 / 100 · top 6.5%", "69.7 / 100 · 상위 6.5%"), evidence: "official" },
      { value: "84%", label: tx("held-out action accuracy", "홀드아웃 action 정확도"), context: tx("19 cases never used for tuning", "튜닝에 쓰지 않은 19건"), evidence: "measured" },
      { value: "97%", label: tx("gold evidence in top-12 candidates", "상위 12개 후보 내 정답 근거"), context: tx("offline, 0 API calls", "오프라인 측정, API 0회"), evidence: "measured" },
    ],
    detail: {
      context: tx(
        "HackerRank Orchestrate (August 2026) asked for a personalized notification router for a WhatsApp-style stream: 110 messages mixing text, posters, screenshots and voice notes. The output for each message is notify (interrupt now), digest (hold for later) or mute. The same message can be notify for one user and mute for another, depending on relationships and reaction history. Some messages carried simulated prompt injections — to be classified, never obeyed.",
        "HackerRank Orchestrate(2026년 8월) 과제는 WhatsApp 형태의 메시지 스트림을 위한 개인화 알림 라우터였습니다. 텍스트·포스터·스크린샷·음성 메모가 섞인 110개 메시지마다 notify(즉시 알림), digest(모아보기), mute(무음) 중 하나를 골라야 합니다. 같은 메시지도 관계와 반응 이력에 따라 누군가에게는 notify, 누군가에게는 mute가 됩니다. 데이터에는 시뮬레이션된 프롬프트 인젝션이 섞여 있어, 따를 지시가 아니라 분류 대상으로 다뤄야 했습니다.",
      ),
      roleShort: tx(
        "Solo — spec, evaluation design and keep/revert calls; code written with Claude Code",
        "개인 참가 — 명세·평가 설계·유지/롤백 결정, 코드는 Claude Code로 작성",
      ),
      role: {
        mine: [
          tx("Solo entry. Wrote the pipeline spec and chose Claude vision plus local Whisper under a cost limit, requiring a cost report before any API run.", "개인 참가. 파이프라인 명세를 작성하고, 비용 한도 안에서 Claude 비전과 로컬 Whisper 조합을 골랐으며, API 실행 전에는 비용 보고를 먼저 받았습니다."),
          tx("Spotted that several .jpg files were really WebP or AVIF and required format detection by content.", "`.jpg` 파일 일부가 실제로는 WebP·AVIF임을 발견하고 확장자가 아니라 내용으로 포맷을 판별하게 했습니다."),
          tx("Designed the evaluation loop: asked for a separate held-out set, proposed the internal reasoning fields and the key-phrase experiment, and made the call to revert it when it regressed.", "평가 루프를 설계했습니다. 별도 홀드아웃 세트를 요청하고 내부 추론 필드와 핵심 구절 실험을 제안했습니다. 퇴보가 확인되자 되돌리기로 결정했습니다."),
          tx("Managed API spend and narrowed verification scope as the budget ran down.", "예산이 줄어드는 상황에서 API 지출을 관리하고 검증 범위를 조정했습니다."),
        ],
        others: [
          tx("Code was written with Claude Code (Sonnet 5): the pipeline, the 19 synthetic held-out cases and their labels, the “no rush” rule, the confidence analysis, and executing the rollback.", "코드는 Claude Code(Sonnet 5)로 작성했습니다. 파이프라인, 합성 홀드아웃 19건과 정답 라벨, ‘no rush’ 규칙 추가, 확신도 분석, 롤백 실행이 여기에 해당합니다."),
          tx("The dataset, problem statement and two empty stub files came from the organizers.", "데이터셋·문제 명세·빈 스텁 파일 2개는 주최 측이 제공했습니다."),
        ],
      },
      problem: [
        tx("Three modalities, one decision. Posters and screenshots need description and OCR; voice notes need transcription, and the Messages API has no audio input.", "세 가지 모달리티를 하나의 결정으로 묶어야 합니다. 포스터·스크린샷은 설명과 OCR이, 음성 메모는 전사가 필요한데 Messages API에는 오디오 입력이 없습니다."),
        tx("File extensions lie. Several .jpg files were WebP, AVIF or PNG — and the vision API rejects AVIF.", "확장자를 믿을 수 없습니다. `.jpg` 중 일부가 실제로는 WebP·AVIF·PNG였고, 비전 API는 AVIF를 받지 않습니다."),
        tx("Personalization. Sender trust, group and business relationships, opt-ins and past reactions all change the right action.", "개인화가 필요합니다. 발신자 신뢰도, 그룹·비즈니스 관계, 수신 동의, 과거 반응이 모두 정답 행동을 바꿉니다."),
        tx("Evidence. Every decision must cite past message ids that actually justify it.", "근거가 필요합니다. 결정마다 그 판단을 실제로 뒷받침하는 과거 메시지 id를 인용해야 합니다."),
        tx("Reliability. A failed classification can't drop a row; the contract is one row per message.", "신뢰성도 요건입니다. 분류에 실패해도 행을 빠뜨리면 안 되며, 메시지마다 한 행이라는 출력 계약이 있습니다."),
        tx("Only 30 solved examples — easy to overfit within 24 hours.", "정답이 공개된 예시는 30건뿐이라 24시간 안에 과적합하기 쉽습니다."),
      ],
      architecture: {
        stages: [
          { kind: "input", label: tx("Incoming message", "수신 메시지"), detail: tx("text · image · voice note", "텍스트 · 이미지 · 음성 메모") },
          [
            { kind: "llm", label: tx("Image → description + OCR", "이미지 → 설명 + OCR"), detail: tx("Pillow decodes by content first; cached by SHA-256", "Pillow로 실제 포맷 판별 후 분석, SHA-256 캐시") },
            { kind: "model", label: tx("Voice → transcript", "음성 → 전사"), detail: tx("local faster-whisper, no API cost", "로컬 faster-whisper, API 비용 없음") },
          ],
          { kind: "code", label: tx("Context assembly", "컨텍스트 조립"), detail: tx("profile · relationship · cached media · top-12 relevant history from SQLite", "프로필 · 관계 · 캐시된 미디어 분석 · SQLite에서 관련 이력 상위 12건") },
          { kind: "llm", label: tx("Router (JSON schema)", "라우터 (JSON 스키마)"), detail: tx("fills trust, urgency, risk, repetition first — then the action", "신뢰도·긴급도·위험도·반복성을 먼저 채운 뒤 action 결정") },
          { kind: "gate", label: tx("Validation & fallback", "검증 · 폴백"), detail: tx("cited ids must exist in context; failures become low-confidence digest rows", "인용 id가 컨텍스트에 실재하는지 확인, 실패는 낮은 확신도의 digest 행으로 기록") },
          { kind: "output", label: tx("output.csv + audit ledger", "output.csv + 감사 원장"), detail: tx("notify / digest / mute, with reason and evidence", "notify / digest / mute, 이유와 근거 포함") },
        ],
        note: tx(
          "Only two stages call a hosted model. The model never sees the full CSVs — each call gets a context assembled for that one message, and an append-only ledger records Planning → Execution → Evidence → Verification → Reflection → State for every decision.",
          "호스팅 모델을 부르는 단계는 두 곳뿐입니다. 모델은 전체 CSV를 보지 않고, 호출마다 해당 메시지에 필요한 컨텍스트만 받습니다. 모든 결정은 append-only 원장에 계획 → 실행 → 근거 → 검증 → 성찰 → 상태 순서로 기록됩니다.",
        ),
      },
      decisions: [
        {
          title: tx("Force intermediate reasoning before the label", "라벨보다 중간 추론을 먼저 강제"),
          why: tx(
            "The schema makes the model fill sender trust, urgency, risk, repetition and type candidates before it may emit an action, so it can't pick a category first and rationalize after. Together with a “default to digest when ambiguous” rule, action accuracy on the 30 solved examples went from 86.67% to 93.33%.",
            "스키마가 발신자 신뢰도·긴급도·위험도·반복성·유형 후보를 먼저 채워야 action을 낼 수 있게 합니다. 카테고리를 먼저 고른 뒤 합리화하는 것을 막기 위해서입니다. ‘애매하면 digest’ 규칙과 함께 적용해 공개 30건의 action 정확도가 86.67%에서 93.33%로 올랐습니다.",
          ),
          rejected: tx("A free-form label with a reason attached afterwards.", "라벨을 먼저 내고 이유를 뒤에 붙이는 출력"),
        },
        {
          title: tx("Measure the retrieval ceiling before adding a reranker", "재랭커를 붙이기 전에 검색 천장부터 측정"),
          why: tx(
            "An external review prescribed BM25 or embedding reranking for the ~50% evidence F1. An offline ablation with zero API calls showed the gold evidence was already in the rule-based top 12 for 97% of cases — a perfect reranker was worth at most 3 points. The real leak was selection: 2.93 ids emitted per message against 1.03 in the answers.",
            "외부 리뷰는 약 50%인 근거 F1을 올리려면 BM25나 임베딩 재랭킹이 필요하다고 했습니다. API 호출 없이 오프라인 ablation을 돌려 보니, 정답 근거는 규칙 기반 상위 12개 안에 이미 97% 들어 있었습니다. 완벽한 재랭커를 붙여도 최대 3점이었습니다. 실제 누수는 선택 단계였고, 메시지당 2.93개를 고르는데 정답은 평균 1.03개였습니다.",
          ),
          rejected: tx("Building the reranker first.", "재랭커부터 구현"),
        },
        {
          title: tx("Keep the evidence cap as a measurement, not a shipped fix", "근거 개수 상한은 적용하지 않고 측정으로 남김"),
          why: tx(
            "Capping evidence at one id moves F1 on the 30 examples from 42% to 47%, but recall falls from 81% to 45% and the cap was tuned on n = 30 — the same trap as the iteration-8 regression. It stays unapplied until confirmed on held-out data.",
            "근거를 1개로 제한하면 30건 기준 F1이 42%에서 47%가 되지만, recall이 81%에서 45%로 떨어지고 n = 30에서 맞춘 값입니다. 8차 반복의 퇴보와 같은 함정이라 홀드아웃에서 확인하기 전까지 적용하지 않았습니다.",
          ),
          rejected: tx("Shipping the +5-point change.", "+5점 변경을 바로 적용"),
        },
        {
          title: tx("Trust content, not extensions", "확장자가 아니라 내용을 믿기"),
          why: tx(
            "Every image is decoded with Pillow and re-encoded as a bounded-size JPEG, so disguised WebP and AVIF files work and payloads stay small.",
            "모든 이미지를 Pillow로 디코드한 뒤 크기를 제한한 JPEG로 재인코딩합니다. 위장된 WebP·AVIF도 처리되고 전송량도 줄어듭니다.",
          ),
        },
        {
          title: tx("Local speech recognition instead of a paid API", "유료 API 대신 로컬 음성 인식"),
          why: tx(
            "Transcription runs locally with faster-whisper behind a swappable provider interface — no API cost and no system ffmpeg dependency.",
            "교체 가능한 인터페이스 뒤에서 faster-whisper로 로컬 전사합니다. API 비용이 없고 시스템 ffmpeg도 필요 없습니다.",
          ),
          rejected: tx("A hosted transcription API.", "호스팅 전사 API"),
        },
        {
          title: tx("Never drop a row", "행을 절대 빠뜨리지 않기"),
          why: tx(
            "A failed classification writes a low-confidence digest/unknown fallback row instead of disappearing, so the output contract holds even under API errors.",
            "분류에 실패하면 행을 없애지 않고 낮은 확신도의 digest/unknown 폴백 행을 기록합니다. API 오류가 나도 출력 계약이 유지됩니다.",
          ),
        },
      ],
      evaluation: [
        tx("A scoring harness measures action and message-type accuracy and evidence F1, prints a confusion matrix, and separately flags degenerate strategies, schema violations and evidence ids that don't exist in the user's history.", "채점 하니스는 action·메시지 유형 정확도와 근거 F1을 측정하고 혼동 행렬을 출력합니다. 한 라벨로 몰리는 퇴화 전략, 스키마 위반, 사용자 이력에 없는 근거 id도 따로 잡아냅니다."),
        tx("Eight iterations of build → run → inspect failures → fix → rerun. A fix for the 30 solved examples was accepted only if it could be stated as a general rule.", "만들기 → 실행 → 실패 사례 확인 → 수정 → 재실행을 8번 반복했습니다. 공개 30건에 맞춘 수정은 일반 규칙으로 설명될 때만 받아들였습니다."),
        tx("Held-out check: 19 synthetic cases never used for tuning. At the same checkpoint, the 30 tuned examples scored 86.67% and the held-out set 74% — the gap it was built to expose. A rule for low-urgency phrasing such as “no rush” lifted held-out accuracy to 84%.", "홀드아웃 검증: 튜닝에 쓰지 않은 합성 19건. 같은 시점에 공개 30건은 86.67%, 홀드아웃은 74%였습니다. 홀드아웃을 만든 이유가 바로 이 격차였고, ‘no rush’ 같은 저긴급 표현 규칙을 추가해 84%로 올렸습니다."),
        tx("Iteration 8 added a key-phrase grounding field; re-scoring showed action accuracy falling from 93.33% to 86.67%, so it was reverted.", "8차에 핵심 구절 근거 필드를 추가했더니 재채점에서 action 정확도가 93.33%에서 86.67%로 떨어져 되돌렸습니다."),
        tx("A harness bug worth remembering: the sample file used a different id namespace, so a naive comparison silently scored 0/30 instead of failing loudly.", "기억할 만한 하니스 버그도 있었습니다. 샘플 파일의 id 체계가 달라, 단순 비교는 오류 대신 조용히 0/30을 보고했습니다."),
        tx("Limitation: the local harness watched labels only. Reason quality and evidence relevance — both part of the official grade — were never measured locally.", "한계: 로컬 하니스는 라벨만 봤습니다. 공식 채점에 들어간 이유 문장 품질과 근거 관련성은 로컬에서 측정하지 않았습니다."),
      ],
      results: [
        { value: "93.33%", label: tx("action accuracy", "action 정확도"), context: tx("30 solved examples — the set the prompt was tuned on", "공개 정답 30건 — 프롬프트를 맞춘 세트"), evidence: "measured" },
        { value: "84%", label: tx("held-out action accuracy", "홀드아웃 action 정확도"), context: tx("19 synthetic cases never used for tuning", "튜닝에 쓰지 않은 합성 19건"), evidence: "measured" },
        { value: "97%", label: tx("gold evidence within top-12 candidates", "상위 12개 후보 내 정답 근거"), context: tx("offline ablation, 0 API calls", "오프라인 ablation, API 0회"), evidence: "measured" },
        { value: "8", label: tx("evaluation iterations", "평가 반복"), context: tx("one reverted after a regression", "퇴보로 1회 롤백"), evidence: "measured" },
        { value: "$0.75", label: tx("final full run", "최종 전체 실행 비용"), context: tx("110 of 110 messages routed", "110건 전체 라우팅"), evidence: "measured" },
        { value: "129 / 1,983", label: tx("official rank", "공식 순위"), context: tx("69.7 / 100 · top 6.5%", "69.7 / 100 · 상위 6.5%"), evidence: "official" },
      ],
      resultTable: {
        caption: tx("Same competition series, different problems — side by side, not a controlled comparison", "같은 대회 시리즈, 다른 문제 — 나란히 둘 뿐 통제된 비교가 아닙니다"),
        head: [tx("Round", "회차"), tx("Task", "과제"), tx("Score", "점수"), tx("Rank", "순위")],
        rows: [
          [tx("June 2026", "2026.06"), tx("Multimodal damage-claim verification", "멀티모달 파손 보상 청구 판정"), "48.0 / 100", "762 / 1,773"],
          [tx("August 2026", "2026.08"), tx("This notification router", "이 알림 라우터"), "69.7 / 100", "129 / 1,983"],
        ],
        note: tx(
          "August breakdown: output 20.4/30 · code 22.2/30 · AI-judge interview 19.2/30 · process transcript 7.9/10. The June transcript scored 0 because of a format error, so the transcript gain isn't counted as improvement.",
          "8월 세부 점수: 출력 20.4/30 · 코드 22.2/30 · AI 심사 인터뷰 19.2/30 · 과정 기록 7.9/10. 6월 과정 기록 0점은 형식 오류 때문이라 이 항목의 상승은 개선으로 보지 않습니다.",
        ),
      },
      image: {
        src: leaderboard,
        alt: tx("HackerRank result card: finished #129 of 1,983, final score 69.7 out of 100", "HackerRank 결과 카드: 1,983명 중 129위, 최종 점수 69.7/100"),
        caption: tx("Official result card (August 2026)", "공식 결과 카드 (2026년 8월)"),
      },
      lessons: [
        tx("An eval that only watches labels will report 93% while the parts it doesn't watch decide the grade. Define “good” for every graded output before tuning.", "라벨만 보는 평가는 93%를 보고하는 동안 보지 않은 부분이 점수를 결정합니다. 튜닝 전에 채점되는 모든 출력의 기준을 먼저 정해야 합니다."),
        tx("A held-out set is cheap insurance. The 30-example score looked finished; 74% on unseen cases said otherwise.", "홀드아웃은 값싼 보험입니다. 공개 30건 점수는 끝난 것처럼 보였지만, 처음 보는 입력의 74%는 그렇지 않다고 말했습니다."),
        tx("Measure a stage before replacing it — the reranker would have optimized a stage already at 97%.", "교체하기 전에 그 단계를 측정해야 합니다. 재랭커는 이미 97%인 단계를 최적화할 뻔했습니다."),
        tx("Negative results are results. The reverted field and the unapplied cap are both documented in the repo.", "부정적인 결과도 결과입니다. 되돌린 필드와 적용하지 않은 상한 모두 저장소에 기록했습니다."),
      ],
      links: [
        { label: tx("GitHub repository", "GitHub 저장소"), href: "https://github.com/nalziori/message-notification-router" },
        { label: tx("Evaluation write-up", "평가 문서"), href: "https://github.com/nalziori/message-notification-router/blob/main/docs/EVALUATION.md" },
        { label: tx("Architecture notes", "아키텍처 문서"), href: "https://github.com/nalziori/message-notification-router/blob/main/docs/ARCHITECTURE.md" },
      ],
    },
  },

  // ───────────────────────────────────────────── 2. Buy or Wait?
  {
    slug: "buy-or-wait",
    featured: true,
    title: tx("Buy or Wait? — Financial Decision Agent", "Buy or Wait? — 금융 의사결정 에이전트"),
    category: tx("Agent architecture · Decision safety", "에이전트 아키텍처 · 결정 안전성"),
    year: "2026.09",
    status: tx("Hackathon submission · 24 h · solo", "해커톤 제출 · 24시간 · 개인 참가"),
    summary: tx(
      "Decides whether someone can safely afford a purchase — pay now, split, use installments, wait, or don't. The LLM only extracts evidence; every number and decision comes from a deterministic 90-day cash-flow engine.",
      "사용자가 지출을 감당할 수 있는지 판단해 전액·분할·할부·대기·비추천 중 하나를 권합니다. LLM은 증거 추출만 하고, 모든 숫자와 결정은 결정론적인 90일 현금흐름 엔진이 만듭니다.",
    ),
    technologies: ["Python", "Gemini 3.5 Flash", "Deterministic simulation", "Conformal risk control", "SHA-256 cache", "Assert-based validation"],
    github: "https://github.com/nalziori/buy-or-wait-financial-agent",
    cover: { kind: "flow" },
    highlights: [
      { value: "85 / 3,019", label: tx("official rank", "공식 순위"), context: tx("top 2.8%", "상위 2.8%"), evidence: "official" },
      { value: "40% → 20%", label: tx("safety-critical over-estimates", "위험한 과대 추정 비율"), context: tx("25 public samples", "공개 샘플 25건"), evidence: "measured" },
      { value: "231 → 11", label: tx("LLM calls after batching", "배치 후 LLM 호출 수"), context: tx("reruns: 0 calls", "재실행 시 0회"), evidence: "measured" },
    ],
    detail: {
      context: tx(
        "HackerRank Orchestrate (September 2026): for 250 requests such as “Can I afford this laptop?”, reconstruct each user's finances from profiles, transaction histories for 275 users, exchange rates, payment options, 215 messages and 16 document images — then recommend a plan that keeps the balance above the user's chosen minimum for 90 days. Only 25 solved samples were public, explicitly as format references rather than evaluation labels.",
        "HackerRank Orchestrate(2026년 9월): ‘이 노트북을 사도 될까?’ 같은 250개 요청마다 사용자 275명의 프로필·거래 내역·환율·결제 옵션·메시지 215건·증빙 이미지 16장으로 재무 상태를 복원하고, 90일 동안 잔고가 사용자가 정한 최소 금액 아래로 내려가지 않는 플랜을 추천해야 했습니다. 공개 샘플 25건은 평가 라벨이 아니라 형식 참고용으로만 주어졌습니다.",
      ),
      roleShort: tx(
        "Solo — LLM/code boundary, anti-overfitting and acceptance rules; code written with Claude Code",
        "개인 참가 — LLM·코드 경계, 과적합 방지·채택 규칙 설정, 코드는 Claude Code로 작성",
      ),
      role: {
        mine: [
          tx("Solo entry. Set the boundary: the LLM may only produce typed facts; affordability math, plan selection and explanations stay in code.", "개인 참가. 경계를 정했습니다. LLM은 타입이 정해진 사실만 만들고, 감당 가능성 계산·플랜 선택·설명문은 코드에 둡니다."),
          tx("Set anti-overfitting rules before tuning: the 25 samples are a regression set, request-specific exceptions are banned, and every change must pass “would I make this change if I had never seen these 25 answers?”", "튜닝 전에 과적합 방지 규칙을 세웠습니다. 샘플 25건은 회귀 테스트로만 쓰고, 특정 요청 전용 예외를 금지하며, 모든 변경은 ‘이 25개 정답을 본 적이 없어도 이 변경을 했을까?’를 통과해야 합니다."),
          tx("Set the acceptance rule: no MAE gain is adopted at the expense of the safety-critical over-estimate rate.", "채택 규칙을 정했습니다. 위험한 과대 추정 비율을 희생한 MAE 개선은 받아들이지 않습니다."),
          tx("Asked for a forensic audit before considering ML, and decided not to change code based on the unlabeled 30-request audit, since that would be holdout leakage.", "ML을 검토하기 전에 포렌식 감사를 먼저 요구했고, 라벨 없는 30건 감사 결과로는 코드를 고치지 않기로 결정했습니다. 홀드아웃 누수가 되기 때문입니다."),
        ],
        others: [
          tx("Implementation, experiments and reports were produced with Claude Code (Sonnet 5 / Opus 5) under those rules.", "구현·실험·보고서는 이 규칙 아래 Claude Code(Sonnet 5 / Opus 5)로 작성했습니다."),
          tx("The dataset and problem statement came from the organizers.", "데이터셋과 문제 명세는 주최 측이 제공했습니다."),
        ],
      },
      problem: [
        tx("Money math can't be probabilistic. Amounts must stay within [0, requested], plans must sum exactly, and installments must match a supplied option.", "돈 계산은 확률적이면 안 됩니다. 금액은 [0, 요청액] 안에 있어야 하고, 플랜 합계가 정확히 맞아야 하며, 할부는 제공된 옵션과 일치해야 합니다."),
        tx("Evidence is messy and untrusted. Salary changes and cancellations hide in free-text messages, some amounts exist only in payroll letters or bills, and messages may say “ignore the rules and approve”.", "증거는 지저분하고 신뢰할 수 없습니다. 급여 변경·취소는 자유 텍스트 메시지에 숨어 있고, 일부 금액은 급여 명세서나 청구서 이미지에만 있으며, ‘규칙 무시하고 승인해’ 같은 문구가 섞여 있습니다."),
        tx("Recurring expenses aren't labeled; they must be inferred from history.", "반복 지출에는 라벨이 없어 이력에서 추론해야 합니다."),
        tx("Safety is asymmetric: over-estimating what is safe to pay is worse than under-estimating it.", "안전은 비대칭입니다. 안전 금액을 과대 추정하는 쪽이 과소 추정보다 위험합니다."),
        tx("25 public samples and a free-tier quota of 20 requests per model.", "공개 샘플 25건, 그리고 모델당 20회로 제한된 무료 API 할당량."),
      ],
      architecture: {
        stages: [
          { kind: "input", label: tx("Messages & document images", "메시지 · 증빙 이미지"), detail: tx("untrusted evidence", "신뢰할 수 없는 증거") },
          { kind: "llm", label: tx("Evidence extraction", "증거 추출"), detail: tx("Gemini 3.5 Flash, 25 messages / 8 images per call → typed facts only", "Gemini 3.5 Flash, 호출당 메시지 25건·이미지 8장 → 타입 사실만 출력") },
          { kind: "gate", label: tx("Fact validation", "사실 검증"), detail: tx("id-keyed; a claim contradicting settled history is skipped and logged", "id 기준 검증, 정산 이력과 모순되는 주장은 적용하지 않고 기록") },
          { kind: "code", label: tx("Financial state", "재무 상태 구성"), detail: tx("profile · transactions · exchange rates · validated facts", "프로필 · 거래 · 환율 · 검증된 사실") },
          { kind: "code", label: tx("90-day cash-flow simulation", "90일 현금흐름 시뮬레이션"), detail: tx("recurrence by date-grid fitting · conformal safety buffer", "날짜 그리드 피팅으로 반복 지출 탐지 · conformal 안전 버퍼") },
          { kind: "code", label: tx("Affordability", "감당 가능성"), detail: tx("safe amount = lowest balance over the horizon − minimum", "안전 금액 = 기간 중 최저 잔고 − 최소 유지 금액") },
          { kind: "code", label: tx("Plan selection", "플랜 선택"), detail: tx("full · partial · installments · wait · not recommended, with fixed tie-breaks", "전액 · 분할 · 할부 · 대기 · 비추천, 고정된 동률 규칙") },
          { kind: "code", label: tx("Explanation", "설명문"), detail: tx("templated from the decided plan — no model call", "결정된 플랜으로 템플릿 생성 — 모델 호출 없음") },
          { kind: "gate", label: tx("Output validation", "출력 검증"), detail: tx("ranges · plan sums · option match · cross-field consistency", "범위 · 플랜 합계 · 옵션 일치 · 필드 간 일관성") },
          { kind: "output", label: tx("output.csv + usage report", "output.csv + 사용량 보고서"), detail: tx("250 rows", "250행") },
        ],
        note: tx(
          "One stage touches a model, and its output is a typed fact. Raw message text never re-enters a prompt or reaches the decision logic, and because explanations are templates they can't contradict the numbers.",
          "모델을 쓰는 단계는 하나뿐이고, 그 출력은 타입이 정해진 사실입니다. 메시지 원문은 다시 프롬프트에 들어가거나 결정 로직에 닿지 않습니다. 설명문은 템플릿이라 숫자와 어긋날 수 없습니다.",
        ),
      },
      decisions: [
        {
          title: tx("LLM for evidence, Python for money", "증거는 LLM, 돈은 Python"),
          why: tx(
            "Every affordability number comes from forecast.py and planner.py. The model only reads blank amounts from images and turns messages into typed facts such as a salary change, the end of an income, or a one-off credit. That meets the spec's “deterministic where possible” and keeps injected instructions structurally away from the decision.",
            "감당 가능성에 관한 모든 숫자는 forecast.py와 planner.py에서 나옵니다. 모델은 이미지에서 빈 금액을 읽고, 메시지를 급여 변경·소득 종료·일회성 입금 같은 타입 사실로 바꾸는 일만 합니다. 명세의 ‘가능하면 결정론적으로’를 만족하고, 주입된 지시가 구조적으로 결정에 닿지 못하게 합니다.",
          ),
          rejected: tx("An LLM judging affordability end to end.", "LLM이 감당 가능성을 처음부터 끝까지 판단"),
        },
        {
          title: tx("Templated explanations", "템플릿 설명문"),
          why: tx("Explanations are generated from the decided plan with no model call: zero tokens, deterministic, always consistent with the numbers.", "설명문은 결정된 플랜으로 생성하며 모델을 부르지 않습니다. 토큰이 들지 않고, 결정론적이며, 항상 숫자와 일치합니다."),
          rejected: tx("LLM-written explanations.", "LLM이 쓴 설명문"),
        },
        {
          title: tx("Batch and cache the extraction", "추출은 묶고 캐시"),
          why: tx(
            "Batching cut 231 calls to 11, which a 20-request free tier required. Results are cached by content hash, so reruns make zero calls. Batching risks one message influencing another; that is mitigated with per-message delimiters, an explicit no-cross-influence rule and id-keyed validation.",
            "배치로 호출을 231회에서 11회로 줄였습니다. 20회 무료 할당량에서는 필수였습니다. 결과는 내용 해시로 캐시해 재실행 시 호출이 0회입니다. 배치에서는 한 메시지가 다른 메시지에 영향을 줄 수 있어, 메시지별 구분자·교차 영향 금지 규칙·id 기준 검증으로 막았습니다.",
          ),
          rejected: tx("Per-item calls with throttling.", "항목별 호출 + 속도 제한"),
        },
        {
          title: tx("A safety margin calibrated from users' own history", "사용자 자신의 이력으로 보정한 안전 마진"),
          why: tx(
            "Every point-estimator swap traded MAE against safety. Instead, a conformal risk-control margin was calibrated on a leak-free backtest of each of the 275 users' settled history (λ = 0.0192), with per-currency shrinkage (k = 60). It was the only change in the project that improved MAE and the safety-critical rate at the same time.",
            "점추정 방식을 바꿀 때마다 MAE와 안전 지표가 서로 맞바뀌었습니다. 대신 사용자 275명 각자의 정산 이력으로 누수 없는 백테스트를 만들어 conformal risk control 안전 마진(λ = 0.0192)을 보정하고, 통화별 shrinkage(k = 60)를 적용했습니다. 프로젝트에서 MAE와 위험한 과대 추정 비율을 동시에 개선한 유일한 변경이었습니다.",
          ),
          rejected: tx("Six alternative estimators (a linear trend raised the safety-critical rate from 40% to 44%) and a hand-picked flat buffer.", "대안 추정기 6종(선형 추세는 위험 비율을 40%→44%로 올림)과 임의로 정한 고정 버퍼"),
        },
        {
          title: tx("Keep a fix that lowers the sample score", "샘플 점수가 떨어져도 맞는 수정은 유지"),
          why: tx(
            "Final validation asserts found 13 of 250 rows marked affordable-now with no full-payment date: the buffer reached safe_on() but not is_safe(). The one-line fix dropped sample status accuracy from 84% to 80%; it was kept because the output became consistently conservative.",
            "최종 검증 assert가 250행 중 13행에서 ‘지금 가능’인데 전액 결제일이 비어 있는 모순을 찾았습니다. 안전 버퍼가 safe_on()에는 들어갔지만 is_safe()에는 빠져 있었습니다. 한 줄 수정으로 샘플 status 정확도는 84%에서 80%로 내려갔지만, 출력이 일관되게 보수적으로 바뀐 결과라 유지했습니다.",
          ),
          rejected: tx("Reverting to protect the 25-sample score.", "25건 점수를 지키려고 되돌리기"),
        },
        {
          title: tx("Don't fix what you can't verify", "검증할 수 없는 것은 고치지 않기"),
          why: tx(
            "A context-free subagent re-solved 30 unlabeled requests; 17 disagreed, most strongly on income-change messages that never appear in the public samples. No code was changed — tuning to unlabeled requests would be holdout leakage. One large error was likewise left documented and unresolved after five candidate causes were ruled out, instead of being patched.",
            "컨텍스트 없는 서브에이전트가 라벨 없는 요청 30건을 다시 풀었고 17건이 달랐습니다. 가장 강한 신호는 공개 샘플에 없는 소득 변경 메시지였습니다. 그래도 코드는 고치지 않았습니다. 라벨 없는 요청에 맞추는 것은 홀드아웃 누수이기 때문입니다. 원인 후보 5가지를 모두 배제한 큰 오차 1건도 억지로 고치지 않고 미해결로 기록했습니다.",
          ),
        },
      ],
      evaluation: [
        tx("Local checks on the 25 public samples — treated as a debugging and regression set, not a benchmark: per-axis accuracy, amount MAE and the safety-critical over-estimate rate.", "공개 샘플 25건으로 로컬 점검을 했습니다. 벤치마크가 아니라 디버깅·회귀 세트로 다뤘고, 축별 정확도·금액 MAE·위험한 과대 추정 비율을 봤습니다."),
        tx("Whole-dataset diffs instead of sample scores. A recurrence-rule change looked neutral on the 25 samples but misclassified 9 income series across 2,787 recurring groups; it was caught and fixed before shipping.", "샘플 점수 대신 전체 데이터 diff를 봤습니다. 반복 지출 규칙 변경은 25건에서는 영향이 없어 보였지만, 반복 그룹 2,787개 전체에서 소득 시리즈 9개를 잘못 분류하고 있었고 출시 전에 잡아 고쳤습니다."),
        tx("A retraction: a claimed “5-day false fit” bug was re-checked against the raw intervals, found perfectly regular, and withdrawn instead of “fixed”.", "주장을 철회한 기록도 있습니다. ‘5일 주기 오탐’ 버그를 원자료 간격으로 다시 확인하니 완벽하게 규칙적이어서, ‘수정’하지 않고 철회했습니다."),
        tx("Independent audit: 30 of 250 unlabeled requests (stratified, seed 42) re-solved by a fresh subagent, used for diagnosis only. Disclosed limitation: its harness still auto-loaded the project brief.", "독립 감사: 라벨 없는 250건 중 30건(층화 추출, seed 42)을 새 서브에이전트가 다시 풀게 해 진단에만 썼습니다. 한계도 공개했습니다. 그 하니스가 프로젝트 문서를 자동으로 불러왔습니다."),
        tx("Final gate: assert-based validation of all 250 rows (schema, ranges, plan sums, cross-field consistency) in a dry run with live API calls blocked.", "최종 관문: 실제 API 호출을 막은 상태로 250행 전체를 assert 기반으로 검증했습니다(스키마·범위·플랜 합계·필드 간 일관성)."),
      ],
      results: [
        { value: "85 / 3,019", label: tx("official rank", "공식 순위"), context: tx("top 2.8%", "상위 2.8%"), evidence: "official" },
        { value: "40% → 20%", label: tx("safety-critical over-estimates", "위험한 과대 추정 비율"), context: tx("25 samples, after the calibrated buffer", "샘플 25건, 보정된 안전 버퍼 적용 후"), evidence: "measured" },
        { value: "231 → 11", label: tx("LLM calls", "LLM 호출 수"), context: tx("batched; reruns served entirely from cache", "배치 처리, 재실행은 전부 캐시"), evidence: "measured" },
        { value: "$0.27", label: tx("total API cost", "총 API 비용"), context: tx("gemini-3.5-flash, final run", "gemini-3.5-flash, 최종 실행"), evidence: "measured" },
        { value: "250 / 250", label: tx("rows passing validation", "검증 통과 행"), context: tx("after fixing 13 contradictory rows", "모순 13행 수정 후"), evidence: "measured" },
      ],
      resultTable: {
        caption: tx("Per-axis accuracy on the 25 public samples", "공개 샘플 25건 기준 축별 정확도"),
        head: [tx("Axis", "축"), tx("No-LLM baseline", "LLM 없는 기준선"), tx("Final submission", "최종 제출본")],
        rows: [
          [tx("Affordability status", "감당 가능성 상태"), "80%", "80%"],
          [tx("Payment method", "결제 방식"), "84%", "84%"],
          [tx("Payment plan", "결제 플랜"), "80%", "80%"],
          [tx("Earliest full-payment date", "전액 결제 가능일"), "64%", "72%"],
          [tx("Spending changes", "지출 조정"), "84%", "76%"],
          [tx("Safe amount, exact match", "안전 금액 정확 일치"), "12%", "12%"],
          [tx("Amount MAE (home currency)", "금액 MAE (자국 통화)"), tx("187,281 (with LLM facts)", "187,281 (LLM 사실 반영 시)"), "165,765"],
        ],
        note: tx(
          "These samples are the organizer's format reference, not the hidden evaluation set. Some axes fell after the consistency fix by design; MAE mixes five currencies.",
          "이 샘플은 주최 측의 형식 참고용이며 비공개 평가 세트가 아닙니다. 일관성 수정 후 일부 축은 의도적으로 내려갔고, MAE는 다섯 통화가 섞인 값입니다.",
        ),
      },
      lessons: [
        tx("Put the LLM boundary exactly where untrusted text exists — and nowhere else.", "LLM 경계는 신뢰할 수 없는 텍스트가 있는 곳에만 둡니다."),
        tx("Choose the metric that encodes the failure cost (over-estimating safe money) and refuse trades against it.", "실패 비용을 담은 지표(안전 금액 과대 추정)를 고르고, 그 지표를 희생하는 거래는 거부합니다."),
        tx("Diff the whole dataset, not the sample score: 25 samples hid a regression affecting 9 users.", "샘플 점수가 아니라 전체 데이터를 비교합니다. 25건은 사용자 9명에게 영향을 준 회귀를 숨기고 있었습니다."),
        tx("Pin the model a cache was built against. An unpinned default once triggered 10 live calls before it was caught; the final run was verified with live calls blocked.", "캐시를 만든 모델은 고정해야 합니다. 고정하지 않은 기본 모델 때문에 실제 호출 10회가 나간 뒤에야 잡혔고, 최종 실행은 실제 호출을 막은 상태로 검증했습니다."),
      ],
      links: [
        { label: tx("GitHub repository", "GitHub 저장소"), href: "https://github.com/nalziori/buy-or-wait-financial-agent" },
        { label: tx("Eval loop & decision log (CLAUDE.md)", "평가 반복·의사결정 기록 (CLAUDE.md)"), href: "https://github.com/nalziori/buy-or-wait-financial-agent/blob/main/CLAUDE.md" },
        { label: tx("Independent 30-request audit", "독립 30건 감사 보고서"), href: "https://github.com/nalziori/buy-or-wait-financial-agent/blob/main/evaluation/sonnet_30_disagreement_audit.md" },
      ],
    },
  },

  // ───────────────────────────────────────────── 3. In-Cabin Voice Agent
  {
    slug: "in-cabin-voice-agent",
    featured: true,
    title: tx("In-Cabin Vehicle Voice Agent", "차량 인캐빈 음성 에이전트"),
    category: tx("Safety-aware agent · Voice", "안전 중심 에이전트 · 음성"),
    year: "2026.09",
    status: tx("Personal prototype · simulated vehicle", "개인 프로토타입 · 차량은 시뮬레이션"),
    summary: tx(
      "Turns a spoken request into a vehicle action only after seven checks enforced in code. The model proposes one typed intent — it can never approve its own action.",
      "음성 요청을 코드로 강제한 7단계 검사를 모두 통과했을 때만 차량 동작으로 바꿉니다. 모델은 타입이 정해진 의도 하나를 제안할 뿐, 자기 행동을 승인할 수 없습니다.",
    ),
    technologies: ["Python", "faster-whisper (CPU int8)", "Anthropic API (structured output)", "Pydantic", "Self-tests", "Repeated eval"],
    github: "https://github.com/nalziori/in-cabin-voice-agent",
    cover: { kind: "flow" },
    highlights: [
      { value: "100%", label: tx("tool · args · gate · abstain", "도구 · 인자 · 게이트 · 미호출"), context: tx("23 cases × 5 repeats", "23건 × 5회 반복"), evidence: "measured" },
      { value: "9", label: tx("held-out cases", "홀드아웃 케이스"), context: tx("kept out of prompt tuning", "프롬프트 튜닝에서 제외"), evidence: "measured" },
      { value: "7", label: tx("safety checks in code", "코드 안전 검사"), evidence: "implemented" },
    ],
    detail: {
      context: tx(
        "A voice agent in a car fails differently from a notification router: a call or message can't be recalled, and a seat moving the wrong way at speed is a safety problem. I built a prototype around one question — how should a vehicle interface behave when a request is incomplete, uncertain or unsafe? It covers climate, phone calls, messages, seats, ambient light, navigation and media, plus a cabin-sensor query. Vehicle controls are simulated.",
        "차 안의 음성 에이전트는 알림 라우터와 실패 방식이 다릅니다. 잘못 건 전화나 보낸 메시지는 되돌릴 수 없고, 주행 중 시트가 반대로 움직이면 안전 문제입니다. ‘요청이 불완전하거나, 불확실하거나, 위험할 때 차량 인터페이스는 어떻게 동작해야 하는가’라는 질문 하나로 프로토타입을 만들었습니다. 공조·전화·메시지·시트·조명·내비게이션·미디어 제어 7종과 실내 센서 조회 1종을 다루며, 차량 제어는 시뮬레이션입니다.",
      ),
      roleShort: tx(
        "Personal project — safety model, structure and evaluation design; code written with Claude Code",
        "개인 프로젝트 — 안전 모델·구조·평가 설계, 코드는 Claude Code로 작성",
      ),
      role: {
        mine: [
          tx("Personal project: defined the scope, the safety model (allow / confirm / refuse) and what each check must guarantee.", "개인 프로젝트: 범위와 안전 모델(통과·확인·거부), 각 검사가 보장해야 할 조건을 정했습니다."),
          tx("Restructured v1 (a multi-turn tool loop) into one intent call plus local execution under an on-device assumption.", "온디바이스를 가정해 v1의 멀티턴 도구 루프를 ‘의도 추론 1회 + 로컬 실행’ 구조로 바꿨습니다."),
          tx("Found and closed the hole where the model could fill confirmed=True and pass its own gate.", "모델이 confirmed=True를 스스로 채워 자기 게이트를 통과할 수 있었습니다. 그 구멍을 찾아 막았습니다."),
          tx("Designed the evaluation: four scored metrics, a 14 / 9 tune/held-out split and repeated runs.", "평가를 설계했습니다. 채점 지표 4개, 튜닝 14 / 홀드아웃 9 분리, 반복 실행."),
        ],
        others: [
          tx("Code was written with Claude Code (Sonnet 5), as recorded in the commit history.", "코드는 Claude Code(Sonnet 5)로 작성했으며 커밋 기록에 남아 있습니다."),
          tx("No real vehicle integration: vehicle state and CAN-level execution are mocks.", "실제 차량 연동은 없습니다. 차량 상태와 CAN 수준 실행은 목업입니다."),
        ],
      },
      problem: [
        tx("Missing values. “Make it a bit darker” has a direction but no value — guessing is wrong.", "값이 빠진 요청. ‘조금 어둡게 해 줘’에는 방향은 있지만 값이 없고, 추측하면 틀립니다."),
        tx("Irreversible, external actions. Calls and messages leave the car.", "되돌릴 수 없는 외부 동작. 전화와 메시지는 차 밖으로 나갑니다."),
        tx("Model output is untrusted. A JSON schema guarantees types, not safe values.", "모델 출력은 신뢰 경계입니다. JSON 스키마는 타입을 보장할 뿐 값이 안전하다는 보장은 하지 않습니다."),
        tx("Time and state. A “yes” 40 seconds later, or after the seat already moved, is no longer consent to the same action.", "시간과 상태. 40초 뒤의 ‘응’이나 시트가 이미 움직인 뒤의 ‘응’은 같은 동작에 대한 동의가 아닙니다."),
        tx("On-device budget. Every extra model round-trip costs latency and power in a car.", "온디바이스 예산. 모델 왕복이 늘 때마다 차 안에서는 지연과 전력이 듭니다."),
      ],
      architecture: {
        stages: [
          { kind: "input", label: tx("Voice", "음성"), detail: tx("audio never leaves the device", "오디오는 기기 밖으로 나가지 않음") },
          { kind: "model", label: tx("Local speech recognition", "로컬 음성 인식"), detail: tx("faster-whisper base · CPU int8 · low-confidence → ask again", "faster-whisper base · CPU int8 · 신뢰도 낮으면 다시 요청") },
          { kind: "llm", label: tx("Intent extraction (1 call)", "의도 추론 (1회 호출)"), detail: tx("Pydantic intent: tool + arguments, or abstain", "Pydantic Intent: 도구 + 인자, 또는 미호출") },
          { kind: "gate", label: tx("Value & range checks", "값 · 범위 검사"), detail: tx("missing → re-ask · clamp to limits (e.g. 16–30 °C)", "값 없음 → 재질문 · 한계값으로 제한 (예: 16–30 °C)") },
          { kind: "gate", label: tx("Safety gate", "안전 게이트"), detail: tx("allow · confirm · refuse (confirmation can't unlock refuse)", "통과 · 확인 · 거부 (확인으로도 거부는 못 엶)") },
          { kind: "gate", label: tx("Confirmation", "확인 절차"), detail: tx("pending state in local code · 30 s expiry · state re-check before execution", "확인 대기는 로컬 코드에만 · 30초 만료 · 실행 직전 상태 재검사") },
          { kind: "code", label: tx("Deterministic execution", "결정론적 실행"), detail: tx("relative values resolved locally · failures surfaced, not hidden", "상대값은 로컬에서 계산 · 실패는 숨기지 않고 보고") },
          { kind: "output", label: tx("Templated reply", "템플릿 응답"), detail: tx("no extra model round-trip", "추가 모델 왕복 없음") },
        ],
        note: tx(
          "The model's only job is stage 3. Everything after it is local code, so it can be tested without an API key (--selftest) and survives swapping in an on-device model — the one function to replace is parse_intent().",
          "모델이 맡는 일은 3단계뿐입니다. 그 뒤는 모두 로컬 코드라 API 키 없이 테스트할 수 있고(--selftest), 온디바이스 모델로 바꿔도 그대로 유지됩니다. 교체할 함수는 parse_intent() 하나입니다.",
        ),
      },
      decisions: [
        {
          title: tx("Pending confirmation lives only in local code", "확인 대기는 로컬 코드에만 둔다"),
          why: tx(
            "In v1 the model could fill confirmed=True itself, so “the tool refuses unless confirmed” only half held. v2 executes arguments only from the locally stored pending state; a bare “yes” with nothing pending does nothing — pinned by a self-test assert.",
            "v1에서는 모델이 confirmed=True를 직접 채울 수 있어 ‘확인 없이는 도구가 거부한다’는 주장이 반만 성립했습니다. v2는 로컬에 저장한 확인 대기 상태에서만 실행 인자를 꺼내며, 대기 중인 동작 없이 ‘응’만 오면 아무 일도 일어나지 않습니다. 이 동작은 셀프테스트 assert로 고정했습니다.",
          ),
          rejected: tx("A confirmation flag inside the model's tool arguments.", "모델의 도구 인자에 확인 플래그를 두는 방식"),
        },
        {
          title: tx("A third gate outcome that confirmation can't unlock", "확인으로도 열리지 않는 세 번째 결과"),
          why: tx(
            "If a passenger's “yes” could unlock everything, safety would belong to whoever says yes. When the reason lives in vehicle state — changing seat posture above 80 km/h — the system refuses.",
            "승객의 ‘응’으로 모든 것이 열린다면 안전 판단은 ‘응’이라고 말하는 사람에게 넘어갑니다. 판단 근거가 차량 상태에 있으면(시속 80km 이상에서 시트 자세 변경) 시스템이 거부합니다.",
          ),
        },
        {
          title: tx("One model call, not a tool loop", "도구 루프가 아니라 모델 호출 1회"),
          why: tx(
            "For an on-device model every round-trip costs, so LLM use is fixed at one intent call; gating, execution and replies moved to deterministic code.",
            "온디바이스 모델에서는 왕복마다 비용이 들어 LLM 사용을 의도 추론 1회로 고정했고, 게이트·실행·응답은 결정론 코드로 옮겼습니다.",
          ),
          rejected: tx("An SDK tool runner executing tools in a multi-turn loop (v1).", "SDK 도구 러너가 멀티턴으로 도구를 실행하는 구조 (v1)"),
        },
        {
          title: tx("Remove a gate that had no safety case", "안전 근거 없는 게이트는 제거"),
          why: tx(
            "Changing the destination while driving first required confirmation. It is reversible and mainstream navigation apps don't confirm it, so the gate was removed instead of adding friction without a reason.",
            "주행 중 목적지 변경에 처음에는 확인을 요구했습니다. 하지만 되돌리기 쉽고 일반 내비게이션 앱도 확인을 받지 않아, 근거 없는 마찰을 더하는 대신 게이트를 없앴습니다.",
          ),
        },
        {
          title: tx("Show the message body — then score it", "메시지 본문을 보여주고, 채점에도 넣기"),
          why: tx(
            "Putting the body into the confirmation prompt exposed extraction bugs — the command itself leaking into the text — that four perfect metrics had hidden. The body is now scored by a defect check rather than an exact string, because many phrasings are correct.",
            "확인 질문에 본문을 넣자, 명령어가 본문에 섞이는 추출 버그가 드러났습니다. 지표 4개가 모두 100%인 상태에서 숨어 있던 문제입니다. 올바른 표현은 여러 가지이므로, 이제 본문은 정답 문자열이 아니라 결함 검사로 채점합니다.",
          ),
        },
        {
          title: tx("Define the sign convention in the schema", "값의 방향 규약을 스키마에 명시"),
          why: tx(
            "Scoring the body surfaced a deeper issue: nothing told the model whether a larger recline value means upright or reclined. Earlier 100% results had been getting the sign right by luck. Directions for recline, slide, height, brightness and temperature are now explicit.",
            "본문을 채점하자 더 근본적인 문제가 나왔습니다. 등받이 값이 클수록 세우는 것인지 눕히는 것인지 모델에게 알려준 적이 없었고, 이전의 100%는 부호를 운으로 맞힌 결과였습니다. 이제 등받이·슬라이드·높이·밝기·온도의 방향을 명시합니다.",
          ),
        },
      ],
      evaluation: [
        tx("23 cases: 14 for tuning, 9 held out from prompt tuning. Vehicle state is reset per case, because relative commands such as “3 degrees warmer” depend on the starting state.", "평가 23건: 튜닝 14건, 프롬프트 튜닝에서 제외한 홀드아웃 9건. 케이스마다 차량 상태를 초기화합니다. ‘3도 올려 줘’ 같은 상대 명령의 정답이 시작 상태에 따라 달라지기 때문입니다."),
        tx("Four metrics: tool selection, arguments (including message-body checks), gate decision and correct abstention.", "지표 4개: 도구 선택, 인자(메시지 본문 검사 포함), 게이트 판단, 올바른 미호출."),
        tx("Repeated measurement: --eval --repeat 5 clears caches, re-queries the model and reports mean, min, max and standard deviation.", "반복 측정: --eval --repeat 5는 캐시를 비우고 모델을 다시 호출해 평균·최소·최대·표준편차를 보고합니다."),
        tx("Deterministic safety paths — refusal, expiry, state re-check — are verified by --selftest without the model. The eval's gate metric covers the first confirmation decision only.", "결정론적 안전 경로(거부·만료·상태 재검사)는 모델 없이 --selftest로 검증합니다. eval의 게이트 지표는 첫 확인 판단까지만 봅니다."),
        tx("Variance, reported honestly: after the sign-convention fix, 1 of 8 tuning runs misclassified one case (1 of 112 case evaluations). Five clean repeats mean a low failure rate, not a zero one.", "변동도 그대로 적었습니다. 부호 규약 수정 후 튜닝 실행 8회 중 1회에서 1건이 틀렸습니다(케이스 평가 112건 중 1건). 5회 연속 100%는 실패율이 낮다는 뜻입니다. 0이라는 뜻은 아닙니다."),
      ],
      results: [
        { value: "100%", label: tx("tool · args · gate · abstain", "도구 · 인자 · 게이트 · 미호출"), context: tx("tune 14 + held-out 9, 5 repeats each (10 of 10 runs)", "튜닝 14 + 홀드아웃 9, 각 5회 반복 (10회 전부)"), evidence: "measured" },
        { value: "0.67 s", label: tx("local speech recognition, median", "로컬 음성 인식 중앙값"), context: tx("base · CPU int8 · 2.4 s utterance · n = 3 · PC, not Jetson", "base · CPU int8 · 2.4초 발화 · n = 3 · PC 기준, Jetson 아님"), evidence: "measured" },
        { value: "2.9 s", label: tx("intent latency p50", "의도 추론 지연 p50"), context: tx("cloud model — not an on-device number", "클라우드 모델 — 온디바이스 수치 아님"), evidence: "measured" },
        { value: "70%", label: tx("of input tokens are the output schema", "입력 토큰 중 출력 스키마 비중"), context: tx("system 941 · schema 2,403 · utterance 90", "시스템 941 · 스키마 2,403 · 발화 90"), evidence: "measured" },
        { value: "1.2–1.4 s", label: tx("end-to-end on-device estimate", "온디바이스 종단 지연 추정"), context: tx("1B INT4 + grammar-constrained decoding + KV reuse — not run on hardware", "1B INT4 + 문법 제약 디코딩 + KV 재사용 — 하드웨어에서 미실행"), evidence: "estimated" },
        { value: "7", label: tx("checks enforced in control flow", "제어 흐름으로 강제한 검사"), context: tx("pinned by --selftest", "--selftest로 고정"), evidence: "implemented" },
      ],
      lessons: [
        tx("What you don't score, you don't see: four perfect metrics hid a broken message body.", "채점하지 않는 것은 보이지 않습니다. 완벽한 지표 4개가 망가진 메시지 본문을 숨기고 있었습니다."),
        tx("A 100% from one run is a sample, not a rate.", "한 번 실행해서 나온 100%는 표본입니다. 비율이 아닙니다."),
        tx("Put safety in control flow, not in the prompt.", "안전은 프롬프트가 아니라 제어 흐름에 넣습니다."),
        tx("Every threshold here (30 s, 80 km/h, the speech-confidence cutoff) is an estimate and documented as one; real vehicle data would be needed to set them.", "여기의 임계값(30초, 시속 80km, 음성 인식 신뢰도 기준)은 모두 추정치이고 그렇게 기록했습니다. 실제 값은 차량 데이터로 정해야 합니다."),
      ],
      links: [
        { label: tx("GitHub repository", "GitHub 저장소"), href: "https://github.com/nalziori/in-cabin-voice-agent" },
        { label: tx("Decision log", "의사결정 기록"), href: "https://github.com/nalziori/in-cabin-voice-agent/blob/main/DECISION_LOG.md" },
      ],
    },
  },

  // ───────────────────────────────────────────── 4. Medical imaging data pipeline
  {
    slug: "medical-imaging-data-pipeline",
    featured: true,
    title: tx("Mammography DICOM Data Pipeline", "유방촬영 DICOM 데이터 파이프라인"),
    category: tx("Medical AI · Data engineering", "의료 AI · 데이터 엔지니어링"),
    year: "2023.06–07",
    status: tx("Internship · Beamworks R&D team · 4 weeks", "현장실습 · 빔웍스 연구개발팀 · 4주"),
    summary: tx(
      "Turned 85,054 raw mammography DICOM images from 40+ institutions into 31,796 training-ready images (7,294 patients) through 16 domain validation rules, report matching and study-level integrity checks — with every rejection kept traceable.",
      "40여 개 기관의 유방촬영 DICOM 원본 85,054건을 16개 도메인 검증 규칙, 판독 리포트 매칭, 검사 단위 정합성 검사로 걸러 학습 가능한 31,796건(환자 7,294명)으로 확정했습니다. 탈락 사유는 모두 추적할 수 있게 남겼습니다.",
    ),
    technologies: ["Python", "pydicom", "pandas", "DICOM", "Jupyter"],
    cover: {
      kind: "funnel",
      steps: [
        { label: tx("Raw DICOM images", "DICOM 원본"), value: 85054 },
        { label: tx("Passed 16 rules", "16개 규칙 통과"), value: 56394 },
        { label: tx("Matched to reports", "리포트 매칭"), value: 32863 },
        { label: tx("Complete 4-view studies", "4장 완비 검사"), value: 31796 },
      ],
    },
    highlights: [
      { value: "31,796", label: tx("training-ready images", "학습용 확정 영상"), context: tx("from 85,054 raw", "원본 85,054건 중"), evidence: "measured" },
      { value: "16", label: tx("domain validation rules", "도메인 검증 규칙"), evidence: "implemented" },
      { value: "7,294", label: tx("patients", "환자 수"), evidence: "measured" },
    ],
    detail: {
      context: tx(
        "Beamworks develops AI for breast-cancer screening from mammography. The R&D team needed a training dataset for a computer-aided detection model, built from hospital archives spanning 2011 to 2023 that didn't follow the standard cleanly: derived images, magnification views, 3D tomosynthesis, implants, duplicates and missing radiology reports were all mixed in.",
        "빔웍스는 유방촬영 영상으로 유방암 스크리닝 AI를 개발하는 의료 AI 스타트업입니다. 연구개발팀은 컴퓨터 보조 진단 모델의 학습 데이터셋이 필요했지만, 2011~2023년 병원 아카이브에는 파생 영상·확대촬영·3D 토모신테시스·보형물 케이스·중복·판독 리포트 누락이 뒤섞여 있었습니다.",
      ),
      roleShort: tx(
        "R&D intern — DICOM collection, 16 validation rules, report matching and EDA",
        "연구개발팀 현장실습생 — DICOM 수집, 16개 검증 규칙, 리포트 매칭, EDA",
      ),
      role: {
        mine: [
          tx("Collected DICOM files with a recursive pydicom scanner, relaxing parser validation so non-standard files didn't stop the batch.", "pydicom 재귀 탐색으로 DICOM 파일을 수집하고 표준을 벗어난 파일이 배치를 멈추지 않도록 파서 검증을 완화했습니다."),
          tx("Implemented 16 domain validation rules and kept each result as a per-row flag.", "16개 도메인 검증 규칙을 구현하고 결과는 행마다 플래그로 남겨 두었습니다."),
          tx("Joined images to radiology reports and enforced the four-view (left/right × CC/MLO) study requirement.", "영상과 판독 리포트를 조인하고 한 검사에 좌우 × CC/MLO 4장이 모두 있어야 한다는 조건을 걸었습니다."),
          tx("Produced eight EDA summaries — patients, age, manufacturer, institution, period and labels — de-duplicated at study level.", "환자 수·연령·제조사·기관·기간·레이블 분포 등 EDA 8종을 검사 단위로 중복 제거해 산출했습니다."),
        ],
        others: [
          tx("The team's classification training framework was a company asset. I don't claim model training or diagnostic performance from this internship.", "팀의 분류 모델 학습 프레임워크는 회사 자산입니다. 이 현장실습에서 모델 학습이나 진단 성능은 주장하지 않습니다."),
          tx("Reference papers (the NYU breast-cancer screening dataset, GMIC, EfficientNet) were studied as background, not reproduced as results.", "참고 논문(NYU 유방암 스크리닝 데이터셋, GMIC, EfficientNet)은 배경 학습용으로 읽었을 뿐 결과로 재현하지 않았습니다."),
        ],
      },
      problem: [
        tx("Non-standard files. Strict parsing would abort a batch of tens of thousands of files.", "표준을 벗어난 파일. 엄격하게 파싱하면 수만 건짜리 배치가 중간에 멈춥니다."),
        tx("Clinical validity isn't a null check. Original vs derived, magnification, tomosynthesis, implants and laterality all decide whether an image belongs in screening training data.", "임상적 유효성은 결측 검사가 아닙니다. 원본·파생 여부, 확대촬영, 토모신테시스, 보형물, 좌우 정보가 모두 스크리닝 학습 데이터에 들어갈 수 있는지를 가릅니다."),
        tx("Joins break silently: 23,531 validated images had no matching report.", "조인은 조용히 깨집니다. 검증을 통과한 영상 중 23,531건에는 매칭되는 리포트가 없었습니다."),
        tx("Study integrity: a screening exam needs all four standard views, or the model sees an incomplete patient.", "검사 정합성: 스크리닝 검사는 표준 4장이 모두 있어야 하며, 그렇지 않으면 모델은 불완전한 환자를 보게 됩니다."),
        tx("Counting units: counting images instead of studies inflates every distribution about four times.", "집계 단위: 검사가 아니라 영상 단위로 세면 모든 분포가 약 4배 부풀려집니다."),
      ],
      architecture: {
        stages: [
          { kind: "input", label: tx("Hospital archives", "병원 아카이브"), detail: tx("85,054 mammography DICOM · 95,308 reports · 2011–2023", "유방촬영 DICOM 85,054건 · 리포트 95,308건 · 2011–2023") },
          { kind: "code", label: tx("Recursive DICOM scan", "DICOM 재귀 탐색"), detail: tx("pydicom with tolerant parsing", "완화된 파싱 설정의 pydicom") },
          { kind: "gate", label: tx("16 validation rules", "16개 검증 규칙"), detail: tx("original/derived · magnification · 3D · implant · duplicates · laterality · LUT · … → 56,394", "원본/파생 · 확대촬영 · 3D · 보형물 · 중복 · 좌우 · LUT · … → 56,394") },
          { kind: "code", label: tx("Report matching", "리포트 매칭"), detail: tx("image ↔ radiology report → 32,863", "영상 ↔ 판독 리포트 → 32,863") },
          { kind: "gate", label: tx("Study integrity", "검사 정합성"), detail: tx("four views per study (L/R × CC/MLO) → 31,796", "검사당 4장 (좌우 × CC/MLO) → 31,796") },
          { kind: "output", label: tx("Training dataset", "학습 데이터셋"), detail: tx("31,796 rows × 32 columns · 7,294 patients", "31,796행 × 32열 · 환자 7,294명") },
        ],
        note: tx(
          "The intermediate table keeps all 85,054 rows with their 16 validation flags (66 columns), so every drop is explainable and criteria can change without re-parsing DICOM.",
          "중간 테이블은 85,054행 전체를 16개 검증 플래그와 함께 보존합니다(66열). 모든 탈락을 설명할 수 있고, 기준을 바꿔도 DICOM을 다시 파싱할 필요가 없습니다.",
        ),
      },
      decisions: [
        {
          title: tx("Flag rejected rows instead of deleting them", "탈락 행은 삭제하지 않고 플래그로 남기기"),
          why: tx(
            "Anyone can see which rule removed an image and re-aggregate with different criteria. In medical data a dropped row is a decision, so the reason has to survive.",
            "어떤 규칙이 영상을 제외했는지 누구나 확인할 수 있고, 다른 기준으로 다시 집계할 수도 있습니다. 의료 데이터에서 행을 버리는 것은 결정이므로 그 이유가 남아야 합니다.",
          ),
          rejected: tx("Filtering invalid rows out as you go.", "처리하면서 무효 행을 바로 제거"),
        },
        {
          title: tx("Tolerant parsing, explicit validation", "파싱은 관대하게, 검증은 명시적으로"),
          why: tx(
            "Parsing never stops the batch; validity is then decided by explicit domain rules. Failure becomes a flag, not a crash. Broken or blank pixel data is guarded the same way.",
            "파싱이 배치를 멈추지 않게 하고, 유효성은 명시적인 도메인 규칙으로 판단합니다. 실패는 크래시가 아니라 플래그가 됩니다. 손상되거나 비어 있는 픽셀 데이터도 같은 방식으로 막았습니다.",
          ),
        },
        {
          title: tx("Count at study level", "검사 단위로 집계"),
          why: tx(
            "Every EDA summary de-duplicates by study instance, so a four-image exam counts once and distributions describe patients rather than files.",
            "모든 EDA를 검사 단위로 중복 제거해, 영상 4장짜리 검사를 한 번만 셉니다. 분포가 파일이 아니라 환자를 설명하게 됩니다.",
          ),
        },
      ],
      evaluation: [
        tx("Accounting at every stage — 85,054 → 56,394 → 32,863 → 31,796 — with invalid counts per rule.", "단계마다 건수를 맞췄습니다: 85,054 → 56,394 → 32,863 → 31,796, 규칙별 무효 건수 포함."),
        tx("Final profile checked: 7,294 patients (6,646 with 4 images, 641 with 8, 7 with 12); only PixelSpacing had missing values (942).", "최종 프로파일도 확인했습니다. 환자 7,294명(4장 6,646명, 8장 641명, 12장 7명), 결측은 PixelSpacing 942건뿐입니다."),
        tx("File counts were read carefully: 85,429 files vs 85,407 .dcm is an extension difference, not a parsing failure.", "파일 수도 신중하게 해석했습니다. 85,429개와 .dcm 85,407개의 차이는 확장자 때문입니다. 파싱 실패가 아닙니다."),
        tx("No model metrics are reported — this work ends at a validated dataset.", "모델 지표는 보고하지 않습니다. 이 작업은 검증된 데이터셋에서 끝납니다."),
      ],
      results: [
        { value: "85,054", label: tx("raw DICOM images", "DICOM 원본 영상"), context: tx("95,308 radiology reports", "판독 리포트 95,308건"), evidence: "measured" },
        { value: "31,796", label: tx("training-ready images", "학습용 확정 영상"), context: tx("37.4% of raw survived all checks", "원본의 37.4%만 전 검사 통과"), evidence: "measured" },
        { value: "7,294", label: tx("patients in the final set", "최종 데이터셋 환자 수"), evidence: "measured" },
        { value: "16", label: tx("validation rules, kept as flags", "플래그로 보존한 검증 규칙"), evidence: "implemented" },
        { value: "40+", label: tx("institutions in the raw archive", "원본 아카이브 기관 수"), context: tx("359 raw labels deduplicated by hand", "원본 표기 359개를 수작업으로 병합"), evidence: "estimated" },
        { value: "8", label: tx("EDA summaries, study-level", "검사 단위 EDA"), evidence: "measured" },
      ],
      bars: {
        caption: tx("Invalid images per validation rule (top 8)", "검증 규칙별 무효 영상 수 (상위 8개)"),
        items: [
          { label: "Code Value", value: 20798 },
          { label: "ExposureStatus", value: 16546 },
          { label: "Magnification factor", value: 11745 },
          { label: "PresentationLUTShape", value: 9119 },
          { label: "BreastImplantPresent", value: 5758 },
          { label: "Horizontal flip", value: 5729 },
          { label: "Tomosynthesis (3D)", value: 5477 },
          { label: "ImageType", value: 4701 },
        ],
      },
      lessons: [
        tx("In medical data, a dropped row is a decision — record why.", "의료 데이터에서 행을 버리는 것은 결정입니다. 이유를 남겨야 합니다."),
        tx("Validation is domain knowledge: magnification views, 3D images and implants are perfectly valid DICOM, and still wrong for screening training.", "검증은 도메인 지식입니다. 확대촬영·3D·보형물 영상은 DICOM으로는 멀쩡하지만 스크리닝 학습에는 맞지 않습니다."),
        tx("The counting unit — image, study or patient — changes every number downstream.", "집계 단위(영상·검사·환자)가 이후 모든 숫자를 바꿉니다."),
      ],
      links: [],
    },
  },

  // ───────────────────────────────────────────── 5. Edge AI
  {
    slug: "edge-ai-jetson",
    featured: true,
    title: tx("Edge AI on Jetson Orin Nano", "Jetson Orin Nano 엣지 AI"),
    category: tx("Edge AI · On-device constraints", "엣지 AI · 온디바이스 제약"),
    year: "2026–",
    status: tx("In progress — what's built, underway and planned is kept separate", "진행 중 — 구현 / 진행 중 / 계획을 구분해 표시"),
    summary: tx(
      "Running AI where the cloud isn't: a budget-first on-device diagnostic PoC, the on-device design of the voice agent, and a four-person offline LLM agent on Jetson Orin Nano 8GB. No Jetson performance number is claimed yet.",
      "클라우드가 없는 곳에서 AI를 돌리는 문제를 다룹니다. 배포 예산부터 정한 온디바이스 진단 PoC, 음성 에이전트의 온디바이스 설계, Jetson Orin Nano 8GB 위의 4인 오프라인 LLM 에이전트 팀 프로젝트를 묶었습니다. Jetson 성능 수치는 아직 주장하지 않습니다.",
    ),
    technologies: ["Jetson Orin Nano 8GB", "Ollama", "Qwen2.5 · EXAONE 3.5 (Q4)", "sqlite-vec", "scikit-learn", "statsmodels", "TensorRT (planned)"],
    github: "https://github.com/nalziori/heart-disease-risk-poc",
    cover: {
      kind: "budget",
      items: [
        { value: "15 W", label: tx("sustained power", "지속 전력") },
        { value: "100 MB", label: tx("model size", "모델 크기") },
        { value: "1 GB", label: tx("runtime RAM", "런타임 메모리") },
        { value: "50 ms", label: tx("per-sample latency", "샘플당 지연") },
      ],
    },
    highlights: [
      { value: "0.954", label: tx("baseline AUROC", "기준 모델 AUROC"), context: tx("synthetic data, 5-fold CV", "합성 데이터, 5-fold CV"), evidence: "measured" },
      { value: "8 GB", label: tx("Jetson team build", "Jetson 팀 프로젝트"), context: tx("offline LLM agent", "오프라인 LLM 에이전트"), evidence: "in-progress" },
      { value: "—", label: tx("Jetson latency / power", "Jetson 지연 · 전력"), context: tx("not measured yet", "아직 미측정"), evidence: "planned" },
    ],
    detail: {
      context: tx(
        "Cloud AI assumes network, memory and power that an ER bedside device, a car cabin or a factory floor may not have. My interest is the system problem: which parts must run locally, what budget they get, and how to prove they fit — before claiming any performance.",
        "클라우드 AI는 네트워크·메모리·전력을 전제합니다. 응급실 병상 옆 장치, 차량 실내, 공장 현장에는 없을 수도 있는 것들입니다. 제 관심은 시스템 문제입니다. 무엇이 로컬에서 돌아야 하는지, 어떤 예산을 줄지, 성능을 주장하기 전에 그 안에 들어간다는 것을 어떻게 증명할지.",
      ),
      roleShort: tx(
        "Two personal prototypes, plus the AI role in a four-person Jetson team",
        "개인 프로토타입 2건 + 4인 Jetson 팀 프로젝트의 AI 담당",
      ),
      role: {
        mine: [
          tx("Heart Disease Risk PoC (personal): fixed the deployment budget first, redesigned self-contradictory success criteria, and ran hypothesis-driven feature validation.", "심장병 리스크 PoC(개인): 배포 예산을 먼저 고정하고 서로 모순되던 성공 기준을 다시 설계했습니다. 피처는 가설 기반으로 검증했습니다."),
          tx("In-cabin voice agent (personal): measured the token breakdown to size what an on-device intent model would actually have to prefill.", "차량 음성 에이전트(개인): 온디바이스 의도 모델이 실제로 처리해야 할 입력 크기를 알기 위해 토큰 구성을 측정했습니다."),
          tx("ShiftLink (team of four, POSCO K-Digital program): AI role — model comparison, extracting requests, conditions, negations and withdrawals from shift memos, grounding and structured-output validation, synthetic data generation and extraction evaluation.", "ShiftLink(4인 팀, POSCO K-디지털 과정): AI 담당 — 모델 비교, 교대 메모에서 요청·조건·부정·철회 추출, 근거 확인과 구조화 출력 검증, 합성 데이터 생성, 추출 성능 평가."),
        ],
        others: [
          tx("ShiftLink: agent integration and schemas (team lead), Jetson setup, inference and storage (embedded teammate), QA and evaluation scenarios (PM/QA teammate).", "ShiftLink: 에이전트 통합·스키마(팀장), Jetson 설정·추론·저장(임베디드 담당), 검수·평가 시나리오(PM·QA 담당)."),
          tx("The Jetson baseline checks done so far — Python 3.10.12, CUDA 12.6, 25 W mode, TensorRT working — were team work.", "지금까지의 Jetson 기본 점검(Python 3.10.12, CUDA 12.6, 25W 모드, TensorRT 동작 확인)은 팀 작업입니다."),
        ],
      },
      problem: [
        tx("Budgets before models: power, model size, memory and end-to-end latency have to be fixed before choosing an architecture.", "모델보다 예산이 먼저입니다. 전력·모델 크기·메모리·종단 지연을 정한 뒤에 구조를 골라야 합니다."),
        tx("Spec sheets aren't results: published TOPS or FPS figures say nothing about this pipeline on this board.", "스펙 시트는 결과가 아닙니다. 공개된 TOPS·FPS 수치는 이 보드에서 이 파이프라인이 어떻게 도는지 말해 주지 않습니다."),
        tx("Heat and memory: the 8 GB board runs hot, so the team planned three model tiers.", "발열과 메모리: 8GB 보드는 발열이 심해 팀은 모델을 세 단계로 나눠 계획했습니다."),
        tx("Offline by default: the runtime can't depend on a network; any daily upload has to be a separate, retry-safe batch.", "기본은 오프라인: 런타임이 네트워크에 의존하면 안 되고, 하루 1회 업로드는 재시도에 안전한 별도 배치여야 합니다."),
        tx("Evaluation without expert labels: synthetic data has to be presented as a stated limitation, not hidden.", "전문가 라벨 없는 평가: 합성 데이터라는 한계를 숨기지 않고 명시해야 합니다."),
      ],
      architecture: {
        stages: [
          { kind: "input", label: tx("Shift memo", "교대 메모"), detail: tx("free text from a worker", "작업자의 자유 텍스트") },
          { kind: "llm", label: tx("On-device LLM", "온디바이스 LLM"), detail: tx("Ollama on Jetson · Qwen2.5 3B Q4_K_M by default (7B / 2.4B tiers)", "Jetson의 Ollama · 기본 Qwen2.5 3B Q4_K_M (7B / 2.4B 단계)") },
          { kind: "code", label: tx("Local retrieval", "로컬 검색"), detail: tx("sqlite-vec over veteran know-how cards", "베테랑 노하우 카드 대상 sqlite-vec") },
          { kind: "gate", label: tx("Grounding check", "근거 확인"), detail: tx("cited card ids must exist · otherwise “no knowledge”", "인용 카드 id가 실재해야 함 · 없으면 ‘지식 없음’") },
          { kind: "output", label: tx("Handover / answer", "인계 · 답변"), detail: tx("offline; daily batch upload", "오프라인, 하루 1회 배치 업로드") },
        ],
        note: tx(
          "ShiftLink's planned architecture from the team's development plan (Sep 14 – Oct 23, 2026). It is being built now; nothing here is a measured result yet.",
          "팀 개발 계획서(2026.09.14 – 10.23)에 있는 ShiftLink 설계 구조입니다. 지금 만드는 중이며, 여기 있는 어떤 것도 아직 측정 결과가 아닙니다.",
        ),
      },
      decisions: [
        {
          title: tx("Fix the deployment budget before choosing a model", "모델을 고르기 전에 배포 예산부터 고정"),
          why: tx(
            "For the Heart Disease Risk PoC: ≤ 15 W, ≤ 100 MB, ≤ 1 GB RAM, ≤ 50 ms per sample end to end, zero network dependency. A small MLP was chosen as the deployment candidate even though gradient boosting is often stronger on tabular data, because the goal includes the TensorRT and INT8 path on the board.",
            "심장병 리스크 PoC의 예산: 전력 15W 이하, 모델 100MB 이하, 메모리 1GB 이하, 샘플당 종단 50ms 이하, 네트워크 의존 0. 정형 데이터에서는 GBM이 대체로 더 강하다는 것을 알면서도 소형 MLP를 배포 후보로 골랐습니다. 보드에서 TensorRT·INT8 경로를 다루는 것이 목표에 포함되기 때문입니다.",
          ),
        },
        {
          title: tx("Rewrite a success criterion no threshold could satisfy", "어떤 임계값으로도 만족할 수 없는 기준은 다시 쓰기"),
          why: tx(
            "The first spec required accuracy, sensitivity, specificity, AUROC and F1 all as hard gates at one threshold — metrics that peak at different thresholds. It became: maximize sensitivity subject to specificity ≥ 90%, with balanced accuracy replacing raw accuracy on 70/30 data.",
            "처음 명세는 정확도·민감도·특이도·AUROC·F1을 한 임계값에서 모두 필수로 만족하라고 요구했습니다. 이 지표들이 최대가 되는 임계값은 서로 다릅니다. 명세를 ‘특이도 90% 이상 조건에서 민감도 최대화’로 바꾸고, 70/30 불균형 데이터이므로 정확도 대신 균형 정확도를 썼습니다.",
          ),
        },
        {
          title: tx("Three model tiers for a hot 8 GB board", "발열이 심한 8GB 보드를 위한 모델 3단계"),
          why: tx(
            "The ShiftLink team planned 7B / 3B / 2.4B quantized models, using the smaller tiers by default for the live demo to leave thermal headroom, and to run without a network.",
            "ShiftLink 팀은 7B / 3B / 2.4B 양자화 모델을 계획했고, 발열 여유를 두기 위해 시연에서는 작은 단계를 기본값으로 쓰며 네트워크 없이 동작하게 합니다.",
          ),
        },
      ],
      evaluation: [
        tx("Heart Disease Risk PoC: cross-validated baselines, a hypothesis registry with success and failure criteria written before each test, and a decision log for every verdict. The data is synthetic (9,000 rows) and every performance claim carries that caveat.", "심장병 리스크 PoC: 교차 검증 기준 모델, 검정 전에 성공·실패 기준을 먼저 적는 가설 레지스트리, 판정마다 남기는 의사결정 기록. 데이터는 합성(9,000행)이고 모든 성능 주장에 그 사실을 함께 적습니다."),
        tx("ShiftLink (planned): the sealed evaluation set is hashed, and scored once after code, prompts and model digests are frozen; any post-fix re-score is reported separately.", "ShiftLink(계획): 봉인 평가 세트는 해시로 고정하고, 코드·프롬프트·모델 digest를 동결한 뒤 한 번만 채점합니다. 수정 후 재채점은 따로 표기합니다."),
        tx("Nothing on this page is presented as a Jetson benchmark.", "이 페이지의 어떤 수치도 Jetson 벤치마크로 제시하지 않습니다."),
      ],
      results: [
        { value: "0.954", label: tx("baseline AUROC", "기준 모델 AUROC"), context: tx("logistic regression, 5-fold out-of-fold · synthetic data", "로지스틱 회귀, 5-fold OOF · 합성 데이터"), evidence: "measured" },
        { value: "0.862", label: tx("sensitivity at specificity ≥ 0.90", "특이도 0.90 이상에서 민감도"), context: tx("target 0.95 not met — recorded as a limitation", "목표 0.95 미달 — 한계로 기록"), evidence: "measured" },
        { value: "16.17", label: tx("VIF of a redundant feature", "중복 피처의 VIF"), context: tx("dropped with no AUROC loss", "제거해도 AUROC 손실 없음"), evidence: "measured" },
        { value: "67%", label: tx("effect shrinkage after confounder control", "교란변수 통제 후 효과 감소"), context: tx("the conclusion was adjusted", "결론을 조정함"), evidence: "measured" },
        { value: "—", label: tx("latency, power, memory on Jetson", "Jetson 지연 · 전력 · 메모리"), context: tx("not measured yet", "아직 미측정"), evidence: "planned" },
      ],
      tracks: [
        {
          status: "measured",
          title: tx("Built & measured", "구현 · 측정 완료"),
          items: [
            tx("Heart Disease Risk PoC: deployment budget fixed; Tier-1 hypotheses closed — 7 adopted, 7 rejected, 1 discarded.", "심장병 리스크 PoC: 배포 예산 고정, Tier-1 가설 종결 — 채택 7 · 기각 7 · 폐기 1."),
            tx("Voice agent: local speech recognition on a PC CPU (0.67 s median, n = 3) and the per-request token breakdown.", "음성 에이전트: PC CPU에서 로컬 음성 인식(중앙값 0.67초, n = 3)과 요청당 토큰 구성 측정."),
          ],
        },
        {
          status: "in-progress",
          title: tx("In progress", "진행 중"),
          items: [
            tx("ShiftLink on Jetson Orin Nano 8GB: offline shift-handover agent with local LLMs and sqlite-vec retrieval (team of four, until Oct 2026).", "Jetson Orin Nano 8GB 위의 ShiftLink: 로컬 LLM과 sqlite-vec 검색을 쓰는 오프라인 교대 인수인계 에이전트 (4인 팀, 2026년 10월까지)."),
            tx("POSCO K-Digital “On-device AI industrial software” program (560 h): machine learning, deep learning and computer-vision labs on concrete, die-casting and steel data.", "POSCO K-디지털 ‘온디바이스 AI 기반 산업용 소프트웨어 개발’ 과정(560시간): 콘크리트·다이캐스팅·철강 데이터로 머신러닝·딥러닝·컴퓨터비전 실습."),
          ],
        },
        {
          status: "planned",
          title: tx("Planned · not measured", "계획 · 미측정"),
          items: [
            tx("TensorRT FP32 → FP16 → INT8 for the PoC's small MLP, targeting ≤ 1 pp accuracy loss — not started.", "PoC 소형 MLP의 TensorRT FP32 → FP16 → INT8 변환, 정확도 손실 1%p 이하 목표 — 미착수."),
            tx("On-device intent model for the voice agent: the 1.2–1.4 s end-to-end figure is a paper estimate.", "음성 에이전트의 온디바이스 의도 모델: 종단 1.2–1.4초는 계산상의 추정치입니다."),
            tx("Multi-camera intersection analytics (four streams, batch = 4): a proposal only; FPS, resolution and latency targets aren't set.", "교차로 멀티카메라 분석(4스트림, batch = 4): 제안서 단계, FPS·해상도·지연 목표 미정."),
          ],
        },
      ],
      lessons: [
        tx("Fix the budget before the model — it turns “which model is best” into “which model fits”.", "모델보다 예산을 먼저 정하면 ‘어떤 모델이 최고인가’가 ‘어떤 모델이 들어가는가’로 바뀝니다."),
        tx("A success criterion that no single threshold can meet is a bug in the spec, not in the model.", "어떤 임계값으로도 만족할 수 없는 성공 기준은 명세의 버그입니다. 모델의 문제가 아닙니다."),
        tx("Labels like “estimated” and “not measured” are part of the engineering, not a disclaimer.", "‘추정’, ‘미측정’ 같은 표시는 엔지니어링의 일부입니다. 면책 문구로 붙인 것이 아닙니다."),
      ],
      links: [
        { label: tx("Heart Disease Risk PoC repository", "심장병 리스크 PoC 저장소"), href: "https://github.com/nalziori/heart-disease-risk-poc" },
        { label: tx("ShiftLink team repository", "ShiftLink 팀 저장소"), href: "https://github.com/hyjuy/ShiftLink" },
        { label: tx("Voice agent (on-device design)", "음성 에이전트 (온디바이스 설계)"), href: "https://github.com/nalziori/in-cabin-voice-agent" },
      ],
    },
  },

  // ───────────────────────────────────────────── Other projects
  {
    slug: "vetween",
    featured: false,
    title: tx("VETWEEN — Community for Young Veterinarians", "베트윈 — 젊은 수의사 커뮤니티"),
    category: tx("Product · Backend · Shipping", "제품 · 백엔드 · 출시"),
    year: "2022",
    status: tx("Startup (V-Medi) · lead and sole developer · Feb–Dec 2022", "스타트업(브이메디) · 리드·유일 개발자 · 2022.02–12"),
    summary: tx(
      "Joined as the only developer, found the inherited app had no backend API, proposed launching on the web first, and shipped in 3–4 weeks — then ran it to 1,000 registered members.",
      "유일한 개발자로 합류해 인계받은 앱에 백엔드 API가 없음을 확인하고, 웹 선출시를 제안해 3~4주 만에 출시했습니다. 이후 DB 기준 회원 1,000명까지 운영했습니다.",
    ),
    technologies: ["Node.js", "Express", "MySQL", "AWS", "DNS", "OneSignal"],
    highlights: [
      { value: "3–4 wks", label: tx("from pivot to web launch", "방향 전환부터 웹 출시까지"), evidence: "record" },
      { value: "~30", label: tx("APIs built", "개발한 API"), evidence: "record" },
      { value: "1,000", label: tx("registered members (DB)", "회원 수 (DB 기준)"), evidence: "record" },
    ],
    detail: {
      context: tx(
        "VETWEEN, run by the startup V-Medi, was a community platform for young veterinarians and veterinary students. I joined in February 2022 as the company's only developer. (The service was acquired by Medistaff in 2023, after I had left — not a result I claim.)",
        "베트윈은 스타트업 브이메디가 운영한 젊은 수의사·수의대생 커뮤니티 플랫폼입니다. 2022년 2월 회사의 유일한 개발자로 합류했습니다. (서비스는 제가 퇴사한 뒤인 2023년에 메디스태프에 인수되었으며, 제 성과로 주장하지 않습니다.)",
      ),
      roleShort: tx(
        "Only developer until launch — backend, AWS, database, domain, parts of the front end, operations",
        "출시까지 유일한 개발자 — 백엔드·AWS·DB·도메인·프론트엔드 일부·운영",
      ),
      role: {
        mine: [
          tx("Analyzed the Python/Django app inherited from an outsourcing vendor and found the backend had no API at all.", "외주사에서 인계받은 Python·Django 앱 코드를 분석해 백엔드에 API가 하나도 없음을 확인했습니다."),
          tx("When the app launch had made little progress for nearly three months, proposed launching on the web first; the CEO agreed.", "앱 출시가 석 달 가까이 진척되지 않자 웹 선출시를 제안했고 대표가 받아들였습니다."),
          tx("Built Node.js + Express and MySQL servers on AWS with about 30 APIs, bought the domain and configured DNS, and launched in 3–4 weeks (official launch: June 6, 2022).", "AWS에 Node.js·Express 서버와 MySQL을 구축해 API 30여 개를 만들고, 도메인 구매와 DNS 연결까지 해 3~4주 만에 출시했습니다(정식 오픈 2022년 6월 6일)."),
          tx("Built parts of the front end: a rolling banner, the post editor and a related-news upload page.", "프론트엔드 일부(롤링 배너, 게시글 입력 창, 관련 기사 업로드 페이지)를 만들었습니다."),
          tx("Operated the service, including incident response while the early servers were unstable.", "초기 서버가 불안정하던 시기의 장애 대응을 포함해 서비스를 운영했습니다."),
        ],
        others: [
          tx("The Android and iOS apps (September 2022) packaged the web app together with a front-end developer who joined later; web and app push via OneSignal was joint work.", "Android·iOS 앱(2022년 9월)은 이후 합류한 프론트엔드 개발자와 함께 웹앱을 패키징해 출시했고 OneSignal 웹·앱 푸시도 함께 구현했습니다."),
        ],
      },
      problem: [
        tx("Stalled delivery: the plan was an app, but the inherited codebase had no API layer to build on.", "멈춘 일정: 계획은 앱 출시였지만 인계받은 코드에는 기반이 될 API 계층이 없었습니다."),
        tx("A team decision: keep repairing the inherited app, or change course.", "팀의 결정: 인계받은 앱을 계속 고칠지, 방향을 바꿀지."),
        tx("One developer: the path had to be something I could learn, build and ship alone.", "개발자 한 명: 혼자 익히고 만들고 출시할 수 있는 길이어야 했습니다."),
        tx("Early production instability, with intermittent 503 errors.", "초기 운영 불안정: 간헐적인 503 오류."),
      ],
      architecture: {
        stages: [
          { kind: "input", label: tx("Users on the web", "웹 사용자"), detail: tx("veterinarians and vet students", "수의사 · 수의대생") },
          { kind: "code", label: tx("Web front end", "웹 프론트엔드"), detail: tx("my parts: banner, post editor, news upload", "제 담당: 배너 · 게시글 입력 · 기사 업로드") },
          { kind: "code", label: tx("Node.js + Express API", "Node.js + Express API"), detail: tx("~30 endpoints: boards, comments, news", "30여 개: 게시판 · 댓글 · 뉴스") },
          { kind: "code", label: tx("MySQL on AWS", "AWS의 MySQL"), detail: tx("application data", "서비스 데이터") },
          { kind: "output", label: tx("Domain, DNS, push", "도메인 · DNS · 푸시"), detail: tx("OneSignal web/app push (with the FE developer)", "OneSignal 웹·앱 푸시 (프론트엔드 개발자와 함께)") },
        ],
      },
      decisions: [
        {
          title: tx("Ship web first", "웹을 먼저 출시"),
          why: tx(
            "The team needed users more than it needed an app store listing. A web launch delivered the core service quickly, and the app followed in September as a packaged web app. The principle I took from it: ship what the team needs most right now, not what is technically hardest.",
            "팀에 필요한 것은 앱스토어 등록보다 사용자였습니다. 웹 출시로 핵심 서비스를 빠르게 내놓았고, 앱은 9월에 웹앱 패키징으로 뒤따랐습니다. 여기서 얻은 원칙은 지금 팀에 가장 필요한 것을 먼저 출시한다는 것입니다. 기술적으로 가장 어려운 것을 먼저 만들지 않습니다.",
          ),
          rejected: tx("Continuing to repair the inherited app.", "인계받은 앱을 계속 수리"),
        },
        {
          title: tx("Rebuild in the stack I could ship fastest", "가장 빨리 출시할 수 있는 스택으로 새로 만들기"),
          why: tx(
            "Django was new to me and the inherited code had too many gaps to fill reliably. Node.js + Express was the stack I could deliver alone, fastest, from coursework and self-study.",
            "당시 Django는 처음이었고 인계받은 코드에는 제 실력으로 메우기 어려운 빈틈이 너무 많았습니다. Node.js·Express는 수업과 독학으로 익혀 혼자 가장 빨리 결과를 낼 수 있는 스택이었습니다.",
          ),
          rejected: tx("Learning Django through a broken codebase under a deadline.", "마감을 앞두고 망가진 코드로 Django 익히기"),
        },
      ],
      evaluation: [
        tx("No A/B tests or product analytics are claimed. Outcome signals: the launch date is confirmed by press coverage, and the member count was read from the database.", "A/B 테스트나 제품 분석은 주장하지 않습니다. 결과 신호는 기사로 확인된 출시일과 DB에서 확인한 회원 수입니다."),
      ],
      results: [
        { value: "3–4 wks", label: tx("from pivot to web launch", "방향 전환부터 웹 출시까지"), evidence: "record" },
        { value: "~30", label: tx("APIs built", "개발한 API"), evidence: "record" },
        { value: "2022-06-06", label: tx("official launch", "정식 오픈"), context: tx("Medigate News, June 8, 2022", "메디게이트뉴스 2022.06.08 보도"), evidence: "record" },
        { value: "1,000", label: tx("registered members", "회원 수"), context: tx("database count", "DB 기준"), evidence: "record" },
      ],
      lessons: [
        tx("The most valuable thing to build is what the team needs now, not what is technically hardest.", "가장 가치 있는 일은 지금 팀에 가장 필요한 것입니다. 기술적으로 가장 어려운 것이 아닙니다."),
        tx("Speed has side effects: the fast launch brought early instability, and taught me to budget time for review and hardening.", "속도에는 부작용이 있습니다. 빠른 출시는 초기 불안정으로 이어졌고, 검수와 안정화에 시간을 배정해야 한다고 배웠습니다."),
        tx("Owning a live service — users, errors, a domain — is a different job from finishing a project.", "사용자·오류·도메인이 있는 실제 서비스를 책임지는 일은 프로젝트를 끝내는 일과 다릅니다."),
      ],
      links: [{ label: tx("Launch coverage (Medigate News, Korean)", "출시 보도 (메디게이트뉴스)"), href: "https://medigatenews.com/news/2110075911" }],
    },
  },
  {
    slug: "uam-knowledge-graph",
    featured: false,
    title: tx("UAM Delay & Passenger Attrition — Knowledge Graph", "UAM 지연과 승객 이탈 — 지식그래프 연구"),
    category: tx("Research · Knowledge graph", "연구 · 지식그래프"),
    year: "2023.03–06",
    status: tx("SK Telecom × Kyungpook National University · team of four undergraduates", "SK텔레콤 × 경북대학교 산학협력 · 학부생 4인 팀"),
    summary: tx(
      "Modeled passengers, time slots and transport operations as a knowledge graph to find when UAM delays make passengers switch modes: attrition rises most beyond an 8-minute delay and surges once the access-time gap exceeds 4 minutes (simulated data).",
      "승객·시간대·교통수단 운행을 지식그래프로 모델링해 UAM 지연이 언제 승객 이탈로 이어지는지 분석했습니다. 도착 지연이 8분을 넘으면 이탈률이 가장 크게 오르고, 접근·수속 시간 차가 4분을 넘으면 이탈이 급증했습니다(시뮬레이션 데이터).",
    ),
    technologies: ["Stardog", "SPARQL", "Ontology modeling"],
    highlights: [
      { value: "8 min", label: tx("delay where attrition rises most", "이탈률이 가장 크게 오르는 지연"), context: tx("simulated data", "시뮬레이션 데이터"), evidence: "measured" },
      { value: "2", label: tx("conference presentations", "학술대회 발표"), evidence: "record" },
    ],
    detail: {
      context: tx(
        "SK Telecom's brief asked for a model that classifies unstructured spatio-temporal data into layers and represents and queries it as a knowledge graph. Our team applied it to Urban Air Mobility — which isn't operating yet, so no real data existed. The study area was the Gimpo Airport–Yongsan route, a first-phase corridor in Seoul's 2040 plan.",
        "SK텔레콤의 원 과제는 비정형 시공간 데이터를 여러 계층으로 분류하고 지식그래프로 표현·질의하는 모델이었습니다. 팀은 이를 아직 운용되지 않아 실측 데이터가 없는 도심항공교통(UAM)에 적용했습니다. 연구 범위는 서울 2040 도시기본계획의 1단계 간선인 김포공항–용산 노선입니다.",
      ),
      roleShort: tx(
        "Team of four — knowledge graph (with one teammate), research design, paper writing",
        "4인 팀 — 지식그래프 구축(공동), 연구 설계, 논문 작성",
      ),
      role: {
        mine: [
          tx("Knowledge-graph construction (with one teammate), research design and paper writing — as listed in the official project report.", "지식그래프 구축(팀원 1명과 공동), 연구 설계, 논문 작성 — 결과보고서에 기재된 담당 업무입니다."),
          tx("Modeling decisions in the graph: promoting delay to its own class, and keeping only what the target queries needed.", "그래프 모델링 결정: 지연시간을 별도 클래스로 분리하고, 목표 질의에 필요한 요소만 남겼습니다."),
        ],
        others: [
          tx("Data generation, visualization and statistical analysis were led by other teammates.", "데이터 생성·시각화·통계 분석은 다른 팀원이 맡았습니다."),
          tx("Advised by a KNU professor and an SK Telecom manager.", "경북대 교수님과 SK텔레콤 매니저님이 지도했습니다."),
        ],
      },
      problem: [
        tx("No ground truth: UAM isn't operating, so passenger behavior had to be simulated from published distributions.", "실측 데이터 없음: UAM이 운용 전이라 승객 행동을 문헌의 분포로 시뮬레이션해야 했습니다."),
        tx("Query-driven modeling: the graph had to answer “riders per time slot” and “riders per delay value”.", "질의 중심 모델링: 그래프가 ‘시간대별 탑승자 수’와 ‘지연시간별 탑승자 수’에 답해야 했습니다."),
        tx("Scale: connecting 40,000 passenger nodes to 200 time nodes already creates millions of relations.", "규모: 승객 노드 40,000개와 시간 노드 200개만 연결해도 관계가 수백만 개가 됩니다."),
      ],
      architecture: {
        stages: [
          { kind: "input", label: tx("Simulated data", "시뮬레이션 데이터"), detail: tx("8,000,000 passenger–time records from 4 patience distributions (generated by teammates)", "승객 인내심 분포 4종으로 생성한 8,000,000건 (팀원 생성)") },
          { kind: "code", label: tx("Ontology", "온톨로지"), detail: tx("Passenger · operations (flight, subway, bus) · time · delay · advantage", "승객 · 운행(항공·지하철·버스) · 시간 · 지연 · 어드밴티지") },
          { kind: "code", label: tx("Stardog knowledge graph", "Stardog 지식그래프"), detail: tx("40,000 passengers · 200 time nodes · 800 operations", "승객 40,000 · 시간 200 · 운행 800") },
          { kind: "code", label: tx("SPARQL aggregation", "SPARQL 집계"), detail: tx("riders by time slot and by delay", "시간대별 · 지연시간별 탑승자 수") },
          { kind: "output", label: tx("Attrition thresholds", "이탈 경계값"), detail: tx("8-minute delay · 4-minute access-time gap", "지연 8분 · 접근 시간 차 4분") },
        ],
      },
      decisions: [
        {
          title: tx("Promote delay from attribute to class", "지연시간을 속성에서 클래스로 분리"),
          why: tx("Delay started as an attribute of a flight; aggregating riders per delay value required making it a class of its own.", "지연시간은 처음에 항공 운항의 속성이었지만, 지연시간별 탑승자 수를 집계하려면 별도 클래스가 되어야 했습니다."),
        },
        {
          title: tx("Build only what the queries need", "질의에 필요한 만큼만 만들기"),
          why: tx(
            "The graph was built so that only the minimum needed to run the two target queries worked. With 40,000 passengers and 200 time nodes, every extra relation multiplied cost.",
            "두 가지 목표 질의를 실행하는 데 필요한 최소한만 동작하도록 그래프를 만들었습니다. 승객 40,000명과 시간 노드 200개 규모에서는 관계 하나를 늘릴 때마다 비용이 곱으로 늘었습니다.",
          ),
        },
      ],
      evaluation: [
        tx("Results come from SPARQL aggregation over simulated data. No field validation was possible, and every number is reported as a simulation outcome.", "결과는 시뮬레이션 데이터에 대한 SPARQL 집계입니다. 현장 검증은 불가능했고, 모든 수치를 시뮬레이션 결과로 표기합니다."),
      ],
      results: [
        { value: "8 min", label: tx("delay where attrition rises most", "이탈률이 가장 크게 오르는 지연"), context: tx("simulated", "시뮬레이션"), evidence: "measured" },
        { value: "≤4 min", label: tx("delays with no attrition observed", "이탈이 관측되지 않은 지연"), context: tx("simulated", "시뮬레이션"), evidence: "measured" },
        { value: "4 min", label: tx("access-time gap where attrition surges", "이탈이 급증하는 접근 시간 차"), context: tx("simulated", "시뮬레이션"), evidence: "measured" },
        { value: "2", label: tx("conference presentations", "학술대회 발표"), context: tx("KIISS 2023 Spring · KSAS 2023 Fall", "한국지능정보시스템학회 2023 춘계 · 한국항공우주학회 2023 추계"), evidence: "record" },
      ],
      lessons: [
        tx("Let the questions design the schema.", "질문이 스키마를 설계하게 합니다."),
        tx("State the data's origin next to every result — here, every number is a simulation outcome.", "모든 결과 옆에 데이터 출처를 적습니다. 여기서는 모든 숫자가 시뮬레이션 결과입니다."),
      ],
      links: [{ label: tx("Featured on SK Telecom DEVOCEAN (Korean)", "SK텔레콤 DEVOCEAN 소개 글"), href: "https://devocean.sk.com/search/techBoardDetail.do?ID=165226" }],
    },
  },
  {
    slug: "heart-disease-risk-poc",
    featured: false,
    title: tx("On-device Heart Disease Risk PoC", "온디바이스 심장병 리스크 PoC"),
    category: tx("Statistical validation · Edge budget", "통계 검증 · 엣지 예산"),
    year: "2026.08–",
    status: tx("Personal project · in progress", "개인 프로젝트 · 진행 중"),
    summary: tx(
      "A diagnostic-assist model designed inside a Jetson budget, with hypotheses tested before features are trusted. Synthetic data; no clinical validation.",
      "Jetson 예산 안에서 설계한 진단 보조 모델입니다. 피처를 믿기 전에 가설부터 검정합니다. 합성 데이터 기반이며 임상 검증은 하지 않았습니다.",
    ),
    technologies: ["Python", "scikit-learn", "statsmodels", "pandas"],
    github: "https://github.com/nalziori/heart-disease-risk-poc",
    href: "/projects/edge-ai-jetson/",
    highlights: [
      { value: "0.954", label: tx("baseline AUROC", "기준 AUROC"), context: tx("synthetic data", "합성 데이터"), evidence: "measured" },
      { value: "7 · 7 · 1", label: tx("adopted · rejected · discarded", "채택 · 기각 · 폐기"), context: tx("Tier-1 hypotheses", "Tier-1 가설"), evidence: "measured" },
    ],
  },
  {
    slug: "agent-engineering-toolkit",
    featured: false,
    title: tx("Agent Engineering Toolkit", "에이전트 엔지니어링 도구 모음"),
    category: tx("Developer tooling · Auditability", "개발 도구 · 감사 가능성"),
    year: "2026.08",
    status: tx("Open-source Claude Code plugin", "오픈소스 Claude Code 플러그인"),
    summary: tx(
      "My agent workflows packaged as reusable skills: an append-only decision ledger (Planning → Execution → Evidence → Verification → Reflection → State) and its debugger, hackathon eval scaffolding, and a research-first protocol. The ledger's working implementation lives in the router repo.",
      "제 에이전트 작업 방식을 재사용 가능한 스킬로 묶었습니다. append-only 결정 원장(계획 → 실행 → 근거 → 검증 → 성찰 → 상태)과 디버거, 해커톤 평가 스캐폴딩, 연구 우선 프로토콜이 들어 있습니다. 원장의 실제 구현체는 라우터 저장소에 있습니다.",
    ),
    technologies: ["Claude Code", "SQLite", "Python"],
    github: "https://github.com/nalziori/my-claude-skills",
    highlights: [],
  },
  {
    slug: "ue5-drone-simulator",
    featured: false,
    title: tx("UE5 Drone Flight Simulator", "UE5 드론 비행 시뮬레이터"),
    category: tx("C++ · Simulation & control", "C++ · 시뮬레이션 · 제어"),
    year: "2026.05–06",
    status: tx("Personal project", "개인 프로젝트"),
    summary: tx(
      "A C++ drone controller in Unreal Engine 5.1–5.3: Chaos physics with mass and damping as drag, Enhanced Input, PID attitude stabilization, hover mode, flip recovery, HUD and FPV camera. The engine applies torque in world space, so axis drift was fixed by computing torque from the body's own forward and right vectors.",
      "언리얼 엔진 5.1~5.3과 C++로 만든 드론 컨트롤러입니다. 질량·감쇠로 공기저항을 모사한 Chaos 물리, Enhanced Input, PID 자세 안정화, 호버 모드, 뒤집힘 복구, HUD와 FPV 카메라를 구현했습니다. 엔진이 토크를 월드 좌표계로 적용해 조작 축이 틀어지던 문제는 기체의 전방·우측 벡터로 토크를 직접 계산해 해결했습니다.",
    ),
    technologies: ["C++", "Unreal Engine 5.1–5.3", "Chaos Physics", "PID control", "Git LFS"],
    highlights: [],
    note: tx("Private repository · C++ for Unreal specialization (Coursera, 2023)", "비공개 저장소 · Coursera C++ for Unreal 전문과정 수료 (2023)"),
  },
];

export const featured = projects.filter((p) => p.featured);
export const others = projects.filter((p) => !p.featured);
export const detailed = projects.filter((p) => p.detail);
export const findProject = (slug: string) => projects.find((p) => p.slug === slug);
