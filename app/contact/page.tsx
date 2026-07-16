import { Award, Building2, Globe2, Mail, MapPin, Target, UsersRound } from "lucide-react";
import { AppleSubpageShell } from "@/components/AppleSubpageShell";

const offices = [
  ["北京", "商务与行业合作"],
  ["上海", "产品与交付支持"],
  ["广州", "华南客户服务"],
];

const companyValues = [
  ["使命", "用 AIOS 重新定义人与世界交互的方式。", Target],
  ["愿景", "让全球 5 亿人告别无效加班。", Globe2],
  ["方向", "构建下一代人工智能操作系统与多智能体协作平台。", UsersRound],
] as const;

const honors = ["L3+ 可控级认证", "清华三创奖", "WTIF 世界科创奖", "行业标准参编", "多项专利布局", "NVIDIA 生态合作报道"];

export default function ContactPage() {
  return (
    <AppleSubpageShell
      eyebrow="Contact"
      title="告诉我们你的办公场景。"
      intro="GoAgent 产品顾问会先完成需求收集与方案推荐，再由商务团队安排后续沟通。"
      ctaLabel="发送邮件"
      ctaHref="mailto:sales@9dimension.tech"
    >
      <section className="bg-white px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
          <a href="mailto:sales@9dimension.tech" className="min-w-0 rounded-[30px] bg-[#f5f5f7] p-8 transition hover:bg-[#ededf0]">
            <Mail className="size-8 text-[#0071e3]" />
            <h2 className="mt-14 break-all text-3xl font-semibold tracking-[-0.02em] sm:text-4xl sm:tracking-[-0.04em]">
              sales@9dimension.tech
            </h2>
            <p className="mt-4 text-base font-medium text-[#6e6e73]">销售咨询、生态合作、企业试点。</p>
          </a>
          <article className="rounded-[30px] bg-[#f5f5f7] p-8">
            <MapPin className="size-8 text-[#0071e3]" />
            <h2 className="mt-14 text-4xl font-semibold tracking-[-0.04em]">办公地点</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {offices.map(([city, detail]) => (
                <div key={city} className="rounded-2xl bg-white px-4 py-4">
                  <p className="text-lg font-semibold text-[#1d1d1f]">{city}</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#6e6e73]">{detail}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="company" className="bg-[#f5f5f7] px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[38px] bg-white p-8 md:p-12">
            <Building2 className="size-10 text-[#0071e3]" />
            <p className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-[#86868b]">Company</p>
            <h2 className="mt-4 max-w-4xl text-balance text-5xl font-semibold leading-[1] tracking-[-0.04em] md:text-7xl">
              从 AI 工具，走向 AIOS。
            </h2>
            <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-[#6e6e73]">
              九维图灵成立于 2024 年，总部位于上海虹口，专注 AIOS、多智能体协作平台与企业级 AIPC 落地。
            </p>
          </article>
          <article className="rounded-[38px] bg-black p-8 text-white md:p-12">
            <Award className="size-10 text-white/70" />
            <h3 className="mt-12 text-4xl font-semibold tracking-[-0.04em]">认证与荣誉</h3>
            <div className="mt-8 grid gap-3">
              {honors.map((honor) => (
                <div key={honor} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white/78">
                  {honor}
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mx-auto mt-4 grid max-w-7xl gap-4 md:grid-cols-3">
          {companyValues.map(([title, description, Icon]) => (
            <article key={title} className="min-h-56 rounded-[30px] bg-white p-8">
              <Icon className="size-8 text-[#0071e3]" />
              <h3 className="mt-12 text-4xl font-semibold tracking-[-0.04em]">{title}</h3>
              <p className="mt-4 text-lg font-medium leading-8 text-[#6e6e73]">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </AppleSubpageShell>
  );
}
