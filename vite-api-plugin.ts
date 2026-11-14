import type { Plugin } from 'vite';
import { getOrders, updateOrderStatus, getFleetVehicles, getShipments, getDrivers, getWarehouses, getStockLedger, authenticateUser, registerUser } from './src/server/data';

export function cargorixApiPlugin(): Plugin {
  return {
    name: 'cargorix-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api')) {
          return next();
        }

        const url = new URL(req.url, 'http://localhost');
        const pathname = url.pathname;

        res.setHeader('Content-Type', 'application/json');

        try {
          if (pathname === '/api/orders' && req.method === 'GET') {
            const search = url.searchParams.get('search') || undefined;
            const status = url.searchParams.get('status') || undefined;
            const carrier = url.searchParams.get('carrier') || undefined;
            const orders = await getOrders({ search, status, carrier });
            res.statusCode = 200;
            return res.end(JSON.stringify(orders));
          }

          if (pathname === '/api/orders/status' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
              const { orderId, status } = JSON.parse(body || '{}');
              const result = await updateOrderStatus(orderId, status);
              res.statusCode = 200;
              return res.end(JSON.stringify(result));
            });
            return;
          }

          if (pathname === '/api/fleet' && req.method === 'GET') {
            const fleet = await getFleetVehicles();
            res.statusCode = 200;
            return res.end(JSON.stringify(fleet));
          }

          if (pathname === '/api/shipments' && req.method === 'GET') {
            const shipments = await getShipments();
            res.statusCode = 200;
            return res.end(JSON.stringify(shipments));
          }

          if (pathname === '/api/drivers' && req.method === 'GET') {
            const drivers = await getDrivers();
            res.statusCode = 200;
            return res.end(JSON.stringify(drivers));
          }

          if (pathname === '/api/warehouses' && req.method === 'GET') {
            const warehouses = await getWarehouses();
            res.statusCode = 200;
            return res.end(JSON.stringify(warehouses));
          }

          if (pathname === '/api/stock-ledger' && req.method === 'GET') {
            const ledger = await getStockLedger();
            res.statusCode = 200;
            return res.end(JSON.stringify(ledger));
          }

          if (pathname === '/api/auth/register' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
              try {
                const { email, password, fullName, role } = JSON.parse(body || '{}');
                const result = await registerUser({ email, password, fullName, role });
                res.statusCode = result.success ? 201 : 400;
                return res.end(JSON.stringify(result));
              } catch (e: any) {
                res.statusCode = 500;
                return res.end(JSON.stringify({ success: false, error: e.message }));
              }
            });
            return;
          }

          if (pathname === '/api/auth/login' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
              try {
                const { email, password } = JSON.parse(body || '{}');
                const result = await authenticateUser(email, password);
                res.statusCode = result.success ? 200 : 401;
                return res.end(JSON.stringify(result));
              } catch (e: any) {
                res.statusCode = 500;
                return res.end(JSON.stringify({ success: false, error: e.message }));
              }
            });
            return;
          }

          res.statusCode = 404;
          return res.end(JSON.stringify({ error: `Not found: ${pathname}` }));
        } catch (error: any) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: error.message }));
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, 'http://localhost');
        const pathname = url.pathname;

        res.setHeader('Content-Type', 'application/json');

        try {
          if (pathname === '/api/orders' && req.method === 'GET') {
            const orders = await getOrders();
            return res.end(JSON.stringify(orders));
          }

          if (pathname === '/api/fleet' && req.method === 'GET') {
            const fleet = await getFleetVehicles();
            return res.end(JSON.stringify(fleet));
          }

          if (pathname === '/api/shipments' && req.method === 'GET') {
            const shipments = await getShipments();
            return res.end(JSON.stringify(shipments));
          }

          if (pathname === '/api/drivers' && req.method === 'GET') {
            const drivers = await getDrivers();
            return res.end(JSON.stringify(drivers));
          }

          if (pathname === '/api/warehouses' && req.method === 'GET') {
            const warehouses = await getWarehouses();
            return res.end(JSON.stringify(warehouses));
          }

          if (pathname === '/api/stock-ledger' && req.method === 'GET') {
            const ledger = await getStockLedger();
            return res.end(JSON.stringify(ledger));
          }

          if (pathname === '/api/auth/register' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
              try {
                const { email, password, fullName, role } = JSON.parse(body || '{}');
                const result = await registerUser({ email, password, fullName, role });
                res.statusCode = result.success ? 201 : 400;
                return res.end(JSON.stringify(result));
              } catch (e: any) {
                res.statusCode = 500;
                return res.end(JSON.stringify({ success: false, error: e.message }));
              }
            });
            return;
          }

          if (pathname === '/api/auth/login' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
              try {
                const { email, password } = JSON.parse(body || '{}');
                const result = await authenticateUser(email, password);
                if (!result.success) {
                  res.statusCode = 401;
                }
                res.end(JSON.stringify(result));
              } catch (e: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ success: false, error: e.message }));
              }
            });
            return;
          }

          res.statusCode = 404;
          return res.end(JSON.stringify({ error: 'Endpoint not found' }));
        } catch (error: any) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: error.message }));
        }
      });
    }
  };
}
