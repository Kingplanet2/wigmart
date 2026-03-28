import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

export default function FloatingCart() {
  const totalItems = useCartStore((s) => s.totalItems());

  if (totalItems === 0) return null;

  return (
    <Link
      to="/cart"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-neutral-900 hover:bg-brand-500 text-white px-5 py-3 rounded-full shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="text-sm font-semibold">
        {totalItems} item{totalItems !== 1 ? "s" : ""} in cart
      </span>
    </Link>
  );
}