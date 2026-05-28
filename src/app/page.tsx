"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene3D from '@/components/Scene3D';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import AchievementsSection from '@/components/AchievementsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import AIAssistant from '@/components/AIAssistant';
import Loader from '@/components/Loader';
import TerminalMode from '@/components/TerminalMode';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup GSAP globals if needed
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="relative w-full h-full min-h-screen z-10">
      <Loader />
      
      {/* 3D Background Canvas */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <Scene3D />
      </div>

      {/* Pages content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <AchievementsSection />
        <ProjectsSection />
        <ContactSection />
      </div>

      {/* AI Assistant Chatbot */}
      <AIAssistant />

      {/* Terminal Command Mode */}
      <TerminalMode />
    </main>
  );
}
