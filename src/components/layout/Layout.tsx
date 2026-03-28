import type { ReactNode } from "react";
import Navbar from "./Navbar";
import BackToTop from "../ui/BackToTop";
import BottomNav from "./BottomNav";
import BackButton from "../ui/BackButton";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[104px] pb-20 md:pb-0">
        {children}
      </main>

      <footer className="bg-neutral-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            <div className="md:col-span-1">
              <h3 className="text-2xl font-display font-bold mb-4">
                Wig<span className="text-brand-400">Mart</span>
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Premium wigs for every style, every occasion, every woman.
              </p>
              <div className="flex gap-3">
                {["IG", "TT", "YT", "PIN"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-9 h-9 bg-white/10 hover:bg-brand-500 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-neutral-300">
                Shop
              </h4>
              <ul className="space-y-2.5 text-sm text-neutral-400">
                {[
                  { label: "All Wigs", href: "/products" },
                  { label: "Frontals", href: "/products?category=frontals" },
                  { label: "Bone Straight", href: "/products?category=bone-straight" },
                  { label: "Curly", href: "/products?category=curly" },
                  { label: "Braided", href: "/products?category=braided" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-brand-400 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-neutral-300">
                Help
              </h4>
              <ul className="space-y-2.5 text-sm text-neutral-400">
                {[
                  { label: "Contact Us", href: "/support" },
                  { label: "Shipping Info", href: "/support" },
                  { label: "Returns", href: "/support" },
                  { label: "FAQ", href: "/support" },
                  { label: "Track Order", href: "/support" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-brand-400 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-neutral-300">
                Newsletter
              </h4>
              <p className="text-neutral-400 text-sm mb-4">
                Get exclusive deals straight to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-full text-white placeholder-neutral-500 focus:outline-none focus:border-brand-400 transition-colors"
                />
                <button className="px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold rounded-full transition-colors">
                  Join
                </button>
              </div>
            </div>

          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© 2026 WigMart. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-neutral-300 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <BackButton />
      <BackToTop />
      <BottomNav />
    </div>
  );
}