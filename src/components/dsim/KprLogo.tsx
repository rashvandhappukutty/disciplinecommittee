import { cn } from "@/lib/utils";
import { INSTITUTION } from "@/lib/dsim/institution";

interface KprLogoProps {
  className?: string;
  variant?: "full" | "emblem" | "compact";
  inverted?: boolean;
}

export function KprLogo({ className, variant = "full", inverted = false }: KprLogoProps) {
  const invertCls = inverted ? "brightness-0 invert" : "";
  if (variant === "emblem") {
    return (
      <img
        src={INSTITUTION.logoUrl}
        alt={`${INSTITUTION.shortName} Emblem`}
        className={cn("h-10 sm:h-12 w-auto object-contain", invertCls, className)}
      />
    );
  }

  if (variant === "compact") {
    return (
      <img
        src={INSTITUTION.logoUrl}
        alt={INSTITUTION.name}
        className={cn("h-10 sm:h-12 w-auto max-w-[280px] object-contain", invertCls, className)}
      />
    );
  }

  // Full Logo display
  return (
    <img
      src={INSTITUTION.logoUrl}
      alt={INSTITUTION.name}
      className={cn("h-14 sm:h-18 w-auto max-w-full object-contain", invertCls, className)}
    />
  );
}

