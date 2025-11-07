"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Plus, Sparkles, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllTeams } from "@/lib/agentData";
import { Team } from "@/types/agent";
import ImgSphere from "@/components/21st/ImgSphere";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DigitalTeamBuilder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const teamsRef = useRef<HTMLDivElement>(null);
  const teams = getAllTeams();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题动画
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );

        // 标题滚动视差
        gsap.to(titleRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
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
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
          >
            打造您的专属
            <br />
            <span className="bg-gradient-to-r from-[#4932cc] via-[#6b4ce6] to-[#4932cc] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              数字团队
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            自由组合数字员工，打造专属的数字团队。各司其职，协同工作，让AI为您工作，效率倍增
          </p>
        </div>

        {/* Teams Grid */}
        <div ref={teamsRef} className="space-y-12">
          {teams.map((team: Team) => (
            <Card
              key={team.code}
              className="border-2 hover:border-[#4932cc] transition-all duration-300 hover:shadow-xl hover:shadow-[#4932cc]/10 bg-white"
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-6 h-6 text-[#4932cc]" />
                      <CardTitle className="text-3xl">{team.team_name}</CardTitle>
                    </div>
                    <CardDescription className="text-lg text-gray-600">
                      {team.team_description}
                    </CardDescription>
                    <div className="flex items-center gap-3 mt-4">
                      <span className="px-3 py-1 bg-[#4932cc]/10 text-[#4932cc] rounded-full text-sm font-medium">
                        {team.team_level}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {team.team_category}
                      </span>
                      {team.popularity && (
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          {team.popularity} 使用量
                        </span>
                      )}
                    </div>
                  </div>
                  <Button className="bg-[#4932cc] hover:bg-[#3d28a8]">
                    <Plus className="w-4 h-4 mr-2" />
                    创建团队
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Team Members */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  {team.team_members.map((member) => (
                    <div
                      key={member.code}
                      className="flex flex-col items-center text-center group cursor-pointer"
                    >
                      {/* 3D Avatar Sphere */}
                      <div className="w-20 h-20 mb-3 relative group-hover:scale-110 transition-transform">
                        <ImgSphere
                          imageUrl={member.avatar}
                          radius={0.6}
                          speed={0.4}
                          className="w-full h-full"
                        />
                      </div>
                      <h4 className="text-sm font-bold mb-1 text-gray-900">
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

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="border-2 border-[#4932cc] bg-gradient-to-br from-[#4932cc]/5 to-[#6b4ce6]/5">
            <CardContent className="p-8">
              <Zap className="w-12 h-12 text-[#4932cc] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">开始打造您的数字团队</h3>
              <p className="text-gray-600 mb-6">
                选择您需要的数字员工，自由组合，打造专属的AI工作团队
              </p>
              <Button size="lg" className="bg-[#4932cc] hover:bg-[#3d28a8]">
                立即开始
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

