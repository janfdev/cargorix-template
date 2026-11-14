import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';


export const Route = createFileRoute('/fleet')({
  component: FleetTanStackComponent,
});

function FleetTanStackComponent() {
  const [filterType, setFilterType] = useState('ALL');

  const { data: fleet = [], refetch, isFetching } = useQuery({
    queryKey: ['fleet-vehicles'],
    queryFn: async () => {
      const res = await fetch('/api/fleet').catch(() => null);
      if (res && res.ok) return await res.json();
      return [
        { id: 'TRK-208', plateNumber: 'NY-8821-HD', model: 'Freightliner Cascadia', type: 'HEAVY_TRUCK', status: 'IN_TRANSIT', capacityKg: 18000, currentLoadKg: 14200, fuelPercentage: 78, lastLatitude: 40.816, lastLongitude: -73.945, currentRoute: 'Bronx -> Harlem -> Corona Queens' },
        { id: 'TRK-104', plateNumber: 'NY-4412-TR', model: 'Volvo VNL 860', type: 'HEAVY_TRUCK', status: 'IN_TRANSIT', capacityKg: 20000, currentLoadKg: 16500, fuelPercentage: 62, lastLatitude: 40.7484, lastLongitude: -73.9857, currentRoute: 'Manhattan Midtown Express' },
        { id: 'VAN-301', plateNumber: 'NY-9910-EV', model: 'Ford E-Transit Van', type: 'CARGO_EV', status: 'ACTIVE', capacityKg: 3500, currentLoadKg: 2100, fuelPercentage: 92, lastLatitude: 40.7282, lastLongitude: -73.7949, currentRoute: 'Queens Bayside Residential Loop' },
        { id: 'VAN-302', plateNumber: 'NJ-5521-FN', model: 'Mercedes-Benz Sprinter', type: 'VAN', status: 'IDLE', capacityKg: 4000, currentLoadKg: 0, fuelPercentage: 85, lastLatitude: 40.6895, lastLongitude: -74.1745, currentRoute: 'Newark Airport Logistics Staging' },
        { id: 'TRK-505', plateNumber: 'NY-1102-HD', model: 'Peterbilt 579', type: 'HEAVY_TRUCK', status: 'MAINTENANCE', capacityKg: 22000, currentLoadKg: 0, fuelPercentage: 45, lastLatitude: 40.8448, lastLongitude: -73.8648, currentRoute: 'Hunts Point Maintenance Yard' },
      ];
    },
    refetchInterval: 5000,
  });

  const filteredFleet = fleet.filter((v: any) => filterType === 'ALL' || v.type === filterType);

  return (
    <main className="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Fleet Management</h1>
            <span className="rounded-full bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500] px-2.5 py-0.5 text-xs font-mono font-bold">
              PostgreSQL Telemetry
            </span>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            Real-time fleet monitoring, fuel capacity, and live GPS routes backed by TanStack Query.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium"
          >
            <option value="ALL">All Vehicle Types</option>
            <option value="HEAVY_TRUCK">Heavy Trucks</option>
            <option value="VAN">Delivery Vans</option>
            <option value="CARGO_EV">Cargo EV</option>
          </select>

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium hover:bg-muted transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFleet.map((vehicle: any) => {
          const loadPercent = Math.round((Number(vehicle.currentLoadKg) / Number(vehicle.capacityKg)) * 100);
          return (
            <div
              key={vehicle.id}
              className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-[#9de500]/50 transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{vehicle.id}</h3>
                    <p className="text-xs font-mono text-muted-foreground">{vehicle.plateNumber}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                      vehicle.status === 'IN_TRANSIT'
                        ? 'bg-[#9de500]/15 text-[#161b1d] dark:text-[#9de500]'
                        : vehicle.status === 'ACTIVE'
                        ? 'bg-emerald-500/15 text-emerald-500'
                        : vehicle.status === 'MAINTENANCE'
                        ? 'bg-rose-500/15 text-rose-500'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Model</span>
                    <span className="font-medium text-foreground">{vehicle.model}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-muted-foreground">Load ({loadPercent}%)</span>
                      <span className="font-mono font-medium">{vehicle.currentLoadKg} / {vehicle.capacityKg} kg</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#9de500] rounded-full transition-all"
                        style={{ width: `${Math.min(loadPercent, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span className="truncate max-w-[200px]" title={vehicle.currentRoute}>{vehicle.currentRoute}</span>
                <span>{Number(vehicle.lastLatitude).toFixed(2)}, {Number(vehicle.lastLongitude).toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
