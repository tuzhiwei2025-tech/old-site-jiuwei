"use client";

import { useEffect, useRef, useState } from "react";
import type * as React from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  GraduationCap,
  Landmark,
  LockKeyhole,
  PenTool,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteNavigate } from "@/components/AppleSubpageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./CasesStoryPage.module.css";

type CaseTheme = "government" | "creative" | "education" | "secure";

type CaseStudy = {
  id: string;
  number: string;
  industry: string;
  title: [string, string];
  quote: string;
  source: string;
  icon: LucideIcon;
  theme: CaseTheme;
  visualLabel: string;
  visualDetail: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
};

const caseStudies: CaseStudy[] = [
  {
    id: "government",
    number: "01",
    industry: "政企办公",
    title: ["让公文撰写与文档格式", "不再成为加班的原因"],
    quote: "以前最怕下班前接到紧急发文，对着十几项格式规范改到深夜，是常有的事。",
    source: "某城市建设投资集团 行政办公室",
    icon: Landmark,
    theme: "government",
    visualLabel: "公文知识库",
    visualDetail: "规范 已归档",
    metrics: [
      { value: "80%", label: "新员工上手周期缩短" },
      { value: "42% -> 96%", label: "文档品牌合规率" },
      { value: "62%", label: "单份汇报制作时间减少" },
    ],
  },
  {
    id: "creative",
    number: "02",
    industry: "文化传媒",
    title: ["把提案排版的时间", "还给创意本身"],
    quote: "比稿季同时接四五个项目，一半时间都在调 PPT 排版，创意都想不动了。",
    source: "某文化传媒公司 策划部",
    icon: PenTool,
    theme: "creative",
    visualLabel: "提案工作台",
    visualDetail: "4 个项目 并行",
    metrics: [
      { value: "3 天 -> 4 小时", label: "竞标方案周期" },
      { value: "70%", label: "基础人力投入减少" },
      { value: "2.3x", label: "月度可承接项目量提升" },
    ],
  },
  {
    id: "education",
    number: "03",
    industry: "教育行业",
    title: ["让老师把时间", "还给学生"],
    quote: "备课本、练习卷、学情分析、学生评语，经常把作业抱回家，改到半夜。",
    source: "某市属重点中学 高二年级组老师",
    icon: GraduationCap,
    theme: "education",
    visualLabel: "教学资料库",
    visualDetail: "学情 已同步",
    metrics: [
      { value: "55%", label: "单课备课时间减少" },
      { value: "3x", label: "试卷与学情报告产出效率" },
      { value: "40%", label: "非教学事务耗时下降" },
    ],
  },
  {
    id: "secure",
    number: "04",
    industry: "高安全行业",
    title: ["敏感数据", "始终留在边界内"],
    quote: "数据不出内网，安全审计全程可追溯，适合合规要求严格的组织长期部署。",
    source: "金融 制造 政企 医疗 本地化部署场景",
    icon: LockKeyhole,
    theme: "secure",
    visualLabel: "私有化部署",
    visualDetail: "审计 可追溯",
    metrics: [
      { value: "本地", label: "金融研报与合规文件" },
      { value: "本地", label: "制造手册与质检报告" },
      { value: "本地", label: "医疗文献与知识库" },
    ],
  },
];

const implementationSteps = [
  ["01", "梳理一个岗位", "从频率高、格式重、耗时长的真实任务开始。"],
  ["02", "沉淀组织资料", "把模板、制度、案例和知识库接入可控边界。"],
  ["03", "看见实际结果", "以真实交付、效率数据和使用反馈持续优化。"],
] as const;

function scrollToId(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CaseVisual({ study }: { study: CaseStudy }) {
  const Icon = study.icon;

  return (
    <div className={styles.caseVisual} aria-hidden="true">
      <div className={styles.visualTopline}>
        <span>GOAGENT AIPC</span>
        <span>{study.number} / 04</span>
      </div>
      <div className={styles.visualGrid} />
      <div className={styles.visualWindow}>
        <div className={styles.visualWindowBar}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.visualWindowBody}>
          <span className={styles.visualIcon}><Icon /></span>
          <div className={styles.visualText}>
            <strong>{study.visualLabel}</strong>
            <span>{study.visualDetail}</span>
          </div>
          <div className={styles.visualLines}>
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className={styles.visualSheet}>
        <span className={styles.visualSheetTitle}>{study.industry}</span>
        <i />
        <i />
        <i />
        <b><Check /></b>
      </div>
      <div className={styles.visualStatus}>
        <span>AIOS</span>
        <span>已连接</span>
      </div>
    </div>
  );
}

export function CasesStoryPage() {
  const rootRef = useRef<HTMLElement>(null);
  const storyStageRef = useRef<HTMLElement>(null);
  const storyTrackRef = useRef<HTMLDivElement>(null);
  const storyTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const storyStage = storyStageRef.current;
    const storyTrack = storyTrackRef.current;

    if (!root || !storyStage || !storyTrack) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (conditions) => {
          const desktop = Boolean(conditions.conditions?.desktop);
          const reduceMotion = Boolean(conditions.conditions?.reduceMotion);
          const heroItems = gsap.utils.toArray<HTMLElement>("[data-case-hero]", root);
          const methodSteps = gsap.utils.toArray<HTMLElement>("[data-case-method]", root);

          if (!reduceMotion) {
            gsap.from(heroItems, {
              autoAlpha: 0,
              duration: 0.82,
              ease: "power3.out",
              stagger: 0.1,
              y: 24,
            });
          }

          if (desktop && !reduceMotion) {
            const horizontalTween = gsap.to(storyTrack, {
              ease: "none",
              x: () => -Math.max(0, storyTrack.scrollWidth - window.innerWidth),
              scrollTrigger: {
                anticipatePin: 1,
                end: () => `+=${window.innerWidth * (caseStudies.length - 1)}`,
                id: "case-stories",
                invalidateOnRefresh: true,
                pin: true,
                scrub: 0.72,
                start: "top top",
                trigger: storyStage,
                onUpdate: (trigger) => {
                  const nextIndex = Math.min(
                    caseStudies.length - 1,
                    Math.max(0, Math.round(trigger.progress * (caseStudies.length - 1))),
                  );

                  if (nextIndex !== activeIndexRef.current) {
                    activeIndexRef.current = nextIndex;
                    setActiveIndex(nextIndex);
                  }
                },
              },
            });

            storyTriggerRef.current = horizontalTween.scrollTrigger ?? null;
          } else {
            storyTriggerRef.current = null;
          }

          if (!reduceMotion) {
            gsap.from(methodSteps, {
              autoAlpha: 0,
              duration: 0.66,
              ease: "power3.out",
              scrollTrigger: {
                start: "top 82%",
                trigger: methodSteps[0]?.parentElement,
              },
              stagger: 0.1,
              y: 22,
            });
          }

          return () => {
            storyTriggerRef.current = null;
          };
        },
      );

      return () => media.revert();
    }, root);

    return () => {
      storyTriggerRef.current = null;
      context.revert();
    };
  }, []);

  const scrollToStory = (index: number) => {
    const trigger = storyTriggerRef.current;

    if (!trigger) {
      document.getElementById(caseStudies[index].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const progress = index / (caseStudies.length - 1);
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior: "smooth",
    });
  };

  return (
    <main ref={rootRef} className={styles.page}>
      <header className={styles.header}>
        <SiteHeader
          onLogoClick={(event) => {
            event.preventDefault();
            window.location.href = "/home";
          }}
          onNavigate={siteNavigate}
        />
      </header>

      <section id="overview" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p data-case-hero className={styles.eyebrow}>Case studies</p>
          <h1 data-case-hero>
            <span>真实工作</span>
            <span>看得见的变化</span>
          </h1>
          <p data-case-hero className={styles.heroDescription}>
            从政企文档到传媒提案，从课堂资料到私有化部署，GoAgent 把数字员工带进可衡量的日常工作。
          </p>
          <div data-case-hero className={styles.heroActions}>
            <a href="#stories" onClick={(event) => scrollToId(event, "stories")} className={styles.primaryButton}>
              浏览行业案例
              <ArrowDown className="size-4" />
            </a>
            <a href="/contact" className={styles.textLink}>
              讨论你的场景
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <div data-case-hero className={styles.heroVisual} aria-hidden="true">
          <div className={styles.heroVisualLabel}>四类真实场景</div>
          <div className={styles.heroVisualRows}>
            {caseStudies.map((study) => {
              const Icon = study.icon;
              return (
                <div key={study.id} className={styles.heroVisualRow}>
                  <span>{study.number}</span>
                  <Icon />
                  <b>{study.industry}</b>
                  <i />
                </div>
              );
            })}
          </div>
          <div className={styles.heroVisualFoot}>
            <span>AIOS</span>
            <span>业务流程</span>
          </div>
        </div>
      </section>

      <section className={styles.proofBand}>
        <p>不止展示 AI 能力</p>
        <h2>而是让一项工作<br />真的变得更简单</h2>
        <span>每个案例都从一项高频任务开始，逐步把资料、规范和经验沉淀为组织可复用的生产力。</span>
      </section>

      <section id="stories" ref={storyStageRef} className={styles.storyStage}>
        <div className={styles.storyRail}>
          <div>
            <p>案例验证</p>
            <span>{caseStudies[activeIndex].industry}</span>
          </div>
          <div className={styles.storyDots}>
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                type="button"
                onClick={() => scrollToStory(index)}
                className={index === activeIndex ? styles.storyDotActive : undefined}
                aria-label={`查看${study.industry}案例`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <span>{study.number}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={storyTrackRef} className={styles.storyTrack}>
          {caseStudies.map((study) => {
            const Icon = study.icon;

            return (
              <article id={study.id} key={study.id} className={`${styles.casePanel} ${styles[study.theme]}`}>
                <div className={styles.casePanelInner}>
                  <div className={styles.caseCopy}>
                    <div className={styles.caseMeta}>
                      <span>{study.number} / 04</span>
                      <span><Icon /> {study.industry}</span>
                    </div>
                    <h2>
                      <span>{study.title[0]}</span>
                      <span>{study.title[1]}</span>
                    </h2>
                    <blockquote>“{study.quote}”</blockquote>
                    <cite>{study.source}</cite>
                  </div>

                  <CaseVisual study={study} />

                  <dl className={styles.metrics}>
                    {study.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt>{metric.label}</dt>
                        <dd>{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="path" className={styles.pathSection}>
        <div className={styles.pathIntro}>
          <p>Implementation path</p>
          <h2>从一个真实岗位<br />开始改变</h2>
          <span>不需要先推翻现有流程。先选择一个值得被改善的工作，再决定后续的产品和部署路径。</span>
        </div>
        <ol className={styles.pathSteps}>
          {implementationSteps.map(([number, title, description]) => (
            <li key={number} data-case-method>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.closingSection}>
        <div>
          <ShieldCheck className="size-9" />
          <p>GoAgent AIPC</p>
          <h2>下一项值得被改变的工作<br />也许就在你的团队里</h2>
          <a href="/contact" className={styles.primaryButton}>
            联系我们
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
