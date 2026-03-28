import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  name: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={64} reverse duration={60} durationOnHover={20}>
        {logos.map((logo) => (
          <span
            key={logo.name}
            className="text-2xl font-bold tracking-tighter text-zinc-400/80 hover:text-zinc-900 transition-colors cursor-default select-none "
          >
            {logo.name}
          </span>
        ))}
      </InfiniteSlider>
    </div>
  );
}
