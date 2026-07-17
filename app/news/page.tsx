import { AppleSubpageShell } from "@/components/AppleSubpageShell";

const updates = [
  {
    date: "2026.06",
    type: "产品动态",
    title: "GoAgent AIPC 完整产品矩阵正式发布",
    body: "AI机顶盒、云地协同消费级 AIPC 与企业级全栈私有化方案，覆盖个人、小微团队到中大型企业的 AIOS 使用需求。",
  },
  {
    date: "2026.07",
    type: "行业观察",
    title: "从单点工具到可协同的数字员工工作流",
    body: "企业 AI 落地的重点正在从单次问答转向任务拆解、知识调用、过程审计与结果交付的连续协作。",
  },
  {
    date: "2026.05",
    type: "公司动态",
    title: "GoAgent AIOS 获 BEYOND Innovation Awards 全球创新大奖",
    body: "九维图灵在 BEYOND Expo 2026 展示 GoAgent AIOS 数字员工解决方案，并持续推进智能体技术认证与产业生态合作。",
  },
] as const;

export default function NewsPage() {
  return (
    <AppleSubpageShell
      eyebrow="Newsroom"
      title="新闻与动态"
      intro="关注 GoAgent AIPC、AIOS 产品演进与九维图灵的最新进展"
      ctaLabel="联系我们"
      ctaHref="/contact"
    >
      <section className="border-t border-black/[0.08] bg-[#f5f5f7] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px overflow-hidden rounded-lg border border-black/[0.1] bg-black/[0.1] md:grid-cols-3">
            {updates.map((update) => (
              <article key={update.title} className="flex min-h-72 flex-col bg-white p-7 md:p-8">
                <div className="flex items-center justify-between text-xs font-bold tracking-[0.12em] text-[#86868b]">
                  <span>{update.type}</span>
                  <time>{update.date}</time>
                </div>
                <h2 className="mt-12 text-2xl font-semibold leading-tight text-[#1d1d1f]">{update.title}</h2>
                <p className="mt-5 text-[15px] leading-7 text-[#6e6e73]">{update.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppleSubpageShell>
  );
}
