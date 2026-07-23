export type ProductSlug = "box" | "solo" | "cluster" | "enterprise";

export type ProductMedia = {
  src: string;
  fit?: "contain" | "cover";
  kind?: "image" | "video";
};

export type ProductStory = {
  slug: ProductSlug;
  navLabel: string;
  name: string;
  eyebrow: string;
  heroLine: string;
  subline: string;
  interactiveModel?: {
    src: string;
  };
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
  cloud: "/透明spark/云轻盒-俯视图.png",
  cloudSide: "/透明spark/云轻盒-侧视图.png",
  mix: "/透明spark/Mix轻终端-正视图.png",
  mixAngle: "/透明spark/Mix轻终端-斜视图.png",
  mixSide: "/透明spark/Mix轻终端-侧视图.png",
  soloFront: "/透明机顶盒/Spark Solo-正视图.png",
  soloRear: "/透明机顶盒/Spark Solo-后视图.png",
  soloAngle: "/透明机顶盒/Spark Solo-斜视图.png",
  clusterFront: "/透明机顶盒/Spark Cluster集群-正视图.png",
  clusterStack: "/透明机顶盒/Spark Cluster集群-正视图（4层）.png",
  enterpriseAngle: "/透明企业素材/8卡-侧上方.png",
  enterpriseSide: "/透明企业素材/8卡-侧视图.png",
  enterpriseTop: "/透明企业素材/8卡-俯视图.png",
};

const featureVideos = {
  boxWorkspace: "/官网文案及素材/2、不同系列展示2-3个核心功能页面/AI机顶盒-展示功能点及视频/对话工作台-功能视频.mov",
  boxAudit: "/官网文案及素材/2、不同系列展示2-3个核心功能页面/AI机顶盒-展示功能点及视频/积分审计-功能视频.mov",
  boxHistory: "/官网文案及素材/2、不同系列展示2-3个核心功能页面/AI机顶盒-展示功能点及视频/历史对话回溯-功能视频.mov",
  consumerModels: "/官网文案及素材/2、不同系列展示2-3个核心功能页面/消费级产品-展示功能点及视频/灵活切换本地及云端模型-功能视频.mov",
  consumerKnowledge: "/官网文案及素材/2、不同系列展示2-3个核心功能页面/消费级产品-展示功能点及视频/向量知识库构建-功能视频.mov",
  consumerAttach: "/官网文案及素材/2、不同系列展示2-3个核心功能页面/消费级产品-展示功能点及视频/关联知识库-功能视频.mov",
  enterpriseUsers: "/官网文案及素材/2、不同系列展示2-3个核心功能页面/企业级产品-展示功能点及视频/用户管理-功能视频.mov",
  enterpriseApproval: "/官网文案及素材/2、不同系列展示2-3个核心功能页面/企业级产品-展示功能点及视频/资源审批-功能视频.mov",
  enterpriseRequest: "/官网文案及素材/2、不同系列展示2-3个核心功能页面/企业级产品-展示功能点及视频/资源申请-功能视频.mov",
};

export const productStories: ProductStory[] = [
  {
    slug: "box",
    navLabel: "AI机顶盒",
    name: "AI机顶盒",
    eyebrow: "GoAgent AIPC",
    heroLine: "轻量级 AI 智能终端",
    subline: "专为个人及小微团队打造，依托云端算力，支持数据本地留存与离线运行，无需复杂配置即可调用全栈 AI 数字员工能力。",
    heroMedia: [
      { src: assets.cloud, fit: "contain" },
      { src: assets.mix, fit: "contain" },
    ],
    storyMedia: [
      { src: assets.cloudSide, fit: "contain" },
      { src: assets.mixAngle, fit: "contain" },
    ],
    performanceMedia: { src: assets.mixSide, fit: "contain" },
    storyFrames: [
      {
        kicker: "开箱即用",
        title: "零门槛进入智能办公",
        desc: "无需本地部署大模型硬件，接入即可使用全场景 AI 办公能力，让普通终端秒变智能工作站。",
      },
      {
        kicker: "弹性算力",
        title: "云端能力按需调用",
        desc: "依托稳定云端算力灵活调用大模型能力，无需承担本地硬件升级成本，覆盖日常办公全场景需求。",
      },
      {
        kicker: "知识管理",
        title: "500 万知识点轻量知识库",
        desc: "多格式文档智能解析检索，个人工作资料一键沉淀，随问随取。",
      },
    ],
    priceNote: "AI机顶盒 面向个人及小微团队的轻量级 AI 智能终端",
    quickStats: [
      ["部署方式", "开箱即用"],
      ["知识库", "最高 500 万知识点"],
      ["算力", "云端弹性调用"],
      ["适用对象", "个人及小微团队"],
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
        desc: "提供用户交互的统一入口，以自然语言串联全链路工作流，预置五大专业数字员工，覆盖办公、文档、演示、数据与应用开发任务。",
        media: { src: featureVideos.boxWorkspace, kind: "video" },
      },
      {
        title: "积分审计",
        desc: "精准量化推理消耗与知识库资源占用，提供分钟级审计信息，关联任务上下文与消耗明细，支持全周期追溯与效能分析。",
        media: { src: featureVideos.boxAudit, kind: "video" },
      },
      {
        title: "历史对话回溯",
        desc: "全量会话按时间轴自动沉淀，支持任务快照式上下文恢复与标题、任务 ID 多维检索，快速复用过往工作成果。",
        media: { src: featureVideos.boxHistory, kind: "video" },
      },
    ],
    featureTitle: "让每一次办公更直接",
    featureDesc: "AI机顶盒以开箱即用的数字员工能力、云端弹性算力和轻量知识管理，为个人及小微团队提供更低门槛的智能办公入口。",
    scenes: [
      { title: "五大专业数字员工", desc: "覆盖通用办公、文档撰写、演示设计、数据处理与应用开发等专项能力。" },
      { title: "灵犀提示词优化", desc: "自动补全模糊指令，降低使用门槛，并透明呈现任务执行过程。" },
      { title: "资源可追溯", desc: "从任务上下文到推理与知识库消耗，形成清晰的全周期使用记录。" },
    ],
    specs: [
      ["产品模块", "Cloud 云轻盒 与 Mix 轻终端"],
      ["使用方式", "无需复杂配置，开箱启用 AI 数字员工能力"],
      ["算力架构", "云端弹性算力，按需调用大模型能力"],
      ["知识管理", "最高 500 万知识点，多格式文档智能解析检索"],
      ["数据边界", "支持数据本地留存与离线运行"],
      ["适用场景", "个人与小微团队的全场景智能办公"],
    ],
  },
  {
    slug: "solo",
    navLabel: "AIPC 消费级产品",
    name: "GoAgent Spark Solo 工作站",
    eyebrow: "AIPC 消费级产品",
    heroLine: "云地协同的本地化 AIPC",
    subline: "面向个人与小微团队，采用云地协同架构，兼顾数据隐私安全与算力使用成本，搭载自研本地大模型，开箱即用。",
    interactiveModel: { src: "/product-assets/models/goagent-spark-solo.glb" },
    heroMedia: [{ src: assets.soloFront, fit: "contain" }],
    storyMedia: [
      { src: assets.soloAngle, fit: "contain" },
      { src: assets.soloRear, fit: "contain" },
    ],
    performanceMedia: { src: assets.soloRear, fit: "contain" },
    storyFrames: [
      {
        kicker: "云地协同",
        title: "数据主权与体验兼顾",
        desc: "核心敏感数据本地留存，非敏感任务按需调用云端大模型，在保障数据主权的同时兼顾复杂任务算力。",
      },
      {
        kicker: "本地模型",
        title: "断网环境独立运行",
        desc: "搭载 30B 或 300B 本地大模型，核心业务不中断，数据全程不出本地环境。",
      },
      {
        kicker: "多人协同",
        title: "共享团队知识与能力",
        desc: "最高支持 4 人同时使用，共享知识库与数字员工能力，统一团队输出标准。",
      },
    ],
    priceNote: "AIPC 消费级产品 GoAgent Spark Solo 工作站",
    quickStats: [
      ["产品形态", "本地化 AIPC"],
      ["模型部署", "30B / 300B 本地模型"],
      ["协同能力", "最高 4 人同时使用"],
      ["架构", "云地协同双模式"],
    ],
    highlights: [
      {
        title: "灵活切换本地及云端模型",
        desc: "支持本地私有化模型与云端大模型按需无缝切换，智能路由引擎将根据任务复杂度、算力成本与上下文长度动态决策。",
        media: { src: featureVideos.consumerModels, kind: "video" },
      },
      {
        title: "向量知识库构建",
        desc: "支持 10+ 种办公文档智能解析，融合稠密向量、稀疏词项与多向量交互检索，知识更新周期从天级缩短至分钟级。",
        media: { src: featureVideos.consumerKnowledge, kind: "video" },
      },
      {
        title: "关联知识库",
        desc: "数字员工可按任务挂载专属知识库，并在多轮对话中持续调用企业私有知识，保障复杂长周期任务的信息一致性。",
        media: { src: featureVideos.consumerAttach, kind: "video" },
      },
    ],
    featureTitle: "让本地 AI 为真实工作服务",
    featureDesc: "GoAgent Spark Solo 通过云地协同双模式、本地模型离线可用和多人共享能力，为个人与小微团队提供兼顾隐私、成本与体验的 AIPC 工作方式。",
    scenes: [
      { title: "敏感任务本地推理", desc: "核心业务全量本地推理，数据不出域，保障业务连续性与数据安全。" },
      { title: "非敏感任务云端扩容", desc: "按需弹性调用云端算力，获得复杂任务需要的大模型能力。" },
      { title: "小团队协同", desc: "共享知识库与数字员工能力，形成统一的团队知识与输出标准。" },
    ],
    specs: [
      ["产品定位", "AIPC 消费级产品"],
      ["产品形态", "GoAgent Spark Solo 工作站"],
      ["部署方式", "本地化部署，云地协同双模式"],
      ["本地模型", "支持 30B / 300B 本地大模型，断网可用"],
      ["协同能力", "最高支持 4 人共享知识库与数字员工能力"],
      ["适用场景", "个人与小微团队的智能办公与知识沉淀"],
    ],
  },
  {
    slug: "cluster",
    navLabel: "AIPC 消费级产品",
    name: "GoAgent Spark Cluster 集群",
    eyebrow: "AIPC 消费级产品",
    heroLine: "云地协同的本地化 AIPC",
    subline: "面向小微团队的云地协同 AIPC 解决方案，支持最高 4 人共享本地模型、知识库与数字员工能力。",
    heroMedia: [{ src: assets.clusterFront, fit: "contain" }],
    storyMedia: [{ src: assets.clusterStack, fit: "contain" }],
    performanceMedia: { src: assets.clusterFront, fit: "contain" },
    storyFrames: [
      {
        kicker: "云地协同",
        title: "数据留本地 算力按需扩展",
        desc: "核心敏感数据本地留存，非敏感任务可弹性调用云端模型，平衡数据主权、投入成本与使用体验。",
      },
      {
        kicker: "本地模型",
        title: "离线环境持续可用",
        desc: "搭载 30B 或 300B 本地大模型，支持断网独立运行，核心数据与业务不出本地环境。",
      },
      {
        kicker: "团队协同",
        title: "共享知识与数字员工",
        desc: "最高支持 4 人同时使用，统一团队输出标准，提升协作效率。",
      },
    ],
    priceNote: "AIPC 消费级产品 GoAgent Spark Cluster 集群",
    quickStats: [
      ["产品形态", "本地化 AIPC"],
      ["本地模型", "30B / 300B"],
      ["协同能力", "最高 4 人同时使用"],
      ["工作方式", "云地协同"],
    ],
    highlights: [
      {
        title: "灵活切换本地及云端模型",
        desc: "本地与云端模型按需无缝切换，基于安全等级、任务复杂度与算力成本动态匹配效果与成本最优的模型资源。",
        media: { src: featureVideos.consumerModels, kind: "video" },
      },
      {
        title: "向量知识库构建",
        desc: "多格式办公文档智能解析，兼顾语义相似度与精确关键词匹配，支持知识增量更新与动态扩容。",
        media: { src: featureVideos.consumerKnowledge, kind: "video" },
      },
      {
        title: "关联知识库",
        desc: "让数字员工按需调用团队专属知识，在复杂长周期任务中保持上下文一致与专业输出。",
        media: { src: featureVideos.consumerAttach, kind: "video" },
      },
    ],
    featureTitle: "让团队共享 AI 能力",
    featureDesc: "GoAgent Spark Cluster 以云地协同、本地模型离线可用和多人共享能力，让小微团队在可控成本下建立稳定的 AI 工作底座。",
    scenes: [
      { title: "敏感数据本地留存", desc: "核心敏感数据全量本地留存，满足团队对数据主权与业务连续性的要求。" },
      { title: "云端任务弹性扩容", desc: "非敏感复杂任务调用云端大模型，在使用体验与成本之间保持平衡。" },
      { title: "四人协同共享", desc: "共享知识库、数字员工和模型能力，让团队输出更一致，协作更高效。" },
    ],
    specs: [
      ["产品定位", "AIPC 消费级产品"],
      ["产品形态", "GoAgent Spark Cluster 集群"],
      ["部署方式", "本地化部署，云地协同双模式"],
      ["本地模型", "支持 30B / 300B 本地大模型，断网可用"],
      ["协同能力", "最高支持 4 人共享知识库与数字员工能力"],
      ["适用场景", "小微团队的智能办公、知识沉淀与协同输出"],
    ],
  },
  {
    slug: "enterprise",
    navLabel: "AIPC 企业级产品",
    name: "AIPC 企业级产品",
    eyebrow: "Enterprise AIPC",
    heroLine: "8卡及以上服务器定制化方案",
    subline: "面向中大型企业的全栈私有化 AIPC 解决方案，以本地化部署为核心，构建数字员工协同体系与知识管理底座，支撑 AI 在全业务流程规模化落地。",
    heroMedia: [{ src: assets.enterpriseAngle, fit: "contain" }],
    storyMedia: [{ src: assets.enterpriseTop, fit: "contain" }],
    performanceMedia: { src: assets.enterpriseAngle, fit: "contain" },
    storyFrames: [
      {
        kicker: "Enterprise 01",
        title: "全链路私有化安全",
        desc: "大模型、知识库与业务数据全量本地闭环，内网完成模型推理，网络隔离进程可控，操作链路可追溯审计。",
      },
      {
        kicker: "Enterprise 02",
        title: "全维度组织管控",
        desc: "完善的用户权限、资源调度与行为审计体系，细粒度匹配企业组织架构与安全管理规范。",
      },
      {
        kicker: "Enterprise 03",
        title: "全栈定制与集成",
        desc: "提供 API 对接、知识库定制与业务系统适配等增值服务，无缝融入企业既有 IT 架构。",
      },
    ],
    priceNote: "AIPC 企业级产品 8卡及以上服务器定制化方案",
    quickStats: [
      ["硬件配置", "8 卡及以上服务器"],
      ["部署方式", "全栈私有化"],
      ["管控能力", "用户 权限 资源 审计"],
      ["服务能力", "定制 集成 增值服务"],
    ],
    highlights: [
      {
        title: "用户管理",
        desc: "构建个人用户与管理员双角色体系，覆盖账号全生命周期管理。管理员可配置资源额度、启用禁用账号与重置密码，按需分配 Token 算力。",
        media: { src: featureVideos.enterpriseUsers, kind: "video" },
      },
      {
        title: "资源审批",
        desc: "内置 Token 额度与知识库空间的标准化审批流程，支持筛选、批量操作并留存完整申请与审批记录。",
        media: { src: featureVideos.enterpriseApproval, kind: "video" },
      },
      {
        title: "资源申请",
        desc: "普通用户可在线申请 Token 算力与知识点存储额度，个人中心实时展示用量占比与申请进度。",
        media: { src: featureVideos.enterpriseRequest, kind: "video" },
      },
    ],
    featureTitle: "为企业构建完整 AI 基础设施",
    featureDesc: "企业级方案以全链路私有化安全、组织级资源管控和灵活集成定制为基础，提供本地模型、知识库、数字员工与业务系统协同能力。",
    scenes: [
      { title: "模型与数据本地闭环", desc: "业务数据、知识库和模型服务运行在企业可控边界内，满足严格的数据合规要求。" },
      { title: "企业级资源治理", desc: "从账号、权限到算力与知识库资源，提供全维度可追溯的集中管控。" },
      { title: "业务系统无缝集成", desc: "围绕既有 IT 架构提供 API、知识库和业务流程适配，打通 AI 落地链路。" },
    ],
    specs: [
      ["产品定位", "AIPC 企业级产品"],
      ["产品形态", "8卡及以上服务器定制化方案"],
      ["部署方式", "本地化硬件集群与 AIOS 全栈私有化集成"],
      ["安全能力", "模型 知识库 业务数据全量本地闭环与可追溯审计"],
      ["组织管控", "用户权限 资源调度 行为审计的细粒度管理"],
      ["适用场景", "中大型企业、集团与高合规业务组织"],
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
