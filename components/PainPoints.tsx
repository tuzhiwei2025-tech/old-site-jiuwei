"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { 
  Clock, 
  DollarSign, 
  Users, 
  AlertCircle,
  CheckCircle2,
  Zap,
  Shield
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const painPoints = [
  {
    icon: Clock,
    title: "重复工作耗时费力",
    description: "每天花费大量时间处理重复性任务，如文档整理、数据录入、报告生成等，效率低下且容易出错",
    solution: "数字员工7x24小时自动处理重复任务，释放您的时间专注于更有价值的工作",
    color: "from-[#C6D2FF] to-[#A3B3FF]",
    solutionIcon: Zap,
  },
  {
    icon: DollarSign,
    title: "人力成本居高不下",
    description: "招聘、培训、管理员工成本高昂，且人员流动带来业务不稳定，影响企业运营效率",
    solution: "数字员工无需工资、不请假、不离职，一次投入长期使用，大幅降低人力成本",
    color: "from-[#C6D2FF] to-[#A3B3FF]",
    solutionIcon: CheckCircle2,
  },
  {
    icon: Users,
    title: "团队协作效率低",
    description: "跨部门沟通成本高，信息传递不及时，任务分配不合理，导致项目进度缓慢",
    solution: "智能团队协作，自动分配任务，实时同步进度，无缝整合成果，大幅提升协作效率",
    color: "from-[#C6D2FF] to-[#A3B3FF]",
    solutionIcon: Users,
  },
  {
    icon: AlertCircle,
    title: "数据安全风险高",
    description: "使用第三方AI服务存在数据泄露风险，企业核心信息可能被外部访问，合规性难以保障",
    solution: "支持私有化部署和一体机方案，数据完全本地化，符合行业合规要求，保障数据安全",
    color: "from-[#C6D2FF] to-[#A3B3FF]",
    solutionIcon: Shield,
  },
];

export default function PainPoints() {
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
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
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
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-[#EEF2FF] to-white overflow-hidden"
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
              为什么选择我们
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
                解决您的核心痛点
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
              我们深刻理解您在工作中遇到的挑战，并提供针对性的解决方案，让AI真正成为您的工作伙伴
            </VerticalCutReveal>
          </div>
        </div>

        {/* 痛点卡片 */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {painPoints.map((point, index) => {
            const ProblemIcon = point.icon;
            const SolutionIcon = point.solutionIcon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-[#7C86FF] transition-all duration-300 hover:shadow-xl hover:shadow-[#7C86FF]/10 bg-white border-[#E0E7FF]"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${point.color} opacity-10 blur-3xl`} />
                
                {/* 痛点部分 */}
                <CardHeader className="border-b border-gray-100 pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${point.color} shadow-lg`}>
                      <ProblemIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-gray-900">{point.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-600 leading-relaxed">
                        {point.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                {/* 解决方案部分 */}
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#7C86FF] to-[#A3B3FF] shadow-md">
                      <SolutionIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 mb-1">我们的解决方案</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {point.solution}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

