"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MagneticWrapper } from "@/components/animations/MagneticWrapper";
import { SplitTextReveal } from "@/components/animations/SplitTextReveal";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        timeline
          .fromTo(
            "[data-hero-meta]",
            {
              autoAlpha: 0,
              clipPath: "inset(0 0 100% 0)",
              filter: "blur(8px)",
              skewY: 4,
              y: 24,
            },
            {
              autoAlpha: 1,
              clipPath: "inset(0 0 0% 0)",
              filter: "blur(0px)",
              skewY: 0,
              y: 0,
              duration: 1,
              stagger: 0.1,
              force3D: true,
              clearProps:
                "transform,opacity,visibility,filter,clipPath",
            },
            0.15,
          )
          .fromTo(
            "[data-hero-footer]",
            {
              autoAlpha: 0,
              clipPath: "inset(0 0 100% 0)",
              filter: "blur(10px)",
              skewY: 3,
              y: 32,
            },
            {
              autoAlpha: 1,
              clipPath: "inset(0 0 0% 0)",
              filter: "blur(0px)",
              skewY: 0,
              y: 0,
              duration: 1.1,
              stagger: 0.12,
              force3D: true,
              clearProps:
                "transform,opacity,visibility,filter,clipPath",
            },
            0.78,
          )
          .fromTo(
            "[data-hero-rule]",
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.15,
              ease: "expo.out",
              clearProps: "transform",
            },
            0.45,
          );

        gsap.to("[data-hero-orbit]", {
          rotate: 360,
          duration: 34,
          repeat: -1,
          ease: "none",
          transformOrigin: "center",
          force3D: true,
        });

        gsap.to("[data-radial-glow]", {
          xPercent: -7,
          yPercent: 5,
          scale: 1.16,
          opacity: 0.62,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
        });

        if (sectionRef.current?.nextElementSibling) {
          const exitTimeline = gsap.timeline({
            defaults: {
              ease: "none",
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          });

          exitTimeline
            .to(
              "[data-hero-heading]",
              {
                yPercent: -16,
                scale: 0.965,
                autoAlpha: 0.12,
                filter: "blur(8px)",
                transformOrigin: "50% 30%",
                force3D: true,
              },
              0,
            )
            .to(
              "[data-hero-meta]",
              {
                y: -42,
                autoAlpha: 0,
                force3D: true,
              },
              0,
            )
            .to(
              "[data-hero-footer]",
              {
                y: -30,
                autoAlpha: 0,
                force3D: true,
              },
              0.08,
            )
            .to(
              "[data-hero-orbit]",
              {
                autoAlpha: 0,
                scale: 1.1,
                force3D: true,
              },
              0,
            )
            .to(
              sectionRef.current,
              {
                clipPath: "inset(0 0 12% 0)",
              },
              0.35,
            );
        }
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          "[data-hero-meta], [data-hero-footer], [data-hero-rule], [data-hero-heading]",
          {
            autoAlpha: 1,
            clearProps: "all",
          },
        );
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#080907] px-5 pb-7 pt-24 text-[#f5f5ef] sm:px-8 sm:pb-8 lg:px-12 lg:pb-10 lg:pt-28"
      aria-labelledby="hero-title"
    >
      <BackgroundGrid />

      <div
        className="absolute right-[-9rem] top-[16%] h-[30rem] w-[30rem] rounded-full border border-white/[0.06] sm:right-[-5rem] lg:right-[5%] lg:h-[38rem] lg:w-[38rem]"
        data-hero-orbit
        aria-hidden
      >
        <span className="absolute left-1/2 top-[-4px] h-2 w-2 rounded-full bg-[#c4ff49] shadow-[0_0_18px_4px_rgba(196,255,73,0.25)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-w-0 w-full max-w-[100rem] flex-col">
        <div className="flex items-center justify-between gap-6">
          <p
            className="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-xs"
            data-hero-meta
          >
            <span
              className="relative flex h-2.5 w-2.5 items-center justify-center"
              aria-hidden
            >
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#c4ff49]/50" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#c4ff49]" />
            </span>
            Available for select projects
          </p>

          <p
            className="hidden text-right font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.2em] text-white/45 sm:block"
            data-hero-meta
          >
            Creative developer
            <br />
            Design &times; Code &times; Motion
          </p>
        </div>

        <div
          className="mt-5 h-px w-full origin-left bg-white/15 sm:mt-7"
          data-hero-rule
          aria-hidden
        />

        <div className="flex min-w-0 flex-1 items-center py-9 sm:py-12 lg:py-8">
          <h1
            id="hero-title"
            className="min-w-0 max-w-full w-full text-[clamp(2.35rem,11.3vw,11.25rem)] font-semibold uppercase leading-[0.79] tracking-[-0.072em] [text-wrap:balance] min-[390px]:text-[clamp(2.8rem,11.3vw,11.25rem)]"
            aria-label="I build digital experiences."
            data-hero-heading
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <SplitTextReveal text="I Build" delay={0.15} />
            </span>
            <span className="block overflow-hidden pb-[0.08em] pl-[7vw] text-[#c4ff49] sm:pl-[12vw]">
              <SplitTextReveal
                text="Digital"
                delay={0.25}
                className="hero-accent-glow"
              />
            </span>
            <span
              className="hero-outline-glow block overflow-hidden pb-[0.08em] text-transparent [-webkit-text-stroke:1px_rgba(245,245,239,0.72)] sm:[-webkit-text-stroke:1.5px_rgba(245,245,239,0.72)]"
              aria-hidden
            >
              <SplitTextReveal text="Experiences" delay={0.35} />
            </span>
          </h1>
        </div>

        <div className="grid min-w-0 w-full items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
          <div
            className="grid min-w-0 w-full items-end gap-7 sm:grid-cols-[minmax(17rem,31rem)_auto] sm:gap-10"
            data-hero-footer
          >
            <p className="min-w-0 w-full max-w-xl text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
              I&apos;m Fahad, a creative developer shaping fast, thoughtful
              interfaces where design, code, and motion work as one.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticWrapper>
                <Button
                  asChild
                  size="lg"
                  className="group rounded-full bg-[#f5f5ef] text-[#080907] shadow-[0_10px_35px_rgba(0,0,0,0.28)] duration-300 hover:bg-[#c4ff49] hover:opacity-100 hover:shadow-[0_0_36px_rgba(196,255,73,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4ff49]"
                >
                  <a href="#work">
                    View my work
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                </Button>
              </MagneticWrapper>

              <MagneticWrapper strength={0.2}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/20 bg-white/[0.015] text-white backdrop-blur-[2px] duration-300 hover:border-white/50 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4ff49]"
                >
                  <a href="#contact">Let&apos;s talk</a>
                </Button>
              </MagneticWrapper>
            </div>
          </div>

          <a
            href="#work"
            className="group hidden items-center gap-3 justify-self-end text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4ff49] md:flex"
            data-hero-footer
            aria-label="Scroll to selected work"
          >
            Scroll to explore
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-transform duration-300 group-hover:translate-y-1">
              <ArrowDown className="h-4 w-4" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
