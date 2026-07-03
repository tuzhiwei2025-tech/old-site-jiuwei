"use client";

import type * as React from "react";
import { ArrowUpRight, Building2, CheckCircle2, FileText, GraduationCap, Landmark, LockKeyhole, PenTool, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

const cases = [
  {
    industry: "政企办公",
    icon: Landmark,
    title: "城市建设投资集团",
    summary: "围绕公文、汇报、项目档案和制度规范，建立可追溯的政企办公知识库。",
    scenario: "导入历年公文、品牌规范和项目材料后，员工只需要说明事项、受众和输出格式，即可生成合规初稿。",
    results: ["新员工上手周期缩短 80%", "品牌合规率从 42% 提升到 96%", "汇报制作时长减少 62%"],
    modules: ["GoData 知识库", "Memory OS", "公文写作 Skills"],
  },
  {
    industry: "文化传媒",
    icon: PenTool,
    title: "文化传媒公司",
    summary: "把提案模板、历史案例和品牌视觉规范沉淀为创意团队的共享底座。",
    scenario: "客户经理输入客户背景、预算、渠道和品牌调性，数字员工先产出提案框架、标准文案和视觉参考。",
    results: ["竞标方案从 3 天压缩到 4 小时", "基础人力投入减少 70%", "月承接项目量提升 2.3x"],
    modules: ["方案生成 Skills", "品牌规范库", "多模态素材检索"],
  },
  {
    industry: "教育行业",
    icon: GraduationCap,
    title: "市属重点中学",
    summary: "把备课、教研、学情分析和试卷资料整理接入教师日常工作流。",
    scenario: "同步教材、教案、试卷和学情资料，教师可快速生成教案草稿、分层练习和学情摘要。",
    results: ["备课时间减少 55%", "试卷与学情报告效率提升 3x", "非教学事务耗时下降 40%"],
    modules: ["教学资料库", "学情分析 Agent", "文档格式化 Skills"],
  },
  {
    industry: "高安全行业",
    icon: LockKeyhole,
    title: "金融与制造私有化场景",
    summary: "在数据合规严格的组织内，以本地化部署和审计链路降低 AI 落地风险。",
    scenario: "通过 Spark Solo 或 Spark Cluster 部署在企业内网，接入权限系统、知识库和专属智能体。",
    results: ["数据不出内网", "操作链路可追溯", "支持行业专属智能体"],
    modules: ["Spark Cluster", "权限与审计", "本地模型路由"],
  },
];

const process = [
  ["01", "资料接入", "导入文档、制度、模板、历史案例和业务知识。"],
  ["02", "知识建模", "按部门、权限、场景和输出格式组织企业知识。"],
  ["03", "数字员工配置", "配置写作、检索、分析、汇报和应用开发等工作流。"],
  ["04", "试点复盘", "用真实任务验证效率、合规和协作收益。"],
];

export function CasesPage() {
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    window.location.href = target;
  };

  return (
    <main className="min-h-screen bg-[#f6f7f4] text-neutral-950">
      <nav className="fixed left-0 right-0 top-0 z-50">
        <SiteHeader
          onLogoClick={(event) => {
            event.preventDefault();
            window.location.href = "/home";
          }}
          onNavigate={handleNavigate}
        />
      </nav>

      <section className="relative overflow-hidden px-6 pt-36 md:px-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-white/80 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-400">USE CASES</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.04] tracking-normal text-neutral-950 md:text-7xl">
              让 AI 进入真实业务流程
            </h1>
          </div>
          <div className="rounded-[28px] border border-neutral-200 bg-white/72 p-6 shadow-sm backdrop-blur-xl md:p-8">
            <p className="text-lg leading-8 text-neutral-600">
              GoAgent AIPC 面向企业内部的文档、方案、报告、备课、数据分析和知识检索任务。案例页重点展示它如何在不同行业减少重复劳动，并把组织经验沉淀为可复用能力。
            </p>
            <div className="mt-6 grid gap-3 text-sm text-neutral-600 sm:grid-cols-3">
              {["本地化部署", "企业知识库", "数字员工协作"].map((item) => (
                <div key={item} className="rounded-2xl border border-neutral-200 bg-[#fbfbf8] px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {cases.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.industry}
                className="group rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/70 md:p-7"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl border border-neutral-200 bg-[#f4f5f1] text-neutral-800">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-500">{item.industry}</p>
                      <h2 className="mt-1 text-2xl font-black leading-tight tracking-normal text-neutral-950">{item.title}</h2>
                    </div>
                  </div>
                  <ArrowUpRight className="mt-1 size-5 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-neutral-900" />
                </div>

                <p className="mt-6 text-base leading-7 text-neutral-600">{item.summary}</p>
                <div className="mt-6 rounded-2xl border border-neutral-200 bg-[#f8f8f4] p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                    <FileText className="size-4" />
                    业务场景
                  </div>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">{item.scenario}</p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {item.results.map((result) => (
                    <div key={result} className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm leading-6 text-neutral-700">
                      <CheckCircle2 className="mb-2 size-4 text-neutral-950" />
                      {result}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.modules.map((module) => (
                    <span key={module} className="rounded-full bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-white">
                      {module}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-400">IMPLEMENTATION</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-normal md:text-5xl">
                从资料到上线，按真实任务验证价值
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {process.map(([number, title, desc]) => (
                <div key={number} className="rounded-3xl border border-neutral-200 bg-[#f8f8f4] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-neutral-500">{number}</span>
                    <ShieldCheck className="size-5 text-neutral-400" />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-neutral-950">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-neutral-950 p-6 text-white md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="size-6 text-white/70" />
              <p className="text-base font-semibold">需要把行业资料接入 GoAgent AIPC？</p>
            </div>
            <a
              href="/home#contact"
              onClick={(event) => handleNavigate(event, "/home#contact")}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-neutral-950 transition-colors hover:bg-neutral-200"
            >
              预约案例咨询
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
