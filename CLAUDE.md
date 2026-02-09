# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Notion CMS 기반 포트폴리오 스타터킷. Next.js 16 App Router + Tailwind CSS v4 + shadcn/ui(New York 스타일) + Framer Motion 구성.

## 개발 명령어

```bash
npm run dev          # 개발 서버 (Turbopack)
npm run build        # 프로덕션 빌드
npm run lint         # ESLint
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 포맷팅
npm run format:check # Prettier 검사
npm run type-check   # TypeScript 타입 체크
```

Pre-commit hook(Husky + lint-staged)이 설정되어 있어 커밋 시 자동으로 lint + format 실행.

## 환경 변수

`.env.local`에 다음 값 필요:

```
NOTION_API_KEY=          # Notion Integration API 키
NOTION_PROJECTS_DB_ID=   # 프로젝트 Data Source ID
```

Notion 데이터베이스 속성: `이름`(Title), `설명`(Rich Text), `이미지`(Files), `기술스택`(Multi-select), `데모 URL`(URL), `GitHub URL`(URL), `주요 프로젝트`(Checkbox), `상태`(Select: 공개/비공개), `순서`(Number)

## 아키텍처

### 렌더링 전략

- **서버 컴포넌트가 기본** — 데이터 페칭은 서버에서 처리
- **클라이언트 컴포넌트** — 애니메이션/인터랙션이 필요한 경우만 `"use client"` 명시
- **페이지 분리 패턴** — `page.tsx`(서버, 데이터 페칭) + `*-content.tsx`(클라이언트, UI/애니메이션)

### 데이터 흐름 (Notion → 화면)

```
Notion API → queryDataSource() → transformNotionPageToProject() → unstable_cache(1시간) → Server Component
```

- `src/lib/notion.ts` — Notion 클라이언트, 페이지네이션 처리, 블록 조회
- `src/lib/notion-projects.ts` — 프로젝트 데이터 변환, 캐시 래핑 함수(`getCachedProjects`, `getCachedProjectDetail`, `getCachedAllProjectIds`)
- 캐시 실패 시 빈 배열/null 반환으로 페이지 렌더링 유지

### 라우트 구조

```
/                    → 홈 (섹션: hero, about, skills, projects, contact)
/about               → 소개 상세 (Notion 블록 렌더링)
/projects/[id]       → 프로젝트 상세 (generateStaticParams로 정적 생성)
/api/contact         → POST: 연락처 폼 제출
```

### 컴포넌트 구조

- `src/components/ui/` — shadcn/ui 기본 컴포넌트 (button, card, form, badge 등)
- `src/components/sections/` — 홈 페이지 섹션 컴포넌트 (hero, about, skills, projects, contact)
- `src/components/layout/` — 헤더, 푸터, 테마 관련
- `src/components/notion/` — Notion 블록 렌더러 (NotionRenderer, NotionRichText)

### 애니메이션 패턴

`useScrollAnimation` 훅 + `src/lib/animations.ts`의 variants 조합:

```tsx
const { ref, isInView } = useScrollAnimation();
<motion.div
  ref={ref}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
  variants={staggerContainer}
>
  <motion.div variants={staggerItem}>...</motion.div>
</motion.div>;
```

## 코드 컨벤션

- **언어**: 주석, 커밋 메시지, 문서 모두 한국어. 변수명/함수명은 영어
- **커밋**: 컨벤셔널 커밋 형식 (feat, fix, docs, style, refactor, perf, chore)
- **import 순서**: React → 외부 라이브러리 → 내부 모듈(`@/`) → 타입
- **배럴 익스포트**: 각 컴포넌트 디렉토리에 `index.ts`
- **경로 별칭**: `@/*` → `./src/*`
- **스타일링**: Tailwind 유틸리티 클래스, `cn()` 함수로 조건부 병합
- **폰트**: Pretendard Variable (로컬 폰트, `src/fonts/`)
- **색상**: oklch 색공간 기반 CSS 변수 (`globals.css`)
