import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '../../store/useAppStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { IconCarimbo, IconEstrela, IconFolha } from '../../utils/icons';
import styles from './IntroSequence.module.css';

gsap.registerPlugin(ScrollTrigger);

export function IntroSequence() {
  const { introCompleta, setIntroCompleta } = useAppStore();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setIntroCompleta(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIntroCompleta(true);
        },
      });

      tl.set(titleRef.current, { opacity: 0 })
        .set(stickerRefs.current.map((_, i) => stickerRefs.current[i]), { opacity: 0, scale: 0, rotation: () => gsap.utils.random(-30, 30) })
        .set(stampRef.current, { opacity: 0, scale: 0.5, rotation: -15 });

      tl.to(titleRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        onStart: () => {
          if (titleRef.current) {
            animateLetterByLetter(titleRef.current);
          }
        },
      });

      tl.to(stickerRefs.current.filter(Boolean), {
        opacity: 1,
        scale: 1,
        rotation: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.6');

      tl.to(stampRef.current, {
        opacity: 1,
        scale: 1,
        rotation: -2,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      }, '-=0.4');

      tl.to(stampRef.current, {
        rotation: 2,
        duration: 0.3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 2,
      }, '-=0.2');
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion, setIntroCompleta]);

  const animateLetterByLetter = (element: HTMLElement) => {
    const text = element.textContent || '';
    element.textContent = '';
    element.style.opacity = '1';

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100%)';
      element.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: i * 0.05,
        ease: 'back.out(1.5)',
      });
    });
  };

  if (introCompleta) return null;

  const stickers = [
    { icon: <IconEstrela size={32} />, x: -120, y: -80, delay: 0 },
    { icon: <IconFolha size={28} />, x: 140, y: -60, delay: 0.2 },
    { icon: <IconEstrela size={24} />, x: -100, y: 100, delay: 0.4 },
    { icon: <IconFolha size={36} />, x: 160, y: 120, delay: 0.6 },
  ];

  return (
    <motion.div
      ref={containerRef}
      className={styles.intro}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
      role="region"
      aria-label="Sequência de introdução"
    >
      <div className={styles.background} aria-hidden="true">
        <div className={styles.pattern} />
      </div>

      <div className={styles.content}>
        <motion.h1
          ref={titleRef}
          className={styles.title}
          aria-hidden="true"
        >
          Leonida
        </motion.h1>

        <motion.p className={styles.subtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.6 }}>
          Guia de Campo Não Oficial
        </motion.p>

        <div className={styles.stickers} aria-hidden="true">
          {stickers.map((sticker, i) => (
            <motion.div
              key={i}
              ref={(el: HTMLDivElement | null) => { stickerRefs.current[i] = el; }}
              className={styles.sticker}
              style={{
                left: `calc(50% + ${sticker.x}px)`,
                top: `calc(50% + ${sticker.y}px)`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: gsap.utils.random(-30, 30) }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.2 + sticker.delay + i * 0.15, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {sticker.icon}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          <motion.div
            ref={stampRef}
            className={styles.stamp}
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
            transition={{ delay: 1.8, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            aria-hidden="true"
          >
            <IconCarimbo size={120} />
          </motion.div>
        </AnimatePresence>

        <motion.div
          className={styles.loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <span className={styles.loadingText}>Carregando mapa...</span>
          <div className={styles.loadingBar}>
            <motion.div
              className={styles.loadingFill}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 2.6, duration: 1.2, ease: [0.42, 0, 0.58, 1] }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.skipHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <kbd>ESC</kbd> para pular
      </motion.div>
    </motion.div>
  );
}