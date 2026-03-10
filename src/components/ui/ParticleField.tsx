"use client";

import { useEffect, useState } from "react";

/**
 * @file components/ui/ParticleField.tsx
 * @description Lightweight CSS-animated particle field for hero backgrounds.
 * Uses pure CSS — no canvas, no performance overhead.
 * Particles are generated client-side only to prevent hydration mismatch.
 */

type Particle = {
    id: number;
    size: number;
    left: number;
    delay: number;
    duration: number;
    opacity: number;
};

function generateParticles(): Particle[] {
    return Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 10 + 12,
        opacity: Math.random() * 0.4 + 0.1,
    }));
}

export default function ParticleField() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setParticles(generateParticles());
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            {particles.map((p) => (
                <span
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.left}%`,
                        bottom: "-10px",
                        background: p.id % 3 === 0
                            ? "rgba(244, 63, 94, 0.6)"
                            : "rgba(99, 102, 241, 0.6)",
                        opacity: p.opacity,
                        animation: `particle-drift ${p.duration}s ${p.delay}s ease-in infinite`,
                        filter: "blur(0.5px)",
                        boxShadow: p.id % 3 === 0
                            ? `0 0 ${p.size * 3}px rgba(244,63,94,0.4)`
                            : `0 0 ${p.size * 3}px rgba(99,102,241,0.4)`,
                    }}
                />
            ))}
        </div>
    );
}
