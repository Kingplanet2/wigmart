import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-neutral-950 overflow-hidden flex items-center">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-brand-950 opacity-95" />

      {/* Glow effects */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-500 rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-brand-400 rounded-full opacity-5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600 rounded-full opacity-3 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div className="text-white space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <Star className="w-3.5 h-3.5 text-brand-400 fill-brand-400" />
              <span className="text-xs font-medium tracking-widest uppercase text-brand-300">
                Premium Human Hair Wigs
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-none tracking-tight">
                Your Hair,
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-none tracking-tight text-brand-400">
                Your Crown.
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display italic font-bold leading-none tracking-tight text-white/50">
                Your Rules.
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-md leading-relaxed">
              Discover our luxury collection of 100% human hair wigs.
              From silky bone straight to goddess curls — find your perfect look.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 sm:gap-10">
              {[
                { value: "10K+", label: "Happy Customers" },
                { value: "200+", label: "Wig Styles" },
                { value: "4.9★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow text-base"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=frontals"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-full transition-all duration-200 hover:bg-white/5 text-base"
              >
                View Frontals
              </Link>
            </div>

            {/* Trust badges — mobile only */}
            <div className="flex items-center gap-4 lg:hidden">
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                <Truck className="w-3.5 h-3.5 text-brand-400" />
                Free shipping $150+
              </div>
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                <Shield className="w-3.5 h-3.5 text-brand-400" />
                30-day returns
              </div>
            </div>

          </div>

          {/* Right — Floating images — desktop only */}
          <div className="relative h-[500px] hidden lg:block">
            <div
              className="absolute top-8 left-16 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80"
                alt="Featured wig"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm font-semibold">Luxe Frontal Lace</p>
                <p className="text-brand-300 text-xs">$189.99</p>
              </div>
            </div>

            <div
              className="absolute top-32 right-8 w-48 h-64 rounded-3xl overflow-hidden shadow-2xl"
              style={{ animation: "float 6s ease-in-out 2s infinite" }}
            >
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
                alt="Featured wig"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm font-semibold">Goddess Curly</p>
                <p className="text-brand-300 text-xs">$219.99</p>
              </div>
            </div>

            <div
              className="absolute bottom-8 left-8 w-44 h-56 rounded-3xl overflow-hidden shadow-2xl"
              style={{ animation: "float 6s ease-in-out 1s infinite" }}
            >
              <img
                src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80"
                alt="Featured wig"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm font-semibold">Bone Straight</p>
                <p className="text-brand-300 text-xs">$159.99</p>
              </div>
            </div>

            <div
              className="absolute top-4 right-4 bg-white rounded-2xl shadow-xl p-3 text-center"
              style={{ animation: "float 6s ease-in-out 3s infinite" }}
            >
              <p className="text-2xl font-bold text-brand-500">4.9</p>
              <div className="flex gap-0.5 justify-center mt-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-neutral-500 mt-1">234 reviews</p>
            </div>
          </div>

          {/* Mobile — floating image cards */}
          <div className="lg:hidden relative h-64 mt-4">
            <div
              className="absolute left-0 top-0 w-36 h-52 rounded-2xl overflow-hidden shadow-2xl"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80"
                alt="wig"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white text-xs font-semibold">Frontal Lace</p>
                <p className="text-brand-300 text-xs">$189.99</p>
              </div>
            </div>

            <div
              className="absolute left-32 top-8 w-32 h-44 rounded-2xl overflow-hidden shadow-2xl"
              style={{ animation: "float 6s ease-in-out 1.5s infinite" }}
            >
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
                alt="wig"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white text-xs font-semibold">Goddess Curly</p>
                <p className="text-brand-300 text-xs">$219.99</p>
              </div>
            </div>

            <div
              className="absolute right-0 top-4 w-28 h-40 rounded-2xl overflow-hidden shadow-2xl"
              style={{ animation: "float 6s ease-in-out 3s infinite" }}
            >
              <img
                src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=80"
                alt="wig"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white text-xs font-semibold">Bone Straight</p>
                <p className="text-brand-300 text-xs">$159.99</p>
              </div>
            </div>

            {/* Rating badge */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl px-4 py-2 text-center"
              style={{ animation: "float 6s ease-in-out 2s infinite" }}
            >
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-neutral-800 ml-1">4.9</span>
              </div>
              <p className="text-xs text-neutral-500">10K+ happy customers</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 40C1440 40 1080 0 720 0C360 0 0 40 0 40L0 80Z" fill="white"/>
        </svg>
      </div>

    </section>
  );
}