"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const capabilities = [
  {
    title: "你的数据一键接入 LLM，即刻可用",
    description:
      "从多样化数据源提取、转化数据，构建索引存入向量数据库，为大型语言模型提供最佳数据准备。",
    icon: "📊",
  },
  {
    title: "原生集成 MCP，AI 能力互联互通",
    description:
      "通过标准化的 MCP 协议访问外部 API、数据库和服务，告别复杂集成和维护。支持带有预授权和免授权模式的基于 HTTP 的 MCP 服务（协议 2025-03-26）。",
    icon: "🔗",
  },
  {
    title: "发布为 MCP 服务，AI 能力跨平台",
    description:
      "将你在 GoAgent 中构建的工作流或 Agent 发布为标准 MCP 服务，使其可在无限数量的 MCP 客户端中访问。",
    icon: "🌍",
  },
  {
    title: "强大的扩展能力",
    description:
      "使用丰富的插件，即可扩展 AI 应用的能力。",
    icon: "🛠️",
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题视差效果
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.to(titleRef.current, {
          y: -40,
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
              delay: index * 0.15,
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
            y: -30,
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
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
          >
            全球大型语言模型、RAG 检索、丰富的工具、Agent 策略等，为你的AI应用注入超强动力
          </h2>
        </div>

        {/* Capabilities Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {capabilities.map((capability, index) => (
            <Card
              key={index}
              className="border-2 hover:border-[#4932cc] transition-all duration-300 hover:shadow-xl hover:shadow-[#4932cc]/10 hover:-translate-y-2"
            >
              <CardHeader>
                <div className="text-5xl mb-4">{capability.icon}</div>
                <CardTitle className="text-2xl mb-3">
                  {capability.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  {capability.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

