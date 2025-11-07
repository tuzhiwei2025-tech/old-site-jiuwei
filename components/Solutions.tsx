"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Code, BarChart3 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const solutions = [
  {
    icon: Building2,
    title: "企业级解决方案",
    description: "为大型企业提供定制化的AI工作流解决方案，提升团队协作效率",
  },
  {
    icon: Users,
    title: "团队协作",
    description: "构建跨部门的数字员工团队，实现无缝协作和知识共享",
  },
  {
    icon: Code,
    title: "开发者工具",
    description: "强大的API和SDK，让开发者轻松集成AI能力到现有系统",
  },
  {
    icon: BarChart3,
    title: "数据分析",
    description: "智能数据分析助手，帮助您从海量数据中提取有价值的洞察",
  },
];

export default function Solutions() {
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
            { opacity: 0, x: -50 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="solutions"
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
              专业解决方案
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
              无论您是大型企业还是初创团队，我们都有适合您的AI解决方案，帮助您实现业务目标
            </VerticalCutReveal>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Card
                key={index}
                className="border-2 hover:border-[#4932cc] transition-all duration-300 hover:shadow-xl hover:shadow-[#4932cc]/10 p-8 bg-gradient-to-br from-white to-gray-50"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#4932cc] to-[#6b4ce6] flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-4">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    {solution.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

