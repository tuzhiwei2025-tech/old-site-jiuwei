"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/ui/animated-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Story {
  id: string;
  title: string;
  title_zh: string;
  description: string | null;
  display_url: string | null;
  creator_name: string | null;
  created_at: string;
  agent_type: string;
  access_token?: string;
}

interface StoryCardProps {
  story: Story;
  index: number;
}

const StoryCard = ({ story, index }: StoryCardProps) => {
  const shareUrl = `https://goagent.store/share/${story.id}`;
  const chatUrl = story.access_token 
    ? `https://goagent.store/open/chat?token=${story.access_token}&from=story_space`
    : shareUrl;
  
  return (
    <AnimatedCard delay={index * 0.1}>
      <div
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#E0E7FF] bg-white text-gray-900 shadow-sm transition-all duration-500 ease-in-out hover:border-[#7C86FF] hover:shadow-xl hover:-translate-y-1"
        onClick={() => window.open(chatUrl, "_blank")}
      >
        {/* Card Image Section */}
        <div className="overflow-hidden relative h-64 bg-white">
          {story.display_url ? (
            <>
              <img
                src={story.display_url}
                alt={story.title_zh || story.title}
                className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  // 如果图片加载失败，显示占位符
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (placeholder) {
                    placeholder.style.display = "flex";
                  }
                }}
              />
              {/* 图片加载失败时的占位符 */}
              <div className="image-placeholder hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF]">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#7C86FF] to-[#A3B3FF] flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">
                      {(story.title_zh || story.title).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-500">图片加载失败</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF]">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#7C86FF] to-[#A3B3FF] flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {(story.title_zh || story.title).charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-500">暂无预览图</p>
              </div>
            </div>
          )}
        </div>

        {/* Card Content Section */}
        <div className="flex flex-col flex-1 p-6">
          {story.agent_type && (
            <span className="mb-2 text-xs tracking-wide text-gray-500 uppercase">
              {story.agent_type.replace(/_/g, " ")}
            </span>
          )}
          <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-[#7C86FF] mb-2">
            {story.title_zh || story.title}
          </h3>
          {story.description && (
            <p className="flex-1 mt-3 text-sm text-gray-600 line-clamp-3">
              {story.description}
            </p>
          )}

          {/* Card Footer */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center text-xs text-gray-500">
              {story.creator_name && (
                <span>by {story.creator_name}</span>
              )}
            </div>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/button inline-flex items-center gap-2 text-sm font-medium text-[#7C86FF] transition-all duration-300 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              查看详情
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default function UserStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRevealRef = useRef<VerticalCutRevealRef>(null);
  const descRevealRef = useRef<VerticalCutRevealRef>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          "https://goagent.store/api/v1/share/story-space?skip=0&limit=100",
          {
            headers: {
              Accept: "*/*",
              "Accept-Language": "zh-CN",
              "Content-Type": "application/json",
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("API Response:", result);
        
        // 根据实际API响应结构提取数据
        if (result.data && result.data.stories && Array.isArray(result.data.stories)) {
          setStories(result.data.stories.slice(0, 12));
        } else if (Array.isArray(result.stories)) {
          setStories(result.stories.slice(0, 12));
        } else if (Array.isArray(result)) {
          setStories(result.slice(0, 12));
        } else {
          console.warn("Unexpected API response structure:", result);
          setStories([]);
        }
      } catch (err) {
        console.error("Failed to fetch stories:", err);
        setError(err instanceof Error ? err.message : "Failed to load stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          titleRevealRef.current?.startAnimation();
          setTimeout(() => descRevealRef.current?.startAnimation(), 300);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white via-[#EEF2FF] to-white overflow-hidden"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            <VerticalCutReveal
              ref={titleRevealRef}
              splitBy="words"
              staggerDuration={0.12}
              staggerFrom="first"
              autoStart={false}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 22,
              }}
              containerClassName="block"
              wordLevelClassName="inline-block"
            >
              用户故事案例
            </VerticalCutReveal>
            <br />
            <span className="bg-gradient-to-r from-[#7C86FF] via-[#A3B3FF] to-[#7C86FF] bg-clip-text text-transparent">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.12}
                staggerFrom="first"
                autoStart={false}
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 22,
                }}
                containerClassName="inline-block"
                wordLevelClassName="inline-block"
              >
                真实用户的成功实践
              </VerticalCutReveal>
            </span>
          </h2>
          <div className="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
            <VerticalCutReveal
              ref={descRevealRef}
              splitBy="words"
              staggerDuration={0.08}
              staggerFrom="first"
              autoStart={false}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 22,
              }}
              containerClassName="block"
              wordLevelClassName="inline-block"
            >
              探索来自真实用户的成功案例，了解他们如何使用数字员工提升工作效率，实现业务目标
            </VerticalCutReveal>
          </div>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col gap-4 items-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#7C86FF]" />
              <p className="text-gray-500">加载用户故事中...</p>
            </div>
          </div>
        )}

        {/* 错误状态 */}
        {error && !loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="mb-4 text-red-500">加载失败: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-[#7C86FF] hover:underline"
              >
                重试
              </button>
            </div>
          </div>
        )}

        {/* 故事卡片网格 */}
        {!loading && !error && (
          <>
            {stories.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-gray-500">暂无用户故事案例</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {stories.map((story, index) => (
                  <StoryCard key={story.id} story={story} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
