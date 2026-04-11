// /components/Home
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  LayoutTemplate, 
  MousePointer2, 
  Code2, 
  Cpu,
  Globe
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility for Tailwind ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Sub-Component: Feature Card ---
const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-900 mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);
// --- NEW ADDITIVE COMPONENT: ProductShowcase ---
const ProductShowcase = () => {
  return (
    <section id="showcase" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          {/* Browser Mockup Frame */}
          <div className="relative rounded-3xl border border-slate-200 bg-slate-50 p-2 shadow-2xl overflow-hidden group-hover:border-cyan-200 transition-colors">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 bg-white">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
              </div>
              <div className="mx-auto bg-slate-100 px-4 py-1 rounded-md text-[10px] text-slate-400 font-mono">
                app.pinpoint.ai/editor
              </div>
            </div>

            {/* Video Placeholder Container */}
            <div className="relative aspect-video w-full bg-slate-900 rounded-b-2xl overflow-hidden">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-80"
              >
                {/* High-quality abstract tech placeholder video */}
                <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play Button Overlay (Visual Only) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Glow behind the video */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-[2rem] blur-2xl opacity-10 -z-10 group-hover:opacity-20 transition-opacity" />
        </motion.div>
        
        {/* Quick Stats Overlay (Optional High-Conversion Element) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          {[
            { label: "Generation Speed", value: "< 2s" },
            { label: "Code Accuracy", value: "99.9%" },
            { label: "Frameworks", value: "React/Next" },
            { label: "SEO Score", value: "100/100" }
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-cyan-100 selection:text-cyan-900">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 z-[100] w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 h-20">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            </div>
            PINPOINT
          </div>
          
          <div className="hidden md:flex gap-10 text-sm font-semibold text-slate-500 uppercase tracking-widest">
            <a href="#features" className="hover:text-black transition-colors">Engine</a>
            <a href="#showcase" className="hover:text-black transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-black transition-colors">Enterprise</a>
          </div>

          <Link href="/editor">
          <button className="hidden sm:block text-sm font-bold px-6 py-3 bg-slate-950 text-white rounded-full hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200">
            Get Started Free
          </button>
          </Link>

        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-bold uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                V0.1 Now Live
              </div>
              
              <h1 className="text-6xl md:text-8xl font-extrabold leading-[0.85] tracking-tighter text-slate-950">
                Generate <span className="text-slate-400">UI</span> <br /> 
                Faster than <br /> 
                <span className="relative inline-block italic underline decoration-cyan-400 underline-offset-8">Thinking.</span>
              </h1>
              
              <p className="mt-10 text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
                The world's first AI engine built for <span className="text-slate-900">Logic-First Designers.</span> PinPoint assembles high-end components with zero-debt Tailwind code.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-5">
                <button className="flex items-center justify-center gap-3 px-10 py-5 bg-slate-950 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-slate-400 transition-all group">
                  Assemble UI Now <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-600">Join 1.2k+ Builders</span>
                </div>
              </div>
            </motion.div>

            {/* Visual Comparison Logic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative z-10 p-1 bg-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="bg-white rounded-[2.2rem] overflow-hidden border border-slate-100">
                  {/* Header of the mock tool */}
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 tracking-tighter uppercase">PinPoint Engine v1.0.2</div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-slate-100 rounded-full" />
                        <div className="h-3 w-48 bg-slate-50 rounded-full" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white">
                        <MousePointer2 size={16} />
                      </div>
                    </div>
                    
                    {/* Comparison Code Block */}
                    <div className="rounded-2xl bg-slate-950 p-6 font-mono text-[11px] leading-relaxed relative group">
                      <div className="absolute top-4 right-4 text-cyan-400 text-[10px] font-bold">OPTIMIZED</div>
                      <code className="text-indigo-300">{"<motion.div"}</code> <br />
                      <code className="text-white ml-4">{"whileHover={{ scale: 1.05 }}"}</code> <br />
                      <code className="text-white ml-4">{"className=\"grid grid-cols-3 gap-6\""}</code> <br />
                      <code className="text-indigo-300">{"/>"}</code>
                    </div>

                    <div className="flex gap-3">
                       <div className="flex-1 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">Drafting...</div>
                       <div className="flex-1 h-12 bg-cyan-50 border border-cyan-100 rounded-xl flex items-center justify-center text-xs font-bold text-cyan-600 uppercase tracking-widest italic">Assembled</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl -z-10" />
            </motion.div>

          </div>
        </div>
      </section>
      <ProductShowcase/>

      {/* 3. CORE FEATURES SECTION */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4">Engineered for Superiority.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-16">
            We don't just generate screens. We generate architectures that scale.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={LayoutTemplate} 
              title="Semantic Structure" 
              desc="Forget div-soup. We generate clean, accessible HTML5 and ARIA-compliant layouts."
            />
            <FeatureCard 
              icon={Code2} 
              title="Tailwind Expert" 
              desc="Optimized utility classes with zero duplication and native dark mode support."
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Logic Verified" 
              desc="Every component is stress-tested for responsiveness across 12+ standard viewports."
            />
          </div>
        </div>
      </section>
    </div>
  );
}