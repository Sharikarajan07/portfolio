"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Smooth spring for 3D tilt
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // Transform values for text tilt
  const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);
  
  // Transform values for background parallax
  const bgX = useTransform(smoothX, [0, 1], ["-2%", "2%"]);
  const bgY = useTransform(smoothY, [0, 1], ["-2%", "2%"]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
    setMousePosition({ x: clientX, y: clientY });
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set(".hero-text", { opacity: 0, scale: 1.2, filter: "blur(10px)", z: -500 });
    gsap.set(".hero-bg-ring", { opacity: 0, scale: 0.5, rotateX: 60 });
    gsap.set(".hero-flare", { opacity: 0, scale: 0 });
    
    tl.to(".hero-bg-ring", { opacity: 0.3, scale: 1, duration: 2.5, ease: "power3.out", stagger: 0.2 }, 0.5);
    tl.to(".hero-text", { opacity: 1, scale: 1, filter: "blur(0px)", z: 0, duration: 2.5, ease: "expo.out", stagger: 0.15 }, 0.8);
    tl.to(".hero-flare", { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }, 1.2);
    
    setIsMounted(true);
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent"
      style={{ perspective: 1200 }}
    >
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        className="fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-5 flex justify-between items-center backdrop-blur-md bg-slate-950/50 border-b border-white/5"
      >
        <div className="font-black text-2xl tracking-widest text-white">SR<span className="text-cyan-400">.</span></div>
        <div className="hidden md:flex gap-10 text-xs font-semibold tracking-[0.2em] uppercase text-slate-300">
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </div>
        <motion.a 
          href="/resume.pdf"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all"
        >
          Resume
        </motion.a>
      </motion.nav>

      {/* Film Grain overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]"></div>
      
      {/* Cursor Glow */}
      <div 
        className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 to-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen transition-all duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`
        }}
      />

      {/* Cinematic Background */}
      <motion.div 
        className="absolute inset-[-5%] w-[110%] h-[110%] z-0"
        style={{ x: bgX, y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,rgba(5,8,22,0)_80%)] z-10" />
        
        {/* Floating Stars */}
        {isMounted && [...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>

      {/* Holographic Background Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 perspective-1000">
        <motion.div 
          className="hero-bg-ring absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] border border-cyan-500/10 rounded-full border-dashed"
          animate={{ rotateZ: 360, rotateX: 60, rotateY: 10 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="hero-bg-ring absolute w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] border-2 border-purple-500/10 rounded-full border-solid shadow-[0_0_50px_rgba(168,85,247,0.1)]"
          animate={{ rotateZ: -360, rotateX: 55, rotateY: -10 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="hero-bg-ring absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] border border-blue-400/20 rounded-full border-dotted"
          animate={{ rotateZ: 360, rotateX: 50, rotateY: 5 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Center Cinematic Flares */}
      <div className="hero-flare absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[20vh] bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
      <div className="hero-flare absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[10vh] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      {/* Main Centered Content */}
       <div className="z-10 flex flex-col items-center justify-center w-full transform-style-3d mt-20"
         style={{ transformStyle: 'preserve-3d', perspective: 1200 }}>
        
        {/* 3D Typography */}
        <motion.div 
          className="relative text-center transform-style-3d cursor-default"
          style={{ rotateX, rotateY }}
        >
          <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

          <h1 className="hero-text text-[12vw] md:text-[140px] font-black leading-[0.85] tracking-tighter uppercase relative select-none">
            <span 
              className="block relative text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-[0_10px_20px_rgba(255,255,255,0.2)]"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
            >
              SHARIKA
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-transparent to-slate-900 drop-shadow-none translate-y-3 -z-10 mix-blend-overlay">SHARIKA</span>
            </span>
          </h1>

          <h1 className="hero-text text-[12vw] md:text-[140px] font-black leading-[0.85] tracking-tighter uppercase relative select-none mt-2">
            <span 
              className="block relative text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300 drop-shadow-[0_0_40px_rgba(34,211,238,0.3)]"
            >
              RAJAN
              <span className="absolute inset-0 bg-gradient-to-r from-blue-300 via-transparent to-indigo-300 opacity-40 blur-[20px] mix-blend-screen">RAJAN</span>
            </span>
          </h1>
        </motion.div>

        {/* Roles Subtitle */}
        <motion.div className="hero-text mt-8 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-200">
            Software Engineer <span className="text-cyan-400 mx-2">|</span> Full Stack Developer <span className="text-cyan-400 mx-2">|</span> AI Enthusiast
          </p>
        </motion.div>

        {/* The Three Lines */}
        <motion.p 
          className="hero-text text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl text-center leading-relaxed mt-8 font-light px-6"
        >
          I build immersive AI-powered applications, scalable full stack systems, and futuristic digital experiences using <span className="text-cyan-400 font-medium">MERN Stack</span>, <span className="text-purple-400 font-medium">Java Spring Boot</span>, Machine Learning, and modern web technologies.
        </motion.p>

        {/* Buttons */}
        <div className="hero-text mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-6 text-center">
          <motion.a 
            href="#projects"
            className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-md font-bold tracking-[0.2em] text-xs uppercase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border border-cyan-500/50 group-hover:border-cyan-400 transition-colors duration-500" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_#00e5ff]" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="relative z-10 text-cyan-300 group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
              EXPLORE WORK
            </span>
          </motion.a>
          
          <motion.a 
            href="https://github.com/Sharikarajan07"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-4 bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/10 overflow-hidden rounded-md font-bold tracking-[0.2em] text-xs uppercase text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:animate-[shimmer_1.5s_infinite] group-hover:opacity-100" />
            
            <span className="relative z-10 text-slate-300 group-hover:text-white transition-colors duration-500">
              GITHUB
            </span>
          </motion.a>

          <motion.a 
            href="https://www.linkedin.com/in/sharika-rajan"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-4 bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/10 overflow-hidden rounded-md font-bold tracking-[0.2em] text-xs uppercase text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:animate-[shimmer_1.5s_infinite] group-hover:opacity-100" />
            
            <span className="relative z-10 text-slate-300 group-hover:text-white transition-colors duration-500">
              LINKEDIN
            </span>
          </motion.a>
        </div>
      </div>
      
      {/* Scroll Sequencer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 z-20 pointer-events-none">
        <span className="text-[9px] tracking-[0.3em] font-mono text-cyan-400 capitalize">Scroll Sequencer</span>
        <motion.div 
          className="w-[1px] h-16 bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent"
          animate={{ height: ["0rem", "4rem", "0rem"], opacity: [0, 1, 0], y: [0, 10, 20] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}
