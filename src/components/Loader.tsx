"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = [
    "INITIALIZING AI CORE...",
    "ESTABLISHING NEURAL LINK...",
    "LOADING MERN STACK PROTOCOLS...",
    "COMPILING SPRING BOOT MICROSERVICES...",
    "ACCESSING CYBERNETIC ARCHIVES...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 600);

    const finishTimeout = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(finishTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-cyan-400 font-mono tracking-widest overflow-hidden"
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 pointer-events-none opacity-50"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12 relative flex items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 absolute border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]"
              style={{ transform: "rotate(45deg)" }}
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 absolute border border-purple-500/20 rounded-full"
            />
            <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 backdrop-blur-md flex items-center justify-center border border-white/10" style={{ transform: "rotate(45deg)" }}>
              <span className="text-white font-black text-xl flex items-center justify-center" style={{ transform: "rotate(-45deg)" }}>SR</span>
            </div>
          </motion.div>

          <div className="relative z-20 flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-light text-white mb-3 tracking-[0.4em] uppercase ml-4">
              SHARIKA<span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">.</span>
            </h1>
            
            <div className="flex items-center gap-4 mb-10 opacity-70">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-slate-500"></div>
              <p className="text-[9px] md:text-[10px] text-slate-300 font-medium tracking-[0.3em] uppercase w-72 text-center h-4 flex items-center justify-center">
                {loadingTexts[textIndex]}
              </p>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-slate-500"></div>
            </div>

            {/* Elegant thin progress line */}
            <div className="w-64 md:w-80 h-[2px] bg-slate-800/80 overflow-hidden relative rounded-full">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}