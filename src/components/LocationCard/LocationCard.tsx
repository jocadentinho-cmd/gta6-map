import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { getCategoryIcon, getCategoryColor, getCategoryLabel, getRarityLabel, getConfidenceLabel, getConfidenceColor, getSubtypeLabel } from '../../utils/icons';
import { IconX, IconLinkExterno, IconCoordenadas, IconRelogio, IconUsuario, IconPin } from '../../utils/icons';
import { ConfidenceBadge } from './ConfidenceBadge';
import { ActionButtons } from './ActionButtons';
import { SourceLinks } from './SourceLinks';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './LocationCard.module.css';

export function LocationCard() {
  const {
    localizacaoSelecionada,
    localizacoes,
    setLocalizacaoSelecionada,
    favoritos,
    checklist,
    toggleFavorito,
    toggleChecklist,
  } = useAppStore();
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const location = localizacaoSelecionada
    ? localizacoes.find((l) => l.id === localizacaoSelecionada)
    : null;

  useEffect(() => {
    if (location && cardRef.current) {
      cardRef.current.focus();
    }
  }, [location]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setLocalizacaoSelecionada(null);
    }
  };

  if (!location) return null;

  const CategoryIcon = getCategoryIcon(location.category);
  const categoryColor = getCategoryColor(location.category);
  const rarity = location.rarity || 'comum';

  return (
    <AnimatePresence>
      <motion.div
        ref={cardRef}
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setLocalizacaoSelecionada(null);
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-card-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
          transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 25 }}
          style={{ '--category-color': categoryColor } as React.CSSProperties}
        >
          <div className={styles.cardHeader}>
            <div className={styles.categoryBadge}>
              <CategoryIcon size={20} aria-hidden={true} />
              <span>{getCategoryLabel(location.category)}</span>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setLocalizacaoSelecionada(null)}
              aria-label="Fechar ficha"
            >
              <IconX size={22} aria-hidden={true} />
            </button>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.titleArea}>
              <h2 id="location-card-title" className={styles.name}>{location.name}</h2>
              <div className={styles.badges}>
                <ConfidenceBadge confidence={location.confidence} />
                <span
                  className={`${styles.rarityBadge} ${rarity}`}
                  style={{
                    background: `rgba(${hexToRgb(categoryColor)}, 0.15)`,
                    color: categoryColor,
                    borderColor: categoryColor,
                  }}
                >
                  {getRarityLabel(rarity)}
                </span>
              </div>
            </div>

            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <IconCoordenadas size={16} aria-hidden={true} />
                <div>
                  <span className={styles.metaLabel}>Coordenadas</span>
                  <span className={styles.metaValue} style={{ fontFamily: 'var(--fonte-mono)' }}>
                    {location.x}, {location.y}
                  </span>
                </div>
              </div>
              <div className={styles.metaItem}>
                <IconPin size={16} rarity="comum" aria-hidden={true} />
                <div>
                  <span className={styles.metaLabel}>Região</span>
                  <span className={styles.metaValue}>{location.region}</span>
                </div>
              </div>
              <div className={styles.metaItem}>
                <IconRelogio size={16} aria-hidden={true} />
                <div>
                  <span className={styles.metaLabel}>Subtipo</span>
                  <span className={styles.metaValue}>{getSubtypeLabel(location.subtype)}</span>
                </div>
              </div>
              <div className={styles.metaItem}>
                <IconUsuario size={16} aria-hidden={true} />
                <div>
                  <span className={styles.metaLabel}>Confiança</span>
                  <span className={styles.metaValue} style={{ color: getConfidenceColor(location.confidence) }}>
                    {getConfidenceLabel(location.confidence)}
                  </span>
                </div>
              </div>
            </div>

            {location.description && (
              <div className={styles.description}>
                <p>{location.description}</p>
              </div>
            )}

            <div className={styles.divider} aria-hidden="true" />

            <ActionButtons
              location={location}
              isFavorite={favoritos.has(location.id)}
              isCollected={checklist.has(location.id)}
              onToggleFavorite={() => toggleFavorito(location.id)}
              onToggleCollected={() => toggleChecklist(location.id)}
            />

            <SourceLinks sources={location.source_urls?.map((url, i) => ({ type: 'outro' as const, url, title: `Fonte ${i + 1}` })) || []} />
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.footerNote}>
              <span>Dados de fã • Verifique no jogo</span>
              <a
                href={`https://gta.fandom.com/wiki/${encodeURIComponent(location.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.wikiLink}
              >
                <IconLinkExterno size={14} aria-hidden={true} />
                Wiki
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 10)}, ${parseInt(result[2], 10)}, ${parseInt(result[3], 10)}`
    : '0, 0, 0';
}