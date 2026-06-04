import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { DocumentItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const toneByStatus = {
  Neu: "muted",
  Indexiert: "default",
  "Kontext fehlt": "warning",
  Duplikat: "warning",
  Veraltet: "danger",
  Bereit: "success",
  Prüfung: "warning",
  Unvollständig: "warning",
  Dokumentiert: "default",
  "KI-ready": "success",
} as const;

export function DocumentRow({ document }: { document: DocumentItem }) {
  return (
    <div className="grid gap-3 border-b border-white/[.055] py-4 transition hover:bg-white/[.025] md:grid-cols-[1.4fr_.8fr_.55fr_.7fr_.55fr] md:items-center">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[.045] text-muted">
          <FileText size={16} strokeWidth={1.5} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-foreground">{document.title}</p>
          <p className="mt-1 text-[11px] text-subtle md:hidden">{document.source}</p>
        </div>
      </div>
      <span className="hidden text-[12px] text-muted md:block">{document.source}</span>
      <span className="hidden text-[12px] text-muted md:block">{document.type}</span>
      <Badge tone={toneByStatus[document.status]} className="w-fit">
        {document.status}
      </Badge>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-20 overflow-hidden rounded-full bg-white/[.06]">
          <span
            className={cn(
              "block h-full rounded-full",
              document.quality > 85
                ? "bg-emerald-300/80"
                : document.quality > 70
                  ? "bg-amber-300/80"
                  : "bg-red-300/70",
            )}
            style={{ width: `${document.quality}%` }}
          />
        </span>
        <span className="font-mono text-[11px] text-subtle">{document.quality}%</span>
      </div>
    </div>
  );
}
