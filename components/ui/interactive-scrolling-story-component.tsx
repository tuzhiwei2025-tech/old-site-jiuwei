"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- Data for each slide ---
const slidesData = [
  {
    title: "Generate Code with AI",
    description: "Describe your logic in plain English and watch as the AI generates clean, efficient code in seconds. From Python scripts to complex algorithms.",
    image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#fff100",
    textColor: "#000000",
  },
  {
    title: "Debug and Refactor Smarter",
    description: "Paste your buggy code and let the AI identify errors, suggest improvements, and refactor for better readability and performance.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#fff100",
    textColor: "#000000",
  },
  {
    title: "Learn New Languages, Instantly",
    description: "Translate code snippets between languages. Understand syntax and paradigms of a new language by seeing familiar code transformed.",
    image: "https://images.unsplash.com/photo-1608306448197-e83633f1261c?q=80&w=1974&auto=format&fit=crop",
    bgColor: "#fff100",
    textColor: "#000000",
  },
  {
    title: "Automate Your Workflow",
    description: "From writing documentation to generating unit tests, let AI handle the repetitive tasks so you can focus on building great things.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#fff100",
    textColor: "#000000",
  },
];

// --- Main App Component ---
export function ScrollingFeatureShowcase() {
  // State to track the currently active slide index
  const [activeIndex, setActiveIndex] = useState(0);
  // Ref to the main scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Ref to the sticky content panel
  const stickyPanelRef = useRef<HTMLDivElement>(null);

  // --- Scroll Handler ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // 计算容器顶部在文档中的绝对位置
      const containerTop = scrollY + rect.top;
      
      // 计算可滚动的距离（容器高度减去视口高度）
      const scrollableHeight = containerHeight - windowHeight;
      
      // 如果容器还未进入视口顶部
      if (rect.top > 0) {
        setActiveIndex(0);
        return;
      }
      
      // 如果容器已经完全滚出视口
      if (scrollableHeight > 0 && rect.top < -scrollableHeight) {
        setActiveIndex(slidesData.length - 1);
        return;
      }
      
      // 当容器在滚动范围内时（sticky 元素生效的范围）
      if (scrollableHeight > 0 && rect.top <= 0 && rect.top >= -scrollableHeight) {
        // 计算滚动进度
        // 当 rect.top = 0 时，progress = 0（容器刚进入视口顶部）
        // 当 rect.top = -scrollableHeight 时，progress = 1（容器完全滚出）
        const scrollProgress = Math.abs(rect.top) / scrollableHeight;
        
        // 根据滚动进度计算当前应该显示的 slide
        const rawIndex = scrollProgress * slidesData.length;
        const newActiveIndex = Math.min(
          slidesData.length - 1,
          Math.max(0, Math.floor(rawIndex))
        );
        
        setActiveIndex(newActiveIndex);
      }
    };

    // 使用 requestAnimationFrame 优化滚动性能
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true }); // 监听窗口大小变化
    handleScroll(); // 初始调用一次以设置正确的初始状态
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  
  // Dynamic styles for the background and text color transitions
  const dynamicStyles = {
    backgroundColor: slidesData[activeIndex].bgColor,
    color: slidesData[activeIndex].textColor,
    transition: 'background-color 0.7s ease, color 0.7s ease',
  };

  // Styles for the grid pattern on the right side
  const gridPatternStyle = {
    '--grid-color': 'rgba(0, 0, 0, 0.12)',
    backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
    backgroundSize: '3.5rem 3.5rem',
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="relative w-full"
      style={{ height: `${slidesData.length * 100}vh` }}
    >
      <div ref={stickyPanelRef} className="flex sticky top-0 flex-col justify-center items-center w-full h-screen" style={dynamicStyles}>
          <div className="grid grid-cols-1 mx-auto w-full max-w-7xl h-full md:grid-cols-2">
            
            {/* Left Column: Text Content, Pagination & Button */}
            <div className="flex relative flex-col justify-center p-8 border-r md:p-16 border-black/10">
              {/* Pagination Bars */}
              <div className="flex absolute top-16 left-16 space-x-2">
                {slidesData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                        const container = scrollContainerRef.current;
                        if(container){
                            const rect = container.getBoundingClientRect();
                            const windowHeight = window.innerHeight;
                            const containerHeight = rect.height;
                            const scrollableHeight = containerHeight - windowHeight;
                            const stepHeight = scrollableHeight / slidesData.length;
                            const targetScroll = rect.top + window.scrollY + (stepHeight * index);
                            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                        }
                    }}
                    className={`h-1 rounded-full transition-all duration-500 ease-in-out ${
                      index === activeIndex ? 'w-12 bg-black/80' : 'w-6 bg-black/20'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="relative w-full h-64">
                {slidesData.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}
                  >
                    <h2 className="text-5xl font-bold tracking-tighter md:text-6xl">{slide.title}</h2>
                    <p className="mt-6 max-w-md text-lg md:text-xl">{slide.description}</p>
                  </div>
                ))}
              </div>

              {/* Get Started Button */}
              <div className="absolute bottom-16 left-16">
                <a
                  href="#get-started"
                  className="px-10 py-4 font-semibold tracking-wider text-white uppercase bg-black rounded-full transition-colors hover:bg-gray-800"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Right Column: Image Content with Grid Background */}
            <div className="hidden justify-center items-center p-8 md:flex" style={gridPatternStyle}>
              <div className="relative w-[50%] h-[80vh] rounded-2xl overflow-hidden shadow-2xl border-4 border-black/5">
                <div 
                  className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                >
                  {slidesData.map((slide, index) => (
                    <div key={index} className="w-full h-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="object-cover w-full h-full"
                        onError={(e) => { 
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; 
                          target.src = `https://placehold.co/800x1200/e2e8f0/4a5568?text=Image+Not+Found`; 
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
