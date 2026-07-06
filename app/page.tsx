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
    accent: "#FF9900",
    bg: "from-[#131921] to-[#1e2d3d]",
  },
  {
    id: 2,
    badge: "New Arrivals",
    headline: "Fresh Styles for Every Season",
    subline: "Discover the latest in fashion, footwear, and accessories curated just for you.",
    cta: "Explore Fashion",
    href: "/products?category=clothing",
    image: "https://heroshopsf.com/cdn/shop/files/VALL8620_1200x.progressive.jpg?v=1775163428",
    accent: "#FF9900",
    bg: "from-[#1a1a2e] to-[#16213e]",
  },
  {
    id: 3,
    badge: "Best Sellers",
    headline: "Transform Your Home",
    subline: "Premium kitchen, decor, and furniture pieces loved by millions of customers.",
    cta: "Shop Home",
    href: "/products?category=home",
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    accent: "#FF9900",
    bg: "from-[#1c1c1c] to-[#2d2d2d]",
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
    originalPrice: 1099.99,
    rating: 4.6,
    reviewCount: 8923,
    image: "https://bjs.scene7.com/is/image/bjs/345905?$bjs-Zoom$",
    badge: "36% Off",
    category: "Electronics",
    prime: true,
  },
  {
    id: 8,
    title: "Adidas Ultraboost 22 Running Shoes",
    price: 119.99,
    originalPrice: 190.00,
    rating: 4.6,
    reviewCount: 15678,
    image: "https://cdn11.bigcommerce.com/s-4d06e/images/stencil/1024x1024/products/20222/32336/Screenshot_2024-04-15_at_13-55-19_s3.webp_WEBP_Image_1800_1800_pixels_Scaled_51__95484.1713207341.png?c=2",
    badge: "New",
    category: "Sports",
    prime: true,
  },
];

const DEALS_OF_DAY = [
  {
    id: 1,
    title: "Anker 65W USB-C Charger",
    price: 25.99,
    originalPrice: 45.99,
    discount: 43,
    image: "https://i5.walmartimages.com/seo/Anker-Nano-II-USB-C-Charger-735-Charger-GaN-II-Foldable-Wall-Charger-65W-PPS-3-Port-Fast-Charging_4413ae84-8081-4ea6-b2d4-e71edaeb53b2.b43e68d0e9f4c522a25c57657c11a183.jpeg",
    timeLeft: "6h 23m",
    claimed: 78,
  },
  {
    id: 2,
    title: "Logitech MX Master 3S Mouse",
    price: 69.99,
    originalPrice: 99.99,
    discount: 30,
    image: "https://resource.logitech.com/c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-top-view-black-new-1.png",
    timeLeft: "3h 45m",
    claimed: 62,
  },
  {
    id: 3,
    title: "Dyson V8 Cordless Vacuum",
    price: 249.99,
    originalPrice: 419.99,
    discount: 40,
    image: "https://cb.scene7.com/is/image/Crate/CB_F24_DV_01_Vert_314_001",
    timeLeft: "11h 10m",
    claimed: 91,
  },
  {
    id: 4,
    title: "Fitbit Charge 6 Fitness Tracker",
    price: 99.95,
    originalPrice: 159.95,
    discount: 37,
    image: "https://m.media-amazon.com/images/I/61ZtqtvoD2L._AC_UF894,1000_QL80_.jpg",
    timeLeft: "8h 55m",
    claimed: 55,
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    location: "New York, NY",
    rating: 5,
    text: "ShopNow has completely changed how I shop online. The delivery is incredibly fast and every product I've ordered has been exactly as described. The return process is seamless too.",
    product: "Sony WH-1000XM5",
    avatar: "https://mormonartist.net/images/interviews/sarah-m-eden/sarah-m-eden-01.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "James T.",
    location: "Austin, TX",
    rating: 5,
    text: "I've been a Prime member for two years and the value is unbeatable. Free two-day shipping on thousands of items, exclusive deals, and the customer service is always top-notch.",
    product: "Kindle Paperwhite",
    avatar: "https://s3.amazonaws.com/arc-authors/cmg/8adde958-cd42-477c-9467-0ee150778a71.png",
    verified: true,
  },
  {
    id: 3,
    name: "Priya K.",
    location: "San Francisco, CA",
    rating: 5,
    text: "The product selection is massive and the prices are consistently the best I can find anywhere. I especially love the detailed reviews that help me make confident purchasing decisions.",
    product: "Instant Pot Duo",
    avatar: "https://cdn.shopify.com/s/files/1/0320/7168/0140/files/free-2-day-delivery.jpg?v=1685733210",
    verified: true,
  },
];

const VALUE_PROPS = [
  {
    icon: Truck,
    title: "Free Two-Day Delivery",
    desc: "Prime members get free two-day shipping on millions of eligible items with no minimum order.",
  },
  {
    icon: Shield,
    title: "Buyer Protection",
    desc: "Every purchase is protected. If something goes wrong, we make it right — guaranteed.",
  },
  {
    icon: RotateCcw,
    title: "Easy 30-Day Returns",
    desc: "Not satisfied? Return most items within 30 days for a full refund, no questions asked.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    desc: "Our dedicated support team is available around the clock to help with any issue.",
  },
];

const STATS = [
  { value: "300M+", label: "Products Available" },
  { value: "200M+", label: "Prime Members Worldwide" },
  { value: "185+", label: "Countries Served" },
  { value: "4.8★", label: "Average Customer Rating" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < full
                ? "fill-[#FF9900] text-[#FF9900]"
                : i === full && half
                ? "fill-[#FF9900]/50 text-[#FF9900]"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-[#007185] hover:text-[#C7511F] cursor-pointer">
        {count.toLocaleString("en-US")}
      </span>
    </div>
  );
}

function ProductCard({ product, index }: { product: typeof FEATURED_PRODUCTS[0]; index: number }) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const addToCart = () => {
    try {
      const stored = localStorage.getItem("shopnow-cart");
      const cart = stored ? JSON.parse(stored) : [];
      const existing = cart.find((i: { id: number }) => i.id === product.id);
      if (existing) {
        existing.quantity = (existing.quantity ?? 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("shopnow-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));
    } catch {
      // silent
    }
  };

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white rounded-xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col"
    >
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#CC0C39] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setWishlisted((w) => !w)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
        {product.prime && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-[#00A8E1] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wider">
              prime
            </span>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{product.category}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 hover:text-[#C7511F] transition-colors">
            {product.title}
          </h3>
        </Link>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-baseline gap-1.5 mt-auto pt-1">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
          <span className="text-xs font-semibold text-[#CC0C39]">-{discount}%</span>
        </div>
        <button
          onClick={addToCart}
          className="mt-1 w-full bg-[#FF9900] hover:bg-[#e68900] text-[#131921] text-xs font-bold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroAutoplay, setHeroAutoplay] = useState(true);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Hero autoplay
  useEffect(() => {
    if (!heroAutoplay) return;
    autoplayRef.current = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [heroAutoplay, heroIndex]);

  const goHero = (idx: number) => {
    setHeroIndex(idx);
    setHeroAutoplay(false);
    setTimeout(() => setHeroAutoplay(true), 8000);
  };

  const slide = HERO_SLIDES[heroIndex] ?? HERO_SLIDES[0];

  return (
    <main className="min-h-screen bg-[#EAEDED]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative overflow-hidden">
        <motion.div
          key={slide.id}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`relative bg-gradient-to-r ${slide.bg} min-h-[420px] md:min-h-[500px] flex items-center`}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-80`} />
          </div>

          <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <motion.div
              key={`text-${slide.id}`}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-5"
            >
              <span className="inline-flex items-center gap-2 bg-[#FF9900]/20 border border-[#FF9900]/40 text-[#FF9900] text-xs font-bold px-3 py-1.5 rounded-full w-fit uppercase tracking-wider">
                <Zap className="w-3 h-3" />
                {slide.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight text-balance">
                {slide.headline}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md text-pretty">
                {slide.subline}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#e68900] text-[#131921] font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-[0_4px_20px_rgba(255,153,0,0.4)] active:scale-95 text-sm"
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 text-sm backdrop-blur-sm"
                >
                  Browse All
                </Link>
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              key={`img-${slide.id}`}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="hidden md:flex justify-center items-center"
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10" />
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className="relative z-10 w-full h-full object-contain p-6 rounded-2xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Slide controls */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goHero(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === heroIndex
                    ? "w-6 h-2 bg-[#FF9900]"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev/Next */}
          <button
            onClick={() => goHero((heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 border border-white/10 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => goHero((heroIndex + 1) % HERO_SLIDES.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 border border-white/10 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
            <Link
              href="/products"
              className="text-sm text-[#007185] hover:text-[#C7511F] font-medium flex items-center gap-1 transition-colors"
            >
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.slug} variants={scaleIn}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="group flex flex-col items-center gap-2 bg-white rounded-xl p-3 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12)] hover:border-[#FF9900]/30 transition-all duration-200"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight group-hover:text-[#C7511F] transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── DEALS OF THE DAY ─────────────────────────────────────────────── */}
      <section id="deals" className="bg-white py-10">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">Deals of the Day</h2>
                <span className="flex items-center gap-1.5 bg-[#CC0C39] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  Ends soon
                </span>
              </div>
              <Link
                href="/products"
                className="text-sm text-[#007185] hover:text-[#C7511F] font-medium flex items-center gap-1 transition-colors"
              >
                See all deals <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DEALS_OF_DAY.map((deal) => (
                <motion.div
                  key={deal.id}
                  variants={fadeInUp}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group border border-black/5 rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] bg-white hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)] transition-all duration-300"
                >
                  <div className="relative bg-gray-50 aspect-square overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-[#CC0C39] text-white text-xs font-extrabold px-2 py-0.5 rounded-full">
                      -{deal.discount}%
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {deal.title}
                    </h3>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-gray-900">${deal.price.toFixed(2)}</span>
                      <span className="text-xs text-gray-400 line-through">${deal.originalPrice.toFixed(2)}</span>
                    </div>
                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                        <span className="font-medium text-[#CC0C39]">{deal.claimed}% claimed</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {deal.timeLeft}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#CC0C39] rounded-full transition-all duration-500"
                          style={{ width: `${deal.claimed}%` }}
                        />
                      </div>
                    </div>
                    <button className="w-full bg-[#FF9900] hover:bg-[#e68900] text-[#131921] text-xs font-bold py-2 rounded-lg transition-all duration-200 active:scale-95">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-sm text-gray-500 mt-0.5">Handpicked favorites across every category</p>
            </div>
            <Link
              href="/products"
              className="text-sm text-[#007185] hover:text-[#C7511F] font-medium flex items-center gap-1 transition-colors"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {FEATURED_PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── PRIME BANNER ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#131921] via-[#1a2535] to-[#131921] py-14">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex flex-col gap-4 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="bg-[#00A8E1] text-white text-sm font-extrabold px-3 py-1 rounded tracking-widest uppercase">
                  prime
                </span>
                <span className="text-white font-bold text-lg">Membership</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight text-balance">
                Get More with ShopNow Prime
              </h2>
              <ul className="space-y-2">
                {[
                  "Free two-day delivery on millions of items",
                  "Exclusive member-only deals and early access",
                  "Unlimited streaming of movies and TV shows",
                  "Free same-day delivery in select cities",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#00A8E1] flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/account"
                  className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#e68900] text-[#131921] font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-[0_4px_20px_rgba(255,153,0,0.4)] text-sm"
                >
                  Try Prime Free for 30 Days
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/account"
                  className="inline-flex items-center gap-2 bg-transparent border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 text-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {[
                { icon: Truck, label: "Free Delivery", sub: "On millions of items" },
                { icon: Zap, label: "Lightning Deals", sub: "Exclusive early access" },
                { icon: Package, label: "Same-Day", sub: "In select cities" },
                { icon: Award, label: "Prime Rewards", sub: "Earn on every purchase" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:bg-white/10 transition-colors duration-200"
                >
                  <item.icon className="w-5 h-5 text-[#00A8E1]" />
                  <div>
                    <p className="text-white text-xs font-bold">{item.label}</p>
                    <p className="text-gray-400 text-[10px]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {VALUE_PROPS.map((vp) => (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#FF9900]/10 flex items-center justify-center">
                  <vp.icon className="w-6 h-6 text-[#FF9900]" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{vp.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{vp.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="bg-[#EAEDED] py-12">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="bg-white rounded-2xl p-6 text-center border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]"
              >
                <p className="text-3xl font-extrabold text-[#131921] tracking-tight">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight text-balance">
                Loved by Millions of Shoppers
              </h2>
              <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto text-pretty">
                Real reviews from real customers who shop with ShopNow every day.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((review) => (
                <motion.div
                  key={review.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-[#FAFAFA] border border-black/5 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-gray-900">{review.name}</p>
                        {review.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#007185]" />
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400">{review.location}</p>
                    </div>
                    <div className="ml-auto flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FF9900] text-[#FF9900]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {review.text}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium border-t border-black/5 pt-3">
                    Verified purchase: {review.product}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#131921] py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center flex flex-col items-center gap-6"
          >
            <div className="w-14 h-14 rounded-full bg-[#FF9900]/15 border border-[#FF9900]/30 flex items-center justify-center">
              <ShoppingCart className="w-7 h-7 text-[#FF9900]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight text-balance max-w-2xl">
              Start Shopping Today. Everything You Need, Delivered Fast.
            </h2>
            <p className="text-gray-400 text-base max-w-lg text-pretty leading-relaxed">
              Join over 200 million customers who trust ShopNow for the best prices, fastest delivery, and widest selection on the planet.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#e68900] text-[#131921] font-bold px-8 py-3.5 rounded-lg transition-all duration-200 hover:shadow-[0_4px_24px_rgba(255,153,0,0.45)] active:scale-95 text-sm"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/account"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 text-sm backdrop-blur-sm"
              >
                Create Free Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}