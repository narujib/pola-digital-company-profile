import { Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: { icon: "size-4", text: "text-sm" },
  md: { icon: "size-6", text: "text-base" },
  lg: { icon: "size-8", text: "text-xl" },
  xl: { icon: "size-10", text: "text-2xl" },
  "2xl": { icon: "size-12", text: "text-3xl" },
};

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const s = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2 font-bold", className)}>
      <Hexagon className={cn(s.icon, "text-primary")} />
      {showText && <span className={(s.text, "pub-h6")}>Pola Digital</span>}
    </div>
  );
}
