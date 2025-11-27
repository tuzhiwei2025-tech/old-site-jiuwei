"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  color?: string;
  delay?: number;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  features,
    color = "from-[#7C86FF] to-[#A3B3FF]",
  delay = 0,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay,
        mass: 0.8,
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={cn("group", className)}
    >
      <Card className="h-full border-2 border-[#E0E7FF] hover:border-[#7C86FF] transition-all duration-300 hover:shadow-xl hover:shadow-[#7C86FF]/10 bg-white">
        <div className={cn("absolute top-0 right-0 w-32 h-32 bg-gradient-to-br", color, "opacity-10 blur-3xl")} />
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className={cn("p-3 rounded-xl bg-gradient-to-br", color, "shadow-lg group-hover:scale-110 transition-transform")}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{title}</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        {features && features.length > 0 && (
          <CardContent>
            <div className="space-y-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className={cn("w-1.5 h-1.5 rounded-full bg-gradient-to-br", color)} />
                  {feature}
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}

