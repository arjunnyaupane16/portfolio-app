"use client";

import { useState, useEffect } from "react";

/**
 * @hook useReducedMotion
 * @description Informs the consumer if the user has requested reduced motion at the OS level.
 * Part of the Reliability/Accessibility pillar: Graceful degradation for low-resource or sensitive environments.
 */
export const useReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return prefersReducedMotion;
};
