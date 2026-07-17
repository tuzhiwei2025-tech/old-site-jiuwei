"use client";

import { useEffect, useState } from "react";
import type * as React from "react";
import Image from "next/image";
import { ChevronDown, Cloud, HardDrive, Menu, MonitorCog, Server, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type HeaderProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onLogoClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  mode?: "floating" | "home";
};

type ProductChild = [title: string, href: string, desc: string, Icon: LucideIcon];
const productNav: ProductChild[] = [
  ["AI机顶盒", "/product/box", "面向个人及小微团队的轻量级 AI 智能终端，开箱启用数字员工能力。", Cloud],
  ["AIPC 消费级产品", "/product/solo", "云地协同的本地化 AIPC，兼顾数据隐私、算力成本与多人协同。", MonitorCog],
  ["AIPC 企业级产品", "/product/enterprise", "面向中大型企业的全栈私有化方案，提供安全管控与系统集成能力。", Server],
];

export function SiteHeader({ onNavigate, onLogoClick, mode = "floating" }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeProduct = openMenu === "产品";
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
        isAtTop ? "w-full px-0 pt-0" : "w-[min(34rem,calc(100vw-2rem))] pt-4"
      }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div
        className={`flex h-[56px] items-center gap-2 transition-all duration-300 md:h-[58px] ${
          isHomeTop
            ? "justify-between rounded-none bg-gradient-to-b from-black/40 to-transparent px-5 text-white shadow-none sm:px-8"
            : isAtTop
              ? "justify-between rounded-none bg-white/72 px-5 text-neutral-950 shadow-none backdrop-blur-2xl sm:px-8"
              : "justify-center rounded-2xl border border-white/16 bg-slate-950/16 px-5 text-white shadow-[0_14px_36px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:px-6"
        }`}
      >
        <a
          href="/home"
          onClick={onLogoClick}
          className={`flex h-8 shrink-0 items-center whitespace-nowrap ${isAtTop ? "" : "hidden"}`}
        >
          <Image
            src="/jiuweituling-logo.png"
            alt="九维图灵"
            width={1105}
            height={272}
            priority
            className={`h-6 w-auto transition-[filter] md:h-7 ${isHomeTop ? "brightness-0 invert" : "brightness-0"}`}
          />
        </a>

        <nav className="hidden shrink-0 items-center justify-center gap-1 whitespace-nowrap min-[1200px]:flex">
          <a
            href="/home"
            onClick={onLogoClick}
            className={`rounded-xl px-2.5 py-2 text-[13px] font-bold transition-colors min-[1360px]:px-3.5 min-[1360px]:text-sm ${
              isHomeTop || !isAtTop ? "text-white/78 hover:bg-white/10 hover:text-white" : "text-neutral-950 hover:bg-neutral-100"
            }`}
          >
            首页
          </a>
          <div className="shrink-0" onMouseEnter={() => setOpenMenu("产品")} onFocus={() => setOpenMenu("产品")}>
            <button
              type="button"
              aria-expanded={activeProduct}
              onClick={() => setOpenMenu((menu) => menu === "产品" ? null : "产品")}
              className={`inline-flex items-center gap-1 whitespace-nowrap rounded-xl px-2.5 py-2 text-[13px] font-bold transition-colors min-[1360px]:px-3.5 min-[1360px]:text-sm ${
                activeProduct
                  ? isHomeTop || !isAtTop ? "bg-white/14 text-white" : "bg-neutral-100 text-neutral-950"
                  : isHomeTop || !isAtTop ? "text-white/78 hover:bg-white/10 hover:text-white" : "text-neutral-950 hover:bg-neutral-100"
              }`}
            >
              产品
              <ChevronDown className={`size-3.5 transition-transform ${activeProduct ? "rotate-180" : ""}`} />
            </button>
          </div>
          <a
            href="/contact#company"
            onClick={(event) => onNavigate(event, "/contact#company")}
            className={`shrink-0 whitespace-nowrap rounded-xl px-2.5 py-2 text-[13px] font-bold transition-colors min-[1360px]:px-3.5 min-[1360px]:text-sm ${
              isHomeTop || !isAtTop ? "text-white/78 hover:bg-white/10 hover:text-white" : "text-neutral-950 hover:bg-neutral-100"
            }`}
          >
            公司
          </a>
          <a
            href="/news"
            onClick={(event) => onNavigate(event, "/news")}
            className={`shrink-0 whitespace-nowrap rounded-xl px-2.5 py-2 text-[13px] font-bold transition-colors min-[1360px]:px-3.5 min-[1360px]:text-sm ${
              isHomeTop || !isAtTop ? "text-white/78 hover:bg-white/10 hover:text-white" : "text-neutral-950 hover:bg-neutral-100"
            }`}
          >
            新闻
          </a>
        </nav>

        <div className={`flex shrink-0 items-center gap-2 ${isAtTop ? "" : "hidden"}`}>
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
            className={`inline-flex shrink-0 items-center whitespace-nowrap text-sm font-semibold tracking-normal transition-colors ${
              isHomeTop
                ? "text-white/82 hover:text-white"
                : "text-neutral-950 hover:text-neutral-600"
            }`}
          >
            联系我们
          </a>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-200 min-[1200px]:hidden ${mobileMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="mt-2 grid gap-2 rounded-2xl border border-neutral-200 bg-white p-3 shadow-lg" aria-label="移动端导航">
          <a href="/home" onClick={(event) => { setMobileMenuOpen(false); onLogoClick(event); }} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-neutral-950 hover:bg-neutral-100">
            首页
          </a>
          <div className="rounded-xl bg-neutral-50 p-2">
            <p className="px-2 py-1.5 text-sm font-bold text-neutral-950">
              产品
            </p>
            <div className="mt-1 grid gap-1 border-t border-neutral-200 pt-1">
              {productNav.map(([label, href]) => (
                <a key={label} href={href} onClick={(event) => { setMobileMenuOpen(false); onNavigate(event, href); }} className="rounded-lg px-2 py-2 text-sm font-medium text-neutral-600 hover:bg-white hover:text-neutral-950">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <a href="/contact#company" onClick={(event) => { setMobileMenuOpen(false); onNavigate(event, "/contact#company"); }} className="rounded-xl px-3 py-2.5 text-sm font-bold text-neutral-950 hover:bg-neutral-100">公司</a>
          <a href="/news" onClick={(event) => { setMobileMenuOpen(false); onNavigate(event, "/news"); }} className="rounded-xl px-3 py-2.5 text-sm font-bold text-neutral-950 hover:bg-neutral-100">新闻</a>
        </nav>
      </div>

      <div
        className={`mx-auto overflow-hidden rounded-xl border border-white/16 bg-slate-950/16 shadow-[0_18px_48px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition-all duration-200 ${
          "w-[min(56rem,calc(100vw-2rem))]"
        } ${
          activeProduct ? "mt-2 hidden max-h-[220px] opacity-100 min-[1200px]:block" : "mt-0 hidden max-h-0 border-transparent opacity-0 min-[1200px]:block"
        }`}
      >
        {activeProduct && (
          <div className="grid grid-cols-3 gap-2 p-2.5">
            {productNav.map(([title, href, desc, Icon]) => (
              <a
                key={`${title}-${href}`}
                href={href}
                onClick={(event) => onNavigate(event, href)}
                className="group relative min-h-[124px] overflow-hidden rounded-lg border border-white/14 bg-white/[0.06] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition duration-200 hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.12]"
              >
                <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(105deg,transparent_0_45%,rgba(255,255,255,0.2)_45%_55%,transparent_55%),linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:100%_100%,38px_38px,38px_38px]" />
                <Icon className="relative size-[18px] text-white/72" />
                <div className="relative mt-6">
                  <h3 className="text-[15px] font-bold text-white/90">{title}</h3>
                  <p className="mt-1 text-[11px] leading-[1.125rem] text-white/55">{desc}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
