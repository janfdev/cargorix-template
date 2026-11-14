import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/products')({
  component: ProductsComponent,
});


function ProductsComponent() {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => [
      { sku: 'SKU-PLT-01', name: 'Industrial Heavy Pallet', category: 'Packaging', weight: '25 kg', stock: 1250, price: '$45.00' },
      { sku: 'SKU-BOX-M', name: 'Cardboard Box Med-Duty', category: 'Containers', weight: '0.8 kg', stock: 3400, price: '$3.50' },
      { sku: 'SKU-FRZ-90', name: 'Cold-Chain Container Pack', category: 'Cold Storage', weight: '14 kg', stock: 415, price: '$120.00' },
      { sku: 'SKU-DRM-20', name: 'Polyethylene Storage Drum', category: 'Hazardous', weight: '8.5 kg', stock: 290, price: '$85.00' },
    ]
  });

  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Products Catalog</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage physical cargo SKUs, weight specifications, and inventory unit pricing.</p>
      </div>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="px-4 py-3 font-semibold text-muted-foreground">SKU</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Product Name</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Category</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Unit Weight</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">On-Hand</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {products.map((p: any) => (
              <tr key={p.sku} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-bold text-[#9de500]">{p.sku}</td>
                <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{p.weight}</td>
                <td className="px-4 py-3 font-mono font-bold">{p.stock}</td>
                <td className="px-4 py-3 font-mono font-semibold">{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
