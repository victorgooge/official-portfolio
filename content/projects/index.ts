export type ProjectCategory = "Web" | "Systems" | "Tools" | "ML";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: ProjectCategory;
  featured: boolean;
  github?: string;
  demo?: string;
  image?: string;
  status: "complete" | "in-progress" | "archived";
}

export const projects: Project[] = [
  {
    slug: "polycapital",
    title: "PolyCapital",
    description:
      "A cross-platform fintech app with a secure backend API, JWT auth, and real-time data — available on both web and mobile.",
    longDescription:
      "Co-founded and architected a full-stack fintech application covering system design, infrastructure planning, and security strategy. Built a secure backend API with modular controllers, middleware, and JWT + bcrypt authentication. Deployed cloud-based clusters on MongoDB Atlas for scalable storage, then launched both a React web app and a React Native mobile app connected to the same API. Ported the web UI to React Native to achieve design parity and improve mobile accessibility.",
    tech: ["React", "React Native", "JavaScript", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt"],
    category: "Web",
    featured: true,
    status: "in-progress",
  },
  {
    slug: "pc-build-optimizer",
    title: "PC Build Optimizer",
    description:
      "An ML tool that recommends optimized PC builds within a user's budget using RandomForest models trained on hardware benchmark data.",
    longDescription:
      "Collaborated with teammates to build a machine learning tool that recommends optimized PC component combinations within any user-defined budget. Handled data collection and preparation — gathering hardware benchmark datasets, cleaning them, and engineering features for ML pipelines. Contributed to model validation to ensure predictions were accurate and feasible. Built with RandomForest, feature scaling, and a Streamlit UI for interactive querying.",
    tech: ["Python", "pandas", "NumPy", "Scikit-Learn", "Streamlit"],
    category: "ML",
    featured: true,
    status: "complete",
  },
  {
    slug: "marketplace-web-app",
    title: "Marketplace Web App",
    description:
      "A full-stack Django marketplace with user accounts, post management, email verification, and complete CRUD workflows.",
    longDescription:
      "Engineered a full-stack web marketplace using Django and SQLite, featuring user account creation, post listings, and transaction workflows. Built a custom authentication system with email verification to improve account security and user trust. Created dynamic views and forms to handle CRUD operations — create, edit, and delete posts — efficiently. Deployed as a standalone web application with clean URL routing and template-based rendering.",
    tech: ["Python", "Django", "HTML/CSS", "SQLite"],
    category: "Web",
    featured: false,
    status: "complete",
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    description:
      "The site you're looking at — built with Next.js, TypeScript, Tailwind CSS v4, and Framer Motion.",
    longDescription:
      "Designed from scratch around a 'Terminal Meets Editorial' aesthetic. Features scroll-triggered animations, a custom terminal easter egg, a live skills reveal, and a fully responsive single-page layout. Deployed on Vercel with zero-config CI from GitHub.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web",
    featured: false,
    github: "https://github.com/victorgooge/official-portfolio",
    status: "in-progress",
  },
];
