"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Star, ChevronRight, ShoppingCart, Truck, Shield, RotateCcw, Headphones, ArrowRight, Zap, Package, Heart, Eye, Clock, Award, CheckCircle, ChevronLeft } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_ACCENT, CATEGORIES } from "@/lib/data";

// ─── Inline mock data ────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    id: 1,
    badge: "Limited Time Deal",
    headline: "Up to 60% Off Electronics",
    subline: "Shop the biggest sale of the season. Laptops, phones, headphones and more.",
    cta: "Shop Electronics",
    href: "/products?category=electronics",
    image: "https://helios-i.mashable.com/imagery/articles/05X1FliiK9hHcTgSRjzBf2b/hero-image.fill.size_1248x702.v1772448992.jpg",
    accent: "#10B981",
    bg: "from-[#0F2027] to-[#1A3A4A]",
  },
  {
    id: 2,
    badge: "New Arrivals",
    headline: "Fresh Styles for Every Season",
    subline: "Discover the latest in fashion, footwear, and accessories curated just for you.",
    cta: "Explore Fashion",
    href: "/products?category=clothing",
    image: "https://heroshopsf.com/cdn/shop/files/VALL8620_1200x.progressive.jpg?v=1775163428",
    accent: "#10B981",
    bg: "from-[#0F2027] to-[#1A3A4A]",
  },
  {
    id: 3,
    badge: "Best Sellers",
    headline: "Transform Your Home",
    subline: "Premium kitchen, decor, and furniture pieces loved by millions of customers.",
    cta: "Shop Home",
    href: "/products?category=home",
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    accent: "#10B981",
    bg: "from-[#1A3A4A] to-[#2D5A6E]",
  },
];

const FEATURED_PRODUCTS = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 279.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 12847,
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    badge: "Best Seller",
    category: "Electronics",
    prime: true,
  },
  {
    id: 2,
    title: "Apple AirPods Pro (2nd Generation)",
    price: 189.99,
    originalPrice: 249.00,
    rating: 4.9,
    reviewCount: 34521,
    image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
    badge: "Deal of the Day",
    category: "Electronics",
    prime: true,
  },
  {
    id: 3,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewCount: 89234,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    badge: "40% Off",
    category: "Home & Kitchen",
    prime: true,
  },
  {
    id: 4,
    title: "Kindle Paperwhite (16 GB) — Waterproof",
    price: 99.99,
    originalPrice: 139.99,
    rating: 4.8,
    reviewCount: 56789,
    image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
    badge: "Prime Deal",
    category: "Electronics",
    prime: true,
  },
  {
    id: 5,
    title: "Levi's Men's 501 Original Fit Jeans",
    price: 39.99,
    originalPrice: 69.50,
    rating: 4.5,
    reviewCount: 23456,
    image: "https://static.wikia.nocookie.net/shingekinokyojin/images/b/b1/Levi_Ackermann_%28Anime%29_character_image.png/revision/latest?cb=20231105181307",
    badge: "Top Pick",
    category: "Clothing",
    prime: false,
  },
  {
    id: 6,
    title: "Ninja AF101 Air Fryer 4 Quart",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviewCount: 41230,
    image: "https://m.media-amazon.com/images/I/71+8uTMDRFL.jpg",
    badge: "Lightning Deal",
    category: "Home & Kitchen",
    prime: true,
  },
  {
    id: 7,
    title: "Samsung 65\" 4K QLED Smart TV",
    price: 699.99,
    originalPrice: 999.99,
    rating: 4.6,
    reviewCount: 8932,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    badge: "30% Off",
    category: "Electronics",
    prime: true,
  },
  {
    id: 8,
    title: "Dyson V15 Detect Cordless Vacuum",
    price: 549.99,
    originalPrice: 749.99,
    rating: 4.8,
    reviewCount: 15678,
    image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
    badge: "Editor's Choice",
    category: "Home & Kitchen",
    prime: true,
  },
];

const DEAL_OF_DAY = {
  id: 99,
  title: "Bose QuietComfort 45 Bluetooth Wireless Noise Cancelling Headphones",
  price: 199.99,
  originalPrice: 329.00,
  discount: 39,
  rating: 4.7,
  reviewCount: 22341,
  image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
  claimed: 73,
  endsAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
};

const TRUST_BADGES = [
  { icon: Truck, label: "Free Shipping", sub: "On orders over $35" },
  { icon: RotateCcw, label: "Easy Returns", sub: "30-day return policy" },
  { icon: Shield, label: "Secure Payment", sub: "256-bit SSL encryption" },
  { icon: Headphones, label: "24/7 Support", sub: "Always here to help" },
];

const CATEGORY_ICONS: Record<string, string> = {
  electronics: "⚡",
  clothing: "👗",
  jewelry: "💎",
  home: "🏠",
  books: "📚",
  sports: "⚽",
  toys: "🧸",
  beauty: "✨",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count?: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
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
      {count !== undefined && (
        <span className="text-xs text-[#10B981] font-medium">
          {count.toLocaleString("en-US")}
        </span>
      )}
    </div>
  );
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: (typeof FEATURED_PRODUCTS)[0];
  onAddToCart: (id: number) => void;
}) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    onAddToCart(product.id);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <motion.div
      variants={scaleIn}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group flex flex-col border border-gray-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F0F7F4] aspect-square">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://via.placeholder.com/300x300?text=Product";
          }}
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#10B981] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            {product.badge}
          </span>
        )}
        {/* Discount */}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-[#3B82F6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {/* Wishlist */}
        <button
          onClick={() => setWishlisted((w) => !w)}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 ${
              wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Prime badge */}
        {product.prime && (
          <span className="inline-flex items-center gap-1 bg-[#3B82F6] text-white text-[10px] font-bold px-2 py-0.5 rounded w-fit">
            ✓ Prime
          </span>
        )}

        <Link href={`/product-detail?id=${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-[#10B981] transition-colors leading-snug">
            {product.title}
          </h3>
        </Link>

        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            addedToCart
              ? "bg-[#059669] text-white"
              : "bg-[#10B981] hover:bg-[#059669] text-white"
          }`}
        >
          {addedToCart ? (
            <><CheckCircle className="w-4 h-4" /> Added!</>
          ) : (
            <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function CountdownTimer({ endsAt }: { endsAt: string }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-1.5">
      {([timeLeft.h, timeLeft.m, timeLeft.s] as number[]).map((val, i) => (
        <>
          <div
            key={i}
            className="bg-[#10B981] text-white rounded-md px-2.5 py-1 text-lg font-mono font-bold min-w-[2.5rem] text-center"
          >
            {pad(val)}
          </div>
          {i < 2 && (
            <span key={`sep-${i}`} className="text-[#10B981] font-bold text-xl">
              :
            </span>
          )}
        </>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance hero
  useEffect(() => {
    slideTimer.current = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => {
      if (slideTimer.current) clearInterval(slideTimer.current);
    };
  }, []);

  // Sync cart count
  useEffect(() => {
    const sync = () => {
      try {
        const stored = localStorage.getItem("shopnow-cart");
        if (stored) {
          const items = JSON.parse(stored) as Array<{ quantity: number }>;
          setCartCount(items.reduce((s, i) => s + (i.quantity ?? 0), 0));
        }
      } catch {
        // ignore
      }
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("cart-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cart-updated", sync);
    };
  }, []);

  const handleAddToCart = (productId: number) => {
    const product = FEATURED_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    try {
      const stored = localStorage.getItem("shopnow-cart");
      const cart: Array<{
        id: number;
        title: string;
        price: number;
        image: string;
        quantity: number;
        category: string;
        description: string;
        rating: { rate: number; count: number };
      }> = stored ? JSON.parse(stored) : [];
      const existing = cart.find((i) => i.id === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
          category: product.category,
          description: "",
          rating: { rate: product.rating, count: product.reviewCount },
        });
      }
      localStorage.setItem("shopnow-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));
      setCartCount((c) => c + 1);
      setToastMsg(`"${product.title.slice(0, 30)}…" added to cart!`);
      setTimeout(() => setToastMsg(""), 3000);
    } catch {
      // ignore
    }
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-[#F0F7F4]">
      {/* ── Toast ── */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F2027] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-medium animate-fade-in">
          <CheckCircle className="w-4 h-4 text-[#10B981]" />
          {toastMsg}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          HERO CAROUSEL
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" aria-label="Promotional banners">
        <div
          className={`relative bg-gradient-to-r ${slide.bg} min-h-[420px] md:min-h-[520px] flex items-center transition-all duration-700`}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt=""
              aria-hidden
              className="w-full h-full object-cover opacity-20"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row items-center gap-10 w-full">
            <motion.div
              key={slide.id}
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              className="flex-1 max-w-xl"
            >
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: slide.accent, color: "#fff" }}
              >
                {slide.badge}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                {slide.headline}
              </h1>
              <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
                {slide.subline}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg"
                >
                  {slide.cta} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/30 transition-colors duration-200"
                >
                  Browse All
                </Link>
              </div>
            </motion.div>

            {/* Right image panel */}
            <motion.div
              key={`img-${slide.id}`}
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="hidden md:flex flex-1 justify-center items-center"
            >
              <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://via.placeholder.com/300x300?text=Sale";
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Slide controls */}
          <button
            onClick={() =>
              setCurrentSlide(
                (s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
              )
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              setCurrentSlide((s) => (s + 1) % HERO_SLIDES.length)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "bg-[#10B981] scale-125"
                    : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TRUST BADGES
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1500px] mx-auto px-4 py-5">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {TRUST_BADGES.map((badge) => (
              <motion.div
                key={badge.label}
                variants={fadeInUp}
                className="flex items-center gap-3 p-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#F0F7F4] flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{badge.label}</p>
                  <p className="text-xs text-gray-500">{badge.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1500px] mx-auto px-4 py-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Shop by Category
            <span className="block w-12 h-1 bg-[#10B981] rounded-full mt-1" />
          </h2>
          <Link
            href="/products"
            className="text-sm text-[#10B981] hover:text-[#059669] font-semibold flex items-center gap-1"
          >
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3"
        >
          {CATEGORIES.map((cat) => (
            <motion.div key={cat.slug} variants={scaleIn}>
              <Link
                href={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl hover:shadow-md hover:border-[#10B981] border border-transparent transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#F0F7F4] flex items-center justify-center text-2xl group-hover:bg-[#10B981]/10 transition-colors">
                  {CATEGORY_ICONS[cat.slug] ?? "🛍️"}
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-[#10B981] transition-colors">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          DEAL OF THE DAY
      ══════════════════════════════════════════════════════════════ */}
      <section id="deals" className="bg-[#0F2027] py-10">
        <div className="max-w-[1500px] mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-8 bg-[#1A3A4A] rounded-2xl p-6 md:p-10 shadow-xl"
          >
            {/* Image */}
            <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden bg-[#0F2027] flex items-center justify-center">
              <img
                src={DEAL_OF_DAY.image}
                alt={DEAL_OF_DAY.title}
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://via.placeholder.com/300x300?text=Deal";
                }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-[#10B981]" />
                <span className="text-[#10B981] font-bold text-sm uppercase tracking-widest">
                  Deal of the Day
                </span>
              </div>
              <h2 className="text-xl md:text-3xl font-extrabold mb-3 leading-tight">
                {DEAL_OF_DAY.title}
              </h2>
              <StarRating rating={DEAL_OF_DAY.rating} count={DEAL_OF_DAY.reviewCount} />

              <div className="flex items-baseline gap-3 mt-4 mb-2">
                <span className="text-3xl font-extrabold text-[#10B981]">
                  ${DEAL_OF_DAY.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ${DEAL_OF_DAY.originalPrice.toFixed(2)}
                </span>
                <span className="bg-[#10B981] text-white text-sm font-bold px-2 py-0.5 rounded">
                  -{DEAL_OF_DAY.discount}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{DEAL_OF_DAY.claimed}% claimed</span>
                  <span>Limited stock</span>
                </div>
                <div className="w-full bg-[#0F2027] rounded-full h-2">
                  <div
                    className="bg-[#10B981] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${DEAL_OF_DAY.claimed}%` }}
                  />
                </div>
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Ends in:</span>
                <CountdownTimer endsAt={DEAL_OF_DAY.endsAt} />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleAddToCart(DEAL_OF_DAY.id)}
                  className="bg-[#10B981] hover:bg-[#059669] text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
                <Link
                  href={`/product-detail?id=${DEAL_OF_DAY.id}`}
                  className="bg-[#3B82F6] hover:bg-[#1D4ED8] text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1500px] mx-auto px-4 py-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Featured Products
            <span className="block w-12 h-1 bg-[#10B981] rounded-full mt-1" />
          </h2>
          <Link
            href="/products"
            className="text-sm text-[#10B981] hover:text-[#059669] font-semibold flex items-center gap-1"
          >
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PROMO BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#0F2027] to-[#1A3A4A] py-14">
        <div className="max-w-[1500px] mx-auto px-4 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Award className="w-10 h-10 text-[#10B981] mx-auto mb-4" />
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
              Become a Prime Member
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-xl mx-auto">
              Enjoy free two-day shipping, exclusive deals, ad-free music, and
              unlimited photo storage — all in one membership.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/account"
                className="bg-[#10B981] hover:bg-[#059669] text-white font-bold px-8 py-3 rounded-xl transition-colors duration-200 shadow-lg"
              >
                Try Prime Free
              </Link>
              <Link
                href="/products"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-xl border border-white/30 transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          RECENTLY VIEWED / RECOMMENDATIONS
      ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1500px] mx-auto px-4 py-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Recommended for You
            <span className="block w-12 h-1 bg-[#3B82F6] rounded-full mt-1" />
          </h2>
          <Link
            href="/products"
            className="text-sm text-[#10B981] hover:text-[#059669] font-semibold flex items-center gap-1"
          >
            See more <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {FEATURED_PRODUCTS.slice(4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Package className="w-10 h-10 text-[#10B981] mx-auto mb-3" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Get Exclusive Deals in Your Inbox
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Subscribe to our newsletter and be the first to know about flash
              sales, new arrivals, and special offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 text-sm"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3">
              No spam, unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
