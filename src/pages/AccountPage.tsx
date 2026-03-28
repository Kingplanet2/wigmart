import { useState } from "react";
import { User, Mail, Phone, MapPin, Package, Heart, Settings, ChevronRight, Edit } from "lucide-react";
import Layout from "../components/layout/Layout";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const cartItems = useCartStore((s) => s.items);
  const wishlistItems = useWishlistStore((s) => s.items);

  const profile = {
    name: "Amara Johnson",
    email: "amara@email.com",
    phone: "+234 800 000 0000",
    location: "Lagos, Nigeria",
    joined: "January 2026",
    avatar: "AJ",
  };

  const orders = [
    { id: "#WM38291", date: "March 2026", status: "Delivered", total: "$189.99", item: "Luxe Frontal Lace Wig" },
    { id: "#WM29103", date: "February 2026", status: "Delivered", total: "$159.99", item: "Silky Bone Straight" },
    { id: "#WM18472", date: "January 2026", status: "Delivered", total: "$219.99", item: "Goddess Curly Lace Front" },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Profile header */}
        <div className="bg-gradient-to-br from-neutral-900 to-brand-950 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500 rounded-full opacity-10 blur-3xl" />
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-20 h-20 bg-brand-500 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
              {profile.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-display font-bold">{profile.name}</h1>
              <p className="text-neutral-400 text-sm mt-1">{profile.email}</p>
              <p className="text-neutral-500 text-xs mt-1">Member since {profile.joined}</p>
            </div>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <Edit className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
            {[
              { label: "Orders", value: orders.length },
              { label: "Wishlist", value: wishlistItems.length },
              { label: "Cart Items", value: cartItems.length },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-brand-400">{stat.value}</p>
                <p className="text-xs text-neutral-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-neutral-100 p-1 rounded-2xl">
          {["profile", "orders", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl capitalize transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border border-neutral-100 divide-y divide-neutral-100">
            {[
              { icon: User, label: "Full Name", value: profile.name },
              { icon: Mail, label: "Email Address", value: profile.email },
              { icon: Phone, label: "Phone Number", value: profile.phone },
              { icon: MapPin, label: "Location", value: profile.location },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-brand-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-neutral-800">{value}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-300" />
              </div>
            ))}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-neutral-100 p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-brand-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-neutral-800">{order.id}</p>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-1">{order.item}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-neutral-400">{order.date}</p>
                    <p className="text-sm font-bold text-brand-600">{order.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-2xl border border-neutral-100 divide-y divide-neutral-100">
            {[
              { icon: Heart, label: "My Wishlist", sub: `${wishlistItems.length} saved items`, href: "/wishlist" },
              { icon: Package, label: "Order History", sub: `${orders.length} orders`, href: "#" },
              { icon: Settings, label: "Preferences", sub: "Notifications, language", href: "#" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-brand-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-800">{label}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-300" />
              </div>
            ))}

            {/* Sign out */}
            <div className="px-6 py-4">
              <button className="w-full py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}