import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "new" | "sale" | "bestseller" | "outofstock";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-neutral-100 text-neutral-700",
    new: "bg-emerald-100 text-emerald-700",
    sale: "bg-red-100 text-red-600",
    bestseller: "bg-brand-100 text-brand-700",
    outofstock: "bg-neutral-200 text-neutral-500",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}