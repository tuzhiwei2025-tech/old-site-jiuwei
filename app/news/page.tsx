import { ArrowUpRight } from "lucide-react";
import { AppleSubpageShell } from "@/components/AppleSubpageShell";

const updates = [
  {
    date: "2026.07.20",
    month: "JUL",
    category: "行业活动",
    title: "D.Transformer在孵企业九维图灵携核心产品亮相 WAIC 2026",
    summary: "在世界人工智能大会现场，九维图灵展示 GoAgent AIPC 与数字员工解决方案，和产业伙伴共同探索 AIOS 的真实落地。",
    image: "/news-waic-2026.jpg",
    href: "https://mp.weixin.qq.com/s/lLB8Ty3LtYZoVY8vxQsH7g",
  },
  {
    date: "2026.06.26",
    month: "JUN",
    category: "产品动态",
    title: "喜报 | NVIDIA DGX Spark 赋能 AIPC，GoAgent 数字员工正式上岗",
    summary: "以 NVIDIA DGX Spark 的算力为底座，GoAgent 数字员工走进真实工作流，让角色化 AI 能力成为团队可调用的生产力。",
    image: "/news-dgx-spark-digital-employees.jpg",
    href: "https://mp.weixin.qq.com/s/MDLo3SCDaAId02GnfMWvaw",
  },
  {
    date: "2026.05.31",
    month: "MAY",
    category: "公司动态",
    title: "斩获双奖、惊艳澳门！九维图灵在亚洲最大科技盛会上凭什么脱颖而出？",
    summary: "GoAgent AIPC 与 Agent Swarm 协同系统在 BEYOND Expo 获得双项荣誉，印证九维图灵在智能体协同领域的产品与技术能力。",
    image: "/news-beyond-expo-awards.jpg",
    href: "https://mp.weixin.qq.com/s/kp51IqDV9rtv9RK0zyNfDw",
  },
] as const;

export default function NewsPage() {
  return (
    <AppleSubpageShell
      eyebrow="Newsroom"
      title="新闻与动态"
      intro="记录 GoAgent AIPC、AIOS 产品演进与九维图灵的最新进展"
      ctaLabel="联系商务"
      ctaHref="/contact"
    >
      <section className="border-t border-black/[0.08] bg-[#f5f5f7] px-6 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[112rem]">
          <div className="flex flex-col justify-between gap-6 border-b border-black/[0.12] pb-8 md:flex-row md:items-end md:pb-10">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-[#86868b]">LATEST UPDATES</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal md:text-6xl">沿时间轴，阅读我们的下一步。</h2>
            </div>
            <p className="max-w-sm text-base font-medium leading-7 text-[#6e6e73]">每一篇动态均来自九维图灵官方微信公众号。</p>
          </div>

          <div className="relative mt-10 md:mt-14">
            <div className="absolute bottom-0 left-[4.15rem] top-0 hidden w-px bg-black/[0.12] md:block" />
            {updates.map((update, index) => (
              <article key={update.href} className="group relative grid gap-6 border-b border-black/[0.12] py-10 first:pt-0 last:border-b-0 md:grid-cols-[8.3rem_minmax(0,0.88fr)_minmax(0,1.12fr)] md:gap-10 md:py-16">
                <div className="relative flex items-start justify-between md:block">
                  <p className="text-4xl font-semibold leading-none tracking-tight text-[#1d1d1f] md:text-5xl">{update.month}</p>
                  <p className="mt-1 text-xs font-semibold tracking-[0.15em] text-[#86868b] md:mt-4">{update.date}</p>
                  <span className="absolute -right-[0.42rem] top-5 hidden size-[0.85rem] rounded-full border-[3px] border-[#f5f5f7] bg-[#1d1d1f] md:block" />
                </div>

                <a href={update.href} target="_blank" rel="noreferrer" className="order-3 block overflow-hidden rounded-2xl bg-[#d2d2d7] md:order-none">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={update.image} alt={update.title} className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]" />
                  </div>
                </a>

                <div className="flex flex-col md:py-1">
                  <p className="text-xs font-semibold tracking-[0.15em] text-[#86868b]">{String(index + 1).padStart(2, "0")} / {update.category}</p>
                  <h3 className="mt-5 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-normal text-[#1d1d1f] md:text-4xl">
                    <a href={update.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#0071e3]">{update.title}</a>
                  </h3>
                  <p className="mt-5 max-w-xl text-base font-medium leading-7 text-[#6e6e73]">{update.summary}</p>
                  <a href={update.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#1d1d1f] transition-colors hover:text-[#0071e3]">
                    阅读公众号原文
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppleSubpageShell>
  );
}
