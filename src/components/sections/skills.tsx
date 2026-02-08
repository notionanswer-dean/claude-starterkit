"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

// 스킬 카테고리 정의
const skillCategories = [
  {
    title: "Frontend",
    description: "사용자 인터페이스 개발",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    title: "Backend",
    description: "서버 및 API 개발",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "MongoDB", level: 70 },
      { name: "REST API", level: 85 },
    ],
  },
  {
    title: "Tools",
    description: "개발 도구 및 협업",
    skills: [
      { name: "Git", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Figma", level: 70 },
      { name: "Docker", level: 65 },
      { name: "Vercel", level: 80 },
    ],
  },
];

// 프로그레스 바 컴포넌트
function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="bg-muted h-2 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="from-primary to-primary/60 h-full rounded-full bg-gradient-to-r"
        />
      </div>
    </div>
  );
}

/**
 * Skills 섹션 컴포넌트
 * 기술 스택과 숙련도를 시각화합니다.
 */
export function SkillsSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* 섹션 헤더 */}
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              기술 스택
            </h2>
            <div className="bg-primary mx-auto mb-4 h-1 w-20 rounded-full" />
            <p className="text-muted-foreground mx-auto max-w-2xl">
              다양한 기술을 활용하여 최적의 솔루션을 제공합니다.
            </p>
          </motion.div>

          {/* 스킬 카테고리 그리드 */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {skillCategories.map((category) => (
              <motion.div key={category.title} variants={staggerItem}>
                <Card className="border-border/50 h-full transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {category.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.skills.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                      />
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* 추가 기술 태그 */}
          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <h3 className="mb-4 text-lg font-semibold">기타 기술</h3>
            <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
              {[
                "HTML5",
                "CSS3",
                "JavaScript",
                "SASS",
                "Redux",
                "Zustand",
                "React Query",
                "Prisma",
                "GraphQL",
                "Jest",
                "Cypress",
                "Storybook",
                "AWS",
                "Firebase",
                "Linux",
              ].map((tech) => (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant="secondary"
                    className="hover:bg-primary/10 cursor-default px-3 py-1 text-sm transition-colors"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
