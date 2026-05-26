"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu } from "lucide-react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello. I am Sharika AI. How can I assist you with information about Sharika Rajan's portfolio?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const query = input.toLowerCase();
    setInput("");

    setTimeout(() => {
      let response = "I am a simulated AI. I can tell you that Sharika is an incredible Full Stack & AI developer. Reach out through the contact form for a meeting!";
      
      if (query.includes("skills") || query.includes("tech")) {
        response = "Sharika specializes in React.js, Next.js, Node.js, Express, and Java (Spring Boot). She architects high-performance systems, REST APIs, and microservices.";
      } else if (query.includes("hackathon") || query.includes("award") || query.includes("win")) {
        response = "Sharika is a multi-hackathon winner! She won Smart India Hackathon (SIH) for her Personalized IDP Generator, and she also conquered the NM Hackathon by building a Microservices Event Ticketing System.";
      } else if (query.includes("experience") || query.includes("work") || query.includes("internship")) {
        response = "She has hands-on experience as a Full Stack Developer Intern at Conprg Technologies, where she built enterprise-level CRUD interfaces and optimized database queries.";
      } else if (query.includes("education") || query.includes("university") || query.includes("college")) {
        response = "Sharika has a strong academic foundation with expertise in Data Structures, Object-Oriented Programming, and Database Management.";
      } else if (query.includes("contact") || query.includes("email")) {
        response = "You can reach Sharika directly at shaarika.rajan@gmail.com, or through the 'Initiate Contact' form at the bottom of the page!";
      } else if (query.includes("project")) {
        response = "Her selected works include VEXTA (an AI-driven IDP generator), a Money Manager App, and a Microservices-based Event Ticketing System.";
      }

      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 1000);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-slate-900 border border-cyan-400 text-cyan-400 flex items-center justify-center z-50 hover:bg-cyan-900/50 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)] neon-border"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-[350px] h-[500px] glass-panel border border-slate-700 rounded-2xl overflow-hidden z-50 flex flex-col shadow-2xl"
          >
            <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <div className="flex items-center gap-3 text-cyan-400">
                <Cpu size={20} />
                <span className="font-bold tracking-widest text-sm uppercase">Sharika AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-slate-950/40">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500/20 text-white border border-cyan-500/30 rounded-tr-none' 
                      : 'bg-slate-800 text-slate-300 border border-slate-700/50 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-900/80 border-t border-slate-800">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Sharika AI..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-4 pr-12 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 p-2 text-cyan-400 hover:text-white transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
