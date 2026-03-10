import { PortfolioData } from "../types/portfolio";

export const portfolioData: PortfolioData = {
    name: "Chandraprakash Nyaupane",
    nickname: "Arjun",
    title: "Builder at Web Development × Artificial Intelligence",
    age: "2006-12-29", // Used to calculate age
    bio: {
        short: "I'm a passionate builder at the intersection of Web Development and Artificial Intelligence — creating impactful digital experiences and intelligent systems that are not just functional, but meaningful.",
        full: "Instead of limiting myself to a single technology label, I focus on building products that combine modern web technologies, scalable architectures, and AI-driven ideas. From designing interactive web applications to exploring machine learning and intelligent agents, I enjoy turning ideas into real-world solutions. I believe technology is not just about writing code — it's about solving problems, creating value, and pushing innovation forward."
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
                { name: "React / Next.js", level: 85 },
                { name: "Framer Motion", level: 80 },
                { name: "Tailwind CSS", level: 82 }
            ]
        },
        {
            category: "Backend",
            items: [
                { name: "Node.js", level: 78 },
                { name: "REST APIs", level: 80 },
                { name: "MongoDB", level: 72 },
                { name: "Firebase", level: 75 }
            ]
        },
        {
            category: "AI & Intelligence",
            items: [
                { name: "Python", level: 65 },
                { name: "Machine Learning", level: 50 },
                { name: "LLM Integration", level: 60 },
                { name: "Intelligent Agents", level: 45 }
            ]
        },
        {
            category: "Tools & DevOps",
            items: [
                { name: "Git / GitHub", level: 85 },
                { name: "Vercel", level: 80 },
                { name: "Docker", level: 55 },
                { name: "Linux", level: 60 }
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
