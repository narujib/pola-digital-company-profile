import { cn } from "@/lib/utils";

interface SectionTitleProps {
  subtitle: string;
  title: string;
  align?: "left" | "center";
  titleClassName?: string;
  className?: string;
}

export function SectionTitle({
  subtitle,
  title,
  align = "left",
  titleClassName,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <span className="pub-subtitle">{subtitle}</span>
      <h2 className={cn("pub-title", titleClassName)}>{title}</h2>
    </div>
  );
}
