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
        className="bg-white border-t border-neutral-100"
        style={{
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center justify-around px-2 py-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={label}
                to={href}
                className="flex flex-col items-center justify-center gap-0.5 py-2 px-4 relative"
              >
                {/* Active top indicator line */}
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-brand-500 rounded-full" />
                )}

                {/* Icon */}
                <div
                  className={`flex items-center justify-center w-6 h-6 transition-all duration-200 ${
                    active ? "-translate-y-0.5" : ""
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-200 ${
                      active
                        ? "text-brand-500 scale-110"
                        : "text-neutral-400"
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-xs transition-all duration-200 ${
                    active
                      ? "text-brand-500 font-semibold"
                      : "text-neutral-400 font-medium"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}