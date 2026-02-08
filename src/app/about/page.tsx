import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "소개 | 웹 개발자 포트폴리오",
  description:
    "웹 개발자의 상세 자기소개 페이지입니다. 경력, 가치관, 교육 배경을 확인해보세요.",
};

export default function AboutPage() {
  return <AboutContent />;
}
