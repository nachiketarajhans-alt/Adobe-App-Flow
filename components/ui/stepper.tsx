"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <React.Fragment key={index}>
              <motion.div
                className="flex flex-col items-center flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                    "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]",
                    "shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]",
                    isCompleted &&
                      "bg-[var(--color-neon-purple)] dark:bg-[var(--color-neon-red)] text-white",
                    isCurrent &&
                      "shadow-[var(--shadow-neomorph-light),0_0_15px_var(--color-neon-purple)] dark:shadow-[var(--shadow-neomorph-dark),0_0_15px_var(--color-neon-red)] border-2 border-[var(--color-neon-purple)] dark:border-[var(--color-neon-red)]",
                    isPending && "opacity-50"
                  )}
                  animate={
                    isCurrent
                      ? {
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            "0 0 15px var(--color-neon-purple), 0 0 30px var(--color-neon-purple)",
                            "0 0 25px var(--color-neon-purple), 0 0 40px var(--color-neon-purple)",
                            "0 0 15px var(--color-neon-purple), 0 0 30px var(--color-neon-purple)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: isCurrent ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <span
                      className={cn(
                        "font-semibold",
                        isCurrent &&
                          "text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]"
                      )}
                    >
                      {stepNumber}
                    </span>
                  )}
                </motion.div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium text-center",
                    isCurrent &&
                      "text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]",
                    isCompleted && "text-foreground",
                    isPending && "text-muted-foreground"
                  )}
                >
                  {step}
                </span>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-all duration-300",
                    stepNumber < currentStep
                      ? "bg-[var(--color-neon-purple)] dark:bg-[var(--color-neon-red)]"
                      : "bg-border"
                  )}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: stepNumber < currentStep ? 1 : 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export { Stepper };

