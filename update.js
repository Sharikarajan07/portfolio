const fs = require('fs');

const content = `"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const categories = ["All", "AI/ML", "Frontend", "Fullstack", "Blockchain", "PowerBI", "Data Analysis"];

const allProjects = [
  {
    title: "Event Ticketing & Registration",
    description: "Architected a microservices-based event booking platform with independently deployable services. Built Spring Boot REST APIs with PostgreSQL.",
    tech: ["Spring Boot", "Microservices", "PostgreSQL"],
    link: "#",
    github: "https://github.com/Sharikarajan07/NM_Hackathon_Level2.git",
    color: "from-purple-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    category: "Fullstack"
  },
  {
    title: "VEXTA – Personalized IDP Generator",
    description: "Architected an AI-driven platform to generate individual development plans from employee skill data. Designed scalable backend APIs with RBAC for secure access.",
    tech: ["AI Integration", "REST API", "RBAC", "Next.js"],
    link: "#",
    github: "https://github.com/VEXTA-SIH/Vexta_UI.git",
    color: "from-cyan-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "AI/ML"
  },
  {
    title: "Money Manager App",
    description: "A full-stack personal finance tracker with real-time income/expense logging, enabling users to effortlessly monitor cash flow backed by MongoDB.",
    tech: ["React.js", "Node.js", "MongoDB", "Express"],
    link: "https://money-manager-frontend-sigma-ten.vercel.app/",
    github: "https://github.com/Sharikarajan07/money-manager-frontend.git",
    color: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    category: "Fullstack"
  },
  {
    title: "Event Ticketing DApp",
    description: "A decentralized application built on blockchain networks to securely issue, verify, and trade event tickets without intermediaries.",
    tech: ["Solidity", "Web3.js", "Smart Contracts"],
    link: "#",
    github: "https://github.com/Sharikarajan07/Event-Ticketing-Dapp.git",
    color: "from-indigo-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    category: "Blockchain"
  },
  {
    title: "Globe Trotter",
    description: "An interactive travel application offering deep insights and immersive navigation across various destinations worldwide.",
    tech: ["React.js", "Frontend UI", "API Integration"],
    link: "https://odoo-xsns.vercel.app/",
    github: "https://github.com/Sharikarajan07/OdooXSNS.git",
    color: "from-pink-500 to-rose-600",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    category: "Frontend"
  },
  {
    title: "Chennai Artisanal DApp",
    description: "A specialized blockchain application aiming to provide proper compensation matrices and decentralized storefronts for artisans in Chennai.",
    tech: ["Ethereum", "Web3", "React"],
    link: "#",
    github: "https://github.com/Sharikarajan07/Chennai-Artisanal-Dapp.git",
    color: "from-green-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    category: "Blockchain"
  },
  {
    title: "Indian Constituency Dashboard",
    description: "A highly interactive PowerBI dashboard visualizing large datasets relating to Indian electoral constituencies with precision analytics.",
    tech: ["PowerBI", "Data Visualization", "Analytics"],
    link: "#",
    github: "https://github.com/Sharikarajan07/Indian-Constituency-PowerBI-Dashboard.git",
    color: "from-yellow-500 to-yellow-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "PowerBI"
  },
  {
    title: "Machine Learning Climate Risk",
    description: "An advanced AI-powered system leveraging machine models to forecast climate anomalies and streamline disaster response strategies.",
    tech: ["Machine Learning", "Python", "Data Forecasting"],
    link: "#",
    github: "https://github.com/Sharikarajan07/AICTE_Cycle_Climate_Risk_Disaster_Management.git",
    color: "from-red-500 to-rose-700",
    image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80",
    category: "AI/ML"
  },
  {
    title: "Moving Object Detection",
    description: "A real-time computer vision system capable of identifying and tracking mobile objects across video frames utilizing advanced neural networks.",
    tech: ["OpenCV", "Python", "Neural Networks"],
    link: "#",
    github: "https://github.com/Sharikarajan07/Moving-Object-Detection.git",
    color: "from-slate-400 to-slate-600",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&q=80",
    category: "AI/ML"
  },
  {
    title: "Global Terrorism Analysis",
    description: "An intricate data analysis project processing historical global terrorism datasets to identify trends, geographical hotspots, and key metrics.",
    tech: ["Python", "Pandas", "Matplotlib"],
    link: "#",
    github: "https://github.com/Sharikarajan07/Python-Data-Analysis-.git",
    color: "from-orange-500 to-red-600",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    category: "Data Analysis"
  },
  {
    title: "Dynamic Weather Dashboard",
    description: "A sleek, dynamic weather tracking dashboard pulling real-time meteorological data with predictive graphical representations.",
    tech: ["JavaScript", "Weather API", "CSS"],
    link: "#",
    github: "https://github.com/Sharikarajan07/Dynamic_Weather_Dashboard.git",
    color: "from-cyan-400 to-sky-500",
    image: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&q=80",
    category: "Frontend"
  },
  {
    title: "To Do List App",
    description: "A highly responsive and minimal task management application featuring local storage synchronization and smooth UI transitions.",
    tech: ["React.js", "State Management", "Tailwind CSS"],
    link: "#",
    github: "https://github.com/Sharikarajan07/To-dolistapp.git",
    color: "from-yellow-400 to-orange-500",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    category: "Frontend"
  },
  {
    title: "AI ChatBot",
    description: "An intelligent autonomous chat application parsing user input via Natural Language Processing pipelines to provide relevant human-like responses.",
    tech: ["NLP", "Python", "Machine Learning"],
    link: "#",
    github: "https://github.com/Sharikarajan07/AI-ChatBot.git",
    color: "from-cyan-400 to-blue-500",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    category: "AI/ML"
  },
  {
    title: "AI Assistant",
    description: "A comprehensive voice- or text-driven digital assistant capable of task automation, system querying, and adaptive conversational logic.",
    tech: ["AI Patterns", "Automation", "Python"],
    link: "#",
    github: "https://github.com/Sharikarajan07/AI-Assistant.git",
    color: "from-fuchsia-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    category: "AI/ML"
  },
  {
    title: "PhishCatcher",
    description: "Security and Machine Learning project for real-time phishing detection and prevention.",
    tech: ["Python", "Scikit-learn", "Flask"],
    link: "#",
    github: "https://github.com/Sharikarajan07",
    color: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    category: "AI/ML"
  },
  {
    title: "Communication App",
    description: "Real-Time instant messaging architecture seamlessly connecting users.",
    tech: ["React", "Socket.io", "Node.js"],
    link: "#",
    github: "https://github.com/Sharikarajan07",
    color: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    category: "Fullstack"
  },
  {
    title: "LearnSphere",
    description: "An expanding educational platform designed for interactive learning and streamlined course management.",
    tech: ["Full-Stack", "Web Technologies"],
    link: "#",
    github: "https://github.com/Sharikarajan07/Learnsphere.git",
    color: "from-violet-500 to-fuchsia-600",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    category: "Fullstack"
  }
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = allProjects.filter(p => activeCategory === "All" || p.category === activeCategory);
  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const maxReached = visibleCount >= filteredProjects.length;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6); // Reset count on category change
  };

  return (
    <section id="projects" ref={containerRef} className="relative w-full min-h-screen py-32 px-4 md:px-20 z-10 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-black mb-8 text-center uppercase tracking-tighter">
          <span className="text-white">Selected</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Works</span>
        </h2>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={\`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border \${activeCategory === cat ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'}\`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={project.title}
              className="relative group rounded-2xl overflow-hidden glass-panel border border-slate-700/50 hover:border-cyan-500/50 transition-colors duration-500 h-[480px] flex flex-col"
            >
              {/* Project Image */}
              <div className="h-48 w-full shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out" 
                />
                <div className={\`absolute inset-0 bg-gradient-to-br \${project.color} opacity-30 mix-blend-overlay z-10\`} />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold tracking-wider text-white">
                  {project.category}
                </div>
              </div>

              <div className="p-8 pb-20 relative z-10 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-6 line-clamp-3 text-sm flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-800/80 rounded-md text-[10px] uppercase font-mono text-cyan-300 border border-slate-700/50">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 absolute bottom-6 right-6">
                  <a href={project.github !== "#" ? project.github : "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 text-white hover:bg-white hover:text-black transition-colors duration-300">
                    <FaGithub size={18} />
                  </a>
                  {project.link !== "#" && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 text-white hover:bg-cyan-400 hover:text-black transition-colors duration-300">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        {!maxReached && (
          <motion.div layout className="mt-16 z-20">
            <button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-8 py-4 bg-slate-900/50 backdrop-blur-md rounded-full font-bold tracking-wider text-sm border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
            >
              LOAD MORE PROJECTS
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
`;

fs.writeFileSync('src/components/ProjectsSection.tsx', content);
