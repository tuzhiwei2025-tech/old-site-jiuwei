"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type ScrollFrameSequence = {
  frameCount: number;
  height: number;
  path: string;
  width: number;
};

export type ScrollFrameCanvasHandle = {
  element: HTMLCanvasElement | null;
  render: (progress: number) => void;
  setActive: (active: boolean) => void;
};

type ScrollFrameCanvasProps = {
  className?: string;
  sequence: ScrollFrameSequence;
};

const MAX_CACHED_FRAMES = 26;
const PRELOAD_RADIUS = 12;

export const ScrollFrameCanvas = forwardRef<ScrollFrameCanvasHandle, ScrollFrameCanvasProps>(function ScrollFrameCanvas(
  { className, sequence },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({
    active: false,
    currentFrame: 0,
    generation: 0,
    images: new Map<number, HTMLImageElement>(),
    loading: new Set<number>(),
  });

  const frameUrl = (index: number) => `${sequence.path}/frame-${String(index).padStart(4, "0")}.jpg`;

  const drawFrame = (frame: number) => {
    const canvas = canvasRef.current;
    const image = stateRef.current.images.get(frame);
    if (!canvas || !image || !image.complete || image.naturalWidth === 0) return false;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return false;

    const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    return true;
  };

  const drawClosestFrame = (frame: number) => {
    if (drawFrame(frame)) return;

    for (let offset = 1; offset <= PRELOAD_RADIUS; offset += 1) {
      if (drawFrame(frame - offset) || drawFrame(frame + offset)) return;
    }
  };

  const trimCache = () => {
    const state = stateRef.current;
    const minimum = Math.max(0, state.currentFrame - MAX_CACHED_FRAMES / 2);
    const maximum = Math.min(sequence.frameCount - 1, state.currentFrame + MAX_CACHED_FRAMES / 2);
    state.images.forEach((_, index) => {
      if (index < minimum || index > maximum) state.images.delete(index);
    });
  };

  const loadFrame = (index: number) => {
    if (index < 0 || index >= sequence.frameCount) return;
    const state = stateRef.current;
    if (state.images.has(index) || state.loading.has(index)) return;

    const generation = state.generation;
    const image = new Image();
    image.decoding = "async";
    state.loading.add(index);
    image.onload = () => {
      const latest = stateRef.current;
      latest.loading.delete(index);
      if (latest.generation !== generation) return;
      latest.images.set(index, image);
      trimCache();
      if (latest.active && latest.currentFrame === index) drawClosestFrame(index);
    };
    image.onerror = () => stateRef.current.loading.delete(index);
    image.src = frameUrl(index);
  };

  const preloadFrames = (frame: number) => {
    loadFrame(frame);
    for (let offset = 1; offset <= PRELOAD_RADIUS; offset += 1) {
      loadFrame(frame + offset);
      loadFrame(frame - offset);
    }
  };

  useImperativeHandle(ref, () => ({
    get element() {
      return canvasRef.current;
    },
    render(progress) {
      if (!stateRef.current.active) return;
      const frame = Math.round(Math.min(Math.max(progress, 0), 1) * (sequence.frameCount - 1));
      stateRef.current.currentFrame = frame;
      preloadFrames(frame);
      drawClosestFrame(frame);
    },
    setActive(active) {
      const state = stateRef.current;
      if (state.active === active) return;
      state.active = active;
      if (!active) {
        state.generation += 1;
        state.images.clear();
        state.loading.clear();
      }
    },
  }), [sequence]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(bounds.width * ratio));
      const height = Math.max(1, Math.round(bounds.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        drawClosestFrame(stateRef.current.currentFrame);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return () => observer.disconnect();
  }, []);

  return <canvas ref={canvasRef} className={className} width={sequence.width} height={sequence.height} aria-hidden="true" />;
});
