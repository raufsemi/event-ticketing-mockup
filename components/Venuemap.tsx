"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type Props = {
  venue: string;
  city: string;
  /** Leave out to show just the address and directions links. */
  lat?: number;
  lng?: number;
  /** Pin colour, e.g. the event's accent. */
  color?: string;
};

// Free, no API key. Other looks: "liberty", "bright".
const STYLE = "https://tiles.openfreemap.org/styles/positron";

export default function VenueMap({
  venue,
  city,
  lat,
  lng,
  color = "#0F1A12",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const hasCoords = typeof lat === "number" && typeof lng === "number";

  useEffect(() => {
    if (lat == null || lng == null || !ref.current) return;
    const center: [number, number] = [lng, lat];
    let map: MapLibreMap | undefined;
    let cancelled = false;
    let loaded = false;

    // If the map hasn't drawn after 12s, stop showing a blank box.
    const timeout = window.setTimeout(
      () => !loaded && !cancelled && setFailed(true),
      12000,
    );

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      if (cancelled || !ref.current) return;

      map = new maplibregl.Map({
        container: ref.current,
        style: STYLE,
        center,
        zoom: 15,
        attributionControl: { compact: true },
        // One finger scrolls the page, two fingers move the map (Ctrl/⌘ + scroll on desktop).
        cooperativeGestures: true,
      });

      map.addControl(
        new maplibregl.NavigationControl({ showCompass: false }),
        "top-right",
      );

      // Pin: solid dot with a white ring and a soft halo.
      const pin = document.createElement("div");
      pin.setAttribute("aria-hidden", "true");
      pin.style.cssText = `
        width: 22px; height: 22px; border-radius: 9999px;
        background: ${color}; border: 4px solid #fff;
        box-shadow: 0 0 0 8px ${color}33, 0 4px 12px rgba(0,0,0,0.25);
      `;
      new maplibregl.Marker({ element: pin }).setLngLat(center).addTo(map);

      map.once("load", () => {
        loaded = true;
        if (!cancelled) setReady(true);
      });
      map.on("error", (ev) => {
        console.error("[VenueMap]", ev.error);
        if (!loaded && !cancelled) setFailed(true);
      });
    })().catch((err) => {
      console.error("[VenueMap]", err);
      if (!cancelled) setFailed(true);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      map?.remove();
    };
  }, [lat, lng, color]);

  const place = `${venue}, ${city}`;
  const google = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
  const waze = hasCoords
    ? `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`
    : `https://waze.com/ul?q=${encodeURIComponent(place)}&navigate=yes`;

  const button =
    "inline-flex flex-1 items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink sm:flex-none";

  return (
    <div>
      {hasCoords && (
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-canvas ring-1 ring-line sm:aspect-16/9">
          {!ready && !failed && (
            <div
              aria-hidden
              className="absolute inset-0 animate-pulse bg-line/40 motion-reduce:animate-none"
            />
          )}
          {failed && (
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <p className="text-sm text-muted">
                The map couldn’t load. Use the directions links below.
              </p>
            </div>
          )}
          <div
            ref={ref}
            role="region"
            aria-label={`Map showing ${place}`}
            className={`absolute inset-0 transition-opacity duration-500 ${ready && !failed ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      )}

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <p className="font-semibold text-ink">{venue}</p>
          <p className="mt-0.5 text-sm text-muted">{city}</p>
        </div>
        <div className="flex gap-2">
          <a
            href={google}
            target="_blank"
            rel="noopener noreferrer"
            className={button}
          >
            Google Maps
          </a>
          <a
            href={waze}
            target="_blank"
            rel="noopener noreferrer"
            className={button}
          >
            Waze
          </a>
        </div>
      </div>
    </div>
  );
}
