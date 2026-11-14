import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/shipments')({
  component: ShipmentsComponent,
});


function ShipmentsComponent() {
  const { data = [], refetch } = useQuery({
    queryKey: ['shipments'],
    queryFn: async () => [
      { id: 'SHP-9001', orderId: 'OR-2001', tracking: 'CRX-8801234', origin: 'Queens Central Hub', dest: 'Brooklyn, NY', status: 'IN_TRANSIT', eta: '2026-11-13 18:00', carrier: 'Internal Fleet' },
      { id: 'SHP-9002', orderId: 'OR-2002', tracking: 'CRX-8802468', origin: 'Bronx Cross-Dock', dest: 'Jersey City, NJ', status: 'OUT_FOR_DELIVERY', eta: '2026-11-13 16:30', carrier: 'DHL Global' },
      { id: 'SHP-9003', orderId: 'OR-2003', tracking: 'CRX-8803702', origin: 'Newark Air Cargo', dest: 'Stamford, CT', status: 'DELIVERED', eta: '2026-11-13 14:15', carrier: 'FedEx Express' },
    ]
  });

  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Shipments</h1>
            <span className="rounded-full bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] px-2.5 py-0.5 text-xs font-mono font-bold">PostgreSQL</span>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">Physical logistics manifest & real-time delivery status.</p>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Shipment ID</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Order Ref</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Tracking No</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Origin Hub</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Destination</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">ETA</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {data.map((s: any) => (
              <tr key={s.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-bold text-foreground">{s.id}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{s.orderId}</td>
                <td className="px-4 py-3 font-mono">{s.tracking}</td>
                <td className="px-4 py-3">{s.origin}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.dest}</td>
                <td className="px-4 py-3 font-mono">{s.eta}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] border border-[#9de500]/30">
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
