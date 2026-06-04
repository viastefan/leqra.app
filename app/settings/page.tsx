"use client";

import { Monitor, Moon, Palette, Sun } from "lucide-react";
import { WorkspaceSymbolPicker } from "@/components/workspace-symbol-picker";
import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Accent } from "@/lib/types";

const themes = [
  { id: "dark", label: "Dark", icon: Moon },
  { id: "light", label: "Light", icon: Sun },
  { id: "system", label: "System", icon: Monitor },
] as const;

const accents: Accent[] = ["mono", "mint", "violet", "blue", "amber"];

export default function SettingsPage() {
  const { theme, accent, setTheme, setAccent } = useWorkspaceStore();

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-[38px] font-medium tracking-[-0.04em] sm:text-[48px]">Settings</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
          Workspace-Symbol, Appearance und ruhige Akzentfarben für Leqra.
        </p>
      </div>

      <section className="mt-10">
        <div className="mb-5 flex items-center gap-3">
          <Palette size={18} strokeWidth={1.5} className="text-muted" />
          <h2 className="text-[20px] font-medium tracking-[-0.02em]">Workspace Symbol</h2>
        </div>
        <WorkspaceSymbolPicker />
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/[.065] bg-white/[.025] p-5">
          <p className="text-[13px] font-medium text-foreground">Appearance</p>
          <p className="mt-1 text-[12px] text-subtle">Primär Dark Mode, Light ist vorbereitet.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {themes.map((item) => {
              const Icon = item.icon;
              const active = theme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTheme(item.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-3 py-2 text-[12px] transition",
                    active
                      ? "border-accent/45 bg-accent/10 text-foreground"
                      : "border-white/[.07] text-subtle hover:border-white/[.14] hover:text-foreground",
                  )}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[.065] bg-white/[.025] p-5">
          <p className="text-[13px] font-medium text-foreground">Accent</p>
          <p className="mt-1 text-[12px] text-subtle">Standard bleibt Mono. Farbe nur sparsam.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {accents.map((item) => (
              <Button
                key={item}
                variant={accent === item ? "primary" : "secondary"}
                size="sm"
                onClick={() => setAccent(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
