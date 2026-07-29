"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function BackgroundGrid() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 1100], [0, 96]);
  const glowY = useTransform(scrollY, [0, 1100], [0, -72]);
  const detailY = useTransform(scrollY, [0, 1100], [0, 42]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -inset-x-8 -inset-y-28 opacity-50"
        style={{
          y: prefersReducedMotion ? 0 : gridY,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize:
            "clamp(42px, 5vw, 76px) clamp(42px, 5vw, 76px)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 68%, transparent 98%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 68%, transparent 98%)",
          willChange: "transform",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          y: prefersReducedMotion ? 0 : glowY,
          willChange: "transform",
        }}
      >
        <div
          className="absolute inset-[-12%] opacity-80"
          data-radial-glow
          style={{
            background:
              "radial-gradient(circle at 72% 38%, rgba(196,255,73,0.18), transparent 27%), radial-gradient(circle at 15% 86%, rgba(224,239,255,0.08), transparent 25%)",
            filter: "blur(8px)",
            willChange: "transform, opacity",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          y: prefersReducedMotion ? 0 : detailY,
          willChange: "transform",
        }}
      >
        <div className="absolute left-[7%] top-[18%] h-1.5 w-1.5 rounded-full bg-[#c4ff49] shadow-[0_0_22px_5px_rgba(196,255,73,0.22)]" />
        <div className="absolute right-[12%] top-[28%] h-px w-20 bg-gradient-to-r from-transparent to-white/20" />
      </motion.div>

      <div className="hero-noise absolute -inset-[20%]" />
    </div>
  );
}
