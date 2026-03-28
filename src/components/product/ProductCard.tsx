import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import type { Product } from "../../types";
import Badge from "../ui/Badge";
import StarRating from "../ui/StarRating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">

      {/* Image */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden aspect-[3/4]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
          {!product.inStock && <Badge variant="outofstock">Sold Out</Badge>}
          {product.originalPrice && (
            <Badge variant="sale">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? "fill-red-500 text-red-500" : "text-neutral-400"
            }`}
          />
        </button>

        {/* Quick add overlay */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className={`w-full text-white text-sm font-semibold py-3 flex items-center justify-center gap-2 transition-colors duration-200 ${
                added
                  ? "bg-emerald-500"
                  : "bg-neutral-900 hover:bg-brand-500"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Quick Add
                </>
              )}
            </button>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-neutral-800 line-clamp-2 hover:text-brand-600 transition-colors leading-snug mb-2">
            {product.name}
          </h3>
        </Link>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} className="mb-3" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-neutral-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}