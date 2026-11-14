const { chromium } = require('/root/marketing-iq/fe-marketing/node_modules/@playwright/test');
const { spawn } = require('child_process');

async function captureScreenshots() {
  console.log('Capturing redesigned Login & Register screens...');
  const server = spawn('npx', ['vite', 'preview', '--port', '3395'], { cwd: '/root/cargorix-template' });
  await new Promise(r => setTimeout(r, 2500));

  const browser = await chromium.launch({ headless: true, executablePath: '/usr/local/bin/chromium', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Capture Login
  await page.goto('http://localhost:3395/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/root/cargorix-template/screenshots/tanstack_pages/00_login_shadcn.png' });
  console.log('Saved: 00_login_shadcn.png');

  // 2. Capture Register
  await page.goto('http://localhost:3395/register', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/root/cargorix-template/screenshots/tanstack_pages/00_register_shadcn.png' });
  console.log('Saved: 00_register_shadcn.png');

  // 3. Test Registration Flow Live into DB
  console.log('Testing registration mutation...');
  await page.fill('input[placeholder="Alexander Wright"]', 'Budi Dispatcher E2E');
  await page.fill('input[placeholder="a.wright@cargorix.corp"]', `dispatcher_${Date.now()}@cargorix.corp`);
  await page.fill('input[placeholder="Minimum 6 characters"]', 'dispatcher123');
  await page.click('button[type="submit"]');

  await page.waitForTimeout(2500);
  const currentUrl = page.url();
  console.log('Post-registration URL:', currentUrl);
  const successRedirect = currentUrl.includes('/live-map');
  console.log(`[${successRedirect ? '✅ PASS' : '❌ FAIL'}] Registration successfully redirected to workspace!`);

  await browser.close();
  server.kill();
  process.exit(0);
}

captureScreenshots().catch(err => {
  console.error(err);
  process.exit(1);
});
