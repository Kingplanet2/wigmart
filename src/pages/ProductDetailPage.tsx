import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, Shield, Truck, RotateCcw } from "lucide-react";
import Layout from "../components/layout/Layout";
import ProductCard from "../components/product/ProductCard";
import StarRating from "../components/ui/StarRating";
import Badge from "../components/ui/Badge";
import { products } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Product not found</h2>
          <Link to="/products" className="text-brand-500 font-semibold hover:underline">
            Back to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const reviews = [
    { id: "1", author: "Amara J.", rating: 5, date: "March 2026", comment: "Absolutely love this wig! The quality is incredible and it looks so natural. I've gotten so many compliments.", verified: true },
    { id: "2", author: "Fatima O.", rating: 5, date: "February 2026", comment: "Fast shipping and the wig exceeded my expectations. Will definitely be ordering again!", verified: true },
    { id: "3", author: "Kezia M.", rating: 4, date: "January 2026", comment: "Beautiful wig, great quality. Took a little time to style but looks amazing once done.", verified: true },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brand-500 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-neutral-800 font-medium line-clamp-1">{product.name}</span>
        </div>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-brand-500" : "border-neutral-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-6">

            {/* Badges */}
            <div className="flex gap-2">
              {product.isNew && <Badge variant="new">New Arrival</Badge>}
              {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
              {!product.inStock && <Badge variant="outofstock">Out of Stock</Badge>}
            </div>

            {/* Name */}
            <h1 className="text-3xl font-display font-bold text-neutral-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-neutral-900">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-neutral-400 line-through">${product.originalPrice}</span>
                  <Badge variant="sale">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            <div className="border-t border-neutral-100 pt-6 space-y-5">

              {/* Color selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-neutral-700 mb-3">
                    Color: <span className="font-normal text-neutral-500">{selectedColor || "Select a color"}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${
                          selectedColor === color
                            ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold"
                            : "border-neutral-200 text-neutral-600 hover:border-brand-300"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Length selection */}
              {product.lengths && product.lengths.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-neutral-700 mb-3">
                    Length: <span className="font-normal text-neutral-500">{selectedLength || "Select a length"}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.lengths.map((length) => (
                      <button
                        key={length}
                        onClick={() => setSelectedLength(length)}
                        className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${
                          selectedLength === length
                            ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold"
                            : "border-neutral-200 text-neutral-600 hover:border-brand-300"
                        }`}
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold text-neutral-700 mb-3">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border-2 border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-brand-400 transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-neutral-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border-2 border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-brand-400 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to cart + wishlist */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => addItem(product, quantity, selectedColor, selectedLength)}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-neutral-300 text-white font-semibold py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
                <button
                  onClick={() => toggle(product)}
                  className="w-14 h-14 rounded-full border-2 border-neutral-200 hover:border-red-300 flex items-center justify-center transition-all"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? "fill-red-500 text-red-500" : "text-neutral-400"}`} />
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-100">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $150" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
                { icon: Shield, label: "Authentic", sub: "100% human hair" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-brand-500" />
                  </div>
                  <p className="text-xs font-semibold text-neutral-700">{label}</p>
                  <p className="text-xs text-neutral-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs — Description & Reviews */}
        <div className="mb-20">
          <div className="flex gap-8 border-b border-neutral-200 mb-8">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-brand-500 text-brand-600"
                    : "border-transparent text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {tab === "reviews" ? `Reviews (${product.reviewCount})` : "Description"}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="max-w-2xl">
              <p className="text-neutral-600 leading-relaxed text-base">{product.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6 max-w-2xl">
              {reviews.map((review) => (
                <div key={review.id} className="bg-neutral-50 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-neutral-800">{review.author}</p>
                      <p className="text-xs text-neutral-400">{review.date}</p>
                    </div>
                    {review.verified && (
                      <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-neutral-200 text-neutral-200"}`} />
                    ))}
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}