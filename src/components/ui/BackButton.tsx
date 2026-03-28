import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-[72px] left-4 z-40 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-neutral-200 text-neutral-700 hover:text-brand-600 hover:border-brand-300 px-3 py-2 rounded-full shadow-md transition-all duration-200 hover:-translate-y-0.5 text-sm font-medium"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}