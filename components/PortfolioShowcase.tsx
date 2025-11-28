"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FAQs from "@/components/ui/faqs-component";
import ScrollAdventure from "@/components/ui/animated-scroll";
import { ScrollingFeatureShowcase } from "@/components/ui/interactive-scrolling-story-component";
import StackingCard from "@/components/ui/stacking-card";
import { Skiper31 } from "@/components/ui/text-scroll-animation";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { LogoCloud } from "@/components/ui/logo-cloud-4";
import { ScrollVelocity } from "@/components/ui/scroll-velocity";
import { GridScrollVelocity } from "@/components/ui/grid-scroll-velocity";
import { LoginDialog } from "@/components/LoginDialog";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// PortfolioShowcase 专用的 Header 组件
interface PortfolioHeaderProps {
  onLoginClick?: () => void;
}

function PortfolioHeader({ onLoginClick }: PortfolioHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* SVG Filters for Gooey Effect */}
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none">
        <defs>
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
      
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 transition-all duration-300 ${
          scrolled 
            ? "shadow-lg backdrop-blur-xl bg-black/20" 
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-xl font-bold text-white">
            Mr.GoGo
          </a>
        </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-3">
        <a
          href="#projects"
          onClick={(e) => handleNavClick(e, 'projects')}
          className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
        >
          PROJECTS
        </a>
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, 'about')}
          className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
        >
          ABOUT
        </a>
        <a
          href="#customers"
          onClick={(e) => handleNavClick(e, 'customers')}
          className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
        >
          CUSTOMERS
        </a>
        <a
          href="#faqs"
          onClick={(e) => handleNavClick(e, 'faqs')}
          className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
        >
          FAQs
        </a>
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, 'contact')}
          className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
        >
          CONTACT
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
    </>
  );
}

// 合作伙伴logo数据
const partners = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk Logo",
  },
];

export default function PortfolioShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loginOpen, setLoginOpen] = useState(false);


  // Hero Section
  const heroRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroButtonRef = useRef<HTMLButtonElement>(null);

  // Services Section
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesTitleRef = useRef<HTMLHeadingElement>(null);
  const servicesItemsRef = useRef<HTMLDivElement>(null);

  // Projects Section
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectsLogosRef = useRef<HTMLDivElement>(null);
  const projectsTitleRef = useRef<HTMLHeadingElement>(null);
  const projectsListRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  // About Me Section
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutBlobsRef = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutDescRef = useRef<HTMLDivElement>(null);
  const aboutButtonRef = useRef<HTMLButtonElement>(null);

  // Customers Section
  const customersRef = useRef<HTMLDivElement>(null);
  const customersTitleRef = useRef<HTMLHeadingElement>(null);
  const customersCardsRef = useRef<HTMLDivElement>(null);

  // Contact Section
  const contactRef = useRef<HTMLDivElement>(null);
  const contactBlobRef = useRef<HTMLDivElement>(null);
  const contactTitleRef = useRef<HTMLHeadingElement>(null);
  const contactEmailRef = useRef<HTMLDivElement>(null);
  const contactNameRef = useRef<HTMLHeadingElement>(null);
  const touchBarRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  // FAQs Section
  const faqsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ========== NAVIGATION ==========
      // Header 组件已经内置了滚动效果和动画，不再需要额外的动画代码

      // ========== HERO SECTION ==========
      if (heroRef.current) {
        // 背景视差效果
        gsap.to(heroRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // 标题文字拆分动画
        if (heroTitleRef.current) {
          const titleText = heroTitleRef.current.textContent || "";
          heroTitleRef.current.innerHTML = "";
          const chars = titleText.split("").map((char, index) => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.display = "inline-block";
            heroTitleRef.current?.appendChild(span);
            return span;
          });

          chars.forEach((char, index) => {
            gsap.fromTo(
              char,
              { opacity: 0, rotationX: -90, y: 50 },
              {
                opacity: 1,
                rotationX: 0,
                y: 0,
                duration: 0.8,
                delay: index * 0.03,
                ease: "back.out(1.7)",
              }
            );
          });
        }

        // 副标题 clipPath 动画
        if (heroSubtitleRef.current) {
          gsap.fromTo(
            heroSubtitleRef.current,
            {
              clipPath: "inset(0 100% 0 0)",
            },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.2,
              delay: 0.5,
              ease: "power3.out",
            }
          );
        }

        // 按钮动画
        if (heroButtonRef.current) {
          gsap.fromTo(
            heroButtonRef.current,
            { opacity: 0, scale: 0.8, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              delay: 1,
              ease: "back.out(1.7)",
            }
          );

          heroButtonRef.current.addEventListener("mouseenter", () => {
            gsap.to(heroButtonRef.current, {
              scale: 1.05,
              y: -5,
              boxShadow: "0 10px 30px rgba(147, 51, 234, 0.4)",
              duration: 0.3,
              ease: "power2.out",
            });
          });

          heroButtonRef.current.addEventListener("mouseleave", () => {
            gsap.to(heroButtonRef.current, {
              scale: 1,
              y: 0,
              boxShadow: "0 0 0px rgba(147, 51, 234, 0)",
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      }

      // ========== SERVICES SECTION ==========
      if (servicesRef.current) {
        // 标题动画 - 颜色变化：从白色变为黑色（白色背景）
        if (servicesTitleRef.current) {
          const titleText = servicesTitleRef.current.textContent || "";
          servicesTitleRef.current.innerHTML = "";
          const chars = titleText.split("").map((char) => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.display = "inline-block";
            servicesTitleRef.current?.appendChild(span);
            return span;
          });

          chars.forEach((char, index) => {
            gsap.fromTo(
              char,
              { color: "rgba(255, 255, 255, 0)", rotationX: -90, scale: 0.8, y: 30 },
              {
                color: "rgba(0, 0, 0, 1)",
                rotationX: 0,
                scale: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.05,
                ease: "back.out(1.5)",
                scrollTrigger: {
                  trigger: servicesRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        }

        if (servicesItemsRef.current) {
          const items = servicesItemsRef.current.children;
          Array.from(items).forEach((item, index) => {
            // Number 动画
            const numberEl = item.querySelector(".service-number");
            if (numberEl) {
              gsap.fromTo(
                numberEl,
                { opacity: 0, scale: 0, rotation: -360, x: -100 },
                {
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  x: 0,
                  duration: 1,
                  delay: index * 0.15,
                  ease: "elastic.out(1, 0.5)",
                  scrollTrigger: {
                    trigger: servicesRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                  },
                }
              );
            }

            // Divider 动画
            const dividerEl = item.querySelector(".service-divider");
            if (dividerEl) {
              gsap.fromTo(
                dividerEl,
                { scaleX: 0, opacity: 0 },
                {
                  scaleX: 1,
                  opacity: 1,
                  duration: 0.8,
                  delay: index * 0.15 + 0.3,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: servicesRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                  },
                }
              );
            }

            // Description 动画 - 每个单词 3D 翻转
            const descEl = item.querySelector(".service-desc");
            if (descEl) {
              const descText = descEl.textContent || "";
              descEl.innerHTML = "";
              const words = descText.split(" ").map((word) => {
                const span = document.createElement("span");
                span.textContent = word;
                span.style.display = "inline-block";
                span.style.marginRight = "0.3em";
                descEl.appendChild(span);
                return span;
              });

              words.forEach((word, wordIndex) => {
                gsap.fromTo(
                  word,
                  { opacity: 0, rotationX: -90, y: 20 },
                  {
                    opacity: 1,
                    rotationX: 0,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.15 + 0.5 + wordIndex * 0.05,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                      trigger: servicesRef.current,
                      start: "top 80%",
                      toggleActions: "play none none none",
                    },
                  }
                );
              });
            }

            // 滚动视差
            gsap.to(item, {
              x: index % 2 === 0 ? -20 : 20,
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });

            // 悬停效果
            item.addEventListener("mouseenter", () => {
              gsap.to(item, {
                x: index % 2 === 0 ? -30 : 30,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out",
              });
            });

            item.addEventListener("mouseleave", () => {
              gsap.to(item, {
                x: index % 2 === 0 ? -20 : 20,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            });
          });
        }
      }

      // ========== PROJECTS SECTION ==========
      if (projectsRef.current) {
        // Logo cloud 动画
        if (projectsLogosRef.current) {
          const logos = projectsLogosRef.current.children;
          Array.from(logos).forEach((logo, index) => {
            gsap.fromTo(
              logo,
              { opacity: 0, y: -20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: projectsRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );

            // Logo 悬停动画
            logo.addEventListener("mouseenter", () => {
              gsap.to(logo, {
                scale: 1.05,
                y: -3,
                duration: 0.3,
                ease: "power2.out",
              });
            });

            logo.addEventListener("mouseleave", () => {
              gsap.to(logo, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            });
          });
        }

        // 标题动画 - 颜色变化：从白色变为白色（黑色背景）
        if (projectsTitleRef.current) {
          gsap.fromTo(
            projectsTitleRef.current,
            { color: "rgba(255, 255, 255, 0)" },
            {
              color: "rgba(255, 255, 255, 1)",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: projectsRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // 项目卡片动画
        if (projectsListRef.current) {
          const projects = projectsListRef.current.children;
          Array.from(projects).forEach((project, index) => {
            gsap.fromTo(
              project,
              { opacity: 0, y: 50, scale: 0.95, rotationY: -15 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 0.8,
                delay: 0.5 + index * 0.15,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: projectsRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );

            // 滚动视差效果
            gsap.to(project, {
              y: index % 2 === 0 ? -20 : 20,
              scrollTrigger: {
                trigger: project,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });

            project.addEventListener("mouseenter", () => {
              gsap.to(project, {
                scale: 1.02,
                y: -8,
                rotationY: 2,
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
                duration: 0.3,
                ease: "power2.out",
              });
            });

            project.addEventListener("mouseleave", () => {
              gsap.to(project, {
                scale: 1,
                y: 0,
                rotationY: 0,
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                duration: 0.3,
                ease: "power2.out",
              });
            });
          });
        }

        // 项目网格缩略图动画
        if (projectsGridRef.current) {
          const thumbnails = projectsGridRef.current.querySelectorAll(".project-thumbnail");
          thumbnails.forEach((thumb, index) => {
            gsap.fromTo(
              thumb,
              { opacity: 0, scale: 0.8, rotation: -5 },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                delay: 0.8 + index * 0.05,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: projectsRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );

            thumb.addEventListener("mouseenter", () => {
              gsap.to(thumb, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
              });
            });

            thumb.addEventListener("mouseleave", () => {
              gsap.to(thumb, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            });
          });
        }
      }

      // ========== ABOUT ME SECTION ==========
      if (aboutRef.current) {
        if (aboutBlobsRef.current) {
          const blobs = aboutBlobsRef.current.children;
          Array.from(blobs).forEach((blob, index) => {
            gsap.fromTo(
              blob,
              { opacity: 0, scale: 0, rotation: index % 2 === 0 ? -45 : 45 },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: "back.out(1.5)",
                scrollTrigger: {
                  trigger: aboutRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );

            // 更流畅的呼吸动画
            gsap.to(blob, {
              y: -15,
              scale: 1.1,
              duration: 2.5 + index * 0.3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });

            // 鼠标跟随效果
            aboutRef.current?.addEventListener("mousemove", (e) => {
              const rect = aboutRef.current!.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
              const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
              
              gsap.to(blob, {
                x: x * (20 + index * 10),
                y: y * (20 + index * 10) - 15,
                duration: 1.5,
                ease: "power2.out",
              });
            });
          });
        }

        // 标题动画 - 颜色变化：从白色变为白色（黑色背景）
        if (aboutTitleRef.current) {
          gsap.fromTo(
            aboutTitleRef.current,
            { color: "rgba(255, 255, 255, 0)" },
            {
              color: "rgba(255, 255, 255, 1)",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: aboutRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (aboutDescRef.current) {
          const lines = aboutDescRef.current.children;
          Array.from(lines).forEach((line, index) => {
            gsap.fromTo(
              line,
              { opacity: 0, x: -30 },
              {
                opacity: 1,
                x: 0,
                duration: 0.7,
                delay: 0.8 + index * 0.12,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: aboutRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        }

        if (aboutButtonRef.current) {
          gsap.fromTo(
            aboutButtonRef.current,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: 1.4,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: aboutRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // ========== CUSTOMERS SECTION ==========
      if (customersRef.current) {
        // 标题动画 - 颜色变化：从白色变为白色（黑色背景）
        if (customersTitleRef.current) {
          gsap.fromTo(
            customersTitleRef.current,
            { color: "rgba(255, 255, 255, 0)" },
            {
              color: "rgba(255, 255, 255, 1)",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: customersRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (customersCardsRef.current) {
          const cards = customersCardsRef.current.children;
          Array.from(cards).forEach((card, index) => {
            gsap.fromTo(
              card,
              { opacity: 0, scale: 0.85, rotation: (index % 2 === 0 ? -1 : 1) * 8, y: 40 },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                y: 0,
                duration: 0.8,
                delay: index * 0.08,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: customersRef.current,
                  start: "top 75%",
                  toggleActions: "play none none none",
                },
              }
            );

            // 卡片滚动视差
            gsap.to(card, {
              y: index % 2 === 0 ? -15 : 15,
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });

            card.addEventListener("mouseenter", () => {
              gsap.to(card, {
                scale: 1.05,
                y: -12,
                rotation: index % 2 === 0 ? -1 : 1,
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.15)",
                duration: 0.3,
                ease: "power2.out",
              });
            });

            card.addEventListener("mouseleave", () => {
              gsap.to(card, {
                scale: 1,
                y: 0,
                rotation: 0,
                boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
                duration: 0.3,
                ease: "power2.out",
              });
            });
          });
        }
      }

      // ========== CONTACT SECTION ==========
      if (contactRef.current) {
        if (contactBlobRef.current) {
          // 滚动视差
          gsap.to(contactBlobRef.current, {
            y: -80,
            scale: 1.08,
            rotation: 12,
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });

          // 呼吸动画
          gsap.to(contactBlobRef.current, {
            scale: 1.04,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });

          // 鼠标跟随
          contactRef.current.addEventListener("mousemove", (e) => {
            const rect = contactRef.current!.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            gsap.to(contactBlobRef.current, {
              x: x * 40,
              y: y * 40,
              rotation: x * 15,
              duration: 1.5,
              ease: "power2.out",
            });
          });
        }

        // 标题动画 - 颜色变化：从白色变为白色（黑色背景）
        if (contactTitleRef.current) {
          gsap.fromTo(
            contactTitleRef.current,
            { color: "rgba(255, 255, 255, 0)" },
            {
              color: "rgba(255, 255, 255, 1)",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: contactRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (contactEmailRef.current) {
          gsap.fromTo(
            contactEmailRef.current,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contactRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (contactNameRef.current) {
          gsap.fromTo(
            contactNameRef.current,
            { opacity: 0, scale: 0.85 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: contactRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (touchBarRef.current) {
          const icons = touchBarRef.current.children;
          Array.from(icons).forEach((icon, index) => {
            gsap.fromTo(
              icon,
              { opacity: 0, scale: 0, rotation: -180 },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                delay: 0.5 + index * 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: contactRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );

            icon.addEventListener("mouseenter", () => {
              gsap.to(icon, {
                scale: 1.15,
                y: -8,
                rotation: 5,
                duration: 0.25,
                ease: "power2.out",
              });
            });

            icon.addEventListener("mouseleave", () => {
              gsap.to(icon, {
                scale: 1,
                y: 0,
                rotation: 0,
                duration: 0.25,
                ease: "power2.out",
              });
            });

            icon.addEventListener("click", () => {
              gsap.to(icon, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
              });
            });
          });
        }

        if (contactInfoRef.current) {
          gsap.fromTo(
            contactInfoRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: contactRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // ========== FAQs SECTION ==========
      if (faqsRef.current) {
        // 标题动画
        const title = faqsRef.current.querySelector('h2');
        if (title) {
          gsap.fromTo(
            title as Element,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: faqsRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // 描述文字动画 - 选择第一个 p 标签（在标题之后）
        const section = faqsRef.current.querySelector('section');
        if (section) {
          const desc = section.querySelector('p');
          if (desc) {
            gsap.fromTo(
              desc as Element,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: faqsRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

        // Accordion 项目动画
        const accordionItems = faqsRef.current.querySelectorAll('[data-state]');
        Array.from(accordionItems).forEach((item, index) => {
          gsap.fromTo(
            item as Element,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.3 + index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: faqsRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      number: "01",
      label: "3D MODELING",
      description:
        "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
    },
    {
      number: "02",
      label: "3D RENDERING",
      description:
        "High-quality, photorealistic renders that showcase designs with realistic lighting, textures, and shadows.",
    },
    {
      number: "03",
      label: "3D ANIMATION",
      description:
        "Dynamic animations to bring characters, products, or environments to life for marketing, gaming, or storytelling.",
    },
    {
      number: "04",
      label: "PRODUCT DESIGN",
      description:
        "Precise 3D modeling and rendering for showcasing or prototyping consumer products.",
    },
    {
      number: "05",
      label: "3D PRINTING",
      description:
        "Custom 3D designs prepared and optimized for 3D printing technology.",
    },
  ];

  const projects = [
    {
      number: "01",
      client: "Rogue Studios",
    },
    {
      number: "02",
      client: "Pixel Forge",
    },
    {
      number: "03",
      client: "MetaForm Creations",
    },
  ];

  // Mock 数据用于 ScrollVelocity 组件
  const scrollVelocityMockData = [
    "NVIDIA",
    "OPENAI",
    "SUPABASE",
    "VERCEL",
    "GITHUB",
    "CLAUDE AI",
    "TURSO",
    "CLERK",
    "STRIPE",
    "TWILIO",
    "SENDGRID",
    "ALGOLIA",
  ];

  // Mock 数据用于项目网格缩略图
  const projectThumbnailsMockData = [
    { id: 0, title: "Project 1", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 1, title: "Project 2", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 2, title: "Project 3", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 3, title: "Project 4", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 4, title: "Project 5", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 5, title: "Project 6", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 6, title: "Project 7", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 7, title: "Project 8", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 8, title: "Project 9", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 9, title: "Project 10", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 10, title: "Project 11", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 11, title: "Project 12", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 12, title: "Project 13", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 13, title: "Project 14", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 14, title: "Project 15", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 15, title: "Project 16", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&auto=format&fit=crop&q=80" },
  ];

  const customers = [
    {
      name: "MICHAEL T.",
      company: "PROTOSPHERE INNOVATIONS",
      text: "Mr.GoGo brought our product concept to life in a way we never thought possible. The 3D model was so detailed and realistic, it helped us secure investors and streamline the manufacturing process. Highly recommend.",
    },
    {
      name: "DAVID R.",
      company: "APEX INTERACTIVE",
      text: "Mr.GoGo's 3D character designs exceeded expectations. The level of detail, creativity, and responsiveness throughout the project was outstanding. Our game wouldn't be the same without their contributions.",
    },
    {
      name: "RACHEL M.",
      company: "METAFORM CREATIONS",
      text: "Mr.GoGo's unique 3D designs made our NFT collection a huge success. The art was breathtaking, and their professionalism made the entire process smooth and enjoyable. Looking forward to collaborating again.",
    },
    {
      name: "DR. ANDREA K.",
      company: "MEDTECH VISUALS",
      text: "Also created detailed 3D models for our medical training program, and the quality was outstanding. The models were precise, realistic, and incredibly useful for our team. We're thrilled with the outcome.",
    },
    {
      name: "JAMES K.",
      company: "INNOVATIVE PRODUCT DESIGN",
      text: "The 3D prototypes we created for our 2 new products were fantastic. The speed of iteration and precision made it so much easier to visualize our ideas. Highly recommend!",
    },
    {
      name: "SUSAN S.",
      company: "BOLDEDGE MARKETING",
      text: "The 3D render was produced for our new product. It added a dynamic edge to our marketing materials and increased engagement significantly.",
    },
  ];

  return (
    <><div ref={containerRef} className="overflow-x-hidden text-white bg-black">
          {/* ========== NAVIGATION ========== */}
          <PortfolioHeader onLoginClick={() => setLoginOpen(true)} />

          {/* ========== PARALLAX FLOATING HERO SECTION ========== */}
          <section className="overflow-hidden relative w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black">
              <Floating className="relative w-full h-full" sensitivity={1.2} easingFactor={0.08}>
                  {/* 背景装饰元素 - 大尺寸模糊圆形，放在边缘避免重叠，z-index 最低 */}
                  <FloatingElement depth={0.3} className="top-0 left-0 z-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-64 h-64 bg-gradient-to-br rounded-full blur-3xl from-purple-500/20 to-pink-500/20" />
                  </FloatingElement>

                  <FloatingElement depth={0.5} className="right-0 top-1/2 z-0 translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-80 h-80 bg-gradient-to-br rounded-full blur-3xl from-blue-500/20 to-cyan-500/20" />
                  </FloatingElement>

                  <FloatingElement depth={0.7} className="bottom-0 left-1/4 z-0 -translate-x-1/2 translate-y-1/2 pointer-events-none">
                      <div className="w-48 h-48 bg-gradient-to-br rounded-full blur-3xl from-yellow-500/20 to-orange-500/20" />
                  </FloatingElement>

                  <FloatingElement depth={0.4} className="top-0 right-1/3 z-0 translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-56 h-56 bg-gradient-to-br rounded-full blur-3xl from-indigo-500/20 to-purple-500/20" />
                  </FloatingElement>

                  {/* 装饰性几何元素 - 调整位置避免与内容重叠，z-index 中等，更分散 */}
                  <FloatingElement depth={1.2} className="top-[15%] pointer-events-none right-[8%] z-10">
                      <div className="w-16 h-16 bg-gradient-to-br rounded-lg border backdrop-blur-sm rotate-45 from-green-500/20 to-emerald-500/20 border-white/10" />
                  </FloatingElement>

                  <FloatingElement depth={1.5} className="bottom-[20%] pointer-events-none left-[8%] z-10">
                      <div className="w-20 h-20 bg-gradient-to-br rounded-lg border backdrop-blur-sm from-indigo-500/20 to-purple-500/20 border-white/10" />
                  </FloatingElement>

                  <FloatingElement depth={1} className="top-[70%] pointer-events-none right-[10%] z-10">
                      <div className="w-14 h-14 bg-gradient-to-br rounded-full border backdrop-blur-sm from-pink-500/20 to-rose-500/20 border-white/10" />
                  </FloatingElement>

                  <FloatingElement depth={1.3} className="top-[25%] pointer-events-none left-[5%] z-10">
                      <div className="w-10 h-10 bg-gradient-to-br rounded-lg border backdrop-blur-sm rotate-12 from-cyan-500/20 to-blue-500/20 border-white/10" />
                  </FloatingElement>

                  <FloatingElement depth={0.9} className="bottom-[30%] pointer-events-none right-[5%] z-10">
                      <div className="w-12 h-12 bg-gradient-to-br rounded-full border backdrop-blur-sm from-orange-500/20 to-yellow-500/20 border-white/10" />
                  </FloatingElement>

                  {/* 主要内容区域 - z-index 最高，确保在最上层 */}
                  <div className="flex relative z-30 flex-col justify-center items-center px-8 h-full text-center">
                      <FloatingElement depth={2}>
                          <h1 className="mb-6 text-6xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
                              Welcome to
                              <br />
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                                  Parallax World
                              </span>
                          </h1>
                      </FloatingElement>

                      <FloatingElement depth={2.5}>
                          <p className="mx-auto mb-12 max-w-2xl text-lg font-light text-white/80 md:text-xl lg:text-2xl">
                              Experience the power of interactive parallax floating effects.
                              <br />
                              Move your mouse to see the magic happen.
                          </p>
                      </FloatingElement>

                      <FloatingElement depth={3}>
                          <div className="flex flex-wrap gap-4 justify-center">
                              <button className="px-8 py-4 font-semibold tracking-wider text-white uppercase bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg transition-all hover:from-purple-700 hover:to-pink-700 hover:scale-105">
                                  Get Started
                              </button>
                              <button className="px-8 py-4 font-semibold tracking-wider text-white uppercase rounded-lg border backdrop-blur-sm transition-all bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105">
                                  Learn More
                              </button>
                          </div>
                      </FloatingElement>
                  </div>

                  {/* 滚动提示 - z-index 最高 */}
                  <div className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 pointer-events-none">
                      <div className="flex flex-col gap-2 items-center text-white/60">
                          <span className="text-sm">Scroll down</span>
                          <div className="flex justify-center items-start p-2 w-6 h-10 rounded-full border-2 border-white/30">
                              <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
                          </div>
                      </div>
                  </div>
              </Floating>
          </section>

          {/* ========== HERO SECTION ========== */}
          <section
              ref={heroRef}
              className="flex relative justify-center items-center pt-24 min-h-screen bg-black"
          >
              <div
                  ref={heroOverlayRef}
                  className="absolute top-20 left-1/2 z-20 px-6 py-3 bg-black rounded-lg -translate-x-1/2"
              >
              </div>

              <div className="container relative z-10 px-8 py-20 mx-auto text-center">
                  <h1
                      ref={heroTitleRef}
                      className="mb-6 text-6xl font-black tracking-tight leading-tight md:text-7xl lg:text-8xl"
                  >
                      HI, I&apos;M Mr.GoGo
                  </h1>
                  <p
                      ref={heroSubtitleRef}
                      className="mx-auto mb-8 max-w-4xl text-lg font-light md:text-xl lg:text-2xl text-white/80"
                  >
                      A 3D DESIGNER PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS
                  </p>
                  <button
                      ref={heroButtonRef}
                      className="px-8 py-4 font-semibold tracking-wider text-white uppercase bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg transition-all hover:from-purple-700 hover:to-pink-700"
                  >
                      CONTACT ME
                  </button>
              </div>
          </section>

          {/* ========== SERVICES SECTION ========== */}
          <section
              ref={servicesRef}
              className="flex relative justify-center items-center py-20 min-h-screen text-black bg-white"
              style={{ fontFamily: "var(--font-nunito), sans-serif" }}
          >
              <div className="container relative z-10 px-8 mx-auto max-w-5xl">
                  <h2
                      ref={servicesTitleRef}
                      className="mb-16 text-7xl font-black tracking-tight text-white md:text-8xl lg:text-9xl"
                      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
                  >
                      SERVICES
                  </h2>

                  <div ref={servicesItemsRef} className="space-y-12">
                      {services.map((service, index) => (
                          <div key={index} className="flex gap-8 items-start cursor-pointer group">
                              <div className="flex flex-col flex-shrink-0 gap-4">
                                  <div
                                      className="text-9xl font-bold leading-none text-black service-number"
                                      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
                                  >
                                      {service.number}
                                  </div>
                              </div>
                              <div className="flex-1 pt-4">
                                  <div className="mb-4 h-px bg-black/20 service-divider" />
                                  <p
                                      className="text-lg leading-relaxed service-desc md:text-xl text-black/70"
                                      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
                                  >
                                      {service.description}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>



          {/* ========== ANIMATED SCROLL MODULE ========== */}
          <section className="relative w-full">
              <ScrollAdventure />
          </section>

          {/* ========== INTERACTIVE SCROLLING STORY MODULE ========== */}
          {/* <section className="relative w-full">
      <ScrollingFeatureShowcase />
    </section> */}

          {/* ========== STACKING CARD MODULE ========== */}
          <section className="relative w-full">
        <StackingCard
          projects={[
            {
              title: "Avatars - Build your Expert Team",
              description: "Introducing a brand-new feature: Avatars. With Avatars, you can choose who you want to interact with — whether it's legendary figures from history or a team of dedicated expert advisors tailored to your personal needs.",
              link: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
              color: "#8b5cf6",
              type: 'avatars',
              features: [
                "Engage with historical figures.",
                "Build a personalized expert team.",
                "Get tailored advice and insights.",
              ],
              avatars: [
                {
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
                  borderColor: "#10b981",
                  icon: "https://cdn-icons-png.flaticon.com/32/3135/3135715.png",
                  iconColor: "#10b981",
                },
                {
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
                  borderColor: "#6366f1",
                },
                {
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
                  borderColor: "#eab308",
                  icon: "https://cdn-icons-png.flaticon.com/32/3135/3135715.png",
                  iconColor: "#eab308",
                },
                {
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
                  borderColor: "#f59e0b",
                },
                {
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
                  borderColor: "#06b6d4",
                  icon: "https://cdn-icons-png.flaticon.com/32/3135/3135715.png",
                  iconColor: "#06b6d4",
                },
                {
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
                  borderColor: "#8b5cf6",
                },
                {
                  image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop",
                  borderColor: "#a855f7",
                  icon: "https://cdn-icons-png.flaticon.com/32/3135/3135715.png",
                  iconColor: "#a855f7",
                },
                {
                  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
                  borderColor: "#3b82f6",
                },
                {
                  image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
                  borderColor: "#f97316",
                  icon: "https://cdn-icons-png.flaticon.com/32/3135/3135715.png",
                  iconColor: "#f97316",
                },
              ],
            },
            {
                title: "AI-Powered Analytics Dashboard",
                description: "Get deep insights into your business with our AI-powered analytics platform. Visualize data, track performance metrics, and make data-driven decisions with confidence.",
                link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
                color: "#10b981",
                type: 'image',
                features: [
                  "Real-time data visualization.",
                  "AI-powered insights.",
                  "Customizable dashboards.",
                ],
              },
            {
              title: "Video Tutorial - Learn from Experts",
              description: "Watch comprehensive video tutorials created by industry experts. Learn new skills, understand complex concepts, and master advanced techniques through our interactive video learning platform.",
              link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
              color: "#6366f1",
              type: 'video',
              features: [
                "HD quality video content.",
                "Interactive learning experience.",
                "Expert-led tutorials.",
              ],
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              videoThumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
            },
            {
              title: "Advanced Workflow Automation",
              description: "Streamline your business processes with our intelligent workflow automation system. Create custom workflows, automate repetitive tasks, and boost productivity across your entire organization.",
              link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
              color: "#f59e0b",
              type: 'image',
              features: [
                "Custom workflow creation.",
                "Automated task management.",
                "Real-time collaboration tools.",
              ],
            },
            {
              title: "Product Demo Video",
              description: "Experience our product in action through detailed demonstration videos. See how our platform can transform your workflow and boost your productivity with real-world examples.",
              link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
              color: "#06b6d4",
              type: 'video',
              features: [
                "Step-by-step demonstrations.",
                "Real-world use cases.",
                "Interactive product tours.",
              ],
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              videoThumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
            },
        
          ]}
        />
          </section>
          <section
              ref={projectsRef}
              id="projects"
              className="flex relative flex-col justify-center items-center py-20 min-h-screen bg-black"
          >
              {/* Logo Cloud */}
              <div
                  ref={projectsLogosRef}
                  className="pb-8 mb-12 w-full border-b border-white/10"
              >
                  <div className="w-full">
                      <LogoCloud logos={partners} />
                  </div>
              </div>

              <div className="relative z-10 w-full">
                  <h2
                      ref={projectsTitleRef}
                      className="mb-16 text-7xl font-black tracking-tight text-center text-white md:text-8xl lg:text-9xl"
                  >
                      PROJECTS
                  </h2>

                  {/* 项目滚动速度展示 */}
                  <div 
                      ref={projectsListRef} 
                      className="overflow-hidden mb-16 w-full"
                      style={{ transform: 'skew(3deg, -2deg)' }}
                  >
                      <ScrollVelocity 
                          velocity={5}
                          className="w-full text-white"
                      >
                          {scrollVelocityMockData.map((item, index) => (
                              <span key={index} className="text-white">
                                  {item}
                              </span>
                          ))}
                      </ScrollVelocity>
                  </div>

                  {/* 项目网格缩略图 */}
                  <div 
                      ref={projectsGridRef} 
                      className="overflow-hidden w-full"
                      style={{ transform: 'skew(3deg, -2deg)' }}
                  >
                      <GridScrollVelocity 
                          velocity={10}
                          rows={2}
                          cols={4}
                          movable={true}
                          className="w-full text-white"
                      >
                          {projectThumbnailsMockData.map((project, index) => (
                              <div
                                  key={project.id}
                                  className="overflow-hidden relative bg-gradient-to-br rounded-lg cursor-pointer project-thumbnail from-purple-500/20 via-pink-500/20 to-orange-500/20"
                                  style={{ width: '300px', height: `${300 * 0.618}px` }}
                              >
                                  <img 
                                      src={project.image} 
                                      alt={project.title}
                                      className="object-cover w-full h-full"
                                  />
                                  {index === 4 && (
                                      <div className="flex absolute inset-0 justify-center items-center bg-black/30">
                                          <div className="flex justify-center items-center w-12 h-12 rounded-full backdrop-blur-sm bg-white/20">
                                              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-white ml-1" />
                                          </div>
                                      </div>
                                  )}
                              </div>
                          ))}
                      </GridScrollVelocity>
                  </div>
              </div>
          </section>
          {/* ========== INTERACTIVE SCROLLING STORY MODULE ========== */}
          {/* ========== ABOUT ME SECTION ========== */}
          <section
              ref={aboutRef}
              id="about"
              className="flex overflow-hidden relative justify-center items-center py-20 min-h-screen bg-black"
          >
              <div className="container relative z-10 px-8 mx-auto">
                  <div className="mx-auto max-w-4xl text-center">
                      <div ref={aboutBlobsRef} className="flex absolute right-0 left-0 top-20 gap-4 justify-center pointer-events-none">
                          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-400 rounded-full opacity-60 blur-sm" />
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-green-400 to-orange-400 rounded-full opacity-60 blur-sm" />
                          <div className="bg-gradient-to-br from-orange-400 via-pink-400 to-white rounded-full opacity-60 blur-sm w-18 h-18" />
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-gray-400 to-white rounded-full opacity-60 blur-sm" />
                      </div>

                      <h2
                          ref={aboutTitleRef}
                          className="mb-12 text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
                      >
                          ABOUT ME
                      </h2>

                      <div ref={aboutDescRef} className="mx-auto mb-12 space-y-4 max-w-2xl text-left">
                          <p className="text-lg md:text-xl text-white/90">
                              With over five years of experience in design,
                          </p>
                          <p className="text-lg md:text-xl text-white/90">
                              I specialize in branding, web design, and user experience.
                          </p>
                          <p className="text-lg md:text-xl text-white/90">
                              I love collaborating with businesses that want to stand out
                          </p>
                          <p className="text-lg md:text-xl text-white/90">
                              and showcase their best side.
                          </p>
                          <p className="text-lg md:text-xl text-white/90">
                              Let&apos;s create something amazing together!
                          </p>
                      </div>

                      <button
                          ref={aboutButtonRef}
                          className="px-8 py-4 font-semibold tracking-wider text-white uppercase bg-purple-600 rounded-lg transition-colors hover:bg-purple-700"
                      >
                          CONTACT ME
                      </button>
                  </div>
              </div>
          </section>

          {/* ========== CUSTOMERS SECTION ========== */}
          <section
              ref={customersRef}
              id="customers"
              className="flex relative justify-center items-center py-20 min-h-screen bg-black"
          >
              <div className="container relative z-10 px-8 mx-auto">
                  <div className="mb-16 text-center">
                      <h2
                          ref={customersTitleRef}
                          className="mb-4 text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
                      >
                          What Clients<br />Are Saying
                      </h2>
                      <div className="text-6xl">😍</div>
                  </div>

                  <div
                      ref={customersCardsRef}
                      className="grid grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-3"
                  >
                      {customers.map((customer, index) => (
                          <div
                              key={index}
                              className="p-8 rounded-3xl border backdrop-blur-sm transition-colors cursor-pointer bg-white/5 border-white/10 hover:bg-white/10"
                          >
                              <div className="flex gap-4 items-center mb-6">
                                  <div className="flex justify-center items-center w-16 h-16 rounded-full bg-white/10">
                                      <span className="text-2xl font-bold text-white/60">
                                          {customer.name.charAt(0)}
                                      </span>
                                  </div>
                                  <div>
                                      <div className="font-semibold text-white">{customer.name}</div>
                                      <div className="text-sm tracking-wider uppercase text-white/60">
                                          {customer.company}
                                      </div>
                                  </div>
                              </div>
                              <p className="text-sm leading-relaxed text-white/80 md:text-base">
                                  {customer.text}
                              </p>
                          </div>
                      ))}
                  </div>
              </div>
          </section>

          {/* ========== FAQs SECTION ========== */}
          <div ref={faqsRef} id="faqs">
              <FAQs />
          </div>

          {/* ========== CONTACT SECTION ========== */}
          <section
              ref={contactRef}
              id="contact"
              className="flex overflow-hidden relative justify-center items-center py-20 min-h-screen bg-black"
          >
              {/* 背景渐变blob */}
              <div className="absolute inset-0">
                  <div
                      ref={contactBlobRef}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-purple-600/30 rounded-full blur-3xl" />
              </div>

              <div className="container relative z-10 px-8 mx-auto">
                  <div className="grid grid-cols-1 gap-16 items-center lg:grid-cols-2">
                      {/* 左侧：标题和邮箱输入 */}
                      <div className="relative">
                          <h1
                              ref={contactTitleRef}
                              className="mb-6 text-5xl font-black tracking-tight leading-none text-white md:text-6xl lg:text-8xl"
                          >
                              TOUCH
                          </h1>
                          <div ref={contactEmailRef} className="mt-8">
                              <div className="flex gap-4 items-center">
                                  <input
                                      type="email"
                                      placeholder="Mr.GoGo@3dturner.com"
                                      className="flex-1 px-6 py-4 text-white rounded-full border backdrop-blur-sm transition-all bg-white/5 border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50" />
                                  <button className="px-8 py-4 font-semibold text-black uppercase bg-white rounded-full transition-colors hover:bg-white/90">
                                      SEND
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* 右侧：名称、触摸栏和联系信息 */}
                      <div className="space-y-12">
                          <h2
                              ref={contactNameRef}
                              className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
                              style={{
                                  textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)",
                              }}
                          >
                              Mr.GoGo<br />TURNER
                          </h2>

                          {/* 触摸栏图标 - 8个图标精确还原 */}
                          <div ref={touchBarRef} className="flex flex-wrap gap-4">
                              {/* 紫色X形状 */}
                              <div className="flex justify-center items-center w-16 h-16 bg-purple-500 rounded-lg shadow-lg cursor-pointer">
                                  <div className="relative w-10 h-10">
                                      <div className="absolute top-0 left-1/2 w-1 h-full bg-white rounded-full -translate-x-1/2" />
                                      <div className="absolute left-0 top-1/2 w-full h-1 bg-white rounded-full -translate-y-1/2" />
                                  </div>
                              </div>

                              {/* 绿色网格 */}
                              <div className="flex justify-center items-center w-16 h-16 bg-green-500 rounded-lg shadow-lg cursor-pointer">
                                  <div className="grid grid-cols-2 gap-1 w-8 h-8">
                                      <div className="bg-white rounded-sm" />
                                      <div className="bg-white rounded-sm" />
                                      <div className="bg-white rounded-sm" />
                                      <div className="bg-white rounded-sm" />
                                  </div>
                              </div>

                              {/* 白色月牙 */}
                              <div className="flex justify-center items-center w-16 h-16 rounded-full border shadow-lg cursor-pointer bg-white/10 border-white/20">
                                  <div className="w-12 h-12 rounded-full border-4 border-white border-t-transparent" />
                              </div>

                              {/* 紫色圆圈 */}
                              <div className="w-16 h-16 bg-purple-500 rounded-full shadow-lg cursor-pointer" />

                              {/* 白色箭头 */}
                              <div className="flex justify-center items-center w-16 h-16 rounded-lg border shadow-lg cursor-pointer bg-white/10 border-white/20">
                                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-white" />
                              </div>

                              {/* 橙色半圆 */}
                              <div className="flex justify-center items-center w-16 h-16 bg-orange-500 rounded-lg shadow-lg cursor-pointer">
                                  <div className="w-12 h-12 rounded-full border-4 border-white border-r-transparent border-b-transparent border-l-transparent" />
                              </div>

                              {/* 白色箭头2 */}
                              <div className="flex justify-center items-center w-16 h-16 rounded-lg border shadow-lg cursor-pointer bg-white/10 border-white/20">
                                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-white" />
                              </div>

                              {/* 粉色圆圈 */}
                              <div className="w-16 h-16 bg-pink-500 rounded-full shadow-lg cursor-pointer" />
                          </div>

                          {/* 联系信息 */}
                          <div ref={contactInfoRef} className="grid grid-cols-2 gap-8">
                              <div>
                                  <h3 className="mb-4 text-xs font-semibold tracking-wider uppercase text-white/60 md:text-sm">
                                      SOCIAL
                                  </h3>
                                  <ul className="space-y-2 text-sm text-white/80 md:text-base">
                                      <li className="transition-colors cursor-pointer hover:text-white">Instagram</li>
                                      <li className="transition-colors cursor-pointer hover:text-white">Facebook</li>
                                      <li className="transition-colors cursor-pointer hover:text-white">Artstation</li>
                                      <li className="transition-colors cursor-pointer hover:text-white">Deviantart</li>
                                  </ul>
                              </div>
                              <div>
                                  <h3 className="mb-4 text-xs font-semibold tracking-wider uppercase text-white/60 md:text-sm">
                                      CONTACT
                                  </h3>
                                  <ul className="space-y-2 text-sm text-white/80 md:text-base">
                                      <li className="transition-colors cursor-pointer hover:text-white">Mr.GoGo@3dturner.com</li>
                                      <li className="transition-colors cursor-pointer hover:text-white">+1 (985) 123-4567</li>
                                      <li className="transition-colors cursor-pointer hover:text-white">123 Creative Lane,</li>
                                      <li className="transition-colors cursor-pointer hover:text-white">Suite 45</li>
                                      <li className="transition-colors cursor-pointer hover:text-white">Design City, CA 90210</li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
      
      {/* Login Dialog */}
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
