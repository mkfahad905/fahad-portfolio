"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";

type SplitTextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
};

export function SplitTextReveal({
  text,
  className,
  delay = 0,
  duration = 0.9,
  stagger = 0.025,
}: SplitTextRevealProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;

      const split = new SplitType(rootRef.current, {
        types: "words,chars",
        tagName: "span",
        wordClass: "split-word",
        charClass: "split-char",
      });
      const characters = split.chars ?? [];
      const words = split.words ?? [];
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
        });

        gsap.set(words, {
          clipPath: "inset(0 0 100% 0)",
          overflow: "hidden",
        });
        gsap.set(characters, {
          willChange: "transform, opacity, filter",
          transformOrigin: "50% 100%",
        });

        timeline
          .to(
            words,
            {
              clipPath: "inset(0 0 0% 0)",
              duration: duration * 0.78,
              delay,
              stagger: stagger * 1.5,
              ease: "power3.inOut",
            },
            0,
          )
          .fromTo(
            characters,
            {
              autoAlpha: 0,
              filter: "blur(12px)",
              rotateX: -55,
              skewY: 9,
              yPercent: 128,
            },
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              rotateX: 0,
              skewY: 0,
              yPercent: 0,
              duration,
              delay,
              stagger: {
                each: stagger,
                from: "start",
              },
              force3D: true,
              onComplete: () => {
                gsap.set(characters, {
                  clearProps:
                    "transform,opacity,visibility,filter,willChange",
                });
                gsap.set(words, {
                  clearProps: "clipPath,overflow",
                });
              },
            },
            0,
          );
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...words, ...characters], {
          autoAlpha: 1,
          clearProps: "all",
        });
      });

      return () => {
        media.revert();
        split.revert();
      };
    },
    {
      scope: rootRef,
      dependencies: [text, delay, duration, stagger],
      revertOnUpdate: true,
    },
  );

  return (
    <span
      ref={rootRef}
      className={`split-type ${className ?? ""}`}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}
