export type Categoria = 'dinheiro' | 'carro' | 'arma';

export type SubtipoDinheiro =
  | 'cofre'
  | 'caixa_forte'
  | 'entrega'
  | 'assalto'
  | 'investimento'
  | 'outro';

export type SubtipoCarro =
  | 'muscle'
  | 'esportivo'
  | 'super'
  | 'classico'
  | 'offroad'
  | 'moto'
  | 'utilitario'
  | 'outro';

export type SubtipoArma =
  | 'corpo_a_corpo'
  | 'pistola'
  | 'smg'
  | 'rifle'
  | 'sniper'
  | 'pesada'
  | 'projetil'
  | 'especial'
  | 'outro';

export type Subtipo = SubtipoDinheiro | SubtipoCarro | SubtipoArma;

export type Raridade = 'comum' | 'raro' | 'mitico' | null;

export type Confianca = 'alta' | 'media' | 'baixa';

export type PrecisaoPosicao = 'aproximada' | 'exata';

export interface Localizacao {
  id: string;
  name: string;
  category: Categoria;
  subtype: Subtipo;
  rarity: Raridade;
  region: string;
  x: number;
  y: number;
  position_precision: PrecisaoPosicao;
  description: string;
  tip: string;
  confidence: Confianca;
  verified: boolean;
  source_urls: string[];
}

export interface FiltrosState {
  categorias: Set<Categoria>;
  subtipos: Set<Subtipo>;
  raridades: Set<Raridade>;
  busca: string;
  apenasFavoritos: boolean;
  apenasNaoPegos: boolean;
}

export interface FavoritosState {
  ids: Set<string>;
}

export interface ChecklistState {
  ids: Set<string>;
}

export interface UIState {
  localizacaoSelecionada: string | null;
  sidebarAberta: boolean;
  filtroAberto: boolean;
  introCompleta: boolean;
  reduzirMovimento: boolean;
  telaCheia: boolean;
}

export interface ProgressoCategoria {
  total: number;
  favoritos: number;
  pegos: number;
}

export interface ProgressoGeral {
  dinheiro: ProgressoCategoria;
  carro: ProgressoCategoria;
  arma: ProgressoCategoria;
  total: ProgressoCategoria;
}

export interface SugestaoLocalizacao {
  name: string;
  category: Categoria;
  subtype: Subtipo;
  rarity: Raridade;
  region: string;
  x: number;
  y: number;
  description: string;
  tip: string;
  source_urls: string[];
}

export interface MapConfig {
  imageSrc: string;
  width: number;
  height: number;
  bounds: [[number, number], [number, number]];
  crs: 'simple';
}

export interface PinProps {
  localizacao: Localizacao;
  isSelected: boolean;
  isHovered: boolean;
  onClick: (id: string) => void;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
}

export interface ClusterProps {
  count: number;
  children: Localizacao[];
  onClick: () => void;
}

export type Viewport = {
  center: [number, number];
  zoom: number;
};