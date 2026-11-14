import { sqlite, db } from './index';
import * as schema from './schema';

console.log('--- Initializing SQLite Schema ---');

// Create tables directly using native SQLite DDL
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    destination_city TEXT NOT NULL,
    carrier TEXT NOT NULL,
    status TEXT NOT NULL,
    priority TEXT NOT NULL,
    total_amount REAL NOT NULL,
    items_count INTEGER NOT NULL,
    weight_kg REAL NOT NULL,
    order_date TEXT NOT NULL,
    source TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS shipments (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    tracking_number TEXT NOT NULL,
    origin_warehouse TEXT NOT NULL,
    destination_city TEXT NOT NULL,
    status TEXT NOT NULL,
    estimated_arrival TEXT NOT NULL,
    current_location TEXT NOT NULL,
    assigned_driver_id TEXT,
    vehicle_id TEXT
  );

  CREATE TABLE IF NOT EXISTS fleet_vehicles (
    id TEXT PRIMARY KEY,
    plate_number TEXT NOT NULL,
    model TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    capacity_kg REAL NOT NULL,
    current_load_kg REAL NOT NULL,
    fuel_percentage INTEGER NOT NULL,
    last_latitude REAL NOT NULL,
    last_longitude REAL NOT NULL,
    current_route TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS drivers (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    license_number TEXT NOT NULL,
    status TEXT NOT NULL,
    safety_rating REAL NOT NULL,
    total_deliveries INTEGER NOT NULL,
    assigned_vehicle_id TEXT
  );

  CREATE TABLE IF NOT EXISTS warehouses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    total_capacity_cbm REAL NOT NULL,
    utilized_capacity_cbm REAL NOT NULL,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS stock_ledger (
    id TEXT PRIMARY KEY,
    sku TEXT NOT NULL,
    product_name TEXT NOT NULL,
    warehouse_id TEXT NOT NULL,
    transaction_type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    reference_doc TEXT NOT NULL
  );
`);

console.log('Tables created. Seeding realistic logistics data...');

// 1. Seed Warehouses
const seedWarehouses = [
  { id: 'WH-NYC-01', name: 'Queens Central Hub', city: 'Queens, NY', address: '142-02 20th Ave, College Point', totalCapacityCbm: 45000, utilizedCapacityCbm: 38200, status: 'OPERATIONAL' },
  { id: 'WH-NYC-02', name: 'Bronx Cross-Dock Facility', city: 'Bronx, NY', address: '1100 Oak Point Ave', totalCapacityCbm: 30000, utilizedCapacityCbm: 24500, status: 'OPERATIONAL' },
  { id: 'WH-NJ-01', name: 'Newark Air Cargo Center', city: 'Newark, NJ', address: '100 Brewster Rd', totalCapacityCbm: 60000, utilizedCapacityCbm: 58900, status: 'AT_CAPACITY' },
];

for (const w of seedWarehouses) {
  sqlite.prepare(`
    INSERT OR REPLACE INTO warehouses (id, name, city, address, total_capacity_cbm, utilized_capacity_cbm, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(w.id, w.name, w.city, w.address, w.totalCapacityCbm, w.utilizedCapacityCbm, w.status);
}

// 2. Seed Fleet Vehicles (NYC Metro Fleet)
const seedVehicles = [
  { id: 'TRK-208', plateNumber: 'NY-8821-HD', model: 'Freightliner Cascadia', type: 'HEAVY_TRUCK', status: 'IN_TRANSIT', capacityKg: 18000, currentLoadKg: 14200, fuelPercentage: 78, lastLatitude: 40.8160, lastLongitude: -73.9450, currentRoute: 'Bronx -> Harlem -> Corona Queens' },
  { id: 'TRK-104', plateNumber: 'NY-4412-TR', model: 'Volvo VNL 860', type: 'HEAVY_TRUCK', status: 'IN_TRANSIT', capacityKg: 20000, currentLoadKg: 16500, fuelPercentage: 62, lastLatitude: 40.7484, lastLongitude: -73.9857, currentRoute: 'Manhattan Midtown Express' },
  { id: 'VAN-301', plateNumber: 'NY-9910-EV', model: 'Ford E-Transit Van', type: 'CARGO_EV', status: 'ACTIVE', capacityKg: 3500, currentLoadKg: 2100, fuelPercentage: 92, lastLatitude: 40.7282, lastLongitude: -73.7949, currentRoute: 'Queens Bayside Residential Loop' },
  { id: 'VAN-302', plateNumber: 'NJ-5521-FN', model: 'Mercedes-Benz Sprinter', type: 'VAN', status: 'IDLE', capacityKg: 4000, currentLoadKg: 0, fuelPercentage: 85, lastLatitude: 40.6895, lastLongitude: -74.1745, currentRoute: 'Newark Airport Logistics Staging' },
  { id: 'TRK-505', plateNumber: 'NY-1102-HD', model: 'Peterbilt 579', type: 'HEAVY_TRUCK', status: 'MAINTENANCE', capacityKg: 22000, currentLoadKg: 0, fuelPercentage: 45, lastLatitude: 40.8448, lastLongitude: -73.8648, currentRoute: 'Hunts Point Maintenance Yard' },
];

for (const v of seedVehicles) {
  sqlite.prepare(`
    INSERT OR REPLACE INTO fleet_vehicles (id, plate_number, model, type, status, capacity_kg, current_load_kg, fuel_percentage, last_latitude, last_longitude, current_route)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(v.id, v.plateNumber, v.model, v.type, v.status, v.capacityKg, v.currentLoadKg, v.fuelPercentage, v.lastLatitude, v.lastLongitude, v.currentRoute);
}

// 3. Seed Drivers
const seedDrivers = [
  { id: 'DRV-102', fullName: 'Marcus Vance', phone: '+1 (555) 234-8901', licenseNumber: 'CDL-NY-891024', status: 'ON_DUTY', safetyRating: 4.95, totalDeliveries: 1420, assignedVehicleId: 'TRK-208' },
  { id: 'DRV-105', fullName: 'Elena Rostova', phone: '+1 (555) 431-7721', licenseNumber: 'CDL-NY-672109', status: 'ON_DUTY', safetyRating: 4.98, totalDeliveries: 2150, assignedVehicleId: 'TRK-104' },
  { id: 'DRV-108', fullName: 'Tariq Al-Mansoor', phone: '+1 (555) 892-3310', licenseNumber: 'CDL-NY-441098', status: 'AVAILABLE', safetyRating: 4.88, totalDeliveries: 980, assignedVehicleId: 'VAN-301' },
  { id: 'DRV-112', fullName: 'Sarah Jenkins', phone: '+1 (555) 771-5502', licenseNumber: 'CDL-NJ-332190', status: 'RESTING', safetyRating: 4.92, totalDeliveries: 1640, assignedVehicleId: 'VAN-302' },
];

for (const d of seedDrivers) {
  sqlite.prepare(`
    INSERT OR REPLACE INTO drivers (id, full_name, phone, license_number, status, safety_rating, total_deliveries, assigned_vehicle_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(d.id, d.fullName, d.phone, d.licenseNumber, d.status, d.safetyRating, d.totalDeliveries, d.assignedVehicleId);
}

// 4. Seed Orders (25 realistic logistics orders)
const carriers = ['FedEx Express', 'DHL Global', 'Internal Fleet', 'UPS Freight'];
const cities = ['Brooklyn, NY', 'Jersey City, NJ', 'Stamford, CT', 'Philadelphia, PA', 'Boston, MA', 'White Plains, NY'];
const statuses = ['DELIVERED', 'IN_TRANSIT', 'PROCESSING', 'PENDING', 'CANCELLED'];

for (let i = 1; i <= 30; i++) {
  const orderId = `OR-${2000 + i}`;
  const customer = `Enterprise Corp Client ${String.fromCharCode(65 + (i % 15))}`;
  const city = cities[i % cities.length];
  const carrier = carriers[i % carriers.length];
  const status = statuses[i % statuses.length];
  const priority = i % 3 === 0 ? 'URGENT' : i % 2 === 0 ? 'EXPRESS' : 'STANDARD';
  const amount = Math.round(1500 + (i * 342.5));
  const items = (i % 8) + 1;
  const weight = Math.round(25 + (i * 18.2));
  const date = new Date(Date.now() - (i * 3600000 * 6)).toISOString().slice(0, 10);
  const source = i % 4 === 0 ? 'API' : i % 3 === 0 ? 'PORTAL' : i % 2 === 0 ? 'CSV' : 'MANUAL';

  sqlite.prepare(`
    INSERT OR REPLACE INTO orders (id, customer_name, destination_city, carrier, status, priority, total_amount, items_count, weight_kg, order_date, source)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(orderId, customer, city, carrier, status, priority, amount, items, weight, date, source);
}

// 5. Seed Shipments
for (let i = 1; i <= 15; i++) {
  const shpId = `SHP-${9000 + i}`;
  const orderId = `OR-${2000 + i}`;
  const tracking = `CRX-${8800000 + (i * 1234)}`;
  const origin = i % 2 === 0 ? 'Queens Central Hub' : 'Bronx Cross-Dock Facility';
  const dest = cities[i % cities.length];
  const status = i % 4 === 0 ? 'DELIVERED' : i % 3 === 0 ? 'OUT_FOR_DELIVERY' : 'IN_TRANSIT';
  const eta = new Date(Date.now() + (i * 3600000 * 4)).toISOString().slice(0, 16).replace('T', ' ');
  const curLoc = `Milepost ${i * 8} - I-95 North Corridor`;
  const drv = i % 2 === 0 ? 'DRV-102' : 'DRV-105';
  const veh = i % 2 === 0 ? 'TRK-208' : 'TRK-104';

  sqlite.prepare(`
    INSERT OR REPLACE INTO shipments (id, order_id, tracking_number, origin_warehouse, destination_city, status, estimated_arrival, current_location, assigned_driver_id, vehicle_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(shpId, orderId, tracking, origin, dest, status, eta, curLoc, drv, veh);
}

// 6. Seed Stock Ledger (Mutasi Inventaris)
const skus = ['SKU-PLT-01', 'SKU-BOX-M', 'SKU-FRZ-90', 'SKU-DRM-20', 'SKU-ELC-44'];
const txTypes = ['INBOUND', 'OUTBOUND', 'TRANSFER', 'ADJUSTMENT'];

for (let i = 1; i <= 20; i++) {
  const ledgerId = `LEDG-${5000 + i}`;
  const sku = skus[i % skus.length];
  const prodName = `High-Density Industrial Component ${i}`;
  const wh = i % 2 === 0 ? 'WH-NYC-01' : 'WH-NYC-02';
  const tx = txTypes[i % txTypes.length];
  const qty = (i * 15) + 5;
  const balance = 1200 + (i * 8);
  const time = new Date(Date.now() - (i * 3600000 * 2)).toISOString().slice(0, 16).replace('T', ' ');
  const doc = `DOC-BOL-${9800 + i}`;

  sqlite.prepare(`
    INSERT OR REPLACE INTO stock_ledger (id, sku, product_name, warehouse_id, transaction_type, quantity, balance_after, timestamp, reference_doc)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(ledgerId, sku, prodName, wh, tx, qty, balance, time, doc);
}

const getCount = (tbl: string) => (sqlite.prepare(`SELECT count(*) as c FROM ${tbl}`).get() as any).c;

const counts = {
  warehouses: getCount('warehouses'),
  fleet: getCount('fleet_vehicles'),
  drivers: getCount('drivers'),
  orders: getCount('orders'),
  shipments: getCount('shipments'),
  stockLedger: getCount('stock_ledger'),
};

console.log('Seeding Complete! Database statistics:', counts);
