"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCw } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArchitectureDiagram,
  type ArchitectureModel,
} from "./ArchitectureDiagram";
import {
  LayerSelector,
  type ProjectLayer,
} from "./LayerSelector";

export type ArchitectureExplorerProps = {
  architecture: ArchitectureModel;
  layers: readonly ProjectLayer[];
  highlightedNodeIds?: readonly string[];
  preferredLayerId?: string;
  className?: string;
};

export function ArchitectureExplorer({
  architecture,
  layers,
  highlightedNodeIds = [],
  preferredLayerId,
  className,
}: ArchitectureExplorerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(rootRef, {
    amount: 0.42,
    margin: "0px 0px -8% 0px",
  });
  const initialLayerId = layers[0]?.id ?? "default";
  const [activeLayerId, setActiveLayerId] = useState(initialLayerId);
  const [lockedLayerId, setLockedLayerId] = useState<string | null>(null);
  const [inspectedNodeId, setInspectedNodeId] = useState<string | null>(null);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    if (!preferredLayerId) return;
    if (!layers.some((layer) => layer.id === preferredLayerId)) return;
    setActiveLayerId(preferredLayerId);
  }, [layers, preferredLayerId]);

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;
    setPlayKey((current) => current + 1);
  }, [isInView, prefersReducedMotion]);

  const inspectedNode = useMemo(
    () => architecture.nodes.find((node) => node.id === inspectedNodeId),
    [architecture.nodes, inspectedNodeId],
  );

  const activeLayer = useMemo(
    () => layers.find((layer) => layer.id === activeLayerId),
    [activeLayerId, layers],
  );

  const resetPreview = () => {
    setActiveLayerId(lockedLayerId ?? preferredLayerId ?? initialLayerId);
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "min-w-0 overflow-hidden border border-white/[0.08] bg-[#060606]",
        className,
      )}
      data-project-reveal
    >
      <header className="flex min-h-14 items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[#ccff00]">
            Architecture explorer
          </p>
          <p className="mt-1 truncate text-xs text-white/36">
            {activeLayer?.description ?? "Inspect the system topology"}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex min-h-10 shrink-0 items-center gap-2 border border-white/[0.1] px-3 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/48 outline-none transition-colors duration-200 hover:border-[#ccff00]/45 hover:text-[#ccff00] focus-visible:ring-1 focus-visible:ring-[#ccff00] disabled:cursor-not-allowed disabled:opacity-35"
          onClick={() => {
            setPlayKey((current) => current + 1);
            setInspectedNodeId(null);
          }}
          disabled={Boolean(prefersReducedMotion)}
          aria-label="Replay system execution trace"
        >
          <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
          Replay
        </button>
      </header>

      <LayerSelector
        layers={layers}
        activeLayerId={activeLayerId}
        lockedLayerId={lockedLayerId}
        onPreview={setActiveLayerId}
        onCommit={(layerId) => {
          const nextLockedLayer = lockedLayerId === layerId ? null : layerId;
          setLockedLayerId(nextLockedLayer);
          setActiveLayerId(layerId);
          setInspectedNodeId(null);
        }}
        onReset={resetPreview}
      />

      <ArchitectureDiagram
        architecture={architecture}
        activeLayerId={activeLayerId}
        playKey={playKey}
        traceActive={Boolean(prefersReducedMotion) || isInView}
        reducedMotion={Boolean(prefersReducedMotion)}
        highlightedNodeIds={highlightedNodeIds}
        inspectedNodeId={inspectedNodeId}
        onInspectNode={setInspectedNodeId}
      />

      <div
        className="grid min-h-24 border-t border-white/[0.08] sm:grid-cols-[0.8fr_1.2fr]"
      >
        <div className="border-b border-white/[0.08] px-4 py-4 sm:border-b-0 sm:border-r sm:px-5">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white/28">
            Inspection state
          </p>
          <p className="mt-2 text-sm font-medium text-white/82">
            {inspectedNode ? inspectedNode.label : "Select a system node"}
          </p>
        </div>
        <div className="px-4 py-4 sm:px-5">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white/28">
            Responsibility
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#a1a1aa]">
            {inspectedNode
              ? inspectedNode.responsibility
              : "Focus, hover, or tap a node to inspect its role and system boundary."}
          </p>
          {inspectedNode?.boundary ? (
            <p className="mt-2 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-[#7c3aed]">
              Boundary / {inspectedNode.boundary}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
