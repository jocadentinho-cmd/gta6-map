export const MAP_CONFIG = {
  imageSrc: '/mapa-leonida.svg',
  width: 1000,
  height: 1000,
  bounds: [[0, 0], [1000, 1000]] as [[number, number], [number, number]],
  crs: 'simple' as const,
  minZoom: 0,
  maxZoom: 4,
  defaultZoom: 1,
  defaultCenter: [500, 500] as [number, number],
};

export const REGIOES = [
  { id: 'vice-city', nome: 'Vice City Metro', x: 750, y: 350, cor: '#B5651A' },
  { id: 'keys', nome: 'Leonida Keys', x: 900, y: 700, cor: '#00B4D8' },
  { id: 'everglades', nome: 'Everglades', x: 300, y: 600, cor: '#2D6A4F' },
  { id: 'panhandle', nome: 'Panhandle', x: 200, y: 200, cor: '#D48B2E' },
  { id: 'costa-leste', nome: 'Costa Leste', x: 600, y: 150, cor: '#FF006E' },
  { id: 'lagos', nome: 'Região dos Lagos', x: 400, y: 400, cor: '#48CAE4' },
];

export const ESTRADAS_PRINCIPAIS = [
  { id: 'i-95', pontos: [[100, 100], [500, 200], [750, 350], [900, 500]] },
  { id: 'us-1', pontos: [[750, 350], [850, 550], [900, 700]] },
  { id: 'i-75', pontos: [[200, 200], [400, 400], [300, 600]] },
];

export function converterParaLatLng(x: number, y: number): [number, number] {
  return [y, x];
}

export function converterParaXY(lat: number, lng: number): { x: number; y: number } {
  return { x: lng, y: lat };
}

export function normalizarCoordenada(valor: number, max: 1000): number {
  return Math.max(0, Math.min(max, Math.round(valor)));
}