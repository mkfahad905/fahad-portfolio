"use client";

import { useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  StickySidebar,
  type AboutSidebarProps,
} from "@/components/about/AboutSidebar";
import {
  EditorialContent,
  type EditorialContentProps,
} from "@/components/about/EditorialContent";
import type { PortraitCardProps } from "@/components/about/PortraitCard";
import {
  SpecGrid,
  type AboutSpec,
} from "@/components/about/SpecGrid";
import type { AboutMetric } from "@/components/about/DataCounter";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type AboutProps = {
  id?: string;
  sidebar: Omit<AboutSidebarProps, "media">;
  editorial: Omit<EditorialContentProps, "headingId">;
  metrics: readonly AboutMetric[];
  specs: readonly AboutSpec[];
  specsAriaLabel: string;
  portrait: PortraitCardProps;
  className?: string;
};

export function AboutSection({
  id = "about",
  sidebar,
  editorial,
  metrics,
  specs,
  specsAriaLabel,
  portrait,
  className,
}: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const generatedId = useId().replace(/:/g, "");
  const headingId = `${id}-heading-${generatedId}`;

  useGSAP(
    () => {
      const horizontalLines = gsap.utils.toArray<HTMLElement>(
        '[data-blueprint-line="x"]',
      );
      const verticalLines = gsap.utils.toArray<HTMLElement>(
        '[data-blueprint-line="y"]',
      );
      const reveals = gsap.utils.toArray<HTMLElement>("[data-about-reveal]");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const assembly = gsap.timeline({
          scrollTrigger: {
            trigger: shellRef.current,
            start: "top 85%",
            once: true,
          },
        });

        assembly
          .fromTo(
            horizontalLines,
            {
              scaleX: 0,
              transformOrigin: "left center",
              willChange: "transform",
            },
            {
              scaleX: 1,
              duration: 0.8,
              stagger: 0.06,
              ease: "power3.inOut",
              force3D: true,
              clearProps: "transform,willChange",
            },
            0,
          )
          .fromTo(
            verticalLines,
            {
              scaleY: 0,
              transformOrigin: "center top",
              willChange: "transform",
            },
            {
              scaleY: 1,
              duration: 0.8,
              stagger: 0.06,
              ease: "power3.inOut",
              force3D: true,
              clearProps: "transform,willChange",
            },
            0,
          );

        reveals.forEach((element, index) => {
          gsap.fromTo(
            element,
            {
              autoAlpha: 0,
              filter: "blur(10px)",
              willChange: "opacity,filter",
            },
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.6,
              delay: (index % 4) * 0.1,
              ease: "power2.out",
              clearProps: "opacity,visibility,filter,willChange",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true,
              },
            },
          );
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...horizontalLines, ...verticalLines, ...reveals], {
          autoAlpha: 1,
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
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 86%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 86%, transparent)",
        }}
        aria-hidden="true"
      />

      <div
        ref={shellRef}
        className="relative mx-auto w-full max-w-[100rem]"
      >
        <span
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-white/[0.08]"
          data-blueprint-line="x"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-white/[0.08]"
          data-blueprint-line="x"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-px bg-white/[0.08]"
          data-blueprint-line="y"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-px bg-white/[0.08]"
          data-blueprint-line="y"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-y-0 left-[30%] z-20 hidden w-px bg-white/[0.08] lg:block"
          data-blueprint-line="y"
          aria-hidden="true"
        />

        <div className="grid min-w-0 lg:grid-cols-[30%_70%]">
          <div className="min-w-0 border-b border-white/[0.08] lg:border-b-0">
            <StickySidebar {...sidebar} media={portrait} />
          </div>

          <div className="min-w-0">
            <EditorialContent {...editorial} headingId={headingId} />
            <SpecGrid
              metrics={metrics}
              specs={specs}
              ariaLabel={specsAriaLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export const About = AboutSection;
