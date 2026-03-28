import { Link, useLocation } from "react-router-dom";
import { Home, Sparkles, MessageCircle, User } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Try On", href: "/tryon", icon: Sparkles },
  { label: "Chat", href: "/support", icon: MessageCircle },
  { label: "Account", href: "/account", icon: User },
];

export default function BottomNav() {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div
        className="mx-3 mb-4 rounded-3xl px-4 py-3"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "0 -2px 20px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <div className="flex items-center justify-around">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={label}
                to={href}
                className="flex flex-col items-center gap-1.5 relative"
                style={{ minWidth: 60 }}
              >
                {/* 3D floating icon container */}
                <div
                  className="relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300"
                  style={active ? {
                    background: "linear-gradient(135deg, #e3a03c, #d4831e)",
                    boxShadow: "0 8px 20px rgba(212, 131, 30, 0.5), 0 4px 8px rgba(212, 131, 30, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                    transform: "translateY(-10px) scale(1.08)",
                  } : {
                    background: "rgba(0,0,0,0.04)",
                    transform: "translateY(0px) scale(1)",
                    boxShadow: "none",
                  }}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      active ? "text-white" : "text-neutral-400"
                    }`}
                  />

                  {/* Glow ring when active */}
                  {active && (
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
                      }}
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className="text-xs font-semibold transition-all duration-300"
                  style={{
                    color: active ? "#d4831e" : "#9ca3af",
                    transform: active ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {label}
                </span>

                {/* Active dot */}
                {active && (
                  <div
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-brand-500"
                    style={{
                      boxShadow: "0 0 6px rgba(212, 131, 30, 0.8)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}