import {
  Bot,
  FileText,
  Gauge,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AppleSubpageShell } from "@/components/AppleSubpageShell";
import { ArchitectureLayerExplorer } from "@/components/ArchitectureLayerExplorer";

const modules = [
  ["对话工作台", "一句话串联全场景工作流，作为数字员工的统一交互入口。", MessageSquareText],
  ["Prompt Genius", "识别真实意图，自动补全模糊指令、拆解任务结构、匹配专业输出框架。", Sparkles],
  ["资料库 / GoData", "支持文档解析切分、混合检索、增量更新与私有化知识沉淀。", FileText],
  ["数字员工", "Amy、Lina、Aira、Max、Lumi 覆盖行政、知识、创意、数据与客户服务。", Bot],
] as const;

const advantages = [
  ["Memory OS", "跨会话记忆"],
  ["Inference Turbo", "100+ Token/s 目标输出效率"],
  ["Prompt Genius", "低门槛任务表达"],
  ["GoData", "企业知识私有沉淀"],
  ["全链路追溯", "执行过程可审计"],
  ["安全部署", "适配内网与私有化环境"],
];

export default function TechnologyPage() {
  return (
    <AppleSubpageShell
      eyebrow="Technology"
      title="不是大模型加对话框，而是完整工程架构。"
      intro="GoAgent OS 把对话、提示词、知识库、记忆、模型路由和技能执行封装为企业可落地的 AIOS。"
      ctaLabel="了解产品矩阵"
      ctaHref="/product"
    >
      <ArchitectureLayerExplorer />

      <section className="bg-white px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#86868b]">GoAgent OS</p>
            <h2 className="mt-4 text-balance text-5xl font-semibold leading-[1] tracking-[-0.04em] md:text-7xl">
              用户看到的是简单入口，背后是完整能力模块。
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {modules.map(([title, desc, Icon]) => (
              <article key={title} className="min-h-[340px] rounded-[30px] bg-[#f5f5f7] p-7">
                <Icon className="size-8 text-[#0071e3]" />
                <h3 className="mt-16 text-3xl font-semibold tracking-[-0.035em]">{title}</h3>
                <p className="mt-5 text-base font-medium leading-7 text-[#6e6e73]">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-20 text-white md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Gauge className="size-10 text-white/70" />
              <h2 className="mt-10 text-balance text-5xl font-semibold leading-[1] tracking-[-0.04em] md:text-7xl">
                效率、安全、可控，同时成立。
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {advantages.map(([title, desc]) => (
                <div key={title} className="rounded-[26px] bg-white px-6 py-7 text-black">
                  <ShieldCheck className="size-5 text-[#0071e3]" />
                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="mt-3 text-base font-medium leading-7 text-[#6e6e73]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppleSubpageShell>
  );
}
