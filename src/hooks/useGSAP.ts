import { useEffect, useRef } from 'react';
import type { DependencyList } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAP(callback: (ctx: gsap.Context) => void, deps: DependencyList = []) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      if (ctxRef.current) {
        callback(ctxRef.current);
      }
    });

    return () => {
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, deps);

  return ctxRef;
}

export function useScrollTrigger(
  trigger: string | Element,
  animation: gsap.TweenVars | ((self: ScrollTrigger) => gsap.TweenVars),
  options?: ScrollTrigger.Vars
) {
  useGSAP((ctx) => {
    const trig = typeof trigger === 'string' ? trigger : trigger;

    if (typeof animation === 'function') {
      const st = ScrollTrigger.create({
        trigger: trig,
        ...options,
        onEnter: () => {
          const triggerEl = st.vars.trigger as Element | string;
          const target = typeof triggerEl === 'string' ? document.querySelector(triggerEl) : triggerEl;
          if (target) {
            gsap.fromTo(
              target,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', ...animation(st) }
            );
          }
        },
      } as ScrollTrigger.Vars);
      ctx.add(st as any);
    } else {
      const st = ScrollTrigger.create({
        trigger: trig,
        animation: gsap.timeline({ paused: true }).to(trigger, animation),
        ...options,
      } as ScrollTrigger.Vars);
      ctx.add(st as any);
    }
  }, [trigger]);
}

export function animateCounter(
  element: HTMLElement,
  endValue: number,
  duration: number = 1.5,
  ease: string = 'power2.out'
) {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: endValue,
    duration,
    ease,
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString('pt-BR');
    },
  });
}

export function animateStagger(
  elements: HTMLElement[],
  vars: gsap.TweenVars,
  stagger: number = 0.1
) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 20, rotation: -2 },
    { opacity: 1, y: 0, rotation: 0, stagger, ...vars }
  );
}

export function animatePinDrop(
  element: HTMLElement,
  delay: number = 0,
  onComplete?: () => void
) {
  gsap.fromTo(
    element,
    { y: -100, scale: 0.8, opacity: 0, rotation: -15 },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      rotation: 0,
      delay,
      duration: 0.6,
      ease: 'back.out(1.7)',
      onComplete,
    }
  );
}

export function animatePinPulse(element: HTMLElement, rarity: 'comum' | 'raro' | 'mitico') {
  if (rarity === 'comum') return;

  const scale = rarity === 'mitico' ? 1.2 : 1.15;
  const duration = rarity === 'mitico' ? 1.5 : 2;

  gsap.to(element, {
    scale,
    duration,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

export function animateStamp(element: HTMLElement) {
  gsap.fromTo(
    element,
    { scale: 0, rotation: 45, opacity: 0 },
    {
      scale: 1,
      rotation: -5,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    }
  );
}

export function animateConfetti(container: HTMLElement, count: number = 15) {
  const colors = ['#FF006E', '#00B4D8', '#B5651A', '#F5F0E1', '#1A1A1A'];

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
      pointer-events: none;
      border-radius: 2px;
      z-index: 1000;
    `;
    container.appendChild(confetti);

    const angle = (Math.random() - 0.5) * 180 - 90;
    const distance = 100 + Math.random() * 100;
    const tx = Math.sin(angle * Math.PI / 180) * distance;
    const ty = Math.cos(angle * Math.PI / 180) * distance + 150;

    gsap.to(confetti, {
      x: tx,
      y: ty,
      rotation: 720,
      opacity: 0,
      duration: 1 + Math.random() * 0.5,
      ease: 'power2.out',
      onComplete: () => confetti.remove(),
    });
  }
}

export function animateIntroTitle(element: HTMLElement, text: string) {
  const chars = text.split('');
  element.innerHTML = chars.map((c, i) =>
    `<span style="display:inline-block;opacity:0;transform:translateY(50px) rotate(-10deg);transition-delay:${i * 0.03}s">${c === ' ' ? '&nbsp;' : c}</span>`
  ).join('');

  const spans = element.querySelectorAll('span');
  gsap.to(spans, {
    opacity: 1,
    y: 0,
    rotation: 0,
    duration: 0.6,
    stagger: 0.03,
    ease: 'back.out(1.5)',
  });
}

export function animateStickerDrop(elements: HTMLElement[]) {
  gsap.fromTo(
    elements,
    { y: -200, rotation: () => -30 + Math.random() * 60, scale: 0, opacity: 0 },
    {
      y: 0,
      rotation: () => -3 + Math.random() * 6,
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    }
  );
}

export function animateMarquee(element: HTMLElement, duration: number = 30) {
  const width = element.scrollWidth / 2;
  gsap.to(element, {
    x: -width,
    duration,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => `${parseFloat(x) % width}px`),
    },
  });
}

export function killAllAnimations() {
  gsap.killTweensOf('*');
  ScrollTrigger.getAll().forEach(st => st.kill());
}

export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}