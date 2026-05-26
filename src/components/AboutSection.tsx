"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Terminal, Database, Code2, Cpu } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      gsap.fromTo(
        cardsRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom center",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, []);

  const cards = [
    { icon: Terminal, title: "Frontend Engineering", desc: "Crafting highly responsive, user-centric interfaces using React.js, HTML, and CSS. Optimizing load times and delivering seamless UX." },
    { icon: Database, title: "Backend & APIs", desc: "Architecting scalable backend systems with Node.js, Express.js, and Java (Spring Boot). Designing robust RESTful services and microservices." },
    { icon: Cpu, title: "Data Architecture", desc: "Expertise in schema design and query optimization utilizing PostgreSQL and MongoDB to improve data retrieval performance." },
    { icon: Code2, title: "DevOps & Tools", desc: "Streamlining deployment pipelines with Docker, Git, CI/CD integrations, while following Agile and SDLC methodologies." },
  ];

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col justify-center items-center py-32 px-4 md:px-20 z-10" id="about">
      <div className="max-w-7xl w-full">
        <div className="mb-20 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
          
          <div className="relative group shrink-0">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-700/50 group-hover:border-cyan-500/50 transition-colors duration-500 relative z-10">
              <img 
                src="/profile-photo.jpg" 
                alt="Sharika Rajan" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80'; // fallback
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0"></div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                About Me
              </span>
            </h2>
            <p className="text-slate-400 max-w-3xl text-lg md:text-xl font-light leading-relaxed">
              I am a Full Stack Software Engineer and multi-hackathon winner with hands-on experience in MERN stack and Java (Spring Boot) development. Proficient in building scalable web applications, REST APIs, and data-driven systems, with a strong foundation in data structures and object-oriented programming. Eager to engineer real-world solutions that maximize impact and efficiency.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {cards.map((card, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="holo-card p-8 group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 text-cyan-400 group-hover:text-purple-400 group-hover:border-purple-500/50 transition-colors duration-500 shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <card.icon size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
