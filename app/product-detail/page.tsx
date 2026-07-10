"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, ChevronDown, ChevronRight, Check, Truck, RotateCcw, Shield, Plus, Minus, Share2, AlertCircle, ThumbsUp, ThumbsDown, Image } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PRODUCT = {
  id: 42,
  title: "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones",
  brand: "Sony",
  asin: "B09XS7JWHH",
  price: 279.99,
  originalPrice: 399.99,
  discount: 30,
  rating: 4.7,
  reviewCount: 18432,
  inStock: true,
  stockCount: 12,
  prime: true,
  category: "Electronics",
  subcategory: "Headphones",
  images: [
    "/images/sony-headphones-black-front.jpg",
    "/images/sony-headphones-black-side.jpg",
    "/images/sony-headphones-black-folded.jpg",
    "/images/sony-headphones-black-detail.jpg",
    "/images/sony-headphones-case.jpg",
  ],
  colors: ["Midnight Black", "Platinum Silver"],
  description:
    "Industry-leading noise canceling with two processors and eight microphones. Crystal clear hands-free calling with four beamforming microphones, precise voice pickup, and advanced audio signal processing. Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback). Lightweight, soft fit comfort with a newly designed headband and ear pads.",
  highlights: [
    "Industry-leading noise cancellation powered by two processors",
    "Crystal clear hands-free calling with 4 beamforming microphones",
    "Up to 30-hour battery life with quick charge (3 min = 3 hrs)",
    "Multipoint connection — connect to two Bluetooth devices simultaneously",
    "Speak-to-chat automatically pauses music when you start a conversation",
    "Adaptive Sound Control adjusts ambient sound settings automatically",
    "Lightweight design at just 250g for all-day comfort",
    "Works with Alexa, Google Assistant, and Siri",
  ],
  specs: [
    { label: "Brand", value: "Sony" },
    { label: "Model", value: "WH-1000XM5" },
    { label: "Color", value: "Midnight Black" },
    { label: "Connectivity", value: "Bluetooth 5.2" },
    { label: "Battery Life", value: "30 hours" },
    { label: "Weight", value: "250 grams" },
    { label: "Driver Size", value: "30mm" },
    { label: "Frequency Response", value: "4 Hz – 40,000 Hz" },
    { label: "Noise Cancellation", value: "Active (ANC)" },
    { label: "Microphones", value: "8 microphones" },
    { label: "Foldable", value: "No" },
    { label: "Warranty", value: "1 Year Manufacturer" },
  ],
  deliveryDate: "Tuesday, July 15",
  freeDeliveryMin: 25,
};

const REVIEWS = [
  {
    id: 1,
    author: "Marcus T.",
    avatar: "M",
    rating: 5,
    title: "Best noise canceling headphones I've ever owned",
    date: "July 2, 2025",
    verified: true,
    helpful: 342,
    body: "I've tried Bose, Apple, and several others. These Sony XM5s blow them all out of the water. The noise cancellation is absolutely incredible — I can wear these on a busy subway and hear nothing but my music. Sound quality is warm and detailed. Battery lasts me nearly a week of daily commuting.",
    images: ["/images/review-headphones-worn.jpg"],
  },
  {
    id: 2,
    author: "Priya S.",
    avatar: "P",
    rating: 4,
    title: "Excellent sound, minor comfort issue after long sessions",
    date: "June 28, 2025",
    verified: true,
    helpful: 198,
    body: "Sound quality and noise cancellation are top tier. My only gripe is that after about 3 hours of continuous wear, the ear cups start to feel a bit warm. Not a dealbreaker at all — just something to note if you plan marathon listening sessions. Call quality is outstanding for video meetings.",
    images: [],
  },
  {
    id: 3,
    author: "Derek W.",
    avatar: "D",
    rating: 5,
    title: "Worth every penny — a game changer for remote work",
    date: "June 20, 2025",
    verified: true,
    helpful: 276,
    body: "Working from home with two kids is chaos. These headphones have been a lifesaver. I put them on and I'm in my own world. The mic quality is great for Zoom calls too. My team says I sound clearer than ever. Highly recommend for anyone who needs to focus.",
    images: [],
  },
  {
    id: 4,
    author: "Aisha K.",
    avatar: "A",
    rating: 3,
    title: "Great headphones but app is buggy",
    date: "June 15, 2025",
    verified: false,
    helpful: 89,
    body: "The headphones themselves are fantastic — sound quality is superb and ANC is impressive. However, the Sony Headphones Connect app crashes frequently on my iPhone 15. Some features like Speak-to-Chat don't work reliably. Hoping for a firmware update soon.",
    images: [],
  },
];

const RELATED_PRODUCTS = [
  {
    id: 10,
    title: "Bose QuietComfort 45 Headphones",
    price: 229.99,
    originalPrice: 329.99,
    rating: 4.6,
    reviewCount: 9823,
    image: "/images/bose-quietcomfort-45-headphones.jpg",
    prime: true,
  },
  {
    id: 11,
    title: "Apple AirPods Max Wireless Over-Ear",
    price: 449.99,
    originalPrice: 549.99,
    rating: 4.5,
    reviewCount: 7234,
    image: "/images/apple-airpods-max-wireless.jpg",
    prime: true,
  },
  {
    id: 12,
    title: "Jabra Evolve2 85 Wireless Headset",
    price: 379.99,
    originalPrice: 449.99,
    rating: 4.4,
    reviewCount: 3421,
    image: "/images/jabra-evolve2-85-headset.jpg",
    prime: false,
  },
  {
    id: 13,
    title: "Sennheiser Momentum 4 Wireless",
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviewCount: 5678,
    image: "/images/sennheiser-momentum-4-wireless.jpg",
    prime: true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function StarRatingDisplay({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-6 h-6" : "w-5 h-5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = s <= Math.floor(rating);
        const half = !filled && s === Math.ceil(rating) && rating % 1 >= 0.5;
        return (
          <svg key={s} className={sizeClass} viewBox="0 0 20 20" fill="none">
            {filled ? (
              <polygon
                points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                fill="#10B981"
              />
            ) : half ? (
              <>
                <defs>
                  <linearGradient id={`half-star-${s}`}>
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <polygon
                  points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                  fill={`url(#half-star-${s})`}
                />
              </>
            ) : (
              <polygon
                points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                fill="#D1D5DB"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [reviewHelpful, setReviewHelpful] = useState<Record<number, "up" | "down" | null>>({});
  const [expandedReview, setExpandedReview] = useState<number | null>(null);

  const handleAddToCart = () => {
    try {
      const stored = localStorage.getItem("shopnow-cart");
      const cart = stored ? (JSON.parse(stored) as Array<{ id: number; quantity: number; title: string; price: number; image: string; category: string; description: string; rating: { rate: number; count: number } }>) : [];
      const existing = cart.find((item) => item.id === PRODUCT.id);
      let updated;
      if (existing) {
        updated = cart.map((item) =>
          item.id === PRODUCT.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updated = [
          ...cart,
          {
            id: PRODUCT.id,
            title: PRODUCT.title,
            price: PRODUCT.price,
            quantity,
            image: PRODUCT.images[0],
            category: PRODUCT.category,
            description: PRODUCT.description,
            rating: { rate: PRODUCT.rating, count: PRODUCT.reviewCount },
          },
        ];
      }
      localStorage.setItem("shopnow-cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cart-updated"));
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2500);
    } catch {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2500);
    }
  };

  const ratingBreakdown = [
    { stars: 5, pct: 68 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 7 },
    { stars: 2, pct: 4 },
    { stars: 1, pct: 3 },
  ];

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4 py-2.5">
          <nav className="flex items-center gap-1 text-xs text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#10B981] hover:underline transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-[#10B981] hover:underline transition-colors">
              {PRODUCT.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/products?category=${PRODUCT.subcategory.toLowerCase()}`}
              className="hover:text-[#10B981] hover:underline transition-colors"
            >
              {PRODUCT.subcategory}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 truncate max-w-[200px] sm:max-w-xs">{PRODUCT.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[auto_1fr_320px] gap-6">
          {/* ── Image Gallery ── */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="xl:w-[420px]"
          >
            <div className="flex gap-3">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2">
                {PRODUCT.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-14 h-14 rounded border-2 overflow-hidden flex items-center justify-center bg-white transition-all ${
                      selectedImage === idx
                        ? "border-[#10B981] shadow-md"
                        : "border-gray-200 hover:border-[#10B981]"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Image className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center min-h-[380px] relative group">
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center min-h-[380px]">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-[#10B981]/10 to-[#3B82F6]/10 rounded-full flex items-center justify-center mb-4">
                      <Image className="w-20 h-20 text-[#10B981]/40" />
                    </div>
                    <p className="text-gray-400 text-sm">Product Image {selectedImage + 1}</p>
                  </div>
                </div>
                {/* Wishlist button */}
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Share */}
            <button className="mt-3 flex items-center gap-1.5 text-sm text-[#10B981] hover:underline">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </motion.div>

          {/* ── Product Info ── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Brand */}
            <Link
              href={`/products?brand=${PRODUCT.brand}`}
              className="text-sm text-[#10B981] hover:underline font-medium"
            >
              {PRODUCT.brand}
            </Link>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug">
              {PRODUCT.title}
            </h1>

            {/* Rating row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <StarRatingDisplay rating={PRODUCT.rating} size="md" />
                <span className="text-sm font-semibold text-[#10B981]">{PRODUCT.rating}</span>
              </div>
              <button
                onClick={() => setActiveTab("reviews")}
                className="text-sm text-[#10B981] hover:underline"
              >
                {PRODUCT.reviewCount.toLocaleString("en-US")} ratings
              </button>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">ASIN: {PRODUCT.asin}</span>
            </div>

            <div className="border-t border-gray-200" />

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-xs text-gray-500">Price:</span>
                <span className="text-3xl font-bold text-gray-900">{formatPrice(PRODUCT.price)}</span>
                {PRODUCT.originalPrice > PRODUCT.price && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(PRODUCT.originalPrice)}
                    </span>
                    <span className="text-sm font-semibold bg-[#10B981] text-white px-2 py-0.5 rounded">
                      -{PRODUCT.discount}%
                    </span>
                  </>
                )}
              </div>
              {PRODUCT.prime && (
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#3B82F6] text-white text-xs font-bold px-2 py-0.5 rounded">
                    prime
                  </span>
                  <span className="text-xs text-gray-500">FREE delivery on orders over $25</span>
                </div>
              )}
            </div>

            {/* Color selector */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Color: <span className="font-semibold">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {PRODUCT.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded border-2 text-sm transition-all ${
                      selectedColor === color
                        ? "border-[#10B981] bg-[#10B981]/5 text-[#10B981] font-medium"
                        : "border-gray-300 text-gray-600 hover:border-[#10B981]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">About this item:</p>
              <ul className="space-y-1.5">
                {PRODUCT.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery info */}
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 border border-gray-200">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-gray-700">FREE delivery </span>
                  <span className="text-sm font-bold text-gray-900">{PRODUCT.deliveryDate}</span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Order within{" "}
                    <span className="text-[#10B981] font-medium">4 hrs 23 mins</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span className="text-sm text-gray-600">Free 30-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span className="text-sm text-gray-600">1-year manufacturer warranty</span>
              </div>
            </div>
          </motion.div>

          {/* ── Buy Box ── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="lg:col-start-2 xl:col-start-3"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4 sticky top-20">
              {/* Price */}
              <div>
                <p className="text-2xl font-bold text-gray-900">{formatPrice(PRODUCT.price)}</p>
                {PRODUCT.prime && (
                  <span className="bg-[#3B82F6] text-white text-xs font-bold px-2 py-0.5 rounded mt-1 inline-block">
                    prime
                  </span>
                )}
              </div>

              {/* Delivery */}
              <div className="text-sm space-y-1">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">FREE</span> delivery{" "}
                  <span className="font-semibold text-gray-900">{PRODUCT.deliveryDate}</span>
                </p>
                <p className="text-gray-500 text-xs">
                  Order within{" "}
                  <span className="text-[#10B981] font-medium">4 hrs 23 mins</span>
                </p>
              </div>

              {/* Stock */}
              {PRODUCT.inStock ? (
                <p className="text-[#10B981] font-semibold text-sm">
                  In Stock ({PRODUCT.stockCount} remaining)
                </p>
              ) : (
                <p className="text-red-600 font-semibold text-sm">Currently unavailable</p>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Qty:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-1.5 text-sm font-semibold border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!PRODUCT.inStock}
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-2.5 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </button>

                <Link
                  href="/checkout"
                  className="w-full bg-[#3B82F6] hover:bg-[#1D4ED8] text-white font-semibold py-2.5 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2"
                >
                  Buy Now
                </Link>
              </div>

              {/* Secure transaction */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Shield className="w-3.5 h-3.5 text-[#10B981]" />
                Secure transaction
              </div>

              {/* Sold by */}
              <div className="text-xs text-gray-500 space-y-1 border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span>Ships from</span>
                  <span className="text-[#10B981] font-medium">ShopNow</span>
                </div>
                <div className="flex justify-between">
                  <span>Sold by</span>
                  <span className="text-[#10B981] font-medium">Sony Official Store</span>
                </div>
                <div className="flex justify-between">
                  <span>Returns</span>
                  <span>Eligible for free returns</span>
                </div>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted((w) => !w)}
                className="w-full flex items-center justify-center gap-2 text-sm text-[#10B981] hover:underline py-1"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlisted ? "fill-red-500 text-red-500" : "text-[#10B981]"
                  }`}
                />
                {wishlisted ? "Remove from Wish List" : "Add to Wish List"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Tabs Section ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          {/* Tab headers */}
          <div className="flex border-b border-gray-200">
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[#10B981] text-[#10B981]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab === "reviews" ? `Reviews (${REVIEWS.length})` : tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">
            {/* Description */}
            {activeTab === "description" && (
              <div className="space-y-4 max-w-3xl">
                <p className="text-gray-700 leading-relaxed">{PRODUCT.description}</p>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {PRODUCT.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Specs */}
            {activeTab === "specs" && (
              <div className="max-w-2xl">
                <table className="w-full text-sm">
                  <tbody>
                    {PRODUCT.specs.map((spec, i) => (
                      <tr
                        key={spec.label}
                        className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="py-2.5 px-4 font-medium text-gray-700 w-1/3">
                          {spec.label}
                        </td>
                        <td className="py-2.5 px-4 text-gray-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Rating summary */}
                <div className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-200">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-900">{PRODUCT.rating}</p>
                    <StarRatingDisplay rating={PRODUCT.rating} size="md" />
                    <p className="text-sm text-gray-500 mt-1">
                      {PRODUCT.reviewCount.toLocaleString("en-US")} ratings
                    </p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {ratingBreakdown.map(({ stars, pct }) => (
                      <div key={stars} className="flex items-center gap-2 text-sm">
                        <button className="text-[#10B981] hover:underline w-12 text-right">
                          {stars} star
                        </button>
                        <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-[#10B981] h-full rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-gray-500 w-8">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual reviews */}
                <div className="space-y-6">
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0F2027] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {review.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <StarRatingDisplay rating={review.rating} size="sm" />
                            <span className="text-sm font-medium text-gray-900">{review.title}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {review.date}
                            {review.verified && (
                              <span className="ml-2 text-[#10B981] font-medium">✓ Verified Purchase</span>
                            )}
                          </p>
                          <p
                            className={`text-sm text-gray-600 mt-2 leading-relaxed ${
                              expandedReview !== review.id && review.body.length > 200
                                ? "line-clamp-3"
                                : ""
                            }`}
                          >
                            {review.body}
                          </p>
                          {review.body.length > 200 && (
                            <button
                              onClick={() =>
                                setExpandedReview(
                                  expandedReview === review.id ? null : review.id
                                )
                              }
                              className="text-xs text-[#10B981] hover:underline mt-1"
                            >
                              {expandedReview === review.id ? "Show less" : "Read more"}
                            </button>
                          )}
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-xs text-gray-500">Helpful?</span>
                            <button
                              onClick={() =>
                                setReviewHelpful((prev) => ({
                                  ...prev,
                                  [review.id]: prev[review.id] === "up" ? null : "up",
                                }))
                              }
                              className={`flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors ${
                                reviewHelpful[review.id] === "up"
                                  ? "border-[#10B981] text-[#10B981] bg-[#10B981]/5"
                                  : "border-gray-300 text-gray-500 hover:border-gray-400"
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              Yes ({review.helpful})
                            </button>
                            <button
                              onClick={() =>
                                setReviewHelpful((prev) => ({
                                  ...prev,
                                  [review.id]: prev[review.id] === "down" ? null : "down",
                                }))
                              }
                              className={`flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors ${
                                reviewHelpful[review.id] === "down"
                                  ? "border-red-400 text-red-500 bg-red-50"
                                  : "border-gray-300 text-gray-500 hover:border-gray-400"
                              }`}
                            >
                              <ThumbsDown className="w-3 h-3" />
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Related Products ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Customers also viewed</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {RELATED_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/product-detail`}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow group"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-md mb-3 flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-300" />
                </div>
                <p className="text-sm text-gray-800 font-medium line-clamp-2 group-hover:text-[#10B981] transition-colors">
                  {product.title}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <StarRatingDisplay rating={product.rating} size="sm" />
                  <span className="text-xs text-gray-500">
                    ({product.reviewCount.toLocaleString("en-US")})
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice > product.price && (
                  <p className="text-xs text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
                {product.prime && (
                  <span className="bg-[#3B82F6] text-white text-xs font-bold px-1.5 py-0.5 rounded mt-1 inline-block">
                    prime
                  </span>
                )}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── Alert: Added to Cart ── */}
        {addedToCart && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 bg-[#0F2027] text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 z-50"
          >
            <Check className="w-5 h-5 text-[#10B981]" />
            <span className="font-medium">Added to cart!</span>
            <Link href="/cart" className="ml-2 text-[#10B981] underline text-sm">
              View Cart
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
