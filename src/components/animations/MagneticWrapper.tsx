"use client";

import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticWrapperProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

const spring = {
  stiffness: 210,
  damping: 18,
  mass: 0.42,
};

export function MagneticWrapper({
  children,
  className,
  strength = 0.28,
}: MagneticWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const targetScale = useMotionValue(1);
  const x = useSpring(offsetX, spring);
  const y = useSpring(offsetY, spring);
  const rotateX = useSpring(tiltX, spring);
  const rotateY = useSpring(tiltY, spring);
  const scale = useSpring(targetScale, {
    stiffness: 280,
    damping: 22,
    mass: 0.35,
  });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const bounds = boundsRef.current;
    if (!bounds) return;

    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const normalizedX = localX / bounds.width - 0.5;
    const normalizedY = localY / bounds.height - 0.5;

    offsetX.set(normalizedX * bounds.width * strength);
    offsetY.set(normalizedY * bounds.height * strength);
    tiltX.set(normalizedY * -7);
    tiltY.set(normalizedX * 7);

    wrapperRef.current?.style.setProperty("--cursor-x", `${localX}px`);
    wrapperRef.current?.style.setProperty("--cursor-y", `${localY}px`);
  };

  const resetPosition = () => {
    offsetX.set(0);
    offsetY.set(0);
    tiltX.set(0);
    tiltY.set(0);
    targetScale.set(1);
    boundsRef.current = null;
    wrapperRef.current?.style.setProperty("--cursor-opacity", "0");
  };

  return (
    <motion.div
      ref={wrapperRef}
      className={cn("magnetic-surface relative inline-flex", className)}
      style={
        prefersReducedMotion
          ? undefined
          : {
              x,
              y,
              rotateX,
              rotateY,
              scale,
              transformPerspective: 700,
              transformStyle: "preserve-3d",
            }
      }
      data-cursor="magnetic"
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => {
        if (prefersReducedMotion || event.pointerType !== "mouse") return;
        boundsRef.current =
          wrapperRef.current?.getBoundingClientRect() ?? null;
        targetScale.set(1.035);
        wrapperRef.current?.style.setProperty("--cursor-opacity", "1");
      }}
      onPointerDown={() => {
        if (!prefersReducedMotion) targetScale.set(0.985);
      }}
      onPointerUp={() => {
        if (!prefersReducedMotion) targetScale.set(1.035);
      }}
      onPointerLeave={resetPosition}
      onBlur={resetPosition}
    >
      {children}
    </motion.div>
  );
}
