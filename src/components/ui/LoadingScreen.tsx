"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const GREETINGS = [
  "Hello",
  "Bonjour",
  "नमस्ते",
  "स्वागत हे",
  "Ciao",
  "Olá",
  "おい",
  "Hallå",
  "Guten Tag",
  "Hallo",
];

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("dennis_ls_viewed")) {
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    // Dennis Snellenberg Exact Pace: ~2.1s total
    const DURATION = 2000;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(p);
      if (p >= 100) clearInterval(progressInterval);
    }, 25);

    // Staggered word cycling (~190ms per language)
    const wordIntervals: NodeJS.Timeout[] = [];
    GREETINGS.forEach((_, i) => {
      const t = setTimeout(() => {
        setWordIdx(i);
      }, 150 + i * (DURATION / GREETINGS.length));
      wordIntervals.push(t);
    });

    // Exit animation: curved slide up matching Dennis Snellenberg
    const exitTimer = setTimeout(() => {
      clearInterval(progressInterval);
      const el = containerRef.current;
      if (!el) {
        setDone(true);
        return;
      }

      const tl = gsap.timeline({
        onComplete() {
          sessionStorage.setItem("dennis_ls_viewed", "1");
          document.body.style.overflow = "";
          setDone(true);
        },
      });

      // Animate curve path and slide entire loader up
      if (curvePathRef.current) {
        tl.to(
          curvePathRef.current,
          {
            attr: { d: "M0,0 Q50,0 100,0 L100,100 L0,100 Z" },
            duration: 0.85,
            ease: "power2.inOut",
          },
          0
        );
      }

      tl.to(
        el,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power3.inOut",
        },
        0
      );
    }, DURATION + 250);

    return () => {
      clearInterval(progressInterval);
      wordIntervals.forEach(clearTimeout);
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#141517",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all",
        overflow: "visible",
      }}
    >
      {/* Greeting word with Dennis signature dot */}
      <div style={{ textAlign: "center", position: "relative" }}>
        <span
          style={{
            fontFamily: "var(--font-main)",
            fontSize: "clamp(3.2rem, 8vw, 6.8rem)",
            fontWeight: 500,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.2em",
          }}
        >
          {GREETINGS[wordIdx]}
          <span
            style={{
              display: "inline-block",
              width: "0.22em",
              height: "0.22em",
              borderRadius: "50%",
              background: "var(--color-blue)",
              verticalAlign: "middle",
              marginBottom: "0.08em",
            }}
          />
        </span>
      </div>

      {/* Progress Line */}
      <div
        style={{
          position: "absolute",
          bottom: "7%",
          left: "clamp(24px, 5vw, 80px)",
          right: "clamp(90px, 9vw, 150px)",
          height: "1px",
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "var(--color-blue)",
            width: `${progress}%`,
            transition: "width 0.05s linear",
          }}
        />
      </div>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          bottom: "7%",
          right: "clamp(24px, 5vw, 80px)",
          fontFamily: "monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.5)",
          transform: "translateY(50%)",
        }}
      >
        {progress}%
      </div>

      {/* Dennis Snellenberg Signature Curved SVG Exit Curtain */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          height: "15vh",
          fill: "#141517",
          pointerEvents: "none",
        }}
      >
        <path
          ref={curvePathRef}
          d="M0,0 Q50,90 100,0 L100,100 L0,100 Z"
        />
      </svg>
    </div>
  );
}
