import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://victorgooge.vercel.app";

export const metadata: Metadata = {
  title: "Victor Googe — CS Student & Developer",
  description:
    "Personal portfolio of Victor Googe, a CS student at Georgia State University specializing in systems programming and web development. Open to Summer 2026 internships.",
  keywords: ["Victor Googe", "portfolio", "CS student", "Georgia State University", "software developer", "web engineer"],
  authors: [{ name: "Victor Googe" }],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Victor Googe — CS Student & Developer",
    description: "Systems programmer. Web engineer. CS @ Georgia State University.",
    url: BASE_URL,
    siteName: "Victor Googe",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Victor Googe — Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Googe — CS Student & Developer",
    description: "Systems programmer. Web engineer. CS @ Georgia State University.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
