"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Building2 } from "lucide-react";

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1, 
          x: 0, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col justify-center items-center py-32 px-4 md:px-20 z-10">
      <div className="max-w-5xl w-full flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-black mb-20 uppercase tracking-tight text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            Trajectory
          </span>
        </h2>

        <div className="relative w-full">
          {/* Glowing central timeline path */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-800">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 shadow-[0_0_15px_#22d3ee]"
              style={{ height: pathHeight }}
            />
          </div>

          <div className="flex flex-col gap-24 relative z-10 w-full">
            {/* Experience Item 1 */}
            <div className="timeline-item flex items-center justify-between w-full">
              <div className="w-5/12 text-right pr-8">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Conprg Technologies (OPC)</h3>
                <p className="text-cyan-400 font-mono text-sm tracking-widest mb-4">Dec 2025 - Present</p>
                <div className="inline-flex px-3 py-1 rounded-full border border-teal-500/30 bg-teal-950/30 text-teal-300 text-xs tracking-wider mb-4 shadow-[0_0_10px_rgba(20,184,166,0.2)]">
                  Full Stack Developer Intern
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Developed backend functionalities for a Manpower Outsourcing System, optimizing query retrieval by 15–20% using PostgreSQL. Designed highly responsive React components (reducing interface load time by 20%) and built robust REST APIs with ASP.NET Core. Debugged and resolved 10+ core functional issues.
                </p>
              </div>
              <div className="w-16 h-16 shrink-0 rounded-full border-2 border-cyan-400 bg-slate-950 flex items-center justify-center relative z-20 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                <Briefcase size={24} className="text-cyan-400" />
              </div>
              <div className="w-5/12 pl-8"></div>
            </div>

            {/* Education Item */}
            <div className="timeline-item flex items-center justify-between w-full flex-row-reverse">
              <div className="w-5/12 text-left pl-8">
                <h3 className="text-2xl font-bold text-white mb-2">University College of Engineering</h3>
                <p className="text-purple-400 font-mono text-sm tracking-widest mb-4">Nov 2022 - Jun 2026</p>
                <div className="inline-flex px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-xs tracking-wider mb-4 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                  B.E. Computer Science
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Kanchipuram, Tamil Nadu. Maintained a strong academic record with an 8.4/10 CGPA. Gained comprehensive foundational knowledge in Data Structures, Object-Oriented Programming (OOP), Software Development Lifecycle (SDLC), Agile processes, and full-stack integration patterns.
                </p>
              </div>
              <div className="w-16 h-16 shrink-0 rounded-full border-2 border-purple-500 bg-slate-950 flex items-center justify-center relative z-20 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <GraduationCap size={24} className="text-purple-400" />
              </div>
              <div className="w-5/12 pr-8"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
