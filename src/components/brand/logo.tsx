import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "color" | "white";
  className?: string;
  priority?: boolean;
};

/** Official lockup extracted from manaseergroup.com (332x111 viewBox). */
export function Logo({ variant = "color", className, priority }: LogoProps) {
  const src = variant === "white" ? "/brand/logo-white.svg" : "/brand/logo.svg";
  return (
    <Image
      src={src}
      alt="Manaseer Group"
      width={332}
      height={111}
      priority={priority}
      className={cn("h-auto w-40 select-none", className)}
    />
  );
}
