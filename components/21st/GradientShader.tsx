"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GradientShaderProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

export default function GradientShader({
  className = "",
  colors = ["#4932cc", "#6b4ce6", "#8b5cf6"],
  speed = 1,
}: GradientShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gradientRef.current) {
        // 创建渐变动画
        gsap.to(gradientRef.current, {
          backgroundPosition: "200% 0%",
          duration: 5 / speed,
          repeat: -1,
          ease: "linear",
        });

        // 滚动视差效果
        gsap.to(gradientRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  const gradientString = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={gradientRef}
        className="absolute inset-0 opacity-20 blur-3xl"
        style={{
          background: gradientString,
          backgroundSize: "200% 100%",
          backgroundPosition: "0% 0%",
        }}
      />
      <div className="relative z-10">
        {/* 内容区域 */}
      </div>
    </div>
  );
}

