"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { KineticText } from "@/components/ui/kinetic-text";
import styles from "./HomepageExperience.module.css";

const AiosLanyard = dynamic(() => import("@/components/AiosLanyard").then((module) => module.AiosLanyard), {
  ssr: false,
});

type StoryCardData = readonly [title: string, body: string, label?: string];
type Theme = "dark" | "light";
type SceneVideoRefs = {
  hero: React.RefObject<HTMLVideoElement | null>;
  series: React.RefObject<HTMLVideoElement | null>;
  workspace: React.RefObject<HTMLVideoElement | null>;
  operations: React.RefObject<HTMLVideoElement | null>;
};
type SceneOverlayRefs = {
  hero: React.RefObject<HTMLDivElement | null>;
  seriesCopy: React.RefObject<HTMLDivElement | null>;
  seriesCards: React.RefObject<HTMLDivElement | null>;
  workspaceCopy: React.RefObject<HTMLDivElement | null>;
  workspaceCards: React.RefObject<HTMLDivElement | null>;
  operationsCopy: React.RefObject<HTMLDivElement | null>;
  operationsCards: React.RefObject<HTMLDivElement | null>;
  lanyard: React.RefObject<HTMLDivElement | null>;
  progress: React.RefObject<HTMLSpanElement | null>;
};

const aipcSeries: readonly StoryCardData[] = [
  ["AI机顶盒", "Cloud 云轻盒与 Mix 轻终端，为个人与轻团队提供云端或混合模式的 AIOS 入口。", "01"],
  ["AIPC 消费级产品", "GoAgent Spark Solo 工作站与 Spark Cluster 集群，覆盖单机与中小团队私有算力。", "02"],
  ["AIPC 企业级产品", "8卡及以上服务器定制化方案，面向大型组织的高并发、本地化与安全管控需求。", "03"],
];

const workspaceSignals: readonly StoryCardData[] = [
  ["多 Agent 协作", "把调研、撰写、制图、复核拆给不同数字员工并行完成。"],
  ["知识库唤醒", "资料、品牌规范、历史项目会被自动调出，减少重复解释。"],
  ["交付流自动化", "从任务拆解到成稿归档，形成可复用的一人公司流水线。"],
];

const opsSignals: readonly StoryCardData[] = [
  ["任务雷达", "实时识别线索、风险和下一步动作，把杂乱输入变成清晰待办。"],
  ["自动汇报", "数字员工完成阶段成果后自动生成纪要、报告和复盘。"],
  ["持续进化", "每次交付都会沉淀为模板，让下一次执行更快、更准。"],
];

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

function setVideoOpacity(video: HTMLVideoElement | null, opacity: number) {
  if (!video) return;
  video.style.opacity = opacity.toFixed(3);
  video.style.visibility = opacity > 0.01 ? "visible" : "hidden";
}

function useScrollDeck(
  sceneRef: React.RefObject<HTMLElement | null>,
  videoRefs: SceneVideoRefs,
  overlayRefs: SceneOverlayRefs,
  setShowLanyard: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    const scene = sceneRef.current;
    const heroVideo = videoRefs.hero.current;
    const seriesVideo = videoRefs.series.current;
    const workspaceVideo = videoRefs.workspace.current;
    const operationsVideo = videoRefs.operations.current;
    const {
      hero: heroOverlayRef,
      seriesCopy: seriesCopyRef,
      seriesCards: seriesCardsRef,
      workspaceCopy: workspaceCopyRef,
      workspaceCards: workspaceCardsRef,
      operationsCopy: operationsCopyRef,
      operationsCards: operationsCardsRef,
      lanyard: lanyardRef,
      progress: progressRef,
    } = overlayRefs;
    const heroOverlay = heroOverlayRef.current;
    const seriesCopy = seriesCopyRef.current;
    const seriesCards = seriesCardsRef.current;
    const workspaceCopy = workspaceCopyRef.current;
    const workspaceCards = workspaceCardsRef.current;
    const operationsCopy = operationsCopyRef.current;
    const operationsCards = operationsCardsRef.current;
    const lanyard = lanyardRef.current;
    const progressIndicator = progressRef.current;
    if (!scene || !heroVideo || !seriesVideo || !workspaceVideo || !operationsVideo) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controllers = [seriesVideo, workspaceVideo, operationsVideo].map((video) => ({
      active: false,
      lastSeekAt: 0,
      targetTime: 0,
      video,
    }));

    let animationFrame = 0;
    let monitorFrame = 0;
    let renderedProgress = 0;
    let targetProgress = 0;
    let lanyardVisible = false;
    let lastTouchY: number | null = null;
    let isMounted = true;

    const pauseVideo = (video: HTMLVideoElement) => {
      if (!video.paused) video.pause();
      video.playbackRate = 1;
    };

    const playHero = () => {
      if (!heroVideo.paused) return;
      const playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => undefined);
    };

    const queuePlaybackMonitor = () => {
      if (monitorFrame) return;

      const monitor = () => {
        monitorFrame = 0;
        let shouldContinue = false;

        controllers.forEach((controller) => {
          const { video } = controller;
          if (!controller.active || video.paused) return;

          if (video.currentTime >= controller.targetTime - 0.035) {
            pauseVideo(video);
          } else {
            shouldContinue = true;
          }
        });

        if (shouldContinue) monitorFrame = window.requestAnimationFrame(monitor);
      };

      monitorFrame = window.requestAnimationFrame(monitor);
    };

    const syncScrubVideo = (video: HTMLVideoElement, localProgress: number, active: boolean) => {
      const controller = controllers.find((item) => item.video === video);
      if (!controller) return;

      controller.active = active;
      if (!active || !Number.isFinite(video.duration) || video.duration <= 0) {
        pauseVideo(video);
        return;
      }

      const maxTime = Math.max(0.04, video.duration - 0.04);
      const targetTime = clamp(localProgress * maxTime, 0.04, maxTime);
      const gap = targetTime - video.currentTime;
      controller.targetTime = targetTime;

      if (Math.abs(gap) <= 0.035) {
        pauseVideo(video);
        return;
      }

      // Forward scrolling follows the target by playback first; direct seeks are a fallback for jumps or reverse scroll.
      if (gap > 0 && gap < 0.8 && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        const playbackRate = clamp(1 + gap * 4.5, 1, 3.75);
        if (Math.abs(video.playbackRate - playbackRate) > 0.05) {
          video.playbackRate = playbackRate;
        }
        if (video.paused) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => undefined);
        }
        queuePlaybackMonitor();
        return;
      }

      const now = performance.now();
      if (now - controller.lastSeekAt < 75 && Math.abs(gap) < 0.55) return;

      pauseVideo(video);
      controller.lastSeekAt = now;
      try {
        if (typeof video.fastSeek === "function") {
          video.fastSeek(targetTime);
        } else {
          video.currentTime = targetTime;
        }
      } catch {
        // A transient media seek failure should not block native page scrolling.
      }
    };

    const renderScene = (progress: number) => {
      const heroOpacity = 1 - Math.min(progress * 12, 1);
      const seriesOpacity = rangeOpacity(progress, 0.03, 0.09, 0.44, 0.48);
      const workspaceOpacity = rangeOpacity(progress, 0.48, 0.54, 0.74, 0.78);
      const operationsOpacity = fadeIn(progress, 0.78, 0.84);

      const heroCopyOpacity = fadeOut(progress, 0.015, 0.12);
      const seriesCopyOpacity = rangeOpacity(progress, 0.12, 0.27, 0.4, 0.46);
      const seriesCardsOpacity = fadeIn(progress, 0.29, 0.4) * fadeOut(progress, 0.41, 0.47);
      const workspaceCopyOpacity = rangeOpacity(progress, 0.54, 0.62, 0.72, 0.78);
      const workspaceCardsOpacity = fadeIn(progress, 0.64, 0.71) * fadeOut(progress, 0.72, 0.78);
      const operationsCopyOpacity = fadeIn(progress, 0.84, 0.91);
      const operationsCardsOpacity = fadeIn(progress, 0.91, 0.97);
      const lanyardOpacity = fadeIn(progress, 0.9, 0.96);

      setVideoOpacity(heroVideo, heroOpacity);
      setVideoOpacity(seriesVideo, seriesOpacity);
      setVideoOpacity(workspaceVideo, workspaceOpacity);
      setVideoOpacity(operationsVideo, operationsOpacity);

      setLayerState(heroOverlay, heroCopyOpacity, 18);
      setLayerState(seriesCopy, seriesCopyOpacity);
      setLayerState(seriesCards, seriesCardsOpacity, 42);
      setLayerState(workspaceCopy, workspaceCopyOpacity);
      setLayerState(workspaceCards, workspaceCardsOpacity, 42);
      setLayerState(operationsCopy, operationsCopyOpacity);
      setLayerState(operationsCards, operationsCardsOpacity, 42);
      setLayerState(lanyard, lanyardOpacity, 18);

      if (progressIndicator) {
        progressIndicator.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      const shouldShowLanyard = progress >= 0.9;
      if (shouldShowLanyard !== lanyardVisible && isMounted) {
        lanyardVisible = shouldShowLanyard;
        setShowLanyard(shouldShowLanyard);
      }

      if (progress <= 0.015) {
        playHero();
      } else {
        pauseVideo(heroVideo);
      }

      syncScrubVideo(seriesVideo, fadeIn(progress, 0.03, 0.44), seriesOpacity > 0.01);
      syncScrubVideo(workspaceVideo, fadeIn(progress, 0.48, 0.74), workspaceOpacity > 0.01);
      syncScrubVideo(operationsVideo, fadeIn(progress, 0.78, 1), operationsOpacity > 0.01);
    };

    const queueRender = () => {
      if (animationFrame) return;

      const render = () => {
        animationFrame = 0;
        const distance = targetProgress - renderedProgress;
        renderedProgress = Math.abs(distance) < 0.0007 ? targetProgress : renderedProgress + distance * 0.22;
        renderScene(renderedProgress);

        if (Math.abs(targetProgress - renderedProgress) >= 0.0007) {
          queueRender();
        }
      };

      animationFrame = window.requestAnimationFrame(render);
    };

    const updateTarget = (nextProgress: number) => {
      targetProgress = clamp(nextProgress, 0, 1);
      queueRender();
    };

    const sceneOwnsScroll = () => {
      const rect = scene.getBoundingClientRect();
      return rect.top <= 24 && rect.bottom >= window.innerHeight - 24;
    };

    const canReleaseScroll = (direction: number) =>
      (direction > 0 && targetProgress >= 0.999 && renderedProgress >= 0.995) ||
      (direction < 0 && targetProgress <= 0.001 && renderedProgress <= 0.005);

    const getProgressDelta = (deltaY: number, deltaMode: number) => {
      const pixels = deltaMode === WheelEvent.DOM_DELTA_LINE ? deltaY * 16 : deltaY;
      const magnitude = Math.abs(pixels);
      const rawDelta = magnitude > 100 ? 0.018 : magnitude / 3800;
      return Math.sign(pixels) * Math.min(rawDelta, 0.018);
    };

    const handleWheel = (event: WheelEvent) => {
      if (reduceMotion || !sceneOwnsScroll() || event.deltaY === 0) return;
      const direction = Math.sign(event.deltaY);
      if (canReleaseScroll(direction)) return;

      event.preventDefault();
      updateTarget(targetProgress + getProgressDelta(event.deltaY, event.deltaMode));
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (reduceMotion || !sceneOwnsScroll()) return;

      const keyDeltas: Record<string, number> = {
        ArrowDown: 0.045,
        ArrowUp: -0.045,
        PageDown: 0.12,
        PageUp: -0.12,
        " ": event.shiftKey ? -0.12 : 0.12,
      };
      const delta = keyDeltas[event.key];
      if (!delta || canReleaseScroll(Math.sign(delta))) return;

      event.preventDefault();
      updateTarget(targetProgress + delta);
    };

    const handleTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const nextTouchY = event.touches[0]?.clientY;
      if (reduceMotion || lastTouchY === null || nextTouchY === undefined || !sceneOwnsScroll()) return;

      const deltaY = lastTouchY - nextTouchY;
      if (deltaY === 0 || canReleaseScroll(Math.sign(deltaY))) return;

      event.preventDefault();
      lastTouchY = nextTouchY;
      updateTarget(targetProgress + clamp(deltaY / 2800, -0.032, 0.032));
    };

    const handleTouchEnd = () => {
      lastTouchY = null;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        [heroVideo, seriesVideo, workspaceVideo, operationsVideo].forEach(pauseVideo);
      } else {
        queueRender();
      }
    };

    const handleMetadata = () => queueRender();

    [heroVideo, seriesVideo, workspaceVideo, operationsVideo].forEach((video) => {
      video.addEventListener("loadedmetadata", handleMetadata);
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) handleMetadata();
    });

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("resize", queueRender, { passive: true });
    scene.addEventListener("touchstart", handleTouchStart, { passive: true });
    scene.addEventListener("touchmove", handleTouchMove, { passive: false });
    scene.addEventListener("touchend", handleTouchEnd, { passive: true });
    scene.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    renderScene(0);

    return () => {
      isMounted = false;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (monitorFrame) window.cancelAnimationFrame(monitorFrame);
      [heroVideo, seriesVideo, workspaceVideo, operationsVideo].forEach((video) => {
        video.removeEventListener("loadedmetadata", handleMetadata);
        pauseVideo(video);
      });
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("resize", queueRender);
      scene.removeEventListener("touchstart", handleTouchStart);
      scene.removeEventListener("touchmove", handleTouchMove);
      scene.removeEventListener("touchend", handleTouchEnd);
      scene.removeEventListener("touchcancel", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [overlayRefs, sceneRef, setShowLanyard, videoRefs]);
}

function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`${styles.glassCard} ${className}`}>{children}</article>;
}

function StoryCards({ cards, theme }: { cards: readonly StoryCardData[]; theme: Theme }) {
  return (
    <div className={styles.cardRail}>
      {cards.map(([title, body, label], index) => (
        <GlassCard key={title} className={`${styles.storyCard} ${theme === "light" ? styles.lightCard : styles.darkCard}`}>
          <div>
            <div className={styles.cardIcon}>
              <ArrowUpRight className="size-5" />
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
          {label ? (
            <div className={styles.cardFooter}>
              <span>AIPC Series</span>
              <span>{label}</span>
            </div>
          ) : (
            <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
          )}
        </GlassCard>
      ))}
    </div>
  );
}

export default function HomepageExperience() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const seriesVideoRef = useRef<HTMLVideoElement | null>(null);
  const workspaceVideoRef = useRef<HTMLVideoElement | null>(null);
  const operationsVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const seriesCopyRef = useRef<HTMLDivElement | null>(null);
  const seriesCardsRef = useRef<HTMLDivElement | null>(null);
  const workspaceCopyRef = useRef<HTMLDivElement | null>(null);
  const workspaceCardsRef = useRef<HTMLDivElement | null>(null);
  const operationsCopyRef = useRef<HTMLDivElement | null>(null);
  const operationsCardsRef = useRef<HTMLDivElement | null>(null);
  const lanyardRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const [showLanyard, setShowLanyard] = useState(false);
  const isWide = useWideViewport();
  const sceneInView = useSceneInView(sceneRef);

  const videoRefs = useMemo(
    () => ({
      hero: heroVideoRef,
      series: seriesVideoRef,
      workspace: workspaceVideoRef,
      operations: operationsVideoRef,
    }),
    [],
  );
  const overlayRefs = useMemo(
    () => ({
      hero: heroOverlayRef,
      seriesCopy: seriesCopyRef,
      seriesCards: seriesCardsRef,
      workspaceCopy: workspaceCopyRef,
      workspaceCards: workspaceCardsRef,
      operationsCopy: operationsCopyRef,
      operationsCards: operationsCardsRef,
      lanyard: lanyardRef,
      progress: progressRef,
    }),
    [],
  );

  useScrollDeck(sceneRef, videoRefs, overlayRefs, setShowLanyard);

  return (
    <section ref={sceneRef} id="homepage-experience" className={styles.experience} aria-label="GoAgent AIOS 首页互动展示">
      <video
        ref={heroVideoRef}
        className={`${styles.sceneVideo} ${styles.heroVideo}`}
        src="/homepage-experience/videos/hero-aios-1784019472625.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={seriesVideoRef}
        className={styles.sceneVideo}
        src="/homepage-experience/videos/story-scroll-1784020223514.mp4"
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={workspaceVideoRef}
        className={styles.sceneVideo}
        src="/homepage-experience/videos/workspace-background.mp4"
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={operationsVideoRef}
        className={styles.sceneVideo}
        src="/homepage-experience/videos/agent-ops-background.mp4"
        muted
        playsInline
        preload="auto"
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
        <StoryCards cards={aipcSeries} theme="dark" />
      </div>

      <div ref={workspaceCopyRef} className={`${styles.sceneOverlay} ${styles.stageCopy} ${styles.workspaceCopy}`}>
        <p>下一部分 · 一人公司工作台</p>
        <h2>
          从一个想法
          <br />
          到完整交付
        </h2>
        <span>GoGo 负责理解目标、拆解任务、调度数字员工，并把每一步沉淀为可复用的工作流。</span>
      </div>
      <div ref={workspaceCardsRef} className={`${styles.sceneOverlay} ${styles.stageCards}`}>
        <StoryCards cards={workspaceSignals} theme="light" />
      </div>

      <div ref={operationsCopyRef} className={`${styles.sceneOverlay} ${styles.stageCopy} ${styles.operationsCopy}`}>
        <p>下一部分 · 数字员工调度中心</p>
        <h2>
          让工作
          <br />
          自己向前推进
        </h2>
        <span>把目标交给 GoGo，系统会持续追踪进度、唤起合适的数字员工，并在关键节点把结果推到你面前。</span>
      </div>
      <div ref={operationsCardsRef} className={`${styles.sceneOverlay} ${styles.stageCards}`}>
        <StoryCards cards={opsSignals} theme="dark" />
      </div>

      <div className={styles.progressTrack} aria-hidden="true">
        <span ref={progressRef} />
      </div>
    </section>
  );
}
