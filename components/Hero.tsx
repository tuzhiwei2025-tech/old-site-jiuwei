"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Sparkles, Zap } from "lucide-react";
import { StripeLikeGradientShader } from "@/components/ui/stripe-like-gradient-shader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 徽章动画
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          delay: 0.2
        }
      );
      
      // 标题动画
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.2, 
          delay: 0.4, 
          ease: "power3.out" 
        }
      );
      
      // 副标题动画
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          delay: 0.8, 
          ease: "power3.out" 
        }
      );
      
      // 按钮动画
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1, 
          delay: 1.2, 
          ease: "back.out(1.7)" 
        }
      );

      // 图标动画
      if (iconsRef.current) {
        const icons = iconsRef.current.children;
        Array.from(icons).forEach((icon, index) => {
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0, rotation: -180 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              delay: 1.4 + index * 0.15,
              ease: "back.out(1.7)",
            }
          );

          // 持续浮动动画
          gsap.to(icon, {
            y: -15,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      // 标题滚动视差
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: -80,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="flex overflow-hidden relative justify-center items-center px-4 pt-20 pb-32 min-h-screen sm:px-6 lg:px-8"
    >
      {/* Stripe-like Gradient Shader Background */}
      <StripeLikeGradientShader 
        className="absolute inset-0"
        color1={{ r: 73, g: 50, b: 204 }}
        color2={{ r: 107, g: 76, b: 230 }}
        color3={{ r: 139, g: 92, b: 246 }}
        speed={0.3}
        scale={1.2}
      />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent via-white/20 -z-10" />

   
    </section>
  );
}
