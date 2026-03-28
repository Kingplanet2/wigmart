import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Banner 1 */}
          <div className="relative rounded-3xl overflow-hidden h-72 bg-neutral-900 group">
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80"
              alt="New arrivals"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <span className="text-brand-300 text-xs font-semibold tracking-widest uppercase mb-2">
                Just Dropped
              </span>
              <h3 className="text-3xl font-display font-bold text-white mb-4">
                New Arrivals
              </h3>
              <Link
                to="/products?filter=new"
                className="inline-flex items-center gap-2 bg-white text-neutral-900 font-semibold text-sm px-6 py-3 rounded-full hover:bg-brand-400 hover:text-white transition-all duration-200 w-fit"
              >
                Shop New In
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative rounded-3xl overflow-hidden h-72 bg-brand-900 group">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
              alt="Sale"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <span className="text-brand-300 text-xs font-semibold tracking-widest uppercase mb-2">
                Limited Time
              </span>
              <h3 className="text-3xl font-display font-bold text-white mb-1">
                Up to 30% Off
              </h3>
              <p className="text-white/70 text-sm mb-4">On selected styles</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-brand-500 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-brand-400 transition-all duration-200 w-fit"
              >
                Shop Sale
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}