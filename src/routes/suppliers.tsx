import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/suppliers')({
  component: SuppliersComponent,
});


function SuppliersComponent() {
  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Suppliers</h1><p className="text-muted-foreground mt-1 text-sm">Packaging vendors, fuel partners, and procurement contracts.</p></div>
      <div className="p-5 rounded-2xl border border-border bg-card text-xs text-muted-foreground">4 Active Tier-1 Suppliers registered in supply chain network.</div>
    </main>
  );
}
