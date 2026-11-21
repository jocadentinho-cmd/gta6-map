import { useEffect, useRef, useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { animatePinDrop, animatePinPulse } from '../../hooks/useGSAP';
import type { Localizacao } from '../../types';
import styles from './PinMarker.module.css';

interface PinMarkerProps {
  location: Localizacao;
  isSelected: boolean;
  isHovered: boolean;
  onClick: (id: string) => void;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
  reducedMotion: boolean;
}

const PinIcon = ({ 
  location, 
  isSelected, 
  isHovered, 
  onClick,
  onMouseEnter,
  onMouseLeave,
  reducedMotion 
}: PinMarkerProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

const iconHtml = useMemo(() => {
    const rarity = location.rarity || 'comum';
    return `
      <div class="${styles.pinWrapper} ${isSelected ? styles.selected : ''} ${isHovered ? styles.hovered : ''} ${styles[rarity]}" 
           style="--pin-color: ${getCategoryColor(location.category)};">
        <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 2 C10.3 2 4 8.3 4 16 C4 28 18 46 18 46 C18 46 32 28 32 16 C32 8.3 25.7 2 18 2 Z" fill="var(--pin-color)" stroke="#1A1A1A" stroke-width="1.5"/>
          <circle cx="18" cy="16" r="5" fill="#1A1A1A" opacity="0.2"/>
        </svg>
      </div>
    `;
  }, [location, isSelected, isHovered]);

  useEffect(() => {
    if (!reducedMotion && !isMounted.current) {
      isMounted.current = true;
      const el = iconRef.current?.querySelector(`.${styles.pinWrapper}`) as HTMLElement;
      if (el) {
        animatePinDrop(el, Math.random() * 0.3);
        if (location.rarity === 'raro' || location.rarity === 'mitico') {
          animatePinPulse(el, location.rarity);
        }
      }
    }
  }, [location.id, location.rarity, reducedMotion]);

  return (
    <div
      ref={iconRef}
      className={styles.pinContainer}
      role="button"
      tabIndex={0}
      aria-label={`${location.name}, ${getCategoryLabel(location.category)}, ${getRarityLabel(location.rarity)}`}
      aria-pressed={isSelected}
      onClick={() => onClick(location.id)}
      onMouseEnter={() => onMouseEnter(location.id)}
      onMouseLeave={() => onMouseLeave(location.id)}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(location.id);
        }
      }}
      dangerouslySetInnerHTML={{ __html: iconHtml }}
    />
  );
};

function getCategoryColor(category: 'dinheiro' | 'carro' | 'arma'): string {
  switch (category) {
    case 'dinheiro': return '#B5651A';
    case 'carro': return '#00B4D8';
    case 'arma': return '#FF006E';
  }
}

function getCategoryLabel(category: 'dinheiro' | 'carro' | 'arma'): string {
  switch (category) {
    case 'dinheiro': return 'Dinheiro';
    case 'carro': return 'Carro';
    case 'arma': return 'Arma';
  }
}

function getRarityLabel(rarity: 'comum' | 'raro' | 'mitico' | null): string {
  if (!rarity) return 'Comum';
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}

export function PinMarker({
  location,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
  reducedMotion,
}: PinMarkerProps) {
  const [lat, lng] = [location.y, location.x];

  return (
    <Marker
      position={[lat, lng]}
      icon={L.divIcon({
        className: '',
        html: '',
        iconSize: [36, 48],
        iconAnchor: [18, 48],
        popupAnchor: [0, -48],
      })}
    >
      <PinIcon
        location={location}
        isSelected={isSelected}
        isHovered={isHovered}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        reducedMotion={reducedMotion}
      />
    </Marker>
  );
}