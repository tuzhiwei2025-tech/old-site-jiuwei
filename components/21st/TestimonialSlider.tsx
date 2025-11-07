"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the type for a single review
type Review = {
  id: string | number;
  name: string;
  affiliation: string;
  quote: string;
  imageSrc: string;
  thumbnailSrc: string;
};

// Define the props for the slider component
interface TestimonialSliderProps {
  reviews: Review[];
  /** Optional class name for the container */
  className?: string;
}

/**
 * A reusable, animated testimonial slider component.
 * It uses framer-motion for animations and is styled with
 * shadcn/ui theme variables.
 */
export const TestimonialSlider = ({
  reviews,
  className,
}: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // 'direction' helps framer-motion understand slide direction (next vs. prev)
  const [direction, setDirection] = useState<"left" | "right">("right");

  const activeReview = reviews[currentIndex];

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleThumbnailClick = (index: number) => {
    // Determine direction for animation
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Get the next 3 reviews for the thumbnails, excluding the current one
  const thumbnailReviews = reviews
    .filter((_, i) => i !== currentIndex)
    .slice(0, 3);

  // Animation variants for the main image
  const imageVariants = {
    enter: (direction: "left" | "right") => ({
      y: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      y: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  // Animation variants for the text content
  const textVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div
      className={cn(
        "overflow-hidden relative p-8 w-full min-h-[650px] md:min-h-[600px] bg-background text-foreground md:p-12",
        className
      )}
    >
      <div className="grid grid-cols-1 gap-8 h-full md:grid-cols-12">
        {/* === Left Column: Meta and Thumbnails === */}
        <div className="flex flex-col order-2 justify-between md:col-span-3 md:order-1">
          <div className="flex flex-row justify-between space-x-4 md:flex-col md:justify-start md:space-x-0 md:space-y-4">
            {/* Pagination */}
            <span className="font-mono text-sm text-muted-foreground">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(reviews.length).padStart(2, "0")}
            </span>
            {/* Vertical "Reviews" Text */}
            <h2 className="text-sm font-medium tracking-widest uppercase [writing-mode:vertical-rl] md:rotate-180 hidden md:block">
              数字员工
            </h2>
          </div>
          {/* Thumbnail Navigation */}
          <div className="flex mt-8 space-x-2 md:mt-0">
            {thumbnailReviews.map((review) => {
              // Find the original index to navigate to
              const originalIndex = reviews.findIndex(
                (r) => r.id === review.id
              );
              return (
                <button
                  key={review.id}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="overflow-hidden w-16 h-20 rounded-md opacity-70 transition-opacity duration-300 md:w-20 md:h-24 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  aria-label={`View review from ${review.name}`}
                >
                  <img
                    src={review.thumbnailSrc}
                    alt={review.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* === Center Column: Main Image === */}
        <div className="md:col-span-4 relative h-80 min-h-[400px] md:min-h-[500px] order-1 md:order-2">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={activeReview.imageSrc}
              alt={activeReview.name}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="object-cover absolute inset-0 w-full h-full rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </AnimatePresence>
        </div>

        {/* === Right Column: Text and Navigation === */}
        <div className="flex flex-col order-3 justify-between md:col-span-5 md:pl-8 md:order-3">
          {/* Text Content */}
          <div className="relative overflow-hidden pt-4 md:pt-24 min-h-[200px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="text-sm font-medium text-muted-foreground">
                  {activeReview.affiliation}
                </p>
                <h3 className="mt-1 text-xl font-semibold">
                  {activeReview.name}
                </h3>
                <blockquote className="mt-6 text-2xl font-medium leading-snug md:text-3xl">
                  &ldquo;{activeReview.quote}&rdquo;
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Navigation Buttons */}
          <div className="flex items-center mt-8 space-x-2 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-muted-foreground/50"
              onClick={handlePrev}
              aria-label="Previous review"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleNext}
              aria-label="Next review"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
