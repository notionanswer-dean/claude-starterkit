"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// next-themes의 ThemeProviderProps 타입 정의
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * 테마 프로바이더 컴포넌트
 * 다크모드/라이트모드 전환을 지원합니다.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
