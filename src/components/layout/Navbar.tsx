import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, X, Search, MessageCircle } from "lucide-react";
import { useWishlistStore } from "../../store/wishlistStore";
import { searchProducts } from "../../data/products";
import type { Product } from "../../types";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const currencies = ["USD", "NGN", "GBP", "GHS"];
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wishlistCount = useWishlistStore((s) => s.items.length);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim().length > 1) {
        const results = searchProducts(value);
        setSuggestions(results.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    navigate(`/products/${product.id}`);
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-neutral-900 text-white text-center py-2 text-xs tracking-widest font-medium">
        FREE SHIPPING ON ORDERS OVER $150 | USE CODE{" "}
        <span className="text-brand-300">WIGMART10</span> FOR 10% OFF
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs font-bold">W</span>
            </div>
            <span className="text-2xl font-display font-bold text-neutral-900 tracking-tight">
              Wig<span className="text-brand-500">Mart</span>
            </span>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-brand-500 transition-colors">Shop</Link>
            <Link to="/products?category=frontals" className="hover:text-brand-500 transition-colors">Frontals</Link>
            <Link to="/products?category=curly" className="hover:text-brand-500 transition-colors">Curly</Link>
            <Link to="/products?category=braided" className="hover:text-brand-500 transition-colors">Braided</Link>
            <Link to="/support" className="hover:text-brand-500 transition-colors">Support</Link>
          </nav>

          {/* Currency toggle — desktop */}
          <div className="hidden md:flex items-center">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="text-xs font-semibold text-neutral-600 bg-neutral-100 border-none rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-300 cursor-pointer"
            >
              {currencies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Search bar — desktop */}
          <div className="hidden md:flex flex-1 max-w-sm relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Search wigs..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-100 rounded-full border border-transparent focus:border-brand-300 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </form>

            {/* Suggestions dropdown */}
            {isSearchFocused && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden z-50">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors text-left"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{product.name}</p>
                      <p className="text-xs text-brand-500">${product.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1">

            {/* Chat icon — desktop */}
            <Link
              to="/support"
              className="hidden md:flex p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-neutral-600" />
            </Link>

            {/* Wishlist icon */}
            <Link
              to="/wishlist"
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors relative"
            >
              <Heart className="w-5 h-5 text-neutral-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-4 py-4 space-y-3">

          {/* Mobile search */}
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search wigs..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-neutral-100 rounded-full focus:outline-none"
              />
            </div>
          </form>

          {/* Mobile nav links */}
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700 hover:text-brand-500 transition-colors">Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700 hover:text-brand-500 transition-colors">Shop</Link>
          <Link to="/products?category=frontals" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700 hover:text-brand-500 transition-colors">Frontals</Link>
          <Link to="/products?category=curly" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700 hover:text-brand-500 transition-colors">Curly</Link>
          <Link to="/products?category=braided" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700 hover:text-brand-500 transition-colors">Braided</Link>
          <Link to="/support" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700 hover:text-brand-500 transition-colors">Support</Link>

          {/* Mobile currency toggle */}
          <div className="pt-3 border-t border-neutral-100">
            <p className="text-xs text-neutral-400 mb-2 font-medium uppercase tracking-wider">Currency</p>
            <div className="flex gap-2 flex-wrap">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    currency === c
                      ? "bg-brand-500 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </header>
  );
}