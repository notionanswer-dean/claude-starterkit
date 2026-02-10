"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Project } from "@/types";

interface ProjectDetailContentProps {
  project: Project;
  children: React.ReactNode; // Notion 블록 렌더러 (Server Component)
}

export function ProjectDetailContent({
  project,
  children,
}: ProjectDetailContentProps) {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* 뒤로가기 */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/#projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                프로젝트 목록으로
              </Link>
            </Button>
          </motion.div>

          {/* 프로젝트 헤더 */}
          <motion.div variants={fadeInUp} className="mb-8">
            {project.featured && (
              <Badge className="mb-3" variant="default">
                Featured
              </Badge>
            )}
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {project.description}
            </p>
          </motion.div>

          {/* 기술 태그 + 링크 */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 flex flex-wrap items-center gap-3"
          >
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            <div className="ml-auto flex gap-2">
              {project.demoUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    데모
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          <motion.hr variants={fadeInUp} className="border-border mb-8" />

          {/* Notion 본문 */}
          <motion.div variants={fadeInUp}>{children}</motion.div>
        </motion.div>
      </div>
    </div>
  );
}
