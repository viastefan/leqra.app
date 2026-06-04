import { CheckCircle2, Layers3, Shield } from "lucide-react";
import { AssistantContextCard } from "@/components/assistant-context-card";
import { Button } from "@/components/ui/button";
import { assistants } from "@/lib/mock-data";

export default function AssistantsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[38px] font-medium tracking-[-0.04em] sm:text-[48px]">Assistants</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
            Bereiten Sie geprüften Unternehmenskontext für interne Assistenten und Automationen vor.
          </p>
        </div>
        <Button variant="primary">
          <Layers3 size={16} strokeWidth={1.5} />
          Assistant Context erstellen
        </Button>
      </div>

      <div className="mt-10 rounded-2xl border border-white/[.065] bg-white/[.015] p-4 sm:p-5">
        {assistants.map((assistant) => (
          <AssistantContextCard key={assistant.id} assistant={assistant} />
        ))}
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Principle
          icon={Shield}
          title="Geprüfter Kontext"
          text="Sensible Inhalte werden ausgeschlossen, bevor Kontext freigegeben wird."
        />
        <Principle
          icon={CheckCircle2}
          title="Quellenklarheit"
          text="Jeder Assistant Context behält Quellen, Qualität und Aktualität sichtbar."
        />
        <Principle
          icon={Layers3}
          title="API-ready"
          text="Leqra stellt Kontext später für interne Suche, Automationen und Knowledge APIs bereit."
        />
      </section>
    </div>
  );
}

function Principle({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Shield;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[.06] bg-white/[.02] p-5">
      <Icon size={17} strokeWidth={1.5} className="text-muted" />
      <h3 className="mt-4 text-[14px] font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-[12px] leading-5 text-subtle">{text}</p>
    </div>
  );
}
