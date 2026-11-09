"use client";

export function setupLeafletMap(containerId = "cargorix-leaflet-map") {
  if (typeof window === "undefined") return;

  const init = () => {
    const L = (window as any).L;
    const container = document.getElementById(containerId);
    if (!L || !container) return;

    // Check if already initialized
    if ((container as any)._leaflet_id) return;

    const isDark = document.documentElement.classList.contains("dark");
    const tileUrl = isDark
      ? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
      : "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";

    const map = L.map(container, {
      center: [40.7934, -73.9458],
      zoom: 12,
      zoomControl: false,
    });

    L.tileLayer(tileUrl, {
      maxZoom: 16,
      attribution: "Tiles &copy; Esri",
    }).addTo(map);

    // Route coordinates (Bronx -> Harlem -> Corona Queens)
    const routeCoords = [
      [40.8521, -73.8964],
      [40.8176, -73.9281],
      [40.7934, -73.9458],
      [40.7614, -73.9213],
      [40.7498, -73.8621],
    ];

    L.polyline(routeCoords, {
      color: "#f97316",
      weight: 4,
      opacity: 0.9,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(map);

    // Marker TRK-208
    const trk208Icon = L.divIcon({
      className: "custom-marker-pin",
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
    });

    // Marker TRK-115
    const trk115Icon = L.divIcon({
      className: "custom-marker-pin",
      html: `
        <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-white text-[10px] font-mono shadow-sm">
          <span class="size-1.5 rounded-full bg-amber-400"></span>
          TRK-115
        </div>
      `,
      iconSize: [60, 24],
      iconAnchor: [30, 12],
    });

    // Marker VAN-014
    const van014Icon = L.divIcon({
      className: "custom-marker-pin",
      html: `
        <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-emerald-500 text-white text-[10px] font-mono shadow-sm">
          <span class="size-1.5 rounded-full bg-emerald-400"></span>
          VAN-014
        </div>
      `,
      iconSize: [60, 24],
      iconAnchor: [30, 12],
    });

    L.marker([40.7934, -73.9458], { icon: trk208Icon })
      .addTo(map)
      .bindPopup("<b>TRK-208 (Ethan Brooks)</b><br>Delayed (+25m)<br>Next: Roosevelt Ave, Corona");

    L.marker([40.8521, -73.8964], { icon: trk115Icon }).addTo(map);
    L.marker([40.7498, -73.9381], { icon: van014Icon }).addTo(map);

    // Zoom buttons
    const zoomIn = document.querySelector('button[aria-label="Zoom in"]');
    const zoomOut = document.querySelector('button[aria-label="Zoom out"]');
    const recenter = document.querySelector('button[aria-label="Recenter map"]');

    if (zoomIn) zoomIn.addEventListener("click", () => map.zoomIn());
    if (zoomOut) zoomOut.addEventListener("click", () => map.zoomOut());
    if (recenter) recenter.addEventListener("click", () => map.flyTo([40.7934, -73.9458], 13));

    return map;
  };

  if (!(window as any).L) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setTimeout(init, 100);
    document.head.appendChild(script);
  } else {
    setTimeout(init, 50);
  }
}
