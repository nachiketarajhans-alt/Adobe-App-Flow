"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { VibeModeToggle } from "@/components/vibe-mode-toggle";
import { cn } from "@/lib/utils";

export interface NavbarProps extends React.ComponentProps<"nav"> {
  logo?: React.ReactNode;
  logoText?: string | React.ReactNode;
  rightContent?: React.ReactNode;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, logo, logoText = "Neon Edit", rightContent, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full",
          "bg-[var(--color-bg-light)]/80 dark:bg-[var(--color-bg-dark)]/80",
          "backdrop-blur-md",
          "border-b border-border/50",
          "shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {logo || (
              <span className="text-xl font-bold bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-purple)]/60 dark:from-[var(--color-neon-red)] dark:to-[var(--color-neon-red)]/60 bg-clip-text text-transparent">
                {logoText || "Neon Edit"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            {rightContent}
            <VibeModeToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";

export { Navbar };

