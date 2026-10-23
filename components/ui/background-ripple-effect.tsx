"use client";

import { useMemo, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

// Official Aceternity UI Background Ripple Effect.
// Source: https://ui.aceternity.com/registry/background-ripple-effect.json
// Adapted to a controlled decorative field. Window events in InteractiveBackground
// supply the clicked cell, so this layer never captures links, buttons or text.
export type RippleCell = { row: number; col: number };

type BackgroundRippleEffectProps = {
  rows?: number;
  cols?: number;
  cellSize?: number;
  clickedCell?: RippleCell | null;
  rippleKey?: number;
  className?: string;
  cellClassName?: string;
};

export function BackgroundRippleEffect({
  rows = 8,
  cols = 27,
  cellSize = 56,
  clickedCell = null,
  rippleKey = 0,
  className,
  cellClassName,
}: BackgroundRippleEffectProps) {
  return <DivGrid key={rippleKey} rows={rows} cols={cols} cellSize={cellSize}
    clickedCell={clickedCell} className={className} cellClassName={cellClassName} />;
}

type CellStyle = CSSProperties & { "--delay"?: string; "--duration"?: string };

function DivGrid({ rows, cols, cellSize, clickedCell, className, cellClassName }: Omit<BackgroundRippleEffectProps, "rippleKey"> & { rows: number; cols: number; cellSize: number }) {
  const cells = useMemo(() => Array.from({ length: rows * cols }, (_, index) => index), [rows, cols]);
  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
  };

  return <div className={cn("pointer-events-none", className)} style={gridStyle} data-ripple-field>
    {cells.map(index => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const distance = clickedCell ? Math.hypot(clickedCell.row - row, clickedCell.col - col) : 0;
      const delay = clickedCell ? Math.max(0, distance * 55) : 0;
      const duration = 200 + distance * 80;
      const style: CellStyle = { "--delay": `${delay}ms`, "--duration": `${duration}ms` };
      return <div key={index} className={cellClassName} style={style} data-ripple-cell data-ripple-active={Boolean(clickedCell)} />;
    })}
  </div>;
}
