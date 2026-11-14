import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/stock-transfers')({
  component: StockTransfersComponent,
});


function StockTransfersComponent() {
  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Stock Transfers</h1><p className="text-muted-foreground mt-1 text-sm">Inter-warehouse inventory relocation and transit auditing.</p></div>
        <div className="p-5 rounded-2xl border border-border bg-card text-xs text-muted-foreground">Active Transfers: Queens Central Hub to Bronx Cross-Dock (50 Units SKU-PLT-01).</div>
    </main>
  );
}
