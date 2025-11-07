"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Logo {
  name: string;
  logo?: string;
  imageUrl?: string;
}

interface LogoCloudProps {
  logos: Logo[];
  className?: string;
}

export default function LogoCloud({ logos, className = "" }: LogoCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (logosRef.current) {
        const logoElements = logosRef.current.children;
        
        // 创建无限滚动动画
        gsap.to(logoElements, {
          x: (i) => (i % 2 === 0 ? -100 : 100),
          duration: 20,
          repeat: -1,
          ease: "none",
        });

        // 滚动触发动画
        gsap.fromTo(
          Array.from(logoElements),
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div className="flex gap-8 md:gap-12 items-center justify-center">
        <div
          ref={logosRef}
          className="flex items-center gap-8 md:gap-12 animate-scroll"
        >
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              {logo.imageUrl ? (
                <img
                  src={logo.imageUrl}
                  alt={logo.name}
                  className="h-8 md:h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-gray-400 text-lg font-semibold hover:text-gray-600 transition-colors">
                  {logo.logo || logo.name}
                </span>
              )}
            </div>
          ))}
          {/* 重复一次以实现无缝滚动 */}
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}-duplicate`}
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              {logo.imageUrl ? (
                <img
                  src={logo.imageUrl}
                  alt={logo.name}
                  className="h-8 md:h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-gray-400 text-lg font-semibold hover:text-gray-600 transition-colors">
                  {logo.logo || logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

