"use client";

import { useEffect, useState } from "react";
import type * as React from "react";
import { ArrowUpRight, BarChart3, Boxes, ChevronDown, Cloud, Code2, Database, ExternalLink, HardDrive, House, Layers3, Menu, MonitorCog, Server, Shield, Sparkles, UsersRound, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type HeaderProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onLogoClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  mode?: "floating" | "home";
};

type MenuCard = [title: string, href: string, desc: string, Icon: LucideIcon];
type MenuLink = [title: string, href: string, Icon: LucideIcon];
type MenuGroup = {
  cards: MenuCard[];
  links: MenuLink[];
};
type ProductChild = [title: string, href: string, desc: string, Icon: LucideIcon];
type ProductNavItem = {
  label: string;
  href: string;
  children?: ProductChild[];
};

const menuGroups: Record<string, MenuGroup> = {
  公司: {
    cards: [
      ["Skills 仓库", "/technology", "通过 Function Call 组合可执行能力", Sparkles],
      ["GoData 知识库", "/technology", "私有化检索与企业知识沉淀", Database],
      ["合作生态", "/contact", "渠道、行业方案与技术生态合作", UsersRound],
    ],
    links: [
      ["AIOS 五层架构", "/technology", Layers3],
      ["上下文工程", "/technology", Code2],
      ["模型接入", "/technology", Boxes],
      ["安全审计", "/technology#security", Shield],
      ["案例验证", "/cases", BarChart3],
    ],
  },
};

const productNav: ProductNavItem[] = [
  {
    label: "AI机顶盒",
    href: "/product/box",
    children: [
      ["Cloud 云轻盒", "/product/box#cloud", "纯云端形态，注册登录即可使用数字员工工作台。", Cloud],
      ["Mix 轻终端", "/product/box#mix", "本地知识库加云端模型，兼顾资料边界与使用效率。", HardDrive],
    ],
  },
  {
    label: "AIPC 消费级产品",
    href: "/product/solo",
    children: [
      ["GoAgent Spark Solo 工作站", "/product/solo", "面向个人与核心岗位的单机本地 AIOS 工作站。", MonitorCog],
      ["GoAgent Spark Cluster 集群", "/product/cluster", "为中小团队提供可共享的私有算力池。", Server],
    ],
  },
  {
    label: "AIPC 企业级产品",
    href: "/product/enterprise",
  },
] as const;

const demoNav = [
  ["goagent.store", "https://goagent.store"],
  ["smartguys.ai", "https://smartguys.ai"],
] as const;

export function SiteHeader({ onNavigate, onLogoClick, mode = "floating" }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeGroup = openMenu && openMenu in menuGroups ? menuGroups[openMenu as keyof typeof menuGroups] : null;
  const activeProduct = productNav.find((product) => product.label === openMenu && product.children);
  const activePanel = activeGroup ?? activeProduct;
  const isAtTop = !isScrolled;
  const isHomeTop = mode === "home" && isAtTop;

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 96);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <div
      className={`mx-auto transition-all duration-300 ${
        isAtTop ? "w-full px-0 pt-0" : "w-[min(76rem,calc(100vw-2rem))] pt-4"
      }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div
        className={`flex h-[56px] items-center justify-between gap-2 transition-all duration-300 md:h-[58px] ${
          isHomeTop
            ? "rounded-none border-b border-white/14 bg-white/[0.08] px-5 text-white shadow-none backdrop-blur-2xl sm:px-8"
            : isAtTop
              ? "rounded-none border-b border-neutral-200/80 bg-white/72 px-5 text-neutral-950 shadow-none backdrop-blur-2xl sm:px-8"
              : "rounded-2xl border border-neutral-200 bg-white/88 px-5 text-neutral-950 shadow-sm backdrop-blur-2xl sm:px-6"
        }`}
      >
        <a
          href="/home"
          onClick={onLogoClick}
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-base font-black tracking-tight md:text-lg"
        >
          <span className={`grid size-7 place-items-center rounded-lg border-2 text-sm leading-none md:size-8 md:text-base ${
            isHomeTop ? "border-white text-white" : "border-neutral-950 text-neutral-950"
          }`}>
            G
          </span>
          GoAgent AIPC
        </a>

        <nav className="hidden shrink-0 items-center gap-1 whitespace-nowrap min-[1200px]:flex">
          <a
            href="/home"
            onClick={onLogoClick}
            aria-label="首页"
            title="首页"
            className={`grid size-9 place-items-center rounded-xl transition-colors ${
              isHomeTop ? "text-white/82 hover:bg-white/10 hover:text-white" : "text-neutral-950 hover:bg-neutral-100"
            }`}
          >
            <House className="size-4" />
          </a>
          {productNav.map((product) => (
            <div
              key={product.label}
              className="shrink-0"
              onMouseEnter={() => product.children && setOpenMenu(product.label)}
              onFocus={() => product.children && setOpenMenu(product.label)}
            >
              <a
                href={product.href}
                onClick={(event) => onNavigate(event, product.href)}
                className={`inline-flex items-center gap-1 whitespace-nowrap rounded-xl px-2.5 py-2 text-[13px] font-bold transition-colors min-[1360px]:px-3.5 min-[1360px]:text-sm ${
                  openMenu === product.label
                    ? isHomeTop
                      ? "bg-white/14 text-white"
                      : "bg-neutral-100 text-neutral-950"
                    : isHomeTop
                      ? "text-white/82 hover:bg-white/10 hover:text-white"
                      : "text-neutral-950 hover:bg-neutral-100"
                }`}
              >
                {product.label}
                {product.children && <ChevronDown className={`size-3.5 transition-transform ${openMenu === product.label ? "rotate-180" : ""}`} />}
              </a>
            </div>
          ))}
          {(Object.keys(menuGroups) as Array<keyof typeof menuGroups>).map((label) => (
            <button
              key={label}
              type="button"
              onMouseEnter={() => setOpenMenu(label)}
              onFocus={() => setOpenMenu(label)}
              className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 py-2 text-[13px] font-bold transition-colors min-[1360px]:px-3.5 min-[1360px]:text-sm ${
                openMenu === label
                  ? isHomeTop
                    ? "bg-white/14 text-white"
                    : "bg-neutral-100 text-neutral-950"
                  : isHomeTop
                    ? "text-white/82 hover:bg-white/10 hover:text-white"
                    : "text-neutral-950 hover:bg-neutral-100"
              }`}
            >
              {label}
              <ChevronDown className={`size-3.5 transition-transform ${openMenu === label ? "rotate-180" : ""}`} />
            </button>
          ))}
          <a
            href="/cases"
            onClick={(event) => onNavigate(event, "/cases")}
            className={`shrink-0 whitespace-nowrap rounded-xl px-2.5 py-2 text-[13px] font-bold transition-colors min-[1360px]:px-3.5 min-[1360px]:text-sm ${
              isHomeTop ? "text-white/82 hover:bg-white/10 hover:text-white" : "text-neutral-950 hover:bg-neutral-100"
            }`}
          >
            案例
          </a>
          {demoNav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 py-2 text-[13px] font-bold transition-colors min-[1360px]:px-3.5 min-[1360px]:text-sm ${
                isHomeTop ? "text-white/82 hover:bg-white/10 hover:text-white" : "text-neutral-950 hover:bg-neutral-100"
              }`}
            >
              {label}
              <ExternalLink className="size-3.5 opacity-60" />
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label={mobileMenuOpen ? "关闭导航" : "打开导航"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={`grid size-9 place-items-center rounded-xl transition-colors min-[1200px]:hidden ${
              isHomeTop ? "text-white hover:bg-white/10" : "text-neutral-950 hover:bg-neutral-100"
            }`}
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <a
            href="/contact"
            onClick={(event) => onNavigate(event, "/contact")}
            className={`group inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold tracking-normal transition-all duration-200 md:h-10 md:px-[18px] ${
              isHomeTop
                ? "border border-white/22 bg-white/[0.075] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl hover:border-white/38 hover:bg-white/[0.13]"
                : "border border-neutral-950 bg-neutral-950 text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 hover:bg-neutral-800"
            }`}
          >
            联系我们
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-200 min-[1200px]:hidden ${mobileMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="mt-2 grid gap-2 rounded-2xl border border-neutral-200 bg-white p-3 shadow-lg" aria-label="移动端导航">
          <a href="/home" onClick={(event) => { setMobileMenuOpen(false); onLogoClick(event); }} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-neutral-950 hover:bg-neutral-100">
            <House className="size-4 text-neutral-500" />
            首页
          </a>
          {productNav.map((product) => (
            <div key={product.label} className="rounded-xl bg-neutral-50 p-2">
              <a href={product.href} onClick={(event) => { setMobileMenuOpen(false); onNavigate(event, product.href); }} className="block px-2 py-1.5 text-sm font-bold text-neutral-950">
                {product.label}
              </a>
              {product.children && (
                <div className="mt-1 grid gap-1 border-t border-neutral-200 pt-1">
                  {product.children.map(([label, href]) => (
                    <a key={label} href={href} onClick={(event) => { setMobileMenuOpen(false); onNavigate(event, href); }} className="rounded-lg px-2 py-2 text-sm font-medium text-neutral-600 hover:bg-white hover:text-neutral-950">
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="/technology" onClick={(event) => { setMobileMenuOpen(false); onNavigate(event, "/technology"); }} className="rounded-xl px-3 py-2.5 text-sm font-bold text-neutral-950 hover:bg-neutral-100">技术能力</a>
          <a href="/cases" onClick={(event) => { setMobileMenuOpen(false); onNavigate(event, "/cases"); }} className="rounded-xl px-3 py-2.5 text-sm font-bold text-neutral-950 hover:bg-neutral-100">案例</a>
          {demoNav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-neutral-950 hover:bg-neutral-100"
            >
              {label}
              <ExternalLink className="size-3.5 text-neutral-500" />
            </a>
          ))}
        </nav>
      </div>

      <div
        className={`mx-auto overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg transition-all duration-200 ${
          activeProduct ? "w-[min(42rem,calc(100vw-2rem))]" : "w-[min(58rem,calc(100vw-2rem))]"
        } ${
          activePanel ? "mt-2 hidden max-h-[260px] opacity-100 min-[1200px]:block" : "mt-0 hidden max-h-0 border-transparent opacity-0 min-[1200px]:block"
        }`}
      >
        {activeGroup && (
          <div className="grid grid-cols-[1fr_190px]">
            <div className="grid grid-cols-3 gap-2.5 p-3">
              {activeGroup.cards.map(([title, href, desc, Icon]) => (
                <a
                  key={`${title}-${href}`}
                  href={href}
                  onClick={(event) => onNavigate(event, href)}
                  className="group relative min-h-[150px] overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:bg-neutral-50"
                >
                  <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(105deg,transparent_0_45%,rgba(0,0,0,0.04)_45%_55%,transparent_55%),linear-gradient(#e9e9e9_1px,transparent_1px),linear-gradient(90deg,#e9e9e9_1px,transparent_1px)] [background-size:100%_100%,38px_38px,38px_38px]" />
                  <Icon className="relative size-5 text-neutral-700" />
                  <div className="relative mt-10">
                    <h3 className="text-base font-bold text-neutral-800">{title}</h3>
                    <p className="mt-1.5 max-w-sm text-xs leading-5 text-neutral-500">{desc}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="border-l border-neutral-200 p-4">
              <div className="space-y-3">
                {activeGroup.links.map(([title, href, Icon]) => (
                  <a
                    key={`${title}-${href}`}
                    href={href}
                    onClick={(event) => onNavigate(event, href)}
                    className="flex items-center gap-2.5 text-sm font-medium text-neutral-950 transition-colors hover:text-neutral-600"
                  >
                    <Icon className="size-4 text-neutral-500" />
                    {title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeProduct?.children && (
          <div className="grid grid-cols-2 gap-2.5 p-3">
            {activeProduct.children.map(([title, href, desc, Icon]) => (
              <a
                key={`${title}-${href}`}
                href={href}
                onClick={(event) => onNavigate(event, href)}
                className="group relative min-h-[150px] overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:bg-neutral-50"
              >
                <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(105deg,transparent_0_45%,rgba(0,0,0,0.04)_45%_55%,transparent_55%),linear-gradient(#e9e9e9_1px,transparent_1px),linear-gradient(90deg,#e9e9e9_1px,transparent_1px)] [background-size:100%_100%,38px_38px,38px_38px]" />
                <Icon className="relative size-5 text-neutral-700" />
                <div className="relative mt-10">
                  <h3 className="text-base font-bold text-neutral-800">{title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-neutral-500">{desc}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
