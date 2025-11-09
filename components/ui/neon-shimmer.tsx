"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NeonShimmerProps extends React.ComponentProps<"div"> {
  text?: string;
  variant?: "default" | "gradient";
}

export function NeonShimmer({
  className,
  text,
  variant = "gradient",
  children,
  ...props
}: NeonShimmerProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {variant === "gradient" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-neon-purple)]/30 dark:via-[var(--color-neon-red)]/30 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
      {text ? (
        <span
          className={cn(
            "relative z-10 bg-gradient-to-r from-[var(--color-neon-purple)] via-[var(--color-neon-purple)]/60 to-[var(--color-neon-purple)] dark:from-[var(--color-neon-red)] dark:via-[var(--color-neon-red)]/60 dark:to-[var(--color-neon-red)] bg-clip-text text-transparent font-bold"
          )}
        >
          {text}
        </span>
      ) : (
        <div className="relative z-10">{children}</div>
      )}
    </div>
  );
}

