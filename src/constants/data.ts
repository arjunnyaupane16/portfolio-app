import { PortfolioData } from "../types/portfolio";

export const portfolioData: PortfolioData = {
    name: "Chandraprakash Nyaupane",
    nickname: "Arjun",
    title: "Web Developer & App Developer",
    age: "2006-12-29",
    bio: {
        short: "I'm a Web and App Developer focused on building clean, performant, and user-friendly digital products.",
        full: "I specialize in building modern web applications and mobile experiences using React, TypeScript, and React Native. My approach is straightforward: write clean code, focus on user experience, and deliver products that work well. I enjoy turning ideas into functional applications that solve real problems."
    },
    education: [
        {
            institution: "Quantum University, Roorkee",
            degree: "B.Tech in Computer Science & Engineering",
            date: "2023 – 2027",
            highlight: "Coursework: DSA, Web Development, DBMS",
            link: "https://quantumuniversity.edu.in/"
        },
        {
            institution: "Himalayan WhiteHouse International College",
            degree: "+2 Science (PCM‑B)",
            date: "2021 – 2023",
            link: "https://whitehouse.edu.np/"
        }
    ],
    skills: [
        {
            category: "Frontend",
            items: [
                { name: "TypeScript", level: 88 },
                { name: "React", level: 85 },
                { name: "Tailwind CSS", level: 82 },
                { name: "Framer Motion", level: 80 }
            ]
        },
        {
            category: "Backend",
            items: [
                { name: "Node.js", level: 78 },
                { name: "PostgreSQL", level: 72 }
            ]
        },
        {
            category: "Mobile",
            items: [
                { name: "React Native", level: 75 },
                { name: "Python", level: 65 }
            ]
        }
    ],
    projects: [
        {
            id: "7",
            title: "northmediaagency.com",
            description: "A Kathmandu studio website for photography, film, and brand growth. Engineered with modern aesthetics, fast loading times, and responsive layouts.",
            tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
            image: "/projects/northmediaagency.png",
            demo: "https://northmediaagency.com/",
            github: "https://github.com/arjunnyaupane16",
            color: "#0a0a0a",
            category: "Design & Development",
            year: "2024",
            tags: ["Next.js", "Agency", "Tailwind CSS"],
            links: {
                live: "https://northmediaagency.com/",
                github: "https://github.com/arjunnyaupane16"
            }
        },
        {
            id: "5",
            title: "Eternal Love",
            description: "A luxury cinematic digital love letter inspired by Rolls-Royce La Rose Noire Droptail, featuring sophisticated animations and storytelling.",
            tech: ["React.js", "GSAP", "Lenis", "Framer Motion"],
            image: "/projects/eternal-love.png",
            demo: "https://eternal-love-omega.vercel.app/",
            github: "https://github.com/arjunnyaupane16/Eternal-Love",
            color: "#ff3366",
            category: "Interaction & Design",
            year: "2024",
            tags: ["React.js", "GSAP", "Lenis"],
            links: {
                live: "https://eternal-love-omega.vercel.app/",
                github: "https://github.com/arjunnyaupane16/Eternal-Love"
            }
        },
        {
            id: "6",
            title: "Maison Aurelia",
            description: "A high-end luxury brand experience with cinematic storytelling, smooth transitions, and premium SaaS-style interaction design.",
            tech: ["Next.js", "TypeScript", "Framer Motion", "GSAP", "Tailwind CSS"],
            image: "/projects/maison-aurelia.jpg",
            demo: "https://maison-aurelia-amber.vercel.app/",
            github: "https://github.com/arjunnyaupane16",
            color: "#f59e0b",
            category: "Design & Development",
            year: "2024",
            tags: ["Next.js", "GSAP", "TypeScript"],
            links: {
                live: "https://maison-aurelia-amber.vercel.app/",
                github: "https://github.com/arjunnyaupane16"
            }
        },
        {
            id: "1",
            title: "Drift & Sip",
            description: "Real-time order management app with live tracking, soft delete, dashboards, and API integration.",
            tech: ["React Native", "Node.js", "MongoDB"],
            image: "/projects/drift-and-sip.jpg",
            demo: "https://drift-and-sip-user-app.vercel.app/",
            github: "https://github.com/arjunnyaupane16/drift-and-sip",
            color: "#4cc9f0",
            category: "Mobile & Backend",
            year: "2024",
            tags: ["React Native", "Node.js", "MongoDB"],
            links: {
                live: "https://drift-and-sip-user-app.vercel.app/",
                github: "https://github.com/arjunnyaupane16/drift-and-sip"
            }
        },
        {
            id: "2",
            title: "Admin App",
            description: "Admin panel for managing orders, dashboards, and staff with authentication and responsive UI.",
            tech: ["React.js", "JavaScript", "CSS3", "Vercel"],
            image: "/projects/admin-app.jpg",
            demo: "https://admin-app-rose.vercel.app/",
            github: "https://github.com/arjunnyaupane16/admin-app",
            color: "#4cc9f0",
            category: "Web Application",
            year: "2023",
            tags: ["React", "JavaScript", "Dashboard"],
            links: {
                live: "https://admin-app-rose.vercel.app/",
                github: "https://github.com/arjunnyaupane16/admin-app"
            }
        }
    ],
    contact: {
        email: "arjunnyaupane16@gmail.com",
        linkedin: "https://linkedin.com/in/arjunnyaupane16",
        github: "https://github.com/arjunnyaupane16",
        phone: "+977 9800000000",
        location: "India / Nepal"
    },
    socials: {
        github: "https://github.com/arjunnyaupane16",
        linkedin: "https://linkedin.com/in/arjunnyaupane16",
        twitter: "https://twitter.com/arjunnyaupane",
        instagram: "https://www.instagram.com/jaaaaaadduuu/",
        facebook: "https://www.facebook.com/arjunnyaupane13"
    }
};
