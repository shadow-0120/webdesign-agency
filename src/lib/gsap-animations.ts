/**
 * GSAP Advanced Animation Library
 * 30k-style scroll-based animations:
 *  - Corner reveals (clipPath)
 *  - Parallax zoom
 *  - Word-by-word text highlight
 *  - Card stagger with drop-in
 *  - Pinned section effects
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────
   CORNER REVEAL  – element clips in from corner
───────────────────────────────────────────────── */
export function cornerReveal(
  targets: string | Element | Element[],
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom-left',
  options?: { delay?: number; duration?: number; trigger?: Element | string }
) {
  const clipMap = {
    'top-left':     { from: 'inset(0% 100% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
    'top-right':    { from: 'inset(0% 0% 100% 100%)', to: 'inset(0% 0% 0% 0%)' },
    'bottom-left':  { from: 'inset(100% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
    'bottom-right': { from: 'inset(100% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
  };

  const clip = clipMap[corner];

  gsap.fromTo(
    targets,
    { clipPath: clip.from, opacity: 0 },
    {
      clipPath: clip.to,
      opacity: 1,
      duration: options?.duration ?? 1.1,
      ease: 'expo.out',
      delay: options?.delay ?? 0,
      scrollTrigger: {
        trigger: (options?.trigger as Element) ?? (typeof targets === 'string' ? targets : undefined),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/* ─────────────────────────────────────────────────
   PARALLAX ZOOM  – section scales slightly as you scroll
───────────────────────────────────────────────── */
export function parallaxZoom(
  trigger: string | Element,
  scaleTarget: string | Element,
  options?: { fromScale?: number; toScale?: number; scrub?: number }
) {
  gsap.fromTo(
    scaleTarget,
    { scale: options?.fromScale ?? 1.08 },
    {
      scale: options?.toScale ?? 1,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: options?.scrub ?? 1.5,
      },
    }
  );
}

/* ─────────────────────────────────────────────────
   WORD HIGHLIGHT  – highlights words one by one as section is pinned
───────────────────────────────────────────────── */
export function wordHighlight(
  containerEl: HTMLElement,
  options?: { highlightColor?: string; duration?: number; scrub?: boolean }
) {
  const text = containerEl.textContent ?? '';
  const words = text.split(/\s+/).filter(Boolean);

  containerEl.innerHTML = words
    .map(
      (word) =>
        `<span class="gsap-word" style="display:inline-block; margin-right:0.28em; transition:none;">${word}</span>`
    )
    .join('');

  const wordEls = containerEl.querySelectorAll<HTMLElement>('.gsap-word');
  const color = options?.highlightColor ?? '#f97316'; // orange-500

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerEl,
      start: 'top 60%',
      end: `+=${wordEls.length * 80}`,
      scrub: options?.scrub !== false ? 1.2 : false,
      pin: false,
    },
  });

  wordEls.forEach((word) => {
    tl.fromTo(
      word,
      { color: 'rgba(113,113,122,0.45)', '--tw-blur': '0px' },
      {
        color,
        duration: options?.duration ?? 0.3,
        ease: 'power2.inOut',
      },
      '+=0.05'
    );
  });
}

/* ─────────────────────────────────────────────────
   CARD STAGGER  – cards fly in from bottom, staggered
───────────────────────────────────────────────── */
export function cardStaggerIn(
  cards: string | Element[],
  options?: {
    stagger?: number;
    yOffset?: number;
    duration?: number;
    trigger?: Element | string;
    delay?: number;
  }
) {
  gsap.fromTo(
    cards,
    { y: options?.yOffset ?? 80, opacity: 0, scale: 0.94, rotateX: 4 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      duration: options?.duration ?? 0.85,
      ease: 'power3.out',
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.12,
      scrollTrigger: {
        trigger: options?.trigger as Element ?? (typeof cards === 'string' ? cards : undefined),
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
      clearProps: 'transform',
    }
  );
}

/* ─────────────────────────────────────────────────
   FADE UP  – simple fade + translate-up (fallback utility)
───────────────────────────────────────────────── */
export function fadeUp(
  targets: string | Element | Element[],
  options?: { delay?: number; duration?: number; stagger?: number; trigger?: Element | string; yOffset?: number }
) {
  gsap.fromTo(
    targets,
    { y: options?.yOffset ?? 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options?.duration ?? 0.8,
      ease: 'power2.out',
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0,
      scrollTrigger: {
        trigger: (options?.trigger as Element) ?? (typeof targets === 'string' ? targets : undefined),
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/* ─────────────────────────────────────────────────
   COUNTER   – animate a number from 0 to final value
───────────────────────────────────────────────── */
export function animateCounter(
  el: HTMLElement,
  end: number,
  options?: { suffix?: string; duration?: number; trigger?: Element | string }
) {
  const obj = { val: 0 };
  ScrollTrigger.create({
    trigger: (options?.trigger as Element) ?? el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        val: end,
        duration: options?.duration ?? 1.8,
        ease: 'power2.out',
        onUpdate() {
          el.textContent = Math.round(obj.val).toLocaleString() + (options?.suffix ?? '');
        },
      });
    },
  });
}

/* ─────────────────────────────────────────────────
   HORIZONTAL SLIDE  – slide in from left / right
───────────────────────────────────────────────── */
export function slideIn(
  targets: string | Element | Element[],
  direction: 'left' | 'right' = 'left',
  options?: { delay?: number; duration?: number; trigger?: Element | string }
) {
  const xFrom = direction === 'left' ? -80 : 80;
  gsap.fromTo(
    targets,
    { x: xFrom, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: options?.duration ?? 0.9,
      ease: 'expo.out',
      delay: options?.delay ?? 0,
      scrollTrigger: {
        trigger: (options?.trigger as Element) ?? (typeof targets === 'string' ? targets : undefined),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/* ─────────────────────────────────────────────────
   SCRUB PARALLAX  – generic y parallax on scroll
───────────────────────────────────────────────── */
export function scrubParallax(
  trigger: string | Element,
  target: string | Element,
  options?: { yStart?: number; yEnd?: number; scrub?: number }
) {
  gsap.fromTo(
    target,
    { y: options?.yStart ?? -30 },
    {
      y: options?.yEnd ?? 30,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: options?.scrub ?? 2,
      },
    }
  );
}

/* helper to kill all triggers (call on component unmount) */
export function killAllTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
