"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ProjectsIntroduction,
  type ProjectsIntroductionProps,
} from "@/components/projects/ProjectsIntroduction";
import {
  ProjectCaseStudy,
  type ProjectCaseStudyData,
} from "@/components/projects/ProjectCaseStudy";
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
      const cases = gsap.utils.toArray<HTMLElement>("[data-project-case]");

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

        cases.forEach((projectCase) => {
          const reveals = gsap.utils.toArray<HTMLElement>(
            "[data-project-reveal]",
            projectCase,
          );
          const title =
            projectCase.querySelector<HTMLElement>("[data-project-title]");

          gsap.fromTo(
            reveals,
            {
              autoAlpha: 0,
              y: 14,
              willChange: "transform,opacity",
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.48,
              stagger: 0.055,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility,willChange",
              scrollTrigger: {
                trigger: projectCase,
                start: "top 76%",
                once: true,
              },
            },
          );

          if (title) {
            gsap.fromTo(
              title,
              {
                letterSpacing: "-0.02em",
                y: 10,
              },
              {
                letterSpacing: "-0.055em",
                y: 0,
                duration: 0.56,
                ease: "power3.out",
                clearProps: "transform,letterSpacing",
                scrollTrigger: {
                  trigger: title,
                  start: "top 84%",
                  once: true,
                },
              },
            );
          }
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        const allAnimatedElements = gsap.utils.toArray<HTMLElement>(
          "[data-project-intro], [data-project-intro] > *, [data-project-reveal], [data-project-title]",
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
        "relative isolate overflow-clip bg-[#050505] px-4 pb-24 text-white sm:px-6 sm:pb-32 lg:px-8 lg:pb-40",
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

        <div>
          {projects.map((project) => (
            <ProjectCaseStudy key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
