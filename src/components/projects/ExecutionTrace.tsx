"use client";

import { motion } from "framer-motion";

export type TracePath = {
  id: string;
  d: string;
  order: number;
};

export type ExecutionTraceProps = {
  paths: readonly TracePath[];
  playKey: number;
  active: boolean;
  reducedMotion: boolean;
};

export function ExecutionTrace({
  paths,
  playKey,
  active,
  reducedMotion,
}: ExecutionTraceProps) {
  if (!active || paths.length === 0) return null;

  return (
    <g aria-hidden="true">
      {paths.map((path) => {
        const delay = reducedMotion ? 0 : path.order * 0.11;

        return (
          <g key={`${playKey}-${path.id}`}>
            <motion.path
              d={path.d}
              fill="none"
              stroke="rgba(204,255,0,0.18)"
              strokeLinecap="round"
              strokeWidth="8"
              vectorEffect="non-scaling-stroke"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: reducedMotion ? 0.35 : 0.5 }}
              transition={{
                pathLength: {
                  duration: reducedMotion ? 0 : 0.82,
                  delay,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: { duration: reducedMotion ? 0 : 0.18, delay },
              }}
            />
            {!reducedMotion ? (
              <motion.path
                d={path.d}
                fill="none"
                pathLength={1}
                stroke="#ccff00"
                strokeDasharray="0.025 0.075"
                strokeLinecap="round"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0, strokeDashoffset: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0.25],
                  strokeDashoffset: -1,
                }}
                transition={{
                  duration: 0.95,
                  delay,
                  times: [0, 0.08, 0.78, 1],
                  ease: "linear",
                }}
              />
            ) : null}
          </g>
        );
      })}
    </g>
  );
}
