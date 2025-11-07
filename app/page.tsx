"use client";

import { useState } from "react";
import { ShaderBackground, HeroContent, PulsingCircle, Header } from "@/components/ui/shaders-hero-section";
import AgentShowcase from "@/components/AgentShowcase";
import Marketplace from "@/components/Marketplace";
import Solutions from "@/components/Solutions";
import Pricing from "@/components/Pricing";
import Docs from "@/components/Docs";
import DigitalTeamVideo from "@/components/DigitalTeamVideo";
import { LoginDialog } from "@/components/LoginDialog";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Shaders */}
      <ShaderBackground>
        <Header onLoginClick={() => setLoginOpen(true)} />
        <HeroContent />
        <PulsingCircle />
      </ShaderBackground>

      {/* Agent Showcase - 数字员工展示 */}
      <AgentShowcase />

      {/* Digital Team Video - 数字团队视频展示 */}
      <DigitalTeamVideo />

      {/* Marketplace - 市场 */}
      <Marketplace />

      {/* Solutions - 解决方案 */}
      <Solutions />

      {/* Pricing - 价格 */}
      <Pricing />

      {/* Docs - 文档 */}
      <Docs />

      {/* Login Dialog */}
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </main>
  );
}
