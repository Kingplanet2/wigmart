import { useState, useRef } from "react";
import { Sparkles, Camera, Upload, Info, X, RotateCcw } from "lucide-react";
import Layout from "../components/layout/Layout";
import { products } from "../data/products";
import { Link } from "react-router-dom";

export default function TryOnPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const openCamera = async () => {
    setCameraError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      streamRef.current = stream;
      setCameraOpen(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch {
      setCameraError(
        "Camera access was denied. Please allow camera access in your browser settings and try again."
      );
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraOpen(false);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setPhoto(dataUrl);
      closeCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhoto(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resetPhoto = () => {
    setPhoto(null);
    setCameraError("");
  };

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
            Upload your photo or use your camera to see how our wigs look on you.
          </p>
        </div>

        {/* Camera modal */}
        {cameraOpen && (
          <div className="fixed inset-0 z-50 bg-black flex flex-col">
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-white font-semibold">Take a Photo</p>
              <button
                onClick={closeCamera}
                className="p-2 bg-white/20 rounded-full"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Face guide overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-56 h-72 rounded-full border-4 border-white/60"
                  style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.4)" }}
                />
              </div>
              <p className="absolute top-4 left-0 right-0 text-center text-white text-xs font-medium">
                Position your face in the oval
              </p>
            </div>

            <div className="px-4 py-6 flex items-center justify-center">
              <button
                onClick={takePhoto}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-brand-500 hover:scale-105 transition-transform"
              >
                <Camera className="w-7 h-7 text-brand-500" />
              </button>
            </div>
          </div>
        )}

        {/* Hidden canvas for capturing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Photo result */}
        {photo ? (
          <div className="mb-10">
            <div className="relative rounded-3xl overflow-hidden max-w-sm mx-auto shadow-2xl">
              <img
                src={photo}
                alt="Your photo"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="text-center text-white">
                  <Sparkles className="w-10 h-10 mx-auto mb-2 text-brand-300" />
                  <p className="font-semibold text-sm">AI Try-On Coming Soon</p>
                  <p className="text-xs text-white/70 mt-1">
                    We'll overlay the wig on your photo
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                onClick={resetPhoto}
                className="flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-brand-500 text-white font-semibold rounded-full transition-all hover:-translate-y-0.5"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

            {/* Camera option */}
            <div className="bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-brand-300 hover:bg-brand-50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow">
                <Camera className="w-8 h-8 text-brand-400" />
              </div>
              <h3 className="font-bold text-neutral-800 mb-2">Use Camera</h3>
              <p className="text-sm text-neutral-500 mb-5">
                Take a live photo for best results
              </p>
              {cameraError && (
                <p className="text-xs text-red-500 mb-3 bg-red-50 px-3 py-2 rounded-xl">
                  {cameraError}
                </p>
              )}
              <button
                onClick={openCamera}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 shadow-md"
              >
                Open Camera
              </button>
            </div>

            {/* Upload option */}
            <div className="bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-brand-300 hover:bg-brand-50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow">
                <Upload className="w-8 h-8 text-brand-400" />
              </div>
              <h3 className="font-bold text-neutral-800 mb-2">Upload Photo</h3>
              <p className="text-sm text-neutral-500 mb-5">
                JPG or PNG, face clearly visible
              </p>
              <button
                onClick={() => fileRef.current?.click()}
                className="px-6 py-2.5 bg-neutral-900 hover:bg-brand-500 text-white text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 shadow-md"
              >
                Choose File
              </button>
            </div>
          </div>
        )}

        {/* Coming soon notice */}
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5 flex items-start gap-3 mb-12">
          <Info className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-brand-700">
              AI Try-On Coming Soon
            </p>
            <p className="text-sm text-brand-600 mt-0.5">
              Our AI-powered virtual try-on feature is currently in development.
              In the meantime browse our collection and check customer photos in reviews.
            </p>
          </div>
        </div>

        {/* Popular styles */}
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