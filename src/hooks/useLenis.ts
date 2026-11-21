import { useEffect, useRef } from 'react';

let lenisInstance: any = null;

export function useLenis(options?: {
  lerp?: number;
  smoothWheel?: boolean;
  touchMultiplier?: number;
}) {
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis');
      
      lenisInstance = new Lenis({
        lerp: options?.lerp ?? 0.1,
        smoothWheel: options?.smoothWheel ?? true,
        touchMultiplier: options?.touchMultiplier ?? 2,
      });

      function raf(time: number) {
        lenisInstance.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }
      rafRef.current = requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, [options?.lerp, options?.smoothWheel, options?.touchMultiplier]);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollTo(target: string | number | HTMLElement, options?: { offset?: number; duration?: number; easing?: (t: number) => number }) {
  if (!lenisInstance) return;
  
  if (typeof target === 'string') {
    const el = document.querySelector(target);
    if (el) lenisInstance.scrollTo(el, options);
  } else if (typeof target === 'number') {
    lenisInstance.scrollTo(target, options);
  } else {
    lenisInstance.scrollTo(target, options);
  }
}

export function stopScroll() {
  lenisInstance?.stop();
}

export function startScroll() {
  lenisInstance?.start();
}