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
              <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" fill="#FF9900" />
            ) : i === full && half ? (
              <>
                <defs>
                  <linearGradient id={`half-${i}`}>
                    <stop offset="50%" stopColor="#FF9900" />
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
      <span className="text-xs text-[#007185] hover:text-[#C7511F] cursor-pointer">
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
    } catch {}
  };

  const updateQuantity = (id: number, delta: number) => {
    const updated = items
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, (item.quantity ?? 1) + delta) } : item
      )
      .filter((item) => (item.quantity ?? 1) >= 1);
    syncCart(updated);
  };

  const setQuantity = (id: number, val: number) => {
    if (isNaN(val) || val < 1) return;
    const updated = items.map((item) =>
      item.id === id ? { ...item, quantity: val } : item
    );
    syncCart(updated);
  };

  const removeItem = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    syncCart(updated);
  };

  const saveForLater = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setSavedItems((prev) => [...prev, { ...item, quantity: 1 }]);
      removeItem(id);
    }
  };

  const moveToCart = (id: number) => {
    const item = savedItems.find((i) => i.id === id);
    if (item) {
      const updated = [...items, { ...item, quantity: 1 }];
      syncCart(updated);
      setSavedItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const removeSaved = (id: number) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
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

  const subtotal = items.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1), 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const estimatedTax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + estimatedTax;
  const itemCount = items.reduce((sum, item) => sum + (item.quantity ?? 1), 0);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#EAEDED] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF9900] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <div className="max-w-[1500px] mx-auto px-3 sm:px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0">
            {/* Cart Header */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08)] px-6 py-5 mb-4"
            >
              <div className="flex items-end justify-between flex-wrap gap-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-normal text-[#0F1111] tracking-tight">
                    Shopping Cart
                  </h1>
                  {items.length > 0 && (
                    <p className="text-sm text-[#565959] mt-0.5">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </p>
                  )}
                </div>
                <span className="text-sm text-[#565959] hidden sm:block">Price</span>
              </div>
            </motion.div>

            {/* Empty State */}
            {items.length === 0 && (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08)] px-6 py-16 text-center"
              >
                <ShoppingCart className="w-16 h-16 text-[#D1D5DB] mx-auto mb-4" />
                <h2 className="text-xl font-medium text-[#0F1111] mb-2">Your cart is empty</h2>
                <p className="text-[#565959] mb-6 text-sm">
                  Looks like you have not added anything to your cart yet.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#e88a00] text-[#0F1111] font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-200 shadow-sm"
                >
                  Continue Shopping
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}

            {/* Cart Items */}
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={slideOutLeft}
                  initial="visible"
                  animate="visible"
                  exit="exit"
                  layout
                  className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08)] px-4 sm:px-6 mb-3 overflow-hidden"
                >
                  <div className="py-4 flex gap-4">
                    {/* Image */}
                    <Link href={`/products/${item.id}`} className="flex-shrink-0">
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg overflow-hidden bg-[#F7F8F8] border border-black/5 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/product-placeholder.jpg";
                          }}
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row gap-2">
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.id}`}>
                          <h3 className="text-sm sm:text-base font-medium text-[#0F1111] hover:text-[#C7511F] line-clamp-2 leading-snug mb-1 transition-colors duration-150">
                            {item.title}
                          </h3>
                        </Link>

                        <div className="mb-1.5">
                          <StarRating rate={item.rating?.rate ?? 0} count={item.rating?.count ?? 0} />
                        </div>

                        <p className="text-xs text-[#007600] font-medium mb-1">In Stock</p>
                        <p className="text-xs text-[#565959] mb-2 line-clamp-1">{item.description}</p>

                        {/* Quantity + Actions */}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-[#D5D9D9] rounded-full overflow-hidden bg-[#F0F2F2] shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-[#0F1111] hover:bg-[#E3E6E6] transition-colors duration-150 text-lg font-light"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min={1}
                              max={99}
                              value={item.quantity ?? 1}
                              onChange={(e) => setQuantity(item.id, parseInt(e.target.value, 10))}
                              className="w-10 text-center text-sm font-semibold bg-white border-x border-[#D5D9D9] h-8 focus:outline-none text-[#0F1111]"
                              aria-label="Quantity"
                            />
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#0F1111] hover:bg-[#E3E6E6] transition-colors duration-150 text-lg font-light"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-[#D5D9D9] text-sm select-none">|</span>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-xs text-[#007185] hover:text-[#C7511F] hover:underline transition-colors duration-150"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>

                          <span className="text-[#D5D9D9] text-sm select-none">|</span>

                          <button
                            onClick={() => saveForLater(item.id)}
                            className="flex items-center gap-1 text-xs text-[#007185] hover:text-[#C7511F] hover:underline transition-colors duration-150"
                          >
                            <Heart className="w-3.5 h-3.5" />
                            Save for later
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="sm:text-right flex-shrink-0">
                        <p className="text-base sm:text-lg font-bold text-[#0F1111]">
                          ${((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                        </p>
                        {(item.quantity ?? 1) > 1 && (
                          <p className="text-xs text-[#565959]">
                            ${(item.price ?? 0).toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Subtotal below items */}
            {items.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08)] px-6 py-4 mb-4 text-right"
              >
                <p className="text-base sm:text-lg text-[#0F1111]">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):{" "}
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </p>
              </motion.div>
            )}

            {/* Saved for Later */}
            {savedItems.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="mt-6"
              >
                <h2 className="text-xl font-normal text-[#0F1111] mb-3 px-1">
                  Saved for later ({savedItems.length})
                </h2>
                <AnimatePresence>
                  {savedItems.map((item) => (
                    <motion.div
                      key={`saved-${item.id}`}
                      variants={slideOutLeft}
                      initial="visible"
                      animate="visible"
                      exit="exit"
                      layout
                      className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08)] px-4 sm:px-6 mb-3 overflow-hidden"
                    >
                      <div className="py-4 flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-[#F7F8F8] border border-black/5 flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/product-placeholder.jpg";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-[#0F1111] line-clamp-2 mb-1">{item.title}</h3>
                          <p className="text-base font-bold text-[#0F1111] mb-2">${(item.price ?? 0).toFixed(2)}</p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => moveToCart(item.id)}
                              className="text-xs bg-[#FF9900] hover:bg-[#e88a00] text-[#0F1111] font-semibold px-3 py-1.5 rounded-full transition-colors duration-200"
                            >
                              Move to cart
                            </button>
                            <button
                              onClick={() => removeSaved(item.id)}
                              className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline transition-colors duration-150"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Trust Badges */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6"
            >
              {[
                { icon: Shield, title: "Secure Checkout", desc: "256-bit SSL encryption on every order" },
                { icon: Truck, title: "Free Delivery", desc: "On orders over $35 with Prime" },
                { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free return policy" },
              ].map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={fadeInUp}
                  className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-4 flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-[#FFF3CD] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-[#FF9900]" style={{ width: 18, height: 18 }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F1111]">{title}</p>
                    <p className="text-xs text-[#565959] mt-0.5">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Order Summary */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-80 xl:w-96 flex-shrink-0"
          >
            <div className="sticky top-20">
              <div className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-5">
                {/* Free delivery badge */}
                {items.length > 0 && (
                  <div className="flex items-start gap-2 mb-4 p-3 bg-[#F0FFF4] border border-[#C6F6D5] rounded-lg">
                    <Truck className="w-4 h-4 text-[#007600] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-[#007600] font-medium leading-snug">
                      Your order qualifies for FREE delivery. Choose this option at checkout.
                    </p>
                  </div>
                )}

                <h2 className="text-lg font-medium text-[#0F1111] mb-4">
                  Order Summary
                </h2>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-[#0F1111]">
                    <span>Items ({itemCount}):</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#0F1111]">
                    <span>Shipping &amp; handling:</span>
                    <span className="text-[#007600] font-medium">FREE</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-[#007600]">
                      <span>Promo (SAVE10):</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#0F1111]">
                    <span>Estimated tax (8%):</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-[#DDD] pt-3 mb-4">
                  <div className="flex justify-between text-lg font-bold text-[#B12704]">
                    <span>Order total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#565959]" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="w-full pl-8 pr-3 py-2 text-sm border border-[#D5D9D9] rounded-lg focus:outline-none focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900] transition-all duration-200 text-[#0F1111] placeholder:text-[#999]"
                      />
                    </div>
                    <button
                      onClick={applyPromo}
                      className="px-3 py-2 text-sm bg-[#F0F2F2] hover:bg-[#E3E6E6] border border-[#D5D9D9] rounded-lg font-medium text-[#0F1111] transition-colors duration-200 whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-xs text-[#B12704] mt-1">{promoError}</p>
                  )}
                  {promoApplied && (
                    <p className="text-xs text-[#007600] mt-1 font-medium">Promo code applied! 10% off.</p>
                  )}
                </div>

                {/* CTA */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={items.length > 0 ? "/checkout" : "#"}
                    className={`block w-full text-center py-3 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm ${
                      items.length > 0
                        ? "bg-[#FF9900] hover:bg-[#e88a00] text-[#0F1111] cursor-pointer"
                        : "bg-[#F0F2F2] text-[#999] cursor-not-allowed pointer-events-none"
                    }`}
                  >
                    Proceed to Checkout
                  </Link>
                </motion.div>

                {items.length > 0 && (
                  <p className="text-xs text-[#565959] text-center mt-2">
                    By placing your order, you agree to our{" "}
                    <Link href="/conditions" className="text-[#007185] hover:underline">
                      conditions of use
                    </Link>
                    .
                  </p>
                )}

                {/* Payment icons */}
                <div className="mt-4 pt-4 border-t border-[#EEE]">
                  <p className="text-xs text-[#565959] text-center mb-2">Secure payment methods</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {["Visa", "MC", "Amex", "PayPal", "Apple Pay"].map((method) => (
                      <span
                        key={method}
                        className="text-[10px] font-semibold text-[#565959] bg-[#F7F8F8] border border-[#D5D9D9] rounded px-1.5 py-0.5"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-3 text-center">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 text-sm text-[#007185] hover:text-[#C7511F] hover:underline transition-colors duration-150"
                >
                  <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                  Continue shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}