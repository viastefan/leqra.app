"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Layers3, Sparkles, X } from "lucide-react";
import { sources } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AnalyzeResult = {
  summary: string;
  recommendedSources: string[];
  knowledgeAreas: string[];
  contextGaps: string[];
  nextSteps: string[];
};

const steps = [
  {
    title: "Sammeln",
    items: ["PDFs", "Website", "CRM", "Drive", "E-Mail", "Notion"],
  },
  {
    title: "Ordnen",
    items: ["Begriffe", "Prozesse", "FAQs", "Quellen", "Regeln"],
  },
  {
    title: "Prüfen",
    items: ["Duplikate", "Veraltete Inhalte", "Fehlende Quellen", "Widersprüche"],
  },
  {
    title: "Bereitstellen",
    items: ["AI-ready Context", "Internal Search", "Assistant Context", "Knowledge API"],
  },
];

export function AnalyzeOverlay({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [text, setText] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>(["website", "drive", "support"]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  const activeSources = useMemo(
    () => sources.filter((source) => selectedSources.includes(source.id)),
    [selectedSources],
  );

  async function runAnalysis() {
    setLoading(true);
    setResult(null);
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, selectedSources }),
    });
    const payload = (await response.json()) as AnalyzeResult;
    window.setTimeout(() => {
      setResult(payload);
      setLoading(false);
    }, 720);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/62 px-4 py-8 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/[.08] bg-[#08090d] shadow-soft lg:grid-cols-[1.05fr_.95fr]"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl text-muted transition hover:bg-white/[.06] hover:text-foreground"
              aria-label="Schließen"
            >
              <X size={17} strokeWidth={1.5} />
            </button>

            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[.06] text-foreground">
                <Layers3 size={20} strokeWidth={1.5} />
              </div>
              <h2 className="mt-6 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
                Was soll Leqra strukturieren?
              </h2>
              <p className="mt-3 max-w-[560px] text-[14px] leading-6 text-muted">
                Beschreiben Sie das Unternehmen, nennen Sie Quellen und legen Sie fest,
                welcher Kontext zuerst entstehen soll.
              </p>

              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Beschreiben Sie, was Leqra verstehen soll..."
                className="mt-7 min-h-[150px] w-full resize-none rounded-2xl border border-white/[.08] bg-white/[.035] p-4 text-[14px] leading-6 text-foreground outline-none transition placeholder:text-subtle focus:border-white/[.16]"
              />

              <div className="mt-5">
                <p className="mb-3 text-[12px] font-medium text-muted">Quellen für die erste Analyse</p>
                <div className="flex flex-wrap gap-2">
                  {sources.slice(0, 8).map((source) => {
                    const active = selectedSources.includes(source.id);
                    return (
                      <button
                        key={source.id}
                        type="button"
                        onClick={() =>
                          setSelectedSources((current) =>
                            active
                              ? current.filter((id) => id !== source.id)
                              : [...current, source.id],
                          )
                        }
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-[12px] transition",
                          active
                            ? "border-accent/45 bg-accent/12 text-foreground"
                            : "border-white/[.08] text-subtle hover:border-white/[.14] hover:text-foreground",
                        )}
                      >
                        {source.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-2">
                <Button variant="primary" size="lg" onClick={runAnalysis} disabled={loading}>
                  <Sparkles size={16} strokeWidth={1.5} />
                  {loading ? "Analyse läuft" : "Analyse starten"}
                </Button>
                <Button variant="ghost" size="lg" onClick={() => onOpenChange(false)}>
                  Später
                </Button>
              </div>
            </div>

            <div className="overflow-y-auto border-t border-white/[.07] bg-white/[.025] p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div className="grid gap-3">
                {steps.map((step, index) => (
                  <div key={step.title} className="rounded-2xl border border-white/[.065] bg-black/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[.05] font-mono text-[11px] text-muted">
                          {index + 1}
                        </span>
                        <p className="text-[13px] font-medium text-foreground">{step.title}</p>
                      </div>
                      <div className="h-px flex-1 origin-left animate-pulse-line bg-white/[.16]" />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.items.map((item) => (
                        <Badge key={item} tone="muted">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/[.065] bg-black/15 p-4">
                <p className="text-[12px] font-medium text-muted">Aktive Quellen</p>
                <div className="mt-3 space-y-2">
                  {activeSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between text-[12px]">
                      <span className="text-foreground">{source.name}</span>
                      <span className="text-subtle">{source.imported} Inhalte</span>
                    </div>
                  ))}
                </div>
              </div>

              {result ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-2xl border border-emerald-300/15 bg-emerald-400/5 p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 text-emerald-200" size={17} strokeWidth={1.5} />
                    <div>
                      <p className="text-[13px] font-medium text-foreground">Erste Struktur erstellt</p>
                      <p className="mt-1 text-[12px] leading-5 text-muted">{result.summary}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 text-[12px] text-muted">
                    <p>Wissensbereiche: {result.knowledgeAreas.join(", ")}</p>
                    <p>Nächster Schritt: {result.nextSteps[0]}</p>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
