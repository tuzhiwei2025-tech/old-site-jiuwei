"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Code2, Video, FileText, MessageCircle, Github, ArrowRight } from "lucide-react";

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
              delay: index * 0.08,
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
      className="relative px-4 py-24 bg-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-gray-900">
            文档与资源
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            全面的文档、教程和资源，帮助您快速上手并充分利用平台的所有功能
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {docCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <a
                key={index}
                href={category.link}
                className="group relative bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 block"
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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-[#4932cc]/5 transition-colors">
                    <Icon className="h-5 w-5 text-[#4932cc]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1.5 group-hover:text-[#4932cc] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="inline-flex items-center text-sm font-medium text-[#4932cc] group-hover:text-[#3d28a8] transition-colors">
                      了解更多
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

