import { useMemo } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import type { Localizacao } from '../../types';

interface MarkerOptionsWithCategory extends L.MarkerOptions {
  category?: 'dinheiro' | 'carro' | 'arma';
  rarity?: 'comum' | 'raro' | 'mitico';
}

interface ClusterLayerProps {
  locations: Localizacao[];
  onLocationClick: (id: string) => void;
  onLocationHover: (id: string | null) => void;
  selectedId: string | null;
  reducedMotion: boolean;
}

function ClusterGroup({
  locations,
  onLocationClick,
  onLocationHover,
  selectedId,
}: ClusterLayerProps) {
  const map = useMap();
  const clusterRef = useMemo(() => {
    const cluster = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      singleMarkerMode: false,
      maxClusterRadius: 60,
      iconCreateFunction: (cluster: any) => {
        const count = cluster.getChildCount();
        const children = cluster.getAllChildMarkers();
        const categories = new Set(children.map((m: any) => m.options.category));
        const hasRaro = children.some((m: any) => m.options.rarity === 'raro');
        const hasMitico = children.some((m: any) => m.options.rarity === 'mitico');

        let bgColor = '#1A1A1A';
        let borderColor = '#1A1A1A';
        if (hasMitico) {
          bgColor = '#FF006E';
          borderColor = '#FF006E';
        } else if (hasRaro) {
          bgColor = '#00B4D8';
          borderColor = '#00B4D8';
        } else if (categories.size > 1) {
          bgColor = 'linear-gradient(135deg, #B5651A, #00B4D8, #FF006E)';
          borderColor = '#1A1A1A';
        } else if (categories.has('dinheiro')) {
          bgColor = '#B5651A';
        } else if (categories.has('carro')) {
          bgColor = '#00B4D8';
        } else if (categories.has('arma')) {
          bgColor = '#FF006E';
        }

        const size = count < 10 ? 40 : count < 100 ? 50 : 60;

        return L.divIcon({
          html: `
            <div style="
              width: ${size}px;
              height: ${size}px;
              border-radius: 50%;
              background: ${bgColor};
              border: 3px solid ${borderColor};
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Bricolage Grotesque', sans-serif;
              font-weight: 800;
              font-size: ${count < 10 ? '14px' : count < 100 ? '16px' : '18px'};
              color: white;
              text-shadow: 0 0 4px rgba(0,0,0,0.5);
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            ">
              ${count}
            </div>
          `,
          className: 'custom-cluster',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
      },
    });

    return cluster;
  }, []);

  useMemo(() => {
    clusterRef.clearLayers();

    locations.forEach((loc) => {
      const markerOptions: MarkerOptionsWithCategory = {
        category: loc.category,
        rarity: loc.rarity || 'comum',
      };

      const marker = L.marker([loc.y, loc.x], markerOptions);

      marker.on('click', () => onLocationClick(loc.id));
      marker.on('mouseover', () => onLocationHover(loc.id));
      marker.on('mouseout', () => onLocationHover(null));

      const pinHtml = `
        <div class="pin-marker ${loc.category} ${loc.rarity || 'comum'} ${loc.id === selectedId ? 'selected' : ''}" 
             style="--pin-color: ${getCategoryColor(loc.category)};">
          <svg width="36" height="48" viewBox="0 0 36 48" fill="none">
            <path d="M18 2 C10.3 2 4 8.3 4 16 C4 28 18 46 18 46 C18 46 32 28 32 16 C32 8.3 25.7 2 18 2 Z" fill="var(--pin-color)" stroke="#1A1A1A" stroke-width="1.5"/>
            <circle cx="18" cy="16" r="5" fill="#1A1A1A" opacity="0.2"/>
          </svg>
        </div>
      `;

      marker.setIcon(L.divIcon({
        className: '',
        html: pinHtml,
        iconSize: [36, 48],
        iconAnchor: [18, 48],
        popupAnchor: [0, -48],
      }));

      clusterRef.addLayer(marker);
    });

    if (map.hasLayer(clusterRef)) {
      map.removeLayer(clusterRef);
    }
    map.addLayer(clusterRef);
  }, [locations, selectedId, onLocationClick, onLocationHover, map, clusterRef]);

  return null;
}

function getCategoryColor(category: 'dinheiro' | 'carro' | 'arma'): string {
  switch (category) {
    case 'dinheiro': return '#B5651A';
    case 'carro': return '#00B4D8';
    case 'arma': return '#FF006E';
  }
}

export function ClusterLayer(props: ClusterLayerProps) {
  return <ClusterGroup {...props} />;
}