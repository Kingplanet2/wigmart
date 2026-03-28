import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import Layout from "../components/layout/Layout";
import ProductCard from "../components/product/ProductCard";
import { useWishlistStore } from "../store/wishlistStore";

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-neutral-900">My Wishlist</h1>
          <p className="text-neutral-500 mt-1">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-neutral-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-neutral-800 mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-neutral-500 mb-8">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5"
            >
              <ShoppingCart className="w-4 h-4" />
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}