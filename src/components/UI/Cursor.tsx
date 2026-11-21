import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Cursor.module.css';

export function CustomCursor() {
  const { reduzirMovimento } = useAppStore();
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const trailRefs = useRef<(HTMLDivElement | null)[]>(Array(8).fill(null));

  useEffect(() => {
    if (reducedMotion || reduzirMovimento || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, reduzirMovimento]);

  useEffect(() => {
    if (reducedMotion || reduzirMovimento || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const trails = trailRefs.current.map((_, i) => ({
      x: position.x,
      y: position.y,
      delay: i * 0.03,
    }));

    let animationId: number;

    const animate = () => {
      trails.forEach((trail, i) => {
        const el = trailRefs.current[i];
        if (el) {
          const dx = position.x - trail.x;
          const dy = position.y - trail.y;
          trail.x += dx * (0.15 + i * 0.02);
          trail.y += dy * (0.15 + i * 0.02);
          el.style.transform = `translate(${trail.x}px, ${trail.y}px) translate(-50%, -50%)`;
          el.style.opacity = `${0.6 - i * 0.06}`;
          el.style.width = `${12 - i}px`;
          el.style.height = `${12 - i}px`;
        }
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [position, reducedMotion, reduzirMovimento]);

  if (reducedMotion || reduzirMovimento || window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * {
          cursor: none !important;
        }
        button, a, input, select, textarea, [role="button"], .leaflet-interactive {
          cursor: none !important;
        }
      ` }} />

      <div
        className={`${styles.cursor} ${visible ? styles.visible : ''}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)` }}
        aria-hidden="true"
      >
        <div className={styles.cursorDot} />
        <div className={styles.cursorRing} />
      </div>

      {trailRefs.current.map((_, i) => (
        <div
          key={i}
          ref={(el: HTMLDivElement | null) => { trailRefs.current[i] = el; }}
          className={styles.trail}
          aria-hidden="true"
        />
      ))}
    </>
  );
}