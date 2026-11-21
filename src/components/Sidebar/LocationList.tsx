import { useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { LocationListItem } from './LocationListItem';
import { IconAlerta } from '../../utils/icons';
import { getCategoryIcon, getCategoryColor } from '../../utils/icons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './LocationList.module.css';

export function LocationList() {
  const locaisFiltrados = useAppStore((state) => state.getLocalizacoesFiltradas());
  const { localizacaoSelecionada, setLocalizacaoSelecionada, favoritos, checklist } = useAppStore();
  const reducedMotion = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  const groupedLocations = useMemo(() => {
    const groups: Record<string, typeof locaisFiltrados> = {
      dinheiro: [],
      carro: [],
      arma: [],
    };

    locaisFiltrados.forEach((loc) => {
      groups[loc.category].push(loc);
    });

    return groups;
  }, [locaisFiltrados]);

  const totalCount = locaisFiltrados.length;
  const hasResults = totalCount > 0;

  useEffect(() => {
    if (localizacaoSelecionada && listRef.current) {
      const selectedElement = listRef.current.querySelector(`[data-id="${localizacaoSelecionada}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
      }
    }
  }, [localizacaoSelecionada, reducedMotion]);

  if (!hasResults) {
    return (
      <div className={styles.emptyState} role="status" aria-live="polite">
        <IconAlerta size={48} className={styles.emptyIcon} aria-hidden={true} />
        <p className={styles.emptyText}>Nenhuma localização encontrada</p>
        <p className={styles.emptyHint}>Tente ajustar os filtros ou a busca</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer} role="list" aria-label={`${totalCount} localizações encontradas`}>
      <div className={styles.listHeader}>
        <span className={styles.count}>
          <strong>{totalCount}</strong> localização{totalCount !== 1 ? 'ões' : ''} encontrada{totalCount !== 1 ? 's' : ''}
        </span>
      </div>

      <ul className={styles.list} ref={listRef}>
        <AnimatePresence mode="popLayout">
          {Object.entries(groupedLocations).map(([category, locations]) => {
            if (locations.length === 0) return null;

            const CategoryIcon = getCategoryIcon(category as 'dinheiro' | 'carro' | 'arma');
            const categoryColor = getCategoryColor(category as 'dinheiro' | 'carro' | 'arma');

            return (
              <motion.li
                key={category}
                className={styles.categoryGroup}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div
                  className={styles.categoryHeader}
                  style={{ borderLeftColor: categoryColor }}
                >
                  <CategoryIcon size={18} className={styles.categoryIcon} aria-hidden={true} />
                  <span className={styles.categoryLabel}>
                    {getCategoryLabel(category as 'dinheiro' | 'carro' | 'arma')}
                  </span>
                  <span className={styles.categoryCount}>{locations.length}</span>
                </div>

                <ul className={styles.itemsList} role="list">
                  {locations.map((loc, index) => (
                    <LocationListItem
                      key={loc.id}
                      location={loc}
                      isSelected={localizacaoSelecionada === loc.id}
                      isFavorite={favoritos.has(loc.id)}
                      isCollected={checklist.has(loc.id)}
                      index={index}
                      onClick={() => setLocalizacaoSelecionada(loc.id)}
                    />
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function getCategoryLabel(category: 'dinheiro' | 'carro' | 'arma'): string {
  switch (category) {
    case 'dinheiro': return 'Dinheiro';
    case 'carro': return 'Carros';
    case 'arma': return 'Armas';
  }
}