"use client";

import type { KnowledgeArea } from "@/lib/types";
import { cn } from "@/lib/utils";

export function KnowledgeAreaList({
  areas,
  selectedId,
  onSelect,
}: {
  areas: KnowledgeArea[];
  selectedId: string;
  onSelect: (area: KnowledgeArea) => void;
}) {
  return (
    <div className="space-y-1">
      {areas.map((area) => {
        const active = area.id === selectedId;
        return (
          <button
            key={area.id}
            type="button"
            onClick={() => onSelect(area)}
            className={cn(
              "grid w-full grid-cols-[1fr_auto] gap-3 rounded-xl px-3 py-3 text-left transition",
              active ? "bg-white/[.07]" : "hover:bg-white/[.04]",
            )}
          >
            <span>
              <span className="block text-[13px] font-medium text-foreground">{area.name}</span>
              <span className="mt-1 block text-[11px] text-subtle">
                {area.sources} Quellen · {area.freshness}
              </span>
            </span>
            <span className="font-mono text-[11px] text-muted">{area.readiness}%</span>
          </button>
        );
      })}
    </div>
  );
}
