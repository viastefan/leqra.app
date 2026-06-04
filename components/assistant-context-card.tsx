import { Bot, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AssistantContext } from "@/lib/types";

const toneByStatus = {
  Entwurf: "muted",
  Prüfung: "warning",
  Freigegeben: "success",
} as const;

export function AssistantContextCard({ assistant }: { assistant: AssistantContext }) {
  return (
    <div className="border-b border-white/[.055] py-5 transition hover:bg-white/[.025]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[.045] text-muted">
            <Bot size={18} strokeWidth={1.5} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[15px] font-medium text-foreground">{assistant.name}</h3>
              <Badge tone={toneByStatus[assistant.status]}>{assistant.status}</Badge>
            </div>
            <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted">{assistant.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {assistant.areas.map((area) => (
                <Badge key={area} tone="default">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-2 sm:min-w-[170px]">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-subtle">Qualität</span>
            <span className="font-mono text-foreground">{assistant.quality}%</span>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-subtle">Quellen</span>
            <span className="font-mono text-foreground">{assistant.sources}</span>
          </div>
          <Button variant="secondary" size="sm">
            <ShieldCheck size={14} strokeWidth={1.5} />
            Kontext prüfen
          </Button>
        </div>
      </div>
    </div>
  );
}
