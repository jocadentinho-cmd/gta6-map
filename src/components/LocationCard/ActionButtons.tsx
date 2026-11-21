import { motion } from 'framer-motion';
import { IconFavorito, IconCheck, IconCarimbo } from '../../utils/icons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  location: {
    id: string;
    category: 'dinheiro' | 'carro' | 'arma';
  };
  isFavorite: boolean;
  isCollected: boolean;
  onToggleFavorite: () => void;
  onToggleCollected: () => void;
}

export function ActionButtons({
  location,
  isFavorite,
  isCollected,
  onToggleFavorite,
  onToggleCollected,
}: ActionButtonsProps) {
  const reducedMotion = useReducedMotion();
  const categoryColor = getCategoryColor(location.category);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  const handleCollected = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCollected();
  };

  return (
    <div className={styles.actions}>
      <motion.button
        className={`${styles.actionBtn} ${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
        onClick={handleFavorite}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={reducedMotion ? { duration: 0 } : undefined}
        style={{ '--category-color': categoryColor } as React.CSSProperties}
      >
        <IconFavorito size={22} ativo={isFavorite} aria-hidden={true} />
        <span className={styles.label}>{isFavorite ? 'Favoritado' : 'Favoritar'}</span>
      </motion.button>

      <motion.button
        className={`${styles.actionBtn} ${styles.collectBtn} ${isCollected ? styles.active : ''}`}
        onClick={handleCollected}
        aria-pressed={isCollected}
        aria-label={isCollected ? 'Desmarcar como coletado' : 'Marcar como coletado'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={reducedMotion ? { duration: 0 } : undefined}
      >
        <IconCheck size={20} aria-hidden={true} />
        <span className={styles.label}>{isCollected ? 'Coletado' : 'Marcar coletado'}</span>
        {isCollected && (
          <IconCarimbo size={24} className={styles.stamp} aria-hidden={true} />
        )}
      </motion.button>
    </div>
  );
}

function getCategoryColor(category: 'dinheiro' | 'carro' | 'arma'): string {
  switch (category) {
    case 'dinheiro': return '#B5651A';
    case 'carro': return '#00B4D8';
    case 'arma': return '#FF006E';
  }
}