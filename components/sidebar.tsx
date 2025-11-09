"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  FolderKanban,
  FileText,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export interface SidebarProps extends React.ComponentProps<"aside"> {
  items?: SidebarItem[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const defaultItems: SidebarItem[] = [
  {
    label: "Home",
    icon: <Home className="w-5 h-5" />,
    href: "/view-project",
  },
  {
    label: "Photos",
    icon: <FolderKanban className="w-5 h-5" />,
    href: "/view-project",
  },
  {
    label: "Collections",
    icon: <FileText className="w-5 h-5" />,
    href: "/reports",
  },
  {
    label: "Tune It Up",
    icon: <Settings className="w-5 h-5" />,
    href: "/settings",
  },
  {
    label: "My Vibe",
    icon: <User className="w-5 h-5" />,
    href: "/profile",
  },
];

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      items = defaultItems,
      collapsed: controlledCollapsed,
      onToggleCollapse,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname();
    const [internalCollapsed, setInternalCollapsed] = React.useState(false);
    const collapsed =
      controlledCollapsed !== undefined
        ? controlledCollapsed
        : internalCollapsed;
    const toggleCollapse =
      onToggleCollapse || (() => setInternalCollapsed(!internalCollapsed));

    // Determine active item based on current pathname
    // For /view-project, prioritize "Photos" over "Home"
    const itemsWithActive = items.map((item, index) => {
      const isActive = item.href === pathname;
      // If on /view-project, only make "Photos" (index 1) active, not "Home" (index 0)
      if (pathname === "/view-project" && item.label === "Home") {
        return { ...item, active: false };
      }
      return { ...item, active: isActive };
    });

    return (
      <aside
        ref={ref}
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)]",
          "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]",
          "shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]",
          "border-r border-border/50",
          "transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          className
        )}
        {...props}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            {!collapsed && (
              <span className="text-sm font-bold bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-purple)]/60 dark:from-[var(--color-neon-red)] dark:to-[var(--color-neon-red)]/60 bg-clip-text text-transparent">
                Your Vibe Menu
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="ml-auto h-8 w-8 rounded-lg"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {itemsWithActive.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={item.onClick}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3",
                  "text-sm font-medium transition-all duration-300",
                  "bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]",
                  "shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]",
                  "hover:shadow-[var(--shadow-neomorph-light),0_0_10px_var(--color-neon-purple)]",
                  "dark:hover:shadow-[var(--shadow-neomorph-dark),0_0_10px_var(--color-neon-red)]",
                  item.active &&
                    "shadow-[var(--shadow-neomorph-light),0_0_15px_var(--color-neon-purple)] dark:shadow-[var(--shadow-neomorph-dark),0_0_15px_var(--color-neon-red)] text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]",
                  collapsed && "justify-center px-2"
                )}
              >
                <span
                  className={cn(
                    "transition-colors",
                    item.active
                      ? "text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";

export { Sidebar };

