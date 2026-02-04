/**
 * 포트폴리오 사이트 타입 정의
 */

// 네비게이션 아이템
export interface NavItem {
  label: string;
  href: string;
}

// 소셜 링크
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// 프로젝트 정보
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

// 스킬 정보
export interface Skill {
  name: string;
  level: number; // 1-100
  category: "frontend" | "backend" | "tools" | "other";
  icon?: string;
}

// 경력/경험 정보
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements?: string[];
}

// 연락처 폼 데이터
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// 사이트 설정
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}
