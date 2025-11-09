"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const Modal = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  className,
  contentClassName,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(
          "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]",
          "shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]",
          "border-2 border-[var(--color-neon-purple)]/20 dark:border-[var(--color-neon-red)]/20",
          "rounded-xl",
          "backdrop-blur-sm",
          "hover:border-[var(--color-neon-purple)]/40 dark:hover:border-[var(--color-neon-red)]/40",
          "hover:shadow-[var(--shadow-neomorph-light),0_0_25px_var(--color-neon-purple)]",
          "dark:hover:shadow-[var(--shadow-neomorph-dark),0_0_25px_var(--color-neon-red)]",
          "transition-all duration-300",
          contentClassName
        )}
      >
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle className="text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
                {title}
              </DialogTitle>
            )}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div className={cn("py-4", className)}>{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export { Modal };

