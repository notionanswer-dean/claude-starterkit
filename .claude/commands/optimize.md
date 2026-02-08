---
description: "Next.js 성능 분석 및 최적화 제안 (읽기 전용)"
allowed-tools:
  [
    "Read",
    "Glob",
    "Grep",
    "Bash(npm run build:*)",
    "Bash(npx next info:*)",
    "Bash(du:*)",
    "Bash(wc:*)",
    "Bash(ls:*)",
  ]
---

# Claude 명령어: Optimize

Next.js 프로젝트의 성능을 분석하고 최적화 방안을 제안합니다.

## 사용법

```
/optimize
```

## 중요 규칙

- **읽기 전용**: 분석과 제안만 수행하며, 파일을 절대 수정하지 않는다
- 모든 제안에는 구체적인 코드 예시를 포함한다
- 심각도별로 분류하여 우선순위를 명확히 한다

## 분석 프로세스

아래 7단계를 순서대로 수행한다.

### 1단계: 의존성 분석

- `package.json`의 dependencies와 devDependencies를 읽는다
- 번들 크기에 영향을 주는 대형 라이브러리를 식별한다
- 사용되지 않는 의존성이 있는지 확인한다 (import 검색)
- 더 가벼운 대안이 있는 라이브러리를 찾는다

### 2단계: Next.js 설정 분석

- `next.config.ts` (또는 `next.config.js`, `next.config.mjs`)를 읽는다
- 이미지 최적화 설정 확인 (domains, formats, deviceSizes 등)
- 실험적 기능 활용 여부 점검 (turbopack, ppr, optimizePackageImports 등)
- `app/layout.tsx`에서 폰트 최적화 방식 확인

### 3단계: React 렌더링 최적화

- `"use client"` 디렉티브 사용 패턴 분석
- 클라이언트 컴포넌트 범위가 최소화되어 있는지 확인
- 불필요한 리렌더링 가능성 식별 (인라인 객체/함수, 미사용 state 등)
- `React.memo`, `useMemo`, `useCallback` 사용이 필요한 곳 식별

### 4단계: Notion 데이터 캐싱 분석

- `src/lib/` 내 Notion 관련 파일들을 분석한다
- `unstable_cache` 또는 `next/cache` 사용 패턴 확인
- 캐시 TTL(revalidate) 설정이 적절한지 검토
- 불필요한 API 호출이 중복되는 곳 식별
- `generateStaticParams` 활용 여부 확인

### 5단계: CSS 및 Tailwind 분석

- `tailwind.config.ts`의 content 경로가 정확한지 확인
- 사용되지 않는 CSS가 번들에 포함되는지 점검
- `globals.css`에서 불필요한 전역 스타일 확인
- 동적 클래스명 사용 패턴 점검 (퍼지 안전성)

### 6단계: Core Web Vitals 점검

- 이미지 컴포넌트 사용 확인 (`next/image` vs `<img>`)
- `priority` 속성이 LCP 이미지에 적용되어 있는지 확인
- 레이아웃 시프트 유발 요소 식별 (width/height 미지정 등)
- 폰트 로딩 전략 확인 (`next/font` 사용 여부)
- 서드파티 스크립트 로딩 방식 확인 (`next/script` 사용 여부)

### 7단계: 빌드 성능 분석

- `npm run build`를 실행하여 빌드 출력을 분석한다
- 각 라우트의 번들 크기를 확인한다
- 정적(○) vs 동적(ƒ) vs ISR(●) 라우트 비율을 분석한다
- First Load JS 크기가 권장 범위(< 100kB) 내인지 확인한다

## 결과 출력 형식

분석 완료 후 아래 형식으로 결과를 정리한다:

````
## 🔍 성능 분석 결과

### 요약
- 분석 항목: N개
- 발견된 이슈: N개 (🔴 N개 / 🟡 N개 / 🟢 N개)

### 🔴 즉시 개선 필요 (심각)
> 성능에 큰 영향을 미치는 문제

1. **[이슈 제목]**
   - 현재 상태: ...
   - 권장 변경: ...
   - 예상 효과: ...
   - 코드 예시:
   ```tsx
   // before
   ...
   // after
   ...
````

### 🟡 개선 권장 (보통)

> 성능 향상에 도움이 되는 개선사항

### 🟢 잘 되어 있음 (양호)

> 이미 최적화가 적용된 부분

### 📊 빌드 분석

- 전체 빌드 크기: ...
- First Load JS: ...
- 정적/동적 라우트 비율: ...

```

## 참고사항

- 이 명령어는 순수 분석 도구이며, 어떤 파일도 수정하지 않는다
- 제안된 최적화는 프로젝트 맥락에 맞게 선별적으로 적용해야 한다
- 빌드 실행이 실패하면 빌드 에러 해결 방안도 함께 제안한다
```
