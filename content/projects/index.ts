export type ProjectCategory = "Web" | "Systems" | "Tools" | "Other";

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
    slug: "process-scheduler",
    title: "Process Scheduler Simulator",
    description:
      "A simulation of core CPU scheduling algorithms — FCFS, SJF, Round Robin, and Priority — with real-time Gantt chart visualization.",
    longDescription:
      "Built in C, this simulator implements the four foundational CPU scheduling algorithms studied in Operating Systems courses. It parses process definitions from input files, runs each algorithm, and outputs a Gantt chart alongside computed metrics: average waiting time, turnaround time, and CPU utilization. Designed to deepen understanding of OS internals and scheduling trade-offs.",
    tech: ["C", "POSIX", "Make"],
    category: "Systems",
    featured: true,
    github: "https://github.com/vgooge/process-scheduler",
    status: "complete",
  },
  {
    slug: "student-score-tracker",
    title: "Student Score Tracker",
    description:
      "A CLI tool for managing and analyzing student scores, supporting grade computation, GPA tracking, and CSV export.",
    longDescription:
      "Developed in C++, this tool reads student records from structured input, computes weighted grades per assignment category, calculates GPA, and exports reports as CSV files. Features a clean terminal UI with color-coded output and supports bulk import for large class rosters.",
    tech: ["C++", "STL", "CMake"],
    category: "Tools",
    featured: false,
    github: "https://github.com/vgooge/student-score-tracker",
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
    github: "https://github.com/vgooge/official-portfolio",
    status: "in-progress",
  },
];
