"use client";

import HomepageExperience from "@/components/HomepageExperience";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

function handleNavigate(event: React.MouseEvent<HTMLAnchorElement>, target: string) {
  if (target.startsWith("/home#")) {
    event.preventDefault();
    const id = target.split("#")[1];
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function AppleStyleHome() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#f5f5f7] text-[#1d1d1f] selection:bg-black selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50">
        <SiteHeader mode="home" onNavigate={handleNavigate} onLogoClick={handleLogoClick} />
      </header>

      <HomepageExperience />

      <SiteFooter />
    </main>
  );
}
