"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Send, Layers, Monitor, Smartphone, 
  Sparkles, Command, Settings2, MousePointer2,
  Layout, ArrowRight
} from 'lucide-react';

// --- 1. TYPES & CONTEXT ---
interface UIBlock {
  id: string;
  type: string;
  code: string;
}

const EditorContext = createContext<any>(null);

const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, setBlocks] = useState<UIBlock[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<'intake' | 'canvas'>('intake');
  const [viewportConfig, setViewportConfig] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <EditorContext.Provider value={{ 
      blocks, setBlocks, 
      isGenerating, setIsGenerating, 
      step, setStep, 
      viewportConfig, setViewportConfig 
    }}>
      {children}
    </EditorContext.Provider>
  );
};

const useEditor = () => useContext(EditorContext);

// --- 2. COMPONENTS ---

const IntakeScreen = () => {
  const { setStep, setViewportConfig } = useEditor();
  
  const options = [
    { id: 'desktop', label: 'Desktop', desc: 'High-end web experience', icon: Monitor },
    { id: 'mobile', label: 'Mobile', desc: 'Sleek app-like interface', icon: Smartphone },
  ];

  const handleSelect = (id: 'desktop' | 'mobile') => {
    setViewportConfig(id);
    setStep('canvas');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
      
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter italic mb-2">PINPOINT</h1>
          <p className="text-slate-500 font-medium">Initialize your production-ready architecture.</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id as any)}
              className="group p-5 flex items-center gap-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-500/5 transition-all text-left"
            >
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <opt.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">{opt.label}</h3>
                <p className="text-sm text-slate-500">{opt.desc}</p>
              </div>
              <ArrowRight size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const EditorShell = () => {
  const { blocks, isGenerating, setBlocks, setIsGenerating, viewportConfig, setViewportConfig } = useEditor();
  const [prompt, setPrompt] = useState("");

  const pollForResult = async (requestId: string) => {
  const checkStatus = async () => {
    // You check the status using the requestId
    const res = await fetch(`https://integrate.api.nvidia.com/v1/status/${requestId}`, {
      headers: { "Authorization": `Bearer ${process.env.NEXT_PUBLIC_NV_API}` }
    });

    if (res.status === 202) {
      // Still thinking... check again in 3 seconds
      console.log("...Gemma 4 is still assembling the UI logic...");
      setTimeout(checkStatus, 3000); 
    } else {
      const data = await res.json();
      const rawCode = data.choices[0].message.content;
      
      // Success! Update the PinPoint blocks
      setBlocks(prev => [...prev, { 
        id: Math.random().toString(), 
        code: rawCode.replace(/```html|```jsx|```/g, "").trim() 
      }]);
      setIsGenerating(false);
    }
  };
  checkStatus();
};

  const handleGenerate = async () => {
  if (!prompt) return;
  setIsGenerating(true);
  
  console.log("🚀 Link active: Requesting assembly...");

  try {
    const response = await fetch("/api/assemble", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, viewport: viewportConfig }),
    });

    // 1. If it's a 202, start the polling logic we built
    if (response.status === 202) {
      const requestId = response.headers.get("NVCF-REQID");
      console.log("⏳ Status 202: Ticket received. Polling...");
      pollForResult(requestId);
      return;
    }

    // 2. If it's a 200 (like your log shows!), extract and render
    const data = await response.json();
    
    // NIM returns code in 'choices[0].message.content'
    const rawCode = data.code || data.choices?.[0]?.message?.content || "";
    const cleanCode = rawCode.replace(/```html|```jsx|```/g, "").trim();

    if (cleanCode) {
      console.log("💎 Code Received! Rendering to PinPoint canvas...");
      
      const newBlock: UIBlock = {
        id: Math.random().toString(36).substring(7),
        type: 'assembled',
        code: cleanCode
      };

      // THIS IS THE LINK: Update the blocks array to trigger a re-render
      setBlocks((prev: UIBlock[]) => [...prev, newBlock]);
      setPrompt(""); // Clear the input for the next command
    }

  } catch (error) {
    console.error("🔗 Link broken during assembly:", error);
  } finally {
    setIsGenerating(false);
  }
};

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] text-slate-900 overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <nav className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <div className="p-3 bg-white shadow-xl border border-slate-200/60 rounded-2xl flex flex-col gap-4">
           <button className="p-2.5 bg-indigo-600 text-white rounded-xl hover:scale-105 transition-transform"><Plus size={20}/></button>
           <button className="p-2.5 text-slate-400 hover:text-slate-950 transition-colors"><Layers size={20}/></button>
           <button className="p-2.5 text-slate-400 hover:text-slate-950 transition-colors"><MousePointer2 size={20}/></button>
           <div className="h-[1px] bg-slate-100 w-full" />
           <button className="p-2.5 text-slate-400 hover:text-slate-950 transition-colors"><Settings2 size={20}/></button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col relative z-10">
        <header className="flex items-center justify-between px-8 py-6">
          <div className="text-sm font-bold tracking-tighter uppercase italic flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            PinPoint Studio
          </div>
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            {(['desktop', 'mobile'] as const).map((v) => (
              <button key={v} onClick={() => setViewportConfig(v)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewportConfig === v ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
           <motion.div layout animate={{ width: viewportConfig === 'desktop' ? '100%' : '375px', maxHeight: viewportConfig === 'desktop' ? '100%' : '667px' }}
             className="relative bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] border border-slate-200 overflow-hidden w-full h-full flex flex-col transition-all duration-700">
              <div className="flex-1 overflow-auto p-8 scrollbar-hide space-y-4">
                {blocks.length > 0 ? (
                  blocks.map((block: UIBlock) => (
                    <div key={block.id} dangerouslySetInnerHTML={{ __html: block.code }} />
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                    <Sparkles size={48} className="mb-4 text-indigo-600" />
                    <p className="text-lg font-bold">Awaiting Assembly</p>
                    <p className="text-sm">Describe a section to begin.</p>
                  </div>
                )}
                {isGenerating && (
                  <div className="animate-pulse bg-slate-50 h-32 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center px-4">Generating High-Fidelity Logic...</p>
                  </div>
                )}
              </div>
           </motion.div>
        </div>

        <div className="pb-10 px-6 flex justify-center">
          <div className="w-full max-w-xl bg-slate-950 shadow-2xl rounded-2xl p-2 flex items-center gap-3 border border-slate-800">
             <div className="pl-4 flex items-center gap-2 text-slate-500"><Command size={14} /></div>
             <input type="text" placeholder="Assemble a feature section..." value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
               className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-white placeholder:text-slate-700 outline-none" />
             <button onClick={handleGenerate} disabled={isGenerating}
               className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20 disabled:opacity-50">
                <Send size={18} />
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
      <EditorContent />
    </EditorProvider>
  );
}

function EditorContent() {
  const { step } = useEditor();
  return (
    <AnimatePresence mode="wait">
      {step === 'intake' ? <IntakeScreen key="intake" /> : <EditorShell key="shell" />}
    </AnimatePresence>
  );
}