"use client";

import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";

type ShowcaseItem = {
  eyebrow: string;
  title: string;
  description: string;
  details: string[];
};

type TextParallaxContentScrollProps = {
  kicker: string;
  title: string;
  intro: string;
  items: ShowcaseItem[];
};

const imagePool = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
];

export function TextParallaxContentScroll({
  kicker,
  title,
  intro,
  items,
}: TextParallaxContentScrollProps) {
  const [activeTab, setActiveTab] = useState("全部");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const tabs = ["全部", ...items.map((item) => item.eyebrow)];
  const filteredItems = activeTab === "全部" ? items : items.filter((item) => item.eyebrow === activeTab);
  const totalDots = filteredItems.length;

  const handleNext = () => {
    setCurrentIdx((prev) => (prev < totalDots - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : totalDots - 1));
  };

  useEffect(() => {
    const card = sliderRef.current?.children[0] as HTMLElement | undefined;
    if (!card || !sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: currentIdx * (card.clientWidth + 24),
      behavior: "smooth",
    });
  }, [currentIdx, filteredItems.length]);

  useEffect(() => {
    setCurrentIdx(0);
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <nav className="fixed left-0 right-0 top-0 z-50">
        <SiteHeader
          onLogoClick={(event) => {
            event.preventDefault();
            window.location.href = "/home";
          }}
          onNavigate={(event, target) => {
            event.preventDefault();
            window.location.href = target;
          }}
        />
      </nav>

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-16 pt-28 md:px-10">
        <div className="mb-9 max-w-4xl text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400">{kicker}</p>
          <h1 className="mt-4 text-[clamp(2.3rem,5vw,5.4rem)] font-black leading-[1.02] tracking-normal text-neutral-950">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-600 md:text-lg">{intro}</p>
        </div>

        <div className="w-full select-none overflow-hidden rounded-2xl border border-neutral-200 bg-[#f7f7f8] p-5 shadow-2xl shadow-neutral-200/70 md:p-8">
          <div className="mb-8 flex flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 md:text-sm ${
                    activeTab === tab
                      ? "border border-neutral-200 bg-white text-neutral-950 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="hidden text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-950 md:block">
              查看全部 &gt;
            </button>
          </div>

          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredItems.map((item, idx) => (
              <div
                key={item.title}
                onClick={() => setSelectedImageIndex(idx)}
                className="group relative aspect-[1.5/1] min-w-[100%] cursor-pointer snap-start overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-500 hover:border-neutral-300 sm:min-w-[48%] lg:min-w-[31.8%]"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={imagePool[idx % imagePool.length]}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] font-bold text-zinc-200 backdrop-blur-md">
                  <span className="text-purple-300">*</span>
                  {item.eyebrow}
                </div>

                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                  <h3 className="mb-3 max-w-[95%] text-base font-bold leading-tight tracking-normal text-white md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-xs leading-5 text-white/68">{item.description}</p>
                  <button className="w-fit rounded-[5px] bg-white px-3.5 py-1.5 text-[10px] font-bold tracking-tight text-black shadow-md shadow-black/20 transition-all duration-300 hover:bg-zinc-200 active:scale-95">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalDots }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIdx === idx ? "w-8 bg-neutral-950" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-md transition-all duration-200 hover:bg-neutral-50 hover:text-neutral-950 active:scale-95"
                aria-label="Previous slide"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-md transition-all duration-200 hover:bg-neutral-50 hover:text-neutral-950 active:scale-95"
                aria-label="Next slide"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm md:p-8"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/70 text-white shadow-lg transition-all duration-200 hover:bg-zinc-800"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedImageIndex(null);
            }}
          >
            x
          </button>
          <div
            className="flex max-w-3xl flex-col items-start rounded-2xl border border-white/10 bg-zinc-950 p-6 text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/42">
              {filteredItems[selectedImageIndex].eyebrow}
            </p>
            <h3 className="mt-4 text-3xl font-black leading-tight">{filteredItems[selectedImageIndex].title}</h3>
            <p className="mt-5 text-base leading-8 text-white/66">{filteredItems[selectedImageIndex].description}</p>
            <div className="mt-6 grid w-full gap-3 md:grid-cols-2">
              {filteredItems[selectedImageIndex].details.map((detail) => (
                <div key={detail} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70">
                  {detail}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
