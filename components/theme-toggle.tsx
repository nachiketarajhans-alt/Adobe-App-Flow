"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="relative h-10 w-10 rounded-lg bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border-0 shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]"
      >
        <div className="h-4 w-4" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-lg bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border-0 shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)] transition-all duration-300 hover:shadow-[var(--shadow-neomorph-light),0_0_20px_var(--color-neon-purple)] dark:hover:shadow-[var(--shadow-neomorph-dark),0_0_20px_var(--color-neon-purple)]"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

