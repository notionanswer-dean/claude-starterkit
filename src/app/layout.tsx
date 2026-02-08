import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "Portfolio | 웹 개발자 포트폴리오",
  description:
    "창의적인 웹 개발자의 포트폴리오입니다. 프로젝트, 기술 스택, 경험을 확인해보세요.",
  keywords: ["포트폴리오", "웹 개발자", "프론트엔드", "React", "Next.js"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://your-domain.com",
    title: "Portfolio | 웹 개발자 포트폴리오",
    description:
      "창의적인 웹 개발자의 포트폴리오입니다. 프로젝트, 기술 스택, 경험을 확인해보세요.",
    siteName: "Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | 웹 개발자 포트폴리오",
    description:
      "창의적인 웹 개발자의 포트폴리오입니다. 프로젝트, 기술 스택, 경험을 확인해보세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
