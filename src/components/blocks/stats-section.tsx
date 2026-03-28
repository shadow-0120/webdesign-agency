import React, { useEffect, useRef } from 'react';
import { Rocket, Palette, Users, Zap, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── counter helper ── */
function CounterValue({
  end,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter() {
        gsap.to(obj, {
          val: end,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = prefix + obj.val.toFixed(decimals) + suffix;
          },
        });
      },
    });
  }, [end, suffix, prefix, decimals]);
  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      /* ── parallax zoom on the grid background ── */
      gsap.fromTo(
        el.querySelector('.stats-bg-grid'),
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 2 },
        }
      );

      /* ── section header slide in ── */
      gsap.fromTo(
        el.querySelector('.stats-title'),
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
        }
      );

      /* ── cards stagger drop-in ── */
      gsap.fromTo(
        el.querySelectorAll('.stats-card'),
        { y: 80, opacity: 0, scale: 0.94, rotateX: 5 },
        {
          y: 0, opacity: 1, scale: 1, rotateX: 0,
          duration: 0.9, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none none' },
          clearProps: 'transform',
        }
      );

      /* ── bar chart bars grow up ── */
      gsap.fromTo(
        el.querySelectorAll('.chart-bar'),
        { scaleY: 0, transformOrigin: 'bottom' },
        {
          scaleY: 1, duration: 0.85, ease: 'power3.out',
          stagger: 0.1, delay: 0.3,
          scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none none' },
        }
      );

      /* ── orange card hover tilt ── */
      const orangeCard = el.querySelector<HTMLElement>('.stats-card-orange');
      if (orangeCard) {
        orangeCard.addEventListener('mousemove', (e) => {
          const rect = orangeCard.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
          gsap.to(orangeCard, { rotateY: x, rotateX: y, duration: 0.3, ease: 'power2.out', transformPerspective: 800 });
        });
        orangeCard.addEventListener('mouseleave', () => {
          gsap.to(orangeCard, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="bg-zinc-50 py-16 px-4 sm:px-6 md:px-12 lg:px-20 mx-2 sm:mx-4 md:mx-6 rounded-[2rem] sm:rounded-[3rem] mb-16 shadow-inner relative overflow-hidden border border-zinc-200"
    >
      {/* Background grid with parallax zoom */}
      <div className="stats-bg-grid absolute inset-0 z-0 bg-transparent pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f1f1_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f1_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="stats-title text-orange-500 font-semibold tracking-wider uppercase text-xs mb-10 opacity-0">
          By the Numbers
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">

          {/* Left Column */}
          <div className="lg:col-span-1 flex flex-col gap-4 lg:gap-6 h-full">
            {/* Card 1 */}
            <div className="stats-card bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 flex-1 flex flex-col justify-between hover:shadow-md transition-shadow opacity-0">
              <div className="flex flex-col items-start gap-4 mb-4">
                <div className="bg-orange-50 text-orange-600 p-2.5 rounded-full inline-flex">
                  <Rocket className="size-5 stroke-[2.5]" />
                </div>
                <h3 className="text-zinc-600 font-medium text-sm">Projects Launched</h3>
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <CounterValue end={450} suffix="+" className="text-3xl font-bold tracking-tight text-zinc-900" />
                  <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">+12%</span>
                </div>
                <p className="text-zinc-400 text-xs">High-performance websites delivered last year</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="stats-card bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 flex-1 flex flex-col justify-between hover:shadow-md transition-shadow opacity-0">
              <div className="flex flex-col items-start gap-4 mb-4">
                <div className="bg-orange-50 text-orange-600 p-2.5 rounded-full inline-flex">
                  <Palette className="size-5 stroke-[2.5]" />
                </div>
                <h3 className="text-zinc-600 font-medium text-sm">Design Components</h3>
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <CounterValue end={12000} suffix="+" className="text-3xl font-bold tracking-tight text-zinc-900" />
                </div>
                <p className="text-zinc-400 text-xs">Premium assets in our design system</p>
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:gap-6 h-full">
            {/* Card 3 – Growth */}
            <div className="stats-card bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 flex-[2] flex flex-col hover:shadow-md transition-shadow relative overflow-hidden opacity-0">
              <h3 className="text-zinc-600 font-medium text-sm mb-6">Client Revenue Growth</h3>
              <div className="flex-1 flex flex-col sm:flex-row items-end gap-6 h-full">
                <div className="flex flex-col justify-end w-full sm:w-1/3 h-full mb-8 sm:mb-0">
                  <CounterValue end={150} prefix="+" suffix="%" className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mb-2" />
                  <span className="text-zinc-400 text-sm">Average ROI</span>
                </div>

                {/* Animated bar chart */}
                <div className="flex-1 w-full h-[180px] sm:h-full flex items-end justify-between gap-2 sm:gap-4 pb-0 pt-8 sm:pt-0 relative pr-4">
                  {[
                    { h: '45%', label: 'Q1', orange: false },
                    { h: '65%', label: 'Q2', orange: false },
                    { h: '55%', label: 'Q3', orange: false },
                    { h: '100%', label: 'Q4', orange: true },
                    { h: '80%', label: 'Proj.', orange: false },
                  ].map((bar) => (
                    <div key={bar.label} className="flex flex-col items-center gap-3 w-full" style={{ height: bar.h }}>
                      <div className={cn('chart-bar w-full h-full rounded-t-lg', bar.orange ? 'bg-orange-500 shadow-lg shadow-orange-500/20' : 'bg-zinc-100')} />
                      <span className={cn('text-xs font-medium', bar.orange ? 'text-zinc-800 font-bold' : 'text-zinc-400')}>{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 4 – Dark strip */}
            <div className="stats-card bg-zinc-900 text-white rounded-[2rem] p-5 shadow-sm flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center opacity-0">
              <div className="flex flex-col items-center justify-center text-center border-r border-zinc-800">
                <CounterValue end={15} suffix="+" className="text-xl font-bold text-white mb-0.5" />
                <span className="text-[0.65rem] text-zinc-400 font-medium">Years Experience</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center sm:border-r border-zinc-800">
                <CounterValue end={100} suffix="%" className="text-xl font-bold text-white mb-0.5" />
                <span className="text-[0.65rem] text-zinc-400 font-medium">Satisfaction</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center border-r border-zinc-800">
                <span className="text-xl font-bold text-white mb-0.5">24/7</span>
                <span className="text-[0.65rem] text-zinc-400 font-medium">Support</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-1 mb-0.5">
                  <CounterValue end={4.9} decimals={1} className="text-xl font-bold text-white" />
                  <Star className="size-4 fill-orange-500 text-orange-500" />
                </div>
                <span className="text-[0.65rem] text-zinc-400 font-medium">Clutch Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 flex flex-col gap-4 lg:gap-6 h-full">
            {/* Card 5 – Orange with tilt */}
            <div className="stats-card stats-card-orange bg-orange-500 text-white rounded-3xl p-6 shadow-lg shadow-orange-500/20 flex-[3] flex flex-col opacity-0" style={{ transformStyle: 'preserve-3d' }}>
              <div className="flex flex-col items-start gap-4 mb-4 mt-2">
                <div className="bg-white/20 text-white p-2.5 rounded-full inline-flex backdrop-blur-sm border border-white/30">
                  <Users className="size-5 stroke-[2.5]" />
                </div>
                <h3 className="text-white/90 font-medium text-sm mt-3">Active Clients</h3>
              </div>
              <div className="mt-auto mb-2">
                <CounterValue end={120} suffix="+" className="text-4xl font-bold tracking-tight block mb-2" />
                <p className="text-white/80 text-xs">Brands we scale globally</p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="stats-card bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 flex-[2] flex flex-col justify-between hover:shadow-md transition-shadow opacity-0">
              <div className="flex flex-col items-start gap-4 mb-2">
                <div className="bg-orange-50 text-orange-600 p-2.5 rounded-full inline-flex">
                  <Zap className="size-5 stroke-[2.5]" />
                </div>
                <h3 className="text-zinc-600 font-medium text-sm">Conversion Rate</h3>
              </div>
              <div>
                <CounterValue end={45} prefix="+" suffix="%" className="text-3xl font-bold tracking-tight text-zinc-900" />
                <p className="text-zinc-400 text-xs mt-2">Boost in user engagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
