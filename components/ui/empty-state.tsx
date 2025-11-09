"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CardContainer } from "@/components/ui/card-container";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <CardContainer
      variant="flat"
      className={cn("flex flex-col items-center justify-center py-16 px-8 text-center", className)}
    >
      {icon && (
        <div className="mb-6 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
        {title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </CardContainer>
  );
}

