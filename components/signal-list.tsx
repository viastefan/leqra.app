import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Signal } from "@/lib/types";

const signalIcon = {
  Hinweis: Info,
  Bereit: CheckCircle2,
  Prüfen: CircleDot,
  Kritisch: AlertCircle,
};

const signalTone = {
  Hinweis: "default",
  Bereit: "success",
  Prüfen: "warning",
  Kritisch: "danger",
} as const;

export function SignalList({ signals }: { signals: Signal[] }) {
  return (
    <div className="divide-y divide-white/[.055]">
      {signals.map((signal) => {
        const Icon = signalIcon[signal.status];
        return (
          <div
            key={signal.id}
            className="group grid grid-cols-[auto_1fr] gap-3 py-4 transition hover:bg-white/[.025] sm:grid-cols-[auto_1fr_auto_auto]"
          >
            <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/[.045] text-muted">
              <Icon size={16} strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-foreground">{signal.title}</p>
              <p className="mt-1 text-[12px] leading-5 text-subtle">{signal.detail}</p>
            </div>
            <Badge tone={signalTone[signal.status]} className="mt-1 w-fit self-start">
              {signal.status}
            </Badge>
            <Button size="sm" variant="ghost" className="col-start-2 w-fit sm:col-start-auto">
              Prüfen
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
