import { useEffect, useRef, useState } from "react";
import { Sparkles, Info, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "../components/layout/Layout";
import { products } from "../data/products";
import { Link } from "react-router-dom";

const LICENSE_KEY = "ef5078ccdd6d56f78cdcaeb56f26b29091cf1c33b0112212607d4b984618586a594e13b74175efe3";

const wigEffects = [
  {
    name: "Bone Straight",
    url: "https://cdn.jsdelivr.net/gh/DeepARSDK/quickstart-web-js@master/effects/aviators",
    price: "$159.99",
    productId: "2",
  },
  {
    name: "Goddess Curly",
    url: "https://cdn.jsdelivr.net/gh/DeepARSDK/quickstart-web-js@master/effects/beard",
    price: "$219.99",
    productId: "3",
  },
  {
    name: "Frontal Lace",
    url: "https://cdn.jsdelivr.net/gh/DeepARSDK/quickstart-web-js@master/effects/flower_face",
    price: "$189.99",
    productId: "1",
  },
];

export default function TryOnPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const deepARRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");
  const [currentEffect, setCurrentEffect] = useState(0);
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    const loadDeepAR = async () => {
      try {
        // Load DeepAR script
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/deepar@5.6.6/js/deepar.js";
        script.async = true;
        document.head.appendChild(script);

        script.onload = async () => {
          try {
            const DeepAR = (window as any).DeepAR;
            const deepAR = await DeepAR({
              licenseKey: LICENSE_KEY,
              canvas: canvasRef.current,
              numberOfFaces: 1,
              libPath: "https://cdn.jsdelivr.net/npm/deepar@5.6.6/js/",
              segmentationInfoZip: "https://cdn.jsdelivr.net/npm/deepar@5.6.6/js/segmentation.zip",
              onInitialize: () => {
                setIsLoading(false);
                setIsReady(true);
                deepAR.startVideo(true);
                deepAR.switchEffect(0, "slot", wigEffects[0].url);
              },
            });
            deepARRef.current = deepAR;
          } catch {
            setError("Could not start AR. Please allow camera access and try again.");
            setIsLoading(false);
          }
        };

        script.onerror = () => {
          setError("Failed to load AR engine. Please check your internet connection.");
          setIsLoading(false);
        };
      } catch {
        setError("Something went wrong. Please refresh and try again.");
        setIsLoading(false);
      }
    };

    loadDeepAR();

    return () => {
      if (deepARRef.current) {
        deepARRef.current.stopVideo();
        deepARRef.current = null;
      }
    };
  }, []);

  const switchEffect = async (index: number) => {
    if (!deepARRef.current || switching) return;
    setSwitching(true);
    setCurrentEffect(index);
    await deepARRef.current.switchEffect(0, "slot", wigEffects[index].url);
    setSwitching(false);
  };

  const handlePrev = () => {
    const prev = (currentEffect - 1 + wigEffects.length) % wigEffects.length;
    switchEffect(prev);
  };

  const handleNext = () => {
    const next = (currentEffect + 1) % wigEffects.length;
    switchEffect(next);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-semibold text-brand-600">
              Live AR Try-On
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
            Try Wigs in Real Time
          </h1>
          <p className="text-neutral-500 text-sm">
            AI instantly places wigs on your face using your camera
          </p>
        </div>

        {/* AR Canvas */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl mb-6"
          style={{ aspectRatio: "9/16", maxHeight: "65vh" }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900">
              <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-white font-semibold">Loading AR Engine...</p>
              <p className="text-neutral-400 text-xs mt-1">Allow camera access when prompted</p>
            </div>
          )}

          {/* Error overlay */}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 px-6 text-center">
              <p className="text-4xl mb-4">📷</p>
              <p className="text-white font-semibold mb-2">Camera Access Required</p>
              <p className="text-neutral-400 text-sm mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-6 py-3 bg-brand-500 text-white font-semibold rounded-full hover:-translate-y-0.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          )}

          {/* Current wig name overlay */}
          {isReady && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-white text-sm font-semibold">
                  {wigEffects[currentEffect].name}
                </span>
                <span className="text-brand-300 text-sm">
                  {wigEffects[currentEffect].price}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Wig switcher */}
        {isReady && (
          <div className="bg-white rounded-2xl border border-neutral-100 p-5 mb-6 shadow-sm">
            <p className="text-sm font-semibold text-neutral-700 mb-4 text-center">
              Switch Wig Style
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border-2 border-neutral-200 flex items-center justify-center hover:border-brand-400 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-neutral-600" />
              </button>

              <div className="flex-1 flex gap-2 overflow-x-auto">
                {wigEffects.map((wig, i) => (
                  <button
                    key={wig.name}
                    onClick={() => switchEffect(i)}
                    className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      currentEffect === i
                        ? "border-brand-500 bg-brand-50"
                        : "border-neutral-100 hover:border-brand-200"
                    }`}
                  >
                    <span className="text-lg">👑</span>
                    <span className={`text-xs font-semibold ${
                      currentEffect === i ? "text-brand-600" : "text-neutral-600"
                    }`}>
                      {wig.name}
                    </span>
                    <span className="text-xs text-neutral-400">{wig.price}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border-2 border-neutral-200 flex items-center justify-center hover:border-brand-400 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              </button>
            </div>

            {/* Shop this wig button */}
            <Link
              to={`/products/${wigEffects[currentEffect].productId}`}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3.5 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Shop This Wig — {wigEffects[currentEffect].price}
            </Link>
          </div>
        )}

        {/* Info notice */}
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-brand-600 leading-relaxed">
            This feature uses AI to place wig styles on your face in real time.
            For best results use good lighting and face the camera directly.
            Your camera feed is never stored or shared.
          </p>
        </div>

        {/* Popular styles */}
        <div className="mt-10">
          <h2 className="text-xl font-display font-bold text-neutral-900 mb-5">
            More Styles to Explore
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
                  <p className="text-white text-xs font-semibold line-clamp-1">
                    {product.name}
                  </p>
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