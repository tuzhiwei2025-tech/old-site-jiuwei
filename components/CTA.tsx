"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StripeLikeGradientShader } from "@/components/ui/stripe-like-gradient-shader";
import { Sparkles, Zap, Rocket, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 内容动画
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // 图标动画
      if (iconsRef.current) {
        const icons = iconsRef.current.children;
        Array.from(icons).forEach((icon, index) => {
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0, rotation: -180, y: 50 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              y: 0,
              duration: 0.8,
              delay: 0.3 + index * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );

          // 持续浮动动画
          gsap.to(icon, {
            y: -20,
            rotation: 5,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3,
          });
        });
      }

      // 按钮动画
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.children;
        Array.from(buttons).forEach((button, index) => {
          gsap.fromTo(
            button,
            { opacity: 0, y: 30, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: 0.6 + index * 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
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
      className="overflow-hidden relative px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* Stripe-like Gradient Shader Background */}
      <StripeLikeGradientShader 
        className="absolute inset-0"
        color1={{ r: 73, g: 50, b: 204 }}
        color2={{ r: 107, g: 76, b: 230 }}
        color3={{ r: 139, g: 92, b: 246 }}
        speed={0.5}
        scale={1.3}
      />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/70 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent via-white/30 -z-10" />

    </section>
  );
}
