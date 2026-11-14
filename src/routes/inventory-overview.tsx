import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/inventory-overview')({
  component: InventoryOverviewComponent,
});


function InventoryOverviewComponent() {
  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory Overview</h1>
        <p className="text-muted-foreground mt-1 text-sm">Real-time stock levels, low-stock threshold alerts, and warehouse distribution.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card"><p className="text-xs text-muted-foreground">Total SKUs Tracked</p><p className="text-2xl font-bold font-mono mt-1">1,420</p></div>
        <div className="p-5 rounded-2xl border border-border bg-card"><p className="text-xs text-muted-foreground">Stock Value</p><p className="text-2xl font-bold font-mono mt-1">$4,850,200</p></div>
        <div className="p-5 rounded-2xl border border-border bg-card"><p className="text-xs text-muted-foreground">Reorder Alerts</p><p className="text-2xl font-bold font-mono mt-1 text-amber-500">3 SKUs</p></div>
      </div>
    </main>
  );
}
