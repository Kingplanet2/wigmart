import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { getNewArrivals } from "../../data/products";
import ProductCard from "../product/ProductCard";
import AnimatedSection from "../ui/AnimatedSection";

export default function NewArrivals() {
  const products = getNewArrivals();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection>
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <p className="text-brand-500 text-sm font-semibold tracking-widest uppercase">
                  Fresh Drops
                </p>
              </div>
              <h2 className="text-4xl font-display font-bold text-neutral-900">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/products?filter=new"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              View All New
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 100}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}