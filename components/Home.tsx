"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(new Set());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const refs = useRef(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((p) => new Set(p).add(e.target.id));
        });
      },
      { threshold: 0.08 }
    );
    refs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const reg = (id) => (el) => {
    if (el) { el.id = id; refs.current.set(id, el); }
  };
  const vis = (id) => visible.has(id);

  const SERIF = { fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 };
  const MONO  = { fontFamily: "'DM Mono', monospace" };
  const SANS  = { fontFamily: "'Instrument Sans', sans-serif" };

  const reveal = (id, delay = 0) => ({
    opacity: vis(id) ? 1 : 0,
    transform: vis(id) ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        html { scroll-behavior: smooth; }
        
        body {
          background: #0a0a0a;
          color: #ede9e0;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        
        ::selection { background: rgba(232,255,71,0.18); color: #ede9e0; }
        input::placeholder { color: #3d3a34; }
        a { text-decoration: none; color: inherit; }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }

        @keyframes crosshair-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* NAV */
        .nav-link {
          color: #4a4740;
          font-size: 12px;
          letter-spacing: 0.04em;
          transition: color 0.18s ease;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #e8ff47;
          transition: width 0.22s ease;
        }
        .nav-link:hover { color: #ede9e0; }
        .nav-link:hover::after { width: 100%; }

        /* BUTTONS */
        .btn-primary {
          background: #e8ff47;
          color: #0a0a0a;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.01em;
          padding: 12px 26px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s ease, box-shadow 0.2s ease, transform 0.15s ease;
          display: inline-block;
        }
        .btn-primary:hover {
          opacity: 0.88;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(232,255,71,0.18);
        }
        .btn-primary:active { transform: translateY(0); }

        .btn-ghost {
          color: #4a4740;
          font-size: 13px;
          letter-spacing: 0.01em;
          padding: 11px 20px;
          border-radius: 3px;
          border: 1px solid rgba(237,233,224,0.09);
          background: transparent;
          cursor: pointer;
          transition: color 0.18s ease, border-color 0.18s ease, transform 0.15s ease;
          display: inline-block;
        }
        .btn-ghost:hover {
          color: #ede9e0;
          border-color: rgba(237,233,224,0.18);
          transform: translateY(-1px);
        }

        .btn-nav {
          background: transparent;
          color: #4a4740;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          padding: 8px 18px;
          border-radius: 3px;
          border: 1px solid rgba(237,233,224,0.1);
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .btn-nav:hover {
          background: rgba(232,255,71,0.06);
          border-color: rgba(232,255,71,0.25);
          color: #e8ff47;
        }

        /* STEP CARDS */
        .step-card {
          background: #0a0a0a;
          padding: 44px 36px 40px;
          position: relative;
          transition: background 0.2s ease;
          cursor: default;
        }
        .step-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: transparent;
          transition: background 0.2s ease;
        }
        .step-card:hover { background: rgba(237,233,224,0.018); }
        .step-card:hover::before { background: rgba(232,255,71,0.35); }

        /* SELECTION BOX MOTIF */
        .selection-box {
          position: relative;
        }
        .selection-box::after {
          content: '';
          position: absolute;
          inset: -6px;
          border: 1px dashed rgba(232,255,71,0.15);
          border-radius: 4px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .selection-box:hover::after { opacity: 1; }

        /* TERMINAL */
        .terminal-line {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding: 3px 0;
        }

        /* PRICE CARD */
        .price-card {
          border-radius: 6px;
          overflow: hidden;
          transition: transform 0.22s cubic-bezier(0.16,1,0.3,1);
        }
        .price-card:hover { transform: translateY(-5px); }

        /* CROSSHAIR CURSOR HINT */
        .crosshair-hint {
          position: relative;
          display: inline-block;
        }
        .crosshair-hint::before,
        .crosshair-hint::after {
          content: '';
          position: absolute;
          background: rgba(232,255,71,0.4);
          transition: opacity 0.2s;
          opacity: 0;
        }
        .crosshair-hint::before { width: 1px; height: 100%; top: 0; left: 50%; }
        .crosshair-hint::after { height: 1px; width: 100%; top: 50%; left: 0; }

        /* BOUNDING BOX on diagram rows */
        .scope-row {
          transition: background 0.18s ease;
          border-radius: 4px;
          margin: 0 -8px;
          padding: 18px 8px;
        }
        .scope-row:hover { background: rgba(237,233,224,0.025); }

        /* TICKER */
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #4a4740;
        }
        .ticker-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(237,233,224,0.2);
          flex-shrink: 0;
        }
        .ticker-dot.active { background: #e8ff47; }

        /* INPUT */
        .waitlist-input {
          flex: 1;
          background: rgba(237,233,224,0.03);
          border: 1px solid rgba(237,233,224,0.08);
          border-radius: 3px;
          padding: 13px 16px;
          color: #ede9e0;
          font-size: 14px;
          outline: none;
          transition: border-color 0.18s ease;
        }
        .waitlist-input:focus { border-color: rgba(232,255,71,0.28); }

        /* NOISE OVERLAY */
        .noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 999;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px;
        }

        /* CORNER MARKS */
        .corner-mark {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: rgba(232,255,71,0.22);
          border-style: solid;
        }
        .corner-mark.tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
        .corner-mark.tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
        .corner-mark.bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
        .corner-mark.br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }

        hr.divider {
          border: none;
          border-top: 1px solid rgba(237,233,224,0.06);
        }

        @media (max-width: 768px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .nav-links { display: none !important; }
          .hero-h1 { font-size: clamp(40px, 12vw, 72px) !important; }
        }
      `}</style>

      {/* Noise texture overlay */}
      <div className="noise" />

      <div style={{ background: "#0a0a0a", color: "#ede9e0", ...SANS, overflowX: "hidden", position: "relative" }}>

        {/* ─── NAV ─── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 48px",
          background: scrolled ? "rgba(10,10,10,0.88)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(237,233,224,0.06)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          transition: "all 0.28s ease",
        }}>
          <span style={{ ...SERIF, fontSize: 19, letterSpacing: "-0.025em" }}>
            Pin<span style={{ color: "#e8ff47" }}>point</span>
          </span>

          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {[["How it works", "#how"], ["Pricing", "#pricing"]].map(([label, href]) => (
              <a key={label} href={href} className="nav-link" style={{ ...SANS }}>{label}</a>
            ))}
          </div>

          <button className="btn-nav" style={{ ...MONO }}>
            Join waitlist
          </button>
        </nav>

        {/* ─── HERO ─── */}
        <section style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 48px 88px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle radial — restrained, not AI-glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 40% 35% at 48% 5%, rgba(232,255,71,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Big ghost number — offset, asymmetric */}
          <div style={{
            position: "absolute",
            top: "44%",
            right: -24,
            transform: "translateY(-52%)",
            ...SERIF,
            fontSize: "clamp(160px,22vw,320px)",
            color: "rgba(237,233,224,0.018)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.05em",
          }}>01</div>

          {/* Targeting crosshair decoration — top right */}
          <div style={{
            position: "absolute",
            top: 140,
            right: 96,
            width: 48,
            height: 48,
            opacity: 0.18,
            pointerEvents: "none",
          }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#e8ff47", transform: "translateY(-50%)" }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#e8ff47", transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", inset: 8, border: "1px solid #e8ff47", borderRadius: "50%", animation: "crosshair-spin 12s linear infinite" }} />
          </div>

          <div style={{ maxWidth: 860, position: "relative" }}>
            {/* Badge */}
            <div ref={reg("h0")} style={{
              ...reveal("h0"),
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(232,255,71,0.18)",
              background: "rgba(232,255,71,0.05)",
              color: "#e8ff47",
              fontSize: 10,
              padding: "6px 13px",
              borderRadius: 2,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 52,
              ...MONO,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#e8ff47", animation: "pulse-dot 2.2s ease-in-out infinite" }} />
              Private beta · limited access
            </div>

            <h1 className="hero-h1" ref={reg("h1")} style={{
              ...reveal("h1", 0.08),
              ...SERIF,
              fontSize: "clamp(44px,6.2vw,88px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              marginBottom: 36,
            }}>
              Software shouldn&apos;t break<br />
              when you change<br />
              <em style={{ color: "#e8ff47", fontStyle: "italic" }}>one thing.</em>
            </h1>

            <p ref={reg("h2")} style={{
              ...reveal("h2", 0.16),
              fontSize: 17,
              color: "#4a4740",
              lineHeight: 1.8,
              maxWidth: 440,
              marginBottom: 4,
            }}>
              Pinpoint lets you click any element and change exactly that.
            </p>
            <p ref={reg("h3")} style={{
              ...reveal("h3", 0.19),
              fontSize: 17,
              color: "#4a4740",
              lineHeight: 1.8,
              maxWidth: 440,
              marginBottom: 52,
            }}>
              Nothing else moves. Nothing else breaks.
            </p>

            <div ref={reg("h4")} style={{ ...reveal("h4", 0.28), display: "flex", gap: 12, alignItems: "center" }}>
              <a href="#waitlist" className="btn-primary" style={{ ...SANS }}>Join the waitlist</a>
              <a href="#how" className="btn-ghost" style={{ ...SANS }}>See how it works →</a>
            </div>
          </div>

          {/* Subtext strip — asymmetric gaps */}
          <div ref={reg("h5")} style={{
            ...reveal("h5", 0.4),
            marginTop: 96,
            borderTop: "1px solid rgba(237,233,224,0.06)",
            paddingTop: 32,
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 0.9fr",
            gap: 32,
          }}>
            {[
              "No prompts into the void.",
              "No guessing what the AI touched.",
              "Just precise, scoped changes — exactly where you intended.",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div className="ticker-dot active" style={{ marginTop: 6, flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: "#4a4740", lineHeight: 1.7, letterSpacing: "0.01em" }}>{t}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* ─── MECHANISM ─── */}
        <section style={{ padding: "120px 48px 104px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", className: "grid-2", gap: 96, alignItems: "start" }}>
            <div>
              <p ref={reg("m0")} style={{ ...reveal("m0"), ...MONO, fontSize: 10, color: "#e8ff47", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 32 }}>The mechanism</p>
              <h2 ref={reg("m1")} style={{
                ...reveal("m1", 0.08),
                ...SERIF,
                fontSize: "clamp(32px,4.2vw,58px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                marginBottom: 36,
              }}>
                Most AI tools<br />rewrite code.
              </h2>
              <p ref={reg("m2")} style={{
                ...reveal("m2", 0.16),
                fontSize: 16,
                color: "#4a4740",
                lineHeight: 1.85,
                marginBottom: 28,
                maxWidth: 380,
              }}>
                Pinpoint isolates what you selected, understands its dependencies, and applies changes only within that scope.
              </p>
              <p ref={reg("m3")} style={{
                ...reveal("m3", 0.24),
                ...MONO,
                fontSize: 14,
                color: "#e8ff47",
                lineHeight: 2,
              }}>
                Zero bleed.<br />Zero surprises.
              </p>
            </div>

            {/* Scope diagram */}
            <div ref={reg("m4")} style={{
              ...reveal("m4", 0.12),
              background: "rgba(237,233,224,0.018)",
              border: "1px solid rgba(237,233,224,0.07)",
              borderRadius: 6,
              padding: "36px 32px",
              position: "relative",
            }}>
              {/* Corner marks */}
              <div className="corner-mark tl" />
              <div className="corner-mark tr" />
              <div className="corner-mark bl" />
              <div className="corner-mark br" />

              <p style={{ ...MONO, fontSize: 10, color: "#4a4740", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28 }}>Scope isolation</p>

              {[
                { label: "Full codebase", pct: "100%", active: false, dim: true },
                { label: "Component selected", pct: "40%", active: false, dim: false },
                { label: "Isolated scope", pct: "17%", active: true, dim: false },
              ].map((row, i) => (
                <div key={i} className="scope-row">
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: row.pct,
                      minWidth: 28,
                      height: 6,
                      borderRadius: 2,
                      background: row.active ? "#e8ff47" : row.dim ? "rgba(237,233,224,0.06)" : "rgba(237,233,224,0.16)",
                      flexShrink: 0,
                      transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                    }} />
                    <span style={{
                      ...MONO,
                      fontSize: 11,
                      color: row.active ? "#e8ff47" : row.dim ? "#4a4740" : "#ede9e0",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}>
                      {row.label}
                      {row.active && <span style={{ marginLeft: 8, opacity: 0.5 }}>→</span>}
                    </span>
                  </div>
                  {i < 2 && <div style={{ height: 1, background: "rgba(237,233,224,0.05)", marginTop: 18 }} />}
                </div>
              ))}

              <div style={{
                marginTop: 28,
                padding: "14px 18px",
                background: "rgba(232,255,71,0.04)",
                border: "1px solid rgba(232,255,71,0.12)",
                borderRadius: 4,
              }}>
                <p style={{ ...MONO, fontSize: 11, color: "#e8ff47", lineHeight: 1.9 }}>
                  Only the isolated scope is sent to AI.<br />Only it changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ─── HOW IT WORKS ─── */}
        <section id="how" style={{ padding: "112px 48px 96px", background: "rgba(237,233,224,0.012)" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <p ref={reg("hw0")} style={{ ...reveal("hw0"), ...MONO, fontSize: 10, color: "#e8ff47", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 32 }}>How it works</p>
            <h2 ref={reg("hw1")} style={{
              ...reveal("hw1", 0.08),
              ...SERIF,
              fontSize: "clamp(32px,4.2vw,58px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              marginBottom: 64,
            }}>
              Three steps.<br />Exact results.
            </h2>

            <div className="grid-3" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 2,
              background: "rgba(237,233,224,0.05)",
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid rgba(237,233,224,0.07)",
            }}>
              {[
                { num: "01", head: "Select", body: "Click any element in your app. Pinpoint isolates its exact scope — nothing more." },
                { num: "02", head: "Describe", body: "Say what you want in plain language. No syntax. No prompt engineering." },
                { num: "03", head: "Apply", body: "Changes are injected surgically. Nothing outside your selection is touched." },
              ].map((s, i) => (
                <div
                  key={i}
                  ref={reg(`hw${i + 2}`)}
                  className="step-card"
                  style={{ ...reveal(`hw${i + 2}`, 0.09 * (i + 1)) }}
                >
                  <span style={{
                    ...SERIF,
                    position: "absolute",
                    top: 16,
                    right: 22,
                    fontSize: 64,
                    color: "rgba(237,233,224,0.028)",
                    lineHeight: 1,
                    userSelect: "none",
                    letterSpacing: "-0.04em",
                  }}>{s.num}</span>
                  <p style={{ ...MONO, fontSize: 10, color: "#e8ff47", letterSpacing: "0.12em", marginBottom: 20, textTransform: "uppercase" }}>{s.num}</p>
                  <h3 style={{ ...SERIF, fontSize: 28, letterSpacing: "-0.025em", marginBottom: 16, lineHeight: 1.05 }}>{s.head}</h3>
                  <p style={{ fontSize: 13, color: "#4a4740", lineHeight: 1.8 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ─── POSITIONING ─── */}
        <section style={{ padding: "112px 48px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <p ref={reg("p0")} style={{
              ...reveal("p0"),
              ...MONO, fontSize: 10, color: "#e8ff47", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 44,
            }}>The gap no one fixed</p>
            <h2 ref={reg("p1")} style={{
              ...reveal("p1", 0.08),
              ...SERIF,
              fontSize: "clamp(30px,4.2vw,56px)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              marginBottom: 28,
            }}>
              AI can generate apps.
            </h2>
            <p ref={reg("p2")} style={{
              ...reveal("p2", 0.16),
              ...SERIF,
              fontSize: "clamp(22px,3.2vw,40px)",
              lineHeight: 1.18,
              letterSpacing: "-0.025em",
              color: "#4a4740",
              fontStyle: "italic",
              marginBottom: 36,
            }}>
              But it still can&apos;t control change.
            </p>
            <p ref={reg("p3")} style={{
              ...reveal("p3", 0.24),
              ...SERIF,
              fontSize: "clamp(26px,3.6vw,46px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#e8ff47",
            }}>
              Pinpoint fixes that.
            </p>
          </div>
        </section>

        <hr className="divider" />

        {/* ─── TRUST ─── */}
        <section style={{ padding: "112px 48px 104px", background: "rgba(237,233,224,0.012)" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", className: "grid-2", gap: 88, alignItems: "center" }}>
            <div>
              <p ref={reg("t0")} style={{ ...reveal("t0"), ...MONO, fontSize: 10, color: "#e8ff47", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 32 }}>Deterministic by design</p>
              <h2 ref={reg("t1")} style={{
                ...reveal("t1", 0.08),
                ...SERIF,
                fontSize: "clamp(30px,3.8vw,52px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: 44,
              }}>
                Same input.<br />Same result.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {["No randomness.", "No hidden edits.", "No broken features."].map((line, i) => (
                  <div key={i} ref={reg(`t${i + 2}`)} style={{
                    ...reveal(`t${i + 2}`, 0.12 * (i + 1)),
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}>
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "transparent",
                      border: "1px solid rgba(232,255,71,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span style={{ color: "#e8ff47", fontSize: 10, lineHeight: 1 }}>✓</span>
                    </div>
                    <span style={{ ...MONO, fontSize: 14, color: "#ede9e0", letterSpacing: "0.02em" }}>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal */}
            <div ref={reg("t5")} style={{
              ...reveal("t5", 0.16),
              background: "#070707",
              border: "1px solid rgba(237,233,224,0.07)",
              borderRadius: 6,
              overflow: "hidden",
            }}>
              <div style={{
                background: "#0e0e0e",
                padding: "10px 16px",
                borderBottom: "1px solid rgba(237,233,224,0.06)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ffbd2e" }} />
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#28ca42" }} />
                <span style={{ ...MONO, fontSize: 10, color: "#3d3a34", marginLeft: 8, letterSpacing: "0.04em" }}>pinpoint — scope.log</span>
              </div>
              <div style={{ padding: "28px 26px", ...MONO, fontSize: 11.5, lineHeight: 1, color: "#4a4740" }}>
                <div className="terminal-line" style={{ marginBottom: 6 }}>
                  <span style={{ color: "#e8ff47" }}>→</span>
                  <span>Selected: <span style={{ color: "#ede9e0" }}>HeaderWidget</span></span>
                </div>
                <div className="terminal-line" style={{ marginBottom: 6 }}>
                  <span style={{ color: "#e8ff47" }}>→</span>
                  <span>Scope: <span style={{ color: "#ede9e0" }}>3 lines isolated</span></span>
                </div>
                <div className="terminal-line" style={{ marginBottom: 16 }}>
                  <span style={{ color: "#e8ff47" }}>→</span>
                  <span>Sending: <span style={{ color: "#ede9e0" }}>isolated scope only</span></span>
                </div>
                <div className="terminal-line" style={{ marginBottom: 5 }}>
                  <span style={{ color: "#28ca42" }}>✓</span>
                  <span>backgroundColor → <span style={{ color: "#e8ff47" }}>#0a0e1a</span></span>
                </div>
                <div className="terminal-line" style={{ marginBottom: 5 }}>
                  <span style={{ color: "#28ca42" }}>✓</span>
                  <span>SearchIcon added</span>
                </div>
                <div className="terminal-line" style={{ marginBottom: 16 }}>
                  <span style={{ color: "#28ca42" }}>✓</span>
                  <span>Files touched: <span style={{ color: "#e8ff47" }}>1 of 1</span></span>
                </div>
                <div style={{ height: 1, background: "rgba(237,233,224,0.06)", marginBottom: 16 }} />
                <div className="terminal-line">
                  <span style={{ color: "#28ca42" }}>✓</span>
                  <span style={{ color: "#ede9e0" }}>Nothing else changed.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ─── FUTURE HOOK ─── */}
        <section style={{ padding: "112px 48px 104px" }}>
          <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
            <p ref={reg("f0")} style={{
              ...reveal("f0"),
              ...MONO, fontSize: 10, color: "#e8ff47", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 44,
            }}>What&apos;s coming</p>
            <h2 ref={reg("f1")} style={{
              ...reveal("f1", 0.08),
              ...SERIF,
              fontSize: "clamp(28px,3.8vw,50px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}>
              Today, you control UI.
            </h2>
            <p ref={reg("f2")} style={{
              ...reveal("f2", 0.16),
              ...SERIF,
              fontSize: "clamp(20px,2.8vw,36px)",
              lineHeight: 1.22,
              letterSpacing: "-0.025em",
              color: "#4a4740",
              fontStyle: "italic",
            }}>
              Soon, you&apos;ll control logic, data,<br />and backend — the same way.
            </p>
          </div>
        </section>

        <hr className="divider" />

        {/* ─── PRICING ─── */}
        <section id="pricing" style={{ padding: "112px 48px 104px", background: "rgba(237,233,224,0.012)" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <p ref={reg("pr0")} style={{
              ...reveal("pr0"),
              ...MONO, fontSize: 10, color: "#e8ff47", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 32,
            }}>Pricing</p>
            <h2 ref={reg("pr1")} style={{
              ...reveal("pr1", 0.08),
              ...SERIF,
              fontSize: "clamp(30px,3.8vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}>
              Start free.
            </h2>
            <p ref={reg("pr1b")} style={{
              ...reveal("pr1b", 0.12),
              fontSize: 15,
              color: "#4a4740",
              marginBottom: 64,
              maxWidth: 460,
              lineHeight: 1.7,
            }}>
              Try it. Feel what precision actually means.
              Upgrade when you can&apos;t imagine going back.
            </p>

            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              {[
                {
                  name: "Free",
                  amt: "₹0",
                  period: "forever",
                  featured: false,
                  note: "Try it. No commitment.",
                  feats: [
                    "Full Creator Mode",
                    "30 AI edits / month",
                    "3 projects",
                    "Export to Flutter & React Native",
                  ],
                  cta: "Get started free",
                  ctaNote: null,
                },
                {
                  name: "Full Control",
                  amt: "₹799",
                  period: "/month",
                  featured: true,
                  note: "For developers who build seriously.",
                  feats: [
                    "Everything in Free",
                    "Unlimited AI edits",
                    "Dual View — visual + live code",
                    "Scope Inspector",
                    "AI Diff Mode",
                    "Unlimited projects",
                  ],
                  cta: "Unlock full control",
                  ctaNote: "First 500 get 3 months free",
                },
                {
                  name: "Team",
                  amt: "₹2,499",
                  period: "/month",
                  featured: false,
                  note: "For teams shipping production apps.",
                  feats: [
                    "Everything in Full Control",
                    "5 seats included",
                    "Shared component library",
                    "Collaboration & comments",
                    "Priority support",
                  ],
                  cta: "Contact us",
                  ctaNote: null,
                },
              ].map((p, i) => (
                <div
                  key={i}
                  ref={reg(`prc${i}`)}
                  className="price-card"
                  style={{
                    ...reveal(`prc${i}`, 0.09 * (i + 1)),
                    border: p.featured
                      ? "1px solid rgba(232,255,71,0.3)"
                      : "1px solid rgba(237,233,224,0.07)",
                    background: p.featured ? "rgba(232,255,71,0.014)" : "transparent",
                    position: "relative",
                  }}
                >
                  {p.featured && (
                    <div style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      background: "#e8ff47",
                      color: "#0a0a0a",
                      ...MONO,
                      fontSize: 9,
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: 2,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>Popular</div>
                  )}
                  <div style={{ padding: "28px 26px 24px", borderBottom: "1px solid rgba(237,233,224,0.06)" }}>
                    <h3 style={{ ...SERIF, fontSize: 20, letterSpacing: "-0.02em", marginBottom: 6 }}>{p.name}</h3>
                    <p style={{ fontSize: 11, color: "#4a4740", marginBottom: 22, lineHeight: 1.6 }}>{p.note}</p>
                    <div style={{ ...SERIF, fontSize: 42, letterSpacing: "-0.04em", lineHeight: 1 }}>
                      {p.amt}
                      <span style={{ fontSize: 13, color: "#4a4740", ...SANS, fontWeight: 400, marginLeft: 2 }}>{p.period}</span>
                    </div>
                  </div>
                  <div style={{ padding: "24px 26px 14px", display: "flex", flexDirection: "column", gap: 11 }}>
                    {p.feats.map((f, j) => (
                      <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "#4a4740" }}>
                        <span style={{ color: "#e8ff47", flexShrink: 0, fontSize: 10, marginTop: 3 }}>✓</span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "14px 26px 26px" }}>
                    <button
                      className={p.featured ? "btn-primary" : "btn-ghost"}
                      style={{
                        width: "100%",
                        padding: "12px 0",
                        borderRadius: 3,
                        fontWeight: p.featured ? 600 : 500,
                        fontSize: 13,
                        cursor: "pointer",
                        border: p.featured ? "none" : "1px solid rgba(237,233,224,0.09)",
                        background: p.featured ? "#e8ff47" : "transparent",
                        color: p.featured ? "#0a0a0a" : "#4a4740",
                        ...SANS,
                      }}
                    >
                      {p.cta}
                    </button>
                    {p.ctaNote && (
                      <p style={{ ...MONO, fontSize: 10, color: "#e8ff47", textAlign: "center", marginTop: 10, letterSpacing: "0.04em" }}>
                        {p.ctaNote}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Conversion nudge */}
            <div ref={reg("pr2")} style={{
              ...reveal("pr2", 0.3),
              marginTop: 40,
              padding: "20px 28px",
              borderRadius: 4,
              border: "1px solid rgba(237,233,224,0.06)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#e8ff47", flexShrink: 0, animation: "pulse-dot 2.4s ease-in-out infinite" }} />
              <p style={{ ...MONO, fontSize: 12, color: "#4a4740", letterSpacing: "0.02em" }}>
                Free is for trying. <span style={{ color: "#ede9e0" }}>Paid is for building seriously.</span>
                {" "}When you hit the limit, you'll know it's worth it.
              </p>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ─── WAITLIST / CTA ─── */}
        <section id="waitlist" style={{ padding: "128px 48px 112px" }}>
          <div style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
            <p ref={reg("w0")} style={{
              ...reveal("w0"),
              ...MONO, fontSize: 10, color: "#e8ff47", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 44,
            }}>Early access</p>

            <h2 ref={reg("w1")} style={{
              ...reveal("w1", 0.08),
              ...SERIF,
              fontSize: "clamp(30px,4.2vw,56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              marginBottom: 22,
            }}>
              Generate anything.<br />Change only<br />what you mean.
            </h2>

            <p ref={reg("w2")} style={{
              ...reveal("w2", 0.16),
              fontSize: 15,
              color: "#4a4740",
              lineHeight: 1.8,
              marginBottom: 48,
            }}>
              First 500 get Full Control plan free for 3 months.
            </p>

            {!joined ? (
              <div ref={reg("w3")} style={{
                ...reveal("w3", 0.24),
                display: "flex",
                gap: 8,
                maxWidth: 400,
                margin: "0 auto",
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="waitlist-input"
                  style={{ ...SANS }}
                />
                <button
                  onClick={() => { if (email.includes("@")) setJoined(true); }}
                  className="btn-primary"
                  style={{ ...SANS, padding: "0 22px", whiteSpace: "nowrap", borderRadius: 3, border: "none" }}
                >
                  Join
                </button>
              </div>
            ) : (
              <div style={{
                background: "rgba(232,255,71,0.05)",
                border: "1px solid rgba(232,255,71,0.18)",
                borderRadius: 6,
                padding: "28px 40px",
                display: "inline-block",
                position: "relative",
              }}>
                <div className="corner-mark tl" />
                <div className="corner-mark tr" />
                <div className="corner-mark bl" />
                <div className="corner-mark br" />
                <p style={{ ...SERIF, fontSize: 22, color: "#e8ff47", marginBottom: 8 }}>You&apos;re in ✓</p>
                <p style={{ fontSize: 13, color: "#4a4740" }}>We&apos;ll reach out when early access opens.</p>
              </div>
            )}

            <p ref={reg("w4")} style={{
              ...reveal("w4", 0.34),
              marginTop: 24,
              ...MONO,
              fontSize: 11,
              color: "#4a4740",
              letterSpacing: "0.04em",
            }}>
              <span style={{ color: "#e8ff47" }}>247 people</span> already on the waitlist
            </p>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{
          borderTop: "1px solid rgba(237,233,224,0.06)",
          padding: "24px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ ...SERIF, fontSize: 17, letterSpacing: "-0.025em" }}>
            Pin<span style={{ color: "#e8ff47" }}>point</span>
          </span>
          <p style={{ fontSize: 11, color: "#4a4740", ...MONO, letterSpacing: "0.03em" }}>
            Built by <span style={{ color: "#ede9e0" }}>Vamsi Krishna</span>
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["X (Twitter)", "Privacy", "Contact"].map(l => (
              <a key={l} href="#" className="nav-link" style={{ fontSize: 11, ...MONO, letterSpacing: "0.04em" }}>{l}</a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}