"use client";

import { useEffect, useRef, useState } from "react";
import { BrainCircuit, Database, Network, Route, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ArchitectureLayer = {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: keyof typeof iconMap;
};

const iconMap = {
  sparkles: Sparkles,
  database: Database,
  memory: BrainCircuit,
  context: Network,
  routing: Route,
} satisfies Record<string, LucideIcon>;

const layers: ArchitectureLayer[] = [
  { id: "skills", label: "Layer 5", title: "Skills 仓库", description: "内置数据爬取、Prompt 优化、代码转 Office、文档解析等核心技能，通过 Function Call 动态组合复杂任务。", icon: "sparkles" },
  { id: "godata", label: "Layer 4", title: "GoData 向量知识库", description: "三种检索模式并行，知识更新分钟级响应，给数字员工真正属于企业的专业大脑。", icon: "database" },
  { id: "memory", label: "Layer 3", title: "Memory OS", description: "短期、中期、长期与跨会话四层记忆，配合热度权重算法，在复杂任务中保持方向感。", icon: "memory" },
  { id: "context", label: "Layer 2", title: "上下文管理系统", description: "Context Engineering 与无限上下文动态压缩，支撑长任务、多工具、多轮次执行。", icon: "context" },
  { id: "routing", label: "Layer 1", title: "模型接入与路由", description: "基于复杂度、成本、上下文、工具、可用性做五维动态路由，兼容主流云端模型。", icon: "routing" },
];

export function ArchitectureLayerExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const layerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeLayer = layers[activeIndex] ?? layers[0];

  useEffect(() => {
    let frameId: number | null = null;

    const updateActiveLayer = () => {
      frameId = null;
      const viewportCenter = window.innerHeight * 0.52;
      let nextIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      layerRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    };

    const scheduleUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateActiveLayer);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  if (!activeLayer) return null;

  const selectLayer = (index: number, shouldScroll = true) => {
    setActiveIndex(index);

    if (!shouldScroll) return;

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    layerRefs.current[index]?.scrollIntoView({ behavior, block: "center" });
  };

  const ActiveIcon = iconMap[activeLayer.icon];

  return (
    <section className="bg-[#f5f5f7] px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[minmax(22rem,0.78fr)_minmax(0,1.22fr)] lg:items-start">
        <aside className="lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-[34px] bg-black p-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.16)] md:p-11">
            <div className="flex items-start justify-between gap-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-white">
                <ActiveIcon className="size-6" />
              </span>
              <span className="text-right text-[11px] font-bold tracking-[0.14em] text-white/48">
                {activeLayer.label.toUpperCase()}
                <br />
                {String(activeIndex + 1).padStart(2, "0")} / {String(layers.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-12 min-h-48">
              <p className="text-sm font-bold text-white/54">AIOS Architecture</p>
              <h2 className="mt-3 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-6xl">
                {activeLayer.title}
              </h2>
              <p className="mt-6 max-w-xl text-base font-medium leading-8 text-white/66 md:text-lg">
                {activeLayer.description}
              </p>
            </div>

            <div className="mt-10 flex items-center gap-2" aria-label="AIOS 架构层级">
              {layers.map((layer, index) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => selectLayer(index)}
                  aria-label={`查看 ${layer.label} ${layer.title}`}
                  aria-pressed={activeIndex === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "w-9 bg-white" : "w-3 bg-white/28 hover:bg-white/56"
                  }`}
                />
              ))}
            </div>
          </div>
        </aside>

        <div className="grid gap-3">
          {layers.map((layer, index) => {
            const LayerIcon = iconMap[layer.icon];
            const isActive = activeIndex === index;

            return (
              <button
                key={layer.id}
                ref={(node) => {
                  layerRefs.current[index] = node;
                }}
                type="button"
                data-layer-index={index}
                onClick={() => selectLayer(index, false)}
                aria-pressed={isActive}
                className={`group relative min-h-48 overflow-hidden rounded-[30px] border p-7 text-left transition-[border-color,background-color,box-shadow,transform] duration-300 md:min-h-52 md:p-9 ${
                  isActive
                    ? "border-[#0071e3]/30 bg-white shadow-[0_16px_38px_rgba(0,113,227,0.1)]"
                    : "border-transparent bg-white hover:border-black/[0.08] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
                }`}
              >
                <span className={`absolute left-0 top-7 h-12 w-1 rounded-r-full bg-[#0071e3] transition-opacity duration-300 md:top-9 ${isActive ? "opacity-100" : "opacity-0"}`} />
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className={`text-sm font-bold transition-colors ${isActive ? "text-[#0071e3]" : "text-[#86868b]"}`}>
                      {layer.label}
                    </p>
                    <h3 className="mt-3 text-4xl font-semibold leading-[1] tracking-[-0.04em] text-[#1d1d1f] md:text-5xl">
                      {layer.title}
                    </h3>
                  </div>
                  <span className={`grid size-12 shrink-0 place-items-center rounded-2xl transition-colors ${isActive ? "bg-[#0071e3] text-white" : "bg-[#f5f5f7] text-[#0071e3]"}`}>
                    <LayerIcon className="size-6" />
                  </span>
                </div>
                <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-[#6e6e73] md:text-lg md:leading-8">
                  {layer.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
