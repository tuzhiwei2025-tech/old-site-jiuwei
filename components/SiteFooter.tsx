import Image from "next/image";
import { ExternalLink } from "lucide-react";

const legalLinks = [
  ["隐私政策", "/privacy"],
  ["服务条款", "/terms"],
  ["法律声明", "/legal"],
] as const;

const demoLinks = [
  ["goagent.store", "https://goagent.store"],
  ["smartguys.ai", "https://smartguys.ai"],
] as const;

type SiteFooterProps = {
  variant?: "default" | "home";
};

export function SiteFooter({ variant = "default" }: SiteFooterProps) {
  const isHome = variant === "home";

  return (
    <footer className={`relative isolate overflow-hidden px-5 py-4 text-sm sm:px-8 ${
      isHome
        ? "relative z-20 -mt-[132px] border-0 bg-gradient-to-t from-black/40 to-transparent text-white/68"
        : "border-t border-black/[0.08] bg-[#f7f7f8]/88 text-neutral-600 shadow-[0_-10px_28px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl backdrop-saturate-125"
    }`}>
      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className={`text-[15px] font-bold tracking-normal ${isHome ? "text-white" : "text-[#20262d]"}`}>GoAgent AIPC</p>
              <p className={`text-[12px] ${isHome ? "text-white/58" : "text-neutral-500"}`}>九维图灵 · 下一代人工智能操作系统</p>
            </div>
            <nav aria-label="网站相关链接" className={`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] ${isHome ? "text-white/58" : "text-neutral-500"}`}>
              {legalLinks.map(([label, href]) => (
                <a key={href} href={href} className={`transition-colors ${isHome ? "hover:text-white" : "hover:text-[#20262d]"}`}>
                  {label}
                </a>
              ))}
              <span aria-hidden="true" className={`h-3 w-px ${isHome ? "bg-white/20" : "bg-black/[0.12]"}`} />
              {demoLinks.map(([label, href]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 transition-colors ${isHome ? "hover:text-white" : "hover:text-[#20262d]"}`}>
                  {label}
                  <ExternalLink className="size-3 opacity-65" />
                </a>
              ))}
            </nav>
          </div>

          <aside className={`flex items-center gap-2.5 lg:border-l lg:pl-6 ${isHome ? "lg:border-white/15" : "lg:border-black/[0.08]"}`}>
            <Image
              src="/wechat-official-account.jpg"
              alt="九维图灵微信公众号二维码"
              width={64}
              height={64}
              className="size-16 shrink-0 rounded-md bg-white object-cover ring-1 ring-black/[0.1]"
            />
            <div>
              <p className={`text-[13px] font-semibold ${isHome ? "text-white" : "text-[#20262d]"}`}>微信公众号</p>
              <p className={`mt-0.5 text-[11px] ${isHome ? "text-white/58" : "text-neutral-500"}`}>扫码关注最新动态</p>
            </div>
          </aside>
        </div>

        <div className={`mt-3 border-t pt-2.5 text-[10px] leading-4 ${isHome ? "border-white/15 text-white/52" : "border-black/[0.08] text-neutral-500"}`}>
          <div className="flex flex-col items-center justify-center gap-x-5 gap-y-0.5 text-center sm:flex-row sm:flex-wrap">
            <p>© 2026 九维图灵智能科技（上海）有限公司</p>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className={`transition-colors ${isHome ? "hover:text-white" : "hover:text-[#20262d]"}`}>
              沪ICP备2026025446号-2
            </a>
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=31010902101481"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 transition-colors ${isHome ? "hover:text-white" : "hover:text-[#20262d]"}`}
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
