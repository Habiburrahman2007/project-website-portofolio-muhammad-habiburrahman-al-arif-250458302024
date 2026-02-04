'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Buidcrop',
    category: 'Company Profile',
    badge: 'WEB',
    image: '/buildcrop.png', 
    link: 'https://buildcrop.vibedev.my.id/',
  },
  {
    id: 2,
    title: 'Rotiku',
    category: 'Landing Page',
    badge: 'WEB',
    image: '/rotiku.png',
    link: 'https://rotiku.vibedev.my.id/',
  },
  {
    id: 3,
    title: 'Nusa Trip',
    category: 'Travel',
    badge: 'WEB',
    image: '/nusatrip.png',
    link: 'https://nusatrip.vibedev.my.id/wp/',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen w-full py-24 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Selected Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.id}
              className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer bg-neutral-900/50 border border-white/10 block"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Image with enhanced zoom and color shift */}
              <div className="relative w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-neutral-900 z-0" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-100 opacity-90"
                />
              </div>

              {/* Gradient Overlay - Always present but subtly changes */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* Dynamic Border Glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/30 rounded-3xl transition-colors duration-500 z-20 pointer-events-none" />

              {/* Content Container */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                {/* Top Badge */}
                <div className="absolute top-6 right-6 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white tracking-wide">
                    {project.badge}
                  </span>
                </div>

                {/* Main Text Content */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-blue-400 mb-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {project.category}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <h3 className="text-3xl font-bold text-white tracking-tight mb-1 group-hover:text-purple-50 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 origin-bottom-right">
                      <ArrowUpRight strokeWidth={2.5} size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
