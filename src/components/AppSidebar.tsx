"use client";

import React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  MapPin,
  Activity,
  Boxes,
  ShoppingBag,
  Truck,
  Car,
  Users,
  Route,
  Package,
  FileText,
  ClipboardList,
  ArrowLeftRight,
  Sliders,
  Warehouse,
  Building2,
  Factory,
  BarChart3,
  Settings,
  UserCheck,
  Bell,
  History,
} from "lucide-react";

const MENU_GROUPS = [
  {
    title: "Overview",
    items: [
      { name: "Live Map", path: "/live-map", icon: MapPin },
      { name: "Operations Overview", path: "/operations-overview", icon: Activity },
      { name: "Inventory Overview", path: "/inventory-overview", icon: Boxes },
    ],
  },
  {
    title: "Orders",
    items: [
      { name: "Orders", path: "/orders", icon: ShoppingBag, badge: "128" },
      { name: "Shipments", path: "/shipments", icon: Truck, badge: "44" },
    ],
  },
  {
    title: "Fleet",
    items: [
      { name: "Fleet", path: "/fleet", icon: Car },
      { name: "Drivers", path: "/drivers", icon: Users },
    ],
  },
  {
    title: "Planner",
    items: [
      { name: "Route Planner", path: "/route-planner", icon: Route },
    ],
  },
  {
    title: "Inventory",
    items: [
      { name: "Products", path: "/products", icon: Package },
      { name: "Stock Ledger", path: "/stock-ledger", icon: FileText },
      { name: "Purchase Orders", path: "/purchase-orders", icon: ClipboardList },
      { name: "Stock Transfer", path: "/stock-transfers", icon: ArrowLeftRight },
      { name: "Stock Adjustment", path: "/stock-adjustments", icon: Sliders },
    ],
  },
  {
    title: "Warehouses",
    items: [
      { name: "Warehouses", path: "/warehouses", icon: Warehouse },
    ],
  },
  {
    title: "Business",
    items: [
      { name: "Clients", path: "/clients", icon: Building2 },
      { name: "Suppliers", path: "/suppliers", icon: Factory },
      { name: "Reports", path: "/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Settings",
    items: [
      { name: "General", path: "/settings/general", icon: Settings },
      { name: "Team & Users", path: "/settings/team", icon: UserCheck },
      { name: "Notifications", path: "/settings/notifications", icon: Bell },
      { name: "Activity Log", path: "/settings/activity", icon: History },
    ],
  },
];

export function AppSidebar({
  collapsed = false,
  variant = "inset",
}: {
  collapsed?: boolean;
  variant?: "default" | "inset" | "floating";
}) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <aside
      data-slot="sidebar"
      data-state={collapsed ? "collapsed" : "expanded"}
      data-variant={variant}
      className={`group peer flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear z-30 shrink-0 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <Link to="/live-map" className="flex items-center gap-3 font-semibold overflow-hidden">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#9de500] text-[#161b1d] font-bold shadow-sm">
            <Truck className="size-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold tracking-tight text-foreground">Cargorix</span>
              <span className="text-[11px] font-mono text-muted-foreground">Logistic Template</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Menus */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {MENU_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            {!collapsed && (
              <h5 className="px-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 font-medium">
                {group.title}
              </h5>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.path || (item.path !== "/" && pathname?.startsWith(item.path));
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path as any}
                      title={item.name}
                      data-active={isActive ? "true" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-[#9de500] text-[#161b1d] font-semibold shadow-sm"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      } ${collapsed ? "justify-center px-0" : ""}`}
                    >
                      <Icon className="size-4 shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-1 items-center justify-between truncate">
                          <span className="truncate">{item.name}</span>
                          {item.badge && (
                            <span
                              className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                                isActive ? "bg-black/20 text-[#161b1d]" : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Sidebar Footer User Profile */}
      <div className="border-t border-sidebar-border p-3">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : "px-2"}`}>
          <div className="size-8 rounded-full bg-muted flex items-center justify-center font-mono font-bold text-xs text-foreground shrink-0 border border-border">
            EB
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-medium text-foreground truncate">Ethan Brooks</span>
              <span className="text-[10px] text-muted-foreground truncate">Fleet Operations Lead</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
