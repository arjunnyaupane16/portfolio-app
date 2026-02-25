import { PortfolioData } from "../types/portfolio";

export const portfolioData: PortfolioData = {
    name: "Chandraprakash Nyaupane",
    nickname: "Arjun",
    title: "TypeScript Developer & AI/ML Passionate",
    age: "2006-12-29", // Used to calculate age
    bio: {
        short: "I am a passionate and detail-oriented TypeScript developer exploring AI/ML, with expertise in building scalable web applications and intelligent solutions.",
        full: "I specialize in TypeScript-driven development across frontend and backend, while actively diving into the world of AI and Machine Learning. I enjoy crafting clean, type-safe, maintainable code and building intuitive user experiences. My journey is fueled by curiosity — from delivering high-performance web apps to exploring how AI/ML can create smarter, more impactful solutions."
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
            category: "Frontend Development",
            items: [
                { name: "TypeScript", level: 85 }
            ]
        },
        {
            category: "Backend",
            items: [
                { name: "Node.js", level: 80 }
            ]
        },
        {
            category: "Tools & Platforms",
            items: [
                { name: "Firebase", level: 75 }
            ]
        },
        {
            category: "AI / ML",
            items: [
                { name: "AI/ML", level: 20 }
            ]
        }
    ],
    projects: [
        {
            id: "5",
            title: "Eternal Love",
            description: "A luxury cinematic digital love letter inspired by Rolls-Royce La Rose Noire Droptail, featuring sophisticated animations and storytelling.",
            tech: ["React.js", "GSAP", "Lenis", "Framer Motion"],
            image: "/projects/eternal-love.png",
            demo: "https://eternal-love-omega.vercel.app/",
            github: "https://github.com/arjunnyaupane16/Eternal-Love",
            color: "#ff3366"
        },
        {
            id: "1",
            title: "Drift & Sip",
            description: "Real-time order management app with live tracking, soft delete, dashboards, and API integration.",
            tech: ["React Native", "Node.js", "MongoDB"],
            image: "/projects/drift-and-sip.jpg",
            demo: "https://drift-and-sip-user-app.vercel.app/",
            github: "https://github.com/arjunnyaupane16/drift-and-sip",
            color: "#4cc9f0"
        },
        {
            id: "2",
            title: "Admin App",
            description: "Admin panel for managing orders, dashboards, and staff with authentication and responsive UI.",
            tech: ["React.js", "JavaScript", "CSS3", "Vercel"],
            image: "/projects/admin-app.jpg",
            demo: "https://admin-app-rose.vercel.app/",
            github: "https://github.com/arjunnyaupane16/admin-app",
            color: "#4cc9f0"
        },
        {
            id: "3",
            title: "Personal Portfolio",
            description: "Responsive portfolio website showcasing skills and featured projects.",
            tech: ["React.js", "CSS3", "Vercel"],
            image: "/projects/portfolio.png",
            demo: "https://chandraprakashnyaupane.vercel.app/",
            github: "https://github.com/arjunnyaupane/portfolio",
            color: "#4cc9f0"
        },
        {
            id: "4",
            title: "Task Manager",
            description: "A task and project management app featuring drag & drop, reminders, and cloud sync.",
            tech: ["React Native", "Firebase", "Redux"],
            image: "/projects/task-manager.jpg",
            demo: "https://task-manager-demo.example.com",
            github: "https://github.com/arjunnyaupane16/task-manager",
            color: "#4cc9f0"
        }
    ],
    contact: {
        email: "arjunnyaupane16@gmail.com",
        linkedin: "https://linkedin.com/in/arjunnyaupane16",
        github: "https://github.com/arjunnyaupane16"
    }
};
