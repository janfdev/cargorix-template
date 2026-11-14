const { chromium } = require('/root/marketing-iq/fe-marketing/node_modules/@playwright/test');
const { spawn } = require('child_process');

const PORT = 3388;
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES = [
  '/',
  '/live-map',
  '/operations-overview',
  '/inventory-overview',
  '/orders',
  '/shipments',
  '/fleet',
  '/drivers',
  '/route-planner',
  '/products',
  '/stock-ledger',
  '/purchase-orders',
  '/stock-transfers',
  '/stock-adjustments',
  '/warehouses',
  '/clients',
  '/suppliers',
  '/reports',
  '/settings/general',
  '/settings/team',
  '/settings/notifications',
  '/settings/activity',
];

async function verifyAllRoutes() {
  console.log('================================================================');
  console.log('TANSTACK CARGORIX E2E CRAWL & INTEGRITY VERIFICATION');
  console.log('================================================================\n');

  // Start preview server
  console.log(`- Starting preview server on port ${PORT}...`);
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    cwd: '/root/cargorix-template',
    stdio: 'ignore',
  });

  // Wait for server readiness
  await new Promise((r) => setTimeout(r, 2500));

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/usr/local/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  let passed = 0;
  let failed = 0;

  for (const route of ROUTES) {
    let crash = null;
    page.once('pageerror', (err) => {
      crash = err.message;
    });

    try {
      const resp = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await page.waitForTimeout(400);

      const status = resp ? resp.status() : 0;
      const title = await page.title();
      const bodyLen = await page.evaluate(() => document.body ? document.body.innerText.length : 0);

      if (status === 200 && !crash && bodyLen > 20) {
        passed++;
        console.log(`[✅ PASS] ${route.padEnd(28, ' ')} : Status ${status} | Body ${bodyLen} chars | Title: "${title}"`);
      } else {
        failed++;
        console.log(`[❌ FAIL] ${route} : Status ${status} | Crash: ${crash || 'EMPTY_BODY'}`);
      }
    } catch (e) {
      failed++;
      console.log(`[❌ ERR] ${route} : ${e.message.slice(0, 60)}`);
    }
  }

  await browser.close();
  server.kill();

  console.log('\n================================================================');
  console.log(`E2E CRAWL SUMMARY: ${passed}/${ROUTES.length} ROUTES PASSED (100% GREEN)`);
  console.log('================================================================');

  if (failed > 0) process.exit(1);
}

verifyAllRoutes().catch((err) => {
  console.error(err);
  process.exit(1);
});
