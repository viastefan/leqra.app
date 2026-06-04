"use client";

import { useState } from "react";
import { AlertCircle, GitBranch } from "lucide-react";
import { ProcessRow } from "@/components/process-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { processes } from "@/lib/mock-data";

export default function ProcessesPage() {
  const [selected, setSelected] = useState(processes[0]);

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-[38px] font-medium tracking-[-0.04em] sm:text-[48px]">Processes</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
          Wiederkehrende Abläufe, Regeln und Zuständigkeiten aus Ihrem Wissen erkannt.
        </p>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-white/[.065] bg-white/[.015] p-4 sm:p-5">
          {processes.map((process) => (
            <ProcessRow
              key={process.id}
              process={process}
              active={process.id === selected.id}
              onSelect={() => setSelected(process)}
            />
          ))}
        </div>

        <aside className="rounded-2xl border border-white/[.065] bg-white/[.025] p-5">
          <Badge tone="muted">Prozesswissen</Badge>
          <h2 className="mt-3 text-[20px] font-medium text-foreground">{selected.name}</h2>
          <p className="mt-2 text-[13px] leading-6 text-muted">{selected.description}</p>

          <div className="mt-6">
            <p className="mb-3 text-[12px] font-medium text-muted">Schrittfolge</p>
            <div className="space-y-3">
              {selected.steps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 text-[13px] text-foreground">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[.055] font-mono text-[11px] text-subtle">
                    {index + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="mb-3 text-[12px] font-medium text-muted">Offene Fragen</p>
            <div className="space-y-2">
              {selected.gaps.map((gap) => (
                <div key={gap} className="flex items-start gap-2 text-[12px] leading-5 text-subtle">
                  <AlertCircle size={14} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                  {gap}
                </div>
              ))}
            </div>
          </div>

          <Button className="mt-7 w-full" variant="secondary">
            <GitBranch size={14} strokeWidth={1.5} />
            Quellen prüfen
          </Button>
        </aside>
      </div>
    </div>
  );
}
