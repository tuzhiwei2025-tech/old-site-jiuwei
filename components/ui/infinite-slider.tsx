'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

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
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!width && !height) return;
    
    let controls: ReturnType<typeof animate>;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const distance = contentSize / 2;
    const from = reverse ? -distance : 0;
    const to = reverse ? 0 : -distance;

    // 计算 duration：如果提供了 speed，则根据速度计算 duration；否则使用 duration 参数
    let currentDuration: number;
    if (speed !== undefined) {
      const currentSpeed = isHovered && speedOnHover !== undefined ? speedOnHover : speed;
      // speed 是像素/秒，distance 是像素，所以 duration = distance / speed
      currentDuration = distance / currentSpeed;
    } else if (duration !== undefined) {
      currentDuration = isHovered && durationOnHover !== undefined ? durationOnHover : duration;
    } else {
      currentDuration = 25;
    }

    if (isTransitioning) {
      const currentValue = translation.get();
      controls = animate(translation, [currentValue, to], {
        ease: 'linear',
        duration: currentDuration * Math.abs((currentValue - to) / distance),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      // 重置位置并开始无限循环动画
      translation.set(from);
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      });
    }

    return () => {
      if (controls) {
        controls.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    key,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
    duration,
    durationOnHover,
    speed,
    speedOnHover,
    isHovered,
  ]);

  const hoverProps = (speedOnHover !== undefined || durationOnHover !== undefined)
    ? {
        onHoverStart: () => {
          setIsHovered(true);
          setIsTransitioning(true);
        },
        onHoverEnd: () => {
          setIsHovered(false);
          setIsTransitioning(true);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
