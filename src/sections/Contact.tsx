"use client";

import { useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactActionCard } from "@/components/contact/ContactActionCard";
import { cn } from "@/lib/utils";
import type { ContactContent } from "@/types/contact";

gsap.registerPlugin(ScrollTrigger);

export type ContactProps = ContactContent & {
  id?: string;
  className?: string;
};

export function Contact({
  id = "contact",
  eyebrow,
  title,
  description,
  ctaLabel,
  email,
  channels,
  className,
}: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const generatedId = useId().replace(/:/g, "");
  const headingId = `${id}-heading-${generatedId}`;

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const divider =
        sectionRef.current?.querySelector<HTMLElement>(
          "[data-contact-divider]",
        );
      const introduction = gsap.utils.toArray<HTMLElement>(
        "[data-contact-intro]",
      );
      const cards = gsap.utils.toArray<HTMLElement>("[data-contact-card]");
      const closing = gsap.utils.toArray<HTMLElement>(
        "[data-contact-closing]",
      );

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        if (divider) {
          timeline.fromTo(
            divider,
            {
              scaleX: 0,
              transformOrigin: "left center",
              willChange: "transform",
            },
            {
              scaleX: 1,
              duration: 0.65,
              clearProps: "transform,transformOrigin,willChange",
            },
          );
        }

        timeline
          .fromTo(
            introduction,
            {
              autoAlpha: 0,
              y: 14,
              willChange: "transform,opacity",
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.07,
              clearProps: "transform,opacity,visibility,willChange",
            },
            divider ? "-=0.3" : 0,
          )
          .fromTo(
            cards,
            {
              autoAlpha: 0,
              y: 12,
              willChange: "transform,opacity",
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.06,
              clearProps: "transform,opacity,visibility,willChange",
            },
            "-=0.22",
          )
          .fromTo(
            closing,
            {
              autoAlpha: 0,
              y: 10,
              willChange: "transform,opacity",
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.06,
              clearProps: "transform,opacity,visibility,willChange",
            },
            "-=0.18",
          );
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [divider, ...introduction, ...cards, ...closing].filter(Boolean),
          {
            autoAlpha: 1,
            y: 0,
            scaleX: 1,
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
      id={id}
      className={cn(
        "relative isolate overflow-clip bg-[#050505] px-4 pb-10 pt-24 text-white sm:px-6 sm:pb-12 sm:pt-32 lg:px-8 lg:pb-16 lg:pt-40",
        className,
      )}
      aria-labelledby={headingId}
    >
      <div className="relative mx-auto w-full max-w-[100rem]">
        <span
          className="block h-px w-full bg-white/[0.1]"
          data-contact-divider
          aria-hidden="true"
        />

        <header className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.68fr)_minmax(18rem,0.32fr)] lg:gap-16 lg:py-24">
          <div>
            <p
              className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[#ccff00]"
              data-contact-intro
            >
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className="mt-6 max-w-[11ch] text-[clamp(3.25rem,8.6vw,8.75rem)] font-medium leading-[0.86] tracking-[-0.065em] text-white"
              data-contact-intro
            >
              {title}
            </h2>
          </div>

          <div className="flex flex-col justify-end lg:pb-2">
            <p
              className="max-w-xl text-[clamp(1rem,1.4vw,1.125rem)] leading-8 text-[#a1a1aa]"
              data-contact-intro
            >
              {description}
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-8 inline-flex min-h-12 w-fit items-center justify-center border border-white/18 bg-white px-6 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-black outline-none transition-colors duration-300 hover:border-[#ccff00] hover:bg-[#ccff00] focus-visible:ring-2 focus-visible:ring-[#ccff00] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
              data-contact-intro
            >
              {ctaLabel}
            </a>
          </div>
        </header>

        <nav
          className="border-y border-white/[0.1] lg:grid lg:grid-cols-3"
          aria-label="Contact channels"
        >
          {channels.map((channel, index) => (
            <ContactActionCard
              key={channel.id}
              channel={channel}
              index={index}
            />
          ))}
        </nav>

        <footer className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <p
            className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/42"
            data-contact-closing
          >
            Available for full-time software engineering
          </p>
          <a
            href="#top"
            className="w-fit font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/54 outline-none transition-colors hover:text-[#ccff00] focus-visible:text-[#ccff00] focus-visible:ring-1 focus-visible:ring-[#ccff00]"
            data-contact-closing
          >
            Return to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}

export default Contact;
