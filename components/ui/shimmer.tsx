"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerProps extends React.ComponentProps<"div"> {
  variant?: "default" | "gradient";
}

export function Shimmer({ className, variant = "gradient", ...props }: ShimmerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]",
        "shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]",
        className
      )}
      {...props}
    >
      {variant === "gradient" && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[var(--color-neon-purple)]/20 dark:via-[var(--color-neon-red)]/20 to-transparent" />
      )}
      <div className="relative z-10">{props.children}</div>
    </div>
  );
}

