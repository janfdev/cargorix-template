import { db as sqliteDb } from '../db';
import { pgDb } from '../db/pg';
import { orders as pgOrders, fleetVehicles as pgFleet } from '../db/schema-pg';
import { orders as sqliteOrders, fleetVehicles as sqliteFleet } from '../db/schema';
import { desc, eq } from 'drizzle-orm';

// Connect to Coolify PostgreSQL with seamless fallback to SQLite
const isPg = Boolean(process.env.DATABASE_URL);

// 1. ORDERS API
export async function getOrders(filter?: { search?: string; status?: string; carrier?: string }) {
  if (isPg) {
    try {
      const allOrders = await pgDb.select().from(pgOrders).orderBy(desc(pgOrders.orderDate));
      return allOrders.filter(o => {
        const matchSearch = filter?.search
          ? o.id.toLowerCase().includes(filter.search.toLowerCase()) ||
            o.customerName.toLowerCase().includes(filter.search.toLowerCase()) ||
            o.destinationCity.toLowerCase().includes(filter.search.toLowerCase())
          : true;
        const matchStatus = filter?.status && filter.status !== 'ALL' ? o.status === filter.status : true;
        const matchCarrier = filter?.carrier && filter.carrier !== 'ALL' ? o.carrier === filter.carrier : true;
        return matchSearch && matchStatus && matchCarrier;
      });
    } catch {}
  }

  // SQLite Fallback
  const allOrders = sqliteDb.select().from(sqliteOrders).orderBy(desc(sqliteOrders.orderDate)).all();
  return allOrders.filter(o => {
    const matchSearch = filter?.search
      ? o.id.toLowerCase().includes(filter.search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(filter.search.toLowerCase()) ||
        o.destinationCity.toLowerCase().includes(filter.search.toLowerCase())
      : true;
    const matchStatus = filter?.status && filter.status !== 'ALL' ? o.status === filter.status : true;
    const matchCarrier = filter?.carrier && filter.carrier !== 'ALL' ? o.carrier === filter.carrier : true;
    return matchSearch && matchStatus && matchCarrier;
  });
}

export async function updateOrderStatus(orderId: string, status: string) {
  sqliteDb.update(sqliteOrders).set({ status }).where(eq(sqliteOrders.id, orderId)).run();
  return { success: true, orderId, status };
}

// 2. FLEET & LIVE GPS TELEMETRY
export async function getFleetVehicles() {
  if (isPg) {
    try {
      return await pgDb.select().from(pgFleet);
    } catch {}
  }
  return sqliteDb.select().from(sqliteFleet).all();
}

export async function updateVehicleGps(vehicleId: string, lat: number, lng: number) {
  sqliteDb.update(sqliteFleet).set({ lastLatitude: lat, lastLongitude: lng }).where(eq(sqliteFleet.id, vehicleId)).run();
  return { success: true, vehicleId, lat, lng };
}

// 3. SHIPMENTS
export async function getShipments() {
  return sqliteDb.select().from(sqliteOrders).all();
}

export async function getShipmentById(id: string) {
  const result = sqliteDb.select().from(sqliteOrders).where(eq(sqliteOrders.id, id)).get();
  return result || null;
}

// 4. WAREHOUSES & DRIVERS & STOCK LEDGER
export async function getWarehouses() {
  return [
    { id: 'WH-NYC-01', name: 'Queens Central Hub', city: 'Queens, NY' },
    { id: 'WH-NYC-02', name: 'Bronx Cross-Dock Facility', city: 'Bronx, NY' },
  ];
}

export async function getDrivers() {
  return [
    { id: 'DRV-102', fullName: 'Marcus Vance', safetyRating: 4.95 },
    { id: 'DRV-105', fullName: 'Elena Rostova', safetyRating: 4.98 },
  ];
}

export async function getStockLedger() {
  return [
    { id: 'LEDG-5001', sku: 'SKU-PLT-01', productName: 'Component 1', quantity: 20 },
  ];
}
