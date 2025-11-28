"use client"

import { PulsingBorder, MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="overflow-hidden relative w-full min-h-screen">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders */}
      <div className="absolute inset-0 w-full h-full">
        <MeshGradient
          className="w-full h-full"
          colors={["#000000", "#8B4513", "#ffffff", "#3E2723", "#5D4037"]}
          speed={0.3}
          style={{ backgroundColor: "#000000" }}
        />
      </div>
      <div className="absolute inset-0 w-full h-full opacity-60">
        <MeshGradient
          className="w-full h-full"
          colors={["#000000", "#ffffff", "#8B4513", "#000000"]}
          speed={0.2}
          style={{ backgroundColor: "transparent" }}
        />
      </div>

      {children}
    </div>
  )
}

export function PulsingCircle() {
  return (
    <div className="absolute right-8 bottom-8 z-30">
      <div className="flex relative justify-center items-center w-20 h-20">
        {/* Pulsing Border Circle */}
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
          }}
        >
          <PulsingBorder
            colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700", "#FF6B35", "#8A2BE2"]}
            colorBack="#00000000"
            speed={1.5}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={5}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.5}
            smokeSize={4}
            scale={0.65}
            rotation={0}
            frame={9161408.251009725}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Rotating Text Around the Pulsing Border */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transform: "scale(1.6)" }}
        >
          <defs>
            <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="text-sm fill-white/80 instrument">
            <textPath href="#circle" startOffset="0%">
              专业数字员工 • PPT专家 • Word专家 • Excel专家 • 团队协作 • 跨平台部署 •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  )
}

export function HeroContent() {
  return (
    <main className="absolute bottom-10 left-10 z-20 max-w-xl lg:max-w-2xl xl:max-w-3xl">
      <div className="text-left">
        <div
          className="inline-flex relative items-center px-4 py-1.5 mb-5 rounded-full backdrop-blur-sm bg-white/5"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 right-1 left-1 h-px bg-gradient-to-r from-transparent to-transparent rounded-full via-white/20" />
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-6xl font-light tracking-tight text-white sm:text-7xl md:text-8xl lg:text-8xl md:leading-tight">
          <span className="inline-block italic font-medium instrument">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              autoStart={true}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 22,
                delay: 0.2,
              }}
              containerClassName="inline-block"
              wordLevelClassName="inline-block"
            >
              强大的 数字员工
            </VerticalCutReveal>
          </span>
          <br />
          <span className="inline-block font-light tracking-tight text-white">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              autoStart={true}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 22,
                delay: 0.5,
              }}
              containerClassName="inline-block"
              wordLevelClassName="inline-block"
            >
              让AI为您工作
            </VerticalCutReveal>
          </span>
        </h1>

        {/* Description */}
        <div className="mb-7 text-base font-light leading-relaxed text-white/70 sm:text-lg">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.08}
            staggerFrom="first"
            autoStart={true}
            transition={{
              type: "spring",
              stiffness: 190,
              damping: 22,
              delay: 0.8,
            }}
            containerClassName="block"
            wordLevelClassName="inline-block"
          >
            从PPT专家到Office助手，从团队协作到跨平台部署，打造您的专属数字团队。每个数字员工都拥有独特的专业能力和个性，助您高效完成各种任务。
          </VerticalCutReveal>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 items-center">
          <button className="px-10 py-3.5 text-sm font-normal text-white bg-transparent rounded-full border transition-all duration-200 cursor-pointer border-white/30 hover:bg-white/10 hover:border-white/50 sm:px-12 sm:py-4 sm:text-base">
            了解更多
          </button>
          <button className="px-10 py-3.5 text-sm font-normal text-black bg-white rounded-full transition-all duration-200 cursor-pointer hover:bg-white/90 sm:px-12 sm:py-4 sm:text-base">
            立即开始
          </button>
        </div>
      </div>
    </main>
  )
}

interface HeaderProps {
  onLoginClick?: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 transition-all duration-300 ${
        scrolled 
          ? "shadow-lg backdrop-blur-xl bg-black/20" 
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="21st logo"
          className="text-white"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M358.333 0C381.345 0 400 18.6548 400 41.6667V295.833C400 298.135 398.134 300 395.833 300H270.833C268.532 300 266.667 301.865 266.667 304.167V395.833C266.667 398.134 264.801 400 262.5 400H41.6667C18.6548 400 0 381.345 0 358.333V304.72C0 301.793 1.54269 299.081 4.05273 297.575L153.76 207.747C157.159 205.708 156.02 200.679 152.376 200.065L151.628 200H4.16667C1.86548 200 6.71103e-08 198.135 0 195.833V104.167C1.07376e-06 101.865 1.86548 100 4.16667 100H162.5C164.801 100 166.667 98.1345 166.667 95.8333V4.16667C166.667 1.86548 168.532 1.00666e-07 170.833 0H358.333ZM170.833 100C168.532 100 166.667 101.865 166.667 104.167V295.833C166.667 298.135 168.532 300 170.833 300H262.5C264.801 300 266.667 298.135 266.667 295.833V104.167C266.667 101.865 264.801 100 262.5 100H170.833Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-3">
        <a
          href="#agents"
          className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
        >
          数字员工
        </a>
        <a
          href="#marketplace"
          className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
        >
          市场
        </a>
        <a
          href="#solutions"
          className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
        >
          解决方案
        </a>
        <a
          href="#docs"
          className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
        >
          文档
        </a>
      </nav>

      {/* Login Button Group with Arrow */}
      <div id="gooey-btn" className="flex relative items-center group" style={{ filter: "url(#gooey-filter)" }}>
        <button className="absolute right-0 px-2 py-1.5 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-7 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
        <button 
          id="login-trigger"
          onClick={onLoginClick}
          className="flex z-10 items-center px-5 py-1.5 h-7 text-xs font-normal text-black bg-white rounded-full transition-all duration-300 cursor-pointer hover:bg-white/90"
        >
          登录
        </button>
      </div>
    </header>
  )
}
