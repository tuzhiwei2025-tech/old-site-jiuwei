"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TestimonialSlider } from "@/components/21st/TestimonialSlider";
import { getAllAgents } from "@/lib/agentData";
import { Agent } from "@/types/agent";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AgentShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const titleRevealRef = useRef<VerticalCutRevealRef>(null);
  const subtitleRevealRef = useRef<VerticalCutRevealRef>(null);
  const descRevealRef = useRef<VerticalCutRevealRef>(null);
  const agents = getAllAgents();

  // 转换为Review格式，突出PPT、Office、Word专家
  const featuredAgents = agents.filter((agent: Agent) => 
    agent.title.includes("PPT") || 
    agent.title.includes("Word") || 
    agent.title.includes("Excel") ||
    agent.title.includes("Office") ||
    agent.code === "presentation_generator" ||
    agent.code === "report_generator" ||
    agent.code === "excel_generator"
  );

  // 如果没有找到，使用前6个
  const displayAgents = featuredAgents.length > 0 ? featuredAgents.slice(0, 6) : agents.slice(0, 6);

  const reviews = displayAgents.map((agent: Agent) => ({
    id: agent.code,
    name: agent.name,
    affiliation: agent.title,
    quote: agent.description,
    imageSrc: agent.pop_up_card || agent.top_card || agent.card || agent.avatar,
    thumbnailSrc: agent.avatar || agent.top_avatar || agent.card,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 触发标题动画
      if (titleRevealRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => {
            titleRevealRef.current?.startAnimation();
            setTimeout(() => subtitleRevealRef.current?.startAnimation(), 300);
            setTimeout(() => descRevealRef.current?.startAnimation(), 600);
          },
        });
      }

      // 滑块动画
      if (sliderRef.current) {
        gsap.fromTo(
          sliderRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
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
      id="agents"
      ref={sectionRef}
      className="overflow-hidden relative px-4 py-24 bg-white sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl"
          >
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
              深入了解我们的
            </VerticalCutReveal>
            <br />
            <span className="bg-gradient-to-r from-[#4932cc] via-[#6b4ce6] to-[#4932cc] bg-clip-text text-transparent">
              <VerticalCutReveal
                ref={subtitleRevealRef}
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
                专业数字员工
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
              PPT专家、Word专家、Excel专家...每个数字员工都拥有独特的专业能力和个性，探索他们的故事，找到最适合您的AI助手
            </VerticalCutReveal>
          </div>
        </div>

        {/* Testimonial Slider */}
        <div ref={sliderRef}>
          <TestimonialSlider reviews={reviews} className="bg-gradient-to-br from-gray-50 to-white" />
        </div>
      </div>
    </section>
  );
}
