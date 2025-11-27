"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Users, Code, BarChart3, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const solutions = [
  {
    icon: Building2,
    title: "企业级解决方案",
    description: "为大型企业提供定制化的AI工作流解决方案，提升团队协作效率",
    features: ["定制化部署", "专属支持", "SLA保障"],
  },
  {
    icon: Users,
    title: "团队协作",
    description: "构建跨部门的数字员工团队，实现无缝协作和知识共享",
    features: ["多角色协作", "知识库管理", "权限控制"],
  },
  {
    icon: Code,
    title: "开发者工具",
    description: "强大的API和SDK，让开发者轻松集成AI能力到现有系统",
    features: ["RESTful API", "SDK支持", "Webhook集成"],
  },
  {
    icon: BarChart3,
    title: "数据分析",
    description: "智能数据分析助手，帮助您从海量数据中提取有价值的洞察",
    features: ["实时分析", "可视化报表", "智能预测"],
  },
];

export default function Solutions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      id="solutions"
      ref={sectionRef}
      className="relative px-4 py-24 bg-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-gray-900">
            专业解决方案
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            无论您是大型企业还是初创团队，我们都有适合您的AI解决方案，帮助您实现业务目标
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-300"
                style={{
                  boxShadow:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 32px 56px -12px rgba(0, 0, 0, 0.06), 0 6px 12px -3px rgba(0, 0, 0, 0.02), 0 3px 6px -1.5px rgba(0, 0, 0, 0.01), 0 0 0 0.75px rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.borderColor = "rgba(73, 50, 204, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 group-hover:bg-[#4932cc]/5 transition-colors">
                    <Icon className="h-6 w-6 text-[#4932cc]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {solution.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-500">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#4932cc] mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="inline-flex items-center text-sm font-medium text-[#4932cc] hover:text-[#3d28a8] transition-colors group/btn">
                      了解更多
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

