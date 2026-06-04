import { GitBranch, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProcessItem } from "@/lib/types";

const toneByStatus = {
  Unvollständig: "warning",
  Dokumentiert: "default",
  "KI-ready": "success",
  Neu: "muted",
  Indexiert: "default",
  "Kontext fehlt": "warning",
  Duplikat: "warning",
  Veraltet: "danger",
  Bereit: "success",
  Prüfung: "warning",
} as const;

export function ProcessRow({
  process,
  active,
  onSelect,
}: {
  process: ProcessItem;
  active?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="grid w-full gap-4 border-b border-white/[.055] py-5 text-left transition hover:bg-white/[.025] lg:grid-cols-[1fr_auto]"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[15px] font-medium text-foreground">{process.name}</h3>
          <Badge tone={toneByStatus[process.status]}>{process.status}</Badge>
        </div>
        <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted">{process.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {process.steps.slice(0, 4).map((step) => (
            <span key={step} className="rounded-full bg-white/[.045] px-2.5 py-1 text-[11px] text-subtle">
              {step}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 lg:justify-end">
        <span className="flex items-center gap-1.5 text-[11px] text-subtle">
          <GitBranch size={13} strokeWidth={1.5} />
          {process.sources} Quellen
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-subtle">
          <UserRound size={13} strokeWidth={1.5} />
          {process.roles.length} Rollen
        </span>
        <Button variant={active ? "primary" : "secondary"} size="sm">
          Prüfen
        </Button>
      </div>
    </button>
  );
}
