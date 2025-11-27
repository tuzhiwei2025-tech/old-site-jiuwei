"use client";

import { useState } from "react";
import { ShaderBackground, HeroContent, PulsingCircle, Header } from "@/components/ui/shaders-hero-section";
import AgentShowcase from "@/components/AgentShowcase";
import Marketplace from "@/components/Marketplace";
import Solutions from "@/components/Solutions";
import DigitalTeamVideo from "@/components/DigitalTeamVideo";
import TeamWorkflowAnimation from "@/components/TeamWorkflowAnimation";
import ToBProjects from "@/components/ToBProjects";
import AllInOneDeployment from "@/components/AllInOneDeployment";
import UseCases from "@/components/UseCases";
import PainPoints from "@/components/PainPoints";
import ComparisonTable from "@/components/ComparisonTable";
import About from "@/components/About";
import UserStories from "@/components/UserStories";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
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

      {/* Team Workflow Animation - 团队协作流程图 */}
      <TeamWorkflowAnimation />

      {/* User Stories - 用户故事案例 */}
      <UserStories />

      {/* Use Cases - 使用场景（ToC导向） */}
      <UseCases />

      {/* Pain Points - 痛点模块（Why Us） */}
      <PainPoints />

      {/* Marketplace - 市场 */}
      <Marketplace />

      {/* ToB Projects - 企业级解决方案 */}
      <ToBProjects />

      {/* All In One Deployment - 一体机部署方案 */}
      <AllInOneDeployment />

      {/* Comparison Table - 优势对比 */}
      <ComparisonTable />

      {/* Solutions - 解决方案 */}
      <Solutions />

      {/* About - 公司信息 */}
      <About />

      {/* Partners - 合作伙伴 */}
      <Partners />

      {/* Footer - 页脚 */}
      <Footer />

      {/* Login Dialog */}
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </main>
  );
}
