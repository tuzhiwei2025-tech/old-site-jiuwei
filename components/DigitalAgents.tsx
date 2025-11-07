"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImgSphere from "@/components/21st/ImgSphere";
import GradientShader from "@/components/21st/GradientShader";
import { getAllAgents } from "@/lib/agentData";
import { Agent } from "@/types/agent";
import { Card, CardContent } from "@/components/ui/card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DigitalAgents() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const agents = getAllAgents();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题动画
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );

        // 标题滚动视差
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

      // 卡片动画
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
              delay: index * 0.1,
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
            y: -20,
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
      className="overflow-hidden relative px-4 py-32 sm:px-6 lg:px-8"
    >
      <GradientShader className="absolute inset-0" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2
            ref={titleRef}
            className="mb-6 text-5xl font-bold sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            强大的数字员工团队
            <br />
            <span className="bg-gradient-to-r from-[#4932cc] via-[#6b4ce6] to-[#4932cc] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              让AI为您工作
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-4xl text-2xl text-gray-600 sm:text-3xl">
            每个数字员工都经过精心训练，具备专业领域的深度能力，助您高效完成各种任务
          </p>
        </div>

        {/* Agents Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12"
        >
          {agents.slice(0, 6).map((agent: Agent) => (
            <Card
              key={agent.code}
              className="border-2 hover:border-[#4932cc] transition-all duration-300 hover:shadow-xl hover:shadow-[#4932cc]/10 hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-8 lg:p-10">
                <div className="flex flex-col items-center text-center">
                  {/* 3D Avatar Sphere */}
                  <div className="relative mb-6 w-40 h-40 lg:w-48 lg:h-48">
                    <ImgSphere
                      imageUrl={agent.avatar}
                      radius={0.8}
                      speed={0.3}
                      className="w-full h-full"
                    />
                  </div>
                  
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">
                    {agent.name}
                  </h3>
                  <p className="text-base lg:text-lg text-[#4932cc] mb-4 font-medium">
                    {agent.title}
                  </p>
                  <p className="mb-6 text-base text-gray-600 lg:text-lg line-clamp-3">
                    {agent.description}
                  </p>
                  
                  <div className="flex gap-3 items-center text-sm text-gray-500 lg:text-base">
                    <span className="px-3 py-1.5 bg-gray-100 rounded-lg">
                      {agent.level}
                    </span>
                    <span className="px-3 py-1.5 bg-gray-100 rounded-lg">
                      {agent.industry}
                    </span>
                  </div>
                  
                  {agent.popularity && (
                    <div className="mt-6 text-sm text-gray-400 lg:text-base">
                      ⭐ {agent.popularity} 使用量
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

