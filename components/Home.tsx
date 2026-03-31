"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep((s) => (s + 1) % 3);
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const steps = [
    { num: "01", title: "Click anything", desc: "Tap any element on your live app preview. Pinpoint isolates that component instantly." },
    { num: "02", title: "Describe the change", desc: "Type what you want in plain English. No technical terms. No syntax. Just words." },
    { num: "03", title: "Only that changes.", desc: "Result is injected back surgically. Zero side effects. Zero broken code." },
  ];

  return (
    <main className="bg-[#080808] text-[#f0ede8] min-h-screen font-sans antialiased overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-300 ${scrolled ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/5" : ""}`}>
        <span className="font-black text-xl tracking-tight">Pin<span className="text-[#e8ff47]">point</span></span>
        <div className="hidden md:flex items-center gap-8">
          <a href="#how" className="text-sm text-[#6b6760] hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="text-sm text-[#6b6760] hover:text-white transition-colors">Pricing</a>
          <a href="#waitlist" className="text-sm bg-[#e8ff47] text-[#080808] font-bold px-5 py-2 rounded hover:opacity-90 transition-opacity">Join waitlist</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(232,255,71,0.07)_0%,transparent_70%)] pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-[#e8ff47]/10 border border-[#e8ff47]/20 text-[#e8ff47] text-xs font-mono px-4 py-2 rounded-full mb-10 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff47] animate-pulse" />
          Private beta — limited access
        </div>

        <h1 className="text-[clamp(48px,8vw,100px)] font-black leading-[0.92] tracking-[-0.04em] max-w-4xl mb-7">
          Build apps.<br />
          <span className="text-[#e8ff47]">Click.</span> Not code.
        </h1>

        <p className="text-[#6b6760] text-lg max-w-md leading-relaxed mb-10">
          Click any element. Describe the change. Watch it happen. No IDE, no prompts into the void, no broken code.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="#waitlist" className="bg-[#e8ff47] text-[#080808] font-bold text-sm px-8 py-4 rounded hover:shadow-[0_12px_40px_rgba(232,255,71,0.25)] transition-all duration-200 hover:-translate-y-0.5">
            Join the waitlist
          </a>
          <a href="#how" className="text-[#6b6760] hover:text-white text-sm transition-colors flex items-center gap-2">
            See how it works <span>→</span>
          </a>
        </div>

        {/* DEMO CARD */}
        <div className="mt-20 w-full max-w-3xl bg-[#0f0f0f] border border-white/[0.06] rounded-xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          {/* Window bar */}
          <div className="bg-[#141414] px-5 py-3.5 flex items-center gap-3 border-b border-white/[0.06]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
            </div>
            <span className="flex-1 text-center text-[#6b6760] font-mono text-xs">pinpoint.app — canvas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Canvas side */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-white/[0.06]">
              <p className="font-mono text-[10px] text-[#6b6760] uppercase tracking-widest mb-4">Visual Canvas</p>
              <div className="bg-[#1a1a2e] rounded-lg p-4 flex flex-col gap-3">
                {/* Selected header */}
                <div className="bg-[#16213e] rounded-md px-3 py-2.5 flex items-center gap-2 border-2 border-[#e8ff47] shadow-[0_0_20px_rgba(232,255,71,0.15)] relative">
                  <div className="w-5 h-5 bg-[#0f3460] rounded" />
                  <div className="h-2 bg-[#0f3460] rounded w-20" />
                  <span className="absolute -top-2.5 -right-1 bg-[#e8ff47] text-[#080808] text-[9px] font-bold px-1.5 py-0.5 rounded-full">selected</span>
                </div>
                <div className="bg-[#16213e] rounded-md p-3 flex flex-col gap-2">
                  <div className="h-2 bg-[#0f3460] rounded w-full" />
                  <div className="h-2 bg-[#0f3460] rounded w-3/5" />
                </div>
                <div className="bg-[#e94560] rounded-md h-9 flex items-center justify-center">
                  <div className="h-2.5 w-14 bg-white/30 rounded" />
                </div>
              </div>
            </div>

            {/* Prompt side */}
            <div className="p-6 flex flex-col gap-4 text-left">
              <p className="font-mono text-[10px] text-[#6b6760] uppercase tracking-widest">AI Prompt</p>
              <div className="bg-[#e8ff47]/[0.07] border border-[#e8ff47]/20 rounded px-3 py-2.5 font-mono text-[11px] text-[#e8ff47]">
                🎯 Header — 3 lines isolated
              </div>
              <div className="bg-[#141414] border border-white/[0.06] rounded-md px-3 py-3 text-sm text-[#f0ede8] leading-relaxed flex-1 min-h-[72px]">
                Make it dark navy with a search icon on the right
                <span className="inline-block w-0.5 h-3.5 bg-[#e8ff47] ml-0.5 align-text-bottom animate-pulse" />
              </div>
              <div className="bg-[#e8ff47]/[0.04] border border-[#e8ff47]/10 rounded-md px-3 py-3 font-mono text-[11px] text-[#6b6760] leading-relaxed">
                ✓ <span className="text-[#e8ff47]">backgroundColor → #0a0e1a</span><br />
                ✓ <span className="text-[#e8ff47]">SearchIcon() added</span><br />
                ✓ <span className="text-[#e8ff47]">0 other files touched</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-28 px-6 bg-[#0a0a0a] border-y border-white/[0.05]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs text-[#e8ff47] uppercase tracking-widest mb-5">How it works</p>
          <h2 className="text-[clamp(32px,5vw,60px)] font-black tracking-[-0.03em] leading-none mb-4">Three steps.<br />No code required.</h2>
          <p className="text-[#6b6760] max-w-sm mx-auto mb-16 leading-relaxed">Pinpoint isolates exactly what you clicked, sends only that to AI, and injects the result back surgically.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05] rounded-xl overflow-hidden border border-white/[0.05]">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`p-8 text-left relative transition-colors duration-300 ${activeStep === i ? "bg-[#111]" : "bg-[#0a0a0a]"}`}
              >
                <div className="absolute top-5 right-6 font-black text-7xl text-white/[0.03] leading-none select-none">{step.num}</div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-6 transition-colors duration-300 ${activeStep === i ? "bg-[#e8ff47]/15 border border-[#e8ff47]/25" : "bg-white/[0.04] border border-white/[0.07]"}`}>
                  {["👆", "💬", "⚡"][i]}
                </div>
                <h3 className="font-black text-lg tracking-tight mb-3">{step.title}</h3>
                <p className="text-[#6b6760] text-sm leading-relaxed">{step.desc}</p>
                {activeStep === i && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e8ff47]/40" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO MODES */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs text-[#e8ff47] uppercase tracking-widest mb-5">Two Modes</p>
          <h2 className="text-[clamp(32px,5vw,60px)] font-black tracking-[-0.03em] leading-none mb-16">
            For creators.<br />For developers.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Creator */}
            <div className="border border-white/[0.07] rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-200">
              <div className="p-8 bg-[#e8ff47]/[0.03] flex justify-between items-start border-b border-white/[0.05]">
                <div>
                  <h3 className="font-black text-3xl tracking-tight leading-none mb-2">Creator<br />Mode</h3>
                  <p className="text-[#6b6760] text-sm">Build without touching code</p>
                </div>
                <span className="font-mono text-[10px] bg-[#e8ff47]/10 text-[#e8ff47] border border-[#e8ff47]/20 px-3 py-1 rounded-full uppercase tracking-widest">Free</span>
              </div>
              <div className="p-8 flex flex-col gap-4">
                {["Visual click-to-edit on any element", "Pre-built component library", "Export to Flutter, React Native & Web", "50 AI credits/month — free forever", "Earn credits by sharing"].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#9b9890]">
                    <span className="text-[#e8ff47] font-bold mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Developer */}
            <div className="border border-white/[0.07] rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-200">
              <div className="p-8 bg-[#ff6b35]/[0.03] flex justify-between items-start border-b border-white/[0.05]">
                <div>
                  <h3 className="font-black text-3xl tracking-tight leading-none mb-2">Developer<br />Mode</h3>
                  <p className="text-[#6b6760] text-sm">All power, zero context blindness</p>
                </div>
                <span className="font-mono text-[10px] bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20 px-3 py-1 rounded-full uppercase tracking-widest">Pro</span>
              </div>
              <div className="p-8 flex flex-col gap-4">
                {["Dual View — visual + live code synced", "Scope Inspector — see all dependencies", "AI Diff Mode — accept changes line by line", "Logic Map — visual graph of your app", "Prompt Memory — AI learns your style", "One-Click Refactor — safe always"].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#9b9890]">
                    <span className="text-[#ff6b35] font-bold mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS
      <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/[0.05]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] rounded-xl overflow-hidden border border-white/[0.05]">
          {[
            { num: "$264B", label: "No-code market by 2032" },
            { num: "90%", label: "Fewer tokens per edit" },
            { num: "82%", label: "Devs already use AI tools" },
            { num: "0", label: "Files touched outside scope" },
          ].map((s, i) => (
            <div key={i} className="bg-[#0a0a0a] px-8 py-10 text-center">
              <div className="font-black text-4xl tracking-[-0.04em] mb-2">
                {s.num.replace(/\d+/, (n) => `<span class="text-[#e8ff47]">${n}</span>`).includes("span")
                  ? <span dangerouslySetInnerHTML={{ __html: s.num.replace(/(\d+)/, '<span style="color:#e8ff47">$1</span>') }} />
                  : s.num}
              </div>
              <div className="text-[#6b6760] text-xs leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>
      </section> */}

      {/* PRICING */}
      {/* <section id="pricing" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs text-[#e8ff47] uppercase tracking-widest mb-5">Pricing</p>
          <h2 className="text-[clamp(32px,5vw,60px)] font-black tracking-[-0.03em] leading-none mb-16">Start free.<br />Scale when ready.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Free", price: "₹0", period: "forever", featured: false,
                desc: "For creators building their first app",
                features: ["Creator Mode (full access)", "50 AI credits/month", "3 projects", "Export to Flutter & RN"],
                cta: "Get started free",
              },
              {
                name: "Developer", price: "₹799", period: "/month", featured: true,
                desc: "For developers who want surgical precision",
                features: ["Everything in Free", "Unlimited AI credits", "Full Developer Mode", "Dual View + Diff Mode", "Scope Inspector + Logic Map", "Unlimited projects"],
                cta: "Start Developer plan",
              },
              {
                name: "Team", price: "₹2,499", period: "/month", featured: false,
                desc: "For teams building production apps",
                features: ["Everything in Developer", "5 seats included", "Shared component library", "Team collaboration", "Priority support"],
                cta: "Contact us",
              },
            ].map((p, i) => (
              <div key={i} className={`rounded-xl overflow-hidden border transition-transform duration-200 hover:-translate-y-1 relative ${p.featured ? "border-[#e8ff47]/50 bg-[#e8ff47]/[0.02]" : "border-white/[0.07]"}`}>
                {p.featured && (
                  <div className="absolute top-4 right-4 bg-[#e8ff47] text-[#080808] font-mono text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Popular</div>
                )}
                <div className="p-7 border-b border-white/[0.05]">
                  <h3 className="font-black text-xl tracking-tight mb-1">{p.name}</h3>
                  <p className="text-[#6b6760] text-xs mb-5">{p.desc}</p>
                  <div className="font-black text-4xl tracking-[-0.04em]">{p.price}<span className="text-base font-normal text-[#6b6760]">{p.period}</span></div>
                </div>
                <div className="p-7 flex flex-col gap-3 mb-2">
                  {p.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-2.5 text-sm text-[#9b9890]">
                      <span className="text-[#e8ff47] font-bold flex-shrink-0 mt-0.5">✓</span> {f}
                    </div>
                  ))}
                </div>
                <div className="px-7 pb-7">
                  <button className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-200 ${p.featured ? "bg-[#e8ff47] text-[#080808] hover:shadow-[0_8px_30px_rgba(232,255,71,0.25)]" : "bg-white/[0.05] text-white border border-white/[0.08] hover:bg-white/[0.08]"}`}>
                    {p.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* WAITLIST */}
      <section id="waitlist" className="py-28 px-6 bg-[#0a0a0a] border-t border-white/[0.05] text-center">
        <div className="max-w-xl mx-auto">
          <p className="font-mono text-xs text-[#e8ff47] uppercase tracking-widest mb-5">Early Access</p>
          <h2 className="text-[clamp(32px,5vw,60px)] font-black tracking-[-0.03em] leading-none mb-5">Be first.<br />Build different.</h2>
          <p className="text-[#6b6760] leading-relaxed mb-10">Join the waitlist. First 500 get creator Mode free for 3 months.</p>
          {!joined ? (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-[#080808] border border-white/[0.08] rounded-lg px-4 py-3.5 text-sm text-white placeholder-[#6b6760] outline-none focus:border-[#e8ff47]/40 transition-colors"
              />
              <button
                onClick={() => { if (email.includes("@")) setJoined(true); }}
                className="bg-[#e8ff47] text-[#080808] font-bold text-sm px-6 py-3.5 rounded-lg hover:shadow-[0_8px_30px_rgba(232,255,71,0.25)] transition-all duration-200 whitespace-nowrap"
              >
                Join waitlist
              </button>
            </div>
          ) : (
            <div className="bg-[#e8ff47]/[0.08] border border-[#e8ff47]/20 rounded-xl px-8 py-6 inline-block">
              <p className="text-[#e8ff47] font-bold text-lg mb-1">You&apos;re in ✓</p>
              <p className="text-[#6b6760] text-sm">We&apos;ll reach out when early access opens.</p>
            </div>
          )}
          <p className="mt-6 font-mono text-xs text-[#6b6760]">
            <span className="text-[#e8ff47] font-bold">247 people</span> already on the waitlist
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-black text-lg tracking-tight">Pin<span className="text-[#e8ff47]">point</span></span>
        <p className="text-[#6b6760] text-sm">Built by <span className="text-white font-semibold">Vamsi Krishna</span></p>
        <div className="flex gap-6">
          {["X (Twitter)", "Privacy", "Contact"].map((l) => (
            <a key={l} href="#" className="text-[#6b6760] text-sm hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}