"use client";

import type * as React from "react";
import { SiteHeader } from "@/components/SiteHeader";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export function LegalPage({ eyebrow, title, intro, sections }: LegalPageProps) {
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    window.location.href = target;
  };

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <nav className="fixed left-0 right-0 top-0 z-50">
        <SiteHeader
          onLogoClick={(event) => {
            event.preventDefault();
            window.location.href = "/home";
          }}
          onNavigate={handleNavigate}
        />
      </nav>

      <section className="px-6 pb-24 pt-40 md:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-400">{eyebrow}</p>
          <h1 className="mt-5 text-left text-4xl font-black leading-tight text-neutral-950 md:text-6xl">{title}</h1>
          <p className="mt-7 max-w-3xl text-left text-base leading-8 text-neutral-600 md:text-lg">{intro}</p>

          <div className="mt-12 space-y-4">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-[22px] border border-neutral-200 bg-neutral-50 p-6 md:p-8"
              >
                <h2 className="text-left text-xl font-bold text-neutral-950 md:text-2xl">{section.title}</h2>
                <p className="mt-4 text-left text-sm leading-7 text-neutral-600 md:text-base">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
