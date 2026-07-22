"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import type * as React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteNavigate } from "@/components/AppleSubpageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { ProductMedia, ProductStory } from "@/lib/productStories";

const ProductModelViewer = dynamic(
  () => import("@/components/ProductModelViewer").then((module) => module.ProductModelViewer),
  {
    ssr: false,
    loading: () => <div className="product-model-viewer product-model-viewer--loading" aria-hidden="true" />,
  },
);

type ProductStoryPageProps = {
  product: ProductStory;
};

function ProductMediaElement({ media, className }: { media: ProductMedia; className?: string }) {
  if (media.kind === "video") {
    return <video className={className} src={media.src} autoPlay loop muted playsInline preload="metadata" aria-hidden="true" />;
  }

  return <img src={media.src} alt="" className={className} />;
}

function scrollToId(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ProductStoryPage({ product }: ProductStoryPageProps) {
  const rootRef = useRef<HTMLElement>(null);
  const filmSectionRef = useRef<HTMLElement>(null);
  const highlightsStageRef = useRef<HTMLElement>(null);
  const highlightsTrackRef = useRef<HTMLDivElement>(null);
  const performanceSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const filmSection = filmSectionRef.current;
    const highlightsStage = highlightsStageRef.current;
    const highlightsTrack = highlightsTrackRef.current;
    const performanceSection = performanceSectionRef.current;

    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 768px)",
        mobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const desktop = Boolean(context.conditions?.desktop);
        const reduceMotion = Boolean(context.conditions?.reduceMotion);
        const heroItems = gsap.utils.toArray<HTMLElement>(".product-hero-reveal", root);
        const filmFrames = gsap.utils.toArray<HTMLElement>(".product-film-frame", root);
        const performanceFrames = gsap.utils.toArray<HTMLElement>(".product-performance-frame", root);
        const storyMedia = root.querySelector<HTMLElement>(".product-story-media");
        const performanceMedia = root.querySelector<HTMLElement>(".product-performance-media");

        if (!reduceMotion) {
          gsap.from(heroItems, {
            autoAlpha: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.09,
            y: 26,
          });
        }

        if (filmSection && filmFrames.length > 0) {
          gsap.set(filmFrames, { autoAlpha: 0, y: 30 });
          if (reduceMotion) {
            gsap.set(filmFrames[0], { autoAlpha: 1, y: 0 });
          }

          const filmTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: filmSection,
              start: "top top",
              end: "bottom bottom",
              invalidateOnRefresh: true,
              scrub: reduceMotion ? false : 0.65,
            },
          });

          if (!reduceMotion) {
            if (storyMedia) {
              filmTimeline.to(storyMedia, { duration: 1, ease: "none", scale: 1.04 }, 0);
            }
          }

          if (!reduceMotion) {
            filmFrames.forEach((frame, index) => {
              const start = index * 0.29 + 0.05;
              filmTimeline.to(frame, { autoAlpha: 1, duration: 0.14, ease: "none", y: 0 }, start);
              if (index < filmFrames.length - 1) {
                filmTimeline.to(frame, { autoAlpha: 0, duration: 0.14, ease: "none", y: -28 }, start + 0.19);
              }
            });
          }
        }

        if (desktop && !reduceMotion && highlightsStage && highlightsTrack) {
          const horizontalTween = gsap.to(highlightsTrack, {
            ease: "none",
            x: () => -Math.max(0, highlightsTrack.scrollWidth - window.innerWidth),
            scrollTrigger: {
              anticipatePin: 1,
              end: () => `+=${window.innerWidth * product.highlights.length}`,
              invalidateOnRefresh: true,
              pin: true,
              scrub: 0.7,
              start: "top top",
              trigger: highlightsStage,
            },
          });

          gsap.utils.toArray<HTMLElement>(".product-highlight-panel", root).forEach((panel) => {
            const mediaElement = panel.querySelector<HTMLElement>(".product-highlight-media");
            if (!mediaElement) return;

            gsap.fromTo(
              mediaElement,
              { scale: 1.1 },
              {
                ease: "none",
                scale: 1,
                scrollTrigger: {
                  containerAnimation: horizontalTween,
                  end: "right 18%",
                  scrub: true,
                  start: "left 90%",
                  trigger: panel,
                },
              },
            );
          });
        }

        if (performanceSection && performanceFrames.length > 0) {
          gsap.set(performanceFrames, { autoAlpha: 0, y: 36 });
          if (reduceMotion) {
            gsap.set(performanceFrames[0], { autoAlpha: 1, y: 0 });
          }

          const performanceTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: performanceSection,
              start: "top top",
              end: "bottom bottom",
              scrub: reduceMotion ? false : 0.7,
            },
          });

          if (!reduceMotion) {
            performanceTimeline.to(performanceMedia, { duration: 1, ease: "none", scale: 1.08 }, 0);
          }

          if (!reduceMotion) {
            performanceFrames.forEach((frame, index) => {
              const start = index * 0.29 + 0.05;
              performanceTimeline.to(frame, { autoAlpha: 1, duration: 0.14, ease: "none", y: 0 }, start);
              if (index < performanceFrames.length - 1) {
                performanceTimeline.to(frame, { autoAlpha: 0, duration: 0.14, ease: "none", y: -34 }, start + 0.19);
              }
            });
          }
        }

        return () => undefined;
      },
    );

    return () => {
      media.revert();
    };
  }, [product]);

  const primarySectionId = product.slug === "enterprise" ? "performance" : "story";
  const performanceModule = (
    <section id="performance" ref={performanceSectionRef} className="product-performance-section">
      <div className="product-performance-sticky">
        {product.performanceMedia ? (
          <ProductMediaElement
            media={product.performanceMedia}
            className={`product-performance-media ${product.performanceMedia.fit === "contain" ? "product-performance-media--contain" : ""}`}
          />
        ) : (
          <div className="product-performance-placeholder" aria-hidden="true">
            <span>GOAGENT</span>
            <b>ENTERPRISE AIOS</b>
          </div>
        )}
        <div className="product-performance-shade" />

        <div className="product-performance-heading">
          <p>AIOS inside</p>
          <h2>{product.featureTitle}</h2>
        </div>

        <div className="product-performance-frames">
          {product.scenes.map((scene, index) => (
            <article key={scene.title} className="product-performance-frame">
              <span>0{index + 1}</span>
              <h3>{scene.title}</h3>
              <p>{scene.desc}</p>
            </article>
          ))}
        </div>

        <div className="product-performance-stats">
          {product.quickStats.slice(0, 3).map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <main ref={rootRef} className="min-h-screen overflow-x-clip bg-white text-[#1d1d1f] selection:bg-black selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50">
        <SiteHeader
          onLogoClick={(event) => {
            event.preventDefault();
            window.location.href = "/home";
          }}
          onNavigate={siteNavigate}
        />
      </header>

      <section id="overview" className={`product-hero-section ${product.variants ? "product-hero-section--variants" : ""} ${product.slug === "enterprise" ? "product-hero-section--enterprise" : ""}`}>
        <div className="product-hero-copy">
          <p className="product-hero-reveal product-eyebrow">{product.eyebrow}</p>
          <h1 className="product-hero-title product-hero-reveal">
            <span>{product.name}</span>
            <span>{product.heroLine}</span>
          </h1>
          <p className="product-hero-description product-hero-reveal">{product.subline}</p>
          <div className="product-hero-actions product-hero-reveal">
            <a href={`#${primarySectionId}`} onClick={(event) => scrollToId(event, primarySectionId)} className="product-primary-button">
              浏览产品方案
              <ArrowDown className="size-3.5" />
            </a>
            <a href="/contact" className="product-text-link">
              预约演示
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        {!product.variants && (
          <div
            className={`product-hero-visual product-hero-reveal ${product.interactiveModel ? "product-hero-visual--model" : product.heroMedia.length > 0 ? "product-hero-visual--cutout" : "product-hero-visual--placeholder"}`}
            aria-hidden={product.interactiveModel ? undefined : true}
          >
            {product.interactiveModel ? (
              <ProductModelViewer model={product.interactiveModel.src} productName={product.name} />
            ) : product.heroMedia.length > 0 ? (
              <div className={`product-hero-media-grid product-hero-media-grid--${product.heroMedia.length}`}>
                {product.heroMedia.map((media) => (
                  <ProductMediaElement key={media.src} media={media} className={media.fit === "contain" ? "product-hero-media--contain" : undefined} />
                ))}
              </div>
            ) : (
              <div className="product-hero-placeholder">
                <span>GOAGENT</span>
                <b>SPARK CLUSTER</b>
                <i>产品视觉素材待确认</i>
              </div>
            )}
          </div>
        )}

        <a href={`#${primarySectionId}`} onClick={(event) => scrollToId(event, primarySectionId)} className="product-scroll-cue">
          向下浏览
          <ArrowDown className="size-4" />
        </a>
      </section>

      {product.slug === "enterprise" ? performanceModule : (
        <section id="story" ref={filmSectionRef} className="product-film-section">
          <div className="product-film-sticky">
            <div className={`product-story-media product-story-media--${product.storyMedia.length || 0}`} aria-hidden="true">
              {product.storyMedia.length > 0 ? (
                product.storyMedia.map((media) => (
                  <ProductMediaElement key={media.src} media={media} className={media.fit === "contain" ? "product-story-media--contain" : undefined} />
                ))
              ) : (
                <div className="product-story-placeholder">
                  <span>AIOS ENTERPRISE</span>
                  <b>GOAGENT SPARK CLUSTER</b>
                  <i>企业级产品视觉素材待确认</i>
                </div>
              )}
            </div>
            <div className="product-film-shade" />

            <div className="product-film-caption-wrap">
              {product.storyFrames.map((frame, index) => (
                <article key={frame.kicker} className="product-film-frame">
                  <p>{frame.kicker}</p>
                  <h2>{frame.title}</h2>
                  <span>{frame.desc}</span>
                  <b>0{index + 1}</b>
                </article>
              ))}
            </div>

            <div className="product-film-utility" aria-hidden="true">
              <span>SCROLL TO EXPLORE</span>
              <div><i /><i /><i /></div>
            </div>
          </div>
        </section>
      )}

      <section className="product-intro-band">
        <p>{product.priceNote}</p>
        <span>{product.subline}</span>
      </section>

      {product.variants && (
        <section className="product-variants-section" aria-label={`${product.name} 产品版本`}>
          <div className="product-variants-heading">
            <p>Two versions</p>
            <h2>按你的资料边界选择版本</h2>
          </div>
          <div className="product-variants-grid">
            {product.variants.map((variant) => (
              <article id={variant.id} key={variant.id} className="product-variant-card">
                <div className="product-variant-media">
                  <ProductMediaElement media={variant.media} className={variant.media.fit === "contain" ? "product-variant-media--contain" : undefined} />
                </div>
                <p>{variant.id}</p>
                <h3>{variant.name}</h3>
                <span>{variant.desc}</span>
              </article>
            ))}
          </div>
        </section>
      )}

      <section id="highlights" ref={highlightsStageRef} className="product-highlights-stage">
        <div ref={highlightsTrackRef} className="product-highlights-track">
          <article className="product-highlight-panel product-highlight-opening">
            <div>
              <p>Highlights</p>
              <h2>每一个重点<br />都值得展开</h2>
              <span>继续滚动，逐屏查看 {product.name} 的部署边界与能力重点。</span>
            </div>
            <div className="product-highlight-index">01 — 0{product.highlights.length}</div>
          </article>

          {product.highlights.map((highlight, index) => (
            <article key={highlight.title} className="product-highlight-panel product-highlight-feature">
              <div className={`product-highlight-image-wrap ${highlight.media?.fit === "contain" ? "product-highlight-image-wrap--cutout" : ""}`}>
                {highlight.media ? (
                  <ProductMediaElement
                    media={highlight.media}
                    className={`product-highlight-media ${highlight.media.fit === "contain" || highlight.media.kind === "video" ? "product-highlight-media--contain" : ""}`}
                  />
                ) : (
                  <div className="product-highlight-placeholder" aria-hidden="true">
                    <span>GOAGENT</span>
                    <b>ENTERPRISE AIOS</b>
                  </div>
                )}
              </div>
              <div className="product-highlight-copy">
                <p>0{index + 1}</p>
                <h2>{highlight.title}</h2>
                <span>{highlight.desc}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {product.slug !== "enterprise" && performanceModule}

      <section id="specs" className="product-specs-section">
        <div className="product-specs-intro">
          <p>Tech specs</p>
          <h2>技术规格</h2>
          <span>{product.featureDesc}</span>
        </div>

        <div className="product-specs-list">
          {product.specs.map(([label, value]) => (
            <div key={label}>
              <p>{label}</p>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
