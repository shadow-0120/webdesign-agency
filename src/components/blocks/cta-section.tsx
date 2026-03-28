import { Cta4 } from "@/components/ui/cta-4";

export function CTASection() {
    return (
        <Cta4
            title="Ready to Build Something Extraordinary?"
            description="Join 100+ brands that have transformed their digital presence with our award-winning design and development. Let's create your next digital masterpiece together."
            buttonText="Start Your Project"
            buttonUrl="#link"
            items={[
                "Global Performance Focus",
                "24h Response Guarantee",
                "Custom UX Strategy",
                "Scalable Architecture",
                "Dedicated Project Hub",
            ]}
        />
    );
}
