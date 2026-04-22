export const portfolioData = {
  coreHub: {
    title: "Naval Sood",
    subtitle: "Technical Team Lead - MERN Stack & Full-Stack Engineering",
    contact: {
      email: "hello@navalsood.in",
      linkedin: "https://linkedin.com/in/enveal"
    }
  },
  innerOrbit: [
    {
      id: "frontend",
      title: "Frontend",
      skills: ["React.js", "Next.js", "React Native", "JavaScript (ES6+)"],
      color: "#61dafb"
    },
    {
      id: "backend",
      title: "Backend",
      skills: ["Node.js", "Express.js", "Python", "GraphQL"],
      color: "#8cc84b"
    },
    {
      id: "database",
      title: "Database",
      skills: ["MongoDB", "MySQL", "PostgreSQL"],
      color: "#47a248"
    },
    {
      id: "devops",
      title: "DevOps & Architecture",
      skills: ["Docker", "CI/CD Pipelines", "Microservices Architecture", "AI/LLM Integrations"],
      color: "#0db7ed"
    }
  ],
  outerOrbit: [
    {
      id: "digimantra",
      company: "DigiMantra",
      period: "Jan 2025 - Present",
      role: "Technical Team Lead",
      details: "Architecting MERN stack products end-to-end, driving CI/CD adoption, and integrating AI/LLM-based features into product roadmaps.",
      badge: "MID Award Winner for team culture impact"
    },
    {
      id: "01synergy",
      company: "01 Synergy",
      period: "Jan 2021 - Nov 2024",
      role: "Technical Team Lead / Software Engineer",
      highlight: "Progressed from Junior Developer to Team Lead in under 3 years.",
      project: "Built an in-house React + Node.js video conferencing app with WebRTC/Video SDKs used for live product demos."
    },
    {
      id: "avishkaar",
      company: "Avishkaar",
      period: "Jul 2020 - Jan 2021",
      role: "Junior Software Developer",
      highlight: "Migrated backend from PHP to Node.js and integrated Unity WebGL simulations. Enhanced the AMS browser-based hardware simulator."
    }
  ],
  constellations: [
    {
      id: "edu1",
      title: "B.Tech in Computer Science",
      institution: "Amritsar College of Engineering & Technology",
      period: "2016-2020",
      type: "education"
    },
    {
      id: "award1",
      title: "Outstanding Performance Award",
      institution: "01 Synergy",
      period: "2022",
      type: "award"
    }
  ]
};

export type PortfolioData = typeof portfolioData;
export type InnerOrbitNode = typeof portfolioData.innerOrbit[0];
export type OuterOrbitNode = typeof portfolioData.outerOrbit[0];
export type ConstellationNode = typeof portfolioData.constellations[0];
