"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

/**
 * Wraps the public site with Navigation + Footer.
 * Hidden on admin routes — admin has its own sidebar layout.
 */
export default function PublicShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin =
    pathname.startsWith("/admin") || pathname.startsWith("/sign-in");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
