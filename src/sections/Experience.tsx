"use client";

import { useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExperienceTimeline,
  type ExperienceTimelineProps,
} from "@/components/experience/ExperienceTimeline";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type ExperienceProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  experiences: ExperienceTimelineProps["experiences"];
  className?: string;
};

export function Experience({
  id = "experience",
  eyebrow,
  title,
  description,
  experiences,
  className,
}: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const generatedId = useId().replace(/:/g, "");
  const headingId = `${id}-heading-${generatedId}`;

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const introduction = sectionRef.current?.querySelector<HTMLElement>(
        "[data-experience-intro]",
      );
      const line = sectionRef.current?.querySelector<HTMLElement>(
        "[data-experience-line]",
      );
      const entries = gsap.utils.toArray<HTMLElement>(
        "[data-experience-entry]",
      );

      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (introduction) {
          gsap.fromTo(
            Array.from(introduction.children),
            {
              autoAlpha: 0,
              y: 16,
              willChange: "transform,opacity",
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.52,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility,willChange",
              scrollTrigger: {
                trigger: introduction,
                start: "top 82%",
                once: true,
              },
            },
          );
        }

        if (line) {
          gsap.fromTo(
            line,
            {
              scaleY: 0,
              transformOrigin: "center top",
            },
            {
              scaleY: 1,
              duration: 0.9,
              ease: "power3.inOut",
              clearProps: "transform",
              scrollTrigger: {
                trigger: line,
                start: "top 82%",
                once: true,
              },
            },
          );
        }

        entries.forEach((entry) => {
          const marker = entry.querySelector<HTMLElement>(
            "[data-experience-marker]",
          );

          gsap.fromTo(
            entry,
            {
              autoAlpha: 0,
              y: 24,
              willChange: "transform,opacity",
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.56,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility,willChange",
              scrollTrigger: {
                trigger: entry,
                start: "top 82%",
                once: true,
              },
            },
          );

          if (marker) {
            gsap.fromTo(
              marker,
              { scale: 0 },
              {
                scale: 1,
                duration: 0.32,
                ease: "back.out(1.7)",
                clearProps: "transform",
                scrollTrigger: {
                  trigger: entry,
                  start: "top 82%",
                  once: true,
                },
              },
            );
          }
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        const elements = gsap.utils.toArray<HTMLElement>(
          "[data-experience-intro] > *, [data-experience-line], [data-experience-entry], [data-experience-marker]",
        );

        gsap.set(elements, {
          autoAlpha: 1,
          scale: 1,
          scaleY: 1,
          y: 0,
          clearProps: "all",
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative isolate overflow-clip bg-[#050505] px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-8 lg:py-40",
        className,
      )}
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[100rem]">
        <header
          className="grid gap-8 border-y border-white/[0.08] py-10 sm:py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:items-end lg:gap-16 lg:py-20"
          data-experience-intro
        >
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[#ccff00]">
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className="mt-6 max-w-[12ch] text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.055em] text-white"
            >
              {title}
            </h2>
          </div>

          <p className="max-w-xl text-[1.0625rem] leading-[1.65] tracking-[-0.012em] text-[#a1a1aa] sm:text-lg">
            {description}
          </p>
        </header>

        <ExperienceTimeline experiences={experiences} />
      </div>
    </section>
  );
}

export default Experience;
