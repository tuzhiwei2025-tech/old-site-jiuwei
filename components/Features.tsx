"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    title: "分秒之内，构建强大工作流",
    description:
      "通过可视化拖拽操作，让你直观构建灵活高效的 AI 应用和工作流。",
    icon: "⚡",
  },
  {
    title: "无缝接入全球大模型",
    description:
      "全面支持接入全球各类开源和闭源的大型语言模型，便于你轻松访问、自由切换并对比不同模型的性能。",
    icon: "🌐",
  },
  {
    title: "一键发布",
    description:
      "无需处理后端复杂性，多种发布选项满足你的不同需求。",
    icon: "🚀",
  },
  {
    title: "分享与共建",
    description:
      "支持工作流的组合和嵌套使用，促进社区共享与团队协作。",
    icon: "🤝",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题视差效果
      const titleElement = sectionRef.current?.querySelector("h2");
      if (titleElement) {
        gsap.to(titleElement, {
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 80,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );

          // 卡片滚动视差
          gsap.to(card, {
            y: -20,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            将 AI 创意变为现实，
            <br />
            <span className="bg-gradient-to-r from-[#4932cc] to-[#6b4ce6] bg-clip-text text-transparent">
              实现从构想到生产的飞跃
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-[#4932cc] transition-all duration-300 hover:shadow-xl hover:shadow-[#4932cc]/10 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

