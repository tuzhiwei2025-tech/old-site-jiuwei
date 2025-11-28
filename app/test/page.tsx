'use client';

import { ReactLenis } from 'lenis/react';
import StackingCard from '@/components/ui/stacking-card';

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
}

export default function TestPage() {
  const projects: ProjectData[] = [
    {
      title: "Project One",
      description: "This is a description of the first project. It showcases amazing features and capabilities.",
      link: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
      color: "#6366f1",
    },
    {
      title: "Project Two",
      description: "Another fantastic project with innovative solutions and cutting-edge technology.",
      link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      color: "#8b5cf6",
    },
    {
      title: "Project Three",
      description: "A third project that demonstrates excellence in design and functionality.",
      link: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
      color: "#ec4899",
    },
    {
      title: "Project Four",
      description: "The fourth project in our showcase, featuring unique approaches and solutions.",
      link: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
      color: "#f59e0b",
    },
  ];

  return (
    <ReactLenis root>
      <StackingCard projects={projects} />
    </ReactLenis>
  );
}

