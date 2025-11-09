"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { playClickSound } from "@/lib/audio-feedback"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        "neon-glow":
          "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)] border-0 hover:shadow-[var(--shadow-neomorph-light),0_0_15px_var(--color-neon-purple)] dark:hover:shadow-[var(--shadow-neomorph-dark),0_0_15px_var(--color-neon-red)]",
        primary:
          "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)] border-0 hover:shadow-[var(--shadow-neomorph-light),0_0_10px_var(--color-neon-purple)] dark:hover:shadow-[var(--shadow-neomorph-dark),0_0_10px_var(--color-neon-red)]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    if (onClick) {
      onClick(e);
    }
  };

  const buttonElement = (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    />
  );

  if (asChild) {
    return buttonElement;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={variant === "primary" || variant === "neon-glow" ? {
        filter: [
          "drop-shadow(0 0 10px var(--color-neon-purple))",
          "drop-shadow(0 0 20px var(--color-neon-purple)) drop-shadow(0 0 30px var(--color-neon-purple))",
          "drop-shadow(0 0 10px var(--color-neon-purple))",
        ],
      } : {}}
      transition={{
        filter: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="inline-block"
    >
      {buttonElement}
    </motion.div>
  );
}

export { Button, buttonVariants }
