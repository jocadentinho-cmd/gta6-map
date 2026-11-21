import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  'aria-hidden'?: React.AriaAttributes['aria-hidden'];
  style?: React.CSSProperties;
}

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 10)}, ${parseInt(result[2], 10)}, ${parseInt(result[3], 10)}`
    : '0, 0, 0';
}

export const IconDinheiro: React.FC<IconProps> = ({ size = 24, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
    role="img"
    aria-label="Dinheiro"
  >
    <defs>
      <filter id="traco-irregular-dinheiro" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g filter="url(#traco-irregular-dinheiro)">
      <path
        d="M20 25 L35 25 L35 20 L40 15 L45 20 L45 25 L60 25 L60 30 L45 30 L45 35 L40 40 L35 35 L35 30 L20 30 Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 35 L55 35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M30 42 L50 42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <ellipse cx="50" cy="70" rx="22" ry="12" stroke="currentColor" strokeWidth="3" fill="none" />
      <path d="M28 70 Q50 55 72 70" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M35 75 Q50 65 65 75" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <circle cx="50" cy="70" r="3" fill="currentColor" />
      <path d="M40 50 L45 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 50 L55 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

export const IconCarro: React.FC<IconProps> = ({ size = 24, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
    role="img"
    aria-label="Carro"
  >
    <defs>
      <filter id="traco-irregular-carro" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g filter="url(#traco-irregular-carro)">
      <path
        d="M12 65 L15 55 Q20 48 30 48 L50 48 Q60 48 65 55 L68 65"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 48 Q35 38 40 35 L45 35 Q50 38 55 48"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="22" cy="68" rx="7" ry="7" stroke="currentColor" strokeWidth="3" fill="none" />
      <ellipse cx="58" cy="68" rx="7" ry="7" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle cx="22" cy="68" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="58" cy="68" r="2" fill="currentColor" opacity="0.6" />
      <path d="M25 52 L30 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M55 48 L60 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M40 35 L42 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M45 35 L48 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

export const IconArma: React.FC<IconProps> = ({ size = 24, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
    role="img"
    aria-label="Arma"
  >
    <defs>
      <filter id="traco-irregular-arma" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g filter="url(#traco-irregular-arma)">
      <path
        d="M35 30 L50 15 L65 30 L65 55 Q65 65 55 70 L45 70 Q35 65 35 55 Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M50 15 L50 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="50" cy="45" rx="8" ry="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M42 45 L58 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M50 70 L50 85" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="50" cy="88" rx="6" ry="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M44 88 L56 88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M35 40 Q30 45 35 50" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M65 40 Q70 45 65 50" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
      <circle cx="50" cy="45" r="1.5" fill="currentColor" />
    </g>
  </svg>
);

export const IconPin: React.FC<IconProps & { rarity?: 'comum' | 'raro' | 'mitico' }> = ({
  size = 36,
  className = '',
  rarity = 'comum',
  'aria-hidden': ariaHidden = true,
}) => {
  const colors = {
    comum: 'currentColor',
    raro: '#00B4D8',
    mitico: '#FF006E',
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
      aria-label={`Localização ${rarity}`}
    >
      <defs>
        <filter id="pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.3" />
        </filter>
        <filter id="pin-glow-raro" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood flood-color="#00B4D8" flood-opacity="0.6" result="glow" />
          <feComposite in="glow" in2="blur" operator="in" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pin-glow-mitico" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feFlood flood-color="#FF006E" flood-opacity="0.7" result="glow" />
          <feComposite in="glow" in2="blur" operator="in" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={rarity === 'raro' ? 'url(#pin-glow-raro)' : rarity === 'mitico' ? 'url(#pin-glow-mitico)' : 'url(#pin-shadow)'}>
        <path
          d="M18 2 C10.3 2 4 8.3 4 16 C4 28 18 46 18 46 C18 46 32 28 32 16 C32 8.3 25.7 2 18 2 Z"
          fill={colors[rarity]}
          stroke="#1A1A1A"
          strokeWidth="1.5"
        />
        <circle cx="18" cy="16" r="5" fill="#1A1A1A" opacity="0.2" />
        {rarity === 'raro' && (
          <path d="M18 10 L21 14 L15 14 Z" fill="#00B4D8" opacity="0.9" />
        )}
        {rarity === 'mitico' && (
          <g>
            <path d="M18 8 L20 12 L16 12 Z" fill="#FF006E" />
            <path d="M18 14 L20 18 L16 18 Z" fill="#FF006E" opacity="0.7" />
          </g>
        )}
      </g>
    </svg>
  );
};

export const IconCarimbo: React.FC<IconProps> = ({ size = 48, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
    role="img"
    aria-label="Já peguei"
  >
    <defs>
      <filter id="carimbo-tinta" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        <feMorphology operator="erode" radius="1" />
      </filter>
    </defs>
    <g filter="url(#carimbo-tinta)">
      <circle cx="50" cy="50" r="44" stroke="#FF006E" strokeWidth="5" fill="none" />
      <circle cx="50" cy="50" r="38" stroke="#FF006E" strokeWidth="2" strokeDasharray="6 4" fill="none" />
      <text x="50" y="55" textAnchor="middle" fontFamily="'Bricolage Grotesque', sans-serif" fontWeight="800" fontSize="16" fill="#FF006E" transform="rotate(-8 50 55)">
        JÁ PEGUEI
      </text>
      <ellipse cx="50" cy="50" rx="30" ry="18" stroke="#FF006E" strokeWidth="1" fill="none" opacity="0.3" />
    </g>
  </svg>
);

export const IconFavorito: React.FC<IconProps & { ativo?: boolean }> = ({
  size = 24,
  className = '',
  ativo = false,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
    role="img"
    aria-label={ativo ? 'Favorito ativo' : 'Adicionar aos favoritos'}
  >
    <defs>
      <filter id="estrela-brilho" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feFlood flood-color="#FF006E" flood-opacity="0.5" result="glow" />
        <feComposite in="glow" in2="blur" operator="in" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M12 2 L15 9 L22 9 L17 13 L19 20 L12 16 L5 20 L7 13 L2 9 L9 9 Z"
      fill={ativo ? '#FF006E' : 'none'}
      stroke={ativo ? '#FF006E' : 'currentColor'}
      strokeWidth={ativo ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      filter={ativo ? 'url(#estrela-brilho)' : 'none'}
    />
  </svg>
);

export const IconLupa: React.FC<IconProps> = ({ size = 20, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M21 21 L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconMenu: React.FC<IconProps> = ({ size = 24, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M3 6 H21 M3 12 H21 M3 18 H21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const IconX: React.FC<IconProps> = ({ size = 20, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M18 6 L6 18 M6 6 L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const IconSeta: React.FC<IconProps> = ({ size = 20, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M5 12 L19 12 M12 5 L19 12 L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCheck: React.FC<IconProps> = ({ size = 20, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M20 6 L9 17 L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconFiltro: React.FC<IconProps> = ({ size = 22, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <polygon points="22 3 2 3 12 13 22 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M5 16 H19 M7 20 H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconMais: React.FC<IconProps> = ({ size = 22, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M12 5 V19 M5 12 H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const IconCopiar: React.FC<IconProps> = ({ size = 20, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M5 15 H11 V21 H5 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconExterno: React.FC<IconProps> = ({ size = 16, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M18 13 V6 A2 2 0 0 0 16 4 H8 A2 2 0 0 0 6 6 V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconAlerta: React.FC<IconProps> = ({ size = 20, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M10.29 3.86 L1.82 18 A2 2 0 0 0 3.82 21 H20.18 A2 2 0 0 0 22.18 18 L13.71 3.86 A2 2 0 0 0 10.29 3.86 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function getCategoryIcon(category: 'dinheiro' | 'carro' | 'arma') {
  switch (category) {
    case 'dinheiro': return IconDinheiro;
    case 'carro': return IconCarro;
    case 'arma': return IconArma;
  }
}

export function getCategoryColor(category: 'dinheiro' | 'carro' | 'arma') {
  switch (category) {
    case 'dinheiro': return '#B5651A';
    case 'carro': return '#00B4D8';
    case 'arma': return '#FF006E';
  }
}

export function getCategoryLabel(category: 'dinheiro' | 'carro' | 'arma') {
  switch (category) {
    case 'dinheiro': return 'Dinheiro';
    case 'carro': return 'Carros';
    case 'arma': return 'Armas';
  }
}

export function getSubtypeLabel(subtype: string): string {
  const labels: Record<string, string> = {
    cofre: 'Cofre',
    caixa_forte: 'Caixa Forte',
    entrega: 'Entrega',
    assalto: 'Assalto',
    investimento: 'Investimento',
    muscle: 'Muscle',
    esportivo: 'Esportivo',
    super: 'Super',
    classico: 'Clássico',
    offroad: 'Off-road',
    moto: 'Moto',
    utilitario: 'Utilitário',
    corpo_a_corpo: 'Corpo a Corpo',
    pistola: 'Pistola',
    smg: 'Submetralhadora',
    rifle: 'Fuzil',
    sniper: 'Sniper',
    pesada: 'Pesada',
    projetil: 'Projétil',
    especial: 'Especial',
  };
  return labels[subtype] || subtype;
}

export function getRarityLabel(rarity: 'comum' | 'raro' | 'mitico' | null): string {
  if (!rarity) return '—';
  const labels: Record<string, string> = {
    comum: 'Comum',
    raro: 'Raro',
    mitico: 'Mítico',
  };
  return labels[rarity] || rarity;
}

export function getConfidenceLabel(confidence: 'alta' | 'media' | 'baixa'): string {
  const labels: Record<string, string> = {
    alta: 'Alta',
    media: 'Média',
    baixa: 'Baixa',
  };
  return labels[confidence] || confidence;
}

export function getConfidenceColor(confidence: 'alta' | 'media' | 'baixa'): string {
  switch (confidence) {
    case 'alta': return '#2D6A4F';
    case 'media': return '#D48B2E';
    case 'baixa': return '#FF006E';
  }
}

export const IconAdicionar: React.FC<IconProps> = ({ size = 22, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <path d="M12 5 V19 M5 12 H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const IconInfo: React.FC<IconProps> = ({ size = 20, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconLinkExterno: React.FC<IconProps> = ({ size = 16, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <path d="M18 13 V6 A2 2 0 0 0 16 4 H8 A2 2 0 0 0 6 6 V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconYoutube: React.FC<IconProps> = ({ size = 16, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <path d="M23.5 6.5 A2.5 2.5 0 0 0 21 4 H3 A2.5 2.5 0 0 0 .5 6.5 V17.5 A2.5 2.5 0 0 0 3 20 H21 A2.5 2.5 0 0 0 23.5 17.5 V6.5 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <polygon points="10 8 16 12 10 16" fill="currentColor" />
  </svg>
);

export const IconTwitter: React.FC<IconProps> = ({ size = 16, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <path d="M23 3 A13 13 0 0 1 1 21 M22 3 L1 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 3.5 A6 6 0 0 1 19 10 M16 3.5 A6 6 0 0 0 12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const IconReddit: React.FC<IconProps> = ({ size = 16, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M14 9 A2 2 0 1 1 10 9 M14 15 A2 2 0 1 1 10 15" stroke="currentColor" strokeWidth="2" />
    <path d="M9 14 Q12 17 15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M8 12 L10 12 M14 12 L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconWiki: React.FC<IconProps> = ({ size = 16, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <path d="M12 2 L2 7 L12 12 L22 7 L12 2 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M2 7 L12 12 L22 7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 12 V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconCoordenadas: React.FC<IconProps> = ({ size = 16, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const IconRelogio: React.FC<IconProps> = ({ size = 16, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6 V12 L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconUsuario: React.FC<IconProps> = ({ size = 16, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <path d="M20 21 A8 8 0 0 0 4 21 M12 11 A4 4 0 1 1 12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconEstrela: React.FC<IconProps> = ({ size = 24, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <path d="M12 2 L15 9 L22 9 L17 13 L19 20 L12 16 L5 20 L7 13 L2 9 L9 9 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconFolha: React.FC<IconProps> = ({ size = 24, className = '', 'aria-hidden': ariaHidden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden={ariaHidden}>
    <path d="M12 2 C7 5 4 10 4 15 C4 20 7 23 12 23 C17 23 20 20 20 15 C20 10 17 5 12 2 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 2 V23 M4 15 L20 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);