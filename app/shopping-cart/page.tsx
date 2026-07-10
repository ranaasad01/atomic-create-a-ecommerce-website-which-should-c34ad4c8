"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Trash2, Heart, ShoppingCart, ChevronRight, Shield, Truck, RotateCcw, Tag, Plus, Minus, Package } from 'lucide-react';
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
      <span className="text-xs text-[#007185] hover:text-[#059669] cursor-pointer">
        {count.toLocaleString("en-US")}
      </span>
    </div>
  );
}

export default function ShoppingCartPage() {
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
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
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
      syncCart(items.filter((i) => i.id !== id));
    }
  };

  const moveToCart = (id: number) => {
    const item = savedItems.find((i) => i.id === id);
    if (item) {
      setSavedItems((prev) => prev.filter((i) => i.id !== id));
      syncCart([...items, { ...item, quantity: 1 }]);
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
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 35 ? 0 : 5.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#10B981] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4 py-4 flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-[#0F2027]" />
          <h1 className="text-2xl font-bold text-[#0F2027]">
            Shopping Cart
            {totalItems > 0 && (
              <span className="ml-2 text-base font-normal text-gray-500">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
            )}
          </h1>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {items.length === 0 ? (
          /* Empty cart */
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-sm p-12 text-center"
          >
            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#0F2027] mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven&apos;t added anything yet. Start shopping to fill it up!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              <Package className="w-5 h-5" />
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left column — cart items */}
            <div className="flex-1 min-w-0">
              {/* Free shipping banner */}
              {shipping === 0 ? (
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  <span className="text-sm text-green-800 font-medium">
                    Your order qualifies for <strong>FREE shipping</strong>!
                  </span>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-blue-800">
                    Add{" "}
                    <strong>${(35 - subtotal).toFixed(2)}</strong> more to get{" "}
                    <strong>FREE shipping</strong>!
                  </span>
                </div>
              )}

              {/* Cart items list */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-[#0F2027]">Cart Items</h2>
                </div>

                <AnimatePresence initial={false}>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={slideOutLeft}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`px-6 ${
                        index < items.length - 1 ? "border-b border-gray-100" : ""
                      }`}
                    >
                      <div className="flex gap-4 py-4">
                        {/* Product image */}
                        <div className="flex-shrink-0 w-24 h-24 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "https://via.placeholder.com/96x96?text=Product";
                            }}
                          />
                        </div>

                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/product-detail?id=${item.id}`}
                            className="text-sm font-medium text-[#0F2027] hover:text-[#10B981] line-clamp-2 transition-colors"
                          >
                            {item.title}
                          </Link>

                          <div className="mt-1">
                            <StarRating rate={item.rating.rate} count={item.rating.count} />
                          </div>

                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs bg-[#10B981] text-white px-1.5 py-0.5 rounded font-medium">
                              Prime
                            </span>
                            <span className="text-xs text-green-700 font-medium">In Stock</span>
                          </div>

                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.description}</p>

                          {/* Actions row */}
                          <div className="mt-3 flex flex-wrap items-center gap-3">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-2.5 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 py-1 text-sm font-semibold text-[#0F2027] min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-2.5 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>

                            <button
                              onClick={() => saveForLater(item.id)}
                              className="flex items-center gap-1 text-xs text-[#10B981] hover:text-[#059669] transition-colors"
                            >
                              <Heart className="w-3.5 h-3.5" />
                              Save for later
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex-shrink-0 text-right">
                          <p className="text-lg font-bold text-[#0F2027]">
                            ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500">
                              ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} each
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Promo code */}
              <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
                <h3 className="text-sm font-semibold text-[#0F2027] mb-3 flex items-center gap-2">
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
                    onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                  />
                  <button
                    onClick={applyPromo}
                    className="bg-[#1A3A4A] hover:bg-[#0F2027] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-xs mt-2 font-medium">✓ Promo code applied! 10% off your order.</p>
                )}
                {promoError && (
                  <p className="text-red-500 text-xs mt-2">{promoError}</p>
                )}
              </div>

              {/* Saved for later */}
              {savedItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
                  <h3 className="text-lg font-semibold text-[#0F2027] mb-4">
                    Saved for Later ({savedItems.length})
                  </h3>
                  <div className="space-y-4">
                    {savedItems.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "https://via.placeholder.com/64x64?text=Product";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#0F2027] line-clamp-2">{item.title}</p>
                          <p className="text-sm font-bold text-[#0F2027] mt-1">
                            ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                          <button
                            onClick={() => moveToCart(item.id)}
                            className="mt-2 text-xs text-[#10B981] hover:text-[#059669] font-medium transition-colors"
                          >
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: Shield, label: "Secure Checkout", sub: "256-bit SSL" },
                  { icon: Truck, label: "Free Shipping", sub: "Orders over $35" },
                  { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center gap-1"
                  >
                    <Icon className="w-5 h-5 text-[#10B981]" />
                    <span className="text-xs font-semibold text-[#0F2027]">{label}</span>
                    <span className="text-xs text-gray-500">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — order summary */}
            <div className="lg:w-80 xl:w-96 flex-shrink-0">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow-sm p-6 sticky top-20"
              >
                <h2 className="text-lg font-bold text-[#0F2027] mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span className="font-medium text-[#0F2027]">
                      ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount (10%)</span>
                      <span>-${promoDiscount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium text-[#0F2027]"}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-medium text-[#0F2027]">
                      ${tax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-[#0F2027] text-base">Order Total</span>
                    <span className="font-bold text-[#0F2027] text-base">
                      ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {promoApplied && (
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-green-700 font-medium">
                      🎉 You&apos;re saving ${promoDiscount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} with your promo code!
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

                <Link
                  href="/products"
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#0F2027] font-medium py-2.5 rounded-lg border border-gray-300 transition-colors duration-200 text-sm"
                >
                  Continue Shopping
                </Link>

                {/* Security note */}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <Shield className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
