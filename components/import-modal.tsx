"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Shield, X } from "lucide-react";
import type { Source } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ImportResult = {
  importedCount: number;
  duplicates: number;
  detectedProcesses: number;
  faqCandidates: number;
  contextGaps: number;
  steps: string[];
};

export function ImportModal({
  source,
  open,
  onOpenChange,
}: {
  source: Source | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ImportResult | null>(null);

  useEffect(() => {
    if (!open) {
      window.setTimeout(() => {
        setStep(0);
        setProgress(0);
        setResult(null);
      }, 220);
    }
  }, [open]);

  async function startImport() {
    if (!source) return;
    setStep(3);
    setResult(null);
    setProgress(8);
    const response = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceType: source.type, sourceName: source.name }),
    });
    const payload = (await response.json()) as ImportResult;
    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 14, 100);
        if (next === 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setResult(payload), 320);
        }
        return next;
      });
    }, 220);
  }

  return (
    <AnimatePresence>
      {open && source ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/62 px-4 py-8 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/[.08] bg-[#08090d] shadow-soft"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
          >
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl text-muted transition hover:bg-white/[.06] hover:text-foreground"
              aria-label="Schließen"
            >
              <X size={17} strokeWidth={1.5} />
            </button>

            <div className="border-b border-white/[.06] p-6 sm:p-8">
              <p className="text-[12px] font-medium text-muted">Quelle verbinden</p>
              <h2 className="mt-2 text-[28px] font-medium tracking-[-0.03em]">
                {source.name} kontrolliert anbinden
              </h2>
              <p className="mt-3 max-w-[560px] text-[13px] leading-6 text-muted">
                Sie bestimmen, welche Inhalte angebunden werden. Leqra startet mit
                einem kontrollierten Datenumfang und nutzt nichts für fremdes Modelltraining.
              </p>
            </div>

            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[.8fr_1.2fr]">
              <div className="space-y-3">
                {["Quelle wählen", "Zugriff definieren", "Umfang prüfen", "Import starten"].map(
                  (label, index) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setStep(index)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/[.04]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[.055] font-mono text-[11px] text-muted">
                        {index + 1}
                      </span>
                      <span className={index === step ? "text-foreground" : "text-muted"}>
                        {label}
                      </span>
                    </button>
                  ),
                )}
              </div>

              <div className="min-h-[300px] rounded-2xl border border-white/[.065] bg-white/[.025] p-5">
                {step < 3 ? (
                  <div>
                    <Badge tone="muted">{source.type}</Badge>
                    <h3 className="mt-4 text-[17px] font-medium text-foreground">{source.name}</h3>
                    <p className="mt-2 text-[13px] leading-6 text-muted">{source.description}</p>
                    <div className="mt-6 grid gap-3 text-[12px] text-muted">
                      <div className="flex items-start gap-3">
                        <Shield size={16} strokeWidth={1.5} className="mt-0.5 text-foreground" />
                        <span>Zugriff wird begrenzt und kann jederzeit angepasst werden.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield size={16} strokeWidth={1.5} className="mt-0.5 text-foreground" />
                        <span>Leqra erkennt zunächst nur Struktur, Duplikate und Kontextlücken.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield size={16} strokeWidth={1.5} className="mt-0.5 text-foreground" />
                        <span>Sensible Inhalte können vor Assistant Context ausgeschlossen werden.</span>
                      </div>
                    </div>
                    <div className="mt-7 flex gap-2">
                      <Button
                        variant="primary"
                        onClick={() => setStep((current) => Math.min(current + 1, 3))}
                      >
                        Weiter
                      </Button>
                      <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        Abbrechen
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-[17px] font-medium text-foreground">
                      {result ? "Import-Ergebnis" : "Import läuft"}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-muted">
                      Dokumente werden gelesen, Begriffe vereinheitlicht und Kontext aufgebaut.
                    </p>
                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/[.06]">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-5 space-y-3">
                      {(result?.steps ?? [
                        "Dokumente werden gelesen",
                        "Duplikate werden erkannt",
                        "Begriffe werden vereinheitlicht",
                        "Kontext wird aufgebaut",
                      ]).map((item, index) => (
                        <div key={item} className="flex items-center gap-3 text-[12px] text-muted">
                          <CheckCircle2
                            size={15}
                            strokeWidth={1.5}
                            className={progress > index * 25 ? "text-emerald-200" : "text-subtle"}
                          />
                          {item}
                        </div>
                      ))}
                    </div>

                    {result ? (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 grid grid-cols-2 gap-3 text-[12px]"
                      >
                        <Result value={result.importedCount} label="Dokumente gefunden" />
                        <Result value={result.duplicates} label="Duplikate erkannt" />
                        <Result value={result.detectedProcesses} label="Prozesshinweise" />
                        <Result value={result.faqCandidates} label="FAQ-Kandidaten" />
                        <Result value={result.contextGaps} label="Unklare Quellen" />
                      </motion.div>
                    ) : (
                      <Button className="mt-7" variant="primary" onClick={startImport}>
                        Import starten
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Result({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl bg-white/[.045] p-3">
      <p className="text-[20px] font-medium text-foreground">{value}</p>
      <p className="mt-1 text-subtle">{label}</p>
    </div>
  );
}
