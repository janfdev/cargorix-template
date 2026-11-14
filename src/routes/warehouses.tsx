import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/warehouses')({
  component: WarehousesComponent,
});


function WarehousesComponent() {
  const { data = [] } = useQuery({
    queryKey: ['warehouses'],
    queryFn: async () => [
      { id: 'WH-NYC-01', name: 'Queens Central Hub', city: 'Queens, NY', capacity: 45000, utilized: 38200, status: 'OPERATIONAL' },
      { id: 'WH-NYC-02', name: 'Bronx Cross-Dock Facility', city: 'Bronx, NY', capacity: 30000, utilized: 24500, status: 'OPERATIONAL' },
      { id: 'WH-NJ-01', name: 'Newark Air Cargo Center', city: 'Newark, NJ', capacity: 60000, utilized: 58900, status: 'AT_CAPACITY' },
    ]
  });

  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Warehouses</h1>
          <span className="rounded-full bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] px-2.5 py-0.5 text-xs font-mono font-bold">PostgreSQL</span>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">Distribution centers, cross-dock facilities, and cubic volume capacity.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((w: any) => (
          <div key={w.id} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-foreground">{w.name}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] font-bold">{w.status}</span>
            </div>
            <p className="text-xs text-muted-foreground font-mono">{w.city} ({w.id})</p>
            <div className="text-xs space-y-1">
              <div className="flex justify-between text-muted-foreground">
                <span>Capacity</span>
                <span className="font-mono font-medium">{w.utilized} / {w.capacity} CBM</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#9de500]" style={{ width: `${Math.round((w.utilized/w.capacity)*100)}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
