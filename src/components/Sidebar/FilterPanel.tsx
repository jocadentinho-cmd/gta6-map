import { useAppStore } from '../../store/useAppStore';
import { getCategoryLabel, getSubtypeLabel, getRarityLabel } from '../../utils/icons';
import { IconX, IconCheck } from '../../utils/icons';
import styles from './FilterPanel.module.css';

const SUBTIPOS_POR_CATEGORIA = {
  dinheiro: ['cofre', 'caixa_forte', 'entrega', 'assalto', 'investimento', 'outro'],
  carro: ['muscle', 'esportivo', 'super', 'classico', 'offroad', 'moto', 'utilitario', 'outro'],
  arma: ['corpo_a_corpo', 'pistola', 'smg', 'rifle', 'sniper', 'pesada', 'projetil', 'especial', 'outro'],
} as const;

export function FilterPanel({ onClose }: { onClose: () => void }) {
  const {
    categorias,
    subtipos,
    raridades,
    toggleCategoria,
    toggleSubtipo,
    toggleRaridade,
    apenasFavoritos,
    apenasNaoPegos,
    toggleApenasFavoritos,
    toggleApenasNaoPegos,
    limparFiltros,
    setSubtipos,
  } = useAppStore();

  const subtiposDisponiveis = Array.from(categorias).flatMap((cat) =>
    SUBTIPOS_POR_CATEGORIA[cat] || []
  );

  const handleSubtipoChange = (subtipo: string, checked: boolean) => {
    if (checked) {
      const novos = new Set(subtipos);
      novos.add(subtipo as any);
      setSubtipos(Array.from(novos));
    } else {
      toggleSubtipo(subtipo as any);
    }
  };

  return (
    <div className={styles.panel} role="region" aria-label="Filtros de localizações">
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>Filtros</h3>
        <button
          className={styles.clearButton}
          onClick={limparFiltros}
          aria-label="Limpar todos os filtros"
        >
          <IconX size={18} aria-hidden="true" />
          Limpar
        </button>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Categorias</h4>
        <div className={styles.checkboxGroup} role="group" aria-label="Categorias">
          {(['dinheiro', 'carro', 'arma'] as const).map((cat) => (
            <label key={cat} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={categorias.has(cat)}
                onChange={() => toggleCategoria(cat)}
                aria-label={getCategoryLabel(cat)}
              />
              <span className={styles.checkboxCustom} aria-hidden={true}>
                <IconCheck size={14} aria-hidden={true} />
              </span>
              <span className={styles.checkboxText}>{getCategoryLabel(cat)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Subtipos</h4>
        <div className={styles.checkboxGroup} role="group" aria-label="Subtipos">
          {subtiposDisponiveis.map((sub) => (
            <label key={sub} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={subtipos.has(sub as any)}
                onChange={(event) => handleSubtipoChange(sub, event.target.checked)}
                aria-label={getSubtypeLabel(sub)}
              />
              <span className={styles.checkboxCustom} aria-hidden={true}>
                <IconCheck size={14} aria-hidden={true} />
              </span>
              <span className={styles.checkboxText}>{getSubtypeLabel(sub)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Raridade</h4>
        <div className={styles.checkboxGroup} role="group" aria-label="Raridade">
          {(['comum', 'raro', 'mitico', null] as const).map((rar) => (
            <label key={rar ?? 'sem'} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={raridades.has(rar)}
                onChange={() => toggleRaridade(rar)}
                aria-label={getRarityLabel(rar)}
              />
              <span className={styles.checkboxCustom} aria-hidden={true}>
                <IconCheck size={14} aria-hidden={true} />
              </span>
              <span className={styles.checkboxText}>{getRarityLabel(rar)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Opções</h4>
        <div className={styles.checkboxGroup} role="group" aria-label="Opções de exibição">
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={apenasFavoritos}
              onChange={toggleApenasFavoritos}
              aria-label="Apenas favoritos"
            />
            <span className={styles.checkboxCustom} aria-hidden={true}>
              <IconCheck size={14} aria-hidden={true} />
            </span>
            <span className={styles.checkboxText}>Apenas favoritos</span>
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={apenasNaoPegos}
              onChange={toggleApenasNaoPegos}
              aria-label="Apenas não coletados"
            />
            <span className={styles.checkboxCustom} aria-hidden={true}>
              <IconCheck size={14} aria-hidden={true} />
            </span>
            <span className={styles.checkboxText}>Apenas não coletados</span>
          </label>
        </div>
      </div>

      <button
        className={styles.closePanelButton}
        onClick={onClose}
        type="button"
      >
        Fechar filtros
      </button>
    </div>
  );
}