"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { Zap, Users, Shield, Database, Code, Sparkles } from "lucide-react";
import { ComparisonTable as ComparisonTableComponent } from "@/components/ui/comparison-table";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const comparisonFeatures = [
  {
    feature: "专业数字员工",
    description: "针对特定领域训练的AI助手",
    ourProduct: true,
    chatgpt: false,
    otherAI: false,
    icon: Users,
  },
  {
    feature: "团队协作能力",
    description: "多个AI员工协同工作",
    ourProduct: true,
    chatgpt: false,
    otherAI: false,
    icon: Users,
  },
  {
    feature: "私有化部署",
    description: "支持本地部署，数据安全",
    ourProduct: true,
    chatgpt: false,
    otherAI: "部分支持",
    icon: Shield,
  },
  {
    feature: "一体机方案",
    description: "硬件+软件一体化解决方案",
    ourProduct: true,
    chatgpt: false,
    otherAI: false,
    icon: Database,
  },
  {
    feature: "API集成",
    description: "丰富的API和SDK支持",
    ourProduct: true,
    chatgpt: true,
    otherAI: true,
    icon: Code,
  },
  {
    feature: "知识库管理",
    description: "企业知识库构建和管理",
    ourProduct: true,
    chatgpt: "基础支持",
    otherAI: "部分支持",
    icon: Database,
  },
  {
    feature: "工作流自动化",
    description: "可视化工作流设计",
    ourProduct: true,
    chatgpt: false,
    otherAI: "部分支持",
    icon: Zap,
  },
  {
    feature: "行业合规",
    description: "符合金融、医疗等行业规范",
    ourProduct: true,
    chatgpt: false,
    otherAI: false,
    icon: Shield,
  },
  {
    feature: "定制化开发",
    description: "根据企业需求定制",
    ourProduct: true,
    chatgpt: false,
    otherAI: "部分支持",
    icon: Sparkles,
  },
];

export default function ComparisonTable() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRevealRef = useRef<VerticalCutRevealRef>(null);
  const descRevealRef = useRef<VerticalCutRevealRef>(null);
  const tableRef = useRef<HTMLDivElement>(null);

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

      // 表格行动画
      const rows = tableRef.current?.querySelectorAll("tbody tr");
      if (rows) {
        Array.from(rows).forEach((row, index) => {
          gsap.fromTo(
            row,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: index * 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 90%",
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
              产品优势对比
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
                为什么选择我们
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
              与ChatGPT和其他AI工具相比，我们提供更专业、更安全、更适合企业使用的解决方案
            </VerticalCutReveal>
          </div>
        </div>

        {/* 对比表格 */}
        <div ref={tableRef}>
          <ComparisonTableComponent features={comparisonFeatures} />
        </div>

        {/* 核心优势说明 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">专业专注</h3>
            </div>
            <p className="text-sm text-gray-600">
              针对不同行业和场景训练的专业数字员工，比通用AI更懂您的业务
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-500">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">安全可靠</h3>
            </div>
            <p className="text-sm text-gray-600">
              支持私有化部署，数据完全本地化，符合行业合规要求
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-green-500">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">高效协作</h3>
            </div>
            <p className="text-sm text-gray-600">
              多个数字员工智能协作，自动化工作流，大幅提升工作效率
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

