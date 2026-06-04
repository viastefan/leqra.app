import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "default" | "success" | "warning" | "danger" | "muted";

const toneClass: Record<BadgeTone, string> = {
  default: "bg-white/[.06] text-muted ring-white/[.08]",
  success: "bg-emerald-400/10 text-emerald-200 ring-emerald-300/15",
  warning: "bg-amber-400/10 text-amber-200 ring-amber-300/15",
  danger: "bg-red-400/10 text-red-200 ring-red-300/15",
  muted: "bg-white/[.035] text-subtle ring-white/[.06]",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
