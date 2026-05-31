"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu } from "lucide-react";

// Helper function to render text and make markdown links clickable
const renderMessageContent = (content: string) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a
        key={match.index}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:underline font-semibold"
      >
        {linkText}
      </a>
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return parts.length > 0 ? parts : content;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello. I am Sharika AI. How can I assist you with information about Sharika Rajan's portfolio?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const query = input.toLowerCase();
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let response = "";

      // 1. SPECIFIC PROJECT NAMES
      if (query.includes("vexta") || query.includes("individualized education") || query.includes("iep") || query.includes("idp")) {
        response = "VEXTA is an AI-driven Personalized Individualized Development Program (IDP/IEP) generator designed to help educators create custom learning paths. This innovative project won the national Smart India Hackathon (SIH)!";
      } else if (query.includes("ticketing") || query.includes("ticket") || query.includes("nm hackathon")) {
        response = "The Microservices Event Ticketing System is a highly scalable, event-driven ticketing platform built with Java and Spring Boot. This system conquered the NM Hackathon!";
      } else if (query.includes("money manager") || query.includes("finance") || query.includes("budget")) {
        response = "The Money Manager App is a full-stack personal finance application with a responsive React dashboard, Node.js backend, and database integration for visual budget tracking and analytics.";
      } 
      // 2. HELP / CAPABILITIES
      else if (query.includes("help") || query.includes("command") || query.includes("menu") || query.includes("option") || query.includes("can you do")) {
        response = "I can help you navigate Sharika's portfolio! Feel free to ask about:\n\n• **Skills**: 'What is her tech stack?'\n• **Experience**: 'Tell me about her internship'\n• **Projects**: 'What has she built?' or details on 'VEXTA' / 'Event Ticketing'\n• **Hackathons**: 'What hackathons has she won?'\n• **Contact**: 'How can I contact her?'";
      }
      // 3. SPECIFIC TOPICS (Matched before general statements like "about her")
      else if (query.includes("skills") || query.includes("tech") || query.includes("languages") || query.includes("framework") || query.includes("stack") || query.includes("react") || query.includes("next") || query.includes("node") || query.includes("java") || query.includes("database") || query.includes("frontend") || query.includes("backend")) {
        response = "Sharika's technical expertise includes:\n\n• **Frontend**: React.js, Next.js, HTML5/CSS3, JavaScript, TypeScript\n• **Backend**: Node.js, Express, Java, Spring Boot\n• **Databases**: PostgreSQL, MySQL, MongoDB\n• **Architecture**: Microservices, REST APIs, System Design\n\nShe is passionate about clean code and performance optimization!";
      } else if (query.includes("project") || query.includes("portfolio") || query.includes("build") || query.includes("work")) {
        response = "Sharika's top projects include:\n\n1. **VEXTA** (AI-driven IDP Generator)\n2. **Microservices Event Ticketing System**\n3. **Money Manager App**\n\nAsk me about any of these to learn more, or type 'open projects' in the command terminal (Ctrl+K) to view them!";
      } else if (query.includes("experience") || query.includes("job") || query.includes("internship") || query.includes("conprg")) {
        response = "Sharika worked as a Full Stack Developer Intern at Conprg Technologies, where she:\n\n• Developed enterprise-level CRUD interfaces using React and Node.js.\n• Optimized complex SQL/NoSQL queries to improve application speed.\n• Design and integrated secure RESTful APIs.";
      } else if (query.includes("hackathon") || query.includes("award") || query.includes("win") || query.includes("winner") || query.includes("sih") || query.includes("smart india")) {
        response = "Sharika is a multi-hackathon winner!\n\n• **Smart India Hackathon (SIH) Winner**: Built VEXTA, a Personalized IDP Generator for student learning.\n• **NM Hackathon Winner**: Built a scalable Microservices Event Ticketing System.";
      } else if (query.includes("resume") || query.includes("cv") || query.includes("download")) {
        response = "To view Sharika's complete resume details, you can scroll to the About section or type 'show resume' in the terminal (Ctrl+K). For a copy of her CV, feel free to email her at shaarika.rajan@gmail.com.";
      } else if (query.includes("contact") || query.includes("email") || query.includes("mail") || query.includes("hire") || query.includes("reach out") || query.includes("github") || query.includes("linkedin") || query.includes("phone") || query.includes("social")) {
        response = "You can connect with Sharika at:\n\n• **Email**: shaarika.rajan@gmail.com\n• **LinkedIn**: [linkedin.com/in/sharika-rajan](https://www.linkedin.com/in/sharika-rajan/)\n• **GitHub**: [github.com/Sharikarajan07](https://github.com/Sharikarajan07)\n\nAlternatively, feel free to fill out the contact form at the bottom of the page!";
      }
      // 4. GENERAL IDENTITY / BOT INFO
      else if (query.includes("who are you") || query.includes("what are you") || query.includes("your name") || query.includes("sharika ai")) {
        response = "I am Sharika AI, a custom virtual assistant built to showcase Sharika Rajan's portfolio and professional credentials. Ask me anything about her skills, achievements, or projects!";
      }
      // 5. GENERAL PERSONA INFO (Bio / Overview - Matched after specific topics)
      else if (query.includes("who is she") || query.includes("who is sharika") || query.includes("about sharika") || query.includes("about her") || query.includes("tell me about sharika") || query.includes("bio") || query.includes("introduction")) {
        response = "Sharika Rajan is a Full Stack & AI Developer specializing in high-performance web applications, REST APIs, and microservices. She has a strong track record of winning hackathons and designing scalable systems. Would you like to check out her skills or her projects?";
      }
      // 6. GREETINGS
      else if (query.includes("hi") || query.includes("hello") || query.includes("hey") || query.includes("greetings") || query.includes("good morning") || query.includes("good afternoon")) {
        response = "Hello! I am Sharika AI, your virtual assistant for Sharika's portfolio. Ask me anything about her skills, projects, achievements, or contact info. What can I help you with?";
      }
      // 7. FALLBACK
      else {
        response = "I'm not sure I understand that query. I can help you with:\n\n• Sharika's skills and tech stack\n• Hackathon wins (SIH / NM Hackathon)\n• Project details (VEXTA, Event Ticketing, Money Manager)\n• Professional experience and internship\n• Contact and resume details\n\nWhat would you like to know?";
      }

      setMessages(prev => [...prev, { role: 'ai', content: response }]);
      setIsTyping(false);
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

            <div data-lenis-prevent className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-slate-950/40">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500/20 text-white border border-cyan-500/30 rounded-tr-none' 
                      : 'bg-slate-800 text-slate-300 border border-slate-700/50 rounded-tl-none'
                  }`}>
                    {renderMessageContent(msg.content)}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-300 border border-slate-700/50 rounded-lg rounded-tl-none p-3 max-w-[85%] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
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
