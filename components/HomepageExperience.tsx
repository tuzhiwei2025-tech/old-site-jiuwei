"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { KineticText } from "@/components/ui/kinetic-text";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SeamlessLoopVideo, type SeamlessLoopVideoHandle } from "@/components/SeamlessLoopVideo";
import { ScrollFrameCanvas, type ScrollFrameCanvasHandle, type ScrollFrameSequence } from "@/components/ScrollFrameCanvas";
import styles from "./HomepageExperience.module.css";

const AiosLanyard = dynamic(() => import("@/components/AiosLanyard").then((module) => module.AiosLanyard), {
  ssr: false,
});

type SceneCanvasRefs = {
  hero: React.RefObject<ScrollFrameCanvasHandle | null>;
  series: React.RefObject<ScrollFrameCanvasHandle | null>;
  operations: React.RefObject<ScrollFrameCanvasHandle | null>;
};
type SceneOverlayRefs = {
  hero: React.RefObject<HTMLDivElement | null>;
  seriesCopy: React.RefObject<HTMLDivElement | null>;
  seriesCards: React.RefObject<HTMLDivElement | null>;
  operationsCards: React.RefObject<HTMLDivElement | null>;
  lanyard: React.RefObject<HTMLDivElement | null>;
  progress: React.RefObject<HTMLSpanElement | null>;
};

const productSeries = [
  {
    id: "box",
    title: "AI机顶盒",
    body: "面向个人及小微团队的轻量级 AI 智能终端，开箱即可调用全栈数字员工能力。",
    label: "01",
    products: [["Cloud 云轻盒 与 Mix 轻终端", "/product/box"]],
  },
  {
    id: "consumer",
    title: "AIPC 消费级产品",
    body: "云地协同的本地化 AIPC，兼顾数据隐私安全、算力成本与小微团队协作。",
    label: "02",
    products: [["GoAgent Spark Solo", "/product/solo"], ["GoAgent Spark Cluster", "/product/cluster"]],
  },
  {
    id: "enterprise",
    title: "AIPC 企业级产品",
    body: "面向中大型企业的全栈私有化 AIPC，覆盖数字员工协同、知识管理与安全管控。",
    label: "03",
    products: [["8卡及以上服务器定制方案", "/product/enterprise"]],
  },
] as const;

const frameSequences: Record<keyof SceneCanvasRefs, ScrollFrameSequence> = {
  hero: { path: "/homepage-experience/frames/hero", frameCount: 73, width: 864, height: 496 },
  series: { path: "/homepage-experience/frames/series", frameCount: 55, width: 864, height: 496 },
  operations: { path: "/homepage-experience/frames/operations", frameCount: 55, width: 864, height: 496 },
};

const digitalEmployees = [
  {
    name: "Amy",
    role: "通用助手",
    summary: "随时应答，全能协作",
    capabilities: ["日常问题解答", "智能任务管理", "多场景支持"],
    caseTitle: "企业行政与政企办公",
    caseTagline: "把格式严苛的公文任务，变成两步可完成的工作。",
    caseBody: "GoAgent 内置企业知识库，理解集团历年文档规范。从说清楚事由到生成格式合规的完整初稿，只需两步。",
    quote: "以前最怕下班前接到紧急发文，对着十几项格式规范改到深夜，是常有的事。",
    source: "某城市建设投资集团 · 行政办公室",
    results: ["新员工公文上手周期缩短 80%", "文档品牌合规率 42% 至 96%", "单份项目汇报制作时长减少 62%"],
  },
  {
    name: "Lina",
    role: "Word 专家",
    summary: "高效撰写，专业文档",
    capabilities: ["智能文档生成", "格式自动优化", "多模板支持"],
    caseTitle: "企业行政与政企办公",
    caseTagline: "让企业文档规范成为可调用的工作能力。",
    caseBody: "针对格式严苛、标准繁多的公文撰写，Lina 调用企业知识库和历史规范，输出格式合规的完整初稿。",
    quote: "以前最怕下班前接到紧急发文，对着十几项格式规范改到深夜，是常有的事。",
    source: "某城市建设投资集团 · 行政办公室",
    results: ["新员工公文上手周期缩短 80%", "文档品牌合规率 42% 至 96%", "单份项目汇报制作时长减少 62%"],
  },
  {
    name: "Aira",
    role: "PPT 专家",
    summary: "专业演示，秒出方案",
    capabilities: ["内容排版与设计", "智能配色方案", "精美模板生成"],
    caseTitle: "文化传媒与创意策划",
    caseTagline: "把创意时间还给创意人。",
    caseBody: "GoAgent 接管基础排版与标准化文案，让策划人从重复调整 PPT 的工作中抽离，回归策略与创意本身。",
    quote: "比稿季同时接四五个项目，一半时间都在调 PPT 排版，创意都想不动了。",
    source: "某文化传媒公司 · 策划部",
    results: ["竞标方案周期从 3 天缩短至 4 小时", "基础人力投入减少 70%", "月度可承接项目量提升 2.3 倍"],
  },
  {
    name: "Max",
    role: "Excel 专家",
    summary: "数据分析，图表可视化",
    capabilities: ["数据分析与展示", "智能图表生成", "自动化报表"],
    caseTitle: "教育行业教研办公",
    caseTagline: "让老师把时间还给学生。",
    caseBody: "针对备课、出卷、学情分析与评语撰写等案头工作，GoAgent 自动生成教案框架、试卷初稿与个性化评语。",
    quote: "备课本、练习卷、学情分析、学生评语，经常把作业抱回家，改到半夜。",
    source: "某市属重点中学 · 高二年级组老师",
    results: ["单课备课时间平均减少 55%", "试卷与学情报告产出效率提升 3 倍", "让更多时间回到学生身上"],
  },
  {
    name: "Lumi",
    role: "开发专家",
    summary: "想法变应用，低代码落地",
    capabilities: ["快速应用开发", "网站原型生成", "低代码平台"],
    caseTitle: "金融 制造 政企场景",
    caseTagline: "高安全要求场景的本地化 AI 方案。",
    caseBody: "面向数据合规要求严格的行业，GoAgent AIPC 支持完整本地化部署，数据不出内网，任务执行全程可追溯审计。",
    quote: "云端 AI 往往寸步难行，本地化部署让高安全要求场景也能获得稳定的 AI 生产力。",
    source: "金融 制造 政企行业落地场景",
    results: ["研报与合规文件标准化输出", "产品手册与质检报告自动生成", "数据不出内网 全程可追溯"],
  },
] as const;

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);
const fadeIn = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start), 0, 1);
const fadeOut = (progress: number, start: number, end: number) => 1 - fadeIn(progress, start, end);
const rangeOpacity = (progress: number, startIn: number, endIn: number, startOut: number, endOut: number) =>
  fadeIn(progress, startIn, endIn) * fadeOut(progress, startOut, endOut);

function useWideViewport() {
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const update = () => setIsWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isWide;
}

function useSceneInView(ref: React.RefObject<HTMLElement | null>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

function setLayerState(element: HTMLElement | null, opacity: number, offset = 34) {
  if (!element) return;

  const visibility = opacity > 0.015;
  element.style.opacity = opacity.toFixed(3);
  element.style.transform = `translate3d(0, ${((1 - opacity) * offset).toFixed(2)}px, 0)`;
  element.style.visibility = visibility ? "visible" : "hidden";
  element.style.pointerEvents = opacity > 0.72 ? "auto" : "none";
}

function setCanvasOpacity(canvas: ScrollFrameCanvasHandle | null, opacity: number) {
  const element = canvas?.element;
  if (!element) return;
  element.style.opacity = opacity.toFixed(3);
  element.style.visibility = opacity > 0.01 ? "visible" : "hidden";
}

function setElementOpacity(element: HTMLElement | null, opacity: number) {
  if (!element) return;
  element.style.opacity = opacity.toFixed(3);
  element.style.visibility = opacity > 0.01 ? "visible" : "hidden";
}

function useScrollDeck(
  sceneRef: React.RefObject<HTMLElement | null>,
  introVideoRef: React.RefObject<SeamlessLoopVideoHandle | null>,
  canvasRefs: SceneCanvasRefs,
  overlayRefs: SceneOverlayRefs,
  setShowLanyard: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    const scene = sceneRef.current;
    const introVideo = introVideoRef.current;
    const heroCanvas = canvasRefs.hero.current;
    const seriesCanvas = canvasRefs.series.current;
    const operationsCanvas = canvasRefs.operations.current;
    const {
      hero: heroOverlayRef,
      seriesCopy: seriesCopyRef,
      seriesCards: seriesCardsRef,
      operationsCards: operationsCardsRef,
      lanyard: lanyardRef,
      progress: progressRef,
    } = overlayRefs;
    const heroOverlay = heroOverlayRef.current;
    const seriesCopy = seriesCopyRef.current;
    const seriesCards = seriesCardsRef.current;
    const operationsCards = operationsCardsRef.current;
    const lanyard = lanyardRef.current;
    const progressIndicator = progressRef.current;
    if (!scene || !introVideo || !heroCanvas || !seriesCanvas || !operationsCanvas) return;

    let sceneStart = 0;
    let scrollDistance = 1;
    let targetProgress = 0;
    let lanyardVisible = false;
    let isMounted = true;
    const sceneCanvases = [heroCanvas, seriesCanvas, operationsCanvas];

    const renderScene = (progress: number) => {
      const introOpacity = fadeOut(progress, 0.025, 0.06);
      const heroOpacity = fadeIn(progress, 0.004, 0.04) * fadeOut(progress, 0.17, 0.2);
      const seriesOpacity = rangeOpacity(progress, 0.17, 0.21, 0.57, 0.62);
      const operationsOpacity = fadeIn(progress, 0.57, 0.64);

      const heroCopyOpacity = fadeOut(progress, 0.08, 0.19);
      const seriesCopyOpacity = rangeOpacity(progress, 0.22, 0.3, 0.48, 0.55);
      const seriesCardsOpacity = fadeIn(progress, 0.31, 0.4) * fadeOut(progress, 0.51, 0.58);
      const operationsCardsOpacity = fadeIn(progress, 0.66, 0.78);
      const lanyardOpacity = fadeIn(progress, 0.97, 0.995);

      setElementOpacity(introVideo.element, introOpacity);
      setCanvasOpacity(heroCanvas, heroOpacity);
      setCanvasOpacity(seriesCanvas, seriesOpacity);
      setCanvasOpacity(operationsCanvas, operationsOpacity);

      setLayerState(heroOverlay, heroCopyOpacity, 18);
      setLayerState(seriesCopy, seriesCopyOpacity);
      setLayerState(seriesCards, seriesCardsOpacity, 42);
      setLayerState(operationsCards, operationsCardsOpacity, 42);
      setLayerState(lanyard, lanyardOpacity, 60);

      if (progressIndicator) {
        progressIndicator.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      const shouldShowLanyard = progress >= 0.97;
      if (shouldShowLanyard !== lanyardVisible && isMounted) {
        lanyardVisible = shouldShowLanyard;
        setShowLanyard(shouldShowLanyard);
      }

      introVideo.setActive(introOpacity > 0.01 && !document.hidden);
      heroCanvas.setActive(progress < 0.22 && !document.hidden);
      seriesCanvas.setActive(progress >= 0.14 && progress < 0.64 && !document.hidden);
      operationsCanvas.setActive(progress >= 0.54 && !document.hidden);

      heroCanvas.render(fadeIn(progress, 0.03, 0.19));
      seriesCanvas.render(fadeIn(progress, 0.17, 0.57));
      operationsCanvas.render(fadeIn(progress, 0.57, 1));
    };

    const updateTarget = (nextProgress: number) => {
      targetProgress = clamp(nextProgress, 0, 1);
      renderScene(targetProgress);
    };

    const measureScene = () => {
      sceneStart = scene.getBoundingClientRect().top + window.scrollY;
      scrollDistance = Math.max(1, scene.offsetHeight - window.innerHeight);
    };

    const updateFromScroll = () => {
      const scrollPosition = window.scrollY;
      updateTarget(clamp((scrollPosition - sceneStart) / scrollDistance, 0, 1));
    };

    const handleScroll = () => {
      updateFromScroll();
    };

    const handleResize = () => {
      measureScene();
      updateFromScroll();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        introVideo.setActive(false);
        sceneCanvases.forEach((canvas) => canvas.setActive(false));
      } else {
        updateFromScroll();
      }
    };

    measureScene();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    updateFromScroll();

    return () => {
      isMounted = false;
      introVideo.setActive(false);
      sceneCanvases.forEach((canvas) => canvas.setActive(false));
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [canvasRefs, introVideoRef, overlayRefs, sceneRef, setShowLanyard]);
}

function ProductExplorer() {
  const [selectedId, setSelectedId] = useState<(typeof productSeries)[number]["id"]>(productSeries[0].id);
  const selected = productSeries.find((series) => series.id === selectedId) ?? productSeries[0];

  return (
    <div className={styles.productExplorer}>
      <div className={styles.productTabs} role="tablist" aria-label="AIPC 产品系列">
        {productSeries.map((series) => {
          const isSelected = series.id === selected.id;
          return (
            <button
              key={series.id}
              id={`series-tab-${series.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls="series-details"
              className={`${styles.productTab} ${isSelected ? styles.productTabSelected : ""}`}
              onClick={() => setSelectedId(series.id)}
              onPointerEnter={() => setSelectedId(series.id)}
            >
              <span>{series.label}</span>
              <strong>{series.title}</strong>
              <small>{series.body}</small>
            </button>
          );
        })}
      </div>
      <div id="series-details" role="tabpanel" aria-labelledby={`series-tab-${selected.id}`} className={styles.productDetails}>
        <p>{selected.title}</p>
        <div>
          {selected.products.map(([name, href]) => (
            <Link key={href} href={href} className={styles.productLink}>
              {name}
              <span aria-hidden="true">+</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function DigitalEmployeeCards() {
  const [activeEmployee, setActiveEmployee] = useState<(typeof digitalEmployees)[number] | null>(null);

  return (
    <>
      <div className={styles.employeeRail}>
        {digitalEmployees.map((employee, index) => {
          return (
            <button
              key={employee.name}
              type="button"
              onClick={() => setActiveEmployee(employee)}
              className={styles.employeeCard}
              aria-label={`查看${employee.name}案例`}
            >
              <span className={styles.employeeName}>{employee.name}</span>
              <span className={styles.employeeRole}>{employee.role}</span>
              <span className={styles.employeeSummary}>{employee.summary}</span>
              <span className={styles.employeeIndex}>{String(index + 1).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <Dialog open={Boolean(activeEmployee)} onOpenChange={(open) => !open && setActiveEmployee(null)}>
        {activeEmployee && (
          <DialogContent className="max-h-[calc(100dvh-2rem)] w-[min(92vw,80rem)] max-w-[80rem] overflow-x-hidden overflow-y-auto border border-white/85 bg-white/[0.68] p-0 text-[#1d1d1f] shadow-[0_30px_100px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-[38px] backdrop-saturate-150">
            <div className="relative overflow-hidden px-6 py-7 sm:px-10 sm:py-9 lg:px-12 lg:py-10">
              <div aria-hidden="true" className="absolute -right-20 -top-24 size-72 rounded-full bg-[#dbe9f0]/75 blur-3xl" />
              <div aria-hidden="true" className="absolute -bottom-28 left-1/3 size-56 rounded-full bg-white/90 blur-3xl" />
              <div className="relative">
                <DialogHeader className="text-left">
                  <div>
                    <p className="text-sm font-semibold text-[#1d1d1f]">{activeEmployee.name} · {activeEmployee.role}</p>
                    <p className="mt-1 text-xs tracking-[0.12em] text-[#86868b]">DIGITAL EMPLOYEE CASE</p>
                  </div>
                  <DialogTitle className="mt-7 max-w-[calc(100%-3rem)] text-[clamp(2rem,3.8vw,3.5rem)] font-semibold leading-[1.08] tracking-normal text-[#1d1d1f]">{activeEmployee.caseTitle}</DialogTitle>
                  <p className="mt-3 text-base font-medium text-[#515154]">{activeEmployee.caseTagline}</p>
                </DialogHeader>
                <DialogDescription className="mt-5 max-w-4xl border-l border-black/[0.12] pl-5 text-[15px] leading-7 text-[#6e6e73]">{activeEmployee.caseBody}</DialogDescription>
              </div>
            </div>
            <div className="grid gap-7 border-t border-black/[0.08] bg-white/[0.28] px-6 py-6 sm:px-10 sm:py-7 min-[480px]:grid-cols-[minmax(0,1.3fr)_minmax(17rem,0.7fr)] lg:px-12 lg:py-8">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-[#86868b]">一线反馈</p>
                <blockquote className="mt-3 max-w-xl text-[17px] leading-8 text-[#424245]">“{activeEmployee.quote}”</blockquote>
                <p className="mt-3 text-xs text-[#86868b]">{activeEmployee.source}</p>
              </div>
              <div className="border-l border-black/[0.1] pl-5 min-[480px]:pl-7">
                <p className="text-xs font-bold tracking-[0.14em] text-[#86868b]">落地效果</p>
                <ul className="mt-3 space-y-3 text-sm leading-5 text-[#424245]">
                  {activeEmployee.results.map((result, index) => <li key={result} className="grid grid-cols-[1.5rem_1fr] gap-2"><span className="text-xs font-semibold text-[#86868b]">0{index + 1}</span>{result}</li>)}
                </ul>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

export default function HomepageExperience() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const introVideoRef = useRef<SeamlessLoopVideoHandle | null>(null);
  const heroCanvasRef = useRef<ScrollFrameCanvasHandle | null>(null);
  const seriesCanvasRef = useRef<ScrollFrameCanvasHandle | null>(null);
  const operationsCanvasRef = useRef<ScrollFrameCanvasHandle | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const seriesCopyRef = useRef<HTMLDivElement | null>(null);
  const seriesCardsRef = useRef<HTMLDivElement | null>(null);
  const operationsCardsRef = useRef<HTMLDivElement | null>(null);
  const lanyardRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const [showLanyard, setShowLanyard] = useState(false);
  const isWide = useWideViewport();
  const sceneInView = useSceneInView(sceneRef);

  const canvasRefs = useMemo(
    () => ({
      hero: heroCanvasRef,
      series: seriesCanvasRef,
      operations: operationsCanvasRef,
    }),
    [],
  );
  const overlayRefs = useMemo(
    () => ({
      hero: heroOverlayRef,
      seriesCopy: seriesCopyRef,
      seriesCards: seriesCardsRef,
      operationsCards: operationsCardsRef,
      lanyard: lanyardRef,
      progress: progressRef,
    }),
    [],
  );

  useScrollDeck(sceneRef, introVideoRef, canvasRefs, overlayRefs, setShowLanyard);

  return (
    <section ref={sceneRef} id="homepage-experience" className={styles.experience} aria-label="GoAgent AIOS 首页互动展示">
      <div className={styles.scene}>
        <SeamlessLoopVideo
          ref={introVideoRef}
          className={styles.introLoop}
          videoClassName={styles.introLoopVideo}
          src="/视频-1.mp4"
        />
        <ScrollFrameCanvas
          ref={heroCanvasRef}
          className={`${styles.sceneVideo} ${styles.heroVideo}`}
          sequence={frameSequences.hero}
        />
        <ScrollFrameCanvas
          ref={seriesCanvasRef}
          className={styles.sceneVideo}
          sequence={frameSequences.series}
        />
        <ScrollFrameCanvas
          ref={operationsCanvasRef}
          className={styles.sceneVideo}
          sequence={frameSequences.operations}
        />

        <div className={styles.sceneShade} />

        <div ref={lanyardRef} className={styles.lanyardSlot} aria-hidden="true">
          {showLanyard && sceneInView && isWide && <AiosLanyard />}
        </div>

        <div ref={heroOverlayRef} className={`${styles.sceneOverlay} ${styles.heroOverlay}`}>
          <div className={styles.heroContent}>
            <KineticText
              as="h1"
              text="用AIOS重新定义人与世界交互的方式"
              className={styles.heroKineticTitle}
            />
          </div>
        </div>

        <div ref={seriesCopyRef} className={`${styles.sceneOverlay} ${styles.stageCopy} ${styles.seriesCopy}`}>
          <p>下一部分 · AIPC 产品体系</p>
          <h2>AIPC三大序列</h2>
          <span>从家庭到个人，再到企业组织，为不同场景提供自然、稳定的 AIOS 入口。</span>
        </div>
        <div ref={seriesCardsRef} className={`${styles.sceneOverlay} ${styles.stageCards}`}>
          <ProductExplorer />
        </div>

        <div ref={operationsCardsRef} className={`${styles.sceneOverlay} ${styles.stageCards} ${styles.employeeCardsStage}`}>
          <DigitalEmployeeCards />
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          <span ref={progressRef} />
        </div>
      </div>
    </section>
  );
}
