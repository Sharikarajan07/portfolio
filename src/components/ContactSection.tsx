"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-4 md:px-20 z-10 border-t border-slate-800/50">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 to-transparent pointer-events-none" />

      <div className="max-w-4xl w-full text-center mb-16 relative">
        <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Initiate Contact
          </span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl font-light">
          Open to new opportunities, collaborations, and architectural challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl relative z-10">
        
        <div className="flex flex-col gap-6">
          <a href="mailto:shaarika.rajan@gmail.com" className="group holo-card p-6 flex items-center gap-6 hover:bg-white/5 transition-colors duration-300">
            <div className="p-4 rounded-xl bg-cyan-950/50 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-colors duration-300">
              <Mail size={24} />
            </div>
            <div className="text-left">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Email</p>
              <p className="text-white font-medium">shaarika.rajan@gmail.com</p>
            </div>
          </a>

          <a href="https://github.com/Sharikarajan07" target="_blank" rel="noopener noreferrer" className="group holo-card p-6 flex items-center gap-6 hover:bg-white/5 transition-colors duration-300">
            <div className="p-4 rounded-xl bg-purple-950/50 text-purple-400 group-hover:bg-purple-400 group-hover:text-black transition-colors duration-300">
              <FaGithub size={24} />
            </div>
            <div className="text-left">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">GitHub</p>
              <p className="text-white font-medium">Sharikarajan07</p>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/sharika-rajan" target="_blank" rel="noopener noreferrer" className="group holo-card p-6 flex items-center gap-6 hover:bg-white/5 transition-colors duration-300">
            <div className="p-4 rounded-xl bg-blue-950/50 text-blue-400 group-hover:bg-blue-400 group-hover:text-black transition-colors duration-300">
              <FaLinkedin size={24} />
            </div>
            <div className="text-left">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">LinkedIn</p>
              <p className="text-white font-medium">sharika-rajan</p>
            </div>
          </a>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const name = formData.get("name");
          const email = formData.get("email");
          const message = formData.get("message");
          const mailtoLink = `mailto:shaarika.rajan@gmail.com?subject=Portfolio Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
          window.location.href = mailtoLink;
        }} className="glass-panel p-8 rounded-2xl flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs uppercase tracking-widest text-slate-400 font-medium">Name</label>
            <input type="text" id="name" name="name" required className="bg-slate-900/50 border border-slate-700 p-3 rounded-lg text-white outline-none focus:border-cyan-400 transition-colors" placeholder="Enter your name" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-slate-400 font-medium">Email</label>
            <input type="email" id="email" name="email" required className="bg-slate-900/50 border border-slate-700 p-3 rounded-lg text-white outline-none focus:border-cyan-400 transition-colors" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs uppercase tracking-widest text-slate-400 font-medium">Message</label>
            <textarea id="message" name="message" required rows={4} className="bg-slate-900/50 border border-slate-700 p-3 rounded-lg text-white outline-none focus:border-cyan-400 transition-colors resize-none" placeholder="Transmit your message..."></textarea>
          </div>
          <button type="submit" className="group mt-4 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2">
            <span>Transmit</span>
            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
      
      <footer className="w-full text-center mt-32 text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Sharika Rajan. All systems nominal.</p>
      </footer>
    </section>
  );
}
