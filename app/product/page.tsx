"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, ChevronRight, Check, Truck, RotateCcw, Shield, Plus, Minus, Share2, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';
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
    "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
    "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/71+8uTMDRFL.jpg",
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
    images: [],
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
    title: "Worth every penny — absolute game changer for travel",
    date: "June 20, 2025",
    verified: true,
    helpful: 276,
    body: "Just got back from a 14-hour flight and these headphones made it feel like a 2-hour trip. The noise cancellation blocked out engine noise completely. Paired instantly with my phone and laptop. The touch controls are intuitive. Highly recommend for frequent travelers.",
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
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    prime: true,
  },
  {
    id: 11,
    title: "Apple AirPods Pro (2nd Generation)",
    price: 189.99,
    originalPrice: 249.0,
    rating: 4.9,
    reviewCount: 34521,
    image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
    prime: true,
  },
  {
    id: 12,
    title: "Jabra Evolve2 85 Wireless Headset",
    price: 379.99,
    originalPrice: 449.99,
    rating: 4.5,
    reviewCount: 4231,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    prime: false,
  },
  {
    id: 13,
    title: "Sennheiser Momentum 4 Wireless",
    price: 249.95,
    originalPrice: 349.95,
    rating: 4.7,
    reviewCount: 6102,
    image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
    prime: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-6 h-6" : "w-4 h-4";

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={sizeClass} viewBox="0 0 20 20" fill="none">
          {i < full ? (
            <polygon
              points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
              fill="#10B981"
            />
          ) : i === full && half ? (
            <>
              <defs>
                <linearGradient id={`half-star-${i}`}>
                  <stop offset="50%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
              <polygon
                points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                fill={`url(#half-star-${i})`}
              />
            </>
          ) : (
            <polygon
              points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
              fill="#D1D5DB"
            />
          )}
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-12 text-right text-[#10B981] hover:underline cursor-pointer shrink-0">
        {label}
      </span>
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#10B981] rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-xs text-gray-500">{pct}%</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  const discount = Math.round(
    ((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100
  );

  const handleAddToCart = () => {
    try {
      const stored = localStorage.getItem("shopnow-cart");
      const cart = stored ? (JSON.parse(stored) as Array<{ id: number; quantity: number; [key: string]: unknown }>) : [];
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
            image: PRODUCT.images[0],
            category: PRODUCT.category,
            description: PRODUCT.description,
            rating: { rate: PRODUCT.rating, count: PRODUCT.reviewCount },
            quantity,
          },
        ];
      }
      localStorage.setItem("shopnow-cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cart-updated"));
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2500);
    } catch {
      // silently fail
    }
  };

  const ratingBars = [
    { label: "5 star", pct: 72 },
    { label: "4 star", pct: 16 },
    { label: "3 star", pct: 7 },
    { label: "2 star", pct: 3 },
    { label: "1 star", pct: 2 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4 py-2">
          <nav className="flex items-center gap-1 text-xs text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#10B981] hover:underline">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-[#10B981] hover:underline">
              {PRODUCT.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/products?category=${PRODUCT.subcategory.toLowerCase()}`}
              className="hover:text-[#10B981] hover:underline"
            >
              {PRODUCT.subcategory}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 truncate max-w-[200px]">{PRODUCT.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {/* ── Top section: images + info + buy box ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_320px] gap-6 lg:gap-8">
          {/* Image gallery */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row lg:flex-col gap-3"
          >
            {/* Thumbnails */}
            <div className="flex sm:flex-col lg:flex-col gap-2 order-2 sm:order-1">
              {PRODUCT.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 border-2 rounded overflow-hidden flex-shrink-0 transition-all duration-150 ${
                    selectedImage === idx
                      ? "border-[#10B981] shadow-md"
                      : "border-gray-200 hover:border-[#3B82F6]"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${PRODUCT.title} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://via.placeholder.com/56x56?text=img";
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="order-1 sm:order-2 relative">
              <div className="w-full sm:w-[380px] lg:w-[380px] aspect-square border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                <img
                  src={PRODUCT.images[selectedImage]}
                  alt={PRODUCT.title}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://via.placeholder.com/380x380?text=Product+Image";
                  }}
                />
              </div>
              {/* Wishlist button */}
              <button
                onClick={() => setWishlisted((w) => !w)}
                className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            {/* Brand */}
            <p className="text-sm text-[#10B981] font-medium hover:underline cursor-pointer">
              Visit the {PRODUCT.brand} Store
            </p>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-medium text-gray-900 leading-snug">
              {PRODUCT.title}
            </h1>

            {/* Rating row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[#10B981] font-semibold text-sm">{PRODUCT.rating}</span>
                <StarRating rating={PRODUCT.rating} />
              </div>
              <span className="text-sm text-[#10B981] hover:text-[#059669] hover:underline cursor-pointer">
                {PRODUCT.reviewCount.toLocaleString("en-US")} ratings
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-[#10B981] hover:text-[#059669] hover:underline cursor-pointer">
                1,200+ answered questions
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${PRODUCT.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${PRODUCT.originalPrice.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-[#10B981]">
                Save {discount}%
              </span>
            </div>

            {/* Prime badge */}
            {PRODUCT.prime && (
              <div className="flex items-center gap-2">
                <span className="bg-[#3B82F6] text-white text-xs font-bold px-2 py-0.5 rounded">
                  prime
                </span>
                <span className="text-sm text-gray-600">
                  FREE delivery{" "}
                  <span className="font-semibold text-gray-900">{PRODUCT.deliveryDate}</span>
                </span>
              </div>
            )}

            {/* Color selector */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Color:{" "}
                <span className="font-semibold text-gray-900">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {PRODUCT.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-sm border-2 rounded transition-all duration-150 ${
                      selectedColor === color
                        ? "border-[#10B981] bg-[#10B981]/10 text-[#10B981] font-medium"
                        : "border-gray-300 text-gray-700 hover:border-[#3B82F6]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">About this item</h3>
              <ul className="space-y-1.5">
                {PRODUCT.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Share */}
            <button className="flex items-center gap-1.5 text-sm text-[#10B981] hover:text-[#059669] hover:underline w-fit">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </motion.div>

          {/* Buy box */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="lg:sticky lg:top-20 self-start"
          >
            <div className="border border-gray-200 rounded-lg p-5 flex flex-col gap-4 bg-white shadow-sm">
              {/* Price */}
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ${PRODUCT.price.toFixed(2)}
                </span>
                {PRODUCT.prime && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="bg-[#3B82F6] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                      prime
                    </span>
                    <span className="text-xs text-gray-600">
                      FREE delivery <strong>{PRODUCT.deliveryDate}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Delivery info */}
              <div className="text-sm text-gray-700 flex items-start gap-2">
                <Truck className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                <span>
                  Deliver to <span className="font-semibold">New York 10001</span>
                </span>
              </div>

              {/* Stock */}
              {PRODUCT.inStock ? (
                <p className="text-[#10B981] font-semibold text-sm">
                  In Stock — only {PRODUCT.stockCount} left
                </p>
              ) : (
                <p className="text-red-600 font-semibold text-sm">Currently unavailable</p>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">Qty:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-1.5 text-sm font-medium border-x border-gray-300">
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

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!PRODUCT.inStock}
                className="w-full py-2.5 rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white disabled:opacity-50 disabled:cursor-not-allowed"
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

              {/* Buy Now */}
              <Link
                href="/checkout"
                className="w-full py-2.5 rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#1D4ED8] text-white"
              >
                Buy Now
              </Link>

              {/* Trust badges */}
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield className="w-4 h-4 text-[#10B981]" />
                  Secure transaction
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <RotateCcw className="w-4 h-4 text-[#10B981]" />
                  Free 30-day returns
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Truck className="w-4 h-4 text-[#10B981]" />
                  Ships from ShopNow
                </div>
              </div>

              {/* ASIN */}
              <p className="text-xs text-gray-400">
                ASIN: <span className="font-mono">{PRODUCT.asin}</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Tabs: Description / Specs / Reviews ── */}
        <div className="mt-10">
          {/* Tab nav */}
          <div className="flex border-b border-gray-200 gap-1">
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-medium capitalize transition-colors duration-150 border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[#10B981] text-[#10B981]"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                {tab === "reviews" ? `Reviews (${PRODUCT.reviewCount.toLocaleString("en-US")})` : tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="py-6">
            {/* Description */}
            {activeTab === "description" && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="max-w-3xl"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h2>
                <p className="text-gray-700 leading-relaxed">{PRODUCT.description}</p>
                <ul className="mt-4 space-y-2">
                  {PRODUCT.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Specs */}
            {activeTab === "specs" && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="max-w-2xl"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {PRODUCT.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex text-sm ${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <span className="w-48 px-4 py-3 font-medium text-gray-700 shrink-0">
                        {spec.label}
                      </span>
                      <span className="px-4 py-3 text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-3xl"
              >
                <div className="flex flex-col sm:flex-row gap-8 mb-8">
                  {/* Overall rating */}
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <span className="text-5xl font-bold text-gray-900">{PRODUCT.rating}</span>
                    <StarRating rating={PRODUCT.rating} size="lg" />
                    <span className="text-sm text-gray-500">
                      {PRODUCT.reviewCount.toLocaleString("en-US")} ratings
                    </span>
                  </div>

                  {/* Rating bars */}
                  <div className="flex-1 space-y-1.5">
                    {ratingBars.map((bar) => (
                      <RatingBar key={bar.label} label={bar.label} pct={bar.pct} />
                    ))}
                  </div>
                </div>

                {/* Review list */}
                <div className="space-y-6">
                  {REVIEWS.map((review) => (
                    <motion.div
                      key={review.id}
                      variants={fadeInUp}
                      className="border-b border-gray-100 pb-6 last:border-0"
                    >
                      {/* Reviewer */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-[#0F2027] text-white flex items-center justify-center font-bold text-sm">
                          {review.avatar}
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{review.author}</span>
                      </div>

                      {/* Stars + title */}
                      <div className="flex items-center gap-2 mb-1">
                        <StarRating rating={review.rating} />
                        <span className="font-semibold text-gray-900 text-sm">{review.title}</span>
                      </div>

                      {/* Meta */}
                      <p className="text-xs text-gray-500 mb-2">
                        {review.verified && (
                          <span className="text-[#10B981] font-medium">Verified Purchase</span>
                        )}{" "}
                        · {review.date}
                      </p>

                      {/* Body */}
                      <p className="text-sm text-gray-700 leading-relaxed">{review.body}</p>

                      {/* Helpful */}
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-gray-500">
                          {review.helpful} people found this helpful
                        </span>
                        <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          Helpful
                        </button>
                        <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 transition-colors">
                          <ThumbsDown className="w-3 h-3" />
                          Not helpful
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Customers also viewed</h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {RELATED_PRODUCTS.map((product) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 group"
              >
                <Link href="/product">
                  <div className="aspect-square bg-gray-50 rounded-md overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://via.placeholder.com/200x200?text=Product";
                      }}
                    />
                  </div>
                  <h3 className="text-sm text-gray-800 font-medium line-clamp-2 mb-2 group-hover:text-[#10B981] transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 mb-1">
                    <StarRating rating={product.rating} size="sm" />
                    <span className="text-xs text-gray-500">
                      ({product.reviewCount.toLocaleString("en-US")})
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  {product.prime && (
                    <span className="mt-1 inline-block bg-[#3B82F6] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                      prime
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
