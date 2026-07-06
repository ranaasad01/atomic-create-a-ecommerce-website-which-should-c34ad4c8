"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Tag, Shield, Truck, RotateCcw, ChevronRight, Star, Heart } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME, APP_ACCENT, type CartItem } from "@/lib/data";

const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
    price: 189.99,
    description: "Active Noise Cancellation, Transparency Mode, Personalized Spatial Audio",
    category: "electronics",
    image: "/images/airpods-pro-wireless-earbuds.jpg",
    rating: { rate: 4.8, count: 12453 },
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
    description: "Slow cooker, rice cooker, steamer, sauté, yogurt maker, warmer & sterilizer",
    category: "home",
    image: "/images/instant-pot-pressure-cooker.jpg",
    rating: { rate: 4.6, count: 34201 },
    quantity: 1,
  },
  {
    id: 4,
    title: "Nike Men's Air Max 270 Running Shoes",
    price: 129.99,
    description: "Lightweight mesh upper, Max Air unit in heel for all-day comfort",
    category: "clothing",
    image: "/images/nike-air-max-running-shoes.jpg",
    rating: { rate: 4.5, count: 5678 },
    quantity: 1,
  },
];

const RECOMMENDED: Array<{ id: number; title: string; price: number; image: string; rating: number; reviews: number }> = [
  { id: 101, title: "Sony WH-1000XM5 Wireless Headphones", price: 279.99, image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg", rating: 4.9, reviews: 9823 },
  { id: 102, title: "Anker 65W USB-C Charging Station", price: 35.99, image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg", rating: 4.7, reviews: 4512 },
  { id: 103, title: "Hydro Flask 32 oz Water Bottle", price: 44.95, image: "/images/hydro-flask-water-bottle.jpg", rating: 4.8, reviews: 7234 },
  { id: 104, title: "Moleskine Classic Notebook, Large, Ruled", price: 22.99, image: "/images/moleskine-classic-notebook.jpg", rating: 4.6, reviews: 3109 },
];

function StarRating({ rate, count }: { rate: number; count: number }) {
  const full = Math.floor(rate);
  const half = rate - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < full
                ? "fill-[#FF9900] text-[#FF9900]"
                : i === full && half
                ? "fill-[#FF9900]/50 text-[#FF9900]"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      <span className="text-xs text-[#007185] hover:text-[#C7511F] cursor-pointer">
        {(count ?? 0).toLocaleString("en-US")}
      </span>
    </div>
  );
}

export default function ShoppingCartPage() {
  const t = useTranslations();
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<number[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("shopnow-cart");
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        setItems(parsed.length > 0 ? parsed : MOCK_CART_ITEMS);
      } else {
        setItems(MOCK_CART_ITEMS);
      }
    } catch {
      setItems(MOCK_CART_ITEMS);
    }
  }, []);

  const persistCart = (updated: CartItem[]) => {
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
        item.id === id ? { ...item, quantity: Math.max(0, (item.quantity ?? 1) + delta) } : item
      )
      .filter((item) => (item.quantity ?? 0) > 0);
    persistCart(updated);
  };

  const removeItem = (id: number) => {
    persistCart(items.filter((item) => item.id !== id));
  };

  const saveForLater = (id: number) => {
    setSavedItems((prev) => [...prev, id]);
    removeItem(id);
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

  const subtotal = (items ?? []).reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 35 ? 0 : 5.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;
  const itemCount = (items ?? []).reduce((sum, item) => sum + (item.quantity ?? 1), 0);

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
        {/* Page heading */}
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-2xl sm:text-3xl font-normal text-[#0F1111] mb-1"
        >
          Shopping Cart
        </motion.h1>

        {items.length === 0 ? (
          /* Empty cart state */
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.1)] p-10 text-center mt-4"
          >
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-[#0F1111] mb-2">Your cart is empty</h2>
            <p className="text-[#565959] mb-6 max-w-sm mx-auto">
              Looks like you haven't added anything yet. Browse our catalog and find something you'll love.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#e68a00] text-[#0F1111] font-semibold px-6 py-2.5 rounded-full transition-colors duration-200"
            >
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 mt-2">
            {/* Left column — cart items */}
            <div className="flex-1 min-w-0">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.1)] p-4 sm:p-6"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                  <span className="text-sm text-[#565959]">
                    Price
                  </span>
                </div>

                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-gray-100"
                >
                  <AnimatePresence mode="popLayout">
                    {(items ?? []).map((item) => (
                      <motion.li
                        key={item.id}
                        variants={fadeInUp}
                        exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
                        layout
                        className="py-5 first:pt-0"
                      >
                        <div className="flex gap-4">
                          {/* Product image */}
                          <Link href={`/products/${item.id}`} className="flex-shrink-0">
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-md overflow-hidden bg-gray-50 border border-gray-100">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </Link>

                          {/* Product details */}
                          <div className="flex-1 min-w-0 flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/products/${item.id}`}
                                className="text-sm sm:text-base font-medium text-[#0F1111] hover:text-[#C7511F] line-clamp-2 leading-snug transition-colors duration-150"
                              >
                                {item.title}
                              </Link>
                              <p className="text-xs text-[#007600] font-medium mt-1">In Stock</p>
                              <StarRating rate={item.rating?.rate ?? 0} count={item.rating?.count ?? 0} />
                              <p className="text-xs text-[#565959] mt-1 capitalize">{item.category}</p>

                              {/* Eligible for free shipping badge */}
                              {subtotal > 35 && (
                                <span className="inline-flex items-center gap-1 text-xs text-[#007600] mt-1">
                                  <Truck size={11} /> Eligible for FREE Shipping
                                </span>
                              )}

                              {/* Actions */}
                              <div className="flex flex-wrap items-center gap-3 mt-3">
                                {/* Quantity selector */}
                                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-[#F0F2F2]">
                                  <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors duration-150 text-[#0F1111]"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus size={13} />
                                  </button>
                                  <span className="w-8 text-center text-sm font-semibold text-[#0F1111]">
                                    {item.quantity ?? 1}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors duration-150 text-[#0F1111]"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus size={13} />
                                  </button>
                                </div>

                                <span className="text-gray-300 text-sm">|</span>

                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="flex items-center gap-1 text-xs text-[#007185] hover:text-[#C7511F] hover:underline transition-colors duration-150"
                                >
                                  <Trash2 size={12} /> Delete
                                </button>

                                <span className="text-gray-300 text-sm">|</span>

                                <button
                                  onClick={() => saveForLater(item.id)}
                                  className="flex items-center gap-1 text-xs text-[#007185] hover:text-[#C7511F] hover:underline transition-colors duration-150"
                                >
                                  <Heart size={12} /> Save for later
                                </button>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="sm:text-right flex-shrink-0">
                              <p className="text-lg font-bold text-[#0F1111]">
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
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>

                <div className="pt-4 border-t border-gray-200 text-right">
                  <p className="text-base sm:text-lg font-normal text-[#0F1111]">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):{" "}
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </p>
                </div>
              </motion.div>

              {/* Saved for later */}
              {savedItems.length > 0 && (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.1)] p-4 sm:p-6 mt-4"
                >
                  <h2 className="text-lg font-medium text-[#0F1111] mb-3">
                    Saved for later ({savedItems.length} {savedItems.length === 1 ? "item" : "items"})
                  </h2>
                  <p className="text-sm text-[#565959]">
                    Items you've saved will appear here. Move them back to your cart when you're ready to purchase.
                  </p>
                </motion.div>
              )}

              {/* Promo code */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.1)] p-4 sm:p-6 mt-4"
              >
                <h2 className="text-base font-medium text-[#0F1111] mb-3 flex items-center gap-2">
                  <Tag size={16} className="text-[#FF9900]" /> Promo Code
                </h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (try SAVE10)"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900] transition-colors duration-150"
                  />
                  <button
                    onClick={applyPromo}
                    className="bg-[#FF9900] hover:bg-[#e68a00] text-[#0F1111] font-semibold text-sm px-4 py-2 rounded transition-colors duration-200"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-[#007600] mt-2 font-medium">
                    Promo code applied! You save 10%.
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-red-600 mt-2">{promoError}</p>
                )}
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4"
              >
                {[
                  { icon: <Shield size={20} className="text-[#FF9900]" />, title: "Secure Checkout", desc: "256-bit SSL encryption on every order" },
                  { icon: <Truck size={20} className="text-[#FF9900]" />, title: "Free Shipping", desc: "On orders over $35 — delivered in 2 days" },
                  { icon: <RotateCcw size={20} className="text-[#FF9900]" />, title: "Easy Returns", desc: "30-day hassle-free return policy" },
                ].map((badge) => (
                  <motion.div
                    key={badge.title}
                    variants={fadeInUp}
                    className="bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.1)] p-4 flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 mt-0.5">{badge.icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F1111]">{badge.title}</p>
                      <p className="text-xs text-[#565959] mt-0.5">{badge.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right column — order summary */}
            <div className="lg:w-80 xl:w-96 flex-shrink-0">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.1)] p-5 sticky top-20"
              >
                {/* Free shipping notice */}
                {shipping === 0 ? (
                  <div className="bg-[#F0FFF4] border border-[#007600]/20 rounded-md px-3 py-2 mb-4 flex items-center gap-2">
                    <Truck size={14} className="text-[#007600] flex-shrink-0" />
                    <p className="text-xs text-[#007600] font-medium">
                      Your order qualifies for FREE shipping!
                    </p>
                  </div>
                ) : (
                  <div className="bg-[#FFF8F0] border border-[#FF9900]/30 rounded-md px-3 py-2 mb-4">
                    <p className="text-xs text-[#565959]">
                      Add <span className="font-bold text-[#C7511F]">${(35 - subtotal).toFixed(2)}</span> more to get FREE shipping.
                    </p>
                    <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF9900] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((subtotal / 35) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <h2 className="text-lg font-medium text-[#0F1111] mb-4">
                  Order Summary
                </h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#0F1111]">
                    <span>Items ({itemCount}):</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-[#007600]">
                      <span>Promo discount (10%):</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#0F1111]">
                    <span>Shipping:</span>
                    <span className={shipping === 0 ? "text-[#007600] font-medium" : ""}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#0F1111]">
                    <span>Estimated tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-base text-[#0F1111]">
                    <span>Order total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-5 bg-[#FF9900] hover:bg-[#e68a00] text-[#0F1111] font-semibold py-3 rounded-full text-sm transition-colors duration-200 shadow-[0_2px_8px_rgba(255,153,0,0.35)]"
                >
                  Proceed to Checkout
                </motion.button>

                <p className="text-center text-xs text-[#565959] mt-3">
                  or{" "}
                  <Link href="/products" className="text-[#007185] hover:text-[#C7511F] hover:underline">
                    Continue shopping
                  </Link>
                </p>

                {/* Payment icons */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-[#565959] text-center mb-2">We accept</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {["Visa", "MC", "Amex", "PayPal", "Apple Pay"].map((method) => (
                      <span
                        key={method}
                        className="text-xs bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-[#565959] font-medium"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Recommended products */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8"
        >
          <h2 className="text-xl font-medium text-[#0F1111] mb-4">
            Customers who bought items in your cart also bought
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {(RECOMMENDED ?? []).map((product) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.1)] p-3 flex flex-col group cursor-pointer"
              >
                <div className="aspect-square rounded-md overflow-hidden bg-gray-50 mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs font-medium text-[#0F1111] line-clamp-2 leading-snug mb-1 flex-1">
                  {product.title}
                </p>
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={
                        i < Math.floor(product.rating ?? 0)
                          ? "fill-[#FF9900] text-[#FF9900]"
                          : "fill-gray-200 text-gray-200"
                      }
                    />
                  ))}
                  <span className="text-xs text-[#007185]">{(product.reviews ?? 0).toLocaleString("en-US")}</span>
                </div>
                <p className="text-sm font-bold text-[#0F1111] mb-2">
                  ${(product.price ?? 0).toFixed(2)}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-[#0F1111] text-xs font-semibold py-1.5 rounded-full transition-colors duration-200"
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}