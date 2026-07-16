"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
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
import { FlippingCard } from "@/components/ui/flipping-card";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import AiInputCard from "@/components/AiInputCard";
import { AiosStackCard } from "@/components/AiosStackCard";
import { ElectricButton } from "@/components/ui/electric-button";
import { SiteHeader } from "@/components/SiteHeader";
import { KineticText } from "@/components/ui/kinetic-text";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 合作伙伴logo数据
const partners = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://svgl.app/library/typescript.svg",
    alt: "TypeScript Logo",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://svgl.app/library/react_light.svg",
    alt: "React Logo",
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
    src: "https://svgl.app/library/python.svg",
    alt: "Python Logo",
  },
];

export default function PortfolioShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 平滑滚动到指定区域
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId.startsWith("/")) {
      window.location.href = targetId;
      return;
    }
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = navRef.current?.offsetHeight || 0;
      // 增加额外的偏移量，确保内容不被遮挡
      const extraOffset = 20;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - extraOffset;
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });
    }
  };

  // Navigation
  const navRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  // Hero Section
  const heroRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroButtonRef = useRef<HTMLButtonElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

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

  // User Stories Section
  const userStoriesRef = useRef<HTMLDivElement>(null);
  const userStoriesTitleRef = useRef<HTMLHeadingElement>(null);
  const userStoriesCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const addManagedListener = (
      target: EventTarget | null | undefined,
      type: string,
      handler: EventListener,
    ) => {
      if (!target) return;
      target.addEventListener(type, handler);
      cleanups.push(() => target.removeEventListener(type, handler));
    };

    const ctx = gsap.context(() => {
      // ========== NAVIGATION ==========
      if (navRef.current && navItemsRef.current) {
        const navItems = navItemsRef.current.children;
        Array.from(navItems).forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: -20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power2.out",
            }
          );
        });

        // Header 自身的 hover 交互由组件负责，避免整条导航被 transform 后产生裁切。
      }

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

        if (heroTitleRef.current) {
          gsap.fromTo(
            heroTitleRef.current,
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            }
          );
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

        // 图片动画
        if (heroImageRef.current) {
          gsap.fromTo(
            heroImageRef.current,
            { opacity: 0, scale: 0.9, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              delay: 0.8,
              ease: "power3.out",
            }
          );
        }

        // 按钮动画 - 带倾斜效果
        if (heroButtonRef.current) {
          gsap.fromTo(
            heroButtonRef.current,
            { opacity: 0, scale: 0.8, y: 30, rotation: -5 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              rotation: -5,
              duration: 0.8,
              delay: 1,
              ease: "back.out(1.7)",
            }
          );

          // 鼠标移动倾斜效果
          const button = heroButtonRef.current;
          const rotationXTo = gsap.quickTo(button, "rotationX", {
            duration: 0.25,
            ease: "power2.out",
          });
          const rotationYTo = gsap.quickTo(button, "rotationY", {
            duration: 0.25,
            ease: "power2.out",
          });
          let buttonRect: DOMRect | null = null;
          let buttonMoveEvent: MouseEvent | null = null;
          let buttonMoveFrame = 0;

          const updateButtonTilt = () => {
            buttonMoveFrame = 0;
            if (!buttonMoveEvent) return;
            const rect = buttonRect ?? button.getBoundingClientRect();
            const e = buttonMoveEvent;
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            rotationXTo(rotateX);
            rotationYTo(rotateY);
          };

          const handleButtonMouseMove = (e: Event) => {
            buttonMoveEvent = e as MouseEvent;
            if (!buttonMoveFrame) {
              buttonMoveFrame = requestAnimationFrame(updateButtonTilt);
            }
          };

          const handleButtonMouseEnter = () => {
            buttonRect = button.getBoundingClientRect();
            gsap.to(button, {
              scale: 1.05,
              y: -5,
              rotation: -8,
              transformPerspective: 1000,
              boxShadow: "0 10px 30px rgba(147, 51, 234, 0.4)",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleButtonMouseLeave = () => {
            if (buttonMoveFrame) cancelAnimationFrame(buttonMoveFrame);
            buttonMoveFrame = 0;
            buttonMoveEvent = null;
            buttonRect = null;
            rotationXTo(0);
            rotationYTo(0);
            gsap.to(button, {
              scale: 1,
              y: 0,
              rotation: -5,
              boxShadow: "0 0 0px rgba(147, 51, 234, 0)",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          addManagedListener(button, "mousemove", handleButtonMouseMove);
          addManagedListener(button, "mouseenter", handleButtonMouseEnter);
          addManagedListener(button, "mouseleave", handleButtonMouseLeave);
          cleanups.push(() => {
            if (buttonMoveFrame) cancelAnimationFrame(buttonMoveFrame);
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
            const handleMouseEnter = () => {
              gsap.to(item, {
                x: index % 2 === 0 ? -30 : 30,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out",
              });
            };

            const handleMouseLeave = () => {
              gsap.to(item, {
                x: index % 2 === 0 ? -20 : 20,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            };

            addManagedListener(item, "mouseenter", handleMouseEnter);
            addManagedListener(item, "mouseleave", handleMouseLeave);
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
            const handleMouseEnter = () => {
              gsap.to(logo, {
                scale: 1.05,
                y: -3,
                duration: 0.3,
                ease: "power2.out",
              });
            };

            const handleMouseLeave = () => {
              gsap.to(logo, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            };

            addManagedListener(logo, "mouseenter", handleMouseEnter);
            addManagedListener(logo, "mouseleave", handleMouseLeave);
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

            const handleMouseEnter = () => {
              gsap.to(project, {
                scale: 1.02,
                y: -8,
                rotationY: 2,
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
                duration: 0.3,
                ease: "power2.out",
              });
            };

            const handleMouseLeave = () => {
              gsap.to(project, {
                scale: 1,
                y: 0,
                rotationY: 0,
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                duration: 0.3,
                ease: "power2.out",
              });
            };

            addManagedListener(project, "mouseenter", handleMouseEnter);
            addManagedListener(project, "mouseleave", handleMouseLeave);
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

            const handleMouseEnter = () => {
              gsap.to(thumb, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
              });
            };

            const handleMouseLeave = () => {
              gsap.to(thumb, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            };

            addManagedListener(thumb, "mouseenter", handleMouseEnter);
            addManagedListener(thumb, "mouseleave", handleMouseLeave);
          });
        }
      }

      // ========== ABOUT ME SECTION ==========
      if (aboutRef.current) {
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

            const handleMouseEnter = () => {
              gsap.to(card, {
                scale: 1.05,
                y: -12,
                rotation: index % 2 === 0 ? -1 : 1,
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.15)",
                duration: 0.3,
                ease: "power2.out",
              });
            };

            const handleMouseLeave = () => {
              gsap.to(card, {
                scale: 1,
                y: 0,
                rotation: 0,
                boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
                duration: 0.3,
                ease: "power2.out",
              });
            };

            addManagedListener(card, "mouseenter", handleMouseEnter);
            addManagedListener(card, "mouseleave", handleMouseLeave);
          });
        }
      }

      // ========== CONTACT SECTION ==========
      if (contactRef.current) {
        if (contactBlobRef.current) {
          const contact = contactRef.current;
          const contactBlob = contactBlobRef.current;
          // 滚动视差
          gsap.to(contactBlob, {
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
          gsap.to(contactBlob, {
            scale: 1.04,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });

          // 鼠标跟随
          const contactXTo = gsap.quickTo(contactBlob, "x", { duration: 1.2, ease: "power2.out" });
          const contactYTo = gsap.quickTo(contactBlob, "y", { duration: 1.2, ease: "power2.out" });
          const contactRotationTo = gsap.quickTo(contactBlob, "rotation", { duration: 1.2, ease: "power2.out" });
          let contactMoveEvent: MouseEvent | null = null;
          let contactMoveFrame = 0;
          const updateContactBlob = () => {
            contactMoveFrame = 0;
            if (!contactMoveEvent) return;
            const rect = contact.getBoundingClientRect();
            const e = contactMoveEvent;
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            contactXTo(x * 40);
            contactYTo(y * 40);
            contactRotationTo(x * 15);
          };
          const handleContactMouseMove = (e: Event) => {
            contactMoveEvent = e as MouseEvent;
            if (!contactMoveFrame) {
              contactMoveFrame = requestAnimationFrame(updateContactBlob);
            }
          };

          addManagedListener(contact, "mousemove", handleContactMouseMove);
          cleanups.push(() => {
            if (contactMoveFrame) cancelAnimationFrame(contactMoveFrame);
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

            const handleMouseEnter = () => {
              gsap.to(icon, {
                scale: 1.15,
                y: -8,
                rotation: 5,
                duration: 0.25,
                ease: "power2.out",
              });
            };

            const handleMouseLeave = () => {
              gsap.to(icon, {
                scale: 1,
                y: 0,
                rotation: 0,
                duration: 0.25,
                ease: "power2.out",
              });
            };

            const handleClick = () => {
              gsap.to(icon, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
              });
            };

            addManagedListener(icon, "mouseenter", handleMouseEnter);
            addManagedListener(icon, "mouseleave", handleMouseLeave);
            addManagedListener(icon, "click", handleClick);
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

      // ========== USER STORIES SECTION ==========
      if (userStoriesRef.current) {
        // 标题动画
        if (userStoriesTitleRef.current) {
          gsap.fromTo(
            userStoriesTitleRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: userStoriesRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // 卡片动画
        if (userStoriesCardsRef.current) {
          const cards = userStoriesCardsRef.current.children;
          Array.from(cards).forEach((card, index) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 50, rotationY: -15 },
              {
                opacity: 1,
                y: 0,
                rotationY: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: userStoriesRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        }
      }
    }, containerRef);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  const services = [
    {
      number: "01",
      label: "对话工作台",
      description:
        "人人都能 Vibe Coding，用提示词代替手动操作，串联工作流。",
    },
    {
      number: "02",
      label: "Skills Hub",
      description:
        "通过 Function Call 调用技能仓库，让 AI 工作搭子具备执行复杂任务的能力。",
    },
    {
      number: "03",
      label: "GoData向量知识库",
      description:
        "长期记忆与专业大脑，覆盖语义相似度与精确关键词匹配场景。",
    },
    {
      number: "04",
      label: "Prompt Genius",
      description:
        "模糊指令自动补全，本地推理驱动，让每一条指令都发挥最大价值。",
    },
    {
      number: "05",
      label: "Memory OS",
      description:
        "超越对话历史堆叠，实现长任务执行中的连贯认知与精准决策。",
    },
  ];
  const projectThumbnailsMockData = [
    { id: 0, title: "对话工作台", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 1, title: "Skills Hub", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 2, title: "GoData知识库", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 3, title: "Prompt Genius", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 4, title: "Memory OS", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 5, title: "Inference Turbo", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 6, title: "Amy通用助手", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 7, title: "Lina Word专家", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 8, title: "Aira PPT专家", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 9, title: "Max Excel专家", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 10, title: "Lumi应用开发专家", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 11, title: "Cloud云轻盒", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 12, title: "Mix轻终端", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 13, title: "Spark Solo工作站", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 14, title: "Spark Cluster集群", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&auto=format&fit=crop&q=80" },
    { id: 15, title: "企业私有化方案", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&auto=format&fit=crop&q=80" },
  ];

  const projects = [
    {
      number: "01",
      client: "某城市建设投资集团",
    },
    {
      number: "02",
      client: "某文化传媒公司",
    },
    {
      number: "03",
      client: "某市属重点中学",
    },
  ];

  // Mock 数据用于 ScrollVelocity 组件
  const scrollVelocityMockData = [
    "AIOS",
    "GOAGENT",
    "GODATA",
    "SKILLS HUB",
    "PROMPT GENIUS",
    "MEMORY OS",
    "INFERENCE TURBO",
    "AMY",
    "LINA",
    "AIRA",
    "MAX",
    "LUMI",
  ];

  const customers = [
    {
      name: "行政办公室",
      company: "某城市建设投资集团",
      text: "以前最怕下班前接到紧急发文，对着十几项格式规范改到深夜，是常有的事。",
    },
    {
      name: "公文规范",
      company: "某城市建设投资集团",
      text: "导入历年标准公文、品牌规范与项目档案，搭建专属知识库，自动生成格式合规的完整初稿。",
    },
    {
      name: "看得见的变化",
      company: "某城市建设投资集团",
      text: "新员工公文上手周期缩短80%，集团文档品牌合规率从42%提升至96%。",
    },
    {
      name: "策划部",
      company: "某文化传媒公司",
      text: "比稿季同时接四五个项目，一半时间都在调PPT排版，创意都想不动了。",
    },
    {
      name: "创意知识底座",
      company: "某文化传媒公司",
      text: "上传提案模板、历史案例库与品牌视觉规范，全员可用数字员工快速产出标准化初稿。",
    },
    {
      name: "产出效率",
      company: "某文化传媒公司",
      text: "单份竞标方案产出周期从3天压缩至4小时，基础排版与文案工作人力投入减少70%。",
    },
    {
      name: "高二年级组",
      company: "某市属重点中学",
      text: "备课本、练习卷、学情分析、学生评语经常把作业抱回家，改到半夜。",
    },
    {
      name: "校本教研知识库",
      company: "某市属重点中学",
      text: "同步教材、教案、试卷等全量教学资料，输入教学主题与班级学情即可生成教案框架和试卷初稿。",
    },
    {
      name: "教学回归课堂",
      company: "某市属重点中学",
      text: "教师单课备课时间平均减少55%，试卷与学情报告产出效率提升3倍。",
    },
    {
      name: "Amy",
      company: "通用助手",
      text: "随时应答、日常问题解答、智能任务管理、多场景支持。",
    },
    {
      name: "Lina",
      company: "Word专家",
      text: "生成文档、文案撰写与编辑、格式自动调整、内容智能优化。",
    },
    {
      name: "Aira",
      company: "PPT专家",
      text: "专业演示、内容排版与设计、智能配色方案、精美模板生成。",
    },
    {
      name: "Max",
      company: "Excel专家",
      text: "图表可视化、数据分析与展示、智能图表生成、自动化报表。",
    },
    {
      name: "Lumi",
      company: "网站应用开发专家",
      text: "想法变应用、快速应用开发、网站原型生成、低代码平台。",
    },
    {
      name: "更多专家角色",
      company: "GoAgent",
      text: "内置5大数字员工，开箱即用，立即提升团队效率，更多专家角色就位中。",
    },
  ];

  const userStories = [
    {
      name: "行政办公室",
      role: "某城市建设投资集团",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&auto=format&fit=crop&q=80",
      frontTitle: "公文上手周期缩短80%",
      frontDescription: "格式严苛、标准不一、汇总繁琐的行政材料生产场景",
      backStory: "导入集团历年标准公文、品牌规范与项目档案，搭建专属知识库；说清事由、主送单位与核心内容，自动生成格式合规的完整初稿。",
    },
    {
      name: "策划部",
      role: "某文化传媒公司",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      mainImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&auto=format&fit=crop&q=80",
      frontTitle: "竞标方案4小时产出",
      frontDescription: "改稿频繁、创意耗散、基础排版挤占核心创意",
      backStory: "上传公司提案模板、历史案例库与品牌视觉规范，构建创意知识底座；全员可用数字员工，客户经理也能生成初版方案。",
    },
    {
      name: "高二年级组",
      role: "某市属重点中学",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      mainImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&auto=format&fit=crop&q=80",
      frontTitle: "学情报告效率提升3倍",
      frontDescription: "备课、出卷、分析、评语撰写占用大量课余时间",
      backStory: "搭建校本教研知识库，同步教材、教案、试卷等全量教学资料；配置备课教研、学情分析两类专属数字员工。",
    },
    {
      name: "企业私有化",
      role: "GoAgent AIPC",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&auto=format&fit=crop&q=80",
      frontTitle: "消费级成本跑企业级推理",
      frontDescription: "Spark Cluster集群，本地化部署方案优势",
      backStory: "支持300B FP8本地模型、512GB超大显存、高速推理和团队并发支持，适合中小团队搭建内网私有算力池。",
    },
  ];

  return (
    <><div ref={containerRef} className="overflow-x-clip text-white bg-black">
          {/* ========== NAVIGATION ========== */}
          <nav
              ref={navRef}
              className="fixed top-0 right-0 left-0 z-50"
          >
              <div ref={navItemsRef}>
                  <SiteHeader
                      mode="home"
                      onNavigate={handleNavClick}
                      onLogoClick={(e) => {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                  />
              </div>
          </nav>

          {/* ========== PARALLAX FLOATING HERO SECTION ========== */}
          <section className="overflow-hidden relative w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black">
              <Floating className="relative w-full h-full" sensitivity={1.2} easingFactor={0.08}>
                  {/* 背景装饰元素 - 大尺寸模糊圆形 */}
                  <FloatingElement depth={0.3} className="top-10 left-10">
                      <div className="w-64 h-64 bg-gradient-to-br rounded-full blur-3xl from-purple-500/20 to-pink-500/20" />
                  </FloatingElement>

                  <FloatingElement depth={0.5} className="right-20 top-1/2">
                      <div className="w-80 h-80 bg-gradient-to-br rounded-full blur-3xl from-blue-500/20 to-cyan-500/20" />
                  </FloatingElement>

                  <FloatingElement depth={0.7} className="bottom-20 left-1/4">
                      <div className="w-48 h-48 bg-gradient-to-br rounded-full blur-3xl from-yellow-500/20 to-orange-500/20" />
                  </FloatingElement>

                  <FloatingElement depth={0.4} className="top-1/4 right-1/3">
                      <div className="w-56 h-56 bg-gradient-to-br rounded-full blur-3xl from-indigo-500/20 to-purple-500/20" />
                  </FloatingElement>

                  {/* 主要内容区域 */}
                  <div className="grid relative z-10 grid-cols-1 gap-8 items-center content-center px-6 pt-16 mx-auto w-full max-w-7xl min-h-screen text-left lg:grid-cols-[500px_minmax(0,1fr)] lg:gap-12 lg:px-12">
                      <div className="hidden justify-center items-center lg:flex lg:-translate-x-16">
                          <AiInputCard scale={1.55} />
                      </div>

                      <div className="relative z-10 flex min-w-0 flex-col items-start">
                          <div ref={heroTitleRef} className="mb-8 max-w-4xl">
                              <KineticText
                                  as="h1"
                                  text="GoAgent AIPC"
                                  className="text-left text-[clamp(2.35rem,4vw,4.6rem)] font-black leading-[1.08] tracking-normal text-white"
                              />
                              <KineticText
                                  as="h2"
                                  text="一支数字员工团队"
                                  className="mt-2 text-left text-[clamp(2.35rem,4vw,4.6rem)] font-black leading-[1.08] tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
                              />
                          </div>

                          <p
                              ref={heroSubtitleRef}
                              className="mb-10 max-w-2xl text-left text-[clamp(1rem,1.2vw,1.22rem)] font-light leading-8 text-white/72"
                          >
                              一台终端，一套系统，五位专家级数字员工。面向文档、报表、演示、数据分析与应用开发，支持本地化部署和企业知识库。
                          </p>

                          <div className="flex flex-col items-start justify-center gap-4 sm:flex-row">
                              <ElectricButton activeLabel="开始探索">
                                  预约产品演示
                              </ElectricButton>
                              <Link
                                  href="/product"
                                  onClick={(e) => handleNavClick(e, '/product')}
                                  className="rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/78 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                              >
                                  查看产品矩阵
                              </Link>
                          </div>
                      </div>
                  </div>

                  {/* 装饰性几何元素 */}
                  <FloatingElement depth={1.2} className="top-28 right-16 md:right-24">
                      <div className="w-20 h-20 bg-gradient-to-br rounded-lg border backdrop-blur-sm rotate-45 from-green-500/30 to-emerald-500/30 border-white/20" />
                  </FloatingElement>

                  <FloatingElement depth={1.5} className="-bottom-8 left-24 md:left-1/4">
                      <div className="w-24 h-24 bg-gradient-to-br rounded-lg border backdrop-blur-sm from-indigo-500/30 to-purple-500/30 border-white/20" />
                  </FloatingElement>

                  <FloatingElement depth={1} className="right-20 bottom-24 md:right-1/4">
                      <div className="w-16 h-16 bg-gradient-to-br rounded-full border backdrop-blur-sm from-pink-500/30 to-rose-500/30 border-white/20" />
                  </FloatingElement>

                  <FloatingElement depth={1.3} className="top-1/2 left-10 md:left-20">
                      <div className="w-12 h-12 bg-gradient-to-br rounded-lg border backdrop-blur-sm rotate-12 from-cyan-500/30 to-blue-500/30 border-white/20" />
                  </FloatingElement>

                  <FloatingElement depth={0.9} className="right-8 bottom-8 md:right-20">
                      <div className="w-14 h-14 bg-gradient-to-br rounded-full border backdrop-blur-sm from-orange-500/30 to-yellow-500/30 border-white/20" />
                  </FloatingElement>

                  {/* 滚动提示 */}
                  <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
                      <div className="flex flex-col gap-2 items-center text-white/60">
                          <span className="text-sm">继续了解</span>
                          <div className="flex justify-center items-start p-2 w-6 h-10 rounded-full border-2 border-white/30">
                              <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
                          </div>
                      </div>
	                  </div>
	              </Floating>
	          </section>

          {/* ========== SERVICES SECTION ========== */}
          {/* <section
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
          </section> */}



	          {/* ========== ANIMATED SCROLL MODULE ========== */}
	          <section className="relative w-full">
	              <ScrollAdventure />
	          </section>

          {/* ========== INTERACTIVE SCROLLING STORY MODULE ========== */}
          {/* <section className="relative w-full">
      <ScrollingFeatureShowcase />
    </section> */}

	      </div>
	      {/* ========== AIOS ARCHITECTURE MODULE ========== */}
	      <section id="aios" className="bg-[#f5f5f7] px-6 py-24 text-[#1d1d1f] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#86868b]">AIOS Architecture</p>
            <h2 className="mt-5 text-balance text-5xl font-semibold leading-[1] tracking-[-0.04em] md:text-7xl">
              让每一次工作<br />都有完整底座。
            </h2>
            <p className="mt-8 max-w-2xl text-xl font-medium leading-9 text-[#6e6e73]">
              模型路由、上下文、记忆、知识库与 Skills 共同完成任务，安全审计、权限管理与私有化部署让它进入真实组织。
            </p>
            <div className="mt-10 grid max-w-2xl gap-x-7 gap-y-3 text-sm font-bold text-[#1d1d1f] sm:grid-cols-2">
              {[
                "模型路由与上下文管理",
                "Memory OS 与 GoData 知识库",
                "Skills 任务执行能力",
                "安全审计与私有化部署",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 border-t border-black/10 pt-3">
                  <span className="size-1.5 rounded-full bg-[#0071e3]" />
                  {item}
                </div>
              ))}
            </div>
            <a
              href="/technology"
              onClick={(event) => handleNavClick(event, "/technology")}
              className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-[#1d1d1f] px-6 text-sm font-bold text-white transition hover:bg-[#333]"
            >
              查看技术架构
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="min-h-[420px] overflow-visible rounded-[34px] border border-black/[0.08] bg-white px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.06)] md:px-10">
            <div className="flex items-center justify-between text-xs font-bold tracking-[0.12em] text-[#86868b]">
              <span>GOAGENT AIPC</span>
              <span>CAPABILITY STACK</span>
            </div>
            <AiosStackCard />
          </div>
        </div>
	      </section>

	      {/* ========== STACKING CARD MODULE ========== */}
	      <section className="relative w-full">
        <StackingCard
       isolated
       projects={[
        {
          title: "五大AI数字员工",
          description: "Amy、Lina、Aira、Max、Lumi各司其职的专家级超级智能体，覆盖通用助手、Word、PPT、Excel与网站应用开发。",
          link: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
          color: "#8b5cf6",
          type: 'avatars',
          features: [
            "内置5大数字员工，开箱即用。",
            "从日常应答到专业办公生成。",
            "更多专家角色持续就位。",
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
            title: "内置Skills Hub仓库",
            description: "通过Function Call调用GoAgent技能仓库，让AI工作搭子具备执行复杂任务的能力。",
            link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
            color: "#10b981",
            type: 'image',
            features: [
              "数据爬虫与结构化解析。",
              "文档格式解析与知识库检索。",
              "代码转Office与ECharts制表。",
            ],
          },
        {
          title: "GoData向量知识库",
          description: "资料库扮演长期记忆与专业大脑的核心角色，支持语义相似度与精确关键词匹配。",
          link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
          color: "#6366f1",
          type: 'video',
          features: [
            "Word、Excel、PPT自动分块。",
            "召回率提升25%+。",
            "知识更新从天级缩短至分钟级。",
          ],
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          videoThumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
        },
        {
          title: "Prompt Genius",
          description: "模糊输入不再是瓶颈，普通用户也能驾驭复杂Agent任务，让每一条指令都发挥最大价值。",
          link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
          color: "#f59e0b",
          type: 'image',
          features: [
            "模糊指令自动补全。",
            "本地推理驱动，无需联网。",
            "Function Calling调用错误率下降78%。",
          ],
        },
        {
          title: "Memory OS多层记忆系统",
          description: "让Agent真正理解任务全貌，超越对话历史堆叠，实现长任务执行中的连贯认知与精准决策。",
          link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
          color: "#06b6d4",
          type: 'video',
          features: [
            "短期、中期、长期与跨会话记忆。",
            "单轮对话支持600轮次Function Calling。",
            "不只是AI工具，更是会成长的工作伙伴。",
          ],
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          videoThumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
        },

      ]}
        />
	      </section>
	      <div className="overflow-x-clip text-white bg-black">
          {/* ========== PROJECTS SECTION ========== */}
          <section
              ref={projectsRef}
              id="projects"
              className="flex relative flex-col justify-center items-center py-20 min-h-screen bg-black scroll-mt-24"
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
	                      数字员工与产品生态
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
                                  style={{ width: '500px', height: `${500 * 0.618}px` }}
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
              className="flex overflow-hidden relative justify-center items-center py-20 min-h-screen bg-black scroll-mt-24"
          >
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(84,54,150,0.18)_0%,rgba(0,0,0,0)_34%),linear-gradient(240deg,rgba(28,118,142,0.13)_0%,rgba(0,0,0,0)_31%),#000]" />
              <div className="container relative z-10 px-6 mx-auto md:px-10">
                  <div className="max-w-6xl">
                      <p className="mb-8 text-sm font-semibold uppercase text-cyan-200/75 md:text-base">
                          JIUGO TURING
                      </p>

                      <h2
                          ref={aboutTitleRef}
                          className="max-w-5xl text-[clamp(4.5rem,13vw,13rem)] font-black leading-[0.86] tracking-normal text-white"
                      >
                          九维图灵
                      </h2>

                      <div ref={aboutDescRef} className="mt-10 max-w-4xl">
                          <p className="text-2xl font-semibold leading-snug text-white md:text-5xl md:leading-tight">
                              下一代AIOS缔造者
                          </p>
                          <p className="mt-5 text-base leading-8 text-white/[0.62] md:max-w-2xl md:text-xl">
                              用GoAgent与GoData，把AI从工具升级为可协作的数字生产力
                          </p>
                          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold uppercase text-white/[0.42] md:text-base">
                              <span>AIOS</span>
                              <span>GoAgent</span>
                              <span>GoData</span>
                              <span>Multi-Agent</span>
                          </div>
                      </div>

                      <div className="mt-10">
                          <ElectricButton
                              ref={aboutButtonRef}
                              activeLabel="进入AIOS"
                          >
                              了解AIOS
                          </ElectricButton>
                      </div>
                  </div>
              </div>
	          </section>

	          {/* ========== CUSTOMERS SECTION ========== */}
          <section
              ref={customersRef}
              id="customers"
              className="flex relative justify-center items-center py-20 min-h-screen bg-black scroll-mt-24"
          >
              <div className="relative z-10 w-full">
                  <div className="mb-16 text-center">
                      <h2
                          ref={customersTitleRef}
                          className="mb-4 text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
                      >
                          典型应用<br />场景案例
                      </h2>
                      <div className="text-6xl">😍</div>
                  </div>

                  <div
                      ref={customersCardsRef}
                      className="w-full px-8"
                  >
                      <div className="flex flex-col gap-6">
                          {/* 第一行 - 从左到右 */}
                          <InfiniteSlider
                              gap={24}
                              duration={40}
                              reverse={false}
                          >
                              {customers.slice(0, 5).map((customer, index) => (
                                  <div
                                      key={index}
                                      className="shrink-0 p-6 w-96 h-48 rounded-3xl border backdrop-blur-sm transition-all cursor-pointer bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105"
                                  >
                                      <div className="flex gap-3 items-center mb-4">
                                          <div className="flex justify-center items-center w-12 h-12 rounded-full bg-white/10">
                                              <span className="text-xl font-bold text-white/60">
                                                  {customer.name.charAt(0)}
                                              </span>
                                          </div>
                                          <div>
                                              <div className="text-sm font-semibold text-white">{customer.name}</div>
                                              <div className="text-xs tracking-wider uppercase text-white/60">
                                                  {customer.company}
                                              </div>
                                          </div>
                                      </div>
                                      <p className="text-xs leading-relaxed text-white/80 line-clamp-3">
                                          {customer.text}
                                      </p>
                                  </div>
                              ))}
                          </InfiniteSlider>

                          {/* 第二行 - 从右到左 */}
                          <InfiniteSlider
                              gap={24}
                              duration={45}
                              reverse={true}
                          >
                              {customers.slice(5, 10).map((customer, index) => (
                                  <div
                                      key={index + 5}
                                      className="shrink-0 p-6 w-96 h-48 rounded-3xl border backdrop-blur-sm transition-all cursor-pointer bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105"
                                  >
                                      <div className="flex gap-3 items-center mb-4">
                                          <div className="flex justify-center items-center w-12 h-12 rounded-full bg-white/10">
                                              <span className="text-xl font-bold text-white/60">
                                                  {customer.name.charAt(0)}
                                              </span>
                                          </div>
                                          <div>
                                              <div className="text-sm font-semibold text-white">{customer.name}</div>
                                              <div className="text-xs tracking-wider uppercase text-white/60">
                                                  {customer.company}
                                              </div>
                                          </div>
                                      </div>
                                      <p className="text-xs leading-relaxed text-white/80 line-clamp-3">
                                          {customer.text}
                                      </p>
                                  </div>
                              ))}
                          </InfiniteSlider>

                          {/* 第三行 - 从左到右 */}
                          <InfiniteSlider
                              gap={24}
                              duration={35}
                              reverse={false}
                          >
                              {customers.slice(10, 15).map((customer, index) => (
                                  <div
                                      key={index + 10}
                                      className="shrink-0 p-6 w-96 h-48 rounded-3xl border backdrop-blur-sm transition-all cursor-pointer bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105"
                                  >
                                      <div className="flex gap-3 items-center mb-4">
                                          <div className="flex justify-center items-center w-12 h-12 rounded-full bg-white/10">
                                              <span className="text-xl font-bold text-white/60">
                                                  {customer.name.charAt(0)}
                                              </span>
                                          </div>
                                          <div>
                                              <div className="text-sm font-semibold text-white">{customer.name}</div>
                                              <div className="text-xs tracking-wider uppercase text-white/60">
                                                  {customer.company}
                                              </div>
                                          </div>
                                      </div>
                                      <p className="text-xs leading-relaxed text-white/80 line-clamp-3">
                                          {customer.text}
                                      </p>
                                  </div>
                              ))}
                          </InfiniteSlider>
                      </div>
                  </div>
              </div>
          </section>

          {/* ========== USER STORIES SECTION ========== */}
          <section
              ref={userStoriesRef}
              id="user-stories"
              className="flex relative justify-center items-center py-20 min-h-screen bg-black"
          >
              <div className="container relative z-10 px-8 mx-auto">
                  <div className="mb-16 text-center">
                      <h2
                          ref={userStoriesTitleRef}
                          className="mb-4 text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
                      >
                          用户故事案例
                      </h2>
                      <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 md:text-xl">
                          悬停卡片，查看GoAgent在政企、传媒、教育与本地化部署中的落地变化。
                      </p>
                  </div>

                  <div
                      ref={userStoriesCardsRef}
                      className="grid grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-4"
                  >
                      {userStories.map((story, index) => (
                          <div key={index} className="flex justify-center">
                              <FlippingCard
                                  height={450}
                                  width={280}
                                  frontContent={
                                      <div className="flex flex-col h-full">
                                          {/* 上方：主图片 - 占五分之四 */}
                                          <div className="w-full h-4/5 overflow-hidden rounded-t-xl relative">
                                              <img
                                                  src={story.mainImage}
                                                  alt={story.frontTitle}
                                                  className="w-full h-full object-cover"
                                              />
                                              {/* 中间：头像 - 覆盖在图片上 */}
                                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                                                  <img
                                                      src={story.avatar}
                                                      alt={story.name}
                                                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                                                  />
                                              </div>
                                          </div>
                                          {/* 下面：文字 - 占五分之一 */}
                                          <div className="flex-1 flex flex-col justify-between px-6 pt-8 pb-6">
                                              <div>
                                                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-600 text-center">
                                                      {story.frontTitle}
                                                  </div>
                                                  <p className="text-sm leading-relaxed text-neutral-700 text-center mb-4">
                                                      {story.frontDescription}
                                                  </p>
                                              </div>
                                              <div className="text-center">
                                                      <span className="text-xs text-neutral-400 italic">悬停查看案例 →</span>
                                              </div>
                                          </div>
                                      </div>
                                  }
                                  backContent={
                                      <div className="flex flex-col justify-between h-full p-6">
                                          <div className="flex-1">
                                              <div className="mb-4 flex gap-3 items-center">
                                                  <img
                                                      src={story.avatar}
                                                      alt={story.name}
                                                      className="w-14 h-14 rounded-full object-cover border-2 border-neutral-300 shadow-lg"
                                                  />
                                                  <div>
                                                      <div className="text-base font-bold text-neutral-900">
                                                          {story.name}
                                                      </div>
                                                      <div className="text-xs text-neutral-600">
                                                          {story.role}
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-pink-600">
                                                  案例详情
                                              </div>
                                              <p className="text-sm leading-relaxed text-neutral-700">
                                                  {story.backStory}
                                              </p>
                                          </div>
                                          <div className="mt-4 pt-4 border-t border-neutral-200 text-center">
                                              <div className="text-2xl">✨</div>
                                          </div>
                                      </div>
                                  }
                              />
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
              className="flex overflow-hidden relative min-h-screen bg-black scroll-mt-24"
          >
              {/* 背景渐变blob */}
              <div className="absolute inset-0">
                  <div
                      ref={contactBlobRef}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-purple-600/30 rounded-full blur-3xl" />
              </div>

              <div className="container relative z-10 mx-auto flex min-h-screen flex-col justify-between px-8 py-20">
                  <div className="grid flex-1 grid-cols-1 gap-12 items-center lg:grid-cols-[0.92fr_1.08fr]">
                      <div className="relative max-w-3xl">
                          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-white/42">
                              CONTACT
                          </p>
                          <h1
                              ref={contactTitleRef}
                              className="mb-7 text-5xl font-black tracking-tight leading-none text-white md:text-6xl lg:text-8xl"
                          >
                              联系我们
                          </h1>
                          <p className="max-w-2xl text-base leading-8 text-white/62 md:text-lg">
                              需要了解 GoAgent AIPC、企业私有化部署、数字员工定制或企业知识库方案，可以留下联系方式，我们会尽快与您沟通。
                          </p>
                          <div ref={contactEmailRef} className="mt-8">
                              <div className="flex max-w-2xl flex-col gap-4 sm:flex-row">
                                  <input
                                      type="email"
                                      placeholder="sales@9dimension.tech"
                                      className="min-w-0 flex-1 rounded-2xl border border-white/16 bg-white/[0.055] px-5 py-4 text-white backdrop-blur-sm transition-all placeholder-white/42 focus:border-white/38 focus:outline-none focus:ring-2 focus:ring-white/20" />
                                  <button className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition-colors hover:bg-white/90">
                                      预约演示
                                  </button>
                              </div>
                          </div>
                          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 text-sm text-white/58 sm:grid-cols-3">
                              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                                  北京 · 商务与行业合作
                              </div>
                              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                                  上海 · 产品与交付支持
                              </div>
                              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                                  广州 · 华南客户服务
                              </div>
                          </div>
                      </div>

                      <div ref={contactInfoRef} className="grid gap-5">
                          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm">
                              <div className="grid gap-7 md:grid-cols-2">
                                  <div>
                                      <h3 className="mb-4 text-xs font-semibold tracking-wider uppercase text-white/50 md:text-sm">
                                          公司
                                      </h3>
                                      <ul className="space-y-3 text-sm leading-7 text-white/78 md:text-base">
                                          <li>九维图灵（上海）科技有限公司</li>
                                          <li><a href="mailto:sales@9dimension.tech" className="transition-colors hover:text-white">sales@9dimension.tech</a></li>
                                          <li>GoAgent AIPC 产品咨询</li>
                                          <li>企业私有化方案</li>
                                          <li>AI 数字员工定制开发</li>
                                      </ul>
                                  </div>
                                  <div>
                                      <h3 className="mb-4 text-xs font-semibold tracking-wider uppercase text-white/50 md:text-sm">
                                          产品线
                                      </h3>
                                      <ul className="grid grid-cols-2 gap-2 text-sm text-white/72 md:text-base">
                                          <li className="rounded-xl bg-white/[0.05] px-3 py-2">GoAgent AIPC</li>
                                          <li className="rounded-xl bg-white/[0.05] px-3 py-2">GoData</li>
                                          <li className="rounded-xl bg-white/[0.05] px-3 py-2">模型路由</li>
                                          <li className="rounded-xl bg-white/[0.05] px-3 py-2">SmartStorage</li>
                                      </ul>
                                  </div>
                              </div>
                          </div>

                          <div className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                              <div className="shrink-0 rounded-2xl bg-white p-3 shadow-2xl shadow-black/20">
                                  <img
                                      src="/wechat-official-account.jpg"
                                      alt="九维图灵微信公众号二维码"
                                      className="h-[136px] w-[136px] rounded-xl object-cover"
                                  />
                              </div>
                              <div>
                                  <h3 className="text-xl font-semibold text-white">
                                      关注九维图灵公众号
                                  </h3>
                                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/62 md:text-base">
                                      获取 GoAgent AIPC 产品动态、企业 AIOS 落地方案和数字员工应用案例。
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="mt-10 border-t border-white/10 pt-6 text-center text-[13px] leading-7 text-white/42">
                      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2">
                          <a href="/legal" className="transition-colors hover:text-white">法律声明</a>
                          <a href="/terms" className="transition-colors hover:text-white">服务条款</a>
                          <a href="/privacy" className="transition-colors hover:text-white">隐私政策</a>
                          <a href="/sitemap" className="transition-colors hover:text-white">网站地图</a>
                          <a
                              href="https://beian.miit.gov.cn/"
                              target="_blank"
                              rel="noreferrer"
                              className="transition-colors hover:text-white"
                          >
                              沪ICP备2026025446号-2
                          </a>
                          <a
                              href="https://beian.mps.gov.cn/#/query/webSearch?code=31010902101481"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 transition-colors hover:text-white"
                          >
                              <img
                                  src="/beian-gov-icon.png"
                                  alt=""
                                  aria-hidden="true"
                                  className="h-4 w-auto"
                              />
                              沪公网安备31010902101481号
                          </a>
                      </div>
                      <p className="mt-3">
                          Copyright © 2024 - 2026 九维图灵（上海）科技有限公司. All Rights Reserved.
                      </p>
                  </div>
              </div>
          </section>
      </div>
    </>
  );
}
