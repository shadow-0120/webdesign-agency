import React, { useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Basic",
    price: "1,499",
    description: "Perfect for small businesses and startups looking for a professional online presence.",
    features: [
      "Up to 5 Pages",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "1 Month Support",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "3,999",
    description: "Ideal for growing companies needing advanced features and custom design work.",
    features: [
      "Up to 15 Pages",
      "Custom UI/UX Design",
      "Content Management System",
      "Advanced SEO Optimization",
      "3 Months Support",
      "Performance Optimization",
    ],
    buttonText: "Most Popular",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations with complex requirements and high traffic.",
    features: [
      "Unlimited Pages",
      "E-commerce Functionality",
      "Custom Web Applications",
      "Dedicated Account Manager",
      "Priority Support",
      "Ongoing Maintenance",
    ],
    buttonText: "Contact Us",
    popular: false,
  },
];

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      /* ── headline word-by-word reveal ── */
      const titleEl = el.querySelector<HTMLElement>('.pricing-title');
      if (titleEl) {
        const words = (titleEl.textContent ?? '').trim().split(/\s+/);
        titleEl.innerHTML = words
          .map((w) => `<span class="pt-word" style="display:inline-block;margin-right:0.26em;">${w}</span>`)
          .join('');

        const wordEls = titleEl.querySelectorAll<HTMLElement>('.pt-word');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 72%',
            end: `+=${wordEls.length * 80}`,
            scrub: 1,
          },
        });
        wordEls.forEach((w) => {
          tl.fromTo(
            w,
            { color: 'rgba(113,113,122,0.3)' },
            { color: '#18181b', duration: 0.4, ease: 'power2.inOut' },
            '+=0.06'
          );
        });
      }

      /* ── badge fade-in ── */
      gsap.fromTo(
        el.querySelector('.pricing-badge'),
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none none' },
        }
      );

      /* ── subtext fade ── */
      gsap.fromTo(
        el.querySelector('.pricing-sub'),
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: 'power2.out', delay: 0.15,
          scrollTrigger: { trigger: el, start: 'top 73%', toggleActions: 'play none none none' },
        }
      );

      /* ── cards stagger drop-in with rotation ── */
      gsap.fromTo(
        el.querySelectorAll('.pricing-card'),
        { y: 100, opacity: 0, scale: 0.9, rotateX: 8 },
        {
          y: 0, opacity: 1, scale: 1, rotateX: 0,
          duration: 0.95, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none none' },
          clearProps: 'transform',
        }
      );

      /* ── feature list items stagger inside each card ── */
      el.querySelectorAll('.pricing-card').forEach((card) => {
        gsap.fromTo(
          card.querySelectorAll('.pricing-feature'),
          { x: -20, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.5, ease: 'power2.out',
            stagger: 0.07, delay: 0.4,
            scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none none' },
          }
        );
      });

      /* ── hover magnetic on buttons ── */
      el.querySelectorAll<HTMLElement>('.pricing-btn').forEach((btn) => {
        btn.addEventListener('mouseenter', () =>
          gsap.to(btn, { scale: 1.04, duration: 0.25, ease: 'power2.out' })
        );
        btn.addEventListener('mouseleave', () =>
          gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.inOut' })
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="pricing-badge text-orange-500 font-semibold tracking-wider uppercase text-sm mb-4 opacity-0">
          Pricing Plans
        </h2>
        <h3 className="pricing-title text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight mb-6">
          Transparent Pricing for Every Need
        </h3>
        <p className="pricing-sub text-zinc-400 max-w-2xl mx-auto text-lg opacity-0">
          Choose the plan that's right for your business. All plans include our signature attention to detail and commitment to quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={cn(
              'pricing-card relative flex flex-col p-8 rounded-[2.5rem] border transition-shadow duration-300 opacity-0 will-change-transform',
              plan.popular
                ? 'bg-orange-500 border-orange-400 text-white scale-105 z-10 shadow-2xl shadow-orange-500/20'
                : 'bg-zinc-900 border-zinc-800 text-zinc-100 hover:border-zinc-700 hover:shadow-xl'
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-12 -translate-y-1/2 bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">
                  {plan.price !== 'Custom' ? '$' : ''}{plan.price}
                </span>
                {plan.price !== 'Custom' && (
                  <span className={cn('text-sm', plan.popular ? 'text-orange-100' : 'text-zinc-400')}>/project</span>
                )}
              </div>
              <p className={cn('mt-4 text-sm leading-relaxed', plan.popular ? 'text-orange-50' : 'text-zinc-400')}>
                {plan.description}
              </p>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex} className="pricing-feature flex items-center gap-3 opacity-0">
                  <div className={cn('p-1 rounded-full', plan.popular ? 'bg-white/20' : 'bg-orange-500/10')}>
                    <Check className={cn('size-3.5', plan.popular ? 'text-white' : 'text-orange-500')} />
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={cn(
                'pricing-btn w-full rounded-2xl h-12 text-sm font-semibold transition-colors duration-300',
                plan.popular
                  ? 'bg-white text-orange-500 hover:bg-zinc-100 shadow-xl'
                  : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20'
              )}
            >
              {plan.buttonText}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
