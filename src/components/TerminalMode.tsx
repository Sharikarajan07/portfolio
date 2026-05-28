"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export default function TerminalMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([
    "Sharika OS Terminal v1.0.0",
    "Type 'help' to see available commands.",
    "----------------------------------------"
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newOutput = [...output, `> ${input}`];

    if (cmd === "help") {
      newOutput.push("AVAILABLE COMMANDS:");
      newOutput.push("  open projects   - Scrolls to projects section");
      newOutput.push("  show resume     - Directs to resume/about section");
      newOutput.push("  contact sharika - Scrolls to contact section");
      newOutput.push("  hire sharika    - Initiates hiring protocol");
      newOutput.push("  clear           - Clears terminal output");
      newOutput.push("  exit            - Closes terminal");
    } else if (cmd === "clear") {
      setOutput([]);
      setInput("");
      return;
    } else if (cmd === "exit") {
      setIsOpen(false);
      setInput("");
      return;
    } else if (cmd === "open projects") {
      newOutput.push("Accessing holographic project chamber...");
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsOpen(false), 1000);
    } else if (cmd === "show resume") {
      newOutput.push("Loading professional capabilities...");
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsOpen(false), 1000);
    } else if (cmd === "contact sharika" || cmd === "hire sharika") {
      newOutput.push("Establishing secure comms channel...");
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsOpen(false), 1000);
    } else {
      newOutput.push(`Command not recognized: '${cmd}'. Type 'help' for available commands.`);
    }

    setOutput(newOutput);
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-cyan-500/50 rounded-xl w-full max-w-2xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
                <Terminal size={16} className="text-cyan-400 mr-2" />
                <span className="text-xs font-mono text-slate-300 tracking-widest">SHARIKA_OS_TERMINAL</span>
                <div className="ml-auto flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50 cursor-pointer hover:bg-red-500" onClick={() => setIsOpen(false)} />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>
              
              <div className="p-4 font-mono text-sm h-80 overflow-y-auto flex flex-col">
                {output.map((line, i) => (
                  <div key={i} className={`${line.startsWith(">") ? "text-white" : "text-cyan-400"} mb-1`}>
                    {line}
                  </div>
                ))}
                
                <form onSubmit={handleCommand} className="mt-2 flex items-center">
                  <span className="text-purple-400 mr-2">sh@rika:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white font-mono"
                    spellCheck={false}
                    autoComplete="off"
                  />
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Visual cue for the user */}
      <div className="fixed bottom-8 left-8 text-xs font-mono text-slate-500 tracking-widest z-50 pointer-events-none opacity-50 flex items-center gap-2">
        <Terminal size={14} />
        <span>CTRL+K TO OPEN TERMINAL</span>
      </div>
    </>
  );
}