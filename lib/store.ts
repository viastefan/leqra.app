"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Accent, SymbolColor, SymbolVariant } from "@/lib/types";

type Theme = "dark" | "light" | "system";

type WorkspaceState = {
  workspaceName: string;
  theme: Theme;
  accent: Accent;
  symbolSeed: string;
  symbolVariant: SymbolVariant;
  symbolColor: SymbolColor;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
  setSymbol: (payload: {
    seed?: string;
    variant?: SymbolVariant;
    color?: SymbolColor;
  }) => void;
};

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspaceName: "Stefan GmbH",
      theme: "dark",
      accent: "mono",
      symbolSeed: "stefan-gmbh-core",
      symbolVariant: "artifact",
      symbolColor: "mint",
      setTheme: (theme) => set({ theme }),
      setAccent: (accent) => set({ accent }),
      setSymbol: (payload) =>
        set((state) => ({
          symbolSeed: payload.seed ?? state.symbolSeed,
          symbolVariant: payload.variant ?? state.symbolVariant,
          symbolColor: payload.color ?? state.symbolColor,
        })),
    }),
    {
      name: "leqra-workspace",
      partialize: (state) => ({
        theme: state.theme,
        accent: state.accent,
        symbolSeed: state.symbolSeed,
        symbolVariant: state.symbolVariant,
        symbolColor: state.symbolColor,
      }),
    },
  ),
);
