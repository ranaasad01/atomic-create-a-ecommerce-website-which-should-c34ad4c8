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
    title: "Worth every penny for remote workers",
    date: "June 20, 2025",
    verified: true,
    helpful: 276,
    body: "I work from home with two kids and these headphones have been a game changer. The speak-to-chat feature is brilliant — I can pause my music just by talking without touching anything. Multipoint Bluetooth means I can switch between my laptop and phone seamlessly. Highly recommend.",
    images: [],
  },
  {
    id: 4,
    author: "Aisha K.",
    avatar: "A",
    rating: 3,
    title: "Great headphones, but the app is frustrating",
    date: "June 14, 2025",
    verified: true,
    helpful: 89,
    body: "The hardware itself is phenomenal. However, the Sony Headphones Connect app crashes frequently on my Android phone and some EQ settings don't save properly. Sony really needs to fix the software side. If you don't care about app customization, you'll love these. If you do, be prepared for some frustration.",
    images: [],
  },
  {
    id: 5,
    author: "James L.",
    avatar: "J",
    rating: 5,
    title: "Upgraded from XM4 — absolutely worth it",
    date: "June 8, 2025",
    verified: true,
    helpful: 412,
    body: "Coming from the XM4, the improvements are real and noticeable. The new ear cup design is more comfortable, the noise cancellation is noticeably better in high-frequency environments, and the call quality upgrade is massive. The non-folding design is the only downside for travel, but the included case is excellent.",
    images: ["/images/review-headphones-case-open.jpg"],
  },
];

const RELATED_PRODUCTS = [
  {
    id: 101,
    title: "Sony WF-1000XM5 True Wireless Earbuds",
    price: 229.99,
    originalPrice: 299.99,
    rating: 4.6,
    reviewCount: 9821,
    image: "/images/sony-earbuds-wf1000xm5.jpg",
    prime: true,
  },
  {
    id: 102,
    title: "Bose QuietComfort 45 Wireless Headphones",
    price: 249.00,
    originalPrice: 329.00,
    rating: 4.5,
    reviewCount: 14203,
    image: "/images/bose-quietcomfort-45.jpg",
    prime: true,
  },
  {
    id: 103,
    title: "Apple AirPods Max Wireless Over-Ear Headphones",
    price: 449.00,
    originalPrice: 549.00,
    rating: 4.4,
    reviewCount: 22187,
    image: "/images/apple-airpods-max.jpg",
    prime: true,
  },
  {
    id: 104,
    title: "Jabra Evolve2 85 Professional Wireless Headset",
    price: 379.00,
    originalPrice: 449.00,
    rating: 4.3,
    reviewCount: 3412,
    image: "/images/jabra-evolve2-85.jpg",
    prime: false,
  },
];

const RATING_BREAKDOWN = [
  { stars: 5, percent: 72 },
  { stars: 4, percent: 16 },
  { stars: 3, percent: 6 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 3 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-3.5 h-3.5", md: "w-4 h-4", lg: "w-5 h-5" };
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <span key={i} className="relative inline-block">
            <Star className={`${sizes[size]} text-gray-300`} fill="currentColor" />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "50%" }}
              >
                <Star className={`${sizes[size]} text-[#FF9900]`} fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

function PrimeTag() {
  return (
    <span className="inline-flex items-center gap-1 bg-[#00A8E0] text-white text-xs font-bold px-2 py-0.5 rounded-sm">
      prime
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const t = useTranslations();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("all");
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    try {
      const stored = localStorage.getItem("shopnow-cart");
      const cart = stored ? (JSON.parse(stored) as Array<{ id: number; quantity: number; [key: string]: unknown }>) : [];
      const existing = cart.find((item) => item.id === PRODUCT.id);
      if (existing) {
        existing.quantity = (existing.quantity ?? 0) + quantity;
      } else {
        cart.push({
          id: PRODUCT.id,
          title: PRODUCT.title,
          price: PRODUCT.price,
          image: PRODUCT.images[0] ?? "",
          quantity,
          category: PRODUCT.category,
          description: PRODUCT.description,
          rating: { rate: PRODUCT.rating, count: PRODUCT.reviewCount },
        });
      }
      localStorage.setItem("shopnow-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));
    } catch {
      // silent
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const savings = PRODUCT.originalPrice - PRODUCT.price;

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4 py-2">
          <nav className="flex items-center gap-1 text-xs text-[#007185] flex-wrap">
            <Link href="/" className="hover:underline hover:text-[#C7511F]">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Link href="/products" className="hover:underline hover:text-[#C7511F]">Electronics</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Link href="/products?category=electronics" className="hover:underline hover:text-[#C7511F]">Headphones</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600 truncate max-w-[200px]">{PRODUCT.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {/* ── Top Section: Images + Info + Buy Box ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_320px] gap-6 lg:gap-8">

          {/* Image Gallery */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="flex gap-3"
          >
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {PRODUCT.images.map((img, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedImage(i)}
                  className={`w-14 h-14 rounded border-2 overflow-hidden flex-shrink-0 transition-colors duration-150 ${
                    selectedImage === i ? "border-[#FF9900]" : "border-gray-200 hover:border-[#FF9900]/60"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`${PRODUCT.title} view ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/sony-headphones-black-front.jpg";
                    }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Main Image */}
            <motion.div
              key={selectedImage}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="w-[340px] h-[380px] md:w-[420px] md:h-[460px] rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center"
            >
              <img
                src={PRODUCT.images[selectedImage] ?? PRODUCT.images[0]}
                alt={PRODUCT.title}
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/sony-headphones-black-front.jpg";
                }}
              />
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 min-w-0"
          >
            {/* Brand + Title */}
            <div>
              <Link
                href={`/products?brand=${PRODUCT.brand}`}
                className="text-[#007185] text-sm hover:text-[#C7511F] hover:underline"
              >
                Visit the {PRODUCT.brand} Store
              </Link>
              <h1 className="text-xl md:text-2xl font-medium text-gray-900 leading-snug mt-1 text-pretty">
                {PRODUCT.title}
              </h1>
            </div>

            {/* Rating Row */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <StarRating rating={PRODUCT.rating} size="md" />
                <span className="text-[#007185] text-sm hover:text-[#C7511F] hover:underline cursor-pointer">
                  {PRODUCT.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-[#007185] text-sm hover:text-[#C7511F] hover:underline cursor-pointer">
                {PRODUCT.reviewCount.toLocaleString("en-US")} ratings
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-[#007185] text-sm hover:text-[#C7511F] hover:underline cursor-pointer">
                1,200+ answered questions
              </span>
            </div>

            {/* ASIN */}
            <p className="text-xs text-gray-500">ASIN: {PRODUCT.asin}</p>

            <div className="border-t border-gray-200" />

            {/* Price */}
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm text-gray-600">-{PRODUCT.discount}%</span>
                <span className="text-3xl font-bold text-gray-900">
                  ${PRODUCT.price.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>List Price:</span>
                <span className="line-through">${PRODUCT.originalPrice.toFixed(2)}</span>
                <span className="text-[#CC0C39] font-medium">
                  You save ${savings.toFixed(2)} ({PRODUCT.discount}%)
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {PRODUCT.prime && <PrimeTag />}
                <span className="text-xs text-gray-600">FREE delivery on orders over ${PRODUCT.freeDeliveryMin}</span>
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Color Selection */}
            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">
                Color: <span className="font-normal">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {PRODUCT.colors.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded border-2 text-sm transition-colors duration-150 ${
                      selectedColor === color
                        ? "border-[#FF9900] bg-[#FFF8EE]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">About this item</p>
              <ul className="space-y-1.5">
                {PRODUCT.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm text-gray-700 leading-relaxed">{PRODUCT.description}</p>
            </div>

            {/* Share */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-[#007185] text-sm hover:text-[#C7511F] hover:underline">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => setWishlisted((w) => !w)}
                className={`flex items-center gap-1.5 text-sm transition-colors duration-200 ${
                  wishlisted ? "text-[#CC0C39]" : "text-[#007185] hover:text-[#C7511F]"
                } hover:underline`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-[#CC0C39]" : ""}`} />
                {wishlisted ? "Saved to Wishlist" : "Add to Wish List"}
              </button>
            </div>
          </motion.div>

          {/* Buy Box */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="lg:sticky lg:top-20 self-start"
          >
            <div className="border border-gray-200 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.10)] bg-white">
              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">${PRODUCT.price.toFixed(2)}</span>
                {PRODUCT.prime && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <PrimeTag />
                    <span className="text-xs text-gray-600">FREE delivery</span>
                  </div>
                )}
              </div>

              {/* Delivery */}
              <div className="flex items-start gap-2 mb-3">
                <Truck className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <span className="text-gray-700">FREE delivery </span>
                  <span className="font-bold text-gray-900">{PRODUCT.deliveryDate}</span>
                  <p className="text-gray-500 text-xs mt-0.5">Order within 6 hrs 42 mins</p>
                </div>
              </div>

              {/* Stock */}
              <div className="mb-4">
                {PRODUCT.inStock ? (
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#007600]" />
                    <span className="text-[#007600] font-medium text-sm">In Stock</span>
                    {PRODUCT.stockCount <= 15 && (
                      <span className="text-[#CC0C39] text-xs">
                        — Only {PRODUCT.stockCount} left
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-[#CC0C39] font-medium text-sm">Currently unavailable</span>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-700 font-medium">Qty:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 hover:bg-gray-100 transition-colors duration-150 text-gray-700"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 py-1.5 text-sm font-medium border-x border-gray-300 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="px-3 py-1.5 hover:bg-gray-100 transition-colors duration-150 text-gray-700"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`w-full py-2.5 rounded-full text-sm font-medium transition-all duration-200 mb-3 flex items-center justify-center gap-2 ${
                  addedToCart
                    ? "bg-[#007600] text-white"
                    : "bg-[#FF9900] hover:bg-[#F08804] text-gray-900"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </motion.button>

              {/* Buy Now */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 rounded-full text-sm font-medium bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 transition-all duration-200 mb-4"
              >
                Buy Now
              </motion.button>

              {/* Trust signals */}
              <div className="space-y-2 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                  Secure transaction
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <RotateCcw className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                  Free 30-day returns
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Truck className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                  Ships from ShopNow
                </div>
              </div>

              {/* Sold by */}
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Ships from</span>
                  <Link href="/" className="text-[#007185] hover:underline">ShopNow</Link>
                </div>
                <div className="flex justify-between">
                  <span>Sold by</span>
                  <Link href="/" className="text-[#007185] hover:underline">Sony Official Store</Link>
                </div>
                <div className="flex justify-between">
                  <span>Returns</span>
                  <Link href="/returns" className="text-[#007185] hover:underline">Eligible for Return</Link>
                </div>
              </div>
            </div>

            {/* Wishlist card */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setWishlisted((w) => !w)}
              className={`mt-3 w-full py-2.5 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                wishlisted
                  ? "border-[#CC0C39] text-[#CC0C39] bg-red-50"
                  : "border-gray-300 text-gray-700 hover:border-gray-400 bg-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? "fill-[#CC0C39] text-[#CC0C39]" : ""}`} />
              {wishlisted ? "Saved to Wish List" : "Add to Wish List"}
            </motion.button>
          </motion.div>
        </div>

        {/* ── Technical Specifications ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 border-t border-gray-200 pt-8"
        >
          <button
            onClick={() => setSpecsOpen((o) => !o)}
            className="flex items-center justify-between w-full text-left group"
            aria-expanded={specsOpen}
          >
            <h2 className="text-xl font-bold text-gray-900">Technical Specifications</h2>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${specsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {specsOpen && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mt-4 overflow-hidden rounded-xl border border-gray-200"
            >
              <table className="w-full text-sm">
                <tbody>
                  {PRODUCT.specs.map((spec, i) => (
                    <tr key={spec.label} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-2.5 font-medium text-gray-700 w-1/3 border-r border-gray-200">
                        {spec.label}
                      </td>
                      <td className="px-4 py-2.5 text-gray-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </motion.section>

        {/* ── Customer Reviews ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 border-t border-gray-200 pt-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Rating Summary */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl font-bold text-gray-900">{PRODUCT.rating.toFixed(1)}</span>
                <div>
                  <StarRating rating={PRODUCT.rating} size="lg" />
                  <p className="text-sm text-gray-500 mt-1">out of 5</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {PRODUCT.reviewCount.toLocaleString("en-US")} global ratings
              </p>

              {/* Breakdown bars */}
              <div className="space-y-2">
                {RATING_BREAKDOWN.map((row) => (
                  <div key={row.stars} className="flex items-center gap-2 text-sm">
                    <Link
                      href="#"
                      className="text-[#007185] hover:text-[#C7511F] hover:underline whitespace-nowrap w-12 text-right"
                    >
                      {row.stars} star
                    </Link>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 * (5 - row.stars) }}
                        className="h-full bg-[#FF9900] rounded-full"
                      />
                    </div>
                    <span className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer w-8">
                      {row.percent}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Write review CTA */}
              <div className="mt-6 border-t border-gray-200 pt-5">
                <p className="text-sm font-semibold text-gray-800 mb-1">Review this product</p>
                <p className="text-xs text-gray-500 mb-3">Share your thoughts with other customers</p>
                <Link
                  href="/account"
                  className="block w-full text-center py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-150"
                >
                  Write a customer review
                </Link>
              </div>
            </div>

            {/* Review List */}
            <div>
              {/* Filter */}
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
                {["all", "5", "4", "3", "2", "1"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setReviewFilter(f)}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors duration-150 ${
                      reviewFilter === f
                        ? "bg-[#FF9900] border-[#FF9900] text-white font-medium"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {f === "all" ? "All stars" : `${f} star`}
                  </button>
                ))}
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-6"
              >
                {REVIEWS.filter(
                  (r) => reviewFilter === "all" || r.rating === parseInt(reviewFilter, 10)
                ).map((review) => (
                  <motion.div
                    key={review.id}
                    variants={fadeInUp}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    {/* Reviewer */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {review.avatar}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{review.author}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <StarRating rating={review.rating} size="sm" />
                      <span className="text-sm font-bold text-gray-900">{review.title}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-500">Reviewed on {review.date}</span>
                      {review.verified && (
                        <span className="text-xs text-[#C7511F]">Verified Purchase</span>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{review.body}</p>

                    {review.images.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {review.images.map((img, i) => (
                          <div
                            key={i}
                            className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden bg-gray-50"
                          >
                            <img
                              src={img}
                              alt={`Review image ${i + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{review.helpful} people found this helpful</span>
                      <button className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 transition-colors duration-150">
                        <ThumbsUp className="w-3 h-3" />
                        Helpful
                      </button>
                      <button className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 transition-colors duration-150">
                        <ThumbsDown className="w-3 h-3" />
                        Not helpful
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {REVIEWS.filter(
                (r) => reviewFilter === "all" || r.rating === parseInt(reviewFilter, 10)
              ).length === 0 && (
                <div className="flex flex-col items-center gap-2 py-12 text-gray-400">
                  <AlertCircle className="w-8 h-8" />
                  <p className="text-sm">No reviews match this filter.</p>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* ── Related Products ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 border-t border-gray-200 pt-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Customers also viewed</h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {RELATED_PRODUCTS.map((product) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                whileHover={{ y: -4, boxShadow: "0 8px 24px -4px rgba(0,0,0,0.12)" }}
                className="border border-gray-200 rounded-xl p-4 bg-white cursor-pointer transition-shadow duration-200"
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50 mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/sony-headphones-black-front.jpg";
                    }}
                  />
                </div>
                <p className="text-xs text-gray-800 font-medium line-clamp-2 mb-1 leading-snug">
                  {product.title}
                </p>
                <div className="flex items-center gap-1 mb-1">
                  <StarRating rating={product.rating} size="sm" />
                  <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString("en-US")})</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                </div>
                {product.prime && (
                  <div className="mt-1">
                    <PrimeTag />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Delivery & Returns Info ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 border-t border-gray-200 pt-8 pb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery, Returns and Payments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Truck className="w-6 h-6 text-[#FF9900]" />,
                title: "Fast Delivery",
                body: "Free standard delivery on orders over $25. Prime members get FREE Two-Day Delivery on millions of items.",
              },
              {
                icon: <RotateCcw className="w-6 h-6 text-[#FF9900]" />,
                title: "Easy Returns",
                body: "Return items within 30 days of delivery for a full refund. No questions asked. Free return shipping on eligible items.",
              },
              {
                icon: <Shield className="w-6 h-6 text-[#FF9900]" />,
                title: "Secure Payments",
                body: "All transactions are encrypted and secured. We accept Visa, Mastercard, Amex, PayPal, and ShopNow Gift Cards.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -2 }}
                className="flex gap-4 p-5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <div className="flex-shrink-0 mt-0.5">{card.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{card.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}