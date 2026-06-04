"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, ArrowUpRight, FileText, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SearchResult = {
  answer: string;
  confidence: number;
  sources: string[];
  relatedItems: string[];
  gaps: string[];
};

const examples = [
  "Welche Leistungen bieten wir an?",
  "Wie läuft unser Angebotsprozess?",
  "Welche FAQs fehlen auf der Website?",
  "Welche Dokumente sind veraltet?",
  "Was weiß Leqra über Kunde X?",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const response = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const payload = (await response.json()) as SearchResult;
    window.setTimeout(() => {
      setResult(payload);
      setLoading(false);
    }, 420);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="text-[38px] font-medium tracking-[-0.04em] sm:text-[48px]">Search</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
          Fragen Sie Ihr Unternehmenswissen. Leqra zeigt Quellen, Vertrauen und Lücken.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10">
        <div className="flex items-center gap-3 rounded-2xl border border-white/[.08] bg-white/[.035] px-4 py-3 transition focus-within:border-white/[.16] sm:px-5 sm:py-4">
          <Search size={20} strokeWidth={1.5} className="text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Frage Ihr Unternehmenswissen..."
            className="min-w-0 flex-1 bg-transparent text-[17px] text-foreground outline-none placeholder:text-subtle"
          />
          <Button variant="primary" disabled={loading || !query.trim()}>
            {loading ? "Sucht" : "Suchen"}
          </Button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setQuery(example)}
            className="rounded-full border border-white/[.065] px-3 py-1.5 text-[12px] text-subtle transition hover:border-white/[.14] hover:text-foreground"
          >
            {example}
          </button>
        ))}
      </div>

      {result ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <section>
            <div className="rounded-2xl border border-white/[.065] bg-white/[.025] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <Badge tone={result.confidence > 80 ? "success" : "warning"}>
                  Vertrauensgrad {result.confidence}%
                </Badge>
                <span className="font-mono text-[11px] text-subtle">{result.sources.length} Quellen</span>
              </div>
              <p className="mt-5 text-[18px] leading-8 text-foreground">{result.answer}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                <Button variant="secondary" size="sm">
                  Als FAQ speichern
                </Button>
                <Button variant="ghost" size="sm">
                  Kontext verbessern
                </Button>
                <Button variant="ghost" size="sm">
                  Für Assistant freigeben
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </Button>
              </div>
            </div>

            <div className="mt-7">
              <h2 className="text-[18px] font-medium text-foreground">Quellen</h2>
              <div className="mt-3 divide-y divide-white/[.055]">
                {result.sources.map((source) => (
                  <div key={source} className="flex items-center justify-between py-3 text-[13px]">
                    <span className="flex items-center gap-3 text-foreground">
                      <FileText size={15} strokeWidth={1.5} className="text-muted" />
                      {source}
                    </span>
                    <Button variant="ghost" size="sm">
                      Öffnen
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-white/[.065] bg-white/[.025] p-5">
            <p className="text-[12px] font-medium text-muted">Verwandte Inhalte</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.relatedItems.map((item) => (
                <Badge key={item} tone="default">
                  {item}
                </Badge>
              ))}
            </div>

            <p className="mt-7 text-[12px] font-medium text-muted">Offene Lücken</p>
            <div className="mt-3 space-y-3">
              {result.gaps.map((gap) => (
                <div key={gap} className="flex items-start gap-2 text-[12px] leading-5 text-subtle">
                  <AlertCircle size={14} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                  {gap}
                </div>
              ))}
            </div>
          </aside>
        </div>
      ) : (
        <div className="mt-14 border-t border-white/[.055] pt-8 text-[13px] leading-6 text-muted">
          Leqra antwortet nur mit Quellenlage. Wenn Informationen widersprüchlich sind,
          wird das sichtbar gemacht.
        </div>
      )}
    </div>
  );
}
