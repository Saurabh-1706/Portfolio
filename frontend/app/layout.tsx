import type { Metadata } from "next";
import PublicShell from "@/components/PublicShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saurabh Mojad — Full Stack AI Engineer",
  description: "Portfolio of Saurabh Mojad, building intelligent web applications with modern web technologies and AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
      lang="en"
      className="scroll-smooth antialiased overflow-x-hidden"
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface-container-lowest text-on-surface font-body-md min-h-full flex flex-col">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
