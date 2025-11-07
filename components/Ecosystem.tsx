"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ecosystemFeatures = [
  {
    number: "01",
    title: "解锁 AI 新能力",
    description:
      "Marketplace 提供先进的大型语言模型，以及强大的多模态能力，能够让 AI 应用更智能。",
  },
  {
    number: "02",
    title: "打造领先的 Agents",
    description:
      "发现并集成强大的 Agent 框架和策略，构建先进的 AI Agents。",
  },
  {
    number: "03",
    title: "无缝连接与自动化",
    description:
      "抓住新增长机遇，透过窗口寻找机会。",
  },
];

export default function Ecosystem() {
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
              x: -80,
              scale: 0.95,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.2,
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
            x: -20,
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
      className="px-4 py-32 bg-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2
            ref={titleRef}
            className="mb-6 text-5xl font-bold sm:text-6xl lg:text-7xl xl:text-8xl"
            suppressHydrationWarning
          >
            以及，<br />
            <span className="bg-gradient-to-r from-[#4932cc] to-[#6b4ce6] bg-clip-text text-transparent">
              不断壮大的生态
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-4xl text-2xl leading-relaxed text-gray-600 sm:text-3xl">
            在数秒内，通过插件即时调用任意模型和工具，无需修改源代码。发现、扩展或提交插件，为社区带来更多可能。
          </p>
          <Button className="mt-12 h-14 px-10 text-lg font-semibold bg-[#4932cc] text-white hover:bg-[#3d28a8] shadow-lg shadow-[#4932cc]/30 hover:scale-105 transition-all">
            探索市场
          </Button>
        </div>

        {/* Ecosystem Features */}
        <div ref={cardsRef} className="space-y-16">
          {ecosystemFeatures.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-[#4932cc] transition-all duration-300 hover:shadow-xl hover:shadow-[#4932cc]/10 hover:-translate-x-2 p-12"
              suppressHydrationWarning
            >
              <CardHeader className="pb-8">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-3xl font-bold text-[#4932cc] mb-6">
                      {feature.number}
                    </div>
                    <CardTitle className="mb-8 text-5xl font-bold sm:text-6xl lg:text-7xl">
                      {feature.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-2xl leading-relaxed sm:text-3xl lg:text-4xl">
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

