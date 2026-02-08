"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import type { NavItem } from "@/types";

// 네비게이션 메뉴 아이템
const navItems: NavItem[] = [
  { label: "홈", href: "/#hero" },
  { label: "소개", href: "/about" },
  { label: "기술", href: "/#skills" },
  { label: "프로젝트", href: "/#projects" },
  { label: "연락처", href: "/#contact" },
];

/**
 * 헤더 컴포넌트
 * 반응형 네비게이션 메뉴와 테마 토글을 포함합니다.
 */
export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // 스크롤 감지하여 헤더 스타일 변경
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 border-border border-b shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="text-xl font-bold">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent"
          >
            Portfolio
          </motion.span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-4 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <ThemeToggle />
        </div>

        {/* 모바일 메뉴 */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground py-2 text-lg font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
