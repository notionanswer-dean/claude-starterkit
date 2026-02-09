"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import type { Project } from "@/types";

// 프로젝트 카드 컴포넌트
function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/projects/${project.id}`}>
        <Card className="group border-border/50 bg-background/50 h-full overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          {/* 프로젝트 이미지 */}
          <div className="bg-muted relative h-48 overflow-hidden">
            <div className="from-background/80 absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
            <div className="text-muted-foreground absolute inset-0 flex items-center justify-center">
              <span className="text-sm">Project Image</span>
            </div>
            {/* 호버 시 오버레이 */}
            <div className="bg-primary/80 absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} 데모 보기`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-background text-foreground rounded-full p-3"
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub 저장소`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-background text-foreground rounded-full p-3"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              )}
            </div>
          </div>

          <CardContent className="p-6">
            {/* Featured 배지 */}
            {project.featured && (
              <Badge className="mb-3" variant="default">
                Featured
              </Badge>
            )}

            {/* 프로젝트 제목 */}
            <h3 className="group-hover:text-primary mb-2 text-xl font-semibold transition-colors">
              {project.title}
            </h3>

            {/* 프로젝트 설명 */}
            <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
              {project.description}
            </p>

            {/* 기술 태그 */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

interface ProjectsSectionProps {
  projects: Project[];
}

/**
 * Projects 섹션 컴포넌트
 * 프로젝트 포트폴리오를 그리드 형태로 표시합니다.
 */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="projects" className="bg-muted/30 py-24">
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
              프로젝트
            </h2>
            <div className="bg-primary mx-auto mb-4 h-1 w-20 rounded-full" />
            <p className="text-muted-foreground mx-auto max-w-2xl">
              실제로 구현한 프로젝트들입니다. 각 프로젝트를 클릭하여 자세히
              확인해보세요.
            </p>
          </motion.div>

          {/* 프로젝트 그리드 */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

          {/* 더보기 버튼 */}
          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub에서 더보기
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
