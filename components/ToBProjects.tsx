"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { Building2, Shield, Database, Cloud, Users, BarChart3, Lock, Zap } from "lucide-react";
import { FeatureCard } from "@/components/ui/feature-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const tobProjects = [
  {
    title: "企业智能办公平台",
    description: "为大型企业提供定制化的AI办公解决方案，集成多个数字员工，实现跨部门高效协作",
    icon: Building2,
    features: ["私有化部署", "数据安全保障", "定制化工作流", "专属技术支持"],
    color: "from-blue-500 to-blue-700",
    image: "/images/tob-office.jpg",
  },
  {
    title: "金融数据分析系统",
    description: "专业的金融数据分析平台，智能处理海量交易数据，生成实时分析报告和风险预警",
    icon: BarChart3,
    features: ["实时数据处理", "智能风险分析", "可视化报表", "合规性保障"],
    color: "from-green-500 to-green-700",
    image: "/images/tob-finance.jpg",
  },
  {
    title: "医疗信息管理系统",
    description: "医疗行业专用AI助手，协助处理病历管理、报告生成、数据分析等专业任务",
    icon: Database,
    features: ["病历智能管理", "报告自动生成", "数据隐私保护", "行业合规认证"],
    color: "from-purple-500 to-purple-700",
    image: "/images/tob-medical.jpg",
  },
  {
    title: "制造业生产优化",
    description: "智能制造解决方案，通过AI分析生产数据，优化生产流程，提升生产效率",
    icon: Zap,
    features: ["生产数据分析", "流程优化建议", "质量预测", "设备维护预警"],
    color: "from-orange-500 to-orange-700",
    image: "/images/tob-manufacturing.jpg",
  },
];

const tobFeatures = [
  {
    icon: Shield,
    title: "企业级安全",
    description: "端到端加密，符合行业安全标准，保障企业数据安全",
  },
  {
    icon: Cloud,
    title: "灵活部署",
    description: "支持公有云、私有云、混合云多种部署方式，满足不同需求",
  },
  {
    icon: Users,
    title: "专属支持",
    description: "7x24小时专属技术支持，快速响应企业需求",
  },
  {
    icon: Lock,
    title: "数据隔离",
    description: "完全的数据隔离机制，确保企业数据不被泄露",
  },
];

export default function ToBProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRevealRef = useRef<VerticalCutRevealRef>(null);
  const descRevealRef = useRef<VerticalCutRevealRef>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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

      // 项目卡片动画
      const projectCards = projectsRef.current?.children;
      if (projectCards) {
        Array.from(projectCards).forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
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

      // 特性卡片动画
      const featureCards = featuresRef.current?.children;
      if (featureCards) {
        Array.from(featureCards).forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: featuresRef.current,
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
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
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
              企业级解决方案
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
                为大型企业量身定制
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
              专业的ToB服务，为各行业企业提供定制化的AI智能体解决方案，助力企业数字化转型
            </VerticalCutReveal>
          </div>
        </div>

        {/* 项目展示 */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {tobProjects.map((project, index) => {
            return (
              <FeatureCard
                key={index}
                icon={project.icon}
                title={project.title}
                description={project.description}
                features={project.features}
                color={project.color}
                delay={index * 0.15}
              />
            );
          })}
        </div>

        {/* 核心特性 */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            企业级核心优势
          </h3>
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {tobFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-[#4932cc] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4932cc] to-[#6b4ce6] flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

