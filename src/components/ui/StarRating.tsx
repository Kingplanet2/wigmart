import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

export default function StarRating({ rating, reviewCount, size = "sm", className }: StarRatingProps) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            starSize,
            star <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : star - 0.5 <= rating
              ? "fill-amber-200 text-amber-400"
              : "fill-neutral-200 text-neutral-300"
          )}
        />
      ))}
      {reviewCount !== undefined && (
        <span className="text-xs text-neutral-500 ml-1">({reviewCount})</span>
      )}
    </div>
  );
}