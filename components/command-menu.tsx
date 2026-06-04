"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bot,
  Database,
  FileText,
  Gauge,
  Layers3,
  Network,
  Search,
  Settings,
  Workflow,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const items = [
  { label: "Overview", href: "/dashboard", icon: Gauge, hint: "Company Memory" },
  { label: "Sources", href: "/sources", icon: Database, hint: "Quellen verbinden" },
  { label: "Memory", href: "/memory", icon: Network, hint: "Wissensgraph" },
  { label: "Documents", href: "/documents", icon: FileText, hint: "Wissensobjekte" },
  { label: "Processes", href: "/processes", icon: Workflow, hint: "Abläufe erkennen" },
  { label: "Search", href: "/search", icon: Search, hint: "Intern suchen" },
  { label: "Assistants", href: "/assistants", icon: Bot, hint: "Kontext bereitstellen" },
  { label: "Settings", href: "/settings", icon: Settings, hint: "Workspace" },
  { label: "Analyse starten", href: "/dashboard?analyze=1", icon: Layers3, hint: "Kontext strukturieren" },
];

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange, open]);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(normalized) ||
        item.hint.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 pt-[12vh] backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => onOpenChange(false)}
        >
          <motion.div
            className="w-full max-w-[620px] overflow-hidden rounded-2xl border border-white/[.08] bg-[#09090b]/95 shadow-soft"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="border-b border-white/[.07] px-4 py-3">
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Suche in Leqra..."
                className="h-11 w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-subtle"
              />
            </div>
            <div className="max-h-[420px] overflow-y-auto p-2">
              {filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href + item.label}
                    onClick={() => {
                      router.push(item.href);
                      onOpenChange(false);
                      setQuery("");
                    }}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition",
                      "hover:bg-white/[.055]",
                    )}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[.045] text-muted group-hover:text-foreground">
                      <Icon size={16} strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-foreground">{item.label}</span>
                      <span className="block truncate text-[12px] text-subtle">{item.hint}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
