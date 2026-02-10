'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 1, name: 'Web Development', desc: 'Building scalable, high-performance websites', image: '/service-web.png', number: '01' },
  { id: 2, name: 'Meta Ads Advertising', desc: 'Creating engaging ads for Meta', image: '/hover/meta.png', number: '02' },
  { id: 3, name: 'SEO Optimization', desc: 'Optimizing websites for search engines', image: '/hover/seo.png', number: '03' },
];

const techStack = ['Wordpress', 'Laravel', 'React', 'Bootstrap', 'TailwindCSS'];

const certificatesRow1 = [
  { id: 1, title: 'Basic HTML, CSS, JS', issuer: 'Skillpedia', image: '/certificate/HTMLCSSJS.png', link: '#' },
  { id: 2, title: 'Meta Ads Fundamentals', issuer: 'Skillpedia', image: '/certificate/Serti Meta.jpg', link: '#' },
  { id: 3, title: 'JavaScript Essentials', issuer: 'Cisco Network Academy', image: '/certificate/js_cisco.jpg', link: '#' },
  { id: 4, title: 'Digital Marketing', issuer: 'Skillpedia', image: '/certificate/Serti Digital Marketing.jpg', link: '#' },
];

const certificatesRow2 = [
  { id: 5, title: 'Basic Copywriting', issuer: 'Skillpedia', image: '/certificate/Serti Copywriting.jpg', link: '#' },
  { id: 6, title: 'Whatsapp Marketing', issuer: 'Skillpedia', image: '/certificate/Serti CS.jpg', link: '#' },
  { id: 7, title: 'Meta Ads Intern', issuer: 'Al Fatihah Foundation', image: '/certificate/al fatihah.jpg', link: '#' },
  { id: 8, title: 'Basic AI', issuer: 'Dicoding', image: '/certificate/ai.jpg', link: '#' },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  
  // Ref for the following image
  const imageRef = useRef<HTMLDivElement>(null);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Text (Existing)
      gsap.fromTo('.reveal-text',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );

      // Expand Lines (Existing)
      gsap.fromTo('.divider-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          transformOrigin: 'left',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.service-list',
            start: 'top 80%',
          }
        }
      );

      // Scrolling Certificates Animation
      // Row 1 goes Left
      gsap.to(row1Ref.current, {
        x: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Row 2 goes Right
      gsap.to(row2Ref.current, {
        x: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
      
    }, containerRef);

    // Mouse follow for image
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
         // Simple offset from cursor
         gsap.to(imageRef.current, {
            x: e.clientX + 20,
            y: e.clientY + 20,
            duration: 0.3,
            ease: 'power2.out'
         });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen w-full bg-[#0D0D0D] py-24 px-6 md:px-12 text-white overflow-hidden">
      
      {/* Floating Image Preview - Fixed to viewport but hidden by default */}
      <div 
        ref={imageRef}
        className="fixed top-0 left-0 w-64 h-48 pointer-events-none z-50 rounded-xl overflow-hidden hidden md:block mix-blend-screen"
        style={{ opacity: hoveredService ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <AnimatePresence mode='wait'>
            {hoveredService && (
                <motion.div
                    key={hoveredService}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                >
                    <Image 
                        src={services.find(s => s.id === hoveredService)?.image || ''} 
                        alt="Service Preview" 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay" />
                </motion.div>
            )}
        </AnimatePresence>
      </div>


      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Top Section: Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Left: Profile Summary */}
          <div className="space-y-8">
            <h2 className="reveal-text text-sm font-bold tracking-widest uppercase text-gray-500 mb-4">About Me</h2>
            <h3 className="reveal-text text-4xl md:text-5xl font-bold leading-tight">
              Membantu UMKM agar memiliki <span className="text-blue-500">website yang scalable</span>, cepat, dan beda dari kompetitor.
            </h3>
            <p className="reveal-text text-gray-400 text-lg leading-relaxed max-w-md">
              Combining creative design with technical excellence. I specialize in building immersive digital experiences that capture attention and drive results.
            </p>
            
            {/* Tech Stack Badges */}
            <div className="reveal-text flex flex-wrap gap-2 pt-4">
              {techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 border border-white/10 rounded-full text-xs font-mono text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>

            {/* Counter (Optional) */}
            <div className="reveal-text flex gap-12 pt-8">
                <div>
                   <span className="block text-4xl font-bold text-white">1+</span>
                   <span className="text-sm text-gray-500 uppercase tracking-widest">Years Exp.</span>
                </div>
                <div>
                   <span className="block text-4xl font-bold text-white">3+</span>
                   <span className="text-sm text-gray-500 uppercase tracking-widest">Projects</span>
                </div>
            </div>
          </div>

          {/* Right: Service List */}
          <div className="service-list flex flex-col justify-center">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="group relative py-8 cursor-pointer"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="divider-line absolute top-0 left-0 w-full h-[1px] bg-white/10 group-hover:bg-blue-500/50 transition-colors duration-500" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-6">
                    <span className="text-xl font-outline text-transparent stroke-white/30 group-hover:stroke-blue-500 transition-colors font-bold opacity-50 group-hover:opacity-100">
                        {service.number}
                    </span>
                    <h4 className="text-2xl md:text-3xl font-medium text-white group-hover:text-blue-400 transition-colors">
                        {service.name}
                    </h4>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-blue-500 text-xl">
                    ↗
                  </span>
                </div>
                
                <p className="mt-2 ml-12 text-sm text-gray-500 group-hover:text-gray-300 transition-colors max-w-xs block">
                    {service.desc}
                </p>
              </div>
            ))}
             <div className="divider-line w-full h-[1px] bg-white/10" />
          </div>

        </div>


        {/* Bottom: Scrolling Certificates */}
        <div className="reveal-text w-full overflow-hidden py-10">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-blue-500" />
                Certifications
            </h3>
            
            <div className="flex flex-col gap-8">
              {/* Row 1 - Moves Left */}
              <div ref={row1Ref} className="flex gap-6 w-max">
                {/* Double the array to create seamless loop illusion if needed, or just enough content */}
                {[...certificatesRow1, ...certificatesRow1].map((cert, index) => (
                   <Link 
                     href={cert.link} 
                     key={`${cert.id}-${index}`} 
                     target="_blank"
                     className="relative w-[300px] h-[200px] md:w-[400px] md:h-[260px] rounded-xl overflow-hidden group shrink-0 border border-white/5"
                   >
                      <Image 
                        src={cert.image} 
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/90 to-transparent">
                          <h4 className="text-white font-bold truncate">{cert.title}</h4>
                          <p className="text-xs text-gray-400">{cert.issuer}</p>
                      </div>
                   </Link>
                ))}
              </div>

              {/* Row 2 - Moves Right */}
              <div ref={row2Ref} className="flex gap-6 w-max ml-[-1200px]">
                {[...certificatesRow2, ...certificatesRow2].map((cert, index) => (
                   <Link 
                     href={cert.link} 
                     key={`${cert.id}-${index}`} 
                     target="_blank"
                     className="relative w-[300px] h-[200px] md:w-[400px] md:h-[260px] rounded-xl overflow-hidden group shrink-0 border border-white/5"
                   >
                      <Image 
                        src={cert.image} 
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/90 to-transparent">
                          <h4 className="text-white font-bold truncate">{cert.title}</h4>
                          <p className="text-xs text-gray-400">{cert.issuer}</p>
                      </div>
                   </Link>
                ))}
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
