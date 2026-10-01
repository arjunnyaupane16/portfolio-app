"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/ui/Magnetic";
import ParticleField from "@/components/ui/ParticleField";
import { portfolioData } from "@/constants/data";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Web Development",
    desc: "I build modern, scalable, and lightning-fast web applications using React, Next.js, and TypeScript. Focus on performance, micro-interactions, clean architecture, and responsive design.",
    tags: ["React", "Next.js", "TypeScript", "GSAP", "Tailwind CSS"],
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
    desc: "Cross-platform mobile applications engineered with React Native. Fluid native gestures, offline-first architectures, real-time synchronization, and seamless user experiences on iOS and Android.",
    tags: ["React Native", "Expo", "iOS & Android", "Mobile UI", "Offline-first"],
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
    desc: "User-centric interface and experience design with refined aesthetic clarity. Visual hierarchy, consistent design systems, interactive prototyping, and pixel-perfect execution.",
    tags: ["Figma", "Design Systems", "Prototyping", "Micro-interactions", "Wireframes"],
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

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<typeof portfolioData.projects[0] | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  // ── HERO entrance animations ──────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hanger",          { x: -90, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, 0.15)
        .fromTo(".header-role-wrap",{ x: 80,  opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, 0.25)
        .fromTo(".personal-image-wrap",{ y: 60, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 1.4 }, 0.05)
        .fromTo(".big-name",        { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.35);
    });
    return () => ctx.revert();
  }, []);

  // ── Scroll-triggered animations (fires once sections enter viewport) ──
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Intro headline — word-by-word stagger reveal
      const headlineEl = document.querySelector(".home-intro-headline");
      if (headlineEl) {
        const text = headlineEl.textContent || "";
        const words = text.split(" ").filter(Boolean);
        headlineEl.innerHTML = words
          .map(w => `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block;transform:translateY(110%)">${w}</span></span>`)
          .join(" ");
        gsap.to(".word-inner", {
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.055,
          scrollTrigger: { trigger: ".home-intro-headline", start: "top 82%", once: true },
        });
      }

      // Intro desc + button — fade up
      gsap.fromTo(".home-intro-desc",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".home-intro-desc", start: "top 85%", once: true } }
      );
      gsap.fromTo(".home-intro-right .btn-round",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.15,
          scrollTrigger: { trigger: ".home-intro-right", start: "top 85%", once: true } }
      );

      // Work section header line wipe
      gsap.fromTo(".work-header-row",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ".work-header-row", start: "top 88%", once: true } }
      );

      // Work rows — staggered slide-up + fade
      gsap.fromTo(".work-row-item",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".work-section", start: "top 78%", once: true } }
      );

      // "More work" button pop
      gsap.fromTo(".btn-normal",
        { y: 24, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".btn-normal", start: "top 90%", once: true } }
      );

      // Services headline
      gsap.fromTo(".services-headline",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: ".services-headline", start: "top 82%", once: true } }
      );

      // Services cards — stagger slide up from bottom
      gsap.fromTo(".service-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".services-grid", start: "top 80%", once: true } }
      );

      // Service card num counter spin-in
      gsap.fromTo(".service-card-num",
        { rotateX: -90, opacity: 0 },
        { rotateX: 0, opacity: 1, duration: 0.6, ease: "back.out(2)", stagger: 0.12,
          scrollTrigger: { trigger: ".services-grid", start: "top 80%", once: true } }
      );
    });

    return () => ctx.revert();
  }, []);

  // ── Scroll parallax & Marquee speed-up ──────────────────────────
  useEffect(() => {
    let lastScroll = window.scrollY;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const speed = currentScroll - lastScroll;
      lastScroll = currentScroll;

      if (photoRef.current && currentScroll < window.innerHeight) {
        photoRef.current.style.transform = `translateX(-50%) translateY(${currentScroll * 0.12}px)`;
      }

      if (marqueeTrackRef.current) {
        gsap.to(marqueeTrackRef.current, {
          x: `-=${speed * 0.65}`,
          duration: 0.25,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Dennis physics LERP mouse tracking ──────────────────────────
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posXCard = mouseX, posYCard = mouseY;
    let posXBtn = mouseX, posYBtn = mouseY;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const renderLoop = () => {
      posXCard += (mouseX - posXCard) / 10;
      posYCard += (mouseY - posYCard) / 10;
      posXBtn  += (mouseX - posXBtn) / 6;
      posYBtn  += (mouseY - posYBtn) / 6;

      if (cardRef.current) {
        cardRef.current.style.left = `${posXCard}px`;
        cardRef.current.style.top  = `${posYCard}px`;
      }
      if (btnRef.current) {
        btnRef.current.style.left = `${posXBtn}px`;
        btnRef.current.style.top  = `${posYBtn}px`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ── Scale In/Out on project hover ────────────────────────────────
  useEffect(() => {
    if (!cardRef.current || !btnRef.current) return;

    if (hoveredProject) {
      gsap.to(cardRef.current, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      gsap.to(btnRef.current,  { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    } else {
      gsap.to(cardRef.current, { scale: 0, opacity: 0, duration: 0.3,  ease: "power2.in",  overwrite: "auto" });
      gsap.to(btnRef.current,  { scale: 0, opacity: 0, duration: 0.3,  ease: "power2.in",  overwrite: "auto" });
    }
  }, [hoveredProject]);

  const recentProjects = portfolioData.projects.slice(0, 3);


  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          DENNIS SNELLENBERG EXACT HERO HEADER
          ═══════════════════════════════════════════════════════════ */}
      <header className="home-header">
        {/* Luminous Ambient Particle Drift */}
        <ParticleField />

        {/* Personal Portrait Photo — Centered in Studio Gray background */}
        <div ref={photoRef} className="personal-image-wrap">
          <Image
            src="/profile.png"
            alt={portfolioData.name}
            width={720}
            height={1080}
            priority
            quality={95}
            style={{
              height: "88vh",
              width: "auto",
              maxHeight: "880px",
              objectFit: "contain",
              objectPosition: "center bottom",
            }}
          />
        </div>

        {/* Left Hanger Tab (Attached to left screen edge) */}
        <div className="hanger">
          <Magnetic strength={0.25}>
            <div className="hanger-tab">
              <div className="hanger-text">
                <span>Located</span>
                <span>in</span>
                <span>India / Nepal</span>
              </div>
              <div className="digital-ball">
                <div className="globe">
                  <div className="globe-wrap">
                    <div className="circle" />
                    <div className="circle" />
                    <div className="circle" />
                    <div className="circle-hor" />
                    <div className="circle-hor-middle" />
                  </div>
                </div>
              </div>
            </div>
          </Magnetic>
        </div>

        {/* Right Role Section */}
        <div className="header-role-wrap">
          <svg
            className="arrow-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 7l10 10" />
            <path d="M17 7v10H7" />
          </svg>
          <div className="role-title">
            <span>Freelance</span>
            <span>Designer &amp; Developer</span>
          </div>
        </div>

        {/* Floating Rotating Agency Badge */}
        <div className="absolute right-8 bottom-32 hidden lg:block z-20 pointer-events-auto">
          <Magnetic strength={0.4}>
            <div className="relative w-32 h-32 flex items-center justify-center cursor-pointer group">
              <svg className="w-full h-full animate-[spin_18s_linear_infinite] group-hover:scale-110 transition-transform duration-500" viewBox="0 0 120 120">
                <path
                  id="textPath-hero"
                  d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                  fill="none"
                />
                <text className="text-[10px] uppercase tracking-[0.24em] fill-white/80 font-medium">
                  <textPath href="#textPath-hero">
                    • AVAILABLE FOR WORK • DEV &amp; DESIGN •
                  </textPath>
                </text>
              </svg>
              <div className="absolute w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399] animate-pulse" />
            </div>
          </Magnetic>
        </div>

        {/* Bottom Infinite Sliding Name Marquee with Scroll-Speed Coupling */}
        <div className="big-name">
          <div ref={marqueeTrackRef} className="marquee-track">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="marquee-item">
                {portfolioData.name}
                <span className="marquee-spacer">—</span>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          DENNIS HOME INTRO — 2-Column Editorial Section
          ═══════════════════════════════════════════════════════════ */}
      <section className="home-intro">
        <div className="home-intro-grid">
          {/* Left: Big Statement Headline with Clean Line Reveal */}
          <div>
            <h2 className="home-intro-headline">
              Helping brands to stand out in the digital era. Together we will set the
              new status quo. No nonsense, always on the cutting edge.
            </h2>
          </div>

          {/* Right: Short Bio + Round Magnetic "About me" Button */}
          <div className="home-intro-right">
            <p className="home-intro-desc">
              {portfolioData.bio.short} The combination of my passion for design,
              code &amp; interaction positions me in a unique place in the web and app
              development world.
            </p>

            <div>
              <Magnetic strength={0.4}>
                <Link href="/about" className="btn-round">
                  <div className="btn-round-fill" />
                  <span className="btn-round-text">About me</span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          RECENT WORK — Dennis Snellenberg Row Grid with Cursor Preview
          ═══════════════════════════════════════════════════════════ */}
      <section className="work-section">
        <div className="work-section-inner">
          <div className="work-header-row">
            <span>Recent work</span>
            <span>Services</span>
            <span>Year</span>
          </div>

          <div style={{ marginTop: "16px" }}>
            {recentProjects.map((project) => {
              const projectLink =
                project.links?.live ||
                project.demo ||
                project.links?.github ||
                project.github ||
                "/projects";
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
                    {(project.tags || project.tech || []).slice(0, 2).join(", ")}
                  </div>
                  <div className="work-row-year">{project.year || "2024"}</div>
                </Link>
              );
            })}
          </div>

          {/* More Work Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "clamp(48px, 6vw, 80px)",
            }}
          >
            <Magnetic strength={0.35}>
              <Link href="/projects" className="btn-normal">
                <div className="btn-normal-fill" />
                <span className="btn-normal-text">
                  <span>More work</span>
                  <span style={{ opacity: 0.6, fontSize: "0.9em", marginLeft: "4px" }}>
                    [{portfolioData.projects.length}]
                  </span>
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>
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

      {/* ═══════════════════════════════════════════════════════════
          SERVICES / CAPABILITIES
          ═══════════════════════════════════════════════════════════ */}
      <section className="services-section">
        <div className="services-inner">
          <h2 className="services-headline">
            I can help you with <span style={{ color: "var(--color-blue)" }}>...</span>
          </h2>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <div key={service.num} className="service-card">
                <div>
                  <div className="service-card-header">
                    <div className="service-card-badge">
                      <span className="service-card-badge-dot" />
                      <span>{service.num}</span>
                    </div>
                    <div className="service-card-icon-wrap">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>
                </div>

                <div>
                  <div className="service-card-tags">
                    {service.tags.map((tag) => (
                      <span key={tag} className="service-card-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="service-card-footer">
                    <span>Explore capability</span>
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
    </>
  );
}
