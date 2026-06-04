"use client";

import { useState } from "react";
import { Link, Plus } from "lucide-react";
import { ImportModal } from "@/components/import-modal";
import { SourceConnector } from "@/components/source-connector";
import { Button } from "@/components/ui/button";
import { sources } from "@/lib/mock-data";
import type { Source } from "@/lib/types";

export default function SourcesPage() {
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openSource(source: Source) {
    setSelectedSource(source);
    setModalOpen(true);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[38px] font-medium tracking-[-0.04em] sm:text-[48px]">Sources</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
            Verbinden Sie die Orte, an denen Unternehmenswissen entsteht.
          </p>
        </div>
        <Button variant="primary" onClick={() => openSource(sources[0])}>
          <Plus size={16} strokeWidth={1.5} />
          Quelle verbinden
        </Button>
      </div>

      <div className="mt-10 rounded-2xl border border-white/[.065] bg-white/[.015] p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-2 px-1 text-[12px] text-subtle">
          <Link size={14} strokeWidth={1.5} />
          Kontrollierte Imports · kein fremdes Modelltraining
        </div>
        {sources.map((source) => (
          <SourceConnector key={source.id} source={source} onConnect={openSource} />
        ))}
      </div>

      <ImportModal source={selectedSource} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
