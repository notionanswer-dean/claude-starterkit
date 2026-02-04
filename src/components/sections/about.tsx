"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

// 강점 항목
const strengths = [
  {
    icon: Code2,
    title: "클린 코드",
    description: "읽기 쉽고 유지보수하기 좋은 코드를 작성합니다.",
  },
  {
    icon: Lightbulb,
    title: "문제 해결",
    description: "복잡한 문제를 단순하게 해결하는 것을 좋아합니다.",
  },
  {
    icon: Users,
    title: "협업",
    description: "팀원들과의 원활한 소통과 협업을 중요시합니다.",
  },
  {
    icon: Rocket,
    title: "성장",
    description: "새로운 기술을 배우고 적용하는 것을 즐깁니다.",
  },
];

/**
 * About 섹션 컴포넌트
 * 자기소개와 강점을 소개합니다.
 */
export function AboutSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="about" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          {/* 섹션 헤더 */}
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">소개</h2>
            <div className="bg-primary mx-auto h-1 w-20 rounded-full" />
          </motion.div>

          {/* 소개 텍스트 */}
          <motion.div
            variants={fadeInUp}
            className="mb-16 space-y-4 text-center"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              저는 사용자 중심의 웹 경험을 만드는 것에 열정을 가진 웹
              개발자입니다.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              최신 웹 기술을 활용하여 아름답고 기능적인 인터페이스를 구현하며,
              <br />
              성능 최적화와 접근성을 항상 고려합니다.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              새로운 도전을 통해 성장하고, 팀과 함께 더 나은 제품을 만들어가는
              것을 즐깁니다.
            </p>
          </motion.div>

          {/* 강점 카드 그리드 */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {strengths.map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <Card className="border-border/50 bg-background/50 h-full backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 text-primary rounded-lg p-3">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-lg font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
