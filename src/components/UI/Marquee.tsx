import { useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Marquee.module.css';

const MARQUEE_ITEMS = [
  'LEONIDA • VICE CITY • KEYS • EVERGLADES • MAPA NÃO OFICIAL • DADOS DE FÃS',
  'COFRES • CARROS RAROS • ARMAS MÍTICAS • EXPLORE COM CUIDADO',
  'GTA 6 • GUIA DE CAMPO • VERIFIQUE NO JOGO • SEM GARANTIAS',
  'TURQUESA • ROSA CHOQUE • FERRUGEM • TINTA • PAPEL • ESTILO ZINE',
];

export function Marquee() {
  const { reduzirMovimento } = useAppStore();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || reduzirMovimento) return;

    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const contentWidth = content.scrollWidth;
    const duration = Math.max(contentWidth / 30, 20);

    const animation = content.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${contentWidth}px)` },
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        easing: 'linear',
      }
    );

    container.addEventListener('mouseenter', () => animation.pause());
    container.addEventListener('mouseleave', () => animation.play());

    return () => {
      animation.cancel();
      container.removeEventListener('mouseenter', () => animation.pause());
      container.removeEventListener('mouseleave', () => animation.play());
    };
  }, [reducedMotion, reduzirMovimento]);

  return (
    <div
      ref={containerRef}
      className={styles.marquee}
      role="region"
      aria-label="Informações do mapa"
      aria-live="off"
    >
      <div ref={contentRef} className={styles.content} aria-hidden="true">
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.separator} aria-hidden="true">◆</span>
          </span>
        ))}
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i + 100} className={styles.item}>
            {item}
            <span className={styles.separator} aria-hidden="true">◆</span>
          </span>
        ))}
      </div>
      <div className={styles.fadeLeft} aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />
    </div>
  );
}