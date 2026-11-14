import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/operations-overview')({
  component: OperationsOverviewComponent,
});


function OperationsOverviewComponent() {
  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Operations Overview</h1>
            <span className="rounded-full bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] px-2.5 py-0.5 text-xs font-mono font-bold">Aggregated Metrics</span>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">Fleet utilization, delivery performance, and warehouse logistics telemetry.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm"><p className="text-xs text-muted-foreground">On-Time Rate</p><p className="text-3xl font-bold font-mono mt-1">98.4%</p></div>
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm"><p className="text-xs text-muted-foreground">Active Trips</p><p className="text-3xl font-bold font-mono mt-1 text-[#9de500]">16</p></div>
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm"><p className="text-xs text-muted-foreground">Fleet Capacity Used</p><p className="text-3xl font-bold font-mono mt-1">74.2%</p></div>
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm"><p className="text-xs text-muted-foreground">Open Incidents</p><p className="text-3xl font-bold font-mono mt-1 text-emerald-500">0</p></div>
      </div>
    </main>
  );
}
