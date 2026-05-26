"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
      );
    }
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.6 }
      );
    }
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80 pointer-events-none" />
      
      <motion.div
        className="z-10 text-center flex flex-col items-center gap-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="inline-block py-1 px-3 rounded-full border border-cyan-400/50 bg-cyan-950/30 text-cyan-300 text-sm font-medium tracking-widest backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          // SYSTEM INITIALIZED
        </div>
        
        <h1 
          ref={titleRef} 
          className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 block drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] relative z-10">
            SHARIKA
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 block drop-shadow-[0_0_30px_rgba(34,211,238,0.6)] relative z-10">
            RAJAN
          </span>
        </h1>
        
        <p 
          ref={subtitleRef} 
          className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mt-4"
        >
          Full Stack Software Engineer <span className="text-white font-medium">| MERN & Java (Spring Boot)</span>
        </p>
        
        <div className="mt-12 flex gap-6">
          <motion.a 
            href="#projects"
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-lg font-bold tracking-wider text-sm neon-border"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-cyan-400 group-hover:text-slate-950 transition-colors duration-300">EXPLORE WORK</span>
            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </motion.a>
          
          <motion.a 
            href="https://github.com/Sharikarajan07"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-slate-900/50 backdrop-blur-md rounded-lg font-bold tracking-wider text-sm border border-slate-700 hover:border-purple-500 hover:text-purple-400 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GITHUB PROFILE
          </motion.a>
        </div>
      </motion.div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs tracking-widest uppercase">Scroll Sequencer</span>
        <motion.div 
          className="w-[1px] h-16 bg-gradient-to-b from-cyan-400 to-transparent"
          animate={{ height: ["0rem", "4rem", "0rem"], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
