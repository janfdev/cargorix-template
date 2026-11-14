import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/stock-adjustments')({
  component: StockAdjustmentsComponent,
});


function StockAdjustmentsComponent() {
  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Stock Adjustments</h1><p className="text-muted-foreground mt-1 text-sm">Cycle count variances and inventory write-offs.</p></div>
      <div className="p-5 rounded-2xl border border-border bg-card text-xs text-muted-foreground">Zero variance recorded during today's physical warehouse count.</div>
    </main>
  );
}
