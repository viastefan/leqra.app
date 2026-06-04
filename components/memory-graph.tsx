"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { KnowledgeArea } from "@/lib/types";

const positions = [
  { x: 50, y: 50 },
  { x: 22, y: 32 },
  { x: 76, y: 34 },
  { x: 28, y: 70 },
  { x: 70, y: 72 },
  { x: 50, y: 20 },
  { x: 50, y: 84 },
];

export function MemoryGraph({
  areas,
  selectedId,
  onSelect,
}: {
  areas: KnowledgeArea[];
  selectedId?: string;
  onSelect?: (area: KnowledgeArea) => void;
}) {
  const selected = areas.find((area) => area.id === selectedId) ?? areas[0];

  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-2xl border border-white/[.065] bg-white/[.025]">
      <div className="graph-grid absolute inset-0 opacity-70" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {areas.slice(1).map((area, index) => {
          const from = positions[0];
          const to = positions[index + 1];
          return (
            <motion.line
              key={area.id}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(255,255,255,.18)"
              strokeWidth="0.18"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.85, delay: index * 0.08 }}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0">
        {areas.slice(0, positions.length).map((area, index) => {
          const position = positions[index];
          const active = selected.id === area.id;
          return (
            <motion.button
              key={area.id}
              type="button"
              onClick={() => onSelect?.(area)}
              className={cn(
                "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border px-4 py-3 text-center transition",
                active
                  ? "border-accent/45 bg-accent/12 shadow-[0_0_40px_rgba(255,255,255,.09)]"
                  : "border-white/[.08] bg-[#09090b]/85 hover:border-white/[.14] hover:bg-white/[.055]",
              )}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.07 }}
              whileHover={{ y: -2 }}
            >
              <span className="text-[12px] font-medium text-foreground">{area.name}</span>
              <span className="mt-1 font-mono text-[10px] text-subtle">{area.readiness}% ready</span>
            </motion.button>
          );
        })}
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-white/[.06] bg-black/25 px-4 py-3 backdrop-blur-xl">
        <span className="text-[12px] text-muted">Memory Core</span>
        <span className="font-mono text-[11px] text-subtle">
          {areas.length} Bereiche · {areas.reduce((sum, area) => sum + area.sources, 0)} Quellen
        </span>
      </div>
    </div>
  );
}
