"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ProjectCaseStudy,
  type ProjectCaseStudyData,
} from "./ProjectCaseStudy";
import { ProjectShowcaseNavigation } from "./ProjectShowcaseNavigation";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type HorizontalProjectShowcaseProps = {
  projects: readonly ProjectCaseStudyData[];
  className?: string;
};

export function HorizontalProjectShowcase({
  projects,
  className,
}: HorizontalProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const total = projects.length;

  // Track dragging state for desktop mouse drag
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);

  // Check breakpoint
  useEffect(() => {
    const checkBreakpoint = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  // Helper to calculate exact travel distance and scroll duration
  const getMetrics = useCallback(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container || total <= 1) {
      return { travelDistance: 0, scrollDistance: 0 };
    }

    const firstPanel = track.children[0] as HTMLElement | undefined;
    const lastPanel = track.children[total - 1] as HTMLElement | undefined;

    // Offset required so the final panel aligns where the first panel started
    const lastPanelOffset =
      lastPanel && firstPanel
        ? lastPanel.offsetLeft - firstPanel.offsetLeft
        : 0;

    // Ensure any trailing margins/spacers are also reachable if container is wide
    const maxScroll = Math.max(0, track.scrollWidth - container.clientWidth);
    const travelDistance = Math.max(lastPanelOffset, maxScroll);

    // Provide comfortable vertical scroll distance (1.35 viewport heights per project transition)
    const scrollDistance = (total - 1) * window.innerHeight * 1.35;

    return { travelDistance, scrollDistance };
  }, [total]);

  // GSAP pinned horizontal scroll for desktop with motion preference
  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track || total <= 1) return;

      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          // Timeline: animate track horizontally, then provide a resting hold window
          // so the final project (Project 02) is completely presented before releasing.
          const tl = gsap.timeline({
            defaults: { ease: "none" },
          });

          // Horizontal travel phase (duration: 1)
          tl.to(track, {
            x: () => -getMetrics().travelDistance,
            duration: 1,
            ease: "power1.inOut",
          });

          // Settled hold phase (duration: 0.35) at the final project
          tl.to({}, { duration: 0.35 });

          const st = ScrollTrigger.create({
            trigger: container,
            pin: true,
            start: "top top",
            end: () => `+=${getMetrics().scrollDistance}`,
            scrub: 0.8,
            animation: tl,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const currentProgress = self.progress;
              setProgress(currentProgress);

              // Segment mapping: 0 to 0.74 maps across the projects,
              // while >= 0.74 is the hold phase on the final project.
              if (currentProgress >= 0.74) {
                setActiveIndex(total - 1);
              } else {
                const computedIndex = Math.min(
                  total - 1,
                  Math.max(0, Math.floor((currentProgress / 0.74) * total)),
                );
                setActiveIndex(computedIndex);
              }
            },
          });

          scrollTriggerRef.current = st;

          // Recalculate on resize
          const ro = new ResizeObserver(() => {
            ScrollTrigger.refresh();
          });
          ro.observe(track);
          ro.observe(container);

          return () => {
            ro.disconnect();
            st.kill();
            tl.kill();
            scrollTriggerRef.current = null;
          };
        },
      );

      return () => media.revert();
    },
    { scope: containerRef, dependencies: [total, getMetrics] },
  );

  // Handle mobile / tablet native scroll events
  const handleMobileScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || isDesktop) return;

    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    const currentProgress = scrollLeft / maxScroll;
    setProgress(currentProgress);

    const firstPanel = track.children[0] as HTMLElement | undefined;
    const secondPanel = track.children[1] as HTMLElement | undefined;
    const panelWidth =
      secondPanel && firstPanel
        ? secondPanel.offsetLeft - firstPanel.offsetLeft
        : track.clientWidth * 0.88;

    const computedIndex = Math.min(
      total - 1,
      Math.max(0, Math.round(scrollLeft / panelWidth)),
    );
    setActiveIndex(computedIndex);
  }, [isDesktop, total]);

  // Navigate to project by index
  const navigateToIndex = useCallback(
    (index: number) => {
      const targetIndex = Math.min(total - 1, Math.max(0, index));
      setActiveIndex(targetIndex);

      const st = scrollTriggerRef.current;
      if (st && isDesktop) {
        // Desktop pinned mode: target scroll is calculated based on project segment
        const targetRatio =
          total > 1
            ? targetIndex === total - 1
              ? 0.85
              : (targetIndex / (total - 1)) * 0.74
            : 0;

        const targetScroll = st.start + targetRatio * (st.end - st.start);
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      } else {
        // Mobile / tablet or reduced-motion: scroll container horizontally
        const track = trackRef.current;
        if (track) {
          const targetPanel = track.children[targetIndex] as HTMLElement | undefined;
          if (targetPanel) {
            track.scrollTo({
              left: targetPanel.offsetLeft,
              behavior: "smooth",
            });
          }
        }
      }
    },
    [isDesktop, total],
  );

  const handlePrev = useCallback(() => {
    navigateToIndex(activeIndex - 1);
  }, [activeIndex, navigateToIndex]);

  const handleNext = useCallback(() => {
    navigateToIndex(activeIndex + 1);
  }, [activeIndex, navigateToIndex]);

  // Keyboard navigation (Left / Right arrows) when container is focused
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    },
    [handleNext, handlePrev],
  );

  // Trackpad horizontal scroll support on desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isDesktop) return;

    const handleWheel = (e: WheelEvent) => {
      const st = scrollTriggerRef.current;
      if (!st || !st.isActive) return;

      // If user scrolls horizontally on trackpad (deltaX)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.8) {
        e.preventDefault();
        window.scrollBy({
          top: e.deltaX * 0.8,
          behavior: "auto",
        });
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isDesktop]);

  // Mouse drag support on desktop
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isDesktop || e.button !== 0) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    const st = scrollTriggerRef.current;
    if (st) {
      scrollStartRef.current = window.scrollY;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !isDesktop) return;
    const deltaX = e.clientX - startXRef.current;
    const st = scrollTriggerRef.current;
    if (st && st.isActive) {
      window.scrollTo({
        top: scrollStartRef.current - deltaX * 1.5,
        behavior: "auto",
      });
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={cn(
        "relative w-full outline-none focus-visible:ring-1 focus-visible:ring-[#ccff00]/40",
        className,
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Projects Horizontal Showcase"
    >
      {/* HUD Navigation Controls Bar */}
      <div className="w-full">
        <ProjectShowcaseNavigation
          total={total}
          activeIndex={activeIndex}
          progress={progress}
          onSelect={navigateToIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          canPrev={activeIndex > 0}
          canNext={activeIndex < total - 1}
        />
      </div>

      {/* Horizontal Track Container */}
      <div className="relative w-full pt-4 sm:pt-6 lg:overflow-hidden">
        <div
          ref={trackRef}
          onScroll={handleMobileScroll}
          className={cn(
            "flex w-full min-w-full items-start gap-6 sm:gap-8 lg:gap-10",
            // Mobile: native horizontal swipe with snap
            "overflow-x-auto snap-x snap-mandatory overscroll-x-contain pb-4 lg:overflow-visible lg:pb-6",
            // Full bleed on mobile/tablet
            "-mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0",
            // Custom subtle scrollbar
            "[scrollbar-color:rgba(204,255,0,0.2)_transparent] [scrollbar-width:thin]",
          )}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${String(index + 1).padStart(2, "0")} of ${String(total).padStart(2, "0")}: ${project.title}`}
              className={cn(
                // Panel width: 88vw on mobile, 85vw on desktop
                "w-[88vw] shrink-0 snap-start sm:w-[85vw] lg:w-[85vw] lg:max-w-[96rem]",
                "transition-opacity duration-300",
                activeIndex === index ? "opacity-100" : "opacity-80 hover:opacity-100",
              )}
            >
              <ProjectCaseStudy
                project={project}
                variant="showcase"
                overrideIndex={`Case study / ${String(index + 1).padStart(2, "0")}`}
              />
            </div>
          ))}

          {/* End breathing room spacer */}
          <div
            className="w-4 shrink-0 sm:w-8 lg:w-12"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
