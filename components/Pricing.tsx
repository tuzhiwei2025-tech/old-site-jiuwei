"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
              delay: index * 0.15,
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
      id="pricing"
      ref={sectionRef}
      className="relative px-4 py-24 bg-gray-50 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-gray-900">
            灵活的价格方案
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            选择最适合您需求的方案，从小型项目到企业级应用，我们都有完美的解决方案
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl border p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-[#4932cc] bg-white"
                  : "border-gray-200 bg-white"
              }`}
              style={{
                boxShadow: plan.popular
                  ? "0 32px 56px -12px rgba(73, 50, 204, 0.12), 0 6px 12px -3px rgba(0, 0, 0, 0.02), 0 3px 6px -1.5px rgba(0, 0, 0, 0.01), 0 0 0 0.75px rgba(73, 50, 204, 0.1)"
                  : "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.boxShadow =
                    "0 32px 56px -12px rgba(0, 0, 0, 0.06), 0 6px 12px -3px rgba(0, 0, 0, 0.02), 0 3px 6px -1.5px rgba(0, 0, 0, 0.01), 0 0 0 0.75px rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.borderColor = "rgba(73, 50, 204, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-[#4932cc] px-3 py-1 text-xs font-medium text-white">
                    最受欢迎
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mt-6 mb-4">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-base font-normal text-gray-500 ml-2">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-8">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-[#4932cc] mr-3 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  plan.popular
                    ? "bg-[#4932cc] text-white hover:bg-[#3d28a8] shadow-sm shadow-[#4932cc]/20"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

