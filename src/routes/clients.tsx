import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/clients')({
  component: ClientsComponent,
});


function ClientsComponent() {
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => [
      { id: 'CLI-01', name: 'Apex Global Retail', city: 'New York, NY', volume: '$1.2M', status: 'ACTIVE' },
      { id: 'CLI-02', name: 'Horizon BioPharma', city: 'Boston, MA', volume: '$840K', status: 'ACTIVE' },
      { id: 'CLI-03', name: 'Metro Industrial Tech', city: 'Philadelphia, PA', volume: '$620K', status: 'ACTIVE' },
    ]
  });

  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Clients</h1><p className="text-muted-foreground mt-1 text-sm">B2B client directories, contractual service levels, and cargo shipments.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clients.map((c: any) => (
          <div key={c.id} className="p-5 rounded-2xl border border-border bg-card space-y-2">
            <h3 className="font-bold text-sm">{c.name}</h3>
            <p className="text-xs text-muted-foreground font-mono">{c.city} • {c.id}</p>
            <p className="text-xs font-mono font-bold text-[#9de500]">Annual Volume: {c.volume}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
