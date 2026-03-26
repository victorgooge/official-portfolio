import { Mail } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-[#6B7280]">
          © {year} Victor Googe — Built with Next.js & Tailwind
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/vgooge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#6B7280] hover:text-[#F0F0F0] transition-colors"
          >
            <GithubIcon width={17} height={17} />
          </a>
          <a
            href="https://linkedin.com/in/victorgooge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#6B7280] hover:text-[#F0F0F0] transition-colors"
          >
            <LinkedInIcon width={17} height={17} />
          </a>
          <a
            href="mailto:vgooge1@student.gsu.edu"
            aria-label="Email"
            className="text-[#6B7280] hover:text-[#00FFB2] transition-colors"
          >
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
