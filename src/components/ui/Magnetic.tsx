"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  strength?: number;
}

export default function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    let yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      xTo(distanceX);
      yTo(distanceY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return React.cloneElement(children, {
    // @ts-expect-error ref forwarding
    ref: (node: HTMLElement | null) => {
      ref.current = node;
      // Also forward child ref if any
      const { ref: childRef } = children as unknown as { ref?: React.Ref<HTMLElement> };
      if (typeof childRef === "function") childRef(node);
      else if (childRef && "current" in childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
    },
  });
}
