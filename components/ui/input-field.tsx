"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface InputFieldProps
  extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  helperText?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type = "text", label, error, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <Input
          id={inputId}
          ref={ref}
          type={type}
          className={cn(
            "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]",
            "shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]",
            "border-0 rounded-xl",
            "focus-visible:shadow-[var(--shadow-neomorph-light),0_0_15px_var(--color-neon-purple)]",
            "dark:focus-visible:shadow-[var(--shadow-neomorph-dark),0_0_15px_var(--color-neon-red)]",
            "focus-visible:ring-0",
            "transition-all duration-300",
            error && "aria-invalid border-destructive",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };

