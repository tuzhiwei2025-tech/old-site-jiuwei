export type ProductSlug = "box" | "solo" | "cluster" | "enterprise";

type ProductMedia = {
  src: string;
  fit?: "contain" | "cover";
};

export type ProductStory = {
  slug: ProductSlug;
  navLabel: string;
  name: string;
  eyebrow: string;
  heroLine: string;
  subline: string;
  heroMedia: ProductMedia[];
  storyMedia: ProductMedia[];
  performanceMedia?: ProductMedia;
  storyFrames: Array<{
    kicker: string;
    title: string;
    desc: string;
  }>;
  priceNote: string;
  quickStats: Array<[string, string]>;
  variants?: Array<{
    id: string;
    name: string;
    desc: string;
    media: ProductMedia;
  }>;
  highlights: Array<{
    title: string;
    desc: string;
    media?: ProductMedia;
  }>;
  featureTitle: string;
  featureDesc: string;
  scenes: Array<{
    title: string;
    desc: string;
  }>;
  specs: Array<[string, string]>;
};

const assets = {
  cloud: "/product-assets/cloud-clean-cutout.png",
  mix: "/product-assets/mix-front-clean-cutout.png",
  mixBack: "/product-assets/mix-back-clean-cutout.png",
  solo: "/消费级.jpg",
  soloCutout: "/product-assets/spark-solo-cutout.png",
  cluster: "/product-assets/spark-cluster-cutout.png",
  enterprise: "/product-assets/enterprise-server-clean-cutout.png",
};

export const productStories: ProductStory[] = [
  {
    slug: "box",
    navLabel: "AI机顶盒",
    name: "AI机顶盒",
    eyebrow: "GoAgent AIPC",
    heroLine: "Cloud 与 Mix 两个版本",
    subline: "从纯云端到本地知识库加云端模型，用更轻的部署路径进入 GoAgent AIOS。",
    heroMedia: [
      { src: assets.cloud, fit: "contain" },
      { src: assets.mix, fit: "contain" },
    ],
    storyMedia: [
      { src: assets.cloud, fit: "contain" },
      { src: assets.mix, fit: "contain" },
    ],
    performanceMedia: { src: assets.mixBack, fit: "contain" },
    storyFrames: [
      {
        kicker: "Cloud 云轻盒",
        title: "纯云端 直接进入 AIOS",
        desc: "注册登录即可使用数字员工工作台，无需采购本地硬件或完成复杂配置。",
      },
      {
        kicker: "Mix 轻终端",
        title: "本地知识库 云端模型",
        desc: "把核心资料留在本地，按需调用云端模型，在数据边界与工作效率之间取得平衡。",
      },
      {
        kicker: "GoAgent AIPC",
        title: "同一套 AIOS 两种进入方式",
        desc: "根据团队规模、资料边界和使用习惯，选择最适合的 AI 机顶盒版本。",
      },
    ],
    priceNote: "AI机顶盒 Cloud 云轻盒 与 Mix 轻终端",
    quickStats: [
      ["Cloud 云轻盒", "纯云端"],
      ["Mix 轻终端", "本地加云端"],
      ["适用团队", "个人到 1-2 人"],
      ["AIOS", "数字员工工作台"],
    ],
    variants: [
      {
        id: "cloud",
        name: "Cloud 云轻盒",
        desc: "纯云端版本，注册登录即可进入 GoAgent AIOS，适合个人办公与快速试用。",
        media: { src: assets.cloud, fit: "contain" },
      },
      {
        id: "mix",
        name: "Mix 轻终端",
        desc: "本地知识库加云端模型版本，适合希望保留资料边界的轻量协作场景。",
        media: { src: assets.mix, fit: "contain" },
      },
    ],
    highlights: [
      {
        title: "Cloud 云轻盒",
        desc: "面向个人办公与快速试用，打开账号即可进入 GoAgent 数字员工工作流。",
        media: { src: assets.cloud, fit: "contain" },
      },
      {
        title: "Mix 轻终端",
        desc: "面向轻量协作与资料留存，让本地知识库与云端模型共同服务日常工作。",
        media: { src: assets.mix, fit: "contain" },
      },
      {
        title: "从轻量体验开始",
        desc: "先验证数字员工在真实流程中的价值，再按团队和数据边界升级部署方式。",
        media: { src: assets.mixBack, fit: "contain" },
      },
    ],
    featureTitle: "把 AIOS 带进每一天的工作",
    featureDesc: "AI机顶盒以 Cloud 云轻盒和 Mix 轻终端覆盖不同资料边界，让个人与轻团队都能拥有统一的数字员工入口。",
    scenes: [
      { title: "个人效率", desc: "公文润色、会议纪要、资料检索和日报草拟。" },
      { title: "知识沉淀", desc: "将方案、制度和历史资料组织为可自然语言访问的知识库。" },
      { title: "轻量协作", desc: "把常用任务、协作资料和数字员工能力集中到一个工作入口。" },
    ],
    specs: [
      ["产品模块", "Cloud 云轻盒 与 Mix 轻终端"],
      ["Cloud 形态", "纯云端，注册登录即可使用"],
      ["Mix 架构", "本地知识库加云端模型"],
      ["数据边界", "可根据版本选择云端或本地资料留存"],
      ["适用场景", "个人办公、小微团队、轻量业务协同"],
    ],
  },
  {
    slug: "solo",
    navLabel: "AIPC 消费级产品",
    name: "GoAgent Spark Solo 工作站",
    eyebrow: "AIPC 消费级产品",
    heroLine: "一台工作站 进入本地 AIOS",
    subline: "面向个人创作者与核心岗位，将专属知识库、数字员工工作台与本地 AI 能力带到桌面。",
    heroMedia: [{ src: assets.solo, fit: "contain" }],
    storyMedia: [
      { src: assets.solo, fit: "contain" },
      { src: assets.soloCutout, fit: "contain" },
    ],
    performanceMedia: { src: assets.solo, fit: "contain" },
    storyFrames: [
      {
        kicker: "Spark Solo 01",
        title: "个人工作站 专属 AIOS",
        desc: "将数字员工、知识库与常用办公任务集中到一个本地工作站。",
      },
      {
        kicker: "Spark Solo 02",
        title: "核心资料 在身边工作",
        desc: "为频繁处理文档、方案和专业资料的个人岗位提供更清晰的工作边界。",
      },
      {
        kicker: "Spark Solo 03",
        title: "从单人生产力开始",
        desc: "先让一项真实工作变得更快，再把成熟方法沉淀为可复用的数字员工能力。",
      },
    ],
    priceNote: "AIPC 消费级产品 GoAgent Spark Solo 工作站",
    quickStats: [
      ["产品形态", "个人工作站"],
      ["工作方式", "本地 AIOS"],
      ["使用对象", "个人与核心岗位"],
      ["能力入口", "专属数字员工"],
    ],
    highlights: [
      {
        title: "为个人工作而生",
        desc: "聚焦高频资料处理、内容生产和知识问答，让数字员工跟上个人的工作节奏。",
        media: { src: assets.solo, fit: "contain" },
      },
      {
        title: "专属知识库",
        desc: "把项目资料、个人方法与常用模板沉淀下来，减少反复寻找和重复整理。",
        media: { src: assets.soloCutout, fit: "contain" },
      },
      {
        title: "数字员工工作台",
        desc: "从一句话开始调度资料、任务和专业输出，让复杂流程更接近日常工作方式。",
        media: { src: assets.solo, fit: "contain" },
      },
    ],
    featureTitle: "把专属 AI 能力留在自己的工作台",
    featureDesc: "GoAgent Spark Solo 工作站服务个人创作者与核心岗位，让本地资料、知识库和数字员工协同完成真实任务。",
    scenes: [
      { title: "内容创作", desc: "协助完成脚本、文案、提案与交付材料的初稿和迭代。" },
      { title: "专业资料", desc: "围绕长期积累的资料、项目和模板建立专属工作上下文。" },
      { title: "日常办公", desc: "把会议记录、资料归档、任务拆解和结果汇总串成可复用流程。" },
    ],
    specs: [
      ["产品定位", "AIPC 消费级产品"],
      ["产品形态", "GoAgent Spark Solo 工作站"],
      ["部署方式", "个人与核心岗位的本地工作站"],
      ["核心能力", "专属知识库、数字员工工作台、日常任务协同"],
      ["适用场景", "个人创作、专业资料处理、高频办公任务"],
    ],
  },
  {
    slug: "cluster",
    navLabel: "AIPC 消费级产品",
    name: "GoAgent Spark Cluster 集群",
    eyebrow: "AIPC 消费级产品",
    heroLine: "中小团队的私有算力池",
    subline: "四节点集群私有化部署，搭载本地 300B 大模型，为产品、研发与创意团队提供内网专属 AI 算力。",
    heroMedia: [{ src: assets.cluster, fit: "contain" }],
    storyMedia: [{ src: assets.cluster, fit: "contain" }],
    performanceMedia: { src: assets.cluster, fit: "contain" },
    storyFrames: [
      {
        kicker: "Spark Cluster 01",
        title: "四节点集群架构",
        desc: "为中小团队建立内网专属 AI 算力池，让多人共享稳定的本地推理能力。",
      },
      {
        kicker: "Spark Cluster 02",
        title: "本地 300B 大模型",
        desc: "以全量本地部署承接更复杂的专业任务，让数据与模型能力都留在可控边界内。",
      },
      {
        kicker: "Spark Cluster 03",
        title: "多节点协同推理",
        desc: "依托高速互连完成协同推理，为产品、研发与创意团队持续提供算力支持。",
      },
    ],
    priceNote: "AIPC 消费级产品 GoAgent Spark Cluster 集群",
    quickStats: [
      ["产品形态", "四节点私有集群"],
      ["本地模型", "300B"],
      ["适用团队", "中小团队"],
      ["工作边界", "内网专属算力"],
    ],
    highlights: [
      {
        title: "中小团队私有算力池",
        desc: "让团队共享一套本地 AIOS 算力底座，在成本与性能之间取得适合自身规模的平衡。",
        media: { src: assets.cluster, fit: "contain" },
      },
      {
        title: "全量本地部署",
        desc: "模型、资料与任务链路保留在内网，适合对数据边界和离线能力有更高要求的团队。",
        media: { src: assets.cluster, fit: "contain" },
      },
      {
        title: "面向协同而生",
        desc: "支持多成员共享算力、知识库与数字员工能力，让团队从单点试用走向稳定协作。",
        media: { src: assets.cluster, fit: "contain" },
      },
    ],
    featureTitle: "让本地 AIOS 覆盖一支团队",
    featureDesc: "GoAgent Spark Cluster 集群以四节点私有化架构和本地 300B 大模型，为中小团队提供可共享、可协同的专属 AI 算力。",
    scenes: [
      { title: "团队知识协同", desc: "在统一的本地算力池中连接项目资料、团队知识和常用工作模板。" },
      { title: "复杂任务并行", desc: "为研发、产品与创意团队提供更稳定的推理能力和任务处理空间。" },
      { title: "持续扩展", desc: "从团队当前规模开始，随着工作流与数字员工数量增长持续扩展能力边界。" },
    ],
    specs: [
      ["产品定位", "AIPC 消费级产品"],
      ["产品形态", "GoAgent Spark Cluster 集群"],
      ["部署方式", "四节点集群私有化部署"],
      ["本地模型", "本地 300B 大模型"],
      ["适用场景", "产品、研发、创意等中小团队私有化协作"],
    ],
  },
  {
    slug: "enterprise",
    navLabel: "AIPC 企业级产品",
    name: "AIPC 企业级产品",
    eyebrow: "Enterprise AIPC",
    heroLine: "8卡及以上服务器定制化方案",
    subline: "面向大型集团与政企客户，按业务规模、合规要求和并发需求定制本地化硬件集群与 AIOS 集成方案。",
    heroMedia: [{ src: assets.enterprise, fit: "contain" }],
    storyMedia: [{ src: assets.enterprise, fit: "contain" }],
    performanceMedia: { src: assets.enterprise, fit: "contain" },
    storyFrames: [
      {
        kicker: "Enterprise 01",
        title: "按业务规模定制",
        desc: "围绕组织人数、并发需求、数据边界与既有系统，规划适合大型组织的私有化部署路径。",
      },
      {
        kicker: "Enterprise 02",
        title: "8卡及以上硬件集群",
        desc: "根据算力目标灵活适配 8 卡及以上服务器集群，支持更高并发与持续扩展。",
      },
      {
        kicker: "Enterprise 03",
        title: "安全管控与系统集成",
        desc: "配套企业级权限、审计、知识库与业务系统集成，让 AIOS 在严格边界内持续运行。",
      },
    ],
    priceNote: "AIPC 企业级产品 8卡及以上服务器定制化方案",
    quickStats: [
      ["硬件配置", "8 卡及以上服务器"],
      ["部署方式", "本地化定制"],
      ["适用组织", "大型集团与政企"],
      ["扩展能力", "高并发弹性扩展"],
    ],
    highlights: [
      {
        title: "300B 与 671B 本地模型",
        desc: "按业务复杂度与算力目标选择合适模型规格，让大型组织拥有持续可用的本地模型能力。",
        media: { src: assets.enterprise, fit: "contain" },
      },
      {
        title: "企业级安全管控",
        desc: "围绕权限体系、操作审计与数据边界建立可管理的 AIOS 使用环境。",
        media: { src: assets.enterprise, fit: "contain" },
      },
      {
        title: "全栈定制与集成",
        desc: "从企业知识库、数字员工到 API 与业务系统接入，按现有技术架构完成方案设计。",
        media: { src: assets.enterprise, fit: "contain" },
      },
    ],
    featureTitle: "为大型组织构建可控 AIOS 底座",
    featureDesc: "企业级定制方案基于 8 卡及以上硬件集群，为高并发、高安全与高定制需求提供本地化模型、算力、知识库和系统集成能力。",
    scenes: [
      { title: "高并发推理", desc: "面向多人、多部门与多任务并行场景提供持续可扩展的推理能力。" },
      { title: "合规数据边界", desc: "让敏感资料、模型服务与操作过程运行在组织可控、可追溯的本地环境内。" },
      { title: "业务系统连接", desc: "与现有权限、业务流程和行业系统协同，形成连续的组织级 AI 工作流。" },
    ],
    specs: [
      ["产品定位", "AIPC 企业级产品"],
      ["产品形态", "8卡及以上服务器定制化方案"],
      ["部署方式", "本地化硬件集群与 AIOS 定制集成"],
      ["模型规格", "支持 300B、671B 等多规格本地模型"],
      ["适用场景", "大型集团、金融机构、政务单位及高合规组织"],
    ],
  },
];

export const legacyProductRedirects: Record<string, string> = {
  cloud: "/product/box",
  mix: "/product/box",
  spark: "/product/cluster",
};

export function getProductStory(slug: string) {
  return productStories.find((product) => product.slug === slug);
}
