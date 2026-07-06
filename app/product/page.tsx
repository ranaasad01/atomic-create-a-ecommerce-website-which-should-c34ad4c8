"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Star, ShoppingCart, Zap, ChevronDown, ChevronUp, Check, Shield, RotateCcw, Truck, Heart, Share2, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_ACCENT } from "@/lib/data";

// ─── Mock product data ────────────────────────────────────────────────────────

interface MockProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
  features: string[];
  images: string[];
  inStock: boolean;
  stockCount: number;
  prime: boolean;
  deliveryDate: string;
  returnDays: number;
  specs: { label: string; value: string }[];
}

const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones",
    brand: "Sony",
    price: 279.99,
    originalPrice: 399.99,
    discount: 30,
    rating: 4.7,
    reviewCount: 12483,
    category: "Electronics",
    description:
      "Experience industry-leading noise cancellation with the Sony WH-1000XM5. Featuring two processors and eight microphones, these headphones deliver exceptional sound quality and up to 30 hours of battery life. The redesigned headband and soft fit leather ear pads provide all-day comfort, while Speak-to-Chat technology automatically pauses playback when you start a conversation.",
    features: [
      "Industry-leading noise cancellation with two processors and eight microphones",
      "Up to 30-hour battery life with quick charging (3 min charge = 3 hours playback)",
      "Crystal clear hands-free calling with four beamforming microphones",
      "Multipoint connection — connect to two Bluetooth devices simultaneously",
      "Adaptive Sound Control adjusts ambient sound settings automatically",
      "Wear detection pauses music when headphones are removed",
      "Touch sensor controls for easy music and call management",
      "Foldable design with premium carrying case included",
    ],
    images: [
      "/images/sony-wh1000xm5-headphones-black.jpg",
      "/images/sony-headphones-side-view.jpg",
      "/images/sony-headphones-folded.jpg",
      "/images/sony-headphones-wearing.jpg",
    ],
    inStock: true,
    stockCount: 14,
    prime: true,
    deliveryDate: "Tomorrow, Dec 15",
    returnDays: 30,
    specs: [
      { label: "Brand", value: "Sony" },
      { label: "Model", value: "WH-1000XM5" },
      { label: "Color", value: "Midnight Black" },
      { label: "Connectivity", value: "Bluetooth 5.2" },
      { label: "Battery Life", value: "30 hours" },
      { label: "Weight", value: "250 g" },
      { label: "Driver Size", value: "30 mm" },
      { label: "Frequency Response", value: "4 Hz – 40,000 Hz" },
    ],
  },
  {
    id: 2,
    title: "Apple MacBook Air 15-inch M3 Chip, 8GB RAM, 256GB SSD",
    brand: "Apple",
    price: 1099.0,
    originalPrice: 1299.0,
    discount: 15,
    rating: 4.8,
    reviewCount: 5621,
    category: "Electronics",
    description:
      "The MacBook Air 15-inch with M3 chip delivers exceptional performance in an incredibly thin and light design. With up to 18 hours of battery life, a stunning Liquid Retina display, and the power of Apple silicon, this laptop handles everything from everyday tasks to demanding creative workflows with ease.",
    features: [
      "Apple M3 chip with 8-core CPU and 10-core GPU",
      "15.3-inch Liquid Retina display with 500 nits brightness",
      "Up to 18 hours of battery life",
      "8GB unified memory, 256GB SSD storage",
      "1080p FaceTime HD camera with advanced image signal processor",
      "MagSafe 3 charging, two Thunderbolt / USB 4 ports",
      "Wi-Fi 6E and Bluetooth 5.3",
      "Fanless design — completely silent operation",
    ],
    images: [
      "/images/apple-macbook-air-m3-silver.jpg",
      "/images/macbook-air-open-display.jpg",
      "/images/macbook-air-keyboard-closeup.jpg",
      "/images/macbook-air-ports-side.jpg",
    ],
    inStock: true,
    stockCount: 7,
    prime: true,
    deliveryDate: "Dec 16 – Dec 17",
    returnDays: 15,
    specs: [
      { label: "Brand", value: "Apple" },
      { label: "Processor", value: "Apple M3" },
      { label: "RAM", value: "8 GB" },
      { label: "Storage", value: "256 GB SSD" },
      { label: "Display", value: '15.3" Liquid Retina' },
      { label: "OS", value: "macOS Sonoma" },
      { label: "Weight", value: "1.51 kg" },
      { label: "Battery", value: "Up to 18 hours" },
    ],
  },
];

const DEFAULT_PRODUCT = MOCK_PRODUCTS[0];

// ─── Mock reviews ─────────────────────────────────────────────────────────────

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    author: "TechEnthusiast_Mike",
    avatar: "/images/reviewer-avatar-mike.jpg",
    rating: 5,
    title: "Best noise-canceling headphones I have ever owned",
    body: "I have tried many headphones over the years and these are by far the best. The noise cancellation is incredible — I can barely hear anything on a busy subway. Sound quality is rich and detailed, and the battery life is outstanding. Highly recommend for anyone who travels frequently or works in a noisy environment.",
    date: "December 8, 2024",
    verified: true,
    helpful: 342,
    notHelpful: 12,
  },
  {
    id: 2,
    author: "AudioPhile_Sarah",
    avatar: "/images/reviewer-avatar-sarah.jpg",
    rating: 4,
    title: "Excellent sound, slightly tight fit at first",
    body: "The sound quality is phenomenal and the noise cancellation works as advertised. My only minor complaint is that the headband felt a bit tight during the first few days of use. After breaking them in, they are now very comfortable. The touch controls are intuitive and the companion app offers great customization options.",
    date: "November 29, 2024",
    verified: true,
    helpful: 218,
    notHelpful: 8,
  },
  {
    id: 3,
    author: "WorkFromHome_James",
    avatar: "/images/reviewer-avatar-james.jpg",
    rating: 5,
    title: "Game changer for remote work",
    body: "Working from home with two kids is challenging. These headphones have been a complete game changer. The noise cancellation blocks out everything and the call quality is crystal clear. My colleagues say I sound better than ever on video calls. Worth every penny.",
    date: "November 15, 2024",
    verified: true,
    helpful: 189,
    notHelpful: 4,
  },
  {
    id: 4,
    author: "MusicLover_Priya",
    avatar: "/images/reviewer-avatar-priya.jpg",
    rating: 4,
    title: "Great headphones with minor software quirks",
    body: "Sound quality is top-notch across all genres. The Sony Headphones Connect app is useful but occasionally crashes on my Android phone. The Speak-to-Chat feature is clever but sometimes activates unintentionally. Despite these small issues, the overall experience is excellent and I use them every single day.",
    date: "October 31, 2024",
    verified: false,
    helpful: 97,
    notHelpful: 15,
  },
  {
    id: 5,
    author: "FrequentFlyer_David",
    avatar: "/images/reviewer-avatar-david.jpg",
    rating: 5,
    title: "Perfect travel companion",
    body: "I fly internationally several times a month and these headphones have transformed my travel experience. The noise cancellation on planes is exceptional. Battery easily lasts a full long-haul flight. The foldable design fits neatly in the included case. Multipoint connection means I can switch between my phone and laptop seamlessly.",
    date: "October 22, 2024",
    verified: true,
    helpful: 276,
    notHelpful: 6,
  },
];

// ─── Rating distribution ──────────────────────────────────────────────────────

const RATING_DIST = [
  { stars: 5, pct: 68 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 8 },
  { stars: 2, pct: 3 },
  { stars: 1, pct: 3 },
];

// ─── Helper components ────────────────────────────────────────────────────────

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span key={star} className="relative inline-block" style={{ width: size, height: size }}>
            <Star
              size={size}
              className="text-gray-300"
              fill="currentColor"
            />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? "50%" : "100%" }}
              >
                <Star size={size} className="text-[#FF9900]" fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function ProductPageInner() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();

  const idParam = searchParams.get("id");
  const product =
    MOCK_PRODUCTS.find((p) => p.id === Number(idParam)) ?? DEFAULT_PRODUCT;

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, "up" | "down" | null>>({});

  // Reset state when product changes
  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setAddedToCart(false);
    setWishlisted(false);
  }, [product.id]);

  const handleAddToCart = () => {
    try {
      const stored = localStorage.getItem("shopnow-cart");
      const cart: Array<{ id: number; quantity: number; title: string; price: number; image: string; category: string; description: string; rating: { rate: number; count: number } }> =
        stored ? JSON.parse(stored) : [];
      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          quantity,
          title: product.title,
          price: product.price,
          image: product.images[0] ?? "",
          category: product.category,
          description: product.description,
          rating: { rate: product.rating, count: product.reviewCount },
        });
      }
      localStorage.setItem("shopnow-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2500);
    } catch {
      // silently fail
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const handleHelpful = (reviewId: number, vote: "up" | "down") => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: prev[reviewId] === vote ? null : vote,
    }));
  };

  const quantityOptions = Array.from({ length: Math.min(product.stockCount, 10) }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-[#EAEDED]">
      {/* Breadcrumb */}
      <motion.nav
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="bg-white border-b border-gray-200"
        aria-label="Breadcrumb"
      >
        <div className="max-w-[1500px] mx-auto px-4 py-2 flex items-center gap-1 text-xs text-gray-600 flex-wrap">
          <Link href="/" className="hover:text-[#FF9900] hover:underline transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-gray-400 flex-shrink-0" />
          <Link href="/products" className="hover:text-[#FF9900] hover:underline transition-colors">
            {product.category}
          </Link>
          <ChevronRight size={12} className="text-gray-400 flex-shrink-0" />
          <span className="text-gray-800 truncate max-w-[200px] sm:max-w-xs">{product.title}</span>
        </div>
      </motion.nav>

      <div className="max-w-[1500px] mx-auto px-3 sm:px-4 py-6">
        {/* ── Top section: image + info + buy box ── */}
        <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] p-4 sm:p-6 lg:p-8 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 lg:gap-10">

            {/* ── Image gallery ── */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-[420px]"
            >
              {/* Thumbnail strip */}
              <div className="flex sm:flex-col lg:flex-col gap-2 order-2 sm:order-1">
                {product.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all duration-200 ${
                      selectedImage === idx
                        ? "border-[#FF9900] shadow-[0_0_0_1px_#FF9900]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>

              {/* Main image */}
              <div className="order-1 sm:order-2 flex-1 lg:flex-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative aspect-square w-full lg:w-[360px] rounded-xl overflow-hidden bg-gray-50 border border-gray-100"
                  >
                    <img
                      src={product.images[selectedImage] ?? product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain p-4"
                    />
                    {product.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ── Product info ── */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4 min-w-0"
            >
              {/* Brand */}
              <Link
                href={`/products?q=${encodeURIComponent(product.brand)}`}
                className="text-[#0066C0] text-sm hover:text-[#FF9900] hover:underline transition-colors w-fit"
              >
                Visit the {product.brand} Store
              </Link>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-medium text-gray-900 leading-snug text-pretty">
                {product.title}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <StarRating rating={product.rating} size={18} />
                  <span className="text-[#0066C0] text-sm hover:text-[#FF9900] hover:underline cursor-pointer transition-colors font-medium">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className="text-[#0066C0] text-sm hover:text-[#FF9900] hover:underline transition-colors"
                >
                  {product.reviewCount.toLocaleString("en-US")} ratings
                </button>
                <span className="text-gray-300">|</span>
                <span className="text-[#0066C0] text-sm cursor-pointer hover:underline">
                  1,200+ bought in past month
                </span>
              </div>

              <div className="border-t border-gray-100" />

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-red-600 text-sm font-medium">
                  -{product.discount}%
                </span>
                <span className="text-3xl font-medium text-gray-900">
                  <sup className="text-base align-super">$</sup>
                  {Math.floor(product.price)}
                  <sup className="text-base align-super">
                    {((product.price % 1) * 100).toFixed(0).padStart(2, "0")}
                  </sup>
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">List price:</span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Prime badge */}
              {product.prime && (
                <div className="flex items-center gap-2">
                  <span className="bg-[#00A8E0] text-white text-xs font-bold px-2 py-0.5 rounded tracking-wide">
                    prime
                  </span>
                  <span className="text-sm text-gray-600">
                    FREE delivery{" "}
                    <span className="font-semibold text-gray-900">{product.deliveryDate}</span>
                  </span>
                </div>
              )}

              {/* Delivery info */}
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <Truck size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <span>
                  Order within{" "}
                  <span className="text-green-700 font-semibold">5 hrs 23 mins</span> to get it by{" "}
                  <span className="font-semibold">{product.deliveryDate}</span>
                </span>
              </div>

              {/* Stock */}
              {product.inStock ? (
                <p className="text-green-700 font-medium text-base">In Stock</p>
              ) : (
                <p className="text-red-600 font-medium text-base">Out of Stock</p>
              )}
              {product.inStock && product.stockCount <= 10 && (
                <p className="text-red-600 text-sm -mt-2">
                  Only {product.stockCount} left in stock — order soon.
                </p>
              )}

              {/* Features list */}
              <ul className="space-y-1.5 mt-1">
                {product.features.slice(0, 4).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Action buttons (mobile/tablet) */}
              <div className="flex flex-col gap-2 mt-2 lg:hidden">
                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <label htmlFor="qty-mobile" className="text-sm font-medium text-gray-700">
                    Qty:
                  </label>
                  <select
                    id="qty-mobile"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                  >
                    {quantityOptions.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-[#FF9900] hover:bg-[#e88a00] text-gray-900 font-semibold py-2.5 rounded-full text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_8px_rgba(255,153,0,0.35)]"
                >
                  {addedToCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check size={16} /> Added to Cart
                    </span>
                  ) : (
                    "Add to Cart"
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="w-full bg-[#FFD814] hover:bg-[#f0c800] text-gray-900 font-semibold py-2.5 rounded-full text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </motion.button>
              </div>

              {/* Wishlist + Share */}
              <div className="flex items-center gap-4 mt-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setWishlisted((w) => !w)}
                  className="flex items-center gap-1.5 text-sm text-[#0066C0] hover:text-[#FF9900] transition-colors"
                >
                  <Heart
                    size={16}
                    className={wishlisted ? "fill-red-500 text-red-500" : ""}
                  />
                  {wishlisted ? "Saved to Wishlist" : "Add to Wish List"}
                </motion.button>
                <button className="flex items-center gap-1.5 text-sm text-[#0066C0] hover:text-[#FF9900] transition-colors">
                  <Share2 size={16} />
                  Share
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mt-2 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Shield size={14} className="text-green-600" />
                  Secure transaction
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <RotateCcw size={14} className="text-blue-600" />
                  {product.returnDays}-day returns
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Truck size={14} className="text-[#FF9900]" />
                  Free shipping
                </div>
              </div>
            </motion.div>

            {/* ── Buy box (desktop) ── */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex flex-col gap-4 w-[240px] xl:w-[260px] flex-shrink-0"
            >
              <div className="border border-gray-200 rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] flex flex-col gap-4">
                {/* Price */}
                <div>
                  <span className="text-2xl font-medium text-gray-900">
                    <sup className="text-sm align-super">$</sup>
                    {Math.floor(product.price)}
                    <sup className="text-sm align-super">
                      {((product.price % 1) * 100).toFixed(0).padStart(2, "0")}
                    </sup>
                  </span>
                </div>

                {/* Prime */}
                {product.prime && (
                  <div className="flex items-center gap-1.5">
                    <span className="bg-[#00A8E0] text-white text-xs font-bold px-1.5 py-0.5 rounded tracking-wide">
                      prime
                    </span>
                    <span className="text-xs text-gray-600">FREE Delivery</span>
                  </div>
                )}

                {/* Delivery */}
                <div className="text-sm text-gray-700">
                  <Truck size={14} className="inline mr-1 text-gray-500" />
                  Arrives:{" "}
                  <span className="font-semibold text-gray-900">{product.deliveryDate}</span>
                </div>

                {/* Stock */}
                {product.inStock ? (
                  <p className="text-green-700 font-semibold text-base">In Stock</p>
                ) : (
                  <p className="text-red-600 font-semibold text-base">Out of Stock</p>
                )}

                {/* Quantity selector */}
                <div className="flex items-center gap-2">
                  <label htmlFor="qty-desktop" className="text-sm font-medium text-gray-700">
                    Qty:
                  </label>
                  <select
                    id="qty-desktop"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900] flex-1"
                  >
                    {quantityOptions.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add to Cart */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-[#FF9900] hover:bg-[#e88a00] text-gray-900 font-semibold py-2.5 rounded-full text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_8px_rgba(255,153,0,0.35)]"
                >
                  {addedToCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check size={16} /> Added to Cart
                    </span>
                  ) : (
                    "Add to Cart"
                  )}
                </motion.button>

                {/* Buy Now */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="w-full bg-[#FFD814] hover:bg-[#f0c800] text-gray-900 font-semibold py-2.5 rounded-full text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </motion.button>

                {/* Secure transaction */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Shield size={12} className="text-green-600" />
                  Secure transaction
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Ships from</span>
                    <span className="font-medium text-gray-800">{APP_NAME}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sold by</span>
                    <span className="font-medium text-gray-800">{product.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Returns</span>
                    <span className="font-medium text-gray-800">
                      {product.returnDays} days
                    </span>
                  </div>
                </div>

                {/* Wishlist */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setWishlisted((w) => !w)}
                  className="w-full border border-gray-300 hover:border-[#FF9900] text-gray-700 hover:text-[#FF9900] font-medium py-2 rounded-full text-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Heart
                    size={14}
                    className={wishlisted ? "fill-red-500 text-red-500" : ""}
                  />
                  {wishlisted ? "Saved" : "Add to Wish List"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Tabbed section ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden mb-6"
        >
          {/* Tab bar */}
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[#FF9900] text-[#FF9900]"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                {tab === "description"
                  ? "Product Description"
                  : tab === "specs"
                  ? "Specifications"
                  : `Customer Reviews (${product.reviewCount.toLocaleString("en-US")})`}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === "description" && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-6 sm:p-8"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4">About this item</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-pretty">
                  {product.description}
                </p>
                <h3 className="text-base font-bold text-gray-900 mb-3">Key Features</h3>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2"
                >
                  {product.features.map((feat, i) => (
                    <motion.li
                      key={i}
                      variants={fadeInUp}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#FF9900]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={11} className="text-[#FF9900]" />
                      </span>
                      {feat}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}

            {activeTab === "specs" && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-6 sm:p-8"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr
                          key={spec.label}
                          className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        >
                          <td className="px-5 py-3 font-medium text-gray-700 w-1/3 border-r border-gray-200">
                            {spec.label}
                          </td>
                          <td className="px-5 py-3 text-gray-900">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-6 sm:p-8"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-6">Customer Reviews</h2>

                {/* Rating summary */}
                <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-gray-200">
                  {/* Overall score */}
                  <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0">
                    <span className="text-5xl font-bold text-gray-900">
                      {product.rating.toFixed(1)}
                    </span>
                    <StarRating rating={product.rating} size={20} />
                    <span className="text-sm text-gray-500">
                      {product.reviewCount.toLocaleString("en-US")} global ratings
                    </span>
                  </div>

                  {/* Distribution bars */}
                  <div className="flex-1 space-y-2">
                    {RATING_DIST.map((row) => (
                      <div key={row.stars} className="flex items-center gap-3">
                        <button className="text-[#0066C0] text-sm hover:underline w-14 text-right flex-shrink-0">
                          {row.stars} star
                        </button>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${row.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 * (5 - row.stars) }}
                            className="h-full bg-[#FF9900] rounded-full"
                          />
                        </div>
                        <span className="text-[#0066C0] text-sm w-10 flex-shrink-0">
                          {row.pct}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review cards */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {MOCK_REVIEWS.map((review) => (
                    <motion.article
                      key={review.id}
                      variants={fadeInUp}
                      className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                    >
                      {/* Reviewer */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          <img
                            src={review.avatar}
                            alt={review.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-semibold text-sm text-gray-900">
                          {review.author}
                        </span>
                      </div>

                      {/* Stars + title */}
                      <div className="flex items-center gap-2 mb-1">
                        <StarRating rating={review.rating} size={14} />
                        <span className="font-semibold text-sm text-gray-900">
                          {review.title}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                        <span>Reviewed on {review.date}</span>
                        {review.verified && (
                          <>
                            <span>|</span>
                            <span className="text-[#C45500]">Verified Purchase</span>
                          </>
                        )}
                      </div>

                      {/* Body */}
                      <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        {review.body}
                      </p>

                      {/* Helpful */}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>
                          {(review.helpful + (helpfulVotes[review.id] === "up" ? 1 : 0)).toLocaleString("en-US")} people found this helpful
                        </span>
                        <button
                          onClick={() => handleHelpful(review.id, "up")}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-all duration-200 ${
                            helpfulVotes[review.id] === "up"
                              ? "border-[#FF9900] text-[#FF9900] bg-[#FF9900]/5"
                              : "border-gray-300 text-gray-600 hover:border-gray-500"
                          }`}
                        >
                          <ThumbsUp size={12} />
                          Helpful
                        </button>
                        <button
                          onClick={() => handleHelpful(review.id, "down")}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-all duration-200 ${
                            helpfulVotes[review.id] === "down"
                              ? "border-red-400 text-red-500 bg-red-50"
                              : "border-gray-300 text-gray-600 hover:border-gray-500"
                          }`}
                        >
                          <ThumbsDown size={12} />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>

                {/* See all reviews */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="text-[#0066C0] text-sm hover:text-[#FF9900] hover:underline transition-colors font-medium flex items-center gap-1">
                    See all {product.reviewCount.toLocaleString("en-US")} reviews
                    <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Related products strip ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] p-6 sm:p-8"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            Customers also viewed
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {[
              {
                id: 101,
                title: "Bose QuietComfort 45 Headphones",
                price: 229.0,
                rating: 4.5,
                image: "/images/bose-quietcomfort-45-headphones.jpg",
              },
              {
                id: 102,
                title: "Apple AirPods Pro (2nd Gen)",
                price: 189.0,
                rating: 4.8,
                image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
              },
              {
                id: 103,
                title: "Jabra Evolve2 85 Wireless Headset",
                price: 349.0,
                rating: 4.4,
                image: "/images/jabra-evolve2-85-wireless-headset.jpg",
              },
              {
                id: 104,
                title: "Sennheiser Momentum 4 Wireless",
                price: 279.95,
                rating: 4.6,
                image: "/images/sennheiser-momentum-4-wireless.jpg",
              },
              {
                id: 105,
                title: "Sony WF-1000XM5 Earbuds",
                price: 249.99,
                rating: 4.7,
                image: "/images/sony-wf1000xm5-earbuds.jpg",
              },
            ].map((item) => (
              <motion.div
                key={item.id}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
              >
                <Link href={`/product?id=${item.id}`}>
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-2 group-hover:border-[#FF9900]/40 transition-colors duration-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-xs text-gray-800 font-medium line-clamp-2 mb-1 group-hover:text-[#0066C0] transition-colors">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1 mb-0.5">
                    <StarRating rating={item.rating} size={11} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={null}>
      <ProductPageInner />
    </Suspense>
  );
}
