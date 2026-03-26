"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? "bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/[0.06]" : "bg-transparent"}`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
          className="font-display font-bold text-xl tracking-tight text-[#F0F0F0] hover:text-[#00FFB2] transition-colors"
          initial={reduce ? {} : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          VG<span className="text-[#00FFB2]">.</span>
        </motion.a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.href}
              initial={reduce ? {} : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 0.1 + i * 0.07 }}
            >
              <button
                onClick={() => handleNavClick(link.href)}
                className="underline-draw text-sm font-mono text-[#6B7280] hover:text-[#F0F0F0] transition-colors"
              >
                {link.label}
              </button>
            </motion.li>
          ))}
          <motion.li
            initial={reduce ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.5 }}
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono px-4 py-1.5 rounded border border-[#00FFB2]/40 text-[#00FFB2] hover:bg-[#00FFB2]/10 transition-colors"
            >
              Resume
            </a>
          </motion.li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#F0F0F0] hover:text-[#00FFB2] transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#111118] border-b border-white/[0.06] overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm font-mono text-[#6B7280] hover:text-[#00FFB2] transition-colors w-full text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-[#00FFB2]"
                >
                  Resume ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
