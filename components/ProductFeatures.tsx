"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Users, Globe, Database, Layers, Briefcase, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StripeLikeGradientShader } from "@/components/ui/stripe-like-gradient-shader";
import SphereImageGrid, { ImageData } from "@/components/ui/img-sphere";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 数字员工头像数据 - 用于3D球体展示
const digitalEmployeeImages: ImageData[] = [
  {
    id: "aria",
    src: "https://static.goagent.store/static/Aria/%E5%A4%B4%E5%83%8F.webp",
    alt: "Aria - PPT专家",
    title: "Aria",
    description: "PPT专家"
  },
  {
    id: "lina",
    src: "https://static.goagent.store/static/Lina/%E5%A4%B4%E5%83%8F.webp",
    alt: "Lina - Word专家",
    title: "Lina",
    description: "Word专家"
  },
  {
    id: "max",
    src: "https://static.goagent.store/static/Max/%E5%A4%B4%E5%83%8F.webp",
    alt: "Max - Excel专家",
    title: "Max",
    description: "Excel专家"
  },
  {
    id: "lumi",
    src: "https://static.goagent.store/static/Lumi/%E5%A4%B4%E5%83%8F.webp",
    alt: "Lumi - 网站应用开发",
    title: "Lumi",
    description: "网站应用开发"
  },
  {
    id: "neo",
    src: "https://static.goagent.store/static/Neo/%E5%A4%B4%E5%83%8F.webp",
    alt: "Neo - 公文格式专家",
    title: "Neo",
    description: "公文格式专家"
  },
  {
    id: "vivian",
    src: "https://static.goagent.store/static/Vivian/%E5%A4%B4%E5%83%8F.webp",
    alt: "Vivian - 微信公众号写手",
    title: "Vivian",
    description: "微信公众号写手"
  },
  {
    id: "aiven",
    src: "https://static.goagent.store/static/Aiven/%E5%A4%B4%E5%83%8F.webp",
    alt: "Aiven - 信息搜集专家",
    title: "Aiven",
    description: "信息搜集专家"
  },
  {
    id: "team1",
    src: "https://static.goagent.store/static/Lumi/%E5%A4%B4%E5%83%8F.webp",
    alt: "团队协作",
    title: "团队协作",
    description: "多员工协同工作"
  },
  {
    id: "team2",
    src: "https://static.goagent.store/static/Aria/%E5%A4%B4%E5%83%8F.webp",
    alt: "跨平台部署",
    title: "跨平台",
    description: "多平台无缝集成"
  },
  {
    id: "team3",
    src: "https://static.goagent.store/static/Max/%E5%A4%B4%E5%83%8F.webp",
    alt: "多模态支持",
    title: "多模态",
    description: "文本、图像、音频"
  },
  {
    id: "team4",
    src: "https://static.goagent.store/static/Lina/%E5%A4%B4%E5%83%8F.webp",
    alt: "专业数据集",
    title: "专业数据集",
    description: "领域深度训练"
  },
  {
    id: "team5",
    src: "https://static.goagent.store/static/Neo/%E5%A4%B4%E5%83%8F.webp",
    alt: "数字团队",
    title: "数字团队",
    description: "自由组合打造"
  },
];

const features = [
  {
    icon: FileText,
    title: "PPT专家",
    description: "专业的演示文稿创作智能体，将您的想法转化为专业、美观且逻辑清晰的PPT演示文稿",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Briefcase,
    title: "Office专家",
    description: "Word、Excel、PPT全方位办公助手，提升办公效率，让工作更智能",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: FileText,
    title: "Word专家",
    description: "专注报告与文档生成，擅分析数据、梳结构，快速生成逻辑清晰、内容严谨的专业报告",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "团队协作",
    description: "多个专业数字员工组成团队，各司其职，协同工作，为您提供全方位的解决方案",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Globe,
    title: "跨平台",
    description: "支持多种平台部署，无缝集成，让AI能力在任何场景下都能发挥作用",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Sparkles,
    title: "多模态",
    description: "支持文本、图像、音频等多种模态，打造全方位的AI应用体验",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Database,
    title: "专业数据集",
    description: "基于专业数据集训练，确保每个数字员工都具备领域深度和专业能力",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Layers,
    title: "打造数字团队",
    description: "自由组合数字员工，打造专属的数字团队，让AI为您工作，效率倍增",
    gradient: "from-violet-500 to-purple-500",
  },
];

export default function ProductFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(1200);

  useEffect(() => {
    // 动态设置容器大小
    const updateContainerSize = () => {
      if (typeof window !== "undefined") {
        setContainerSize(Math.min(window.innerWidth, 1200));
      }
    };
    
    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    
    return () => window.removeEventListener("resize", updateContainerSize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题动画
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );

        // 标题滚动视差
        gsap.to(titleRef.current, {
          y: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
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
              y: 100,
              scale: 0.85,
              rotation: index % 2 === 0 ? -5 : 5,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.9,
              delay: index * 0.12,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );

          // 卡片滚动视差
          gsap.to(card, {
            y: -30,
            rotation: index % 2 === 0 ? -2 : 2,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
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
      className="overflow-hidden relative px-4 py-32 min-h-screen sm:px-6 lg:px-8"
    >
      {/* 3D Sphere Background - 数字员工展示 */}
      <div className="flex absolute inset-0 justify-center items-center pointer-events-none">
        <div className="relative mx-auto w-full max-w-6xl h-full">
          <SphereImageGrid
            images={digitalEmployeeImages}
            containerSize={containerSize}
            sphereRadius={400}
            dragSensitivity={0.3}
            momentumDecay={0.96}
            maxRotationSpeed={3}
            baseImageScale={0.08}
            hoverScale={1.3}
            perspective={2000}
            autoRotate={true}
            autoRotateSpeed={0.2}
            className="opacity-30"
          />
        </div>
      </div>

      {/* Stripe-like Gradient Shader Background */}
      <StripeLikeGradientShader 
        className="absolute inset-0 opacity-10"
        color1={{ r: 73, g: 50, b: 204 }}
        color2={{ r: 107, g: 76, b: 230 }}
        color3={{ r: 139, g: 92, b: 246 }}
        speed={0.4}
        scale={1.1}
      />
      
      {/* Additional overlays */}
      <div className="absolute inset-0 bg-gradient-to-b via-transparent from-white/60 to-white/90 -z-10" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2
            ref={titleRef}
            className="mb-6 text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
          >
            <span className="block mb-2 text-gray-900">强大的产品能力</span>
            <span className="block bg-gradient-to-r from-[#4932cc] via-[#6b4ce6] to-[#4932cc] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              让AI为您工作
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-gray-600 sm:text-2xl">
            从PPT专家到Office助手，从团队协作到跨平台部署，打造您的专属数字团队
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative border-2 border-gray-200/50 hover:border-[#4932cc] transition-all duration-500 hover:shadow-2xl hover:shadow-[#4932cc]/20 hover:-translate-y-3 bg-white/95 backdrop-blur-md overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <CardHeader className="relative z-10 pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="mb-3 text-2xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-full`} />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
