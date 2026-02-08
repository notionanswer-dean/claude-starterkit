import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
} from "@/components/sections";
import { getCachedProjects } from "@/lib/notion-projects";

export default async function Home() {
  const projects = await getCachedProjects();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
    </>
  );
}
