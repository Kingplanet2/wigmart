import { Link } from "react-router-dom";
import { categories } from "../../data/products";
import AnimatedSection from "../ui/AnimatedSection";

export default function CategorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-brand-500 text-sm font-semibold tracking-widest uppercase mb-3">
              Browse By Style
            </p>
            <h2 className="text-4xl font-display font-bold text-neutral-900">
              Shop By Category
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.id} delay={i * 80}>
              <Link
                to={`/products?category=${cat.id}`}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-neutral-100 hover:border-brand-300 hover:bg-brand-50 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
                  {cat.emoji}
                </span>
                <span className="text-sm font-semibold text-neutral-700 group-hover:text-brand-600 text-center transition-colors">
                  {cat.label}
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}