import { Sparkles, Camera, Upload, Info } from "lucide-react";
import Layout from "../components/layout/Layout";
import { products } from "../data/products";
import { Link } from "react-router-dom";

export default function TryOnPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-semibold text-brand-600">Virtual Try-On</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-3">
            Try Before You Buy
          </h1>
          <p className="text-neutral-500 max-w-md mx-auto">
            Upload your photo and see how our wigs look on you before placing your order.
          </p>
        </div>

        {/* Try on area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          {/* Upload area */}
          <div className="bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-brand-300 hover:bg-brand-50 transition-all duration-300 cursor-pointer group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow">
              <Camera className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="font-bold text-neutral-800 mb-2">Take a Photo</h3>
            <p className="text-sm text-neutral-500 mb-4">
              Use your camera for the best results
            </p>
            <button className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5">
              Open Camera
            </button>
          </div>

          <div className="bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-brand-300 hover:bg-brand-50 transition-all duration-300 cursor-pointer group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow">
              <Upload className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="font-bold text-neutral-800 mb-2">Upload a Photo</h3>
            <p className="text-sm text-neutral-500 mb-4">
              JPG or PNG, face clearly visible
            </p>
            <button className="px-6 py-2.5 bg-neutral-900 hover:bg-brand-500 text-white text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5">
              Choose File
            </button>
          </div>
        </div>

        {/* Coming soon notice */}
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5 flex items-start gap-3 mb-12">
          <Info className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-brand-700">AI Try-On Coming Soon</p>
            <p className="text-sm text-brand-600 mt-0.5">
              Our AI-powered virtual try-on feature is currently in development. 
              In the meantime, browse our collection and check customer photos in reviews.
            </p>
          </div>
        </div>

        {/* Popular wigs to try */}
        <div>
          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
            Popular Styles to Try
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-100"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-semibold line-clamp-1">{product.name}</p>
                  <p className="text-brand-300 text-xs">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}