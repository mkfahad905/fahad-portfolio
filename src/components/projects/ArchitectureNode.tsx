"use client";

import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type {
  ArchitectureNodeData,
  ArchitecturePosition,
} from "./ArchitectureDiagram";

export type ArchitectureNodeProps = {
  node: ArchitectureNodeData;
  position: ArchitecturePosition;
  active: boolean;
  dimmed: boolean;
  inspected: boolean;
  reducedMotion: boolean;
  onInspect: (nodeId: string | null) => void;
};

const kindLabel: Record<ArchitectureNodeData["kind"], string> = {
  client: "Entry",
  boundary: "Boundary",
  service: "Service",
  queue: "Queue",
  datastore: "State",
  external: "External",
  observability: "Observe",
};

function truncate(value: string, maximum: number) {
  return value.length > maximum
    ? `${value.slice(0, Math.max(0, maximum - 1))}…`
    : value;
}

export function ArchitectureNode({
  node,
  position,
  active,
  dimmed,
  inspected,
  reducedMotion,
  onInspect,
}: ArchitectureNodeProps) {
  const width = position.width ?? 156;
  const height = position.height ?? 76;
  const label = `${node.label}. ${node.responsibility}`;

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onInspect(inspected ? null : node.id);
  };

  return (
    <motion.g
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={inspected}
      className={cn("cursor-pointer outline-none", dimmed && "opacity-30")}
      initial={false}
      animate={{
        x: position.x,
        y: position.y,
        opacity: dimmed ? 0.28 : 1,
        scale: inspected ? 1.025 : 1,
      }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
      }
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onInspect(node.id);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") onInspect(null);
      }}
      onFocus={() => onInspect(node.id)}
      onBlur={() => onInspect(null)}
      onClick={() => onInspect(inspected ? null : node.id)}
      onKeyDown={handleKeyDown}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      <rect
        width={width}
        height={height}
        rx={node.kind === "datastore" ? 18 : 2}
        fill={inspected ? "rgba(17,17,17,0.98)" : "rgba(8,8,8,0.96)"}
        stroke={
          inspected
            ? "#ccff00"
            : active
              ? "rgba(204,255,0,0.62)"
              : "rgba(255,255,255,0.16)"
        }
        strokeDasharray={node.kind === "boundary" ? "5 4" : undefined}
        strokeWidth={inspected ? 1.5 : 1}
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="10"
        y="10"
        width="5"
        height="5"
        rx="1"
        fill={active ? "#ccff00" : "rgba(255,255,255,0.24)"}
      />
      <text
        x="22"
        y="15"
        fill="rgba(255,255,255,0.38)"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7.5"
        letterSpacing="1.2"
      >
        {kindLabel[node.kind].toUpperCase()}
      </text>
      <text
        x="12"
        y="39"
        fill="rgba(255,255,255,0.92)"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontSize="12"
        fontWeight="550"
      >
        {truncate(node.label, 21)}
      </text>
      <text
        x="12"
        y="58"
        fill="rgba(161,161,170,0.75)"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7.5"
        letterSpacing="0.8"
      >
        {truncate(node.protocol ?? node.responsibility, 28).toUpperCase()}
      </text>
      {inspected ? (
        <rect
          x="-4"
          y="-4"
          width={width + 8}
          height={height + 8}
          rx="4"
          fill="none"
          stroke="rgba(204,255,0,0.28)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ) : null}
    </motion.g>
  );
}
