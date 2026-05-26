"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const achievements = [
  {
    title: "Smart India Hackathon Winner",
    description: "Secured top honor at the prestigious national-level hackathon with VEXTA AI, delivering a highly optimized and 80% faster document processing solution.",
    icon: Trophy,
    color: "from-yellow-400 to-amber-600",
    shadow: "shadow-[0_0_30px_rgba(251,191,36,0.15)]"
  },
  {
    title: "Naan Mudhalvan Hackathon Winner",
    description: "Emerged victorious by architecting a highly scalable Event Ticketing System capable of handling real-time booking for thousands of concurrent users effortlessly.",
    icon: Award,
    color: "from-purple-400 to-fuchsia-600",
    shadow: "shadow-[0_0_30px_rgba(192,38,211,0.15)]"
  },
  {
    title: "Odoo Hackathon 2026 Finalist",
    description: "Reached the final stage of the rigorous Odoo Hackathon 2026, demonstrating exceptional problem-solving and full-stack development skills under immense pressure.",
    icon: Trophy,
    color: "from-blue-400 to-cyan-600",
    shadow: "shadow-[0_0_30px_rgba(34,211,238,0.15)]"
  },
  {
    title: "NPTEL Java Elite (95%)",
    description: "Achieved the prestigious Elite certification (95% score) in Programming in Java by NPTEL, highlighting deep expertise in Java data structures and object-oriented paradigms.",
    icon: Award,
    color: "from-emerald-400 to-teal-600",
    shadow: "shadow-[0_0_30px_rgba(52,211,153,0.15)]"
  }
];

export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current) {
      gsap.fromTo(
        cardsRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.25,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[70vh] py-20 px-4 md:px-20 z-10 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl w-full flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-black mb-20 text-center uppercase tracking-tighter">
          <span className="text-white">Hall of</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Achievements</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {achievements.map((achievement, idx) => (
            <div 
              key={idx}
              ref={el => { cardsRef.current[idx] = el; }}
              className={`relative p-[1px] rounded-2xl overflow-hidden group bg-gradient-to-br ${achievement.color} opacity-0 hover:scale-[1.02] transition-transform duration-500`}
            >
              <div className="absolute inset-0 opacity-30 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
              
              <div className={`relative h-full glass-panel bg-slate-950/90 p-8 rounded-2xl flex flex-col items-start gap-4 ${achievement.shadow} group-hover:bg-slate-900/90 transition-colors duration-500 overflow-hidden`}>
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${achievement.color} bg-opacity-20 flex items-center justify-center border border-white/10 mb-2`}>
                    <achievement.icon size={36} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                      {achievement.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-base font-light">
                      {achievement.description}
                    </p>
                  </div>
                </div>
                
                {/* Futuristic background glares */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-[2] transition-transform duration-1000 ease-out" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-[1.5] transition-transform duration-1000 ease-out delay-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
