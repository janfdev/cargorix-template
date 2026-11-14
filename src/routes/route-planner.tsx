import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/route-planner')({
  component: RoutePlannerComponent,
});


function RoutePlannerComponent() {
  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Route Planner</h1>
        <p className="text-muted-foreground mt-1 text-sm">Sequence multi-stop delivery routes, calculate distance matrix, and dispatch fleet.</p>
      </div>
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <h3 className="font-bold text-sm">New Route Formulation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div><label className="text-muted-foreground">Origin Hub</label><input type="text" defaultValue="Queens Central Hub" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" /></div>
          <div><label className="text-muted-foreground">Destination Corridors</label><input type="text" defaultValue="Bronx - Harlem - Queens" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" /></div>
          <div><label className="text-muted-foreground">Assigned Truck</label><input type="text" defaultValue="TRK-208 (Freightliner)" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" /></div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#9de500] text-[#161b1d] font-bold text-xs">Calculate & Dispatch Route</button>
      </div>
    </main>
  );
}
