"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing silently
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : `Copy ${text}`}
      className={`inline-flex items-center gap-1.5 text-sm text-[#6B7280] transition-colors hover:text-[#00FFB2] focus-visible:text-[#00FFB2] ${className}`}
    >
      {copied ? (
        <>
          <Check size={14} className="text-[#00FFB2]" />
          <span className="text-[#00FFB2]">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
