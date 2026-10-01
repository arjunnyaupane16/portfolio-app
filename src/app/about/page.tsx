"use client";

import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "@/constants/data";

const CAPABILITIES = [
  {
    num: "01",
    title: "Web Development",
    desc: "Modern, performant, and responsive web applications built with Next.js, React, TypeScript, and clean modular architecture.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: (
      <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "App Development",
    desc: "Cross-platform mobile applications engineered with React Native, fluid animations, offline-first data, and native performance.",
    tags: ["React Native", "Expo", "iOS & Android", "Offline-first"],
    icon: (
      <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "UI/UX Design",
    desc: "Intuitive user interfaces and engaging experiences with refined visual hierarchy, modern typography, and interactive prototyping.",
    tags: ["Figma", "Design Systems", "Prototyping", "Micro-interactions"],
    icon: (
      <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--color-white)", minHeight: "100vh" }}>
      {/* ── Page Header (Dennis dark banner) ── */}
      <section
        style={{
          background: "var(--color-dark)",
          color: "var(--color-white)",
          padding: "clamp(140px, 18vw, 220px) clamp(24px, 5vw, 90px) clamp(80px, 10vw, 130px)",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#8C8E90",
              display: "block",
              marginBottom: "20px",
            }}
          >
            02 / About
          </span>
          <h1
            style={{
              fontSize: "clamp(2.8rem, 6.5vw, 7rem)",
              fontWeight: 450,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "1100px",
            }}
          >
            Helping brands thrive <br /> in the digital world
          </h1>
        </div>
      </section>

      {/* ── Editorial Story & Portrait Section ── */}
      <section
        style={{
          padding: "clamp(70px, 10vw, 140px) clamp(24px, 5vw, 90px)",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(48px, 7vw, 100px)",
            alignItems: "center",
          }}
        >
          {/* Portrait Photo */}
          <div
            className="about-portrait"
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3/4",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.12)",
              background: "var(--color-lightgray)",
            }}
          >
            <Image
              src="/profile.png"
              alt={portfolioData.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Bio Story */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <span
              style={{
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--color-blue)",
                fontWeight: 600,
              }}
            >
              The Story
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.2vw, 3.5rem)",
                fontWeight: 450,
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              I turn complex problems into refined, elegant digital experiences.
            </h2>
            <p
              style={{
                fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
                lineHeight: 1.7,
                color: "var(--color-text-muted)",
              }}
            >
              {portfolioData.bio.full}
            </p>
            <div style={{ marginTop: "12px" }}>
              <Link href="/contact" className="btn-round">
                <div className="btn-round-fill" />
                <span className="btn-round-text">Let&apos;s talk</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities / Services Section ── */}
      <section className="services-section" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="services-inner">
          <h2 className="services-headline">
            My Capabilities <span style={{ color: "var(--color-blue)" }}>...</span>
          </h2>

          <div className="services-grid">
            {CAPABILITIES.map((cap) => (
              <div key={cap.num} className="service-card">
                <div>
                  <div className="service-card-header">
                    <div className="service-card-badge">
                      <span className="service-card-badge-dot" />
                      <span>{cap.num}</span>
                    </div>
                    <div className="service-card-icon-wrap">
                      {cap.icon}
                    </div>
                  </div>
                  <h3 className="service-card-title">{cap.title}</h3>
                  <p className="service-card-desc">{cap.desc}</p>
                </div>

                <div>
                  <div className="service-card-tags">
                    {cap.tags.map((tag) => (
                      <span key={tag} className="service-card-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="service-card-footer">
                    <span>Expertise overview</span>
                    <svg className="service-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education & Background ── */}
      <section
        style={{
          padding: "clamp(60px, 9vw, 120px) clamp(24px, 5vw, 90px)",
          maxWidth: "1440px",
          margin: "0 auto",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <span
          style={{
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--color-text-muted)",
            display: "block",
            marginBottom: "32px",
          }}
        >
          Background &amp; Education
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {portfolioData.education.map((edu, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "24px 0",
                borderBottom: "1px solid var(--color-border)",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <h4 style={{ fontSize: "1.4rem", fontWeight: 450, letterSpacing: "-0.015em" }}>
                  {edu.institution}
                </h4>
                <p style={{ color: "var(--color-text-muted)", marginTop: "4px", fontSize: "1.05rem" }}>
                  {edu.degree}
                </p>
                {edu.highlight && (
                  <p style={{ color: "var(--color-blue)", marginTop: "6px", fontSize: "0.95rem" }}>
                    {edu.highlight}
                  </p>
                )}
              </div>
              <span style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", fontWeight: 450 }}>
                {edu.date}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
