import { db as sqliteDb } from '../db';
import { pgDb } from '../db/pg';
import { 
  orders as pgOrders, 
  fleetVehicles as pgFleet,
  shipments as pgShipments,
  drivers as pgDrivers,
  warehouses as pgWarehouses,
  stockLedger as pgStockLedger,
  users as pgUsers
} from '../db/schema-pg';
import { 
  orders as sqliteOrders, 
  fleetVehicles as sqliteFleet,
  shipments as sqliteShipments,
  drivers as sqliteDrivers,
  warehouses as sqliteWarehouses,
  stockLedger as sqliteStockLedger,
  users as sqliteUsers
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

// 5. AUTHENTICATION & USERS
export async function authenticateUser(email: string, password: string) {
  if (isPg) {
    try {
      const found = await pgDb.select().from(pgUsers).where(eq(pgUsers.email, email));
      if (found.length > 0 && found[0].password === password) {
        const { password: _, ...user } = found[0];
        return { success: true, user };
      }
    } catch {}
  }

  // SQLite fallback
  const found = sqliteDb.select().from(sqliteUsers).where(eq(sqliteUsers.email, email)).get();
  if (found && found.password === password) {
    const { password: _, ...user } = found;
    return { success: true, user };
  }

  return { success: false, error: 'Invalid email or password' };
}

export async function registerUser(data: { email: string; password: string; fullName: string; role?: string }) {
  const userId = `USR-${Date.now().toString().slice(-4)}`;
  const role = data.role || 'DISPATCHER';
  const avatar = `/images/avatars/avatar-${(Math.floor(Math.random() * 8) + 1)}.webp`;

  if (isPg) {
    try {
      await pgDb.insert(pgUsers).values({
        id: userId,
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        role,
        avatar,
      });
      return { success: true, user: { id: userId, email: data.email, fullName: data.fullName, role, avatar } };
    } catch (e: any) {
      if (e.message?.includes('unique') || e.code === '23505') {
        return { success: false, error: 'Email already registered' };
      }
    }
  }

  try {
    sqliteDb.insert(sqliteUsers).values({
      id: userId,
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      role,
      avatar,
    }).run();
    return { success: true, user: { id: userId, email: data.email, fullName: data.fullName, role, avatar } };
  } catch (e: any) {
    return { success: false, error: 'Email already registered' };
  }
}
