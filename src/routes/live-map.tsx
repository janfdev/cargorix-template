import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/live-map')({
  component: LiveMapComponent,
});


function LiveMapComponent() {
  const { data: fleet = [] } = useQuery({
    queryKey: ['live-map-vehicles'],
    queryFn: async () => {
      const res = await fetch('/api/fleet').catch(() => null);
      if (res && res.ok) return await res.json();
      return [];
    },
    refetchInterval: 3000
  });

  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Live Map & Radar</h1>
            <span className="rounded-full bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] px-2.5 py-0.5 text-xs font-mono font-bold">GPS Polling</span>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">Monitor active vehicles, routes and delivery coordinates in real time.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-4 min-h-[450px] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-muted/20 flex items-center justify-center font-mono text-muted-foreground">
            [ Interactive Leaflet NYC GPS Radar Vector Grid ]
          </div>
          <div className="relative z-10 flex gap-2">
            <span className="px-3 py-1 rounded-lg bg-background/90 text-xs font-mono border border-border">Active: {fleet.length} Trucks</span>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          <h3 className="font-bold text-sm">Active Vehicle Feeds</h3>
          <div className="space-y-2">
            {fleet.map((f: any) => (
              <div key={f.id} className="p-3 rounded-xl border border-border bg-background/50 space-y-1 text-xs">
                <div className="flex justify-between font-bold"><span>{f.id}</span><span className="text-[#9de500] font-mono">{f.eta}</span></div>
                <p className="text-muted-foreground">{f.driver}</p>
                <p className="text-[11px] font-mono text-muted-foreground truncate">{f.route}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
