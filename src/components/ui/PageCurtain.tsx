"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function PageCurtain() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Smooth Dennis Snellenberg snappy page change transition
    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { yPercent: 100, display: "block" },
      { yPercent: 0, duration: 0.28, ease: "power2.inOut" }
    );
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.28,
      ease: "power2.inOut",
      delay: 0.04,
      onComplete: () => {
        gsap.set(overlay, { display: "none", yPercent: 100 });
      },
    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#141517",
        zIndex: 9999,
        display: "none",
        pointerEvents: "none",
      }}
    />
  );
}
