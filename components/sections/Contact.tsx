"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
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
    href: "https://linkedin.com/in/victorgooge",
    desc: "victorgooge",
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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
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
            Let&apos;s talk
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {[
                { id: "name",  label: "Name",  type: "text",  placeholder: "Victor Googe"    },
                { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id} className="flex flex-col gap-1.5">
                  <label htmlFor={id} className="text-xs font-mono text-[#6B7280]">
                    {label}
                  </label>
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
                <label htmlFor="message" className="text-xs font-mono text-[#6B7280]">
                  Message
                </label>
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

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#00FFB2] text-[#0A0A0F] font-display font-semibold text-sm hover:bg-[#00e6a0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors glow-accent"
              >
                <Send size={15} />
                {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Message"}
              </button>

              {status === "error" && (
                <p className="text-xs font-mono text-red-400">
                  Something went wrong. Email me directly at {EMAIL}
                </p>
              )}
            </form>
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
