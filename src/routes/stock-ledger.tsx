import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/stock-ledger')({
  component: StockLedgerComponent,
});


function StockLedgerComponent() {
  const { data = [] } = useQuery({
    queryKey: ['stock-ledger'],
    queryFn: async () => [
      { id: 'LEDG-5001', sku: 'SKU-PLT-01', name: 'Industrial Heavy Pallet', wh: 'Queens Hub', type: 'INBOUND', qty: '+50', balance: 1250, time: '2026-11-13 14:00', doc: 'DOC-BOL-9801' },
      { id: 'LEDG-5002', sku: 'SKU-BOX-M', name: 'Cardboard Box Med-Duty', wh: 'Bronx Cross-Dock', type: 'OUTBOUND', qty: '-120', balance: 3400, time: '2026-11-13 13:30', doc: 'DOC-BOL-9802' },
      { id: 'LEDG-5003', sku: 'SKU-FRZ-90', name: 'Cold-Chain Container Pack', wh: 'Newark Cargo', type: 'TRANSFER', qty: '+15', balance: 415, time: '2026-11-13 11:20', doc: 'DOC-BOL-9803' },
    ]
  });

  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Stock Ledger</h1>
          <span className="rounded-full bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] px-2.5 py-0.5 text-xs font-mono font-bold">PostgreSQL</span>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">Immutable audit trail of inventory balance movements.</p>
      </div>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Tx ID</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">SKU / Item</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Warehouse</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Type</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Quantity</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Balance After</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Ref Doc</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {data.map((l: any) => (
              <tr key={l.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-bold">{l.id}</td>
                <td className="px-4 py-3"><span className="font-mono font-medium text-[#9de500]">{l.sku}</span> - {l.name}</td>
                <td className="px-4 py-3">{l.wh}</td>
                <td className="px-4 py-3 font-mono text-[10px]">{l.type}</td>
                <td className="px-4 py-3 font-mono font-bold text-foreground">{l.qty}</td>
                <td className="px-4 py-3 font-mono font-semibold">{l.balance}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{l.doc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
