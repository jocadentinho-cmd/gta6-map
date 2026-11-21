import { motion } from 'framer-motion';
import { IconFavorito, IconCheck, IconPin } from '../../utils/icons';
import { getCategoryColor, getRarityLabel, getConfidenceColor, getConfidenceLabel, getSubtypeLabel, hexToRgb } from '../../utils/icons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './LocationListItem.module.css';

interface LocationListItemProps {
  location: {
    id: string;
    name: string;
    category: 'dinheiro' | 'carro' | 'arma';
    subtype: string;
    rarity: 'comum' | 'raro' | 'mitico' | null;
    region: string;
    confidence: 'alta' | 'media' | 'baixa';
  };
  isSelected: boolean;
  isFavorite: boolean;
  isCollected: boolean;
  index: number;
  onClick: () => void;
}

export function LocationListItem({
  location,
  isSelected,
  isFavorite,
  isCollected,
  index,
  onClick,
}: LocationListItemProps) {
  const reducedMotion = useReducedMotion();
  const categoryColor = getCategoryColor(location.category);
  const rarity = location.rarity || 'comum';

  const handleClick = (e: React.MouseEvent) => {
    if (
      e.target instanceof HTMLButtonElement ||
      (e.target as HTMLElement).closest('button')
    ) {
      return;
    }
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.li
      className={`${styles.item} ${isSelected ? styles.selected : ''} ${isCollected ? styles.collected : ''}`}
      data-id={location.id}
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      transition={reducedMotion ? { duration: 0 } : { delay: Math.min(index * 0.03, 0.3), duration: 0.3 }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      aria-label={`${location.name}, ${location.region}, ${getRarityLabel(rarity)}, ${isCollected ? 'já coletado' : 'não coletado'}`}
      style={{ '--category-color': categoryColor } as React.CSSProperties}
    >
      <div className={styles.itemMain}>
        <div className={styles.pinIndicator}>
          <IconPin size={20} rarity={rarity} aria-hidden={true} />
        </div>

        <div className={styles.itemContent}>
          <div className={styles.itemHeader}>
            <h3 className={styles.itemName}>{location.name}</h3>
            <div className={styles.itemBadges}>
              <span
                className={`${styles.badge} ${styles.rarity}`}
                style={{
                  background: `rgba(${hexToRgb(categoryColor)}, 0.15)`,
                  color: categoryColor,
                  borderColor: categoryColor,
                }}
              >
                {getRarityLabel(rarity)}
              </span>
              <span
                className={`${styles.badge} ${styles.confidence}`}
                style={{ color: getConfidenceColor(location.confidence), borderColor: getConfidenceColor(location.confidence) }}
              >
                {getConfidenceLabel(location.confidence)}
              </span>
            </div>
          </div>

          <div className={styles.itemMeta}>
            <span className={styles.region}>
              <IconPin size={12} rarity="comum" aria-hidden={true} />
              {location.region}
            </span>
            <span className={styles.subtype}>{getSubtypeLabel(location.subtype)}</span>
          </div>
        </div>
      </div>

      <div className={styles.itemActions}>
        <button
          className={`${styles.actionButton} ${isFavorite ? styles.active : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            // Toggle favorito via store
            const store = (window as any).__APP_STORE__;
            if (store) store.getState().toggleFavorito(location.id);
          }}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <IconFavorito size={18} ativo={isFavorite} aria-hidden={true} />
        </button>

        <button
          className={`${styles.actionButton} ${styles.checkButton} ${isCollected ? styles.active : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            const store = (window as any).__APP_STORE__;
            if (store) store.getState().toggleChecklist(location.id);
          }}
          aria-pressed={isCollected}
          aria-label={isCollected ? 'Desmarcar como coletado' : 'Marcar como coletado'}
          title={isCollected ? 'Desmarcar como coletado' : 'Marcar como coletado'}
        >
          <IconCheck size={16} aria-hidden={true} />
        </button>
      </div>
    </motion.li>
  );
}