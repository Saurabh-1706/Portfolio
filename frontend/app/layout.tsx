import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import PublicShell from "@/components/PublicShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Saurabh — Full-Stack AI Engineer",
    template: "%s | Saurabh",
  },
  description:
    "AI-powered developer portfolio. Building RAG pipelines, multi-agent workflows, and production infrastructure. Explore projects, read technical blogs, and chat with my AI assistant.",
  keywords: [
    "AI Engineer",
    "Full-Stack Developer",
    "LangChain",
    "RAG",
    "FastAPI",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Saurabh" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Saurabh — Full-Stack AI Engineer",
    description:
      "AI-powered developer portfolio with RAG chatbot, live project demos, and technical writing.",
    siteName: "saurabh.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurabh — Full-Stack AI Engineer",
    description:
      "AI-powered developer portfolio with RAG chatbot, live project demos, and technical writing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Root layout — ClerkProvider wraps everything.
 * PublicShell conditionally renders Navigation + Footer
 * only for non-admin routes (admin uses its own sidebar).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <PublicShell>{children}</PublicShell>
        </body>
      </html>
    </ClerkProvider>
  );
}
