"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, Send, CheckCircle, RotateCcw, AlertCircle } from "lucide-react";
import TextScramble from "@/components/ui/TextScramble";
import { GithubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import FadeUp from "@/components/animations/FadeUp";
import CopyButton from "@/components/ui/CopyButton";

const EMAIL = "vgooge1@student.gsu.edu";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/victorgooge",
    desc: "victorgooge",
    renderIcon: () => <GithubIcon width={15} height={15} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/victor-googe-151037268",
    desc: "victor-googe-151037268",
    renderIcon: () => <LinkedInIcon width={15} height={15} />,
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    desc: EMAIL,
    renderIcon: () => <Mail size={15} />,
  },
];

export default function Contact() {
  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const reduce = useReducedMotion();

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs font-mono text-[#00FFB2] mb-2 tracking-widest uppercase">05 // Contact</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F0F0F0] mb-3">
            <TextScramble text="Let's talk" />
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-[#6B7280] text-sm mb-14 max-w-lg">
            I&apos;m always open to discussing new opportunities, interesting projects, or just good CS conversations.
            Reach out — I respond within 24 hours.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Left — form */}
          <FadeUp delay={0.12}>
            {/* Fixed-height container so the layout doesn't jump */}
            <div className="relative min-h-[380px]">
              <AnimatePresence mode="wait">

                {/* ── SUCCESS state ── */}
                {status === "sent" && (
                  <motion.div
                    key="success"
                    initial={reduce ? {} : { opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={reduce ? {} : { opacity: 0, scale: 0.92, y: -20 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-6 rounded-xl border border-[#00FFB2]/20 bg-[#00FFB2]/5 p-8 text-center"
                  >
                    {/* Animated checkmark ring */}
                    <motion.div
                      initial={reduce ? {} : { scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                    >
                      <CheckCircle size={56} className="text-[#00FFB2]" strokeWidth={1.5} />
                    </motion.div>

                    {/* Particle burst */}
                    {!reduce && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                        {[...Array(12)].map((_, i) => (
                          <motion.span
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full bg-[#00FFB2]"
                            style={{
                              left: "50%",
                              top:  "40%",
                            }}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                            animate={{
                              x: Math.cos((i / 12) * Math.PI * 2) * (60 + Math.random() * 60),
                              y: Math.sin((i / 12) * Math.PI * 2) * (60 + Math.random() * 60),
                              opacity: 0,
                              scale: 0.2,
                            }}
                            transition={{ duration: 0.7, delay: 0.15 + i * 0.02, ease: "easeOut" }}
                          />
                        ))}
                      </div>
                    )}

                    <div>
                      <p className="font-display font-semibold text-xl text-[#F0F0F0] mb-1">Message sent!</p>
                      <p className="text-sm font-mono text-[#6B7280]">I&apos;ll get back to you within 24 hours.</p>
                    </div>

                    <motion.button
                      type="button"
                      onClick={() => setStatus("idle")}
                      whileHover={reduce ? {} : { scale: 1.04 }}
                      whileTap={reduce ? {} : { scale: 0.96 }}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-white/10 text-[#6B7280] font-mono text-xs hover:text-[#F0F0F0] hover:border-white/20 transition-colors"
                    >
                      <RotateCcw size={13} />
                      Send another
                    </motion.button>
                  </motion.div>
                )}

                {/* ── FORM state ── */}
                {status !== "sent" && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    initial={reduce ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? {} : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {[
                      { id: "name",  label: "Name",  type: "text",  placeholder: "Victor Googe"    },
                      { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                    ].map(({ id, label, type, placeholder }) => (
                      <div key={id} className="flex flex-col gap-1.5">
                        <label htmlFor={id} className="text-xs font-mono text-[#6B7280]">{label}</label>
                        <input
                          id={id}
                          name={id}
                          type={type}
                          required
                          placeholder={placeholder}
                          value={form[id as "name" | "email"]}
                          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                          className="bg-[#111118] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#6B7280]/50 font-mono focus:outline-none focus:border-[#00FFB2]/40 transition-colors"
                        />
                      </div>
                    ))}

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-mono text-[#6B7280]">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="What's on your mind?"
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="bg-[#111118] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#6B7280]/50 font-mono focus:outline-none focus:border-[#00FFB2]/40 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={reduce || status === "sending" ? {} : { scale: 1.02 }}
                      whileTap={reduce || status === "sending" ? {} : { scale: 0.97 }}
                      className="relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#00FFB2] text-[#0A0A0F] font-display font-semibold text-sm hover:bg-[#00e6a0] disabled:opacity-60 disabled:cursor-not-allowed transition-colors glow-accent overflow-hidden"
                    >
                      {/* Shimmer sweep while sending */}
                      {status === "sending" && !reduce && (
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      <Send size={15} className={status === "sending" ? "animate-pulse" : ""} />
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </motion.button>

                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-xs font-mono text-red-400"
                      >
                        <AlertCircle size={13} />
                        Something went wrong. Email me directly at {EMAIL}
                      </motion.p>
                    )}
                  </motion.form>
                )}

              </AnimatePresence>
            </div>
          </FadeUp>

          {/* Right — socials + copy */}
          <FadeUp delay={0.18}>
            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-white/[0.06] bg-[#111118] p-6">
                <p className="text-xs font-mono text-[#6B7280] mb-5 tracking-widest uppercase">Find me at</p>
                <div className="flex flex-col gap-5">
                  {socials.map(({ label, href, renderIcon, desc }) => (
                    <div key={label} className="flex items-center justify-between">
                      <a
                        href={href}
                        target={href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-[#6B7280] hover:text-[#F0F0F0] transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-[#00FFB2]/20 transition-colors">
                          {renderIcon()}
                        </span>
                        <div>
                          <p className="text-xs text-[#6B7280]">{label}</p>
                          <p className="text-sm text-[#F0F0F0] font-mono">{desc}</p>
                        </div>
                      </a>
                      {label === "Email" && <CopyButton text={EMAIL} />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#00FFB2]/10 bg-[#00FFB2]/5 p-5">
                <p className="text-sm text-[#00FFB2] font-mono leading-relaxed">
                  &gt; Currently seeking Summer 2026 internship opportunities in software engineering, systems, or web development.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
