"use client";

/**
 * @file components/ui/AnimatedCounter.tsx
 * @description Animated number counter that counts up from 0 when scrolled into view.
 */

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export default function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    duration = 1800,
    className = "",
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const startTime = performance.now();
        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{current}{suffix}
        </span>
    );
}
