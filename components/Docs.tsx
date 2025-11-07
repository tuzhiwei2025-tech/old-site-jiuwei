"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code2, Video, FileText, MessageCircle, Github } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const docCategories = [
  {
    icon: BookOpen,
    title: "快速开始",
    description: "5分钟快速上手，开始使用数字员工",
    link: "#",
  },
  {
    icon: Code2,
    title: "API文档",
    description: "完整的API参考文档和示例代码",
    link: "#",
  },
  {
    icon: Video,
    title: "视频教程",
    description: "观看视频教程，快速掌握核心功能",
    link: "#",
  },
  {
    icon: FileText,
    title: "最佳实践",
    description: "学习如何构建高效的AI工作流",
    link: "#",
  },
  {
    icon: MessageCircle,
    title: "社区论坛",
    description: "与其他开发者交流经验和问题",
    link: "#",
  },
  {
    icon: Github,
    title: "开源项目",
    description: "查看我们的开源项目和贡献代码",
    link: "#",
  },
];

export default function Docs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRevealRef = useRef<VerticalCutRevealRef>(null);
  const descRevealRef = useRef<VerticalCutRevealRef>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRevealRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => {
            titleRevealRef.current?.startAnimation();
            setTimeout(() => descRevealRef.current?.startAnimation(), 300);
          },
        });
      }

      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power2.out",
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
      id="docs"
      ref={sectionRef}
      className="overflow-hidden relative px-4 py-24 bg-white sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
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
              文档与资源
            </VerticalCutReveal>
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
              全面的文档、教程和资源，帮助您快速上手并充分利用平台的所有功能
            </VerticalCutReveal>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="border-2 hover:border-[#4932cc] transition-all duration-300 hover:shadow-xl hover:shadow-[#4932cc]/10 hover:-translate-y-2 bg-white cursor-pointer group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#4932cc]/10 flex items-center justify-center mb-4 group-hover:bg-[#4932cc] transition-colors">
                    <Icon className="w-6 h-6 text-[#4932cc] group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {category.description}
                  </CardDescription>
                  <Button
                    variant="ghost"
                    className="text-[#4932cc] hover:text-[#3d28a8] hover:bg-[#4932cc]/10 p-0 h-auto"
                  >
                    了解更多 →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

