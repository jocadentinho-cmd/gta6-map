import { MAP_CONFIG } from '../data/mapConfig';

export function xyToLatLng(x: number, y: number): [number, number] {
  const { bounds } = MAP_CONFIG;
  const [[minLat, minLng], [maxLat, maxLng]] = bounds;

  const lat = minLat + (y / MAP_CONFIG.height) * (maxLat - minLat);
  const lng = minLng + (x / MAP_CONFIG.width) * (maxLng - minLng);

  return [lat, lng];
}

export function latLngToXY(lat: number, lng: number): { x: number; y: number } {
  const { bounds } = MAP_CONFIG;
  const [[minLat, minLng], [maxLat, maxLng]] = bounds;

  const x = ((lng - minLng) / (maxLng - minLng)) * MAP_CONFIG.width;
  const y = ((lat - minLat) / (maxLat - minLat)) * MAP_CONFIG.height;

  return { x, y };
}

export function normalizeCoordinate(value: number, max: number = 1000): number {
  return Math.max(0, Math.min(max, Math.round(value)));
}

export function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function getBoundsFromPoints(points: { x: number; y: number }[]): {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
} {
  if (points.length === 0) return { minX: 0, maxX: 1000, minY: 0, maxY: 1000 };

  let minX = points[0].x;
  let maxX = points[0].x;
  let minY = points[0].y;
  let maxY = points[0].y;

  points.forEach(p => {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  });

  return { minX, maxX, minY, maxY };
}

export function fitBoundsToMap(points: { x: number; y: number }[], padding: number = 50): {
  center: [number, number];
  zoom: number;
} {
  const bounds = getBoundsFromPoints(points);
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = (bounds.minY + bounds.maxY) / 2;
  const width = bounds.maxX - bounds.minX + padding * 2;
  const height = bounds.maxY - bounds.minY + padding * 2;

  const zoomX = MAP_CONFIG.width / width;
  const zoomY = MAP_CONFIG.height / height;
  const zoom = Math.min(zoomX, zoomY, MAP_CONFIG.maxZoom);

  return {
    center: [centerY, centerX],
    zoom: Math.max(MAP_CONFIG.minZoom, zoom),
  };
}