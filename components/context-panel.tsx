import { ArrowUpRight, CheckCircle2, Link2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { KnowledgeArea } from "@/lib/types";

export function ContextPanel({ area }: { area: KnowledgeArea }) {
  return (
    <aside className="rounded-2xl border border-white/[.065] bg-white/[.025] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge tone="muted">{area.type}</Badge>
          <h3 className="mt-3 text-[18px] font-medium text-foreground">{area.name}</h3>
          <p className="mt-2 text-[12px] leading-5 text-subtle">
            Strukturierter Kontext aus {area.sources} Quellen. Leqra prüft Qualität,
            Aktualität und Beziehungen.
          </p>
        </div>
        <span className="font-mono text-[20px] text-foreground">{area.readiness}%</span>
      </div>

      <div className="mt-6 space-y-4">
        <Metric label="Qualität" value={`${area.quality}%`} />
        <Metric label="Aktualität" value={area.freshness} />
        <Metric label="Quellen" value={`${area.sources}`} />
      </div>

      <div className="mt-6">
        <p className="mb-3 text-[12px] font-medium text-muted">Beziehungen</p>
        <div className="flex flex-wrap gap-2">
          {area.relations.map((relation) => (
            <Badge key={relation} tone="default">
              {relation}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-[12px] font-medium text-muted">Offene Lücken</p>
        <div className="space-y-2">
          {area.gaps.map((gap) => (
            <div key={gap} className="flex items-start gap-2 text-[12px] leading-5 text-subtle">
              <Search className="mt-0.5 shrink-0" size={14} strokeWidth={1.5} />
              {gap}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 grid gap-2">
        <Button variant="primary">
          Für Assistant freigeben
          <CheckCircle2 size={14} strokeWidth={1.5} />
        </Button>
        <Button variant="secondary">
          Kontext verbessern
          <ArrowUpRight size={14} strokeWidth={1.5} />
        </Button>
        <Button variant="ghost">
          Quellen ansehen
          <Link2 size={14} strokeWidth={1.5} />
        </Button>
      </div>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[.055] pb-3 text-[12px]">
      <span className="text-subtle">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
