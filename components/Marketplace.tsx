"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTeams } from "@/lib/agentData";
import { Team } from "@/types/agent";
import ImgSphere from "@/components/21st/ImgSphere";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Marketplace() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRevealRef = useRef<VerticalCutRevealRef>(null);
  const subtitleRevealRef = useRef<VerticalCutRevealRef>(null);
  const descRevealRef = useRef<VerticalCutRevealRef>(null);
  const teamsRef = useRef<HTMLDivElement>(null);
  const teams = getAllTeams();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 触发标题动画
      if (titleRevealRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => {
            titleRevealRef.current?.startAnimation();
            setTimeout(() => subtitleRevealRef.current?.startAnimation(), 300);
            setTimeout(() => descRevealRef.current?.startAnimation(), 600);
          },
        });
      }

      // 团队卡片动画
      const teamCards = teamsRef.current?.children;
      if (teamCards) {
        Array.from(teamCards).forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: index % 2 === 0 ? -80 : 80,
              scale: 0.95,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );

          // 卡片滚动视差
          gsap.to(card, {
            x: index % 2 === 0 ? -20 : 20,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="marketplace"
      ref={sectionRef}
      className="overflow-hidden relative px-4 py-24 bg-gradient-to-b from-white to-gray-50 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
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
              专业数字团队
            </VerticalCutReveal>
            <br />
            <span className="bg-gradient-to-r from-[#4932cc] via-[#6b4ce6] to-[#4932cc] bg-clip-text text-transparent">
              <VerticalCutReveal
                ref={subtitleRevealRef}
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
                协同作战，效率倍增
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
              由多个专业数字员工组成的团队，各司其职，协同工作，为您提供全方位的解决方案
            </VerticalCutReveal>
          </div>
        </div>

        <div ref={teamsRef} className="space-y-12">
          {teams.map((team: Team) => (
            <Card
              key={team.code}
              className="border-2 hover:border-[#4932cc] transition-all duration-300 hover:shadow-xl hover:shadow-[#4932cc]/10 bg-white"
            >
              <CardHeader>
                <div className="flex flex-col gap-4 justify-between items-start md:flex-row md:items-center">
                  <div>
                    <CardTitle className="mb-2 text-3xl">{team.team_name}</CardTitle>
                    <p className="text-lg text-gray-600">{team.team_description}</p>
                    <div className="flex gap-3 items-center mt-4">
                      <span className="px-3 py-1 bg-[#4932cc]/10 text-[#4932cc] rounded-full text-sm font-medium">
                        {team.team_level}
                      </span>
                      <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
                        {team.team_category}
                      </span>
                      {team.popularity && (
                        <span className="text-sm text-gray-500">
                          ⭐ {team.popularity} 使用量
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Team Members */}
                <div className="grid grid-cols-2 gap-6 mt-8 md:grid-cols-4">
                  {team.team_members.map((member) => (
                    <div
                      key={member.code}
                      className="flex flex-col items-center text-center group"
                    >
                      {/* 3D Avatar Sphere */}
                      <div className="relative mb-3 w-20 h-20 transition-transform group-hover:scale-110">
                        <ImgSphere
                          imageUrl={member.avatar}
                          radius={0.6}
                          speed={0.4}
                          className="w-full h-full"
                        />
                      </div>
                      <h4 className="mb-1 text-sm font-bold text-gray-900">
                        {member.name}
                      </h4>
                      <p className="text-xs text-[#4932cc] mb-2">
                        {member.title}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {member.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

