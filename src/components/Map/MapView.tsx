import { useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, useMap, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_CONFIG } from '../../data/mapConfig';
import { xyToLatLng } from '../../utils/coordinates';
import { ClusterLayer } from './ClusterLayer';
import { useAppStore } from '../../store/useAppStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './MapView.module.css';

declare global {
  interface Window {
    __MAP_READY__: boolean;
  }
}

function MapInitializer({ mapRef }: { mapRef?: React.RefObject<L.Map | null> }) {
  const map = useMap();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (mapRef) {
      mapRef.current = map;
    }
    window.__MAP_READY__ = true;

    map.on('zoomend moveend', () => {
      if (!reducedMotion) {
        map.getContainer().style.transition = 'transform 0.3s ease-out';
      }
    });

    return () => {
      window.__MAP_READY__ = false;
    };
  }, [map, reducedMotion, mapRef]);

  return null;
}

function FitBoundsOnFilterChange() {
  const map = useMap();
  const locaisFiltrados = useAppStore((state) => state.getLocalizacoesFiltradas());
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (locaisFiltrados.length === 0) return;

    const bounds = L.latLngBounds(
      locaisFiltrados.map((loc) => xyToLatLng(loc.x, loc.y))
    );

    if (bounds.isValid()) {
      if (reducedMotion) {
        map.fitBounds(bounds, { padding: [50, 50], animate: false });
      } else {
        map.flyToBounds(bounds, { padding: [50, 50], duration: 1.2, easeLinearity: 0.3 });
      }
    }
  }, [locaisFiltrados.length, map, reducedMotion]);

  return null;
}

export interface MapViewProps {
  onLocationClick: (id: string) => void;
  onLocationHover: (id: string | null) => void;
  selectedId: string | null;
  mapRef?: React.RefObject<L.Map | null>;
}

export function MapView({
  onLocationClick,
  onLocationHover,
  selectedId,
  mapRef,
}: MapViewProps) {
  const locaisFiltrados = useAppStore((state) => state.getLocalizacoesFiltradas());
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const mapOptions = useMemo(() => ({
    crs: L.CRS.Simple,
    minZoom: MAP_CONFIG.minZoom,
    maxZoom: MAP_CONFIG.maxZoom,
    zoomControl: false,
    attributionControl: false,
    zoomAnimation: !reducedMotion,
    fadeAnimation: !reducedMotion,
    markerZoomAnimation: !reducedMotion,
    preferCanvas: true,
  }), [reducedMotion]);

  return (
    <div className={styles.mapContainer} ref={containerRef} role="application" aria-label="Mapa interativo de Leonida">
      <MapContainer
        center={MAP_CONFIG.defaultCenter}
        zoom={MAP_CONFIG.defaultZoom}
        {...mapOptions}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={MAP_CONFIG.imageSrc}
          bounds={MAP_CONFIG.bounds}
          noWrap
          attribution=""
          crossOrigin=""
        />
        <LayerGroup>
          <ClusterLayer
            locations={locaisFiltrados}
            onLocationClick={onLocationClick}
            onLocationHover={onLocationHover}
            selectedId={selectedId}
            reducedMotion={reducedMotion}
          />
        </LayerGroup>
        <MapInitializer mapRef={mapRef} />
        <FitBoundsOnFilterChange />
      </MapContainer>
      <div className={styles.attribution} role="contentinfo">
        Mapa não oficial • Dados de fãs • <a href="https://gta.fandom.com" target="_blank" rel="noopener noreferrer">GTA Wiki</a>
      </div>
    </div>
  );
}

export function MapWrapper({
  onLocationClick,
  onLocationHover,
  selectedId,
}: Omit<MapViewProps, 'mapRef'>) {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <MapView
      onLocationClick={onLocationClick}
      onLocationHover={onLocationHover}
      selectedId={selectedId}
      mapRef={mapRef}
    />
  );
}