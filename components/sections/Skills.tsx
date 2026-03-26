"use client";

import { motion, useReducedMotion } from "framer-motion";
import FadeUp       from "@/components/animations/FadeUp";
import TextScramble from "@/components/ui/TextScramble";

interface SkillGroup {
  category: string;
  skills: string[];
  accent: string;
}

const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    accent: "#00FFB2",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C#", "SQL", "HTML/CSS", "Kotlin", "XML"],
  },
  {
    category: "Frameworks & Libraries",
    accent: "#7B61FF",
    skills: ["React", "React Native", "Node.js", "Express.js", "Django", "Tailwind CSS", "Bootstrap", "Mongoose", "pandas", "NumPy", "Scikit-Learn", "pySpark"],
  },
  {
    category: "Web & APIs",
    accent: "#00FFB2",
    skills: ["REST APIs", "JWT", "bcrypt", "MongoDB Atlas", "SQLite", "Next.js", "Framer Motion"],
  },
  {
    category: "Tools & Workflow",
    accent: "#7B61FF",
    skills: ["AWS", "Git", "GitHub", "Postman", "Figma", "Android Studio", "Expo", "VS Code", "Anaconda", "Unix", "Agile", "OCI"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};
const tagVariants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="py-28 px-6 bg-[#111118]/50">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs font-mono text-[#00FFB2] mb-2 tracking-widest uppercase">02 // Skills</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F0F0F0] mb-14">
            <TextScramble text="What I work with" />
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 gap-8">
          {SKILLS.map(({ category, skills, accent }, gi) => (
            <FadeUp key={category} delay={gi * 0.08}>
              <div className="rounded-xl border border-white/[0.06] bg-[#0A0A0F] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className={`w-2 h-2 rounded-full ${accent === "#00FFB2" ? "bg-accent" : "bg-accent-alt"}`}
                  />
                  <p className={`text-xs font-mono tracking-widest uppercase ${accent === "#00FFB2" ? "text-accent" : "text-accent-alt"}`}>
                    {category}
                  </p>
                </div>

                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={reduce ? undefined : containerVariants}
                  initial={reduce ? undefined : "hidden"}
                  whileInView={reduce ? undefined : "visible"}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={reduce ? undefined : tagVariants}
                      className="text-xs font-mono px-3 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] text-[#6B7280] hover:text-[#F0F0F0] transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
