"use client";

import { AiosStackCard } from "@/components/AiosStackCard";

const audienceSegments = [
  {
    label: "决策层",
    title: "CEO / CTO / 数字化负责人",
    focus: "ROI、合规安全、落地成功率",
    route: "数据看板、案例证明、企业介绍",
  },
  {
    label: "执行层",
    title: "IT 管理员 / 业务负责人",
    focus: "部署方式、技术规格、可扩展性",
    route: "技术方案、产品矩阵、部署选型",
  },
  {
    label: "使用层",
    title: "职能部门员工 / 普通职场用户",
    focus: "易用性、日常任务效率提升",
    route: "应用场景、数字员工、即时演示",
  },
  {
    label: "生态层",
    title: "开发者 / ISV / 渠道伙伴",
    focus: "API 接入、联合方案、技术支持",
    route: "合作伙伴、开发者计划、商务入口",
  },
];

const productMatrix = [
  {
    name: "Cloud 云轻盒",
    tag: "纯云端",
    users: "个人办公",
    points: ["开箱即用", "依托云端算力", "无硬件门槛"],
  },
  {
    name: "Mix 轻终端",
    tag: "云地协同",
    users: "1-2 人",
    points: ["本地知识库", "云端模型", "离线可用"],
  },
  {
    name: "Spark Solo 工作站",
    tag: "单机私有化",
    users: "1-2 人并发",
    points: ["本地 30B 模型", "128GB 内存", "数据留存本机"],
  },
  {
    name: "Spark Cluster 集群",
    tag: "四节点架构",
    users: "多用户并发",
    points: ["本地 300B 模型", "512GB 显存", "企业级扩展"],
  },
  {
    name: "企业私有化方案",
    tag: "定制部署",
    users: "大型企业",
    points: ["高并发弹性扩展", "安全管控", "系统 API 对接"],
  },
];

const coreAdvantages = [
  {
    metric: "Memory OS",
    title: "多层记忆系统",
    desc: "短期、中期、长期、跨会话四层记忆，让数字员工持续理解工作习惯与任务历史。",
    proof: "无限上下文 / 600 轮 Function Calling / 动态压缩",
  },
  {
    metric: "100+ Token/s",
    title: "Inference Turbo 推理优化",
    desc: "自研推理框架把 30B 模型跑出更强效果，在本地部署场景兼顾速度与成本。",
    proof: "张量并行优化 / SFT + DPO + RL 三阶段训练",
  },
  {
    metric: "65%",
    title: "Prompt Genius 指令优化",
    desc: "模糊指令自动补全，普通用户不需要掌握 Prompt 工程即可发起复杂任务。",
    proof: "复杂任务成功率提升 / Function Calling 错误率下降 78%",
  },
  {
    metric: "分钟级",
    title: "GoData 向量知识库",
    desc: "支持稠密向量、稀疏词项与多向量交互检索，让企业知识持续沉淀和进化。",
    proof: "分块准确率提升 30%+ / 召回率提升 25%+",
  },
];

const techLayers = [
  ["L5", "Skills 仓库", "技能模块化，按需调用数据爬取、Prompt 优化、代码转 Office、文档解析等能力。"],
  ["L4", "GoData 向量知识库", "三种检索模式并行，知识更新分钟级响应，形成企业专属专业大脑。"],
  ["L3", "Memory OS", "四层记忆架构与三维热度权重算法，让长任务执行始终保持方向感。"],
  ["L2", "上下文管理系统", "Context Engineering 与无限上下文动态压缩，解决复杂任务上下文丢失。"],
  ["L1", "基模接入 & GoModel 路由", "基于复杂度、成本、上下文、工具、可用性做模型动态路由。"],
];

const securityItems = [
  {
    title: "数据不出本地",
    desc: "核心业务数据、知识库内容全量本地存储，敏感信息不经过外部节点。",
  },
  {
    title: "全程可追溯",
    desc: "任务执行链路完整记录，每一次数字员工操作都可审计、可回查、可管控。",
  },
  {
    title: "双角色权限管理",
    desc: "管理员掌控审批、资源分配与模型服务开关，员工自主管理账户安全和用量。",
  },
];

const timeline = [
  {
    year: "2024",
    title: "创立启程，技术筑基",
    desc: "九维图灵在上海成立，入孵英伟达中国首个物理孵化器，发布 SmartStorage、SmartScale Beta 与 SmartStation。",
  },
  {
    year: "2025",
    title: "产品落地，生态突破",
    desc: "GoAgent.Store 开启全球内测，入选国家级科技型中小企业，获得 AI 领航杯、CCF 科技创新大赛等认可。",
  },
  {
    year: "2026",
    title: "标准认证，规模化商业深化",
    desc: "GoAgent 取得智能体 L3 能动性与可控级可信度双认证，发布完整 GoAgent AIPC 全梯度产品矩阵。",
  },
];

const honors = [
  "智能体 L3+ 可控级认证",
  "智能体规范标准上海参编单位",
  "国家级科技型中小企业",
  "BEYOND Innovation Awards 全球创新大奖",
  "融中智能体领域创新领军企业 POWER50",
  "10+ 专利软著商标",
];

export function AudienceStrategySection() {
  return (
    <section id="audience" className="relative bg-black px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/70">WHO WE SERVE</p>
            <h2 className="mt-4 max-w-4xl text-5xl font-black leading-none md:text-7xl">
              一套官网叙事，覆盖四类关键访客
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-white/58 md:text-lg">
            从企业决策、技术落地、日常使用到生态合作，GoAgent AIPC 用不同入口承接不同关切。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {audienceSegments.map((item) => (
            <article
              key={item.label}
              className="group min-h-[280px] rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-200/35 hover:bg-white/[0.075]"
            >
              <div className="mb-10 inline-flex rounded-full border border-white/12 px-3 py-1 text-xs font-semibold text-white/64">
                {item.label}
              </div>
              <h3 className="text-2xl font-bold leading-tight text-white">{item.title}</h3>
              <div className="mt-6 space-y-4 text-sm leading-6 text-white/62">
                <p>
                  <span className="text-white/90">核心关切：</span>
                  {item.focus}
                </p>
                <p>
                  <span className="text-white/90">触达路径：</span>
                  {item.route}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductMatrixSection() {
  return (
    <section id="matrix" className="relative overflow-hidden bg-[#f7f7f5] px-6 py-24 text-black md:px-10">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-black/40">PRODUCT MATRIX</p>
          <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">总有一款适合你的团队</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-black/62">
            从个人办公到万人企业，同一套 AIPC 理念，不同规模的部署姿态，配合企业知识库、算力模型管理与数字员工定制服务。
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          {productMatrix.map((product, index) => (
            <article
              key={product.name}
              className="flex min-h-[300px] flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_22px_60px_rgba(0,0,0,0.08)]"
            >
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.24em] opacity-55">{product.tag}</span>
                  <span className="text-3xl font-black opacity-20">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-2xl font-black leading-tight">{product.name}</h3>
                <p className="mt-3 text-sm font-semibold opacity-60">{product.users}</p>
              </div>
              <ul className="mt-8 space-y-3 text-sm font-medium opacity-75">
                {product.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoreAdvantagesSection() {
  return (
    <section id="capabilities" className="relative bg-black px-6 py-24 text-white md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/42">CORE CAPABILITIES</p>
          <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">不只是装了一个大模型</h2>
          <p className="mt-6 text-lg leading-8 text-white/58">
            GoAgent AIPC 从记忆、推理、指令理解到企业知识库做系统级重构，让 AI 从会回答迈向能执行。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {coreAdvantages.map((item) => (
            <article
              key={item.title}
              className="min-h-[280px] rounded-2xl border border-white/10 bg-white/[0.035] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.06]"
            >
              <div className="text-3xl font-black text-white/88">
                {item.metric}
              </div>
              <h3 className="mt-7 text-2xl font-black">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/62">{item.desc}</p>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                {item.proof}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnologyArchitectureSection() {
  return (
    <section id="technology" className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/42">AIOS ARCHITECTURE</p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">五层工程架构</h2>
          </div>
          <p className="text-lg leading-8 text-white/58">
            从底层模型路由到应用技能仓库，GoAgent AIPC 不是“大模型 + 对话框”的叠加，而是面向企业 AI 操作系统的完整基础设施。
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_430px]">
          <div className="grid gap-3">
            {techLayers.map(([level, title, desc], index) => (
              <article
                key={level}
                className="grid gap-4 border-b border-white/10 py-5 transition-all duration-300 hover:border-white/28 md:grid-cols-[72px_220px_1fr] md:items-start"
              >
                <div className="text-xl font-black text-white/32">{level}</div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="text-sm leading-7 text-white/60">{desc}</p>
                <span className="hidden md:absolute" aria-hidden="true">
                  {index}
                </span>
              </article>
            ))}
          </div>
          <AiosStackCard />
        </div>
      </div>
    </section>
  );
}

export function SecurityComplianceSection() {
  return (
    <section id="security" className="relative bg-white px-6 py-24 text-black md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-black/45">SECURITY</p>
            <h2 className="mt-4 text-5xl font-black leading-none md:text-8xl">
              数据不离企业，安全不靠信任
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/62">
              混合云基座让核心敏感数据本地化留存，弹性算力按需调用云端资源，任务过程可审计、可追溯、可管控。
            </p>
          </div>
          <div className="grid gap-4">
            {securityItems.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-black/10 bg-black/[0.035] p-6 transition-all duration-300 hover:-translate-x-2 hover:bg-black hover:text-white"
              >
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 opacity-65">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompanyTimelineSection() {
  return (
    <section id="company" className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-200/70">ABOUT JIUGO TURING</p>
          <h2 className="mt-4 text-5xl font-black leading-none md:text-8xl">下一代人工智能操作系统的缔造者</h2>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-white/58">
            九维图灵成立于 2024 年，总部位于上海虹口区，专注 AIOS、GoAgent 数字员工平台、GoData 向量知识库与 GoModel 算力模型服务管理平台。
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/42">MISSION</p>
              <h3 className="mt-4 text-3xl font-black leading-tight">用 AIOS 重新定义人与世界交互的方式</h3>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/42">VISION</p>
              <h3 className="mt-4 text-3xl font-black leading-tight">让全球 5 亿人告别无效加班</h3>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/42">VALUES</p>
              <h3 className="mt-4 text-3xl font-black leading-tight">坚持做正确的、有价值的难事</h3>
            </div>
          </div>

          <div className="space-y-5">
            {timeline.map((item) => (
              <article key={item.year} className="rounded-3xl border border-white/10 bg-white/[0.045] p-7">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-8">
                  <div className="text-5xl font-black text-white/20 md:w-32">{item.year}</div>
                  <div>
                    <h3 className="text-2xl font-black">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/62">{item.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {honors.map((honor) => (
            <span key={honor} className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/72">
              {honor}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerAssistantSection() {
  return (
    <section id="partners" className="relative bg-black px-6 py-24 text-white md:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/70">ECOSYSTEM</p>
          <h2 className="mt-4 text-5xl font-black leading-none md:text-7xl">共建 AI 生产力新生态</h2>
          <p className="mt-6 text-lg leading-8 text-white/58">
            面向企业软件代理商、IT 服务商、系统集成商、ISV 与行业咨询机构，提供产品授权、销售支持、API 接口与联合方案开发支持。
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {["渠道合作", "技术生态合作", "行业解决方案合作"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <h3 className="text-lg font-black">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-white/54">申请合作计划，获取商务与技术支持。</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-300/15 via-white/[0.06] to-pink-300/15 p-8 md:p-10">
          <div className="mb-8 inline-flex rounded-full border border-white/12 bg-black/25 px-4 py-2 text-sm font-semibold text-white/70">
            小九 · GoAgent 产品顾问
          </div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">让咨询从一次对话开始</h2>
          <p className="mt-6 text-base leading-8 text-white/62">
            常驻全站右下角浮窗，支持产品咨询、方案推荐、试用申请、渠道合作与复杂问题人工转接。
          </p>
          <div className="mt-8 space-y-3 text-sm text-white/70">
            <p className="rounded-2xl bg-black/30 p-4">触发人工转接：定制报价、企业采购、技术集成、API 对接、用户明确要求人工。</p>
            <p className="rounded-2xl bg-white/10 p-4">转接前采集：姓名、公司、职位、联系方式与 100 字以内需求描述。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
