"use client";

import { useState } from "react";
import { ContextPanel } from "@/components/context-panel";
import { KnowledgeAreaList } from "@/components/knowledge-area-list";
import { MemoryGraph } from "@/components/memory-graph";
import { knowledgeAreas } from "@/lib/mock-data";

export default function MemoryPage() {
  const [selected, setSelected] = useState(knowledgeAreas[0]);

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-[38px] font-medium tracking-[-0.04em] sm:text-[48px]">Memory</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
          Das strukturierte Unternehmenswissen, auf dem Ihre KI später arbeitet.
        </p>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[280px_1fr_330px]">
        <aside>
          <p className="mb-3 text-[12px] font-medium text-muted">Wissensbereiche</p>
          <KnowledgeAreaList
            areas={knowledgeAreas}
            selectedId={selected.id}
            onSelect={setSelected}
          />
        </aside>

        <MemoryGraph
          areas={knowledgeAreas}
          selectedId={selected.id}
          onSelect={(area) => setSelected(area)}
        />

        <ContextPanel area={selected} />
      </div>
    </div>
  );
}
