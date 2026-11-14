import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/drivers')({
  component: DriversComponent,
});


function DriversComponent() {
  const { data = [] } = useQuery({
    queryKey: ['drivers'],
    queryFn: async () => [
      { id: 'DRV-102', name: 'Marcus Vance', phone: '+1 (555) 234-8901', rating: 4.95, deliveries: 1420, vehicle: 'TRK-208', status: 'ON_DUTY', avatar: '/images/avatars/avatar-1.webp' },
      { id: 'DRV-105', name: 'Elena Rostova', phone: '+1 (555) 431-7721', rating: 4.98, deliveries: 2150, vehicle: 'TRK-104', status: 'ON_DUTY', avatar: '/images/avatars/avatar-2.webp' },
      { id: 'DRV-108', name: 'Tariq Al-Mansoor', phone: '+1 (555) 892-3310', rating: 4.88, deliveries: 980, vehicle: 'VAN-301', status: 'AVAILABLE', avatar: '/images/avatars/avatar-3.webp' },
      { id: 'DRV-112', name: 'Sarah Jenkins', phone: '+1 (555) 771-5502', rating: 4.92, deliveries: 1640, vehicle: 'VAN-302', status: 'RESTING', avatar: '/images/avatars/avatar-4.webp' },
    ]
  });

  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Drivers</h1>
          <span className="rounded-full bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] px-2.5 py-0.5 text-xs font-mono font-bold">PostgreSQL</span>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">Commercial drivers, CDL license status, safety ratings, and active truck assignments.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((d: any) => (
          <div key={d.id} className="p-4 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src={d.avatar} alt={d.name} className="size-11 rounded-full object-cover border border-border" />
              <div>
                <h4 className="font-bold text-sm text-foreground">{d.name}</h4>
                <p className="text-[11px] font-mono text-muted-foreground">{d.id}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
              <div className="flex justify-between"><span>Phone</span><span className="font-mono text-foreground">{d.phone}</span></div>
              <div className="flex justify-between"><span>Safety Rating</span><span className="font-mono font-bold text-amber-500">★ {d.rating}</span></div>
              <div className="flex justify-between"><span>Assigned Vehicle</span><span className="font-mono font-semibold text-foreground">{d.vehicle}</span></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
