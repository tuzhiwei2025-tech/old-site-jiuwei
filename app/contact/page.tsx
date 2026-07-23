import { AppleSubpageShell } from "@/components/AppleSubpageShell";

const offices = [
  ["上海", "上海市虹口区北外滩雷士德工学院 303 室"],
  ["北京", "北京市海淀区中关村 1 号搜狐网络大厦二层"],
  ["广州", "广州市海珠区琶洲大道 68 号华新中心 18 层"],
] as const;

const companyValues = [
  ["01", "使命", "用 AIOS 重新定义人与世界交互的方式。"],
  ["02", "愿景", "让全球 5 亿人告别无效加班。"],
  ["03", "方向", "构建跨模型、跨数据、跨应用的智能体协同生态。"],
] as const;

const milestones = [
  ["2024", "创立启程", "在上海成立，启动 GoAgent 智能体平台核心研发，入孵 NVIDIA 在中国的首个物理孵化器，并建立北京办公室。"],
  ["2025", "产品落地", "参与 NVIDIA GTC 等产业活动，完成国产存储产品互认证，入选智能体领域创新领军企业榜单，GoAgent.Store 开启全球内测。"],
  ["2026", "规模化商业深化", "完成智能体 L3 级团标认证，亮相 GDPS 2026 与 BEYOND Expo，正式发布完整 GoAgent AIPC 产品矩阵。"],
] as const;

const honors = [
  ["智能体系统技术能力分级 L3", "/官网文案及素材/3、公司信息/附件-资质及荣誉证书/智能体系统技术能力分级证书/智能体系统技术能力分级证书L3.jpg"],
  ["NVIDIA 创业企业优秀展示", "/官网文案及素材/3、公司信息/附件-资质及荣誉证书/NVIDIA创业企业优秀展示.jpg"],
  ["融中智能体领域创新领军企业", "/官网文案及素材/3、公司信息/附件-资质及荣誉证书/融中2024-2025年度智能体领域创新领军企业榜单.png"],
  ["2025 AI 领航杯技术创新奖", "/官网文案及素材/3、公司信息/附件-资质及荣誉证书/2025AI领航杯技术创新奖.jpg"],
  ["2025 虹口区创新创业优秀案例", "/官网文案及素材/3、公司信息/附件-资质及荣誉证书/2025年度虹口区创新创业优秀案例.jpg"],
  ["九维图灵与海普存储产品互认证", "/官网文案及素材/3、公司信息/附件-资质及荣誉证书/产品互认证明（九维图灵&海普存储）.jpg"],
] as const;

export default function ContactPage() {
  return (
    <AppleSubpageShell
      eyebrow="About 9dimension"
      title="九维图灵"
      intro="深耕人工智能底层技术，专注构建下一代人工智能操作系统 AIOS。"
      ctaLabel="联系商务"
      ctaHref="#contact"
    >
      <section id="company" className="border-t border-black/[0.08] bg-white px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[112rem] gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-24">
          <div>
            <p className="mb-6 text-sm font-semibold tracking-[0.16em] text-[#86868b]">COMPANY</p>
            <figure className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#f5f5f7] lg:aspect-[5/6]">
              <img
                src="/company-team-disneyland.jpg"
                alt="九维图灵团队合影"
                className="size-full object-cover object-[center_72%]"
              />
            </figure>
          </div>
          <div>
            <h2 className="max-w-5xl text-balance text-4xl font-semibold leading-[1.04] tracking-normal md:text-6xl">
              让专家级 AI 能力，成为每个人都能直接调用的工作方式。
            </h2>
            <div className="mt-12 grid max-w-4xl gap-7 border-t border-black/[0.12] pt-7 md:grid-cols-2 md:gap-12">
              <p className="text-lg font-medium leading-9 text-[#515154]">
                九维图灵创立于 2024 年，总部坐落于上海虹口区。公司核心布局人工智能操作系统与多智能体协作平台，搭建跨模型、跨数据、跨应用的智能体协同生态。
              </p>
              <p className="text-lg font-medium leading-9 text-[#515154]">
                GoAgent AIPC 以群体智能协作为内核，结合混合模型部署、长效记忆机制与推理优化，在本地与云端之间建立更可控的 AI 生产力基础设施。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[112rem]">
          <div className="border-y border-black/[0.1]">
            {companyValues.map(([index, title, description]) => (
              <article key={title} className="grid gap-5 border-b border-black/[0.1] py-9 last:border-b-0 md:grid-cols-[7rem_minmax(0,0.65fr)_minmax(0,1.35fr)] md:items-baseline md:gap-8 md:py-12">
                <span className="text-sm font-semibold tracking-[0.14em] text-[#86868b]">{index}</span>
                <h3 className="text-3xl font-semibold tracking-normal md:text-4xl">{title}</h3>
                <p className="max-w-3xl text-xl font-medium leading-9 text-[#515154] md:text-2xl md:leading-10">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-black py-24 text-white md:py-36">
        <div className="mx-auto flex max-w-[112rem] items-end justify-between gap-8 px-6 md:px-10">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-white/45">TIMELINE</p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-normal md:text-6xl">持续把 AIOS 带进真实场景。</h2>
          </div>
          <span className="hidden text-xs font-semibold tracking-[0.14em] text-white/45 md:block">SWIPE TO EXPLORE</span>
        </div>
        <div className="mt-16 flex snap-x snap-mandatory overflow-x-auto border-y border-white/15 pl-6 scrollbar-none md:mt-24 md:pl-[max(2.5rem,calc((100vw-112rem)/2))]">
          {milestones.map(([year, title, description]) => (
            <article key={year} className="flex min-h-[24rem] w-[min(78vw,34rem)] shrink-0 snap-start flex-col border-r border-white/15 px-6 py-8 first:pl-0 md:min-h-[28rem] md:w-[34rem] md:px-10 md:py-12">
              <p className="text-base font-semibold tracking-[0.16em] text-white/48">{year}</p>
              <h3 className="mt-auto text-3xl font-semibold leading-tight tracking-normal md:text-4xl">{title}</h3>
              <p className="mt-6 max-w-md text-base font-medium leading-8 text-white/62">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[112rem]">
          <div className="flex flex-col justify-between gap-6 border-b border-black/[0.1] pb-10 md:flex-row md:items-end md:pb-12">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-[#86868b]">CREDENTIALS</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-normal md:text-6xl">资质与荣誉。</h2>
            </div>
            <p className="max-w-lg text-base font-medium leading-7 text-[#6e6e73]">来自智能体能力认证、产业生态合作与技术创新赛事的成果记录。</p>
          </div>
          <div className="mt-10 flex snap-x snap-mandatory overflow-x-auto border-b border-black/[0.1] scrollbar-none">
            {honors.map(([title, src]) => (
              <figure key={src} className="w-[min(72vw,22rem)] shrink-0 snap-start border-r border-black/[0.1] px-5 pb-8 first:pl-0 last:border-r-0 md:w-[22rem] md:px-7">
                <div className="aspect-[4/3] bg-[#f5f5f7] p-4">
                  <img src={src} alt={title} loading="lazy" className="size-full object-contain transition-transform duration-500 hover:scale-[1.03]" />
                </div>
                <figcaption className="pt-5 text-sm font-semibold leading-6 text-[#424245]">{title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#f5f5f7] px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[112rem]">
          <p className="text-sm font-semibold tracking-[0.16em] text-[#86868b]">CONTACT</p>
          <div className="mt-8 border-t border-black/[0.12] pt-8 md:mt-10 md:pt-10">
            <a href="mailto:sales@9dimension.tech" className="break-all text-[clamp(2rem,5.2vw,6.4rem)] font-semibold leading-none tracking-normal text-[#1d1d1f] transition-colors hover:text-[#0071e3]">
              sales@9dimension.tech
            </a>
            <p className="mt-6 text-lg font-medium text-[#6e6e73]">销售咨询、生态合作、企业试点与技术集成。</p>
          </div>
          <div className="mt-20 grid border-y border-black/[0.12] md:grid-cols-3">
            {offices.map(([city, address]) => (
              <article key={city} className="border-b border-black/[0.12] py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <p className="text-sm font-semibold tracking-[0.14em] text-[#86868b]">{city}</p>
                <p className="mt-5 max-w-xs text-xl font-semibold leading-8 text-[#1d1d1f]">{address}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppleSubpageShell>
  );
}
