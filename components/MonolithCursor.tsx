"use client";

import { useEffect } from "react";

function MonolithCursor() {
  useEffect(() => {
    const cursor = document.createElement("div");

    cursor.style.position = "fixed";
    cursor.style.width = "24px";
    cursor.style.height = "24px";
    cursor.style.background = "black";
    cursor.style.mixBlendMode = "difference";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "9999";

    document.body.appendChild(cursor);

    let x = 0, y = 0;
    let tx = 0, ty = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const loop = () => {
      x += (tx - x) * 0.15; // inertia
      y += (ty - y) * 0.15;

      cursor.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
}

export default MonolithCursor