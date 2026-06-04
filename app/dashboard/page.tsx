import { ArrowUpRight, Database, Network, ShieldCheck } from "lucide-react";
import { AIInput } from "@/components/ai-input";
import { Button } from "@/components/ui/button";
import { MemoryGraph } from "@/components/memory-graph";
import { SignalList } from "@/components/signal-list";
import { StatusMetric } from "@/components/status-metric";
import { knowledgeAreas, overviewMetrics, signals } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <h1 className="max-w-3xl text-[40px] font-medium leading-[1.04] tracking-[-0.045em] text-foreground sm:text-[56px]">
            Unternehmensgedächtnis
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
            Leqra erkennt, was verbunden ist, was fehlt und was für KI bereit ist.
          </p>
          <div className="mt-8">
            <AIInput />
          </div>
        </div>

        <div className="rounded-2xl border border-white/[.065] bg-white/[.025] p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[.045] text-muted">
              <ShieldCheck size={18} strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-[13px] font-medium text-foreground">KI-Bereitschaft</p>
              <p className="text-[12px] text-subtle">Support ist bereit für interne Suche.</p>
            </div>
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/[.06]">
            <div className="h-full w-[82%] rounded-full bg-accent" />
          </div>
          <div className="mt-4 flex items-center justify-between text-[12px] text-muted">
            <span>Geprüfter Kontext</span>
            <span className="font-mono text-foreground">82%</span>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
        {overviewMetrics.map((metric) => (
          <StatusMetric key={metric.label} value={metric.value} label={metric.label} />
        ))}
      </section>

      <section className="mt-14 grid gap-10 xl:grid-cols-[1fr_420px]">
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[21px] font-medium tracking-[-0.02em]">Was Leqra erkannt hat</h2>
              <p className="mt-2 text-[13px] text-muted">
                Signale aus Quellen, Dokumenten und Wissensbereichen.
              </p>
            </div>
            <Button variant="ghost" size="sm">
              Alle Signale
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </Button>
          </div>
          <SignalList signals={signals} />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[21px] font-medium tracking-[-0.02em]">Memory Graph</h2>
              <p className="mt-2 text-[13px] text-muted">Quellen verbinden sich zu Kontext.</p>
            </div>
            <Network size={18} strokeWidth={1.5} className="text-subtle" />
          </div>
          <MemoryGraph areas={knowledgeAreas.slice(0, 5)} selectedId="services" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <SmallSignal icon={Database} title="Quelle" value="Drive synchron" />
            <SmallSignal icon={ShieldCheck} title="Kontext" value="Support bereit" />
          </div>
        </div>
      </section>
    </div>
  );
}

function SmallSignal({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Database;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[.06] bg-white/[.025] p-4">
      <Icon size={16} strokeWidth={1.5} className="text-muted" />
      <p className="mt-3 text-[12px] text-subtle">{title}</p>
      <p className="mt-1 text-[13px] font-medium text-foreground">{value}</p>
    </div>
  );
}
