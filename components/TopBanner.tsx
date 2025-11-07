"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div data-top-banner className="fixed top-0 left-0 right-0 z-[60] bg-black text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        <p className="text-sm text-center">
          GoAgent 论坛上线啦! 加入社区,与开发者一起讨论、交流经验,分享你在GoAgent上的构建与探索。
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-0 p-1 hover:bg-gray-800 rounded transition-colors"
          aria-label="关闭横幅"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

