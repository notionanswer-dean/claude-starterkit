"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Heart,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

// 가치관/강점 데이터
const values = [
  {
    icon: Heart,
    title: "사용자 중심 설계",
    description:
      "기술이 아닌 사용자의 관점에서 출발합니다. 직관적이고 접근성 높은 인터페이스를 통해 모든 사용자가 편안하게 이용할 수 있는 경험을 설계합니다.",
  },
  {
    icon: Sparkles,
    title: "코드 품질",
    description:
      "읽기 쉽고 유지보수하기 좋은 코드를 작성하는 것을 최우선으로 합니다. 일관된 코딩 컨벤션, 충분한 테스트, 명확한 문서화를 실천합니다.",
  },
  {
    icon: Lightbulb,
    title: "지속적 학습",
    description:
      "빠르게 변화하는 웹 생태계에서 끊임없이 학습하고 성장합니다. 새로운 기술을 탐구하고, 커뮤니티에 기여하며, 더 나은 개발자가 되기 위해 노력합니다.",
  },
];

// 경력 데이터
const careers = [
  {
    period: "2022.03 — 현재",
    company: "ABC 테크놀로지",
    role: "프론트엔드 개발자",
    description:
      "React/Next.js 기반 웹 애플리케이션 개발 및 유지보수. 디자인 시스템 구축, 성능 최적화, 접근성 개선 등을 담당했습니다.",
    achievements: [
      "디자인 시스템 도입으로 UI 개발 속도 40% 향상",
      "Core Web Vitals 개선으로 LCP 2.5초 → 1.2초 달성",
      "신규 서비스 런칭 프로젝트 프론트엔드 리드",
    ],
  },
  {
    period: "2020.06 — 2022.02",
    company: "XYZ 스타트업",
    role: "웹 개발자",
    description:
      "풀스택 웹 개발을 담당하며 초기 제품 개발부터 런칭까지 참여했습니다. 사용자 피드백 기반 빠른 반복 개발을 경험했습니다.",
    achievements: [
      "MVP 개발 및 런칭, 3개월 내 MAU 1만 달성",
      "RESTful API 설계 및 구현",
      "CI/CD 파이프라인 구축으로 배포 자동화",
    ],
  },
];

// 교육 데이터
const education = [
  {
    period: "2016.03 — 2020.02",
    school: "OO대학교",
    major: "컴퓨터공학과",
    description: "자료구조, 알고리즘, 소프트웨어 공학 등을 학습했습니다.",
  },
];

/**
 * About 페이지 클라이언트 컴포넌트
 * 상세 자기소개, 가치관, 경력, 교육 등을 표시합니다.
 */
export function AboutContent() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* 뒤로가기 버튼 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                메인으로 돌아가기
              </Link>
            </Button>
          </motion.div>

          {/* 페이지 헤더 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.h1
              variants={fadeInUp}
              className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl"
            >
              소개
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-base leading-7 md:text-lg md:leading-8"
            >
              사용자 경험을 중심으로 생각하며, 아름답고 기능적인 웹 경험을
              만드는 개발자입니다.
            </motion.p>
          </motion.div>

          {/* 상세 자기소개 */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="mb-6 text-2xl font-bold tracking-tight md:text-3xl"
            >
              이야기
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="space-y-6 text-base leading-7 md:text-lg md:leading-8"
            >
              <p className="text-muted-foreground">
                어린 시절부터 컴퓨터에 매료되어, 직접 무언가를 만들어내는 것에
                큰 즐거움을 느꼈습니다. 처음 HTML로 간단한 웹 페이지를 만들었을
                때의 설렘은 지금도 생생합니다. 그 경험이 웹 개발의 세계로
                이끌었고, 이후 꾸준히 이 분야에서 성장해왔습니다.
              </p>
              <p className="text-muted-foreground">
                대학에서 컴퓨터공학을 전공하며 탄탄한 기초를 쌓았고, 졸업 후
                스타트업에서의 첫 실무 경험을 통해 빠르게 성장할 수 있었습니다.
                제한된 리소스 속에서 MVP를 기획하고 개발하는 과정에서, 효율적인
                코드 작성과 사용자 중심의 사고방식을 자연스럽게 체득했습니다.
              </p>
              <p className="text-muted-foreground">
                현재는 프론트엔드 개발에 집중하며, React와 Next.js 생태계를 깊이
                탐구하고 있습니다. 단순히 동작하는 코드를 넘어, 성능과 접근성,
                유지보수성까지 고려한 코드를 작성하기 위해 항상 노력합니다.
              </p>
            </motion.div>
          </motion.section>

          {/* 가치관/강점 */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="mb-8 text-2xl font-bold tracking-tight md:text-3xl"
            >
              가치관
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {values.map((item) => (
                <motion.div key={item.title} variants={staggerItem}>
                  <Card className="border-border/50 bg-background/50 h-full backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="bg-primary/10 text-primary mb-4 inline-flex rounded-lg p-3">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* 경력 타임라인 */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="mb-8 text-2xl font-bold tracking-tight md:text-3xl"
            >
              <Briefcase className="mr-2 inline-block h-7 w-7" />
              경력
            </motion.h2>
            <motion.div variants={staggerContainer} className="space-y-6">
              {careers.map((career) => (
                <motion.div key={career.company} variants={staggerItem}>
                  <Card className="border-border/50 bg-background/50 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-xl font-semibold">
                          {career.company}
                        </h3>
                        <span className="text-muted-foreground text-sm">
                          {career.period}
                        </span>
                      </div>
                      <p className="text-primary mb-3 text-sm font-medium">
                        {career.role}
                      </p>
                      <p className="text-muted-foreground mb-4 text-base leading-7">
                        {career.description}
                      </p>
                      <ul className="space-y-1">
                        {career.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="text-muted-foreground flex items-start gap-2 text-sm"
                          >
                            <span className="text-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* 교육 */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="mb-8 text-2xl font-bold tracking-tight md:text-3xl"
            >
              <GraduationCap className="mr-2 inline-block h-7 w-7" />
              교육
            </motion.h2>
            <motion.div variants={staggerContainer} className="space-y-6">
              {education.map((edu) => (
                <motion.div key={edu.school} variants={staggerItem}>
                  <Card className="border-border/50 bg-background/50 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-xl font-semibold">{edu.school}</h3>
                        <span className="text-muted-foreground text-sm">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-primary mb-2 text-sm font-medium">
                        {edu.major}
                      </p>
                      <p className="text-muted-foreground text-base leading-7">
                        {edu.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/#contact">연락하기</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#projects">
                  프로젝트 보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
