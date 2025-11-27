"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { Server, Cpu, HardDrive, Network, Shield, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const deploymentFeatures = [
  {
    icon: Server,
    title: "一体化硬件",
    description: "预装所有必要软件和AI模型，开箱即用，无需复杂配置",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Cpu,
    title: "高性能计算",
    description: "搭载专业AI加速芯片，支持大规模并发处理，响应速度快",
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: HardDrive,
    title: "本地化部署",
    description: "数据完全本地存储，无需联网，保障数据安全和隐私",
    color: "from-green-500 to-green-700",
  },
  {
    icon: Network,
    title: "内网集成",
    description: "轻松接入企业内网，与现有系统无缝集成，统一管理",
    color: "from-orange-500 to-orange-700",
  },
];

const advantages = [
  {
    icon: Shield,
    title: "数据安全",
    description: "数据完全本地化，不经过外部网络，确保企业核心数据安全",
  },
  {
    icon: Zap,
    title: "快速响应",
    description: "本地部署，无需网络延迟，响应速度更快，体验更流畅",
  },
  {
    icon: CheckCircle2,
    title: "稳定可靠",
    description: "不受网络波动影响，7x24小时稳定运行，保障业务连续性",
  },
];

export default function AllInOneDeployment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRevealRef = useRef<VerticalCutRevealRef>(null);
  const descRevealRef = useRef<VerticalCutRevealRef>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          titleRevealRef.current?.startAnimation();
          setTimeout(() => descRevealRef.current?.startAnimation(), 300);
        },
      });

      // 特性卡片动画
      const featureCards = featuresRef.current?.children;
      if (featureCards) {
        Array.from(featureCards).forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // 优势卡片动画
      const advantageCards = advantagesRef.current?.children;
      if (advantageCards) {
        Array.from(advantageCards).forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: advantagesRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            <VerticalCutReveal
              ref={titleRevealRef}
              splitBy="words"
              staggerDuration={0.12}
              staggerFrom="first"
              autoStart={false}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 22,
              }}
              containerClassName="block"
              wordLevelClassName="inline-block"
            >
              一体机部署方案
            </VerticalCutReveal>
            <br />
            <span className="bg-gradient-to-r from-[#4932cc] via-[#6b4ce6] to-[#4932cc] bg-clip-text text-transparent">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.12}
                staggerFrom="first"
                autoStart={false}
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 22,
                }}
                containerClassName="inline-block"
                wordLevelClassName="inline-block"
              >
                开箱即用，安全可靠
              </VerticalCutReveal>
            </span>
          </h2>
          <div className="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
            <VerticalCutReveal
              ref={descRevealRef}
              splitBy="words"
              staggerDuration={0.08}
              staggerFrom="first"
              autoStart={false}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 22,
              }}
              containerClassName="block"
              wordLevelClassName="inline-block"
            >
              专为对数据安全有高要求的企业设计，提供硬件+软件一体化解决方案，数据完全本地化，保障企业核心数据安全
            </VerticalCutReveal>
          </div>
        </div>

        {/* 核心特性 */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {deploymentFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-[#4932cc] transition-all duration-300 hover:shadow-xl hover:shadow-[#4932cc]/10 bg-white"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 blur-3xl`} />
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                      <CardDescription className="text-base text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* 核心优势 */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            为什么选择一体机部署
          </h3>
          <div ref={advantagesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-xl bg-white border border-gray-200 hover:border-[#4932cc] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4932cc] to-[#6b4ce6] flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-900">{advantage.title}</h4>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 部署示意图 */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">部署架构示意</h3>
            <p className="text-gray-600">简单直观的部署方式，无需专业技术团队</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#4932cc] to-[#6b4ce6] flex items-center justify-center shadow-lg">
                <Server className="w-12 h-12 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-700">一体机设备</p>
            </div>
            <div className="text-4xl text-gray-400">→</div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg">
                <Network className="w-12 h-12 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-700">企业内网</p>
            </div>
            <div className="text-4xl text-gray-400">→</div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-700">即开即用</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

