import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-20 left-4 z-50 flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl text-sm font-semibold"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );
}