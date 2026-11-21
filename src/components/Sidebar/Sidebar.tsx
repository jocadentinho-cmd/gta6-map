import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { LocationList } from './LocationList';
import { FilterPanel } from './FilterPanel';
import { SearchBox } from './SearchBox';
import { CategoryProgress } from '../Progress/CategoryProgress';
import { IconMenu, IconX, IconFiltro } from '../../utils/icons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const { sidebarAberta, setSidebarAberta, filtroAberto, setFiltroAberto, introCompleta } = useAppStore();
  const reducedMotion = useReducedMotion();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarAberta) {
        setSidebarAberta(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarAberta, setSidebarAberta]);

  if (!introCompleta) return null;

  return (
    <AnimatePresence>
      {sidebarAberta && (
        <motion.aside
          ref={sidebarRef}
          className={styles.sidebar}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
          role="complementary"
          aria-label="Painel lateral de localizações"
        >
          <div className={styles.sidebarHeader}>
            <div className={styles.titleArea}>
              <h2 className={styles.title}>Leonida</h2>
              <span className={styles.subtitle}>Guia de Campo</span>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.iconButton}
                onClick={() => setFiltroAberto(!filtroAberto)}
                aria-expanded={filtroAberto}
                aria-label={filtroAberto ? 'Fechar filtros' : 'Abrir filtros'}
                aria-controls="filter-panel"
              >
                <IconFiltro size={22} aria-hidden={true} />
                <span className={styles.buttonText}>Filtros</span>
              </button>
              <button
                className={styles.closeButton}
                onClick={() => setSidebarAberta(false)}
                aria-label="Fechar painel lateral"
              >
                <IconX size={22} aria-hidden={true} />
              </button>
            </div>
          </div>

          <div className={styles.sidebarContent}>
            <SearchBox />
            <CategoryProgress />
            <LocationList />
          </div>

          <AnimatePresence>
            {filtroAberto && (
              <motion.div
                id="filter-panel"
                className={styles.filterOverlay}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
              >
                <FilterPanel onClose={() => setFiltroAberto(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export function SidebarToggle() {
  const { sidebarAberta, setSidebarAberta, introCompleta } = useAppStore();
  const reducedMotion = useReducedMotion();

  if (!introCompleta) return null;

  return (
    <motion.button
      className={styles.toggleButton}
      onClick={() => setSidebarAberta(!sidebarAberta)}
      aria-expanded={sidebarAberta}
      aria-label={sidebarAberta ? 'Fechar painel' : 'Abrir painel de localizações'}
      initial={false}
      animate={{ rotate: sidebarAberta ? 180 : 0 }}
      transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconMenu size={28} />
    </motion.button>
  );
}