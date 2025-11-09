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
        "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]",
      elevated:
        "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light),0_0_20px_rgba(196,0,255,0.1)] dark:shadow-[var(--shadow-neomorph-dark),0_0_20px_rgba(255,0,64,0.1)]",
      flat:
        "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-none border border-border/50",
      dark:
        "bg-[#282828] dark:bg-[#1A1A1A] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.1)]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-6 transition-all duration-300",
          variantClasses[variant],
          variant !== "dark" && "hover:shadow-[var(--shadow-neomorph-light),0_0_15px_var(--color-neon-purple)]",
          variant !== "dark" && "dark:hover:shadow-[var(--shadow-neomorph-dark),0_0_15px_var(--color-neon-red)]",
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

