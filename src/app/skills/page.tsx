"use client";

import Magnetic from "@/components/ui/Magnetic";
import { portfolioData } from "@/constants/data";

const EXTRA_SKILLS = [
  "Git & GitHub",
  "Figma",
  "REST APIs",
  "Vercel",
  "Firebase",
  "AWS S3",
  "Redux",
  "Zustand",
  "Expo",
  "Prisma",
];

export default function SkillsPage() {
  const allSkills = portfolioData.skills;

  return (
    <main
      style={{
        backgroundColor: "var(--color-bg)",
        minHeight: "100vh",
        paddingTop: "clamp(120px, 16vw, 180px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      <div className="dennis-container">
        {/* Title */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
          <h1 className="display-title" style={{ maxWidth: "800px" }}>
            The skills & tools<br />
            behind my work
          </h1>
        </div>

        {/* Skill Categories Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(40px, 6vw, 80px)",
            marginBottom: "clamp(60px, 8vw, 120px)",
          }}
        >
          {allSkills.map((category) => (
            <div key={category.category}>
              <span className="section-label">{category.category}</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {category.items.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px 0",
                      borderTop: "1px solid var(--color-border)",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem", fontWeight: 450 }}>{skill.name}</span>
                    <span style={{ fontSize: "0.9rem", color: "var(--color-gray)" }}>{skill.level}%</span>
                  </div>
                ))}
                <div className="stripe" />
              </div>
            </div>
          ))}
        </div>

        {/* Tools & Workflow */}
        <div>
          <span className="section-label">Tools & Workflow</span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            {EXTRA_SKILLS.map((skill) => (
              <Magnetic key={skill} strength={0.2}>
                <div
                  className="btn-normal"
                  style={{
                    padding: "12px 24px",
                    fontSize: "0.95rem",
                    cursor: "default",
                  }}
                >
                  <div className="btn-fill" />
                  <span className="btn-text">{skill}</span>
                </div>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
