"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface LoaderProps extends React.ComponentProps<"div"> {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "skeleton";
  message?: string;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = "md", variant = "spinner", message, ...props }, ref) => {
    if (variant === "skeleton") {
      return (
        <div
          ref={ref}
          className={cn("space-y-2", className)}
          {...props}
        >
          <Skeleton className="h-4 w-full rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]" />
          <Skeleton className="h-4 w-3/4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]" />
        </div>
      );
    }

    const sizeClasses = {
      sm: "h-4 w-4 border-2",
      md: "h-8 w-8 border-2",
      lg: "h-12 w-12 border-3",
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-3", className)}
        {...props}
      >
        <div
          className={cn(
            "rounded-full border-t-transparent border-r-transparent",
            "border-[var(--color-neon-purple)] dark:border-[var(--color-neon-red)]",
            "animate-spin",
            sizeClasses[size],
            "shadow-[0_0_10px_var(--color-neon-purple)] dark:shadow-[0_0_10px_var(--color-neon-red)]",
            "transition-all duration-300"
          )}
          style={{
            animation: "spin 1s linear infinite",
          }}
        />
        {message && (
          <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
        )}
      </div>
    );
  }
);

Loader.displayName = "Loader";

export { Loader };

