import React, { useEffect, useRef } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { LogoCloud } from "@/components/ui/logo-cloud-3"
import { StatsSection } from "@/components/blocks/stats-section"
import { BentoFeatures } from "@/components/blocks/bento-features"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { cn } from '@/lib/utils'
import { Variants } from 'framer-motion'
import { PricingSection } from "@/components/blocks/pricing-section"
import { CTASection } from "@/components/blocks/cta-section"
import { Footer } from "@/components/blocks/footer"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const logos = [
    { name: "Designify" },
    { name: "PixelPerfect" },
    { name: "Webflow" },
    { name: "Figma" },
    { name: "StudioX" },
    { name: "Creative" },
    { name: "Minimal" },
    { name: "Modern" },
];

// Shim for next/link
const Link = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>((props, ref) => <a ref={ref} {...props} />)
Link.displayName = "Link"

const transitionVariants: { item: Variants; container?: Variants } = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const logoSectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const el = wrapperRef.current
        if (!el) return

        const ctx = gsap.context(() => {
            /* ── Parallax zoom on video background (scrub) ── */
            if (videoRef.current) {
                gsap.fromTo(
                    videoRef.current,
                    { scale: 1.12 },
                    {
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top top',
                            end: 'bottom top',
                            scrub: 1.8,
                        },
                    }
                )
            }

            /* ── Logo section slides in from below ── */
            if (logoSectionRef.current) {
                gsap.fromTo(
                    logoSectionRef.current.querySelectorAll('.logo-anim'),
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 0.8, ease: 'power3.out',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: logoSectionRef.current,
                            start: 'top 88%',
                            toggleActions: 'play none none none',
                        },
                    }
                )
            }
        }, el)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={wrapperRef} className="bg-white p-2.5 md:p-5">
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] bg-black">
                <div className="absolute inset-0 z-10 h-full w-full pointer-events-none overflow-hidden">
                    <video
                        ref={videoRef}
                        src="/video.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover opacity-80 will-change-transform"
                    />
                </div>
                <HeroHeader />
                <main className="relative z-20 overflow-hidden bg-transparent">
                    <div
                        aria-hidden
                        className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                        <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                    </div>
                    <section className="relative h-[calc(100vh-20px)] md:h-[calc(100vh-40px)] min-h-[700px] overflow-hidden bg-transparent">
                        <div className="relative h-full pt-24 md:pt-36 flex flex-col items-center justify-center">
                            <div className="mx-auto max-w-7xl px-6 relative z-10">
                                <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                    <AnimatedGroup variants={transitionVariants}>
                                        <Link
                                            href="#link"
                                            className="hover:bg-background hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 border-t-white/5 shadow-zinc-950">
                                            <span className="text-foreground text-sm">Award Winning Web Design Agency</span>
                                            <span className="border-background block h-4 w-0.5 border-l bg-zinc-700"></span>

                                            <div className="bg-orange-500 group-hover:bg-orange-600 size-6 overflow-hidden rounded-full duration-500">
                                                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                    <span className="flex size-6">
                                                        <ArrowRight className="m-auto size-3 text-white" />
                                                    </span>
                                                    <span className="flex size-6">
                                                        <ArrowRight className="m-auto size-3 text-white" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>

                                        <h1
                                            className="mt-8 max-w-4xl mx-auto text-balance text-6xl font-bold tracking-tighter md:text-7xl lg:mt-16 xl:text-[5.25rem] text-white">
                                            We Build <span className="text-orange-500">Beautiful</span> Digital Experiences
                                        </h1>
                                        <p
                                            className="mx-auto mt-8 max-w-2xl text-balance text-lg font-medium text-gray-400">
                                            Full-service design and development agency specializing in high-performance websites that convert visitors into loyal customers.
                                        </p>
                                    </AnimatedGroup>

                                    <AnimatedGroup
                                        variants={{
                                            container: {
                                                visible: {
                                                    transition: {
                                                        staggerChildren: 0.05,
                                                        delayChildren: 0.75,
                                                    },
                                                },
                                            },
                                            ...transitionVariants,
                                        }}
                                        className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                        <div
                                            key={1}
                                            className="bg-foreground/10 rounded-[14px] border p-0.5">
                                            <Button
                                                asChild
                                                size="lg"
                                                className="rounded-xl px-5 text-base bg-orange-500 hover:bg-orange-600 text-white border-none">
                                                <Link href="#link">
                                                    <span className="text-nowrap">Start Your Project</span>
                                                </Link>
                                            </Button>
                                        </div>
                                        <Button
                                            key={2}
                                            asChild
                                            size="lg"
                                            variant="ghost"
                                            className="h-10.5 rounded-xl px-5 hover:text-white hover:bg-white/10">
                                            <Link href="#link">
                                                <span className="text-nowrap text-white hover:text-white">View Portfolio</span>
                                            </Link>
                                        </Button>
                                    </AnimatedGroup>
                                </div>
                            </div>


                        </div>
                    </section>

                </main>
            </div>

            <section ref={logoSectionRef} className="relative mx-auto mt-16 max-w-5xl px-6 pb-8">
                <h2 className="logo-anim mb-8 text-center font-medium text-foreground text-xl tracking-tight md:text-2xl opacity-0">
                    <span className="text-zinc-500">Partner of choice. </span>
                    <span className="font-semibold text-zinc-900">Loved by ambitious brands.</span>
                </h2>
                <div className="logo-anim mx-auto my-5 h-px max-w-md bg-zinc-200 [mask-image:linear-gradient(to_right,transparent,black,transparent)] opacity-0" />

                <div className="logo-anim opacity-0">
                    <LogoCloud logos={logos} />
                </div>

                <div className="logo-anim mx-auto mt-5 h-px max-w-md bg-zinc-200 [mask-image:linear-gradient(to_right,transparent,black,transparent)] opacity-0" />
            </section>


            <StatsSection />

            <BentoFeatures />

            <StaggerTestimonials />
            <PricingSection />
            <CTASection />
            <Footer />
        </div>
    )
}

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav
                data-state={menuState && 'active'}
                className={cn("w-full group transition-all duration-300", isScrolled ? " top-2.5 md:top-5 left-0 right-0 z-50 px-4" : "absolute top-4 px-2")}>
                <div className={cn('mx-auto max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-black/50 max-w-4xl rounded-full border border-white/10 backdrop-blur-lg lg:px-5 py-2')}>
                    <div className={cn("relative flex flex-wrap items-center justify-between gap-6 lg:gap-0", isScrolled ? "py-1 lg:py-2" : "py-3 lg:py-4")}>
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                Agency
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/5 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:hidden' : 'border-white text-white hover:bg-white hover:text-black')}>
                                    <Link href="#">
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:hidden' : 'bg-orange-500 hover:bg-orange-600 text-white')}>
                                    <Link href="#">
                                        <span>Sign Up</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex bg-orange-500 hover:bg-orange-600 text-white' : 'hidden')}>
                                    <Link href="#">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

