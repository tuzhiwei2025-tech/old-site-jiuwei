import Image from "next/image";

const legalLinks = [
  ["隐私政策", "/privacy"],
  ["服务条款", "/terms"],
  ["法律声明", "/legal"],
  ["网站地图", "/sitemap"],
] as const;

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-black/[0.08] bg-white/42 px-5 py-3 text-sm font-medium text-neutral-600 shadow-[0_-12px_34px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-[28px] backdrop-saturate-125 sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/90" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-end gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-base font-bold tracking-[-0.01em] text-[#20262d]">GoAgent AIPC</p>
              <p className="text-[13px] text-neutral-500">九维图灵 · 下一代人工智能操作系统</p>
            </div>
            <nav aria-label="网站相关链接" className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
              {legalLinks.map(([label, href]) => (
                <a key={href} href={href} className="transition-colors hover:text-[#20262d]">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <aside className="flex items-center gap-3 border-t border-black/[0.08] pt-2.5 lg:self-end lg:border-t-0 lg:border-l lg:pl-5 lg:pt-0">
            <Image
              src="/wechat-official-account.jpg"
              alt="九维图灵微信公众号二维码"
              width={72}
              height={72}
              className="size-[72px] shrink-0 rounded-md bg-white/70 object-cover shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.1]"
            />
            <div className="max-w-52">
              <p className="text-[13px] font-bold text-[#20262d]">关注九维图灵公众号</p>
              <p className="mt-0.5 text-[11px] leading-4 text-neutral-500">
                获取产品动态、AIOS 落地方案和数字员工应用案例
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-2 border-t border-black/[0.08] pt-2 text-[10px] leading-4 text-neutral-500">
          <div className="flex flex-col items-center justify-center gap-x-5 gap-y-0.5 text-center sm:flex-row sm:flex-wrap">
            <p>© 2026 九维图灵智能科技（上海）有限公司</p>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#20262d]">
              沪ICP备2026025446号-2
            </a>
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=31010902101481"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#20262d]"
            >
              <Image src="/beian-gov-icon.png" alt="" width={14} height={14} className="size-3.5" />
              沪公网安备31010902101481号
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
