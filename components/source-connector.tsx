import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Database,
  FileText,
  Globe,
  Mail,
  MessageSquare,
  Table,
} from "lucide-react";
import type { Source, SourceStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const statusLabel: Record<SourceStatus, string> = {
  connected: "Verbunden",
  not_connected: "Nicht verbunden",
  needs_update: "Aktualisierung nötig",
  error: "Fehler",
};

const statusTone = {
  connected: "success",
  not_connected: "muted",
  needs_update: "warning",
  error: "danger",
} as const;

const sourceIcons: Record<string, typeof Database> = {
  website: Globe,
  drive: Database,
  notion: FileText,
  crm: Table,
  pdfs: FileText,
  mail: Mail,
  support: MessageSquare,
  m365: Database,
  slack: MessageSquare,
};

export function SourceConnector({
  source,
  onConnect,
}: {
  source: Source;
  onConnect: (source: Source) => void;
}) {
  const Icon = sourceIcons[source.id] ?? Database;
  const connected = source.status === "connected";
  return (
    <div className="group grid gap-4 border-b border-white/[.055] py-4 transition hover:bg-white/[.025] sm:grid-cols-[auto_1fr_auto] sm:items-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[.045] text-muted group-hover:text-foreground">
        <Icon size={18} strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[14px] font-medium text-foreground">{source.name}</h3>
          <Badge tone={statusTone[source.status]}>{statusLabel[source.status]}</Badge>
        </div>
        <p className="mt-1 max-w-2xl text-[12px] leading-5 text-subtle">{source.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-subtle">
          <span>{source.imported} Inhalte</span>
          <span className="flex items-center gap-1.5">
            {source.status === "error" ? (
              <AlertCircle size={12} strokeWidth={1.5} />
            ) : connected ? (
              <CheckCircle2 size={12} strokeWidth={1.5} />
            ) : (
              <Clock3 size={12} strokeWidth={1.5} />
            )}
            {source.lastSync}
          </span>
        </div>
      </div>
      <Button variant={connected ? "secondary" : "primary"} size="sm" onClick={() => onConnect(source)}>
        {connected ? "Verwalten" : "Verbinden"}
      </Button>
    </div>
  );
}
