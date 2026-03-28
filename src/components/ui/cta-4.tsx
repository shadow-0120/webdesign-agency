import { useEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

const defaultItems = [
  "Easy Integration",
  "24/7 Support",
  "Customizable Design",
  "Scalable Performance",
  "Hundreds of Blocks",
];

export const Cta4 = ({
  title = "Call to Action",
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  buttonText = "Get Started",
  buttonUrl = "#",
  items = defaultItems,
}: Cta4Props) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      /* ── card slides up from bottom-left corner ── */
      gsap.fromTo(
        el.querySelector(".cta-card"),
        { clipPath: "inset(100% 100% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── headline slides in from left ── */
      gsap.fromTo(
        el.querySelector(".cta-title"),
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "expo.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── description + button fade up ── */
      gsap.fromTo(
        [el.querySelector(".cta-desc"), el.querySelector(".cta-btn")],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.35,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── checklist items stagger in from right ── */
      gsap.fromTo(
        el.querySelectorAll(".cta-item"),
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.4,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── button magnetic hover ── */
      const btn = el.querySelector<HTMLElement>(".cta-btn");
      if (btn) {
        btn.addEventListener("mouseenter", () =>
          gsap.to(btn, { scale: 1.05, duration: 0.25, ease: "power2.out" })
        );
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.inOut" })
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="max-w-5xl w-full">
            <div className="cta-card flex flex-col items-start justify-between gap-8 rounded-lg bg-muted px-6 py-10 md:flex-row lg:px-20 lg:py-16 opacity-0">
              <div className="md:w-1/2">
                <h4 className="cta-title mb-1 text-2xl font-bold md:text-3xl text-white opacity-0">
                  {title}
                </h4>
                <p className="cta-desc text-zinc-400 opacity-0">{description}</p>
                <Button
                  className="cta-btn mt-6 bg-orange-500 hover:bg-orange-600 text-white border-none rounded-xl px-6 h-12 text-base font-semibold shadow-lg shadow-orange-500/20 opacity-0"
                  asChild
                >
                  <a href={buttonUrl}>
                    {buttonText} <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              </div>
              <div className="md:w-1/3">
                <ul className="flex flex-col space-y-4 text-sm font-medium">
                  {items.map((item, idx) => (
                    <li
                      key={idx}
                      className="cta-item flex items-center text-zinc-300 hover:text-white transition-colors cursor-default opacity-0"
                    >
                      <div className="bg-orange-500/10 p-1.5 rounded-full mr-4 flex-shrink-0">
                        <Check className="size-3.5 text-orange-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
