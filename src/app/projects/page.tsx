"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { portfolioData } from "@/constants/data";

const CATEGORIES = ["All", "Web", "Mobile", "Design"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"rows" | "grid">("rows");
  const [hoveredProject, setHoveredProject] = useState<typeof portfolioData.projects[0] | null>(null);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  // Dennis Snellenberg Exact Physics LERP Mouse Tracking Loop
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posXCard = mouseX;
    let posYCard = mouseY;
    let posXBtn = mouseX;
    let posYBtn = mouseY;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const renderLoop = () => {
      posXCard += (mouseX - posXCard) / 10;
      posYCard += (mouseY - posYCard) / 10;

      posXBtn += (mouseX - posXBtn) / 6;
      posYBtn += (mouseY - posYBtn) / 6;

      if (cardRef.current) {
        cardRef.current.style.left = `${posXCard}px`;
        cardRef.current.style.top = `${posYCard}px`;
      }
      if (btnRef.current) {
        btnRef.current.style.left = `${posXBtn}px`;
        btnRef.current.style.top = `${posYBtn}px`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Scale In / Out animation when hovering projects
  useEffect(() => {
    if (!cardRef.current || !btnRef.current) return;

    if (hoveredProject) {
      gsap.to(cardRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(btnRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else {
      gsap.to(cardRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto",
      });
      gsap.to(btnRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  }, [hoveredProject]);

  const filteredProjects = portfolioData.projects.filter((p) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Mobile") return p.category?.toLowerCase().includes("mobile") || p.tech?.some((t) => /native|expo|mobile/i.test(t));
    if (activeCategory === "Design") return p.category?.toLowerCase().includes("design") || p.tech?.some((t) => /framer|figma|ui/i.test(t));
    if (activeCategory === "Web") return p.category?.toLowerCase().includes("web") || p.tech?.some((t) => /react|next|typescript|web/i.test(t));
    return true;
  });

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
            01 / Work
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
            Creating next level <br /> digital products
          </h1>
        </div>
      </section>

      {/* ── Filter Row & View Switcher ── */}
      <section
        style={{
          padding: "clamp(40px, 5vw, 64px) clamp(24px, 5vw, 90px) 24px",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`btn-normal ${activeCategory === cat ? "active" : ""}`}
                style={{
                  background: activeCategory === cat ? "var(--color-dark)" : "transparent",
                  color: activeCategory === cat ? "var(--color-white)" : "var(--color-text)",
                  borderColor: activeCategory === cat ? "var(--color-dark)" : "var(--color-border)",
                  padding: "12px 26px",
                  fontSize: "0.95rem",
                }}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* View Mode Toggle (Rows vs Grid) */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={() => setViewMode("rows")}
              aria-label="Rows View"
              style={{
                padding: "10px 16px",
                borderRadius: "100px",
                border: "1px solid var(--color-border)",
                background: viewMode === "rows" ? "var(--color-dark)" : "transparent",
                color: viewMode === "rows" ? "var(--color-white)" : "var(--color-text)",
                cursor: "pointer",
              }}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
              style={{
                padding: "10px 16px",
                borderRadius: "100px",
                border: "1px solid var(--color-border)",
                background: viewMode === "grid" ? "var(--color-dark)" : "transparent",
                color: viewMode === "grid" ? "var(--color-white)" : "var(--color-text)",
                cursor: "pointer",
              }}
            >
              Grid
            </button>
          </div>
        </div>
      </section>

      {/* ── Projects Display ── */}
      <section
        style={{
          padding: "20px clamp(24px, 5vw, 90px) clamp(80px, 10vw, 140px)",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        {viewMode === "rows" ? (
          <div>
            <div className="work-header-row">
              <span>Client / Project</span>
              <span>Services</span>
              <span>Year</span>
            </div>

            <div style={{ marginTop: "16px" }}>
              {filteredProjects.map((project) => {
                const projectLink = project.links?.live || project.demo || project.links?.github || project.github || "#";
                const isExternal = projectLink.startsWith("http");

                return (
                  <Link
                    key={project.id}
                    href={projectLink}
                    target={isExternal ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="work-row-item"
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="work-row-title">{project.title}</div>
                    <div className="work-row-services">
                      {project.category || "Design & Development"} &bull;{" "}
                      {(project.tags || project.tech || []).slice(0, 3).join(", ")}
                    </div>
                    <div className="work-row-year">{project.year || "2024"}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          /* Grid View */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "clamp(32px, 5vw, 60px)",
              marginTop: "24px",
            }}
          >
            {filteredProjects.map((project) => {
              const projectLink = project.links?.live || project.demo || project.links?.github || project.github || "#";
              const isExternal = projectLink.startsWith("http");

              return (
                <Link
                  key={project.id}
                  href={projectLink}
                  target={isExternal ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    textDecoration: "none",
                    color: "var(--color-text)",
                  }}
                >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/10",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "var(--color-lightgray)",
                  }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : null}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                      fontWeight: 450,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--color-text-muted)",
                      marginTop: "4px",
                    }}
                  >
                    {project.category} &bull;{" "}
                    {(project.tags || project.tech || []).slice(0, 3).join(", ")}
                  </p>
                </div>
              </Link>
            );
          })}
          </div>
        )}
      </section>

      {/* ── Dennis Snellenberg Exact Floating Card (Black Square with inner media) ── */}
      <div
        ref={cardRef}
        className="dennis-floating-card"
        style={{
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
        }}
      >
        <div className="dennis-floating-card-image">
          {hoveredProject && hoveredProject.image && (
            <Image
              src={hoveredProject.image}
              alt={hoveredProject.title}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 320px, 450px"
              priority
            />
          )}
        </div>
      </div>

      {/* ── Dennis Snellenberg Exact Floating "View" Circle Button ── */}
      <div
        ref={btnRef}
        className="dennis-floating-btn"
        style={{
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
        }}
      >
        View
      </div>
    </div>
  );
}
