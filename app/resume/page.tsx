import type { Metadata } from "next";
import { Download } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume — Victor Googe",
  description: "View or download Victor Googe's resume.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6B7280] hover:text-[#00FFB2] transition-colors mb-8"
        >
          ← Back home
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-[#F0F0F0] mb-1">Resume</h1>
            <p className="text-xs font-mono text-[#6B7280]">Victor Googe — Last updated Spring 2026</p>
          </div>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00FFB2] text-[#0A0A0F] font-display font-semibold text-sm hover:bg-[#00e6a0] transition-colors glow-accent"
          >
            <Download size={15} />
            Download PDF
          </a>
        </div>

        {/* PDF viewer */}
        <div className="rounded-xl border border-white/[0.06] bg-[#111118] overflow-hidden">
          <iframe
            src="/resume.pdf"
            title="Victor Googe Resume"
            className="w-full"
            style={{ height: "80vh", minHeight: 600 }}
          />
        </div>

        <p className="mt-4 text-xs font-mono text-[#6B7280] text-center">
          PDF not rendering?{" "}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-[#00FFB2] hover:underline">
            Open in new tab ↗
          </a>
        </p>
      </div>
    </main>
  );
}
