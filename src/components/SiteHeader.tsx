"use client";

import React, { useState, useEffect } from "react";
import { 
  PanelLeft, 
  Search, 
  Sun, 
  Moon, 
  RefreshCw, 
  ShieldCheck, 
  Command,
  X
} from "lucide-react";
import { ThemeCustomizer } from "./ThemeCustomizer";

export function SiteHeader({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) {
  const [isDark, setIsDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newDark = !root.classList.contains("dark");
    if (newDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
      setIsDark(false);
    }
  };

  // Keyboard shortcut cmd+k / ctrl+k for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 w-full shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Left: Sidebar Toggle & Search */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle Sidebar"
            onClick={onToggleSidebar}
            className="flex size-8 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            <PanelLeft className="size-4" />
          </button>

          {/* Search button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="relative flex h-8 w-48 sm:w-64 items-center justify-between rounded-md border border-input bg-muted/50 px-2.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <span className="flex items-center gap-2">
              <Search className="size-3.5" />
              <span>Type to search...</span>
            </span>
            <kbd className="hidden sm:inline-flex h-4 items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-[9px]">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right: Actions & Theme */}
        <div className="flex items-center gap-2">
          {/* Roles Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-xs font-mono text-secondary-foreground border border-border">
            <ShieldCheck className="size-3.5 text-emerald-500" />
            <span>Roles & Permissions</span>
          </div>

          {/* Refresh */}
          <button
            type="button"
            aria-label="Refresh"
            onClick={() => window.location.reload()}
            className="flex size-9 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            <RefreshCw className="size-4" />
          </button>

          {/* Theme Customizer Popover */}
          <ThemeCustomizer />

          {/* Theme Toggle (Light/Dark) */}
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="flex size-9 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </header>

      {/* Global Search Command Dialog */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl p-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Search className="size-4 text-muted-foreground" />
              <input
                type="text"
                autoFocus
                placeholder="Search orders, shipments, fleet, warehouses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="size-6 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="pt-3 max-h-72 overflow-y-auto space-y-1 text-xs">
              <p className="text-[11px] font-mono text-muted-foreground px-2 py-1 uppercase">Quick Navigation</p>
              {[
                { name: "Live Map", path: "/live-map" },
                { name: "Operations Overview", path: "/operations-overview" },
                { name: "Orders", path: "/orders" },
                { name: "Shipments", path: "/shipments" },
                { name: "Fleet Management", path: "/fleet" },
                { name: "Drivers", path: "/drivers" },
                { name: "Warehouses", path: "/warehouses" },
                { name: "Inventory Overview", path: "/inventory-overview" },
              ]
                .filter((item) => !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between rounded-lg px-2.5 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <span>{item.name}</span>
                    <span className="font-mono text-muted-foreground">{item.path}</span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
