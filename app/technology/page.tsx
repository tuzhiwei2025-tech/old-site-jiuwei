import { TextParallaxContentScroll } from "@/components/TextParallaxContentScroll";

const items = [
  {
    eyebrow: "Layer 5",
    title: "Skills 仓库让数字员工具备可执行能力",
    description: "将数据爬取、Prompt 优化、代码转 Office、文档解析等能力模块化，通过 Function Call 动态组合。",
    details: ["技能模块化", "按需调用", "复杂任务编排", "可扩展技能生态"],
  },
  {
    eyebrow: "Layer 4",
    title: "GoData 构建企业专属专业大脑",
    description: "支持稠密向量、稀疏词项与多向量交互检索，让企业知识更新从天级压缩到分钟级。",
    details: ["私有化知识库", "分钟级更新", "多模式检索", "Word/Excel/PPT 自动分块"],
  },
  {
    eyebrow: "Layer 3",
    title: "Memory OS 保持长任务方向感",
    description: "短期、中期、长期与跨会话四层记忆，让数字员工理解任务历史、偏好和上下文。",
    details: ["四层记忆架构", "跨会话延续", "动态热度权重", "长任务执行稳定"],
  },
  {
    eyebrow: "Layer 1-2",
    title: "上下文工程与 GoModel 路由共同控成本",
    description: "通过无限上下文动态压缩和多维模型路由，在效果、成本、可用性之间做实时取舍。",
    details: ["600 轮 Function Calling", "动态压缩", "五维模型路由", "降低单供应商锁定"],
  },
];

export default function TechnologyPage() {
  return (
    <TextParallaxContentScroll
      kicker="AIOS ARCHITECTURE"
      title="不是大模型加对话框，而是完整工程架构"
      intro="GoAgent AIPC 从模型路由、上下文管理、记忆系统、知识库到技能仓库形成完整基础设施。"
      items={items}
    />
  );
}
