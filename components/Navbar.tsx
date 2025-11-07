"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, Globe } from "lucide-react";
import { gsap } from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hasTopBanner, setHasTopBanner] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 检查顶部横幅是否可见
    const checkBanner = () => {
      const banner = document.querySelector('[data-top-banner]');
      setHasTopBanner(banner !== null && banner.getBoundingClientRect().height > 0);
    };
    checkBanner();
    const interval = setInterval(checkBanner, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        hasTopBanner ? "top-10" : "top-0"
      } ${
        scrolled
          ? "shadow-lg backdrop-blur-xl bg-white/90"
          : "bg-transparent"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4932cc] via-[#6b4ce6] to-[#4932cc] bg-[length:200%_auto] animate-gradient group-hover:scale-105 transition-transform">
              GoAgent
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="#marketplace"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-[#4932cc] relative group"
            >
              市场
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4932cc] transition-all group-hover:w-full" />
            </Link>
            <Link
              href="#solutions"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-[#4932cc] relative group"
            >
              解决方案
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4932cc] transition-all group-hover:w-full" />
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-[#4932cc] relative group"
            >
              价格
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4932cc] transition-all group-hover:w-full" />
            </Link>
            <Link
              href="#docs"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-[#4932cc] relative group"
            >
              文档
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4932cc] transition-all group-hover:w-full" />
            </Link>
            <Link
              href="#blog"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-[#4932cc] relative group"
            >
              博客
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4932cc] transition-all group-hover:w-full" />
            </Link>
            <Link
              href="#forum"
              className="flex gap-1 items-center text-sm font-medium text-gray-700 transition-colors hover:text-[#4932cc] relative group"
            >
              论坛
              <span className="px-1.5 py-0.5 text-xs font-medium bg-[#4932cc]/10 text-[#4932cc] rounded">
                新上线
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4932cc] transition-all group-hover:w-full" />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-[#4932cc] flex items-center gap-1.5"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              118.2k
            </Link>
          </div>

          {/* CTA Button & Language Selector */}
          <div className="flex items-center space-x-4">
            <Button className="flex gap-1 items-center text-white bg-[#4932cc] hover:bg-[#3d28a8] transition-all hover:scale-105 shadow-lg shadow-[#4932cc]/30">
              立即开始
              <ChevronRight className="w-4 h-4" />
            </Button>
            <button className="flex items-center gap-1.5 text-gray-700 hover:text-[#4932cc] transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">ZH</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
