"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type SeamlessLoopVideoHandle = {
  element: HTMLDivElement | null;
  setActive: (active: boolean) => void;
};

type SeamlessLoopVideoProps = {
  className?: string;
  src: string;
  videoClassName?: string;
};

const CROSSFADE_SECONDS = 0.34;
const SWITCH_LEAD_SECONDS = 0.44;

export const SeamlessLoopVideo = forwardRef<SeamlessLoopVideoHandle, SeamlessLoopVideoProps>(function SeamlessLoopVideo(
  { className, src, videoClassName },
  ref,
) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const firstVideoRef = useRef<HTMLVideoElement | null>(null);
  const secondVideoRef = useRef<HTMLVideoElement | null>(null);
  const resumeMonitorRef = useRef<() => void>(() => undefined);
  const suspendMonitorRef = useRef<() => void>(() => undefined);
  const controlRef = useRef({
    active: true,
    activeIndex: 0,
    mounted: false,
    switching: false,
  });

  const setPlaybackActive = (active: boolean) => {
    const control = controlRef.current;
    const videos = [firstVideoRef.current, secondVideoRef.current];
    const current = videos[control.activeIndex];

    if (control.active === active) {
      if (active && current?.paused && control.mounted) {
        if (current.ended) current.currentTime = 0;
        void current.play().catch(() => undefined);
        resumeMonitorRef.current();
      }
      return;
    }

    control.active = active;

    if (!active) {
      suspendMonitorRef.current();
      videos.forEach((video) => video?.pause());
      return;
    }

    if (!current || !control.mounted) return;
    if (current.ended) current.currentTime = 0;
    void current.play().catch(() => undefined);
    resumeMonitorRef.current();
  };

  useImperativeHandle(ref, () => ({
    get element() {
      return rootRef.current;
    },
    setActive: setPlaybackActive,
  }), []);

  useEffect(() => {
    const videos = [firstVideoRef.current, secondVideoRef.current];
    const firstVideo = videos[0];
    if (!firstVideo || !videos[1]) return;

    const control = controlRef.current;
    control.mounted = true;
    let monitorFrame = 0;
    let monitorVideo: HTMLVideoElement | null = null;
    let switchTimer = 0;

    const scheduleMonitor = () => {
      if (!control.mounted || !control.active || monitorFrame) return;
      const current = videos[control.activeIndex];
      if (!current) return;

      monitorVideo = current;
      if ("requestVideoFrameCallback" in current) {
        monitorFrame = current.requestVideoFrameCallback(() => {
          monitorFrame = 0;
          monitorVideo = null;
          monitorLoop();
        });
      } else {
        monitorFrame = window.requestAnimationFrame(() => {
          monitorFrame = 0;
          monitorVideo = null;
          monitorLoop();
        });
      }
    };
    const suspendMonitor = () => {
      if (!monitorFrame) return;
      if (monitorVideo && "cancelVideoFrameCallback" in monitorVideo) {
        monitorVideo.cancelVideoFrameCallback(monitorFrame);
      } else {
        window.cancelAnimationFrame(monitorFrame);
      }
      monitorFrame = 0;
      monitorVideo = null;
    };
    resumeMonitorRef.current = scheduleMonitor;
    suspendMonitorRef.current = suspendMonitor;

    const finishSwitch = (previousIndex: number, nextIndex: number) => {
      const previous = videos[previousIndex];
      const next = videos[nextIndex];
      if (!previous || !next || !control.mounted) return;

      previous.pause();
      previous.currentTime = 0;
      previous.style.transitionDuration = "0ms";
      previous.style.opacity = "0";
      previous.style.zIndex = "1";
      next.style.zIndex = "2";
      control.activeIndex = nextIndex;
      control.switching = false;
      if (control.active && next.paused) void next.play().catch(() => undefined);
      scheduleMonitor();
    };

    const beginSwitch = () => {
      if (control.switching || !control.active) return;
      const previousIndex = control.activeIndex;
      const nextIndex = previousIndex === 0 ? 1 : 0;
      const previous = videos[previousIndex];
      const next = videos[nextIndex];
      if (!previous || !next) return;

      control.switching = true;
      next.style.transitionDuration = "0ms";
      next.style.opacity = "0";
      next.style.zIndex = "2";
      previous.style.zIndex = "1";
      next.currentTime = 0;

      void next.play().then(() => {
        if (!control.mounted) return;
        window.requestAnimationFrame(() => {
          next.style.transitionDuration = `${CROSSFADE_SECONDS * 1000}ms`;
          next.style.opacity = "1";
        });
        switchTimer = window.setTimeout(
          () => finishSwitch(previousIndex, nextIndex),
          CROSSFADE_SECONDS * 1000 + 50,
        );
      }).catch(() => {
        control.switching = false;
        scheduleMonitor();
      });
    };

    function monitorLoop() {
      if (!control.mounted || !control.active) return;
      const current = videos[control.activeIndex];
      if (!current) return;

      const remaining = current.duration - current.currentTime;
      if (
        !control.switching
        && Number.isFinite(remaining)
        && current.currentTime > 0.2
        && remaining <= SWITCH_LEAD_SECONDS
      ) {
        beginSwitch();
      }
      scheduleMonitor();
    }

    const handleEnded = () => beginSwitch();
    videos.forEach((video) => video?.addEventListener("ended", handleEnded));
    firstVideo.style.opacity = "1";
    firstVideo.style.zIndex = "2";
    void firstVideo.play().catch(() => undefined);
    scheduleMonitor();

    return () => {
      control.mounted = false;
      resumeMonitorRef.current = () => undefined;
      suspendMonitorRef.current = () => undefined;
      window.clearTimeout(switchTimer);
      suspendMonitor();
      videos.forEach((video) => {
        video?.removeEventListener("ended", handleEnded);
        video?.pause();
      });
    };
  }, [src]);

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      <video
        ref={firstVideoRef}
        className={videoClassName}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      <video
        ref={secondVideoRef}
        className={videoClassName}
        src={src}
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />
    </div>
  );
});
