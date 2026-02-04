"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// 소셜 링크 (실제 사용 시 수정 필요)
const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "Email", href: "mailto:hello@example.com", icon: Mail },
];

/**
 * 푸터 컴포넌트
 * 소셜 링크와 저작권 정보를 표시합니다.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-border border-t">
      <div className="container mx-auto px-4 py-12">
        {/* 소셜 링크 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center gap-4"
        >
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background border-border hover:border-primary hover:text-primary rounded-full border p-3 transition-all duration-300"
              aria-label={link.name}
            >
              <link.icon className="h-5 w-5" />
            </Link>
          ))}
        </motion.div>

        <Separator className="mb-8" />

        {/* 저작권 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-center text-sm"
        >
          <p>
            &copy; {currentYear}{" "}
            <span className="text-foreground font-medium">Portfolio</span>. All
            rights reserved.
          </p>
          <p className="mt-2">
            Built with{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Next.js
            </Link>
            ,{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              shadcn/ui
            </Link>
            , and{" "}
            <Link
              href="https://www.framer.com/motion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Framer Motion
            </Link>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
