"use client";

import { useMemo, useState } from "react";
import { Search, Upload } from "lucide-react";
import { DocumentRow } from "@/components/document-row";
import { Button } from "@/components/ui/button";
import { documents } from "@/lib/mock-data";

const filters = ["Alle", "Bereit", "Kontext fehlt", "Duplikat", "Veraltet"];

export default function DocumentsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Alle");

  const filtered = useMemo(
    () =>
      documents.filter((document) => {
        const matchesFilter = filter === "Alle" || document.status === filter;
        const matchesQuery = document.title.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
      }),
    [filter, query],
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[38px] font-medium tracking-[-0.04em] sm:text-[48px]">Documents</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
            Dokumente werden als Wissensobjekte verstanden, nicht als Ablage.
          </p>
        </div>
        <Button variant="primary">
          <Upload size={16} strokeWidth={1.5} />
          Dokumente importieren
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex h-10 max-w-sm items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.025] px-3 text-muted">
          <Search size={15} strokeWidth={1.5} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Dokumente suchen..."
            className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-subtle"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-3 py-1.5 text-[12px] transition ${
                filter === item
                  ? "bg-white/[.09] text-foreground"
                  : "text-subtle hover:bg-white/[.045] hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/[.065] bg-white/[.015] p-4 sm:p-5">
        <div className="hidden grid-cols-[1.4fr_.8fr_.55fr_.7fr_.55fr] border-b border-white/[.055] pb-3 text-[11px] text-subtle md:grid">
          <span>Dokument</span>
          <span>Quelle</span>
          <span>Typ</span>
          <span>Status</span>
          <span>Kontextqualität</span>
        </div>
        {filtered.map((document) => (
          <DocumentRow key={document.id} document={document} />
        ))}
      </div>
    </div>
  );
}
