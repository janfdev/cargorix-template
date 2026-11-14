# Cargorix Fullstack TanStack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Cargorix into a production-grade fullstack logistics platform powered by TanStack Start, TanStack Router, TanStack Table v8, TanStack Virtual, TanStack Query v5, and Drizzle ORM (SQLite).

**Architecture:** Fullstack Vite + Nitro server application via `@tanstack/react-start`. Server functions (`createServerFn`) provide type-safe RPCs to a local SQLite database managed by Drizzle ORM. Client uses TanStack Router file-based routing, TanStack Table + Virtual for 60 FPS logistics data grids, TanStack Query for live GPS radar polling, and preserves 100% of Shadcn UI + Theme Customizer (12 OKLCH presets).

**Tech Stack:** 
- Fullstack Framework: `@tanstack/react-start` + Vite + Nitro
- Router: `@tanstack/react-router`
- Data Caching & Polling: `@tanstack/react-query`
- Headless Data Grid: `@tanstack/react-table` + `@tanstack/react-virtual`
- Database & ORM: `drizzle-orm` + `better-sqlite3`
- Styling: Tailwind CSS + Lucide React + Shadcn UI tokens (OKLCH lime green `#9de500`)

## Global Constraints
- Isomorphic by default: Database queries and server secrets MUST be inside `createServerFn()`. Never call DB directly in route loaders.
- TanStack Router coordinator pattern: Set `defaultPreloadStaleTime: 0` so TanStack Query controls data freshness.
- No Next.js artifacts: No `"use server"`, no `app/layout.tsx`. Root shell lives in `src/routes/__root.tsx`.
- Zero broken routes: All 24 Cargorix routes must be mapped and functional.
- Zero horizontal overflow: Layouts must respect responsive viewports.

---

### Task 1: Package Dependencies & Vite / TanStack Start Setup
**Files:**
- Modify: `package.json`
- Create: `vite.config.ts`
- Create: `src/router.tsx`
- Create: `src/start.ts`
- Create: `src/routes/__root.tsx`

- [ ] **Step 1: Install TanStack Start, Router, Query, Table, Virtual, and Drizzle packages**
- [ ] **Step 2: Configure `vite.config.ts` with `@tanstack/react-start/plugin/vite` and Tailwind**
- [ ] **Step 3: Setup `src/router.tsx` with request-scoped `QueryClient` and `defaultPreloadStaleTime: 0`**
- [ ] **Step 4: Create `src/routes/__root.tsx` document shell with `<HeadContent />`, `<Outlet />`, and `<Scripts />`**
- [ ] **Step 5: Verify build initialization**

---

### Task 2: Database Schema & Seed Data (Drizzle + SQLite)
**Files:**
- Create: `src/db/schema.ts`
- Create: `src/db/index.ts`
- Create: `src/db/seed.ts`

- [ ] **Step 1: Define Drizzle schema for `orders`, `shipments`, `fleet_vehicles`, `drivers`, `warehouses`, and `stock_ledger`**
- [ ] **Step 2: Initialize SQLite database client in `src/db/index.ts`**
- [ ] **Step 3: Seed database with realistic NYC logistics data (TRK-208, OR-2040, Bronx-Harlem-Queens routes)**
- [ ] **Step 4: Execute seed script and verify table counts**

---

### Task 3: Server Functions (Type-Safe RPCs via `createServerFn`)
**Files:**
- Create: `src/server/orders.ts`
- Create: `src/server/fleet.ts`
- Create: `src/server/shipments.ts`
- Create: `src/server/warehouse.ts`

- [ ] **Step 1: Implement `getOrdersList` & `updateOrderStatus` in `src/server/orders.ts`**
- [ ] **Step 2: Implement `getFleetVehicles` & `updateVehicleLocation` in `src/server/fleet.ts`**
- [ ] **Step 3: Implement `getShipmentManifest` in `src/server/shipments.ts`**
- [ ] **Step 4: Test server functions via unit self-check**

---

### Task 4: UI Shell, Sidebar & Theme Customizer Preservation
**Files:**
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/ThemeCustomizer.tsx`
- Create: `src/routes/_dashboard.tsx` (Layout route)

- [ ] **Step 1: Migrate Theme Customizer (12 OKLCH color presets, radius, fonts) to TanStack client state**
- [ ] **Step 2: Migrate Sidebar navigation linking all 24 routes using TanStack `<Link>`**
- [ ] **Step 3: Integrate Header with quick search and theme toggles**

---

### Task 5: 24 Routes Implementation with TanStack Table, Virtual & Query
**Files:**
- Create routes under `src/routes/_dashboard/`:
  - `index.tsx`, `live-map.tsx`, `live-map.$id.tsx`
  - `operations-overview.tsx`, `inventory-overview.tsx`
  - `orders.tsx`, `shipments.tsx`, `shipments.$id.tsx`
  - `fleet.tsx`, `drivers.tsx`, `route-planner.tsx`
  - `products.tsx`, `stock-ledger.tsx`, `purchase-orders.tsx`
  - `stock-transfers.tsx`, `stock-adjustments.tsx`, `warehouses.tsx`
  - `clients.tsx`, `suppliers.tsx`, `reports.tsx`
  - `settings.general.tsx`, `settings.team.tsx`, `settings.notifications.tsx`, `settings.activity.tsx`

- [ ] **Step 1: Build `/orders` using TanStack Table v8 + TanStack Virtual + Search Params**
- [ ] **Step 2: Build `/live-map` using TanStack Query live polling (GPS fleet telemetry)**
- [ ] **Step 3: Build `/stock-ledger` and `/shipments` with high-density data grid**
- [ ] **Step 4: Build remaining 20 overview, planning, and setting routes**

---

### Task 6: Build Verification, E2E Crawl & Git Commit
**Files:**
- Test runner: `scripts/verify-routes.ts`

- [ ] **Step 1: Run production build (`vite build` / `npm run build`)**
- [ ] **Step 2: Run crawl across all 24 routes verifying 200 OK and zero console crashes**
- [ ] **Step 3: Commit all changes to `tanstack-fullstack` branch and push to GitHub**
