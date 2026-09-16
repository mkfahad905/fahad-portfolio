"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ProjectsIntroduction,
  type ProjectsIntroductionProps,
} from "@/components/projects/ProjectsIntroduction";
import { type ProjectCaseStudyData } from "@/components/projects/ProjectCaseStudy";
import { HorizontalProjectShowcase } from "@/components/projects/HorizontalProjectShowcase";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type FeaturedProjectsProps = {
  id?: string;
  introduction: Omit<ProjectsIntroductionProps, "className">;
  projects: readonly ProjectCaseStudyData[];
  className?: string;
};

export function FeaturedProjects({
  id = "featured-projects",
  introduction,
  projects,
  className,
}: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const intro = sectionRef.current?.querySelector<HTMLElement>(
        "[data-project-intro]",
      );
      const introTitle = sectionRef.current?.querySelector<HTMLElement>(
        "[data-project-intro-title]",
      );

      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (intro) {
          const introElements = Array.from(
            intro.children,
          ) as HTMLElement[];
          gsap.fromTo(
            introElements,
            {
              autoAlpha: 0,
              y: 18,
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
                trigger: intro,
                start: "top 82%",
                once: true,
              },
            },
          );
        }

        if (introTitle) {
          gsap.fromTo(
            introTitle,
            { letterSpacing: "-0.015em" },
            {
              letterSpacing: "-0.055em",
              duration: 0.62,
              ease: "power3.out",
              clearProps: "letterSpacing",
              scrollTrigger: {
                trigger: introTitle,
                start: "top 85%",
                once: true,
              },
            },
          );
        }
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        const allAnimatedElements = gsap.utils.toArray<HTMLElement>(
          "[data-project-intro], [data-project-intro] > *",
        );
        gsap.set(allAnimatedElements, {
          autoAlpha: 1,
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
        "relative isolate overflow-clip bg-[#050505] px-4 pb-12 text-white sm:px-6 sm:pb-16 lg:px-8 lg:pb-20",
        className,
      )}
      aria-labelledby="featured-projects-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(90deg, rgba(124,58,237,0.035), transparent 24%, transparent 76%, rgba(204,255,0,0.025))",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[100rem]">
        <ProjectsIntroduction {...introduction} />

        <div className="mt-6 sm:mt-8">
          <HorizontalProjectShowcase projects={projects} />
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
