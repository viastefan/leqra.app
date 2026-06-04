import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-[13px] font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-foreground/20 disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accentText hover:opacity-90",
        secondary:
          "border border-white/[.09] bg-white/[.035] text-foreground hover:border-white/[.14] hover:bg-white/[.06]",
        ghost: "text-muted hover:bg-white/[.06] hover:text-foreground",
        danger:
          "border border-red-400/20 bg-red-400/10 text-red-200 hover:bg-red-400/15",
      },
      size: {
        sm: "h-8 rounded-lg px-3 text-[12px]",
        md: "h-10 rounded-xl px-4 text-[13px]",
        lg: "h-12 rounded-[14px] px-5 text-[14px]",
        icon: "h-9 w-9 rounded-xl p-0",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);

Button.displayName = "Button";
