"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Trash2, Heart, ShoppingCart, ChevronRight, Shield, Truck, RotateCcw, Tag } from 'lucide-react';
import { useTranslations } from "next-intl";
import { type CartItem } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

const slideOutLeft: Variants = {
  hidden: { opacity: 0, x: -40, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
  visible: { opacity: 1, x: 0, height: "auto", marginBottom: 16, paddingTop: 16, paddingBottom: 16 },
  exit: { opacity: 0, x: -60, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, transition: { duration: 0.35, ease: "easeInOut" } },
};

const MOCK_CART: CartItem[] = [
  {
    id: 1,
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
    price: 189.99,
    description: "Active Noise Cancellation, Transparency Mode, Personalized Spatial Audio",
    category: "electronics",
    image: "/images/airpods-pro-wireless-earbuds.jpg",
    rating: { rate: 4.8, count: 12430 },
    quantity: 1,
  },
  {
    id: 2,
    title: "Kindle Paperwhite (16 GB) — Now with a 6.8\" display",
    price: 139.99,
    description: "Adjustable warm light, up to 10 weeks of battery life, waterproof",
    category: "electronics",
    image: "/images/kindle-paperwhite-ereader.jpg",
    rating: { rate: 4.7, count: 8921 },
    quantity: 2,
  },
  {
    id: 3,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
    price: 79.95,
    description: "Slow cooker, rice cooker, steamer, sauté, yogurt maker, warmer",
    category: "home",
    image: "/images/instant-pot-pressure-cooker.jpg",
    rating: { rate: 4.6, count: 31200 },
    quantity: 1,
  },
];

function StarRating({ rate, count }: { rate: number; count: number }) {
  const full = Math.floor(rate);
  const half = rate - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
            {i < full ? (
              <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" fill="#10B981" />
            ) : i === full && half ? (
              <>
                <defs>
                  <linearGradient id={`half-${i}`}>
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" fill={`url(#half-${i})`} />
              </>
            ) : (
              <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" fill="#D1D5DB" />
            )}
          </svg>
        ))}
      </div>
      <span className="text-xs text-[#0891B2] hover:text-[#059669] cursor-pointer">
        {count.toLocaleString("en-US")}
      </span>
    </div>
  );
}

export default function CartPage() {
  const t = useTranslations();
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("shopnow-cart");
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        setItems(parsed);
      } else {
        setItems(MOCK_CART);
        localStorage.setItem("shopnow-cart", JSON.stringify(MOCK_CART));
      }
    } catch {
      setItems(MOCK_CART);
    }
  }, []);

  const syncCart = (updated: CartItem[]) => {
    setItems(updated);
    try {
      localStorage.setItem("shopnow-cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cart-updated"));
    } catch {
      // ignore
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    const updated = items
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
      .filter((item) => item.quantity > 0);
    syncCart(updated);
  };

  const removeItem = (id: number) => {
    syncCart(items.filter((item) => item.id !== id));
  };

  const saveForLater = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setSavedItems((prev) => [...prev, item]);
      removeItem(id);
    }
  };

  const moveToCart = (id: number) => {
    const item = savedItems.find((i) => i.id === id);
    if (item) {
      syncCart([...items, item]);
      setSavedItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try SAVE10.");
      setPromoApplied(false);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 35 ? 0 : 5.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-[#0F2027]">
            Shopping Cart
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {items.length === 0 ? (
          /* ── Empty state ── */
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-sm p-12 text-center"
          >
            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#0F2027] mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven&apos;t added anything yet. Start shopping!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Continue Shopping
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── Left column: cart items ── */}
            <div className="flex-1 min-w-0">
              {/* Delivery banner */}
              <div className="bg-white rounded-xl shadow-sm px-5 py-3 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                <p className="text-sm text-[#0F2027]">
                  {subtotal >= 35 ? (
                    <span className="font-semibold text-[#10B981]">Your order qualifies for FREE delivery!</span>
                  ) : (
                    <>
                      Add{" "}
                      <span className="font-semibold text-[#10B981]">
                        ${(35 - subtotal).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>{" "}
                      more to get FREE delivery
                    </>
                  )}
                </p>
              </div>

              {/* Cart items */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-[#0F2027]">
                    {itemCount} {itemCount === 1 ? "item" : "items"} in cart
                  </h2>
                  <span className="text-sm text-gray-500">Price</span>
                </div>

                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={slideOutLeft}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="px-5 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex gap-4 py-4">
                        {/* Product image */}
                        <div className="w-28 h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "https://placehold.co/112x112/e5e7eb/9ca3af?text=No+Image";
                            }}
                          />
                        </div>

                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/product-detail?id=${item.id}`}
                            className="text-sm font-medium text-[#0F2027] hover:text-[#10B981] line-clamp-2 leading-snug mb-1 block"
                          >
                            {item.title}
                          </Link>

                          <StarRating rate={item.rating.rate} count={item.rating.count} />

                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs bg-[#3B82F6] text-white font-semibold px-1.5 py-0.5 rounded">
                              Prime
                            </span>
                            <span className="text-xs text-[#10B981] font-medium">FREE delivery</span>
                          </div>

                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.description}</p>

                          {/* Actions */}
                          <div className="flex items-center gap-3 mt-3 flex-wrap">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-[#0F2027] hover:bg-gray-100 transition-colors text-lg font-medium"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="w-10 text-center text-sm font-semibold text-[#0F2027] border-x border-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center text-[#0F2027] hover:bg-gray-100 transition-colors text-lg font-medium"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <span className="text-gray-300">|</span>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center gap-1 text-sm text-[#0891B2] hover:text-[#059669] transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>

                            <span className="text-gray-300">|</span>

                            <button
                              onClick={() => saveForLater(item.id)}
                              className="flex items-center gap-1 text-sm text-[#0891B2] hover:text-[#059669] transition-colors"
                            >
                              <Heart className="w-3.5 h-3.5" />
                              Save for later
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex-shrink-0 text-right">
                          <p className="font-bold text-[#0F2027] text-lg">
                            ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500">
                              ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })} each
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Subtotal row */}
                <div className="px-5 py-4 bg-gray-50 text-right">
                  <p className="text-base text-[#0F2027]">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):{" "}
                    <span className="font-bold text-lg">
                      ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </p>
                </div>
              </div>

              {/* Promo code */}
              <div className="bg-white rounded-xl shadow-sm px-5 py-4 mt-4">
                <h3 className="font-semibold text-[#0F2027] mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#10B981]" />
                  Promo Code
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code (try SAVE10)"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                  />
                  <button
                    onClick={applyPromo}
                    className="bg-[#1A3A4A] hover:bg-[#0F2027] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[#10B981] text-sm mt-2 font-medium">✓ Promo code applied! 10% off.</p>
                )}
                {promoError && (
                  <p className="text-red-500 text-sm mt-2">{promoError}</p>
                )}
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: Shield, label: "Secure Checkout", sub: "256-bit SSL" },
                  { icon: Truck, label: "Free Shipping", sub: "Orders over $35" },
                  { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="bg-white rounded-xl shadow-sm p-3 flex flex-col items-center text-center gap-1">
                    <Icon className="w-5 h-5 text-[#10B981]" />
                    <p className="text-xs font-semibold text-[#0F2027]">{label}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right column: order summary ── */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-5 sticky top-20">
                <h2 className="font-bold text-[#0F2027] text-lg mb-4">Order Summary</h2>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-[#0F2027]">
                      ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between">
                      <span className="text-[#10B981]">Promo discount (10%)</span>
                      <span className="text-[#10B981] font-medium">
                        −${discount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className={shipping === 0 ? "text-[#10B981] font-medium" : "font-medium text-[#0F2027]"}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated tax</span>
                    <span className="font-medium text-[#0F2027]">
                      ${tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-2.5 flex justify-between">
                    <span className="font-bold text-[#0F2027] text-base">Order Total</span>
                    <span className="font-bold text-[#0F2027] text-base">
                      ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {promoApplied && (
                  <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-[#10B981] font-medium">
                      🎉 You&apos;re saving ${discount.toLocaleString("en-US", { minimumFractionDigits: 2 })} on this order!
                    </p>
                  </div>
                )}

                <Link
                  href="/checkout"
                  className="mt-5 w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-sm"
                >
                  Proceed to Checkout
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <p className="text-xs text-gray-400 text-center mt-3">
                  Secure checkout powered by ShopNow
                </p>

                {/* Accepted payments */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center mb-2">We accept</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {["Visa", "MC", "Amex", "PayPal", "Apple Pay"].map((method) => (
                      <span
                        key={method}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved for later */}
        {savedItems.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <h2 className="text-xl font-bold text-[#0F2027] mb-4">
              Saved for Later ({savedItems.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://placehold.co/80x80/e5e7eb/9ca3af?text=No+Image";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F2027] line-clamp-2 mb-1">{item.title}</p>
                      <p className="text-sm font-bold text-[#0F2027]">
                        ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </p>
                      <button
                        onClick={() => moveToCart(item.id)}
                        className="mt-2 text-xs bg-[#10B981] hover:bg-[#059669] text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Continue shopping */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#0891B2] hover:text-[#059669] font-medium text-sm transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
