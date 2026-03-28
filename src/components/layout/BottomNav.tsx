import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, Heart, MessageCircle, User } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Chat", href: "/support", icon: MessageCircle },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Account", href: "/support", icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const cartCount = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Glassmorphism background */}
      <div className="mx-3 mb-3 bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl px-2 py-2"
        style={{
          boxShadow: "0 -4px 30px rgba(0,0,0,0.08), 0 20px 60px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)"
        }}
      >
        <div className="flex items-center justify-around">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = location.pathname === href && 
              !(label === "Account" && location.pathname === "/support" && location.search !== "") ||
              (label === "Chat" && location.pathname === "/support");
            const isCart = label === "Cart";
            const isWishlist = label === "Wishlist";
            const isCartActive = label === "Cart" && location.pathname === "/cart";
            const active = isCartActive || 
              (label === "Home" && location.pathname === "/") ||
              (label === "Chat" && location.pathname === "/support") ||
              (label === "Wishlist" && location.pathname === "/wishlist");

            return (
              <Link
                key={label}
                to={href}
                className="flex flex-col items-center gap-1 relative"
                style={{ minWidth: 56 }}
              >
                {/* Floating active indicator */}
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                    active
                      ? "bg-brand-500 shadow-lg -translate-y-2"
                      : "bg-transparent"
                  }`}
                  style={active ? {
                    boxShadow: "0 8px 24px rgba(212, 131, 30, 0.45), 0 2px 8px rgba(212, 131, 30, 0.3)",
                    transform: "translateY(-8px) scale(1.05)"
                  } : {}}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      active ? "text-white scale-110" : "text-neutral-400"
                    }`}
                  />

                  {/* Cart badge */}
                  {isCart && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold z-20 shadow-md">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}

                  {/* Wishlist badge */}
                  {isWishlist && wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold z-20 shadow-md">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-medium transition-all duration-300 ${
                    active
                      ? "text-brand-500 font-bold -translate-y-1"
                      : "text-neutral-400"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}