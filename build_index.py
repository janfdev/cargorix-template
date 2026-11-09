import re

with open("/root/cargorix-template/cargorix_raw_dump.html", "r", encoding="utf-8") as f:
    raw_map = f.read()

with open("/root/cargorix-template/cargorix_ops_raw_dump.html", "r", encoding="utf-8") as f:
    raw_ops = f.read()

# 1. Sidebar
s_start = raw_map.find('<div class="group peer text-sidebar-foreground')
main_start = raw_map.find('<main data-slot="sidebar-inset"')
sidebar_html = raw_map[s_start:main_start]

# 2. Header
header_start = raw_map.find('<header class="sticky top-0')
header_end = raw_map.find('</header>') + len('</header>')
header_html = raw_map[header_start:header_end]

# 3. Live Map Content
content_map_start = header_end
content_map_end = raw_map.find('</main>') + len('</main>')
live_map_html = raw_map[content_map_start:content_map_end]

# Replace map canvas with Leaflet container
canvas_start = live_map_html.find('<div class="maplibregl-canvas-container')
parent_end = live_map_html.find('<div class="absolute top-4 right-4 z-10')

if canvas_start != -1 and parent_end != -1:
    live_map_html = (
        live_map_html[:canvas_start] +
        '<div id="cargorix-leaflet-map" class="relative size-full rounded-xl z-0" style="height: 100%; min-height: 702px; width: 100%;"></div>' +
        live_map_html[parent_end:]
    )

# Convert inner <main> of live map to <div id="cargorix-view-live-map">
live_map_html = live_map_html.replace(
    '<main class="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360">',
    '<div id="cargorix-view-live-map" class="cargorix-view size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360">'
)
last_main = live_map_html.rfind('</main>')
if last_main != -1:
    live_map_html = live_map_html[:last_main] + '</div>' + live_map_html[last_main+len('</main>'):]

# 4. Operations Overview Content
ops_header_end = raw_ops.find('</header>') + len('</header>')
ops_content_end = raw_ops.find('</main>') + len('</main>')
ops_html = raw_ops[ops_header_end:ops_content_end]

# Convert inner <main> of ops to <div id="cargorix-view-operations" style="display: none;">
ops_html = ops_html.replace(
    '<main class="size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360">',
    '<div id="cargorix-view-operations" class="cargorix-view size-full flex-1 px-4 py-6 sm:px-6 mx-auto max-w-360" style="display: none;">'
)
last_ops_main = ops_html.rfind('</main>')
if last_ops_main != -1:
    ops_html = ops_html[:last_ops_main] + '</div>' + ops_html[last_ops_main+len('</main>'):]

# Assemble final HTML
html_doc = f'''<!DOCTYPE html>
<html lang="en" class="light system" style="font-family: 'Geist Mono', monospace; --font-sans: 'Geist Mono', monospace; color-scheme: light; --radius: 0.625rem;">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cargorix - Shadcn Logistic App Template</title>
  <meta name="description" content="Logistics and supply chain admin dashboard for managing orders, shipments, fleet, inventory and warehouses." />
  
  <!-- Typography Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Local Cloned Stylesheets -->
  <link rel="stylesheet" href="./assets/css/fonts.css" />
  <link rel="stylesheet" href="./assets/css/main.css" />
  
  <!-- Leaflet Map Engine -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <style>
    /* Leaflet overrides to seamlessly integrate with shadcn */
    .leaflet-container {{
      background: var(--muted) !important;
      font-family: inherit;
    }}
    .leaflet-control-zoom {{
      display: none !important; /* using native cargorix zoom controls */
    }}
    .leaflet-attribution-flag {{
      display: none !important;
    }}
    .custom-marker-pin {{
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }}
    .custom-marker-pin:hover {{
      transform: scale(1.1);
    }}
    /* Custom scrollbars */
    ::-webkit-scrollbar {{
      width: 6px;
      height: 6px;
    }}
    ::-webkit-scrollbar-track {{
      background: transparent;
    }}
    ::-webkit-scrollbar-thumb {{
      background: var(--border);
      border-radius: 9999px;
    }}
    ::-webkit-scrollbar-thumb:hover {{
      background: var(--muted-foreground);
    }}
    .toast-popup {{
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }}
    .toast-popup.show {{
      transform: translateY(0);
      opacity: 1;
    }}
  </style>
</head>
<body class="flex min-h-full w-full flex-auto flex-col antialiased">
  <div data-slot="sidebar-wrapper" style="--sidebar-width:16rem;--sidebar-width-icon:3rem" class="group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full">
    <div class="flex h-full w-full min-w-0">
      
      <!-- Cloned Sidebar Component -->
      {sidebar_html}

      <!-- Main Inset Container -->
      <main data-slot="sidebar-inset" class="relative w-full md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-2xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 bg-muted flex min-w-0 flex-1 flex-col">
        
        <!-- Header -->
        {header_html}

        <!-- View 1: Live Map Dashboard (Default) -->
        {live_map_html}

        <!-- View 2: Operations Overview Dashboard -->
        {ops_html}

      </main>
    </div>
  </div>

  <!-- Toast Container -->
  <div id="toast-notification" class="toast-popup bg-card border border-border shadow-lg px-4 py-3 rounded-xl flex items-center gap-3 text-xs text-foreground">
    <span class="size-2 rounded-full bg-[var(--primary)]"></span>
    <span id="toast-message">Notification</span>
  </div>

  <!-- Interactive Client-side Script -->
  <script>
    // ─── Interactive State & Theme Manager ─────────────────────────────
    let currentTheme = 'light';
    let leafletMap = null;
    let mapTileLayer = null;

    // Toast Helper
    function showToast(message) {{
      const toast = document.getElementById('toast-notification');
      const msg = document.getElementById('toast-message');
      msg.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2800);
    }}

    // Toggle Dark / Light Theme
    function toggleTheme() {{
      const html = document.documentElement;
      if (html.classList.contains('dark')) {{
        html.classList.remove('dark');
        html.classList.add('light');
        html.style.colorScheme = 'light';
        currentTheme = 'light';
        updateMapTiles('light');
        showToast('Switched to Light Mode');
      }} else {{
        html.classList.remove('light');
        html.classList.add('dark');
        html.style.colorScheme = 'dark';
        currentTheme = 'dark';
        updateMapTiles('dark');
        showToast('Switched to Dark Mode');
      }}
    }}

    // Toggle Sidebar Expand / Collapse
    function toggleSidebar() {{
      const sidebar = document.querySelector('[data-slot="sidebar"]');
      if (!sidebar) return;
      const isExpanded = sidebar.getAttribute('data-state') === 'expanded';
      sidebar.setAttribute('data-state', isExpanded ? 'collapsed' : 'expanded');
      
      const gap = sidebar.querySelector('[data-slot="sidebar-gap"]');
      if (gap) {{
        gap.setAttribute('data-state', isExpanded ? 'collapsed' : 'expanded');
      }}
      if (leafletMap) {{
        setTimeout(() => leafletMap.invalidateSize(), 220);
      }}
    }}

    // Switch between Live Map and Operations Overview
    function switchView(viewName) {{
      const mapPanel = document.getElementById('cargorix-view-live-map');
      const opsPanel = document.getElementById('cargorix-view-operations');
      const sidebarLinks = document.querySelectorAll('a[href="/live-map"], a[href="/operations-overview"]');

      sidebarLinks.forEach(link => {{
        link.removeAttribute('data-active');
        link.classList.remove('bg-primary', 'text-primary-foreground', 'data-active:bg-primary!', 'data-active:text-primary-foreground!');
      }});

      if (viewName === 'operations-overview') {{
        if (mapPanel) mapPanel.style.display = 'none';
        if (opsPanel) opsPanel.style.display = 'block';
        const target = document.querySelector('a[href="/operations-overview"]');
        if (target) {{
          target.setAttribute('data-active', '');
          target.classList.add('bg-primary', 'text-primary-foreground');
        }}
        showToast('Navigated to Operations Overview');
      }} else {{
        if (opsPanel) opsPanel.style.display = 'none';
        if (mapPanel) mapPanel.style.display = 'block';
        const target = document.querySelector('a[href="/live-map"]');
        if (target) {{
          target.setAttribute('data-active', '');
          target.classList.add('bg-primary', 'text-primary-foreground');
        }}
        showToast('Navigated to Live Map');
        if (leafletMap) setTimeout(() => leafletMap.invalidateSize(), 150);
      }}
    }}

    // Leaflet Tile Update using clean Esri Canvas Tiles
    function updateMapTiles(theme) {{
      if (!leafletMap) return;
      if (mapTileLayer) leafletMap.removeLayer(mapTileLayer);

      const tileUrl = theme === 'dark'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{{z}}/{{y}}/{{x}}'
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{{z}}/{{y}}/{{x}}';

      mapTileLayer = L.tileLayer(tileUrl, {{
        maxZoom: 16,
        attribution: 'Tiles &copy; Esri'
      }}).addTo(leafletMap);
    }}

    // Initialize Interactive Map with Route & Vehicles
    function initLeafletMap() {{
      const mapContainer = document.getElementById('cargorix-leaflet-map');
      if (!mapContainer || leafletMap) return;

      // Center around NYC / Manhattan / Harlem / Queens
      leafletMap = L.map('cargorix-leaflet-map', {{
        center: [40.7934, -73.9458],
        zoom: 12,
        zoomControl: false,
      }});

      updateMapTiles('light');

      // Route Waypoints for TRK-208 (Bronx -> Harlem -> Corona Queens)
      const routeCoords = [
        [40.8521, -73.8964], // Grand Concourse Bronx
        [40.8176, -73.9281], // South Bronx
        [40.7934, -73.9458], // East Harlem
        [40.7614, -73.9213], // Astoria Queens
        [40.7498, -73.8621], // Roosevelt Ave, Corona
      ];

      // Draw Main Route Polyline (Orange gradient matching Cargorix)
      const routeLine = L.polyline(routeCoords, {{
        color: '#f97316',
        weight: 4,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
      }}).addTo(leafletMap);

      // Pulsing Marker for Active Vehicle TRK-208
      const trk208Icon = L.divIcon({{
        className: 'custom-marker-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer">
            <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-orange-400 opacity-60"></span>
            <div class="relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900 border-2 border-orange-500 text-white text-[10px] font-bold shadow-md">
              <span class="size-1.5 rounded-full bg-orange-400"></span>
              TRK-208
              <span class="text-orange-400 font-mono">+25m</span>
            </div>
          </div>
        `,
        iconSize: [80, 32],
        iconAnchor: [40, 16],
      }});

      L.marker([40.7934, -73.9458], {{ icon: trk208Icon }})
        .addTo(leafletMap)
        .bindPopup('<b class="text-xs">TRK-208 (Ethan Brooks)</b><br><span class="text-[11px]">Delayed (+25 min)<br>Next: Roosevelt Ave, Corona</span>');

      // Vehicle 2: TRK-115
      const trk115Icon = L.divIcon({{
        className: 'custom-marker-pin',
        html: `
          <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-white text-[10px] font-mono shadow-sm">
            <span class="size-1.5 rounded-full bg-amber-400"></span>
            TRK-115
          </div>
        `,
        iconSize: [60, 24],
        iconAnchor: [30, 12],
      }});
      L.marker([40.8521, -73.8964], {{ icon: trk115Icon }}).addTo(leafletMap);

      // Vehicle 3: VAN-014 (On route)
      const van014Icon = L.divIcon({{
        className: 'custom-marker-pin',
        html: `
          <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-emerald-500 text-white text-[10px] font-mono shadow-sm">
            <span class="size-1.5 rounded-full bg-emerald-400"></span>
            VAN-014
          </div>
        `,
        iconSize: [60, 24],
        iconAnchor: [30, 12],
      }});
      L.marker([40.7498, -73.9381], {{ icon: van014Icon }}).addTo(leafletMap);

      // Vehicle 4: BIKE-028 (On route)
      const bikeIcon = L.divIcon({{
        className: 'custom-marker-pin',
        html: `
          <div class="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-slate-900 border border-emerald-500 text-white text-[9px] font-mono shadow-sm">
            <span class="size-1 rounded-full bg-emerald-400"></span>
            BIKE-028
          </div>
        `,
        iconSize: [55, 20],
        iconAnchor: [27, 10],
      }});
      L.marker([40.7180, -73.9980], {{ icon: bikeIcon }}).addTo(leafletMap);

      // Recenter button listener
      const recenterBtn = document.querySelector('button[aria-label="Recenter map"]');
      if (recenterBtn) {{
        recenterBtn.addEventListener('click', () => {{
          leafletMap.flyTo([40.7934, -73.9458], 13, {{ duration: 1.2 }});
          showToast('Map centered to active vehicle TRK-208');
        }});
      }}

      // Native Zoom in / Zoom out buttons
      const zoomInBtn = document.querySelector('button[aria-label="Zoom in"]');
      const zoomOutBtn = document.querySelector('button[aria-label="Zoom out"]');
      if (zoomInBtn) zoomInBtn.addEventListener('click', () => leafletMap.zoomIn());
      if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => leafletMap.zoomOut());
    }}

    // Attach Event Listeners on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {{
      // Initialize map
      initLeafletMap();

      // Hook navigation links
      document.querySelectorAll('a').forEach(anchor => {{
        const href = anchor.getAttribute('href');
        if (href === '/live-map' || href === '/operations-overview') {{
          anchor.addEventListener('click', (e) => {{
            e.preventDefault();
            switchView(href.replace('/', ''));
          }});
        }} else if (href && href.startsWith('/')) {{
          anchor.addEventListener('click', (e) => {{
            e.preventDefault();
            showToast(`Navigating to ${{anchor.innerText.trim() || href}}...`);
          }});
        }}
      }});

      // Hook Sidebar Toggle Button
      const sidebarTrigger = document.querySelector('button[data-sidebar="trigger"], button[data-slot="sidebar-trigger"]');
      if (sidebarTrigger) {{
        sidebarTrigger.addEventListener('click', (e) => {{
          e.preventDefault();
          toggleSidebar();
        }});
      }}

      // Hook Theme Toggle Buttons
      document.querySelectorAll('button').forEach(btn => {{
        const html = btn.innerHTML || '';
        if (html.includes('lucide-moon') || html.includes('lucide-sun') || (btn.getAttribute('aria-label') || '').toLowerCase().includes('theme')) {{
          btn.addEventListener('click', (e) => {{
            e.preventDefault();
            toggleTheme();
          }});
        }}
      }});

      // Hook Fleet Card Click to highlight
      document.querySelectorAll('a[href*="/live-map/"]').forEach(card => {{
        card.addEventListener('click', (e) => {{
          e.preventDefault();
          const vehicleId = card.getAttribute('href').split('/').pop();
          showToast(`Selected fleet vehicle: ${{vehicleId}}`);
          if (leafletMap && vehicleId === 'TRK-208') {{
            leafletMap.flyTo([40.7934, -73.9458], 14, {{ duration: 1 }});
          }} else if (leafletMap && vehicleId === 'TRK-115') {{
            leafletMap.flyTo([40.8521, -73.8964], 14, {{ duration: 1 }});
          }} else if (leafletMap && vehicleId === 'VAN-014') {{
            leafletMap.flyTo([40.7498, -73.9381], 14, {{ duration: 1 }});
          }}
        }});
      }});
    }});
  </script>
</body>
</html>
'''

with open("/root/cargorix-template/index.html", "w", encoding="utf-8") as f:
    f.write(html_doc)

print("Generated clean /root/cargorix-template/index.html successfully, size:", len(html_doc))
