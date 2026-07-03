import { TextParallaxContentScroll } from "@/components/TextParallaxContentScroll";

const items = [
  {
    eyebrow: "Cloud",
    title: "云轻盒，最快进入 AIPC 工作流",
    description: "面向个人办公和轻量团队，依托云端算力快速启用数字员工，不需要额外硬件门槛。",
    details: ["开箱即用", "云端模型调度", "适合试用与轻量办公", "快速验证团队使用路径"],
  },
  {
    eyebrow: "Mix",
    title: "轻终端，把知识留在本机",
    description: "本地知识库搭配云端模型，在成本、隐私和可用性之间取得平衡，适合 1-2 人协作。",
    details: ["本地知识库存储", "云地协同推理", "离线可用", "适合小团队私密资料"],
  },
  {
    eyebrow: "Spark Solo",
    title: "单机私有化，内网办公场景优先",
    description: "本地 30B 模型与 128GB 内存配置，面向敏感数据和稳定办公场景。",
    details: ["本地自研 30B 模型", "1-2 人并发", "数据留存本机", "适合部门级试点"],
  },
  {
    eyebrow: "Enterprise",
    title: "企业私有化方案，按组织规模扩展",
    description: "面向大型企业的高并发、安全管控和系统对接需求，提供知识库、API 与数字员工定制服务。",
    details: ["Spark Cluster 集群", "高并发弹性扩展", "企业级权限管控", "API 接口适配"],
  },
];

export default function ProductPage() {
  return (
    <TextParallaxContentScroll
      kicker="PRODUCT SYSTEM"
      title="一套 AIPC 产品矩阵，覆盖不同组织规模"
      intro="从个人办公到企业私有化部署，GoAgent 用同一套 AIOS 思路承接不同预算、隐私和并发需求。"
      items={items}
    />
  );
}
