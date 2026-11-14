import { pool, pgDb } from './pg';
import * as schema from './schema-pg';

async function seedPg() {
  console.log('--- Connecting to Coolify PostgreSQL (cargorix_db) ---');

  // Check connection
  const client = await pool.connect();
  console.log('Successfully connected to PostgreSQL container at port 5434!');

  // 1. Seed Warehouses
  const warehouses = [
    { id: 'WH-NYC-01', name: 'Queens Central Hub', city: 'Queens, NY', address: '142-02 20th Ave, College Point', totalCapacityCbm: '45000', utilizedCapacityCbm: '38200', status: 'OPERATIONAL' },
    { id: 'WH-NYC-02', name: 'Bronx Cross-Dock Facility', city: 'Bronx, NY', address: '1100 Oak Point Ave', totalCapacityCbm: '30000', utilizedCapacityCbm: '24500', status: 'OPERATIONAL' },
    { id: 'WH-NJ-01', name: 'Newark Air Cargo Center', city: 'Newark, NJ', address: '100 Brewster Rd', totalCapacityCbm: '60000', utilizedCapacityCbm: '58900', status: 'AT_CAPACITY' },
  ];

  for (const w of warehouses) {
    await client.query(`
      INSERT INTO warehouses (id, name, city, address, total_capacity_cbm, utilized_capacity_cbm, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
    `, [w.id, w.name, w.city, w.address, w.totalCapacityCbm, w.utilizedCapacityCbm, w.status]);
  }

  // 2. Seed Fleet Vehicles
  const fleet = [
    { id: 'TRK-208', plateNumber: 'NY-8821-HD', model: 'Freightliner Cascadia', type: 'HEAVY_TRUCK', status: 'IN_TRANSIT', capacityKg: '18000', currentLoadKg: '14200', fuelPercentage: 78, lastLatitude: '40.8160', lastLongitude: '-73.9450', currentRoute: 'Bronx -> Harlem -> Corona Queens' },
    { id: 'TRK-104', plateNumber: 'NY-4412-TR', model: 'Volvo VNL 860', type: 'HEAVY_TRUCK', status: 'IN_TRANSIT', capacityKg: '20000', currentLoadKg: '16500', fuelPercentage: 62, lastLatitude: '40.7484', lastLongitude: '-73.9857', currentRoute: 'Manhattan Midtown Express' },
    { id: 'VAN-301', plateNumber: 'NY-9910-EV', model: 'Ford E-Transit Van', type: 'CARGO_EV', status: 'ACTIVE', capacityKg: '3500', currentLoadKg: '2100', fuelPercentage: 92, lastLatitude: '40.7282', lastLongitude: '-73.7949', currentRoute: 'Queens Bayside Residential Loop' },
    { id: 'VAN-302', plateNumber: 'NJ-5521-FN', model: 'Mercedes-Benz Sprinter', type: 'VAN', status: 'IDLE', capacityKg: '4000', currentLoadKg: '0', fuelPercentage: 85, lastLatitude: '40.6895', lastLongitude: '-74.1745', currentRoute: 'Newark Airport Logistics Staging' },
    { id: 'TRK-505', plateNumber: 'NY-1102-HD', model: 'Peterbilt 579', type: 'HEAVY_TRUCK', status: 'MAINTENANCE', capacityKg: '22000', currentLoadKg: '0', fuelPercentage: 45, lastLatitude: '40.8448', lastLongitude: '-73.8648', currentRoute: 'Hunts Point Maintenance Yard' },
  ];

  for (const v of fleet) {
    await client.query(`
      INSERT INTO fleet_vehicles (id, plate_number, model, type, status, capacity_kg, current_load_kg, fuel_percentage, last_latitude, last_longitude, current_route)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
    `, [v.id, v.plateNumber, v.model, v.type, v.status, v.capacityKg, v.currentLoadKg, v.fuelPercentage, v.lastLatitude, v.lastLongitude, v.currentRoute]);
  }

  // 3. Seed Orders (30 orders)
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
    const amount = (1500 + (i * 342.5)).toFixed(2);
    const items = (i % 8) + 1;
    const weight = (25 + (i * 18.2)).toFixed(2);
    const date = new Date(Date.now() - (i * 3600000 * 6)).toISOString().slice(0, 10);
    const source = i % 4 === 0 ? 'API' : i % 3 === 0 ? 'PORTAL' : i % 2 === 0 ? 'CSV' : 'MANUAL';

    await client.query(`
      INSERT INTO orders (id, customer_name, destination_city, carrier, status, priority, total_amount, items_count, weight_kg, order_date, source)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
    `, [orderId, customer, city, carrier, status, priority, amount, items, weight, date, source]);
  }

  // Check counts
  const resO = await client.query('SELECT count(*) as c FROM orders');
  const resF = await client.query('SELECT count(*) as c FROM fleet_vehicles');
  const resW = await client.query('SELECT count(*) as c FROM warehouses');

  console.log(`Coolify PostgreSQL Live Stats: Orders=${resO.rows[0].c}, Fleet=${resF.rows[0].c}, Warehouses=${resW.rows[0].c}`);

  client.release();
  await pool.end();
}

seedPg().catch(console.error);
