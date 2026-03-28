import { Star } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const testimonials = [
  {
    name: "Chioma A.",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "I've ordered from WigMart three times now and every single wig has been absolutely stunning. The quality is unreal — looks just like my real hair!",
    avatar: "C",
  },
  {
    name: "Fatima B.",
    location: "Abuja, Nigeria",
    rating: 5,
    text: "The HD lace frontal is completely invisible on my skin. I've been stopped on the street by people asking if it's my real hair. 10/10 would recommend!",
    avatar: "F",
  },
  {
    name: "Aisha K.",
    location: "Accra, Ghana",
    rating: 5,
    text: "Fast shipping, beautiful packaging, and the wig is even better in person. WigMart is now my go-to for all my hair needs. Love this brand!",
    avatar: "A",
  },
  {
    name: "Blessing O.",
    location: "Port Harcourt, Nigeria",
    rating: 5,
    text: "The bone straight wig I ordered is silky smooth and so full. I've had it for 6 months and it still looks brand new. Worth every penny!",
    avatar: "B",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Real Reviews
            </p>
            <h2 className="text-4xl font-display font-bold text-white">
              What Our Customers Say
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 100}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-neutral-500 text-xs">{t.location}</p>
                  </div>
                </div>

              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}