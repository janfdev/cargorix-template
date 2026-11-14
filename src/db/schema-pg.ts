import { pgTable, varchar, integer, numeric } from 'drizzle-orm/pg-core';

// 1. ORDERS
export const orders = pgTable('orders', {
  id: varchar('id', { length: 64 }).primaryKey(),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  destinationCity: varchar('destination_city', { length: 255 }).notNull(),
  carrier: varchar('carrier', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  priority: varchar('priority', { length: 50 }).notNull(),
  totalAmount: numeric('total_amount', { precision: 15, scale: 2 }).notNull(),
  itemsCount: integer('items_count').notNull(),
  weightKg: numeric('weight_kg', { precision: 10, scale: 2 }).notNull(),
  orderDate: varchar('order_date', { length: 50 }).notNull(),
  source: varchar('source', { length: 50 }).notNull(),
});

// 2. SHIPMENTS
export const shipments = pgTable('shipments', {
  id: varchar('id', { length: 64 }).primaryKey(),
  orderId: varchar('order_id', { length: 64 }).notNull(),
  trackingNumber: varchar('tracking_number', { length: 100 }).notNull(),
  originWarehouse: varchar('origin_warehouse', { length: 255 }).notNull(),
  destinationCity: varchar('destination_city', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  estimatedArrival: varchar('estimated_arrival', { length: 100 }).notNull(),
  currentLocation: varchar('current_location', { length: 255 }).notNull(),
  assignedDriverId: varchar('assigned_driver_id', { length: 64 }),
  vehicleId: varchar('vehicle_id', { length: 64 }),
});

// 3. FLEET VEHICLES
export const fleetVehicles = pgTable('fleet_vehicles', {
  id: varchar('id', { length: 64 }).primaryKey(),
  plateNumber: varchar('plate_number', { length: 50 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  capacityKg: numeric('capacity_kg', { precision: 12, scale: 2 }).notNull(),
  currentLoadKg: numeric('current_load_kg', { precision: 12, scale: 2 }).notNull(),
  fuelPercentage: integer('fuel_percentage').notNull(),
  lastLatitude: numeric('last_latitude', { precision: 10, scale: 6 }).notNull(),
  lastLongitude: numeric('last_longitude', { precision: 10, scale: 6 }).notNull(),
  currentRoute: varchar('current_route', { length: 255 }).notNull(),
});

// 4. DRIVERS
export const drivers = pgTable('drivers', {
  id: varchar('id', { length: 64 }).primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  licenseNumber: varchar('license_number', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  safetyRating: numeric('safety_rating', { precision: 3, scale: 2 }).notNull(),
  totalDeliveries: integer('total_deliveries').notNull(),
  assignedVehicleId: varchar('assigned_vehicle_id', { length: 64 }),
});

// 5. WAREHOUSES
export const warehouses = pgTable('warehouses', {
  id: varchar('id', { length: 64 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  totalCapacityCbm: numeric('total_capacity_cbm', { precision: 12, scale: 2 }).notNull(),
  utilizedCapacityCbm: numeric('utilized_capacity_cbm', { precision: 12, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
});

// 6. STOCK LEDGER
export const stockLedger = pgTable('stock_ledger', {
  id: varchar('id', { length: 64 }).primaryKey(),
  sku: varchar('sku', { length: 100 }).notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  warehouseId: varchar('warehouse_id', { length: 64 }).notNull(),
  transactionType: varchar('transaction_type', { length: 50 }).notNull(),
  quantity: integer('quantity').notNull(),
  balanceAfter: integer('balance_after').notNull(),
  timestamp: varchar('timestamp', { length: 100 }).notNull(),
  referenceDoc: varchar('reference_doc', { length: 100 }).notNull(),
});
