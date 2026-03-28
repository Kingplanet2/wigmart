import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Lock, ChevronDown, ChevronUp } from "lucide-react";
import Layout from "../components/layout/Layout";
import { useCartStore } from "../store/cartStore";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "Nigeria",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const shipping = totalPrice() >= 150 ? 0 : 9.99;
  const tax = totalPrice() * 0.08;
  const orderTotal = totalPrice() + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-3">
            Order Confirmed! 🎉
          </h2>
          <p className="text-neutral-500 mb-2">
            Thank you for shopping with WigMart.
          </p>
          <p className="text-neutral-500 mb-8">
            Your order has been placed and will be shipped within 2–5 business days.
          </p>
          <div className="bg-neutral-50 rounded-2xl p-5 mb-8 text-left">
            <p className="text-sm text-neutral-500 mb-1">Order Number</p>
            <p className="font-bold text-neutral-900 text-lg">
              #WM38291
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5"
          >
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-neutral-900">Checkout</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-neutral-500">
            <Lock className="w-3.5 h-3.5" />
            Secure checkout — your information is protected
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left — Form */}
          <div className="lg:col-span-2 space-y-8">

            {/* Contact */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-5">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "firstName", label: "First Name", type: "text", placeholder: "Amara" },
                  { name: "lastName", label: "Last Name", type: "text", placeholder: "Johnson" },
                  { name: "email", label: "Email Address", type: "email", placeholder: "amara@email.com" },
                  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+234 000 000 0000" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-5">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, Apt 4B"
                    className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "city", label: "City", placeholder: "Lagos" },
                    { name: "state", label: "State", placeholder: "Lagos State" },
                    { name: "zip", label: "Postal Code", placeholder: "100001" },
                  ].map((field) => (
                    <div key={field.name} className={field.name === "zip" ? "col-span-2 sm:col-span-1" : ""}>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        name={field.name}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">
                    Country
                  </label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 transition-colors bg-white"
                  >
                    {["Nigeria", "Ghana", "Kenya", "South Africa", "United States", "United Kingdom", "Canada"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-5">Payment Details</h2>

              {/* Card type logos */}
              <div className="flex gap-2 mb-5">
                {["VISA", "MC", "AMEX"].map((card) => (
                  <div key={card} className="px-3 py-1.5 border border-neutral-200 rounded-lg text-xs font-bold text-neutral-500">
                    {card}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={form.cardName}
                    onChange={handleChange}
                    placeholder="Amara Johnson"
                    className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="MM / YY"
                      maxLength={7}
                      className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 sticky top-28">

              {/* Mobile toggle */}
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="flex items-center justify-between w-full lg:cursor-default"
              >
                <h2 className="text-lg font-bold text-neutral-900">Order Summary</h2>
                <span className="lg:hidden">
                  {showSummary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              <div className={`mt-5 space-y-3 ${showSummary ? "block" : "hidden lg:block"}`}>
                {/* Items */}
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-neutral-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-neutral-700 line-clamp-1">{item.product.name}</p>
                      {item.selectedLength && (
                        <p className="text-xs text-neutral-400">{item.selectedLength}</p>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 flex-shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="border-t border-neutral-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>${totalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-emerald-600 font-medium" : ""}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-neutral-900 pt-2 border-t border-neutral-100">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg mt-2"
                >
                  <Lock className="w-4 h-4" />
                  Place Order — ${orderTotal.toFixed(2)}
                </button>

                <p className="text-center text-xs text-neutral-400 mt-3">
                  By placing your order you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}