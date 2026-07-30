"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArchitectureNode } from "./ArchitectureNode";
import {
  ExecutionTrace,
  type TracePath,
} from "./ExecutionTrace";

export type ArchitectureNodeKind =
  | "client"
  | "boundary"
  | "service"
  | "queue"
  | "datastore"
  | "external"
  | "observability";

export type ArchitecturePosition = {
  x: number;
  y: number;
  width?: number;
  height?: number;
};

export type ArchitectureNodeData = {
  id: string;
  label: string;
  responsibility: string;
  kind: ArchitectureNodeKind;
  position: ArchitecturePosition;
  layerPositions?: Readonly<
    Record<string, ArchitecturePosition | undefined>
  >;
  layerIds?: readonly string[];
  protocol?: string;
  boundary?: string;
  mobileOrder?: number;
};

export type ArchitectureEdgeData = {
  id: string;
  source: string;
  target: string;
  label?: string;
  layerIds?: readonly string[];
  traceOrder?: number;
  emphasis?: "default" | "decision" | "external";
};

export type ArchitectureModel = {
  nodes: readonly ArchitectureNodeData[];
  edges: readonly ArchitectureEdgeData[];
  description: string;
  viewBox?: {
    width: number;
    height: number;
  };
};

export type ArchitectureDiagramProps = {
  architecture: ArchitectureModel;
  activeLayerId: string;
  playKey: number;
  traceActive: boolean;
  reducedMotion: boolean;
  highlightedNodeIds?: readonly string[];
  inspectedNodeId: string | null;
  onInspectNode: (nodeId: string | null) => void;
  className?: string;
};

type PositionedNode = ArchitectureNodeData & {
  resolvedPosition: ArchitecturePosition;
};

const DEFAULT_VIEWBOX = { width: 960, height: 560 };
const MOBILE_WIDTH = 320;
const MOBILE_NODE_WIDTH = 264;
const MOBILE_NODE_HEIGHT = 72;
const MOBILE_GAP = 42;
const MOBILE_TOP = 34;

function nodeCenter(node: PositionedNode) {
  return {
    x: node.resolvedPosition.x + (node.resolvedPosition.width ?? 156) / 2,
    y: node.resolvedPosition.y + (node.resolvedPosition.height ?? 76) / 2,
  };
}

function connectionPath(
  source: PositionedNode,
  target: PositionedNode,
  mobile: boolean,
) {
  const from = nodeCenter(source);
  const to = nodeCenter(target);

  if (mobile) {
    const sourceHeight = source.resolvedPosition.height ?? MOBILE_NODE_HEIGHT;
    const targetWidth = target.resolvedPosition.width ?? MOBILE_NODE_WIDTH;
    const startY = source.resolvedPosition.y + sourceHeight;
    const endY = target.resolvedPosition.y;
    const centerX = target.resolvedPosition.x + targetWidth / 2;
    const bend = Math.max(18, (endY - startY) * 0.5);

    return `M ${from.x} ${startY} C ${from.x} ${startY + bend}, ${centerX} ${endY - bend}, ${centerX} ${endY}`;
  }

  const sourceWidth = source.resolvedPosition.width ?? 156;
  const targetWidth = target.resolvedPosition.width ?? 156;
  const movingRight = to.x >= from.x;
  const startX = movingRight
    ? source.resolvedPosition.x + sourceWidth
    : source.resolvedPosition.x;
  const endX = movingRight
    ? target.resolvedPosition.x
    : target.resolvedPosition.x + targetWidth;
  const delta = Math.max(42, Math.abs(endX - startX) * 0.48);
  const firstControl = movingRight ? startX + delta : startX - delta;
  const secondControl = movingRight ? endX - delta : endX + delta;

  return `M ${startX} ${from.y} C ${firstControl} ${from.y}, ${secondControl} ${to.y}, ${endX} ${to.y}`;
}

function isAvailableOnLayer(
  layerIds: readonly string[] | undefined,
  activeLayerId: string,
) {
  return !layerIds || layerIds.length === 0 || layerIds.includes(activeLayerId);
}

export function ArchitectureDiagram({
  architecture,
  activeLayerId,
  playKey,
  traceActive,
  reducedMotion,
  highlightedNodeIds = [],
  inspectedNodeId,
  onInspectNode,
  className,
}: ArchitectureDiagramProps) {
  const generatedId = useId().replace(/:/g, "");
  const titleId = `architecture-title-${generatedId}`;
  const descriptionId = `architecture-description-${generatedId}`;
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const orderedMobileNodes = useMemo(
    () =>
      [...architecture.nodes].sort(
        (a, b) => (a.mobileOrder ?? 0) - (b.mobileOrder ?? 0),
      ),
    [architecture.nodes],
  );

  const positionedNodes = useMemo<PositionedNode[]>(() => {
    const source = mobile ? orderedMobileNodes : architecture.nodes;

    return source.map((node, index) => {
      const layerPosition = node.layerPositions?.[activeLayerId];
      const resolvedPosition = mobile
        ? {
            x: (MOBILE_WIDTH - MOBILE_NODE_WIDTH) / 2,
            y: MOBILE_TOP + index * (MOBILE_NODE_HEIGHT + MOBILE_GAP),
            width: MOBILE_NODE_WIDTH,
            height: MOBILE_NODE_HEIGHT,
          }
        : layerPosition ?? node.position;

      return { ...node, resolvedPosition };
    });
  }, [activeLayerId, architecture.nodes, mobile, orderedMobileNodes]);

  const nodeMap = useMemo(
    () => new Map(positionedNodes.map((node) => [node.id, node])),
    [positionedNodes],
  );

  const visibleEdges = useMemo(
    () =>
      architecture.edges
        .filter((edge) => isAvailableOnLayer(edge.layerIds, activeLayerId))
        .flatMap((edge) => {
          const source = nodeMap.get(edge.source);
          const target = nodeMap.get(edge.target);
          if (!source || !target) return [];
          return [{ ...edge, d: connectionPath(source, target, mobile) }];
        }),
    [activeLayerId, architecture.edges, mobile, nodeMap],
  );

  const connectedNodeIds = useMemo(() => {
    if (!inspectedNodeId) return new Set<string>();
    const ids = new Set<string>([inspectedNodeId]);
    visibleEdges.forEach((edge) => {
      if (edge.source === inspectedNodeId) ids.add(edge.target);
      if (edge.target === inspectedNodeId) ids.add(edge.source);
    });
    return ids;
  }, [inspectedNodeId, visibleEdges]);

  const highlighted = useMemo(
    () => new Set(highlightedNodeIds),
    [highlightedNodeIds],
  );

  const tracePaths = useMemo<TracePath[]>(
    () =>
      visibleEdges
        .filter((edge) => typeof edge.traceOrder === "number")
        .map((edge) => ({
          id: edge.id,
          d: edge.d,
          order: edge.traceOrder ?? 0,
        })),
    [visibleEdges],
  );

  const tracedNodeIds = useMemo(() => {
    const ids = new Set<string>();
    architecture.edges.forEach((edge) => {
      if (typeof edge.traceOrder !== "number") return;
      ids.add(edge.source);
      ids.add(edge.target);
    });
    return ids;
  }, [architecture.edges]);

  const viewBox = mobile
    ? {
        width: MOBILE_WIDTH,
        height:
          MOBILE_TOP * 2 +
          positionedNodes.length * MOBILE_NODE_HEIGHT +
          Math.max(0, positionedNodes.length - 1) * MOBILE_GAP,
      }
    : architecture.viewBox ?? DEFAULT_VIEWBOX;

  const hasFocusedSubset =
    connectedNodeIds.size > 0 || highlighted.size > 0;

  return (
    <figure className={cn("min-w-0", className)}>
      <div className="relative overflow-hidden bg-[#060606]">
        <svg
          className="block h-auto w-full"
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          role="group"
          aria-labelledby={`${titleId} ${descriptionId}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <title id={titleId}>System architecture</title>
          <desc id={descriptionId}>{architecture.description}</desc>

          <defs>
            <pattern
              id={`project-dots-${generatedId}`}
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.09)" />
            </pattern>
          </defs>

          <rect
            width={viewBox.width}
            height={viewBox.height}
            fill={`url(#project-dots-${generatedId})`}
          />

          <g aria-hidden="true">
            {visibleEdges.map((edge) => {
              const isConnected =
                inspectedNodeId === edge.source ||
                inspectedNodeId === edge.target;
              const isHighlighted =
                highlighted.has(edge.source) && highlighted.has(edge.target);
              const dimmed = hasFocusedSubset && !isConnected && !isHighlighted;

              return (
                <motion.path
                  key={edge.id}
                  d={edge.d}
                  fill="none"
                  stroke={
                    isConnected || isHighlighted
                      ? edge.emphasis === "decision"
                        ? "#7c3aed"
                        : "#ccff00"
                      : edge.emphasis === "external"
                        ? "rgba(124,58,237,0.42)"
                        : "rgba(255,255,255,0.14)"
                  }
                  strokeDasharray={
                    edge.emphasis === "external" ? "6 7" : undefined
                  }
                  strokeWidth={isConnected || isHighlighted ? 1.6 : 1}
                  vectorEffect="non-scaling-stroke"
                  initial={false}
                  animate={{ opacity: dimmed ? 0.16 : 1 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                />
              );
            })}
          </g>

          <ExecutionTrace
            paths={tracePaths}
            playKey={playKey}
            active={traceActive}
            reducedMotion={reducedMotion}
          />

          {positionedNodes.map((node) => {
            const layerAvailable = isAvailableOnLayer(
              node.layerIds,
              activeLayerId,
            );
            const isInspected = inspectedNodeId === node.id;
            const isConnected = connectedNodeIds.has(node.id);
            const isHighlighted = highlighted.has(node.id);
            const dimmed =
              !layerAvailable ||
              (hasFocusedSubset &&
                !isConnected &&
                !isHighlighted &&
                !isInspected);

            return (
              <ArchitectureNode
                key={node.id}
                node={node}
                position={node.resolvedPosition}
                active={
                  traceActive && tracedNodeIds.has(node.id)
                }
                dimmed={dimmed}
                inspected={isInspected}
                reducedMotion={reducedMotion}
                onInspect={onInspectNode}
              />
            );
          })}
        </svg>
      </div>

      <figcaption className="border-t border-white/[0.08] px-4 py-3 font-mono text-[0.625rem] uppercase leading-5 tracking-[0.14em] text-white/38 sm:px-5">
        {architecture.description}
      </figcaption>
    </figure>
  );
}
