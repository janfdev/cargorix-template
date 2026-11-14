const { chromium } = require('/root/marketing-iq/fe-marketing/node_modules/@playwright/test');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const PORT = 3389;
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIR = '/root/cargorix-template/screenshots/tanstack_pages';

const PAGES = [
  { slug: 'live-map', route: '/live-map', label: '01_live_map' },
  { slug: 'operations-overview', route: '/operations-overview', label: '02_operations_overview' },
  { slug: 'inventory-overview', route: '/inventory-overview', label: '03_inventory_overview' },
  { slug: 'orders', route: '/orders', label: '04_orders_tanstack_table' },
  { slug: 'shipments', route: '/shipments', label: '05_shipments' },
  { slug: 'fleet', route: '/fleet', label: '06_fleet' },
  { slug: 'drivers', route: '/drivers', label: '07_drivers' },
  { slug: 'route-planner', route: '/route-planner', label: '08_route_planner' },
  { slug: 'products', route: '/products', label: '09_products' },
  { slug: 'stock-ledger', route: '/stock-ledger', label: '10_stock_ledger' },
  { slug: 'purchase-orders', route: '/purchase-orders', label: '11_purchase_orders' },
  { slug: 'stock-transfers', route: '/stock-transfers', label: '12_stock_transfers' },
  { slug: 'stock-adjustments', route: '/stock-adjustments', label: '13_stock_adjustments' },
  { slug: 'warehouses', route: '/warehouses', label: '14_warehouses' },
  { slug: 'clients', route: '/clients', label: '15_clients' },
  { slug: 'suppliers', route: '/suppliers', label: '16_suppliers' },
  { slug: 'reports', route: '/reports', label: '17_reports' },
  { slug: 'settings-general', route: '/settings/general', label: '18_settings_general' },
  { slug: 'settings-team', route: '/settings/team', label: '19_settings_team' },
  { slug: 'settings-notifications', route: '/settings/notifications', label: '20_settings_notifications' },
  { slug: 'settings-activity', route: '/settings/activity', label: '21_settings_activity' },
];

async function captureAllPages() {
  console.log('--- Starting Preview Server for Full Page Capture ---');
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    cwd: '/root/cargorix-template',
    stdio: 'ignore',
  });

  await new Promise((r) => setTimeout(r, 2500));

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/usr/local/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const results = [];

  for (const p of PAGES) {
    const url = `${BASE_URL}${p.route}`;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(600); // Allow styles and customizer state to hydrate

      const filename = `${p.label}.png`;
      const filePath = path.join(OUT_DIR, filename);

      await page.screenshot({ path: filePath, fullPage: false });
      results.push({ name: p.label, path: filePath, ok: true });
      console.log(`[📸 CAPTURED] ${p.route.padEnd(25, ' ')} -> ${filename}`);
    } catch (err) {
      console.log(`[❌ FAILED] ${p.route} : ${err.message}`);
      results.push({ name: p.label, ok: false });
    }
  }

  await browser.close();
  server.kill();

  console.log(`\nCaptured ${results.filter(r => r.ok).length}/${PAGES.length} pages successfully!`);
}

captureAllPages().catch(console.error);
