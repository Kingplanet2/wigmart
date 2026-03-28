import { categories } from "../../data/products";

interface ProductFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
}

export default function ProductFilter({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onReset,
}: ProductFilterProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900">Filters</h3>
        <button
          onClick={onReset}
          className="text-xs text-brand-500 hover:text-brand-700 font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wider">
          Category
        </h4>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange("")}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
              selectedCategory === ""
                ? "bg-brand-50 text-brand-700 font-semibold"
                : "text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            All Wigs
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-brand-50 text-brand-700 font-semibold"
                  : "text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wider">
          Price Range
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={400}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-brand-500"
          />
        </div>

        {/* Quick price filters */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[
            { label: "Under $100", range: [0, 100] as [number, number] },
            { label: "$100–$200", range: [100, 200] as [number, number] },
            { label: "$200–$300", range: [200, 300] as [number, number] },
            { label: "Over $300", range: [300, 400] as [number, number] },
          ].map((option) => (
            <button
              key={option.label}
              onClick={() => onPriceChange(option.range)}
              className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                priceRange[0] === option.range[0] && priceRange[1] === option.range[1]
                  ? "border-brand-400 bg-brand-50 text-brand-700"
                  : "border-neutral-200 text-neutral-600 hover:border-brand-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wider">
          Availability
        </h4>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="accent-brand-500 w-4 h-4" />
          <span className="text-sm text-neutral-600">In Stock Only</span>
        </label>
      </div>

    </div>
  );
}