# PinPoint AI: Precision UI/UX Assembly Engine

**PinPoint** is a high-end AI SaaS designed for **Logic-First Designers** and **Product Architects**. Unlike traditional AI website builders that suffer from "Regeneration Fatigue," PinPoint uses a modular, block-based assembly engine to generate production-ready, zero-debt React code.

---

## 🎯 The Core Problem We Solve
**Regeneration Fatigue:** Most AI UI tools rebuild the entire page when a user asks for a small change, leading to broken layouts and lost progress.
**The PinPoint Solution:** **Surgical Edits.** We treat the UI as a graph of isolated blocks. If you change the Hero, the Footer stays exactly as it was.

---

## 🛠 Tech Stack (The "Sleek Studio" Architecture)
* **Frontend:** Next.js 16 (App Router), Tailwind CSS, Framer Motion, Lucide React.
* **State Management:** React Context (Lean Provider Pattern).
* **AI Orchestration:** NVIDIA Developer Program (NIM) utilizing:
    * **Llama-3.1-Nemotron-70B:** For high-reasoning initial generation.
    * **Nemotron-3-Ultra:** For high-speed surgical edits.
    * **Codestral-22B:** For FIM (Fill-In-the-Middle) code refinement.
* **Styling:** "Zero-Debt" Tailwind—semantic, responsive-first, and design-token driven.

---

## 🚀 Key Features

### 1. The Modular Canvas (Current Implementation)
* **Sleek Studio UI:** A minimalist, "Chrome-less" editor that puts the user's work center stage.
* **Viewport Toggle:** Instant transition between Desktop and Mobile views with fluid Framer Motion transitions.
* **Infinity Dot-Grid:** A professional blueprint background for engineering precision.

### 2. Surgical Edit Engine (In Development)
* **Block Isolation:** The ability to target a specific UI section (Hero, Pricing, FAQ) for modification without affecting neighboring blocks.
* **Contextual "Bridge" Logic:** AI-driven generation of transition components that visually link top and bottom sections seamlessly.
* **Shadow DOM Preview:** Safe rendering of AI-generated JSX/Tailwind strings.

### 3. High-Conversion Storefront
* **Premium Aesthetic:** Glassmorphism, tight typography (`tracking-tighter`), and high-impact "Innovator" styling.
* **Dynamic Showcase:** Integrated video/demo frames to build immediate user trust.

---

## 📂 Project Structure
* `app/page.tsx` - High-converting landing page entry point.
* `app/editor/page.tsx` - The main Software/Studio workspace.
* `components/home.tsx` - Marketing and Hero components.
* `context/EditorContext.tsx` - Global state for code generation and AI status.

---

## 🛣 Roadmap
- [x] High-End Landing Page Design (UI Lock)
- [x] Sleek Studio Editor Layout (UI Lock)
- [ ] Implement Modular State (Array of Blocks)
- [ ] Connect NVIDIA NIM API (Server-side Route Handlers)
- [ ] Implement "Surgical Edit" Prompt Logic
- [ ] Launch on Product Hunt

---
*Built with ❤️ by Vamsi Krishna.*