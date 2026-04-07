// app/dashboard/editor

"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Send, 
  Layers, 
  Monitor, 
  Smartphone, 
  Sparkles,
  Command,
  Settings2,
  MousePointer2
} from 'lucide-react';

// --- 1. LEAN CONTEXT ---
const EditorContext = createContext<any>(null);

const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  return (
    <EditorContext.Provider value={{ generatedCode, setGeneratedCode, isGenerating, setIsGenerating }}>
      {children}
    </EditorContext.Provider>
  );
};

const useEditor = () => useContext(EditorContext);

// --- 2. SLEEK STUDIO UI ---

const EditorShell = () => {
  const { generatedCode, isGenerating, setGeneratedCode, setIsGenerating } = useEditor();
  const [prompt, setPrompt] = useState("");
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedCode(`<div class="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div class="w-12 h-12 bg-indigo-600 rounded-full mb-4 flex items-center justify-center text-white font-bold">P</div>
        <h2 class="text-xl font-bold tracking-tight text-slate-900">PinPoint Generated UI</h2>
        <p class="text-slate-500 text-sm mt-2">Logic-first component for: ${prompt}</p>
      </div>`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] text-slate-900 overflow-hidden font-sans selection:bg-indigo-100">
      
      {/* BACKGROUND DOT GRID (The Engineer Vibe) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

      {/* LEFT FLOATING NAV (Ultra Minimal) */}
      <nav className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <div className="p-3 bg-white shadow-sm border border-slate-200/60 rounded-2xl flex flex-col gap-4">
           <button className="p-2.5 bg-slate-950 text-white rounded-xl hover:scale-105 transition-transform"><Plus size={20}/></button>
           <button className="p-2.5 text-slate-400 hover:text-slate-950 transition-colors"><Layers size={20}/></button>
           <button className="p-2.5 text-slate-400 hover:text-slate-950 transition-colors"><MousePointer2 size={20}/></button>
           <div className="h-[1px] bg-slate-100 w-full" />
           <button className="p-2.5 text-slate-400 hover:text-slate-950 transition-colors"><Settings2 size={20}/></button>
        </div>
      </nav>

      {/* MAIN STAGE */}
      <main className="flex-1 flex flex-col relative z-10">
        
        {/* Top Header (Floating Style) */}
        <header className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-4">
             <div className="text-sm font-bold tracking-tighter uppercase flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                PinPoint 
                {/* <span className="text-slate-400 font-medium lowercase">/ project_alpha</span> */}
             </div>
          </div>

          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md p-1 rounded-xl border border-slate-200/50 shadow-sm">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'desktop' ? 'bg-slate-100 text-slate-900' : 'text-slate-400'}`}
            >
              Desktop
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'mobile' ? 'bg-slate-100 text-slate-900' : 'text-slate-400'}`}
            >
              Mobile
            </button>
          </div>
        </header>

        {/* CANVAS AREA */}
        <div className="flex-1 flex items-center justify-center p-12">
           <motion.div 
             layout
             animate={{ 
               width: viewMode === 'desktop' ? '100%' : '375px',
               height: viewMode === 'desktop' ? '100%' : '667px'
             }}
             className="relative bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] rounded-[2.5rem] border border-slate-200/60 overflow-hidden max-w-6xl max-h-[85%] w-full h-full flex flex-col transition-all duration-500"
           >
              <div className="absolute inset-0 overflow-auto scrollbar-hide">
                {isGenerating ? (
                   <div className="h-full w-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-20">
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-8 h-8 border-2 border-slate-100 border-t-indigo-600 rounded-full mb-4" 
                      />
                      <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Assembling Logic</p>
                   </div>
                ) : generatedCode ? (
                   <div dangerouslySetInnerHTML={{ __html: generatedCode }} className="w-full h-full p-6" />
                ) : (
                   <div className="h-full flex flex-col items-center justify-center p-20 text-center opacity-20">
                      <Sparkles size={40} className="mb-4 text-indigo-600" />
                      <p className="text-sm font-medium">Ready to Assemble</p>
                   </div>
                )}
              </div>
           </motion.div>
        </div>

        {/* COMMAND PILL (The Sleekest Part) */}
        <div className="pb-12 px-6 flex justify-center">
          <div className="w-full max-w-xl bg-slate-950 shadow-2xl rounded-2xl p-1.5 flex items-center gap-3">
             <div className="pl-4 flex items-center gap-2 text-slate-500">
                <Command size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Prompt</span>
             </div>
             <input 
               type="text" 
               placeholder="Make a pricing section with 3 tiers..." 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
               className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-white placeholder:text-slate-600"
             />
             <button 
               onClick={handleGenerate}
               className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
             >
                <Send size={16} />
             </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default function EditorPage() {
  return (
    <EditorProvider>
      <EditorShell />
    </EditorProvider>
  );
}