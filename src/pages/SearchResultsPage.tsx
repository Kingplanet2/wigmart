import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Layout from "../components/layout/Layout";
import ProductCard from "../components/product/ProductCard";
import { searchProducts } from "../data/products";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = searchProducts(query);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-brand-500" />
            <h1 className="text-3xl font-display font-bold text-neutral-900">
              Search Results
            </h1>
          </div>
          <p className="text-neutral-500">
            {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-neutral-800">"{query}"</span>
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <h2 className="text-2xl font-bold text-neutral-700 mb-3">
              No results found
            </h2>
            <p className="text-neutral-500 mb-2">
              We couldn't find anything matching "{query}"
            </p>
            <p className="text-neutral-400 text-sm">
              Try searching for: frontals, curly, bone straight, braided
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}