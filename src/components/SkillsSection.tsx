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
    { name: "HTML", level: 95, color: "from-orange-500 to-red-500" },
    { name: "CSS", level: 90, color: "from-blue-400 to-cyan-400" },
    { name: "AI/ML", level: 85, color: "from-teal-400 to-emerald-500" },
    { name: "Data Analysis", level: 82, color: "from-indigo-400 to-purple-500" },
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
    <section id="skills" ref={containerRef} className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-4 md:px-20 z-10">
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

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative h-[400px] perspective-1000">
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white text-center mb-8 absolute top-0">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Areas of Interest
            </span>
          </h3>
          
          <div className="relative w-full h-full flex items-center justify-center mt-12">
            {/* Ambient Background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl scale-150" />
            
            <div className="flex flex-wrap justify-center gap-4 relative z-20 w-[110%] max-w-lg">
              {["MERN Stack", "Java", "Artificial Intelligence", "Machine Learning", "DevOps"].map((interest, i) => {
                // Determine a slight offset or unique animation per item
                const yOffset = i % 2 === 0 ? [0, -10, 0] : [0, 10, 0];
                return (
                  <motion.div
                    key={i}
                    animate={{ y: yOffset }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    whileHover={{ scale: 1.1, zIndex: 30 }}
                    className="backdrop-blur-xl bg-slate-900/60 border border-slate-700/60 hover:border-cyan-400 p-4 rounded-xl text-center shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all cursor-pointer group"
                  >
                    <span className="text-cyan-300 font-bold tracking-widest uppercase text-xs md:text-sm group-hover:text-white transition-colors block">
                      {interest}
                    </span>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Techy rotating rings behind the tags */}
            <motion.div 
               className="absolute w-full h-full max-w-[350px] max-h-[350px] border border-cyan-500/20 rounded-full border-dashed z-0"
               animate={{ rotate: 360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             />
             <motion.div 
               className="absolute w-[80%] h-[80%] max-w-[280px] max-h-[280px] border-2 border-purple-500/20 rounded-full border-dotted z-0"
               animate={{ rotate: -360 }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             />
          </div>
        </div>
      </div>
    </section>
  );
}
