"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 不同的占位视频URL - 可以使用实际的视频URL替换
const videoUrls = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
];

// 边框资源 - 创建更美观的边框SVG
const cornerSVG = "data:image/svg+xml,%3Csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L64 0 L64 64 L0 64 Z' fill='none' stroke='%234932cc' stroke-width='3'/%3E%3Cpath d='M0 0 L20 0 L0 20 Z' fill='%234932cc'/%3E%3C/svg%3E";
const edgeHorizontalSVG = "data:image/svg+xml,%3Csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='32' x2='64' y2='32' stroke='%234932cc' stroke-width='3'/%3E%3C/svg%3E";
const edgeVerticalSVG = "data:image/svg+xml,%3Csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='32' y1='0' x2='32' y2='64' stroke='%234932cc' stroke-width='3'/%3E%3C/svg%3E";

const frames = [
  {
    id: 1,
    video: videoUrls[0],
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: cornerSVG,
    edgeHorizontal: edgeHorizontalSVG,
    edgeVertical: edgeVerticalSVG,
    mediaSize: 1.1,
    borderThickness: 8,
    borderSize: 90,
    isHovered: false,
    label: "PPT专家",
    description: "专业的演示文稿制作助手，智能排版与设计",
  },
  {
    id: 2,
    video: videoUrls[1],
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: cornerSVG,
    edgeHorizontal: edgeHorizontalSVG,
    edgeVertical: edgeVerticalSVG,
    mediaSize: 1.1,
    borderThickness: 8,
    borderSize: 90,
    isHovered: false,
    label: "Word专家",
    description: "智能文档编辑与格式化，高效协作办公",
  },
  {
    id: 3,
    video: videoUrls[2],
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: cornerSVG,
    edgeHorizontal: edgeHorizontalSVG,
    edgeVertical: edgeVerticalSVG,
    mediaSize: 1.1,
    borderThickness: 8,
    borderSize: 90,
    isHovered: false,
    label: "Excel专家",
    description: "数据分析与表格处理，智能公式与图表",
  },
  {
    id: 4,
    video: videoUrls[3],
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: cornerSVG,
    edgeHorizontal: edgeHorizontalSVG,
    edgeVertical: edgeVerticalSVG,
    mediaSize: 1.1,
    borderThickness: 8,
    borderSize: 90,
    isHovered: false,
    label: "Office团队",
    description: "完整的办公套件协作，无缝集成工作流",
  },
  {
    id: 5,
    video: videoUrls[4],
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: cornerSVG,
    edgeHorizontal: edgeHorizontalSVG,
    edgeVertical: edgeVerticalSVG,
    mediaSize: 1.1,
    borderThickness: 8,
    borderSize: 90,
    isHovered: false,
    label: "团队协作",
    description: "跨部门无缝协作场景，实时同步与沟通",
  },
  {
    id: 6,
    video: videoUrls[5],
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: cornerSVG,
    edgeHorizontal: edgeHorizontalSVG,
    edgeVertical: edgeVerticalSVG,
    mediaSize: 1.1,
    borderThickness: 8,
    borderSize: 90,
    isHovered: false,
    label: "跨平台部署",
    description: "多平台统一管理，云端同步与备份",
  },
  {
    id: 7,
    video: videoUrls[6],
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: cornerSVG,
    edgeHorizontal: edgeHorizontalSVG,
    edgeVertical: edgeVerticalSVG,
    mediaSize: 1.1,
    borderThickness: 8,
    borderSize: 90,
    isHovered: false,
    label: "数据分析",
    description: "智能数据洞察场景，可视化报表生成",
  },
  {
    id: 8,
    video: videoUrls[7],
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: cornerSVG,
    edgeHorizontal: edgeHorizontalSVG,
    edgeVertical: edgeVerticalSVG,
    mediaSize: 1.1,
    borderThickness: 8,
    borderSize: 90,
    isHovered: false,
    label: "内容创作",
    description: "AI驱动的创意生成，多模态内容制作",
  },
  {
    id: 9,
    video: videoUrls[8],
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: cornerSVG,
    edgeHorizontal: edgeHorizontalSVG,
    edgeVertical: edgeVerticalSVG,
    mediaSize: 1.1,
    borderThickness: 8,
    borderSize: 90,
    isHovered: false,
    label: "自动化流程",
    description: "智能工作流自动化，提升效率与准确性",
  },
];

export default function DigitalTeamVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRevealRef = useRef<VerticalCutRevealRef>(null);
  const subtitleRevealRef = useRef<VerticalCutRevealRef>(null);
  const descRevealRef = useRef<VerticalCutRevealRef>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden relative py-24 bg-gradient-to-b from-white to-gray-50"
    >
      {/* 标题区域 - 有内边距 */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              强大的数字员工
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
                打造您的专属数字团队
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
              每个数字员工都拥有独特的专业能力和个性，从PPT专家到Office助手，从团队协作到跨平台部署，让AI为您工作，助您高效完成各种任务
            </VerticalCutReveal>
          </div>
        </div>
      </div>

      {/* Video Grid Layout - 宽度铺满，无内边距 */}
      <div className="w-full h-[600px] lg:h-[800px] bg-gradient-to-br from-gray-50 to-white">
        <DynamicFrameLayout
          frames={frames}
          showFrames={true}
          hoverSize={6}
          gapSize={4}
          className="w-full h-full"
        />
      </div>
    </section>
  );
}

