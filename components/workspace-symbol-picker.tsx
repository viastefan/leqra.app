"use client";

import { RefreshCw } from "lucide-react";
import { WorkspaceSymbol } from "@/components/workspace-symbol";
import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/lib/store";
import type { SymbolColor, SymbolVariant } from "@/lib/types";
import { cn } from "@/lib/utils";

const variants: SymbolVariant[] = [
  "cell",
  "cluster",
  "map",
  "signal",
  "artifact",
  "orbit",
  "grid",
  "pixel",
];

const colors: SymbolColor[] = ["mint", "violet", "blue", "amber", "rose", "mono", "cyan"];

export function WorkspaceSymbolPicker() {
  const { symbolSeed, symbolVariant, symbolColor, setSymbol } = useWorkspaceStore();
  const symbols = Array.from({ length: 60 }, (_, index) => {
    const variant = variants[index % variants.length];
    const color = colors[(index + Math.floor(index / variants.length)) % colors.length];
    return {
      seed: `leqra-${index}-${variant}`,
      variant,
      color,
    };
  });

  return (
    <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
      <div className="rounded-2xl border border-white/[.065] bg-white/[.025] p-5">
        <p className="text-[12px] font-medium text-muted">Aktuelles Workspace Symbol</p>
        <div className="mt-6 flex items-center justify-center">
          <WorkspaceSymbol
            seed={symbolSeed}
            variant={symbolVariant}
            colorScheme={symbolColor}
            size={120}
            active
          />
        </div>
        <Button
          className="mt-6 w-full"
          variant="secondary"
          onClick={() =>
            setSymbol({
              seed: `random-${Date.now()}`,
              variant: variants[Math.floor(Math.random() * variants.length)],
              color: colors[Math.floor(Math.random() * colors.length)],
            })
          }
        >
          <RefreshCw size={14} strokeWidth={1.5} />
          Zufällig generieren
        </Button>
        <div className="mt-6">
          <p className="mb-3 text-[12px] font-medium text-muted">Farbe</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSymbol({ color })}
                className={cn(
                  "h-8 w-8 rounded-full border transition",
                  symbolColor === color ? "border-white/60" : "border-white/[.08]",
                )}
                aria-label={`Farbe ${color}`}
              >
                <WorkspaceSymbol
                  seed={`color-${color}`}
                  variant="cell"
                  colorScheme={color}
                  size={30}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-[15px] font-medium text-foreground">Symbolauswahl</h3>
            <p className="mt-1 text-[12px] text-subtle">
              Abstrakte Datenartefakte für Workspaces, Teams und Datenräume.
            </p>
          </div>
          <span className="font-mono text-[11px] text-subtle">60 Varianten</span>
        </div>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-10">
          {symbols.map((symbol) => {
            const active =
              symbolSeed === symbol.seed &&
              symbolVariant === symbol.variant &&
              symbolColor === symbol.color;
            return (
              <button
                key={`${symbol.seed}-${symbol.variant}-${symbol.color}`}
                type="button"
                onClick={() =>
                  setSymbol({
                    seed: symbol.seed,
                    variant: symbol.variant,
                    color: symbol.color,
                  })
                }
                className={cn(
                  "flex aspect-square items-center justify-center rounded-2xl border transition hover:bg-white/[.05]",
                  active ? "border-accent/50 bg-accent/10" : "border-white/[.055] bg-white/[.015]",
                )}
              >
                <WorkspaceSymbol
                  seed={symbol.seed}
                  variant={symbol.variant}
                  colorScheme={symbol.color}
                  size={36}
                  active={active}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
