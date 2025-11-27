"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { 
  FileText, 
  Presentation, 
  BarChart3, 
  Image, 
  Video, 
  MessageSquare,
  Calendar,
  ShoppingCart,
  BookOpen,
  Lightbulb
} from "lucide-react";
import { FeatureCard } from "@/components/ui/feature-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useCases = [
  {
    icon: FileText,
    title: "文档处理",
    description: "智能生成报告、合同、邮件等各类文档，自动格式化和排版",
    scenarios: ["工作报告生成", "合同起草", "邮件撰写", "文档翻译"],
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Presentation,
    title: "演示制作",
    description: "快速创建专业PPT，智能设计布局，自动生成图表和动画",
    scenarios: ["产品发布会", "工作汇报", "培训课件", "商业提案"],
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: BarChart3,
    title: "数据分析",
    description: "智能分析数据，生成可视化报表，提供数据洞察和建议",
    scenarios: ["销售数据分析", "用户行为分析", "财务报表", "市场趋势"],
    color: "from-green-500 to-green-700",
  },
  {
    icon: Image,
    title: "内容创作",
    description: "AI生成图片、设计素材，创作社交媒体内容",
    scenarios: ["海报设计", "社交媒体配图", "产品宣传图", "品牌视觉"],
    color: "from-pink-500 to-pink-700",
  },
  {
    icon: MessageSquare,
    title: "客服助手",
    description: "7x24小时智能客服，自动回复常见问题，提升服务效率",
    scenarios: ["在线咨询", "售后支持", "FAQ解答", "订单查询"],
    color: "from-indigo-500 to-indigo-700",
  },
  {
    icon: BookOpen,
    title: "教育培训",
    description: "生成课程内容，制作学习资料，个性化学习计划",
    scenarios: ["课程设计", "习题生成", "学习计划", "知识总结"],
    color: "from-teal-500 to-teal-700",
  },

];

export default function UseCases() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRevealRef = useRef<VerticalCutRevealRef>(null);
  const descRevealRef = useRef<VerticalCutRevealRef>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // 卡片动画
      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: index * 0.05,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden relative py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
              丰富使用场景
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
                满足您的各种需求
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
              从个人办公到企业协作，从内容创作到数据分析，数字员工覆盖您工作和生活的方方面面
            </VerticalCutReveal>
          </div>
        </div>

        {/* 使用场景网格 */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => {
            return (
              <FeatureCard
                key={index}
                icon={useCase.icon}
                title={useCase.title}
                description={useCase.description}
                features={useCase.scenarios}
                color={useCase.color}
                delay={index * 0.05}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

