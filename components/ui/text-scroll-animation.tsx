"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MotionValue } from "framer-motion";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
};


const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);

  if (isSpace) {
    return <span className="inline-block w-4" />;
  }

  return (
    <motion.div
      className="inline-block"
      style={{ x, rotateX }}
    >
      <Card className="inline-flex justify-center items-center px-2 mx-1 h-12 min-w-12">
        <CardContent className="p-0">
          <span className="text-lg font-bold text-orange-500">{char}</span>
        </CardContent>
      </Card>
    </motion.div>
  );
};


const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 50, 0]);

  return (
    <motion.div
      style={{ x, scale, y, transformOrigin: "center" }}
    >
      <Card className="flex justify-center items-center p-4 w-20 h-20">
        <CardContent className="p-0">
          <img
            src={char}
            alt=""
            className="object-contain w-full h-full shrink-0 will-change-transform"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};


const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distanceFromCenter) * 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.div
      style={{ x, rotate, y, scale, transformOrigin: "center" }}
    >
      <Card className="flex justify-center items-center p-4 w-20 h-20">
        <CardContent className="p-0">
          <img
            src={char}
            alt=""
            className="object-contain w-full h-full shrink-0 will-change-transform"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Skiper31 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const { scrollYProgress: scrollYProgress2 } = useScroll({ target: targetRef2 });
  const { scrollYProgress: scrollYProgress3 } = useScroll({ target: targetRef3 });

  
  const text = "see more from ";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  
  const macIcon = [
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/discord.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/figma.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/framer.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mongodb.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/notion.svg",
    
  ];
  const iconCenterIndex = Math.floor(macIcon.length / 2);

  return (
    <ReactLenis root>
      <main className="w-full bg-white">
        {/* Шапка-подсказка */}
        <div className="grid absolute left-1/2 z-10 gap-6 justify-items-center content-start text-center text-black -translate-x-1/2 top-22">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-[#f5f4f3] after:to-black after:content-['']">
            Scroll to see more
          </span>
        </div>

        {/* Блок 1 — текст */}
        <div
          ref={targetRef}
          className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          <Card className="p-8 w-full max-w-4xl">
            <CardContent className="p-0">
              <div
                className="flex flex-wrap gap-2 justify-center items-center w-full text-center font-geist"
                style={{ perspective: "500px" }}
              >
                {characters.map((char, index) => (
                  <CharacterV1
                    key={index}
                    char={char}
                    index={index}
                    centerIndex={centerIndex}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        
        <div
          ref={targetRef2}
          className="relative -mt-[100vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          <Card className="p-8 w-full max-w-5xl">
            <CardHeader>
              <CardTitle className="flex gap-3 justify-center items-center text-2xl font-medium tracking-tight text-black font-geist">
                <Bracket className="h-12 text-black" />
                <span className="font-medium font-geist">integrate with your fav tech stack</span>
                <Bracket className="h-12 scale-x-[-1] text-black" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-8 justify-center items-center">
                {macIcon.map((char, index) => (
                  <CharacterV2
                    key={index}
                    char={char}
                    index={index}
                    centerIndex={iconCenterIndex}
                    scrollYProgress={scrollYProgress2}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Блок 3 — иконки (вариант с поворотом) */}
        <div
          ref={targetRef3}
          className="relative -mt-[95vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          <Card className="p-8 w-full max-w-5xl">
            <CardHeader>
              <CardTitle className="flex gap-3 justify-center items-center text-2xl font-medium tracking-tight text-black font-geist">
                <Bracket className="h-12 text-black" />
                <span className="font-medium font-geist">integrate with your fav tech stack</span>
                <Bracket className="h-12 scale-x-[-1] text-black" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6" style={{ perspective: "500px" }}>
              <div className="flex flex-wrap gap-8 justify-center items-center">
                {macIcon.map((char, index) => (
                  <CharacterV3
                    key={index}
                    char={char}
                    index={index}
                    centerIndex={iconCenterIndex}
                    scrollYProgress={scrollYProgress3}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </ReactLenis>
  );
};

export { CharacterV1, CharacterV2, CharacterV3, Skiper31 };

const Bracket = ({ className }: { className: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
      <path
        fill="#000"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};
