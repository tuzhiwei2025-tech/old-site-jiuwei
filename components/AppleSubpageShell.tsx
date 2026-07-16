"use client";

import type * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

type AppleSubpageShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
};

export function siteNavigate(event: React.MouseEvent<HTMLAnchorElement>, target: string) {
  if (target.startsWith("mailto:") || target.startsWith("tel:")) {
    return;
  }

  if (target.startsWith("/home#")) {
    event.preventDefault();
    window.location.href = target;
    return;
  }

  if (target.startsWith("#")) {
    event.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function AppleSubpageShell({
  eyebrow,
  title,
  intro,
  children,
  ctaLabel = "预约演示",
  ctaHref = "/home#contact",
}: AppleSubpageShellProps) {
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] selection:bg-black selection:text-white">
      <nav className="fixed inset-x-0 top-0 z-50">
        <SiteHeader
          onLogoClick={(event) => {
            event.preventDefault();
            window.location.href = "/home";
          }}
          onNavigate={siteNavigate}
        />
      </nav>

      <section className="bg-white px-6 pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="mx-auto w-full max-w-[112rem]">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#86868b]">{eyebrow}</p>
            <h1 className="mt-5 whitespace-normal text-[clamp(2rem,4.2vw,5.4rem)] font-semibold leading-[0.98] tracking-normal md:whitespace-nowrap">
              {title}
            </h1>
            <p className="mt-8 max-w-4xl whitespace-normal text-[clamp(0.95rem,1.3vw,1.5rem)] font-medium leading-8 text-[#6e6e73] md:max-w-none md:whitespace-nowrap md:leading-10">
              {intro}
            </p>
            <a
              href={ctaHref}
              onClick={(event) => siteNavigate(event, ctaHref)}
              className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-[#0071e3] px-6 text-sm font-bold text-white transition hover:bg-[#0077ed]"
            >
              {ctaLabel}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {children}

      <SiteFooter />
    </main>
  );
}
