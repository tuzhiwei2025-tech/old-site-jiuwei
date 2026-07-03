"use client";

import { useEffect, useState } from "react";
import type * as React from "react";
import { ArrowUpRight, BarChart3, Boxes, ChevronDown, Code2, Database, Globe2, Layers3, Shield, Sparkles, UsersRound } from "lucide-react";
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

const menuGroups: Record<string, MenuGroup> = {
  产品: {
    cards: [
      ["产品矩阵", "/product", "Cloud、Mix、Spark 与企业私有化方案", Globe2],
      ["数字员工", "/product#digital-workers", "Amy、Lina、Aira、Max、Lumi", UsersRound],
      ["AIOS 工作台", "/technology", "模型路由、记忆、知识库与技能仓库", Layers3],
    ],
    links: [
      ["GoData", "/technology#godata", Database],
      ["GoModel", "/technology#gomodel", Boxes],
      ["安全合规", "/technology#security", Shield],
      ["应用案例", "/cases", BarChart3],
      ["API", "/technology", Code2],
    ],
  },
  技术: {
    cards: [
      ["Skills 仓库", "/technology", "通过 Function Call 组合可执行能力", Sparkles],
      ["Memory OS", "/technology", "短期、中期、长期与跨会话记忆", Layers3],
      ["GoData 知识库", "/technology#godata", "私有化检索与企业知识沉淀", Database],
    ],
    links: [
      ["AIOS 五层架构", "/technology", Layers3],
      ["上下文工程", "/technology", Code2],
      ["模型路由", "/technology#gomodel", Boxes],
      ["安全审计", "/technology#security", Shield],
      ["案例验证", "/cases", BarChart3],
    ],
  },
  公司: {
    cards: [
      ["公司介绍", "/home#about", "九维图灵与 AIOS 产品体系", Globe2],
      ["合作生态", "/home#contact", "渠道、行业方案与技术生态合作", UsersRound],
      ["联系我们", "/home#contact", "预约演示与商务咨询", BarChart3],
    ],
    links: [
      ["发展历程", "/home#about", Layers3],
      ["商务咨询", "/home#contact", UsersRound],
      ["法律声明", "/legal", Shield],
      ["隐私政策", "/privacy", Shield],
      ["网站地图", "/sitemap", Code2],
    ],
  },
};

export function SiteHeader({ onNavigate, onLogoClick, mode = "floating" }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<keyof typeof menuGroups | null>(null);
  const [isScrolled, setIsScrolled] = useState(mode !== "home");
  const activeGroup = openMenu ? menuGroups[openMenu] : null;
  const isHomeTop = mode === "home" && !isScrolled;

  useEffect(() => {
    if (mode !== "home") return;

    const updateScrolled = () => setIsScrolled(window.scrollY > 96);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [mode]);

  return (
    <div
      className={`mx-auto transition-all duration-300 ${
        isHomeTop ? "w-full px-0 pt-0" : "w-[min(76rem,calc(100vw-2rem))] pt-4"
      }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div
        className={`flex h-[56px] items-center justify-between transition-all duration-300 md:h-[58px] ${
          isHomeTop
            ? "rounded-none border-b border-white/14 bg-white/[0.08] px-5 text-white shadow-none backdrop-blur-2xl sm:px-8"
            : "rounded-2xl border border-neutral-200 bg-white/88 px-5 text-neutral-950 shadow-sm backdrop-blur-2xl sm:px-6"
        }`}
      >
        <a
          href="/home"
          onClick={onLogoClick}
          className="flex items-center gap-2.5 text-base font-black tracking-tight md:text-lg"
        >
          <span className={`grid size-7 place-items-center rounded-lg border-2 text-sm leading-none md:size-8 md:text-base ${
            isHomeTop ? "border-white text-white" : "border-neutral-950 text-neutral-950"
          }`}>
            G
          </span>
          GoAgent AIPC
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {(Object.keys(menuGroups) as Array<keyof typeof menuGroups>).map((label) => (
            <button
              key={label}
              type="button"
              onMouseEnter={() => setOpenMenu(label)}
              onFocus={() => setOpenMenu(label)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
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
            className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
              isHomeTop ? "text-white/82 hover:bg-white/10 hover:text-white" : "text-neutral-950 hover:bg-neutral-100"
            }`}
          >
            案例
          </a>
        </nav>

        <a
          href="/home#contact"
          onClick={(event) => onNavigate(event, "/home#contact")}
          className={`group inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold tracking-normal transition-all duration-200 md:h-10 md:px-[18px] ${
            isHomeTop
              ? "border border-white/22 bg-white/[0.075] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl hover:border-white/38 hover:bg-white/[0.13]"
              : "border border-neutral-950 bg-neutral-950 text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 hover:bg-neutral-800"
          }`}
        >
          联系我们
          <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div
        className={`mx-auto w-[min(76rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg transition-all duration-200 ${
          activeGroup ? "mt-2 max-h-[360px] opacity-100" : "mt-0 max-h-0 border-transparent opacity-0"
        }`}
      >
        {activeGroup && (
          <div className="grid grid-cols-[1fr_260px]">
            <div className="grid grid-cols-3 gap-4 p-5">
              {activeGroup.cards.map(([title, href, desc, Icon]) => (
                <a
                  key={`${title}-${href}`}
                  href={href}
                  onClick={(event) => onNavigate(event, href)}
                  className="group relative min-h-[210px] overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 transition-colors hover:bg-neutral-50"
                >
                  <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(105deg,transparent_0_45%,rgba(0,0,0,0.04)_45%_55%,transparent_55%),linear-gradient(#e9e9e9_1px,transparent_1px),linear-gradient(90deg,#e9e9e9_1px,transparent_1px)] [background-size:100%_100%,54px_54px,54px_54px]" />
                  <Icon className="relative size-6 text-neutral-700" />
                  <div className="relative mt-20">
                    <h3 className="text-lg font-bold text-neutral-800">{title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">{desc}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="border-l border-neutral-200 p-6">
              <div className="space-y-5">
                {activeGroup.links.map(([title, href, Icon]) => (
                  <a
                    key={`${title}-${href}`}
                    href={href}
                    onClick={(event) => onNavigate(event, href)}
                    className="flex items-center gap-3 text-lg font-medium text-neutral-950 transition-colors hover:text-neutral-600"
                  >
                    <Icon className="size-5 text-neutral-500" />
                    {title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
