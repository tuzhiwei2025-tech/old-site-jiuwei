"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>, 
  | 'onAnimationStart' 
  | 'onAnimationEnd' 
  | 'onAnimationIteration'
  | 'onDragStart'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragExit'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDrop'
> {
  delay?: number;
  children: React.ReactNode;
}

export function AnimatedCard({ 
  className, 
  children, 
  delay = 0,
  ...props 
}: AnimatedCardProps) {
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
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

