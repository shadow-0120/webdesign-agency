/**
 * useGsapAnimations — React hook
 * Attaches ScrollTrigger-based GSAP animations on mount and cleans up on unmount.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationType =
  | 'corner-reveal'
  | 'fade-up'
  | 'slide-left'
  | 'slide-right'
  | 'card-stagger'
  | 'word-highlight'
  | 'counter'
  | 'parallax-zoom'
  | 'scrub-parallax';

interface UseGsapOptions {
  type: AnimationType;
  /** CSS selector string relative to the ref element */
  selector?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  scrub?: number;
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** For counter animations */
  counterEnd?: number;
  counterSuffix?: string;
  /** Parallax scale range */
  fromScale?: number;
  toScale?: number;
  /** For word highlight */
  highlightColor?: string;
  /** start offset e.g. "top 85%" */
  start?: string;
  yOffset?: number;
}

export function useGsapAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapOptions
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = options.selector
        ? el.querySelectorAll<HTMLElement>(options.selector)
        : [el];

      const startOffset = options.start ?? 'top 85%';

      switch (options.type) {
        /* ── corner reveal ── */
        case 'corner-reveal': {
          const clipMap: Record<string, { from: string; to: string }> = {
            'top-left':     { from: 'inset(0% 100% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
            'top-right':    { from: 'inset(0% 0% 100% 100%)', to: 'inset(0% 0% 0% 0%)' },
            'bottom-left':  { from: 'inset(100% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
            'bottom-right': { from: 'inset(100% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
          };
          const clip = clipMap[options.corner ?? 'bottom-left'];
          targets.forEach((t, i) => {
            gsap.fromTo(
              t,
              { clipPath: clip.from, opacity: 0 },
              {
                clipPath: clip.to,
                opacity: 1,
                duration: options.duration ?? 1.1,
                ease: 'expo.out',
                delay: (options.delay ?? 0) + i * (options.stagger ?? 0.1),
                scrollTrigger: { trigger: el, start: startOffset, toggleActions: 'play none none none' },
              }
            );
          });
          break;
        }

        /* ── fade up ── */
        case 'fade-up': {
          gsap.fromTo(
            Array.from(targets),
            { y: options.yOffset ?? 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: options.duration ?? 0.85,
              ease: 'power3.out',
              delay: options.delay ?? 0,
              stagger: options.stagger ?? 0.1,
              scrollTrigger: { trigger: el, start: startOffset, toggleActions: 'play none none none' },
            }
          );
          break;
        }

        /* ── slide left / right ── */
        case 'slide-left':
        case 'slide-right': {
          const xFrom = options.type === 'slide-left' ? -80 : 80;
          gsap.fromTo(
            Array.from(targets),
            { x: xFrom, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: options.duration ?? 0.9,
              ease: 'expo.out',
              delay: options.delay ?? 0,
              stagger: options.stagger ?? 0.1,
              scrollTrigger: { trigger: el, start: startOffset, toggleActions: 'play none none none' },
            }
          );
          break;
        }

        /* ── card stagger drop-in ── */
        case 'card-stagger': {
          gsap.fromTo(
            Array.from(targets),
            { y: options.yOffset ?? 90, opacity: 0, scale: 0.93, rotateX: 6 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              duration: options.duration ?? 0.9,
              ease: 'power3.out',
              delay: options.delay ?? 0,
              stagger: options.stagger ?? 0.14,
              scrollTrigger: { trigger: el, start: startOffset, toggleActions: 'play none none none' },
              clearProps: 'transform',
            }
          );
          break;
        }

        /* ── word highlight ── */
        case 'word-highlight': {
          const container = targets[0] as HTMLElement;
          if (!container) break;

          const words = (container.textContent ?? '').trim().split(/\s+/);
          container.innerHTML = words
            .map(
              (w) =>
                `<span class="gsap-word" style="display:inline-block;margin-right:0.27em;">${w}</span>`
            )
            .join('');

          const wordEls = container.querySelectorAll<HTMLElement>('.gsap-word');
          const color = options.highlightColor ?? '#f97316';

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: options.start ?? 'top 65%',
              end: `+=${wordEls.length * 90}`,
              scrub: options.scrub ?? 1,
            },
          });

          wordEls.forEach((w) => {
            tl.fromTo(
              w,
              { color: 'rgba(113,113,122,0.4)' },
              { color, duration: 0.4, ease: 'power2.inOut' },
              '+=0.06'
            );
          });
          break;
        }

        /* ── parallax zoom ── */
        case 'parallax-zoom': {
          gsap.fromTo(
            Array.from(targets),
            { scale: options.fromScale ?? 1.1 },
            {
              scale: options.toScale ?? 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: options.scrub ?? 1.6,
              },
            }
          );
          break;
        }

        /* ── scrub parallax (y axis) ── */
        case 'scrub-parallax': {
          gsap.fromTo(
            Array.from(targets),
            { y: -(options.yOffset ?? 40) },
            {
              y: options.yOffset ?? 40,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: options.scrub ?? 2,
              },
            }
          );
          break;
        }

        /* ── counter ── */
        case 'counter': {
          const end = options.counterEnd ?? 100;
          const suffix = options.counterSuffix ?? '';
          targets.forEach((t) => {
            const obj = { val: 0 };
            ScrollTrigger.create({
              trigger: el,
              start: startOffset,
              once: true,
              onEnter() {
                gsap.to(obj, {
                  val: end,
                  duration: options.duration ?? 2,
                  ease: 'power2.out',
                  onUpdate() {
                    t.textContent = Math.round(obj.val).toLocaleString() + suffix;
                  },
                });
              },
            });
          });
          break;
        }
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
