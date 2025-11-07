"use client";

import { cn } from "@/lib/utils";
import { GradFlow } from 'gradflow';

interface StripeLikeGradientShaderProps {
  className?: string;
  color1?: { r: number; g: number; b: number };
  color2?: { r: number; g: number; b: number };
  color3?: { r: number; g: number; b: number };
  speed?: number;
  scale?: number;
  noise?: number;
}

export const StripeLikeGradientShader = ({
  className,
  color1 = { r: 73, g: 50, b: 204 }, // #4932cc
  color2 = { r: 107, g: 76, b: 230 }, // #6b4ce6
  color3 = { r: 139, g: 92, b: 246 }, // #8b5cf6
  speed = 0.4,
  scale = 1,
  noise = 0.08,
}: StripeLikeGradientShaderProps) => {
  return (
    <div className={cn("absolute inset-0 -z-10", className)}>
      <GradFlow
        config={{
          color1,
          color2,
          color3,
          speed,
          scale,
          type: 'stripe',
          noise,
        }}
      />
    </div>
  );
};
