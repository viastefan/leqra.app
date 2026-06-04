"use client";

import { cn, hashSeed } from "@/lib/utils";
import type { SymbolColor, SymbolVariant } from "@/lib/types";

const palettes: Record<SymbolColor, string[]> = {
  mint: ["#7CF4C3", "#47C9A7", "#D7FFF1"],
  violet: ["#C4A7FF", "#7B61FF", "#F0E8FF"],
  blue: ["#8ED4FF", "#4C8DFF", "#E2F3FF"],
  amber: ["#FFD28A", "#FF9F45", "#FFF0C7"],
  rose: ["#FFB3C7", "#F05E86", "#FFE5EC"],
  mono: ["#FAFAFA", "#A1A1AA", "#52525B"],
  cyan: ["#8AF5FF", "#3BC4D7", "#E7FCFF"],
};

function pick(seed: number, index: number, max: number) {
  return (seed * (index + 11) + index * 17) % max;
}

export function WorkspaceSymbol({
  seed,
  variant,
  colorScheme,
  size,
  active = false,
  className,
}: {
  seed: string;
  variant: SymbolVariant;
  colorScheme: SymbolColor;
  size: number;
  active?: boolean;
  className?: string;
}) {
  const hash = hashSeed(`${seed}-${variant}-${colorScheme}`);
  const palette = palettes[colorScheme];
  const cells = Array.from({ length: 18 }, (_, index) => {
    const x = 8 + pick(hash, index, 38);
    const y = 8 + pick(hash >> 3, index, 38);
    const w = 3 + pick(hash >> 5, index, 8);
    const h = 3 + pick(hash >> 7, index, 8);
    const opacity = 0.32 + pick(hash >> 9, index, 58) / 100;
    return { x, y, w, h, opacity, color: palette[index % palette.length] };
  });

  const strokeColor = palette[pick(hash, 2, palette.length)];
  const accentColor = palette[pick(hash, 4, palette.length)];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[.08] bg-white/[.04]",
        active && "ring-2 ring-accent/40",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 64 64" role="img">
        <defs>
          <radialGradient id={`glow-${hash}`} cx="35%" cy="20%" r="75%">
            <stop stopColor={palette[2]} stopOpacity="0.34" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`line-${hash}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={palette[0]} stopOpacity=".92" />
            <stop offset="1" stopColor={palette[1]} stopOpacity=".42" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" fill="url(#glow-${hash})" />
        {variant === "orbit" && (
          <>
            <ellipse
              cx="32"
              cy="32"
              rx="22"
              ry="10"
              fill="none"
              stroke={strokeColor}
              strokeOpacity=".68"
              strokeWidth="2"
              transform={`rotate(${pick(hash, 1, 60) - 30} 32 32)`}
            />
            <circle cx={18 + pick(hash, 1, 28)} cy={15 + pick(hash, 4, 28)} r="4" fill={accentColor} />
          </>
        )}
        {variant === "signal" && (
          <>
            {[0, 1, 2, 3].map((index) => (
              <path
                key={index}
                d={`M${12 + index * 9} 46 C ${18 + index * 7} ${15 + pick(hash, index, 18)}, ${29 + index * 5} ${18 + pick(hash, index + 2, 18)}, ${49 - index * 3} ${18 + index * 7}`}
                fill="none"
                stroke={`url(#line-${hash})`}
                strokeWidth="2"
                strokeLinecap="round"
                opacity={0.25 + index * 0.16}
              />
            ))}
          </>
        )}
        {variant === "map" && (
          <path
            d={`M13 ${16 + pick(hash, 1, 12)} L${24 + pick(hash, 2, 12)} 12 L${43 + pick(hash, 3, 9)} ${20 + pick(hash, 4, 12)} L${49} ${44 - pick(hash, 5, 10)} L${26 + pick(hash, 6, 12)} 51 L12 ${39 - pick(hash, 7, 10)} Z`}
            fill={`url(#line-${hash})`}
            opacity=".72"
          />
        )}
        {variant === "grid" && (
          <>
            {Array.from({ length: 4 }, (_, index) => (
              <line
                key={`v-${index}`}
                x1={16 + index * 10}
                y1="11"
                x2={16 + index * 10}
                y2="53"
                stroke={strokeColor}
                strokeOpacity=".22"
              />
            ))}
            {Array.from({ length: 4 }, (_, index) => (
              <line
                key={`h-${index}`}
                x1="11"
                y1={16 + index * 10}
                x2="53"
                y2={16 + index * 10}
                stroke={strokeColor}
                strokeOpacity=".22"
              />
            ))}
          </>
        )}
        {(variant === "cell" ||
          variant === "cluster" ||
          variant === "artifact" ||
          variant === "pixel" ||
          variant === "grid") &&
          cells.map((cell, index) => (
            <rect
              key={index}
              x={cell.x}
              y={cell.y}
              width={variant === "pixel" ? Math.min(cell.w, 5) : cell.w}
              height={variant === "pixel" ? Math.min(cell.h, 5) : cell.h}
              rx={variant === "artifact" ? 1 : 2}
              fill={cell.color}
              opacity={cell.opacity}
            />
          ))}
        {variant === "cluster" &&
          Array.from({ length: 8 }, (_, index) => (
            <circle
              key={`dot-${index}`}
              cx={15 + pick(hash, index, 34)}
              cy={15 + pick(hash >> 4, index, 34)}
              r={2 + pick(hash >> 6, index, 5)}
              fill={palette[index % palette.length]}
              opacity=".7"
            />
          ))}
      </svg>
    </span>
  );
}
