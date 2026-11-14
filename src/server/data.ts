import { db } from '../db';
import { orders, fleetVehicles, shipments, warehouses, drivers, stockLedger } from '../db/schema';
import { eq, desc, like, or } from 'drizzle-orm';

// 1. ORDERS API
export async function getOrders(filter?: { search?: string; status?: string; carrier?: string }) {
  let query = db.select().from(orders).orderBy(desc(orders.orderDate));
  const allOrders = query.all();

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
  db.update(orders).set({ status }).where(eq(orders.id, orderId)).run();
  return { success: true, orderId, status };
}

// 2. FLEET & LIVE GPS TELEMETRY
export async function getFleetVehicles() {
  return db.select().from(fleetVehicles).all();
}

export async function updateVehicleGps(vehicleId: string, lat: number, lng: number) {
  db.update(fleetVehicles).set({ lastLatitude: lat, lastLongitude: lng }).where(eq(fleetVehicles.id, vehicleId)).run();
  return { success: true, vehicleId, lat, lng };
}

// 3. SHIPMENTS
export async function getShipments() {
  return db.select().from(shipments).all();
}

export async function getShipmentById(id: string) {
  const result = db.select().from(shipments).where(eq(shipments.id, id)).get();
  return result || null;
}

// 4. WAREHOUSES & DRIVERS & STOCK LEDGER
export async function getWarehouses() {
  return db.select().from(warehouses).all();
}

export async function getDrivers() {
  return db.select().from(drivers).all();
}

export async function getStockLedger() {
  return db.select().from(stockLedger).orderBy(desc(stockLedger.timestamp)).all();
}
