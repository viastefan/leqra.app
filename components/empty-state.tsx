import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  action,
  secondary,
}: {
  title: string;
  description: string;
  action: string;
  secondary?: string;
}) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[.08] bg-white/[.035] text-muted">
        <Database size={20} strokeWidth={1.5} />
      </div>
      <h3 className="text-[18px] font-medium text-foreground">{title}</h3>
      <p className="mt-2 max-w-[420px] text-[13px] leading-6 text-subtle">{description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Button variant="primary">{action}</Button>
        {secondary ? <Button variant="ghost">{secondary}</Button> : null}
      </div>
    </div>
  );
}
