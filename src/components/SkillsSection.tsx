"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const skills = [
    { name: "Java (Spring Boot)", level: 95, color: "from-blue-400 to-indigo-500" },
    { name: "React.js / Frontend", level: 92, color: "from-cyan-400 to-blue-500" },
    { name: "Node.js / Express", level: 90, color: "from-green-400 to-emerald-600" },
    { name: "PostgreSQL / MongoDB", level: 88, color: "from-purple-400 to-pink-500" },
    { name: "JavaScript", level: 95, color: "from-yellow-400 to-orange-500" },
    { name: "Docker & CI/CD", level: 85, color: "from-rose-400 to-red-500" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const bars = document.querySelectorAll('.skill-bar-fill');
    
    gsap.fromTo(bars, 
      { width: 0 },
      {
        width: (i, target) => `${target.dataset.level}%`,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-4 md:px-20 z-10">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-16 items-center">
        
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Tech Matrix
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            My neural connections to modern technologies. Constant learning protocol is active.
          </p>
          
          <div className="flex flex-col gap-8 mt-8">
            {skills.map((skill, index) => (
              <div key={index} className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium tracking-wide uppercase text-sm">{skill.name}</span>
                  <span className="text-cyan-400 font-mono text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div 
                    className={`skill-bar-fill h-full bg-gradient-to-r ${skill.color} relative`}
                    data-level={skill.level}
                    style={{ width: '0%' }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-[2px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center relative h-[400px]">
           {/* Abstract rotating elements representing skills */}
           <motion.div 
             className="absolute w-64 h-64 border border-cyan-500/30 rounded-full border-dashed"
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           />
           <motion.div 
             className="absolute w-48 h-48 border-2 border-purple-500/40 rounded-full border-dotted"
             animate={{ rotate: -360 }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           />
           <motion.div 
             className="absolute w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center neon-border"
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           >
             <span className="text-white font-bold tracking-widest text-sm">CORE</span>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
