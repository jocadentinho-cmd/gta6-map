import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { getCategoryIcon, getCategoryColor } from '../../utils/icons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './CategoryProgress.module.css';

export function CategoryProgress() {
  const { progresso } = useAppStore();
  const reducedMotion = useReducedMotion();

  const categories = [
    { key: 'dinheiro', label: 'Dinheiro', icon: getCategoryIcon('dinheiro') },
    { key: 'carro', label: 'Carros', icon: getCategoryIcon('carro') },
    { key: 'arma', label: 'Armas', icon: getCategoryIcon('arma') },
  ] as const;

  return (
    <div className={styles.progressContainer} role="region" aria-label="Progresso por categoria">
      <h3 className={styles.title}>Progresso</h3>
      <div className={styles.categories}>
        {categories.map(({ key, label, icon: Icon }) => {
          const catProgress = progresso[key];
          const total = catProgress.total;
          const coletados = catProgress.pegos;
          const favoritos = catProgress.favoritos;
          const percentage = total > 0 ? Math.round((coletados / total) * 100) : 0;
          const color = getCategoryColor(key);

          return (
            <motion.div
              key={key}
              className={styles.categoryCard}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : { delay: 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{ '--category-color': color } as React.CSSProperties}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <Icon size={20} aria-hidden={true} />
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.label}>{label}</span>
                  <div className={styles.stats}>
                    <span className={styles.collected}>{coletados}/{total}</span>
                    <span className={styles.favorites} title="Favoritos">
                      {favoritos} ★
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.barWrapper}>
                <div className={styles.bar} role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label={`${label}: ${percentage}% coletados`}>
                  <motion.div
                    className={styles.barFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={reducedMotion ? { duration: 0 } : { duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                    style={{ background: color }}
                  />
                </div>
                <span className={styles.percentage}>{percentage}%</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className={styles.total}>
        <span className={styles.totalLabel}>Total Geral</span>
        <span className={styles.totalValue}>
          {progresso.dinheiro.pegos + progresso.carro.pegos + progresso.arma.pegos} / {progresso.dinheiro.total + progresso.carro.total + progresso.arma.total}
        </span>
      </div>
    </div>
  );
}