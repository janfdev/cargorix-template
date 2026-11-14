import { db as sqliteDb } from '../db';
import { pgDb } from '../db/pg';
import { 
  orders as pgOrders, 
  fleetVehicles as pgFleet,
  shipments as pgShipments,
  drivers as pgDrivers,
  warehouses as pgWarehouses,
  stockLedger as pgStockLedger
} from '../db/schema-pg';
import { 
  orders as sqliteOrders, 
  fleetVehicles as sqliteFleet,
  shipments as sqliteShipments,
  drivers as sqliteDrivers,
  warehouses as sqliteWarehouses,
  stockLedger as sqliteStockLedger
} from '../db/schema';
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
  if (isPg) {
    try {
      await pgDb.update(pgOrders).set({ status }).where(eq(pgOrders.id, orderId));
    } catch {}
  }
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
  if (isPg) {
    try {
      return await pgDb.select().from(pgShipments).orderBy(desc(pgShipments.estimatedArrival));
    } catch {}
  }
  return sqliteDb.select().from(sqliteShipments).orderBy(desc(sqliteShipments.estimatedArrival)).all();
}

export async function getShipmentById(id: string) {
  if (isPg) {
    try {
      const res = await pgDb.select().from(pgShipments).where(eq(pgShipments.id, id));
      return res[0] || null;
    } catch {}
  }
  const result = sqliteDb.select().from(sqliteShipments).where(eq(sqliteShipments.id, id)).get();
  return result || null;
}

// 4. WAREHOUSES & DRIVERS & STOCK LEDGER
export async function getWarehouses() {
  if (isPg) {
    try {
      return await pgDb.select().from(pgWarehouses);
    } catch {}
  }
  return sqliteDb.select().from(sqliteWarehouses).all();
}

export async function getDrivers() {
  if (isPg) {
    try {
      return await pgDb.select().from(pgDrivers).orderBy(desc(pgDrivers.safetyRating));
    } catch {}
  }
  return sqliteDb.select().from(sqliteDrivers).orderBy(desc(sqliteDrivers.safetyRating)).all();
}

export async function getStockLedger() {
  if (isPg) {
    try {
      return await pgDb.select().from(pgStockLedger).orderBy(desc(pgStockLedger.timestamp));
    } catch {}
  }
  return sqliteDb.select().from(sqliteStockLedger).orderBy(desc(sqliteStockLedger.timestamp)).all();
}
