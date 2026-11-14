import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// 1. ORDERS
export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(), // e.g. "OR-2040"
  customerName: text('customer_name').notNull(),
  destinationCity: text('destination_city').notNull(),
  carrier: text('carrier').notNull(), // "FedEx", "DHL", "UPS", "Internal Fleet"
  status: text('status').notNull(), // "PENDING", "PROCESSING", "IN_TRANSIT", "DELIVERED", "CANCELLED"
  priority: text('priority').notNull(), // "STANDARD", "EXPRESS", "URGENT"
  totalAmount: real('total_amount').notNull(),
  itemsCount: integer('items_count').notNull(),
  weightKg: real('weight_kg').notNull(),
  orderDate: text('order_date').notNull(),
  source: text('source').notNull(), // "API", "PORTAL", "CSV", "MANUAL"
});

// 2. SHIPMENTS
export const shipments = sqliteTable('shipments', {
  id: text('id').primaryKey(), // e.g. "SHP-9041"
  orderId: text('order_id').notNull(),
  trackingNumber: text('tracking_number').notNull(),
  originWarehouse: text('origin_warehouse').notNull(),
  destinationCity: text('destination_city').notNull(),
  status: text('status').notNull(), // "MANIFESTED", "DISPATCHED", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"
  estimatedArrival: text('estimated_arrival').notNull(),
  currentLocation: text('current_location').notNull(),
  assignedDriverId: text('assigned_driver_id'),
  vehicleId: text('vehicle_id'),
});

// 3. FLEET VEHICLES
export const fleetVehicles = sqliteTable('fleet_vehicles', {
  id: text('id').primaryKey(), // e.g. "TRK-208"
  plateNumber: text('plate_number').notNull(),
  model: text('model').notNull(), // "Freightliner Cascadia", "Volvo VNL 860", "Ford Transit Van"
  type: text('type').notNull(), // "HEAVY_TRUCK", "VAN", "CARGO_EV"
  status: text('status').notNull(), // "ACTIVE", "IN_TRANSIT", "MAINTENANCE", "IDLE"
  capacityKg: real('capacity_kg').notNull(),
  currentLoadKg: real('current_load_kg').notNull(),
  fuelPercentage: integer('fuel_percentage').notNull(),
  lastLatitude: real('last_latitude').notNull(),
  lastLongitude: real('last_longitude').notNull(),
  currentRoute: text('current_route').notNull(), // "Bronx -> Harlem -> Queens"
});

// 4. DRIVERS
export const drivers = sqliteTable('drivers', {
  id: text('id').primaryKey(), // e.g. "DRV-102"
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  licenseNumber: text('license_number').notNull(),
  status: text('status').notNull(), // "ON_DUTY", "RESTING", "AVAILABLE", "SUSPENDED"
  safetyRating: real('safety_rating').notNull(), // 4.9
  totalDeliveries: integer('total_deliveries').notNull(),
  assignedVehicleId: text('assigned_vehicle_id'),
});

// 5. WAREHOUSES
export const warehouses = sqliteTable('warehouses', {
  id: text('id').primaryKey(), // e.g. "WH-NYC-01"
  name: text('name').notNull(), // "Queens Central Distribution Hub"
  city: text('city').notNull(),
  address: text('address').notNull(),
  totalCapacityCbm: real('total_capacity_cbm').notNull(),
  utilizedCapacityCbm: real('utilized_capacity_cbm').notNull(),
  status: text('status').notNull(), // "OPERATIONAL", "AT_CAPACITY", "MAINTENANCE"
});

// 6. STOCK LEDGER (Mutasi Barang Pergudangan)
export const stockLedger = sqliteTable('stock_ledger', {
  id: text('id').primaryKey(),
  sku: text('sku').notNull(),
  productName: text('product_name').notNull(),
  warehouseId: text('warehouse_id').notNull(),
  transactionType: text('transaction_type').notNull(), // "INBOUND", "OUTBOUND", "TRANSFER", "ADJUSTMENT"
  quantity: integer('quantity').notNull(),
  balanceAfter: integer('balance_after').notNull(),
  timestamp: text('timestamp').notNull(),
  referenceDoc: text('reference_doc').notNull(),
});

// 7. USERS & AUTHENTICATION
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull(), // "ADMIN", "DISPATCHER", "DRIVER", "MANAGER"
  avatar: text('avatar').notNull(),
});
