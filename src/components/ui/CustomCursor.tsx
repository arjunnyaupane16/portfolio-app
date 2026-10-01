"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop/devices with fine pointer
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse coordinates
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;
    let isMoving = false;
    let moveTimeout: NodeJS.Timeout;

    // Particles array
    const particles: Particle[] = [];
    const colors = [
      "rgba(20, 20, 20, 0.85)",   // black
      "rgba(40, 40, 40, 0.8)",    // deep dark gray
      "rgba(80, 80, 80, 0.75)",   // graphite
      "rgba(255, 255, 255, 0.85)",// crisp white sparkle
      "rgba(37, 99, 235, 0.65)",  // subtle blue accent
    ];

    // Spawn click burst particles
    const spawnClickBurst = (x: number, y: number) => {
      const count = 16;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
        const speed = Math.random() * 4 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 25 + 30,
        });
      }
    };

    // Spawn subtle trailing spark
    const spawnTrailSpark = (x: number, y: number) => {
      if (Math.random() > 0.45) return;
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8 - 0.3,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.8,
        life: 0,
        maxLife: Math.random() * 20 + 20,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => { isMoving = false; }, 150);

      // Emit trailing particles on movement
      spawnTrailSpark(mouseX, mouseY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      spawnClickBurst(e.clientX, e.clientY);
      gsap.to(ring, { scale: 0.75, duration: 0.15, ease: "power2.out" });
    };

    const handleMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Target hover detector (links, buttons, project items, cards)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select, .magnetic-wrap, .work-row-item, .service-card, .btn-round, .btn-normal");
      if (interactive) {
        setIsPointer(true);
        const isProject = target.closest(".work-row-item, .project-card, [data-preview]");
        if (isProject) {
          setIsHovered(true);
          setCursorText("VIEW");
        } else if (interactive.classList.contains("btn-round") || interactive.classList.contains("dennis-floating-menu-btn")) {
          setIsHovered(true);
          setCursorText("");
        } else {
          setIsHovered(false);
          setCursorText("");
        }
      } else {
        setIsPointer(false);
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    // Main animation loop
    let animId: number;
    const render = () => {
      // Smooth LERP for ring and dot
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

      // Update and draw particles canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.life >= p.maxLife || p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
      clearTimeout(moveTimeout);
    };
  }, [isVisible]);

  return (
    <>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99998]"
        style={{ opacity: 0.95 }}
      />

      {/* Smooth Center Dot (Black with contrast outline) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "w-0 h-0" : isPointer ? "w-2.5 h-2.5 bg-black" : "w-2.5 h-2.5 bg-black"}`}
        style={{
          boxShadow: "0 0 0 1.5px rgba(255, 255, 255, 0.4), 0 2px 8px rgba(0, 0, 0, 0.5)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Dennis Snellenberg Magnetic Ring / Preview Pill (Black) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full flex items-center justify-center font-semibold text-xs tracking-wider transition-all duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? "w-20 h-20 bg-black text-white shadow-[0_10px_35px_rgba(0,0,0,0.6)] border border-white/20 backdrop-blur-sm scale-100"
            : isPointer
            ? "w-12 h-12 border-2 border-black/75 bg-black/15 backdrop-blur-[2px] shadow-[0_0_15px_rgba(0,0,0,0.25)] scale-105"
            : "w-9 h-9 border border-black/60 bg-black/5 shadow-[0_0_10px_rgba(0,0,0,0.15)] scale-100"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        {cursorText && (
          <span ref={textRef} className="animate-pulse select-none text-[11px] font-bold text-white tracking-widest">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
