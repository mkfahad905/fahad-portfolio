"use client";

import { useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CapabilityGroup,
  type CapabilityGroupData,
} from "@/components/toolkit/CapabilityGroup";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type EngineeringToolkitProps = {
  id?: string;
  eyebrow: string;
  title: string;
  philosophy: string;
  supportingCopy?: string;
  workflow: readonly string[];
  groups: readonly CapabilityGroupData[];
  className?: string;
};

export function EngineeringToolkit({
  id = "engineering-toolkit",
  eyebrow,
  title,
  philosophy,
  supportingCopy,
  workflow,
  groups,
  className,
}: EngineeringToolkitProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const generatedId = useId().replace(/:/g, "");
  const headingId = `${id}-heading-${generatedId}`;

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const introduction = sectionRef.current?.querySelector<HTMLElement>(
        "[data-toolkit-intro]",
      );
      const philosophyPanel =
        sectionRef.current?.querySelector<HTMLElement>(
          "[data-toolkit-philosophy]",
        );
      const capabilityGroups = gsap.utils.toArray<HTMLElement>(
        "[data-toolkit-group]",
      );

      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (introduction) {
          gsap.fromTo(
            Array.from(introduction.children),
            {
              autoAlpha: 0,
              y: 18,
              willChange: "transform,opacity",
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.54,
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

        if (philosophyPanel) {
          gsap.fromTo(
            philosophyPanel,
            {
              autoAlpha: 0,
              y: 20,
              willChange: "transform,opacity",
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.56,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility,willChange",
              scrollTrigger: {
                trigger: philosophyPanel,
                start: "top 82%",
                once: true,
              },
            },
          );
        }

        capabilityGroups.forEach((group) => {
          const header = group.querySelector<HTMLElement>("header");
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-toolkit-card]",
            group,
          );
          const targets = header ? [header, ...cards] : cards;

          gsap.fromTo(
            targets,
            {
              autoAlpha: 0,
              y: 16,
              willChange: "transform,opacity",
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.46,
              stagger: 0.055,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility,willChange",
              scrollTrigger: {
                trigger: group,
                start: "top 82%",
                once: true,
              },
            },
          );
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        const elements = gsap.utils.toArray<HTMLElement>(
          "[data-toolkit-intro] > *, [data-toolkit-philosophy], [data-toolkit-group] header, [data-toolkit-card]",
        );

        gsap.set(elements, {
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
        "relative isolate overflow-clip bg-[#050505] px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-8 lg:py-40",
        className,
      )}
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[100rem]">
        <header
          className="border-y border-white/[0.08] py-10 sm:py-14 lg:py-20"
          data-toolkit-intro
        >
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[#ccff00]">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-6 max-w-[13ch] text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.055em] text-white"
          >
            {title}
          </h2>
        </header>

        <div className="grid min-w-0 gap-12 pt-12 sm:pt-16 lg:grid-cols-[minmax(18rem,0.36fr)_minmax(0,0.64fr)] lg:gap-16 lg:pt-20">
          <div>
            <article
              className="border-y border-white/[0.1] py-7 lg:sticky lg:top-24"
              data-toolkit-philosophy
            >
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[#7c3aed]">
                Engineering philosophy
              </p>
              <p className="mt-6 text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-[1.25] tracking-[-0.03em] text-white/88">
                {philosophy}
              </p>

              {supportingCopy ? (
                <p className="mt-6 text-[0.9375rem] leading-7 text-[#a1a1aa]">
                  {supportingCopy}
                </p>
              ) : null}

              {workflow.length > 0 ? (
                <ol
                  className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]"
                  aria-label="Engineering workflow"
                >
                  {workflow.map((stage, index) => (
                    <li
                      key={stage}
                      className="grid grid-cols-[2rem_1fr] gap-3 py-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/52"
                    >
                      <span
                        className="text-[#ccff00]"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {stage}
                    </li>
                  ))}
                </ol>
              ) : null}
            </article>
          </div>

          <div className="min-w-0">
            {groups.map((group, index) => (
              <CapabilityGroup
                key={group.id}
                group={group}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EngineeringToolkit;
