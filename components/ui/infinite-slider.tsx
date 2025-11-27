'use client';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  speed?: number; // 像素/秒
  speedOnHover?: number; // 像素/秒
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  speed,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const styleIdRef = useRef<string | null>(null);
  const animationNameRef = useRef<string | null>(null);

  // 初始化唯一的 ID
  if (!styleIdRef.current) {
    styleIdRef.current = `infinite-slider-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    animationNameRef.current = `slide-${styleIdRef.current}`;
  }

  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;

    const updateAnimation = () => {
      const content = contentRef.current;
      const container = containerRef.current;
      if (!content || !container) return;

      const size = direction === 'horizontal' 
        ? content.offsetWidth 
        : content.offsetHeight;
      
      if (size === 0) {
        // 延迟重试
        setTimeout(updateAnimation, 50);
        return;
      }

      const contentSize = size + gap;
      const distance = contentSize / 2;
      
      // 计算 duration
      let currentDuration: number;
      if (speed !== undefined) {
        const currentSpeed = isHovered && speedOnHover !== undefined ? speedOnHover : speed;
        currentDuration = distance / currentSpeed;
      } else if (duration !== undefined) {
        currentDuration = isHovered && durationOnHover !== undefined ? durationOnHover : duration;
      } else {
        currentDuration = 25;
      }

      const transformProperty = direction === 'horizontal' ? 'translateX' : 'translateY';
      const fromValue = reverse ? -distance : 0;
      const toValue = reverse ? 0 : -distance;

      const styleId = styleIdRef.current;
      const animationName = animationNameRef.current;
      if (!styleId || !animationName) return;

      // 创建或获取样式表
      let styleElement = document.getElementById(styleId) as HTMLStyleElement;
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }

      // 更新 keyframes
      const keyframes = `
        @keyframes ${animationName} {
          from {
            ${transformProperty}: ${fromValue}px;
          }
          to {
            ${transformProperty}: ${toValue}px;
          }
        }
      `;

      styleElement.textContent = keyframes;

      // 应用动画
      container.style.animation = `${animationName} ${currentDuration}s linear infinite`;
    };

    updateAnimation();

    // 监听尺寸变化
    const resizeObserver = new ResizeObserver(() => {
      updateAnimation();
    });

    resizeObserver.observe(contentRef.current);

    // 保存 styleId 用于清理
    const styleId = styleIdRef.current;

    return () => {
      resizeObserver.disconnect();
      if (styleId) {
        const styleElement = document.getElementById(styleId);
        if (styleElement) {
          styleElement.remove();
        }
      }
    };
  }, [direction, reverse, duration, durationOnHover, speed, speedOnHover, isHovered, gap]);

  const hoverProps = (speedOnHover !== undefined || durationOnHover !== undefined)
    ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      }
    : {};

  const flexDirection = direction === 'horizontal' ? 'row' : 'column';
  const gapStyle = `${gap}px`;

  return (
    <div className={cn('overflow-hidden', className)} {...hoverProps}>
      <div
        ref={containerRef}
        className='flex w-max'
        style={{
          gap: gapStyle,
          flexDirection,
          willChange: 'transform',
        }}
      >
        <div 
          ref={contentRef} 
          className="flex" 
          style={{ gap: gapStyle, flexDirection }}
        >
          {children}
        </div>
        <div 
          className="flex" 
          style={{ gap: gapStyle, flexDirection }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
