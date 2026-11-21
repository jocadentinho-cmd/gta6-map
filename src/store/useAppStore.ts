import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  Categoria,
  Subtipo,
  Raridade,
  Localizacao,
  FiltrosState,
  ProgressoGeral,
  UIState,
} from '../types';

interface AppState extends FiltrosState, UIState {
  favoritos: Set<string>;
  checklist: Set<string>;
  localizacoes: Localizacao[];
  progresso: ProgressoGeral;
  sugestaoAberta: boolean;
  setSugestaoAberta: (aberta: boolean) => void;
  toasts: Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; title: string; message?: string; duration?: number }>;
  adicionarToast: (toast: { type: 'success' | 'error' | 'warning' | 'info'; title: string; message?: string; duration?: number }) => void;
  removerToast: (id: string) => void;

  setLocalizacoes: (locais: Localizacao[]) => void;

  toggleCategoria: (cat: Categoria) => void;
  setCategorias: (cats: Categoria[]) => void;
  toggleSubtipo: (sub: Subtipo) => void;
  setSubtipos: (subs: Subtipo[]) => void;
  toggleRaridade: (rar: Raridade) => void;
  setRaridades: (rars: Raridade[]) => void;
  setBusca: (busca: string) => void;
  toggleApenasFavoritos: () => void;
  toggleApenasNaoPegos: () => void;
  limparFiltros: () => void;

  toggleFavorito: (id: string) => void;
  toggleChecklist: (id: string) => void;
  limparChecklist: () => void;

  setLocalizacaoSelecionada: (id: string | null) => void;
  setSidebarAberta: (aberta: boolean) => void;
  setFiltroAberto: (aberto: boolean) => void;
  setIntroCompleta: (completa: boolean) => void;
  setReduzirMovimento: (reduzido: boolean) => void;
  setTelaCheia: (cheia: boolean) => void;

  getLocalizacoesFiltradas: () => Localizacao[];
  getProgresso: () => ProgressoGeral;
  recalcularProgresso: () => void;
}

const filtrosIniciais: FiltrosState = {
  categorias: new Set<Categoria>(['dinheiro', 'carro', 'arma']),
  subtipos: new Set<Subtipo>(),
  raridades: new Set<Raridade>(['comum', 'raro', 'mitico', null]),
  busca: '',
  apenasFavoritos: false,
  apenasNaoPegos: false,
};

const uiInicial: UIState = {
  localizacaoSelecionada: null,
  sidebarAberta: true,
  filtroAberto: false,
  introCompleta: false,
  reduzirMovimento: false,
  telaCheia: false,
};

const toastsInicial: Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; title: string; message?: string; duration?: number }> = [];

const progressoInicial: ProgressoGeral = {
  dinheiro: { total: 0, favoritos: 0, pegos: 0 },
  carro: { total: 0, favoritos: 0, pegos: 0 },
  arma: { total: 0, favoritos: 0, pegos: 0 },
  total: { total: 0, favoritos: 0, pegos: 0 },
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...filtrosIniciais,
      ...uiInicial,
      sugestaoAberta: false,
      toasts: toastsInicial,
      favoritos: new Set<string>(),
      checklist: new Set<string>(),
      localizacoes: [],
      progresso: progressoInicial,

      setLocalizacoes: (locais) => {
        set({ localizacoes: locais });
        get().recalcularProgresso();
      },

      toggleCategoria: (cat) =>
        set((state) => {
          const novas = new Set(state.categorias);
          if (novas.has(cat)) novas.delete(cat);
          else novas.add(cat);
          return { categorias: novas };
        }),

      setCategorias: (cats) => set({ categorias: new Set(cats) }),

      toggleSubtipo: (sub) =>
        set((state) => {
          const novos = new Set(state.subtipos);
          if (novos.has(sub)) novos.delete(sub);
          else novos.add(sub);
          return { subtipos: novos };
        }),

      setSubtipos: (subs) => set({ subtipos: new Set(subs) }),

      toggleRaridade: (rar) =>
        set((state) => {
          const novas = new Set(state.raridades);
          if (novas.has(rar)) novas.delete(rar);
          else novas.add(rar);
          return { raridades: novas };
        }),

      setRaridades: (rars) => set({ raridades: new Set(rars) }),

      setBusca: (busca) => set({ busca }),

      toggleApenasFavoritos: () =>
        set((state) => ({ apenasFavoritos: !state.apenasFavoritos })),

      toggleApenasNaoPegos: () =>
        set((state) => ({ apenasNaoPegos: !state.apenasNaoPegos })),

      limparFiltros: () => set(filtrosIniciais),

      toggleFavorito: (id) =>
        set((state) => {
          const novos = new Set(state.favoritos);
          if (novos.has(id)) novos.delete(id);
          else novos.add(id);
          get().recalcularProgresso();
          return { favoritos: novos };
        }),

      toggleChecklist: (id) =>
        set((state) => {
          const novos = new Set(state.checklist);
          if (novos.has(id)) novos.delete(id);
          else novos.add(id);
          get().recalcularProgresso();
          return { checklist: novos };
        }),

      limparChecklist: () => {
        set({ checklist: new Set() });
        get().recalcularProgresso();
      },

      setLocalizacaoSelecionada: (id) => set({ localizacaoSelecionada: id }),

      setSidebarAberta: (aberta) => set({ sidebarAberta: aberta }),

      setFiltroAberto: (aberto) => set({ filtroAberto: aberto }),

      setIntroCompleta: (completa) => set({ introCompleta: completa }),

      setReduzirMovimento: (reduzido) => set({ reduzirMovimento: reduzido }),

      setTelaCheia: (cheia) => set({ telaCheia: cheia }),

      setSugestaoAberta: (aberta) => set({ sugestaoAberta: aberta }),

      adicionarToast: (toast) =>
        set((state) => ({
          toasts: [
            ...state.toasts,
            { ...toast, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` },
          ],
        })),

      removerToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),

      getLocalizacoesFiltradas: () => {
        const { localizacoes, categorias, subtipos, raridades, busca, apenasFavoritos, apenasNaoPegos, favoritos, checklist } = get();

        return localizacoes.filter((loc) => {
          if (!categorias.has(loc.category)) return false;
          if (subtipos.size > 0 && !subtipos.has(loc.subtype)) return false;
          if (raridades.size > 0 && !raridades.has(loc.rarity)) return false;
          if (busca && !loc.name.toLowerCase().includes(busca.toLowerCase()) &&
              !loc.region.toLowerCase().includes(busca.toLowerCase()) &&
              !loc.description.toLowerCase().includes(busca.toLowerCase())) {
            return false;
          }
          if (apenasFavoritos && !favoritos.has(loc.id)) return false;
          if (apenasNaoPegos && checklist.has(loc.id)) return false;
          return true;
        });
      },

      getProgresso: () => get().progresso,

      recalcularProgresso: () => {
        const { localizacoes, favoritos, checklist } = get();

        const progresso: ProgressoGeral = {
          dinheiro: { total: 0, favoritos: 0, pegos: 0 },
          carro: { total: 0, favoritos: 0, pegos: 0 },
          arma: { total: 0, favoritos: 0, pegos: 0 },
          total: { total: 0, favoritos: 0, pegos: 0 },
        };

        localizacoes.forEach((loc) => {
          const cat = progresso[loc.category];
          const totalGeral = progresso.total;

          cat.total++;
          totalGeral.total++;

          if (favoritos.has(loc.id)) {
            cat.favoritos++;
            totalGeral.favoritos++;
          }
          if (checklist.has(loc.id)) {
            cat.pegos++;
            totalGeral.pegos++;
          }
        });

        set({ progresso });
      },
    }),
    {
      name: 'gta6-mapa-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favoritos: Array.from(state.favoritos),
        checklist: Array.from(state.checklist),
        categorias: Array.from(state.categorias),
        subtipos: Array.from(state.subtipos),
        raridades: Array.from(state.raridades),
        apenasFavoritos: state.apenasFavoritos,
        apenasNaoPegos: state.apenasNaoPegos,
        introCompleta: state.introCompleta,
        reduzirMovimento: state.reduzirMovimento,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.favoritos = new Set(state.favoritos as unknown as string[]);
          state.checklist = new Set(state.checklist as unknown as string[]);
          state.categorias = new Set(state.categorias as unknown as Categoria[]);
          state.subtipos = new Set(state.subtipos as unknown as Subtipo[]);
          state.raridades = new Set(state.raridades as unknown as Raridade[]);
          state.recalcularProgresso();
        }
      },
    }
  )
);