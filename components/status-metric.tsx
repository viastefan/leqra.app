import { cn } from "@/lib/utils";

export function StatusMetric({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-[120px]", className)}>
      <div className="text-[30px] font-medium leading-none tracking-[-0.02em] text-foreground sm:text-[34px]">
        {value}
      </div>
      <div className="mt-2 text-[12px] leading-5 text-subtle">{label}</div>
    </div>
  );
}
