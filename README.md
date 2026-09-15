# Jaeyoung Choi — AI Engineer Portfolio

영어(기본)·한국어 이중 언어 포트폴리오 사이트입니다.
Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · Framer Motion.

- 영어: `/`, `/projects/<slug>/`
- 한국어: `/ko/`, `/ko/projects/<slug>/`
- 두 언어 모두 정적 HTML로 생성되어 검색엔진·ATS·AI 크롤러가 그대로 읽을 수 있습니다.

## 실행

```bash
npm install
npm run dev     # http://localhost:3000 — "확인 필요" 표시가 보이는 모드
npm run build   # out/ 폴더에 정적 사이트 생성
python -m http.server 4173 --directory out   # 빌드 결과 확인
```

## 폴더 구조

```text
app/
  layout.tsx              루트 레이아웃 (폰트, 기본 메타데이터)
  (en)/                   영어 페이지 — /, /projects/[slug]/
  ko/                     한국어 페이지 — /ko/, /ko/projects/[slug]/
  sitemap.ts, robots.ts   SEO
components/
  home/                   홈 섹션 (Hero · Work · About/Principles · Timeline · Skills · Contact)
  project/ProjectPage.tsx 케이스 스터디 템플릿 (01 Context … 09 Links)
  diagrams.tsx            아키텍처 흐름 · 막대 · 예산 다이어그램 (텍스트는 실제 DOM)
  ProjectCard.tsx, ui.tsx, motion.tsx, LangToggle.tsx, Site.tsx
data/                     ← 사이트의 모든 문구와 수치
  profile.ts              이름 · 링크 · 소개 · 원칙 · 연구 · UI 문구
  projects.ts             프로젝트
  timeline.ts, skills.ts
lib/                      i18n 경로 규칙, 메타데이터 헬퍼
scripts/flatten-segments.mjs   Next 16 static export 404 우회 (아래 참고)
```

## 콘텐츠 수정

모든 문구는 `tx("English", "한국어")` 쌍입니다. 컴포넌트를 건드리지 않고 `data/`만 고치면 됩니다.

**프로젝트 추가** — `data/projects.ts` 배열에 객체를 하나 추가합니다.

| 필드 | 의미 |
|---|---|
| `slug`, `title`, `category`, `year`, `status`, `summary` | 카드와 페이지 상단 |
| `technologies`, `github`, `demo`, `paper` | 기술 태그와 링크 |
| `highlights` | 카드에 보이는 핵심 수치 2~3개 |
| `featured` | `true`면 주요 프로젝트 영역 |
| `cover` | 카드 그림: `flow`(아키텍처 요약) · `funnel` · `budget` |
| `detail` | 넣으면 케이스 스터디 페이지 생성 — `context`, `roleShort`, `role`(`mine` / `others`), `problem`, `architecture`, `decisions`, `evaluation`, `results`, `lessons`, `links` |

**숫자에는 반드시 출처를 붙입니다** (`evidence`):
`official` 공식 결과 · `measured` 직접 측정 · `record` 문서·DB·기사 기록 · `implemented` 코드로 확인된 동작 · `estimated` 추정 · `in-progress` 진행 중 · `planned` 계획·미측정.

**아키텍처 단계**(`architecture.stages`)의 `kind`가 색을 정합니다:
`llm` 주황 · `model` 점선(로컬 모델) · `code` 실선(결정론 코드) · `gate` 이중선(검증) · `input` / `output`.
배열 안에 배열을 넣으면 병렬 단계로 그려집니다.

## 배포 전에 채울 것 (확인 필요)

| 항목 | 위치 |
|---|---|
| LinkedIn URL | `data/profile.ts` → `linkedin` |
| 이력서 PDF | `public/`에 파일을 넣고 `resume: "/resume.pdf"` |
| 실제 배포 주소 | 환경변수 `NEXT_PUBLIC_SITE_URL` (canonical · hreflang · sitemap에 사용) |

`npm run dev`에서는 빈 링크 자리에 "확인 필요"가 보이고, 프로덕션 빌드에서는 해당 버튼이 자동으로 숨겨집니다.

## GitHub Pages 배포

`public/.nojekyll`이 포함되어 있어 `_next/` 폴더가 Jekyll에 의해 무시되지 않습니다.

- **사용자 사이트** (`nalziori.github.io` 저장소, 현재 방식): `main`에 push하면 `.github/workflows/deploy.yml`이 빌드해 https://nalziori.github.io/ 에 배포합니다.
- **프로젝트 사이트** (`nalziori.github.io/<저장소>`): base path를 지정해서 빌드합니다.

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/portfolio"; $env:NEXT_PUBLIC_SITE_URL="https://nalziori.github.io/portfolio"; npm run build
```

## 알려진 사항

- `scripts/flatten-segments.mjs` — Next 16.3의 static export는 프리페치용 세그먼트 파일을 폴더 구조(`__next.ko/__PAGE__.txt`)로 쓰지만, 브라우저는 점으로 이어진 이름(`__next.ko.__PAGE__.txt`)으로 요청해 정적 호스팅에서 404가 납니다. 빌드 직후 점 이름 복사본을 만들어 해결합니다. Next가 수정하면 스크립트와 `package.json`의 `&& node scripts/...`를 지우면 됩니다.
- 다크 모드는 OS 설정을 따릅니다. `prefers-reduced-motion`이면 모든 애니메이션이 꺼집니다.
- 콘텐츠 출처: GitHub 공개 저장소, LLM-Wiki(Obsidian)에 검증해 둔 정리 페이지, 원본 문서(결과보고서·논문 PDF 등). 원자료와 달랐던 표현은 원자료 기준으로 고쳤습니다.
