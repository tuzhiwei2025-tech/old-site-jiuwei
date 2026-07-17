"use client";

import HomepageExperience from "@/components/HomepageExperience";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

function HomeContent() {
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (!target.startsWith("/home#")) return;
    event.preventDefault();
    const id = target.split("#")[1];
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-black text-[#1d1d1f] selection:bg-black selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50">
        <SiteHeader mode="home" onNavigate={handleNavigate} onLogoClick={handleLogoClick} />
      </header>

      <HomepageExperience />

      <SiteFooter variant="home" />
    </main>
  );
}

export default function AppleStyleHome() {
  return <HomeContent />;
}
