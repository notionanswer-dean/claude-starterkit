"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Hero 섹션 컴포넌트
 * 포트폴리오 메인 랜딩 영역으로 패럴랙스 효과와 애니메이션을 포함합니다.
 */
export function HeroSection() {
  const { scrollY } = useScroll();

  // 패럴랙스 효과
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 배경 그라데이션 */}
      <div className="from-background via-background to-muted/20 absolute inset-0 bg-gradient-to-br" />

      {/* 배경 장식 요소 */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="bg-primary/5 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl" />
        <div className="bg-primary/10 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl" />
      </motion.div>

      {/* 메인 콘텐츠 */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        {/* 인사말 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground mb-4 text-lg"
        >
          안녕하세요, 저는
        </motion.p>

        {/* 이름 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="from-foreground via-foreground to-muted-foreground bg-gradient-to-r bg-clip-text text-transparent">
            웹 개발자
          </span>
        </motion.h1>

        {/* 직함/소개 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl md:text-2xl"
        >
          사용자 경험을 중심으로 생각하며,
          <br />
          아름답고 기능적인 웹 경험을 만듭니다.
        </motion.p>

        {/* CTA 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="min-w-[160px]">
            <Link href="#projects">프로젝트 보기</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[160px]">
            <Link href="#contact">연락하기</Link>
          </Button>
        </motion.div>

        {/* 소셜 링크 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            {
              icon: Linkedin,
              href: "https://linkedin.com",
              label: "LinkedIn",
            },
            { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-border bg-background/50 hover:border-primary hover:text-primary rounded-full border p-3 backdrop-blur-sm transition-colors"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted-foreground flex flex-col items-center gap-2"
        >
          <span className="text-sm">스크롤</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
