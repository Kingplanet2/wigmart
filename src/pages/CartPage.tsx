import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Layout from "../components/layout/Layout";
import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-neutral-800 mb-3">
            Your cart is empty
          </h2>
          <p className="text-neutral-500 mb-8">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Layout>
    );
  }

  const shipping = totalPrice() >= 150 ? 0 : 9.99;
  const tax = totalPrice() * 0.08;
  const orderTotal = totalPrice() + shipping + tax;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-neutral-900">
            Shopping Cart
          </h1>
          <p className="text-neutral-500 mt-1">{totalItems()} item{totalItems() !== 1 ? "s" : ""}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-5 bg-white rounded-2xl border border-neutral-100 p-4 hover:border-neutral-200 transition-colors"
              >
                {/* Image */}
                <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-28 rounded-xl object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/products/${item.product.id}`}>
                      <h3 className="font-semibold text-neutral-800 hover:text-brand-600 transition-colors line-clamp-2 text-sm leading-snug">
                        {item.product.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="flex-shrink-0 p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Variants */}
                  <div className="flex gap-3 mt-1.5">
                    {item.selectedColor && (
                      <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                        {item.selectedColor}
                      </span>
                    )}
                    {item.selectedLength && (
                      <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                        {item.selectedLength}
                      </span>
                    )}
                  </div>

                  {/* Price + Quantity */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 border border-neutral-200 rounded-full px-1 py-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-bold text-neutral-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors mt-2"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 sticky top-28">
              <h2 className="text-lg font-bold text-neutral-900 mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({totalItems()} items)</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-600 font-medium" : ""}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                {shipping === 0 && (
                  <div className="bg-emerald-50 text-emerald-700 text-xs rounded-xl px-3 py-2 font-medium">
                    🎉 You qualify for free shipping!
                  </div>
                )}

                {shipping > 0 && (
                  <div className="bg-brand-50 text-brand-700 text-xs rounded-xl px-3 py-2">
                    Add ${(150 - totalPrice()).toFixed(2)} more for free shipping
                  </div>
                )}
              </div>

              {/* Voucher */}
              <div className="mt-5">
                <p className="text-sm font-semibold text-neutral-700 mb-2">Voucher Code</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 text-sm border border-neutral-200 rounded-full focus:outline-none focus:border-brand-400"
                  />
                  <button className="px-4 py-2 bg-neutral-900 text-white text-sm font-semibold rounded-full hover:bg-brand-500 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border-t border-neutral-100 mt-5 pt-5">
                <div className="flex justify-between font-bold text-lg text-neutral-900 mb-5">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}