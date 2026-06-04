"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Bot,
  CircleHelp,
  Database,
  FileText,
  Gauge,
  Layers3,
  Network,
  Search,
  Settings,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";
import { CommandMenu } from "@/components/command-menu";
import { WorkspaceSymbol } from "@/components/workspace-symbol";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/lib/store";

const nav = [
  { label: "Overview", href: "/dashboard", icon: Gauge },
  { label: "Sources", href: "/sources", icon: Database },
  { label: "Memory", href: "/memory", icon: Network },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Processes", href: "/processes", icon: Workflow },
  { label: "Search", href: "/search", icon: Search },
  { label: "Assistants", href: "/assistants", icon: Bot },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [commandOpen, setCommandOpen] = useState(false);
  const {
    workspaceName,
    theme,
    accent,
    symbolSeed,
    symbolVariant,
    symbolColor,
  } = useWorkspaceStore();

  const themeClass = theme === "light" ? "theme-light" : "";
  const accentClass = accent === "mono" ? "" : `accent-${accent}`;

  const title = useMemo(() => {
    const current = nav.find((item) => pathname.startsWith(item.href));
    if (pathname.startsWith("/settings")) return "Settings";
    return current?.label ?? "Leqra";
  }, [pathname]);

  return (
    <div className={cn("min-h-screen bg-background text-foreground", themeClass, accentClass)}>
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[248px_1fr]">
        <aside className="hidden border-r border-white/[.06] bg-black/[.13] px-3 py-4 lg:block">
          <div className="flex h-full flex-col">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/[.045]"
            >
              <WorkspaceSymbol
                seed={symbolSeed}
                variant={symbolVariant}
                colorScheme={symbolColor}
                size={34}
                active
              />
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium text-foreground">
                  {workspaceName}
                </span>
                <span className="block text-[11px] text-subtle">Company Memory</span>
              </span>
            </Link>

            <nav className="mt-6 space-y-1">
              {nav.map((item) => {
                const active = pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition",
                      active
                        ? "bg-white/[.075] text-foreground"
                        : "text-muted hover:bg-white/[.045] hover:text-foreground",
                    )}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-1">
              <Link
                href="/settings"
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition",
                  pathname.startsWith("/settings")
                    ? "bg-white/[.075] text-foreground"
                    : "text-muted hover:bg-white/[.045] hover:text-foreground",
                )}
              >
                <Settings size={16} strokeWidth={1.5} />
                Settings
              </Link>
              <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-muted transition hover:bg-white/[.045] hover:text-foreground">
                <CircleHelp size={16} strokeWidth={1.5} />
                Help
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[.055] bg-background/82 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="lg:hidden">
                <WorkspaceSymbol
                  seed={symbolSeed}
                  variant={symbolVariant}
                  colorScheme={symbolColor}
                  size={34}
                  active
                />
              </Link>
              <div>
                <p className="text-[13px] font-medium text-foreground">{title}</p>
                <p className="hidden text-[11px] text-subtle sm:block">
                  Leqra macht Unternehmenswissen KI-bereit.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                className="hidden min-w-[190px] justify-start border border-white/[.07] bg-white/[.025] text-subtle hover:border-white/[.12] sm:inline-flex"
                onClick={() => setCommandOpen(true)}
              >
                <Search size={15} strokeWidth={1.5} />
                <span className="flex-1 text-left">Suchen oder wechseln</span>
                <kbd className="rounded-md bg-white/[.06] px-1.5 py-0.5 font-mono text-[10px] text-subtle">
                  ⌘K
                </kbd>
              </Button>
              <Link href="/dashboard?analyze=1">
                <Button variant="primary" size="sm">
                  <Layers3 size={14} strokeWidth={1.5} />
                  Analyse
                </Button>
              </Link>
            </div>
          </header>

          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="px-4 py-7 sm:px-6 lg:px-8 lg:py-9"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
