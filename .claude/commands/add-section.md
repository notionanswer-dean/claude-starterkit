---
description: "기존 패턴에 맞는 새 섹션/페이지 스캐폴딩"
argument-hint: "섹션 이름 (예: 블로그, 경력, 스킬)"
allowed-tools: ["Read", "Write", "Edit", "Glob", "Grep", "Bash(ls:*)"]
---

# Claude 명령어: Add Section

기존 프로젝트 패턴에 맞는 새 섹션이나 페이지를 스캐폴딩합니다.

## 사용법

```
/add-section 블로그
/add-section 경력
/add-section 스킬
```

## 인수

- `$ARGUMENTS`: 추가할 섹션의 한글 이름 (필수)

## 중요 규칙

- 기존 코드의 패턴을 **실시간으로 분석**하여 최신 스타일을 따른다
- 하드코딩된 템플릿이 아닌, 실제 코드에서 추출한 패턴을 사용한다
- 파일 생성 후 수동으로 해야 할 작업을 명확히 안내한다

## 프로세스

### 1단계: 섹션 이름 확인

- `$ARGUMENTS`에서 섹션 이름을 추출한다
- 인수가 없으면 사용자에게 섹션 이름을 묻는다
- 한글 이름을 영문 식별자로 변환한다 (예: "블로그" → "blog", "경력" → "experience")

### 2단계: 유형 선택

사용자에게 아래 3가지 유형 중 선택하도록 안내한다:

1. **메인 페이지 섹션** — 메인 페이지(`/`)에 표시되는 섹션 컴포넌트
2. **독립 페이지** — 별도 URL을 가진 독립 페이지 (`/about` 형태)
3. **Notion 연동 페이지** — Notion 데이터베이스와 연동된 동적 페이지 (`/projects/[id]` 형태)

### 3단계: 기존 패턴 분석

유형에 따라 아래 참조 파일들을 읽어 최신 패턴을 추출한다:

**메인 페이지 섹션 참조:**

- `src/components/sections/about.tsx` — 섹션 컴포넌트 구조, 애니메이션 패턴
- `src/components/sections/index.ts` — 배럴 익스포트 패턴
- `src/hooks/` — 커스텀 훅 사용 패턴
- `src/lib/animation.ts` — 애니메이션 variants

**독립 페이지 참조:**

- `src/app/about/page.tsx` — 페이지 파일 구조, metadata 패턴
- `src/app/about/about-content.tsx` (있다면) — 컨텐츠 컴포넌트 분리 패턴

**Notion 연동 페이지 참조:**

- `src/app/projects/[id]/page.tsx` — 동적 라우팅, generateStaticParams, generateMetadata
- `src/lib/notion-projects.ts` — Notion 데이터 페칭, 캐싱, 변환 패턴
- `src/lib/notion.ts` — Notion 클라이언트 설정
- `src/types/index.ts` — 타입 정의 패턴

### 4단계: 파일 생성

유형별로 아래 파일들을 생성한다:

#### 유형 1: 메인 페이지 섹션

생성할 파일:

- `src/components/sections/{name}.tsx` — 섹션 컴포넌트

수정할 파일:

- `src/components/sections/index.ts` — 새 컴포넌트 export 추가

**컴포넌트 패턴 (참조 파일에서 추출):**

- `"use client"` 디렉티브
- framer-motion import 및 애니메이션 적용
- `useScrollAnimation` 훅 사용
- `staggerContainer`, `staggerItem` 애니메이션 variants
- `section` 태그에 `id` 속성 부여
- 명명된 export (예: `export function BlogSection()`)

#### 유형 2: 독립 페이지

생성할 파일:

- `src/app/{name}/page.tsx` — 페이지 파일 (metadata + 컴포넌트 렌더링)
- `src/app/{name}/{name}-content.tsx` — 컨텐츠 컴포넌트 (있는 경우)

**페이지 패턴 (참조 파일에서 추출):**

- `Metadata` 타입 import 및 설정
- 컨텐츠 컴포넌트 분리
- default export 함수

#### 유형 3: Notion 연동 페이지

생성할 파일:

- `src/app/{name}/page.tsx` — 목록 페이지
- `src/app/{name}/[id]/page.tsx` — 상세 페이지
- `src/lib/notion-{name}.ts` — Notion 데이터 페칭 함수

수정할 파일:

- `src/types/index.ts` — 새 데이터 타입 추가

**Notion 연동 패턴 (참조 파일에서 추출):**

- `@notionhq/client` 타입 import
- `queryDataSource`, `getPageBlocks` 유틸 사용
- `transformNotionPageTo{Type}()` 변환 함수
- `unstable_cache` 캐싱 (3600초 TTL)
- `generateStaticParams()` 정적 생성
- `generateMetadata()` 동적 메타데이터
- 에러 핸들링 (실패 시 빈 배열 반환)
- `PageProps` 인터페이스 (`params: Promise<{ id: string }>`)

### 5단계: 결과 보고

생성 완료 후 아래 형식으로 결과를 출력한다:

```
## ✅ 섹션 스캐폴딩 완료: {섹션 이름}

### 생성된 파일
- `경로/파일명` — 설명

### 수정된 파일
- `경로/파일명` — 변경 내용

### 수동 작업 필요
1. **네비게이션 추가**: `src/components/layout/header.tsx` (또는 네비게이션 컴포넌트)에 새 링크 추가
2. **메인 페이지 연동** (유형 1인 경우): `src/app/page.tsx`에서 새 섹션 컴포넌트 import 및 배치
3. **Notion 설정** (유형 3인 경우):
   - Notion에 데이터베이스 생성
   - `.env.local`에 데이터소스 ID 추가
   - 데이터베이스 속성과 코드의 매핑 확인
4. **스타일 커스터마이징**: 생성된 컴포넌트의 색상, 레이아웃 등을 프로젝트에 맞게 조정
```

## 참고사항

- 기존 컴포넌트와 이름이 겹치지 않도록 생성 전에 확인한다
- 생성된 코드는 최소한의 동작하는 스캐폴딩이며, 실제 콘텐츠와 스타일은 사용자가 커스터마이징해야 한다
- Notion 연동 유형은 프로젝트에 이미 Notion 설정이 되어 있어야 한다
