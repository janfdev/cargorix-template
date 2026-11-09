"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { SiteHeader } from "./SiteHeader";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [variant, setVariant] = useState<"default" | "inset" | "floating">("inset");

  useEffect(() => {
    // Read saved theme settings
    const saved = localStorage.getItem("cargorix_theme_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.sidebarMode === "icon") setCollapsed(true);
        if (parsed.sidebarVariant) setVariant(parsed.sidebarVariant);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-slot="sidebar-wrapper"
      data-variant={variant}
      style={{ "--sidebar-width": "16rem", "--sidebar-width-icon": "4rem" } as React.CSSProperties}
      className="group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full"
    >
      <div className="flex h-full w-full min-w-0">
        {/* Sidebar */}
        <AppSidebar collapsed={collapsed} variant={variant} />

        {/* Main Content Inset */}
        <main
          data-slot="sidebar-inset"
          className="relative w-full md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-2xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 bg-muted flex min-w-0 flex-1 flex-col overflow-y-auto"
        >
          {/* Site Header */}
          <SiteHeader onToggleSidebar={toggleSidebar} />

          {/* Page Content */}
          <div className="flex-1 w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
