"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Layers3 } from "lucide-react";
import { AnalyzeOverlay } from "@/components/analyze-overlay";

export function AIInput() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("analyze") === "1") {
      setOpen(true);
    }
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-3 rounded-2xl border border-white/[.08] bg-white/[.035] px-4 py-3 text-left transition hover:border-white/[.14] hover:bg-white/[.055] sm:px-5 sm:py-4"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[.05] text-muted">
          <Layers3 size={18} strokeWidth={1.5} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-medium text-foreground">
            Beschreiben Sie, was Leqra verstehen soll...
          </span>
          <span className="mt-1 block text-[12px] text-subtle">
            Unternehmen, Quellen, Prozesse oder erste Ziele nennen.
          </span>
        </span>
        <ArrowRight
          size={17}
          strokeWidth={1.5}
          className="text-subtle transition group-hover:translate-x-0.5 group-hover:text-foreground"
        />
      </button>
      <AnalyzeOverlay open={open} onOpenChange={setOpen} />
    </>
  );
}
