import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "../../data/products";
import ProductCard from "../product/ProductCard";
import AnimatedSection from "../ui/AnimatedSection";

export default function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-brand-500 text-sm font-semibold tracking-widest uppercase mb-3">
                Customer Favourites
              </p>
              <h2 className="text-4xl font-display font-bold text-neutral-900">
                Bestselling Wigs
              </h2>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}