"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pricingPlans = [
  {
    name: "免费版",
    price: "¥0",
    period: "永久免费",
    description: "适合个人用户和小型项目",
    features: [
      "基础数字员工",
      "每月100次调用",
      "社区支持",
      "基础插件访问",
    ],
    cta: "开始使用",
    popular: false,
  },
  {
    name: "专业版",
    price: "¥299",
    period: "每月",
    description: "适合中小型团队",
    features: [
      "所有数字员工",
      "每月10,000次调用",
      "优先支持",
      "所有插件访问",
      "API访问",
      "自定义工作流",
    ],
    cta: "立即订阅",
    popular: true,
  },
  {
    name: "企业版",
    price: "定制",
    period: "按需",
    description: "适合大型企业",
    features: [
      "无限调用",
      "专属支持",
      "定制开发",
      "私有部署",
      "SLA保证",
      "专属客户经理",
    ],
    cta: "联系销售",
    popular: false,
  },
];

export default function Pricing() {
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
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
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
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="overflow-hidden relative px-4 py-24 bg-gradient-to-b from-gray-50 to-white sm:px-6 lg:px-8"
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
              灵活的价格方案
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
              选择最适合您需求的方案，从小型项目到企业级应用，我们都有完美的解决方案
            </VerticalCutReveal>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                plan.popular
                  ? "border-[#4932cc] shadow-lg shadow-[#4932cc]/20 bg-gradient-to-br from-white to-[#4932cc]/5"
                  : "border-gray-200 hover:border-[#4932cc] bg-white"
              }`}
            >
              <CardHeader className="text-center pb-8">
                {plan.popular && (
                  <div className="mb-4">
                    <span className="px-3 py-1 text-sm font-semibold text-[#4932cc] bg-[#4932cc]/10 rounded-full">
                      最受欢迎
                    </span>
                  </div>
                )}
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                  )}
                </div>
                <CardDescription className="mt-4 text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-[#4932cc] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full h-12 text-base font-semibold ${
                    plan.popular
                      ? "bg-[#4932cc] text-white hover:bg-[#3d28a8]"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

