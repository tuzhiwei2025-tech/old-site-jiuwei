"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { Target, Eye, Users, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Timeline } from "@/components/ui/timeline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  {
    icon: Target,
    title: "专业",
    description: "深耕AI领域，专注为企业提供专业的数字员工解决方案",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Heart,
    title: "创新",
    description: "持续创新，用最前沿的AI技术赋能企业数字化转型",
    color: "from-pink-500 to-pink-700",
  },
  {
    icon: Users,
    title: "协作",
    description: "与客户深度协作，共同打造最适合的AI解决方案",
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: Award,
    title: "卓越",
    description: "追求卓越品质，确保每一个产品都达到企业级标准",
    color: "from-amber-500 to-amber-700",
  },
];

const milestones = [
  {
    year: "2024",
    title: "公司成立",
    description: "专注于AI数字员工领域，开启企业智能化新征程",
  },
  {
    year: "2024",
    title: "产品发布",
    description: "推出首个数字员工平台，获得市场广泛认可",
  },
  {
    year: "2024",
    title: "企业合作",
    description: "与多家知名企业达成合作，服务覆盖多个行业",
  },
  {
    year: "2025",
    title: "持续发展",
    description: "持续创新，推出更多专业数字员工和行业解决方案",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRevealRef = useRef<VerticalCutRevealRef>(null);
  const descRevealRef = useRef<VerticalCutRevealRef>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

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

      // 价值观卡片动画
      const valueCards = valuesRef.current?.children;
      if (valueCards) {
        Array.from(valueCards).forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // 使命愿景动画
      if (missionRef.current) {
        gsap.fromTo(
          missionRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: missionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-[#EEF2FF] to-white overflow-hidden"
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
              关于我们
            </VerticalCutReveal>
            <br />
            <span className="bg-gradient-to-r from-[#7C86FF] via-[#A3B3FF] to-[#7C86FF] bg-clip-text text-transparent">
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
                让AI成为您最得力的工作伙伴
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
              我们是一家专注于AI数字员工领域的创新公司，致力于为企业提供专业、安全、高效的AI智能体解决方案
            </VerticalCutReveal>
          </div>
        </div>

        {/* 公司简介 */}
        <div ref={missionRef} className="mb-20">
          <Card className="border-2 border-[#E0E7FF] bg-gradient-to-br from-white to-[#EEF2FF]">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <div>
                  <div className="flex gap-3 items-center mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#7C86FF] to-[#A3B3FF]">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">我们的使命</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-600">
                    通过AI技术赋能企业，让每个企业都能拥有专业的数字员工团队，提升工作效率，降低运营成本，推动企业数字化转型。
                  </p>
                </div>
                <div>
                  <div className="flex gap-3 items-center mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#A3B3FF] to-[#7C86FF]">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">我们的愿景</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-600">
                    成为全球领先的AI数字员工平台，让AI真正成为企业最得力的工作伙伴，让智能工作成为每个企业的标配。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 核心价值观 */}
        <div className="mb-20">
          <h3 className="mb-12 text-3xl font-bold text-center text-gray-900">核心价值观</h3>
          <div ref={valuesRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="text-center border-2 hover:border-[#4932cc] transition-all duration-300 hover:shadow-lg bg-white"
                >
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="mb-2 text-xl font-semibold text-gray-900">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 发展历程 */}
        <div className="mb-12">
          <h3 className="mb-12 text-3xl font-bold text-center text-gray-900">发展历程</h3>
          <Timeline items={milestones} />
        </div>

      </div>
    </section>
  );
}

