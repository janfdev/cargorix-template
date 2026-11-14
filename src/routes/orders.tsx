import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import { Search, RefreshCw, ArrowUpDown, CheckCircle2, Truck } from 'lucide-react';

interface OrderItem {
  id: string;
  customerName: string;
  destinationCity: string;
  carrier: string;
  status: string;
  priority: string;
  totalAmount: number;
  itemsCount: number;
  weightKg: number;
  orderDate: string;
  source: string;
}

async function fetchOrders() {
  const res = await fetch('/api/orders').catch(() => null);
  if (res && res.ok) return await res.json();
  
  return [
    { id: 'OR-2001', customerName: 'Enterprise Corp Client B', destinationCity: 'Brooklyn, NY', carrier: 'DHL Global', status: 'IN_TRANSIT', priority: 'STANDARD', totalAmount: 1842, itemsCount: 2, weightKg: 43, orderDate: '2026-11-13', source: 'MANUAL' },
    { id: 'OR-2002', customerName: 'Enterprise Corp Client C', destinationCity: 'Jersey City, NJ', carrier: 'Internal Fleet', status: 'PROCESSING', priority: 'EXPRESS', totalAmount: 2185, itemsCount: 3, weightKg: 61, orderDate: '2026-11-13', source: 'CSV' },
    { id: 'OR-2003', customerName: 'Enterprise Corp Client D', destinationCity: 'Stamford, CT', carrier: 'UPS Freight', status: 'PENDING', priority: 'URGENT', totalAmount: 2527, itemsCount: 4, weightKg: 80, orderDate: '2026-11-13', source: 'PORTAL' },
    { id: 'OR-2004', customerName: 'Enterprise Corp Client E', destinationCity: 'Philadelphia, PA', carrier: 'FedEx Express', status: 'CANCELLED', priority: 'EXPRESS', totalAmount: 2870, itemsCount: 5, weightKg: 98, orderDate: '2026-11-13', source: 'API' },
    { id: 'OR-2005', customerName: 'Enterprise Corp Client F', destinationCity: 'Boston, MA', carrier: 'DHL Global', status: 'DELIVERED', priority: 'STANDARD', totalAmount: 3212, itemsCount: 6, weightKg: 116, orderDate: '2026-11-12', source: 'MANUAL' },
    { id: 'OR-2006', customerName: 'Enterprise Corp Client G', destinationCity: 'White Plains, NY', carrier: 'Internal Fleet', status: 'IN_TRANSIT', priority: 'URGENT', totalAmount: 3555, itemsCount: 7, weightKg: 134, orderDate: '2026-11-12', source: 'CSV' },
    { id: 'OR-2007', customerName: 'Enterprise Corp Client H', destinationCity: 'Brooklyn, NY', carrier: 'UPS Freight', status: 'PROCESSING', priority: 'STANDARD', totalAmount: 3897, itemsCount: 8, weightKg: 152, orderDate: '2026-11-12', source: 'PORTAL' },
    { id: 'OR-2008', customerName: 'Enterprise Corp Client I', destinationCity: 'Jersey City, NJ', carrier: 'FedEx Express', status: 'PENDING', priority: 'EXPRESS', totalAmount: 4240, itemsCount: 1, weightKg: 171, orderDate: '2026-11-12', source: 'API' },
    { id: 'OR-2009', customerName: 'Enterprise Corp Client J', destinationCity: 'Stamford, CT', carrier: 'DHL Global', status: 'CANCELLED', priority: 'URGENT', totalAmount: 4582, itemsCount: 2, weightKg: 189, orderDate: '2026-11-11', source: 'MANUAL' },
    { id: 'OR-2010', customerName: 'Enterprise Corp Client K', destinationCity: 'Philadelphia, PA', carrier: 'Internal Fleet', status: 'DELIVERED', priority: 'STANDARD', totalAmount: 4925, itemsCount: 3, weightKg: 207, orderDate: '2026-11-11', source: 'CSV' },
  ];
}

export const Route = createFileRoute('/orders')({
  component: OrdersTanStackComponent,
});

const columnHelper = createColumnHelper<OrderItem>();

function OrdersTanStackComponent() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const { data: rawOrders = [], refetch, isFetching } = useQuery({
    queryKey: ['orders-tanstack'],
    queryFn: fetchOrders,
  });

  const filteredData = useMemo(() => {
    return rawOrders.filter((item: OrderItem) => {
      const matchCarrier = carrierFilter === 'ALL' || item.carrier === carrierFilter;
      const matchStatus = statusFilter === 'ALL' || item.status === statusFilter;
      return matchCarrier && matchStatus;
    });
  }, [rawOrders, carrierFilter, statusFilter]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-1 font-semibold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            Order ID
            <ArrowUpDown className="size-3" />
          </button>
        ),
        cell: (info) => (
          <div className="font-mono font-bold text-foreground flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#9de500]" />
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor('customerName', {
        header: 'Customer',
        cell: (info) => <div className="font-medium text-foreground">{info.getValue()}</div>,
      }),
      columnHelper.accessor('destinationCity', {
        header: 'Destination',
        cell: (info) => <div className="text-muted-foreground text-xs">{info.getValue()}</div>,
      }),
      columnHelper.accessor('carrier', {
        header: 'Carrier',
        cell: (info) => (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-secondary text-secondary-foreground">
            <Truck className="size-3" />
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const val = info.getValue();
          let color = 'bg-muted text-muted-foreground';
          if (val === 'DELIVERED') color = 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
          if (val === 'IN_TRANSIT') color = 'bg-[#9de500]/10 text-[#161b1d] dark:text-[#9de500] border border-[#9de500]/30 font-semibold';
          if (val === 'PROCESSING') color = 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
          if (val === 'PENDING') color = 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
          if (val === 'CANCELLED') color = 'bg-rose-500/10 text-rose-500 border border-rose-500/20';

          return (
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono tracking-tight ${color}`}>
              {val}
            </span>
          );
        },
      }),
      columnHelper.accessor('totalAmount', {
        header: ({ column }) => (
          <div className="text-right">
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="inline-flex items-center gap-1 font-semibold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Amount (USD)
              <ArrowUpDown className="size-3" />
            </button>
          </div>
        ),
        cell: (info) => (
          <div className="font-mono text-right font-medium tabular-nums">
            ${info.getValue().toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        ),
      }),
      columnHelper.accessor('weightKg', {
        header: () => <div className="text-right">Weight</div>,
        cell: (info) => <div className="font-mono text-right text-xs text-muted-foreground">{info.getValue()} kg</div>,
      }),
      columnHelper.accessor('source', {
        header: 'Source',
        cell: (info) => (
          <span className="text-[10px] font-mono uppercase bg-muted/60 px-1.5 py-0.5 rounded text-muted-foreground">
            {info.getValue()}
          </span>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <span className="rounded-full bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] px-2.5 py-0.5 text-xs font-mono font-bold">
              TanStack Table v8
            </span>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            Live order processing data grid backed by reactive TanStack Table state and SQLite storage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium hover:bg-muted transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`size-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-3 rounded-xl border border-border bg-card shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search orders, customers, cities..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-[#9de500]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={carrierFilter}
            onChange={(e) => setCarrierFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs font-medium"
          >
            <option value="ALL">All Carriers</option>
            <option value="FedEx Express">FedEx Express</option>
            <option value="DHL Global">DHL Global</option>
            <option value="Internal Fleet">Internal Fleet</option>
            <option value="UPS Freight">UPS Freight</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="DELIVERED">Delivered</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="PROCESSING">Processing</option>
            <option value="PENDING">Pending</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Headless TanStack Data Grid */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-muted/40 border-b border-border">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border/60">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground text-xs">
                    No orders matching your filters.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-xs">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20 text-xs text-muted-foreground font-mono">
          <span>Showing {table.getRowModel().rows.length} of {rawOrders.length} orders</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3 text-[#9de500]" />
            Drizzle SQLite Reactive In-Memory State
          </span>
        </div>
      </div>
    </main>
  );
}
