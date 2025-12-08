"use client"

import * as React from "react"
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame, wrap } from "framer-motion"
import { cn } from "@/lib/utils"

interface GridScrollVelocityProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[]
  velocity: number
  rows?: number
  cols?: number
  movable?: boolean
  clamp?: boolean
}

const GridScrollVelocity = React.forwardRef<HTMLDivElement, GridScrollVelocityProps>(
  ({ children, velocity = 5, rows = 2, cols = 4, movable = true, clamp = false, className, ...props }, ref) => {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 100,
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 10000], [0, 5], {
      clamp,
    })

    // 每个item的固定尺寸：宽500px，高约309px（500 * 0.618）
    const itemWidth = 500
    const itemGap = 32 // gap-8 = 2rem = 32px，增加间距避免重叠
    
    // 将children分成两行
    const itemsPerRow = Math.ceil(children.length / rows)
    const row1 = children.slice(0, itemsPerRow)
    const row2 = children.slice(itemsPerRow, children.length)
    
    // 计算每行的总宽度（像素）
    // 一行总宽度 = itemsPerRow * itemWidth + (itemsPerRow - 1) * itemGap
    const rowWidth = itemsPerRow * itemWidth + (itemsPerRow - 1) * itemGap
    
    // 使用像素值进行wrap，当滚动到 -rowWidth 时回到 0
    const x = useTransform(baseX, (v) => `${wrap(0, -rowWidth, v)}px`)

    const directionFactor = React.useRef<number>(1)
    const scrollThreshold = React.useRef<number>(5)

    useAnimationFrame((t, delta) => {
      if (movable) {
        move(delta)
      } else {
        if (Math.abs(scrollVelocity.get()) >= scrollThreshold.current) {
          move(delta)
        }
      }
    })

    function move(delta: number) {
      let moveBy = directionFactor.current * velocity * (delta / 1000)
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get()
      baseX.set(baseX.get() + moveBy)
    }

    return (
      <div
        ref={ref}
        className={cn("relative m-0 overflow-hidden w-full", className)}
        {...props}
      >
        <motion.div
          className="flex flex-col gap-4"
          style={{ x }}
        >
          {/* 第一行 */}
          <div className="flex flex-row flex-nowrap" style={{ width: `${rowWidth * 2}px`, gap: `${itemGap}px` }}>
            {row1.map((child, index) => (
              <div key={`row1-${index}`} className="shrink-0" style={{ width: `${itemWidth}px` }}>
                {child}
              </div>
            ))}
            {/* 复制第一行以实现无缝循环 */}
            {row1.map((child, index) => (
              <div key={`row1-dup-${index}`} className="shrink-0" style={{ width: `${itemWidth}px` }}>
                {child}
              </div>
            ))}
          </div>
          
          {/* 第二行 */}
          {row2.length > 0 ? (
            <div className="flex flex-row flex-nowrap" style={{ width: `${rowWidth * 2}px`, gap: `${itemGap}px` }}>
              {row2.map((child, index) => (
                <div key={`row2-${index}`} className="shrink-0" style={{ width: `${itemWidth}px` }}>
                  {child}
                </div>
              ))}
              {/* 如果第二行项目少于第一行，填充空白 */}
              {row2.length < itemsPerRow && Array.from({ length: itemsPerRow - row2.length }).map((_, index) => (
                <div key={`row2-empty-${index}`} className="shrink-0" style={{ width: `${itemWidth}px` }} />
              ))}
              {/* 复制第二行以实现无缝循环 */}
              {row2.map((child, index) => (
                <div key={`row2-dup-${index}`} className="shrink-0" style={{ width: `${itemWidth}px` }}>
                  {child}
                </div>
              ))}
              {/* 如果第二行项目少于第一行，填充空白 */}
              {row2.length < itemsPerRow && Array.from({ length: itemsPerRow - row2.length }).map((_, index) => (
                <div key={`row2-empty-dup-${index}`} className="shrink-0" style={{ width: `${itemWidth}px` }} />
              ))}
            </div>
          ) : (
            // 如果第二行没有项目，使用第一行的项目
            <div className="flex flex-row flex-nowrap" style={{ width: `${rowWidth * 2}px`, gap: `${itemGap}px` }}>
              {row1.map((child, index) => (
                <div key={`row2-${index}`} className="shrink-0" style={{ width: `${itemWidth}px` }}>
                  {child}
                </div>
              ))}
              {row1.map((child, index) => (
                <div key={`row2-dup-${index}`} className="shrink-0" style={{ width: `${itemWidth}px` }}>
                  {child}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    )
  }
)
GridScrollVelocity.displayName = "GridScrollVelocity"

export { GridScrollVelocity, type GridScrollVelocityProps }

