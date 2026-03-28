import React, { useEffect, useRef } from 'react'
import { cn } from "@/lib/utils"
import { Palette, Layers, Terminal, Zap, Smartphone, Search } from "lucide-react"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FeatureItem {
  title: string
  description: string
  icon: React.ReactNode
}

const features: FeatureItem[] = [
  {
    title: "Brand-Centric Design",
    description: "We don't just make things look pretty; we weave your brand's unique story into every pixel, ensuring a cohesive and memorable digital presence.",
    icon: <Palette className="size-7" />,
  },
  {
    title: "Performance First",
    description: "Lightning-fast load times and optimized code that keeps your users engaged and search engines happy.",
    icon: <Zap className="size-7" />,
  },
  {
    title: "Responsive Craft",
    description: "Flawless experiences across all devices, from the largest desktop to the smallest smartphone.",
    icon: <Smartphone className="size-7" />,
  },
  {
    title: "SEO Optimized",
    description: "Built-in best practices for search engine visibility right from the first line of code.",
    icon: <Search className="size-7" />,
  },
  {
    title: "Modern Tech Stack",
    description: "Utilizing the latest technologies like React, Next.js, and Tailwind to build scalable solutions.",
    icon: <Terminal className="size-7" />,
  },
  {
    title: "Scalable Architecture",
    description: "Future-proof systems designed to grow as your business expands, without the technical debt.",
    icon: <Layers className="size-7" />,
  },
]

const gridClasses = [
  "md:col-span-3 bg-zinc-900 border-zinc-800 text-white",
  "md:col-span-3 bg-white border-zinc-100 text-zinc-900",
  "md:col-span-2 bg-zinc-50 border-zinc-200 text-zinc-900",
  "md:col-span-2 bg-orange-500 border-orange-400 text-white",
  "md:col-span-2 bg-white border-zinc-100 text-zinc-900",
  "md:col-span-6 bg-zinc-100 border-zinc-200 text-zinc-900",
]

/* corner reveal order per card index */
const corners: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[] = [
  'top-left', 'top-right',
  'bottom-left', 'bottom-right',
  'bottom-left', 'top-right',
]

export function BentoFeatures() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      /* ── section header word highlight ── */
      const headingEl = el.querySelector<HTMLElement>('.bento-headline')
      if (headingEl) {
        const originalText = headingEl.textContent ?? ''
        const words = originalText.trim().split(/\s+/)
        headingEl.innerHTML = words
          .map((w) => `<span class="bh-word" style="display:inline-block;margin-right:0.27em;">${w}</span>`)
          .join('')

        const wordEls = headingEl.querySelectorAll<HTMLElement>('.bh-word')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            end: `+=${wordEls.length * 80}`,
            scrub: 1,
          },
        })

        wordEls.forEach((w) => {
          const isDim = w.style.color === '' || true
          tl.fromTo(
            w,
            { color: 'rgba(113,113,122,0.35)' },
            { color: '#18181b', duration: 0.4, ease: 'power2.inOut' },
            '+=0.05'
          )
        })
      }

      /* ── sub-text fade up ── */
      gsap.fromTo(
        el.querySelector('.bento-sub'),
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none none' },
        }
      )

      /* ── badge slide up ── */
      gsap.fromTo(
        el.querySelector('.bento-badge'),
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )

      /* ── grid cards — corner reveal one by one ── */
      const cards = el.querySelectorAll<HTMLElement>('.bento-card')
      const clipMap: Record<string, { from: string; to: string }> = {
        'top-left':     { from: 'inset(0% 100% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
        'top-right':    { from: 'inset(0% 0% 100% 100%)', to: 'inset(0% 0% 0% 0%)' },
        'bottom-left':  { from: 'inset(100% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
        'bottom-right': { from: 'inset(100% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
      }

      cards.forEach((card, i) => {
        const corner = corners[i % corners.length]
        const clip = clipMap[corner]
        gsap.fromTo(
          card,
          { clipPath: clip.from, opacity: 0 },
          {
            clipPath: clip.to,
            opacity: 1,
            duration: 1.05,
            ease: 'expo.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 76%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* ── on-hover card lift ── */
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.12)', duration: 0.35, ease: 'power2.out' })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, boxShadow: 'none', duration: 0.4, ease: 'power2.inOut' })
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="bento-badge text-orange-500 font-semibold tracking-wider uppercase text-sm mb-4 opacity-0">
            Our Expertise
          </h2>
          <h3 className="bento-headline text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
            Comprehensive Solutions for Digital Dominance
          </h3>
        </div>
        <p className="bento-sub text-zinc-500 max-w-sm text-lg opacity-0">
          We combine artistic vision with technical precision to deliver results that exceed expectations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6" style={{ perspective: '1200px' }}>
        {features.map((feature, index) => {
          const isDark = gridClasses[index].includes('bg-zinc-900') || gridClasses[index].includes('bg-orange-500')
          return (
            <div
              key={index}
              className={cn(
                'bento-card group relative overflow-hidden rounded-[2.5rem] p-10 flex flex-col gap-8 border h-full opacity-0 will-change-transform cursor-default',
                gridClasses[index]
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex flex-col gap-6 relative z-10">
                <div className={cn(
                  'p-4 rounded-2xl w-fit transition-colors duration-500',
                  isDark ? 'bg-white/10 backdrop-blur-md' : 'bg-orange-50 group-hover:bg-orange-100'
                )}>
                  {React.cloneElement(feature.icon as React.ReactElement, {
                    className: cn('size-7', isDark ? 'text-white' : 'text-orange-500'),
                  })}
                </div>
                <h4 className="text-3xl font-bold tracking-tight">{feature.title}</h4>
              </div>

              <p className={cn(
                'text-lg leading-relaxed relative z-10',
                isDark ? 'text-zinc-100' : 'text-zinc-600'
              )}>
                {feature.description}
              </p>

              {/* accent glow */}
              <div className={cn(
                'absolute -bottom-12 -right-12 size-48 rounded-full blur-3xl opacity-[0.09] pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.16]',
                isDark ? 'bg-white' : 'bg-orange-500'
              )} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
