"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#EEF2FF] via-[#C6D2FF] to-[#7C86FF]" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-20"
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 top-1">
                <motion.div
                  className={cn(
                    "relative w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center",
                    activeIndex === index
                      ? "bg-gradient-to-br from-[#7C86FF] to-[#A3B3FF] scale-110"
                      : "bg-gradient-to-br from-[#EEF2FF] to-[#C6D2FF]"
                  )}
                  animate={{
                    scale: activeIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon || (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                  {activeIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#7C86FF] opacity-20"
                      animate={{ scale: [1, 1.5, 1.5], opacity: [0.2, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                className={cn(
                  "bg-white rounded-xl p-6 shadow-md border border-[#E0E7FF] transition-all duration-300",
                  activeIndex === index && "shadow-xl border-[#7C86FF] scale-[1.02]"
                )}
              >
                <div className="text-sm font-semibold text-[#7C86FF] mb-2">
                  {item.year}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
