"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardContainerProps extends React.ComponentProps<"div"> {
  variant?: "default" | "elevated" | "flat" | "dark";
}

const CardContainer = React.forwardRef<HTMLDivElement, CardContainerProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantClasses = {
      default:
        "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-border/60 dark:border-border/40 shadow-[var(--shadow-card-light)] dark:shadow-[var(--shadow-card-dark)]",
      elevated:
        "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border-2 border-border/80 dark:border-border/50 shadow-[var(--shadow-card-light),0_0_20px_rgba(196,0,255,0.15)] dark:shadow-[var(--shadow-card-dark),0_0_20px_rgba(255,0,64,0.15)]",
      flat:
        "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-none border-2 border-border/80 dark:border-border/50",
      dark:
        "bg-card border-2 border-border/80 dark:border-border/50 shadow-[var(--shadow-card-light)] dark:shadow-[var(--shadow-card-dark)]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-6 transition-all duration-300",
          variantClasses[variant],
          variant !== "dark" && "hover:shadow-[var(--shadow-card-hover-light)] hover:border-[var(--color-neon-purple)]/40",
          variant !== "dark" && "dark:hover:shadow-[var(--shadow-card-hover-dark)] dark:hover:border-[var(--color-neon-red)]/50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContainer.displayName = "CardContainer";

export { CardContainer };

