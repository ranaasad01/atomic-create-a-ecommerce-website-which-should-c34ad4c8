"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, MapPin, Clock, ChevronRight, Download, Star, ArrowRight, ShoppingCart, Shield, RotateCcw } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const ORDER = {
  id: "112-4857293-6748201",
  date: "December 14, 2024",
  estimatedDelivery: "December 17, 2024",
  status: "confirmed",
  subtotal: 187.97,
  shipping: 0,
  tax: 15.04,
  total: 203.01,
  paymentMethod: "Visa ending in 4242",
  shippingAddress: {
    name: "Alex Johnson",
    line1: "1234 Maple Street",
    line2: "Apt 5B",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    country: "United States",
  },
  items: [
    {
      id: 1,
      title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
      price: 89.99,
      quantity: 1,
      image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
      category: "Electronics",
      seller: "Sony Official Store",
      asin: "B09XS7JWHH",
    },
    {
      id: 2,
      title: "Anker 65W USB-C Charging Station, 4-Port Desktop Charger",
      price: 45.99,
      quantity: 2,
      image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
      category: "Electronics",
      seller: "Anker Direct",
      asin: "B08T9YB7NH",
    },
    {
      id: 3,
      title: "Moleskine Classic Notebook, Hard Cover, Large, Ruled",
      price: 15.99,
      quantity: 1,
      image: "/images/moleskine-classic-notebook-ruled.jpg",
      category: "Books & Stationery",
      seller: "ShopNow",
      asin: "B001BKZK9E",
    },
  ],
};

const RECOMMENDED = [
  {
    id: 101,
    title: "Apple AirPods Pro (2nd Generation)",
    price: 199.99,
    rating: 4.8,
    reviews: 42310,
    image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
  },
  {
    id: 102,
    title: "Logitech MX Master 3S Wireless Mouse",
    price: 79.99,
    rating: 4.7,
    reviews: 18540,
    image: "https://resource.logitech.com/c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-top-view-black-new-1.png",
  },
  {
    id: 103,
    title: "Kindle Paperwhite (16 GB) — Waterproof E-Reader",
    price: 139.99,
    rating: 4.6,
    reviews: 95200,
    image: "/images/kindle-paperwhite-e-reader.jpg",
  },
  {
    id: 104,
    title: "Hydro Flask 32 oz Wide Mouth Water Bottle",
    price: 44.95,
    rating: 4.8,
    reviews: 67800,
    image: "/images/hydro-flask-wide-mouth-bottle.jpg",
  },
];

const STEPS = [
  { label: "Order Placed", icon: CheckCircle, done: true },
  { label: "Processing", icon: Package, done: true },
  { label: "Shipped", icon: Truck, done: false },
  { label: "Delivered", icon: MapPin, done: false },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={
            s <= Math.round(rating)
              ? "fill-[#FF9900] text-[#FF9900]"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </span>
  );
}

export default function OrderConfirmationPage() {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = ORDER.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#EAEDED]">
      {/* Hero confirmation banner */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="bg-[#131921] text-white py-10 px-4"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0 w-14 h-14 rounded-full bg-[#067D62] flex items-center justify-center shadow-lg"
          >
            <CheckCircle size={30} className="text-white" />
          </motion.div>
          <div>
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
            >
              Order Confirmed!
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-[#CCCCCC] mt-1 text-sm sm:text-base"
            >
              Thank you, {ORDER.shippingAddress.name}. Your order has been placed successfully.
            </motion.p>
          </div>
          <div className="sm:ml-auto text-right">
            <p className="text-[#AAAAAA] text-xs uppercase tracking-wide">Order ID</p>
            <p className="text-[#FF9900] font-mono font-semibold text-sm mt-0.5">
              {ORDER.id}
            </p>
            <p className="text-[#AAAAAA] text-xs mt-1">{ORDER.date}</p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Delivery progress tracker */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.1)] p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Truck size={18} className="text-[#FF9900]" />
            <h2 className="font-bold text-[#131921] text-base">Delivery Status</h2>
          </div>

          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-[#067D62] z-0 transition-all duration-700"
              style={{ width: "40%" }}
            />

            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="relative z-10 flex flex-col items-center gap-2 flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                      step.done
                        ? "bg-[#067D62] border-[#067D62]"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={step.done ? "text-white" : "text-gray-400"}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium text-center leading-tight ${
                      step.done ? "text-[#067D62]" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-2 bg-[#FFF8EE] border border-[#FF9900]/30 rounded-lg px-4 py-3">
            <Clock size={16} className="text-[#FF9900] flex-shrink-0" />
            <p className="text-sm text-[#131921]">
              Estimated delivery:{" "}
              <span className="font-semibold text-[#067D62]">
                {ORDER.estimatedDelivery}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Two-column layout: items + summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order items */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.1)] p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-[#131921] text-base">
                Order Items ({itemCount})
              </h2>
              <button className="flex items-center gap-1 text-[#007185] hover:text-[#C7511F] text-sm font-medium transition-colors duration-200">
                <Download size={14} />
                Invoice
              </button>
            </div>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="divide-y divide-gray-100"
            >
              {ORDER.items.map((item) => (
                <motion.li
                  key={item.id}
                  variants={fadeInUp}
                  className="py-4 flex gap-4"
                >
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/images/product-placeholder.jpg";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.id}`}
                      className="text-sm font-medium text-[#007185] hover:text-[#C7511F] line-clamp-2 leading-snug transition-colors duration-150"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                      Sold by:{" "}
                      <span className="text-[#007185]">{item.seller}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Category: {item.category}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        Qty: <span className="font-semibold text-[#131921]">{item.quantity}</span>
                      </span>
                      <span className="text-sm font-bold text-[#131921]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Order summary + address */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4"
          >
            {/* Price summary */}
            <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.1)] p-5">
              <h2 className="font-bold text-[#131921] text-base mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({itemCount})</span>
                  <span>${ORDER.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-[#067D62] font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span>${ORDER.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-[#131921] text-base">
                  <span>Order Total</span>
                  <span>${ORDER.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Payment method</p>
                <p className="text-sm font-medium text-[#131921]">
                  {ORDER.paymentMethod}
                </p>
              </div>
            </div>

            {/* Shipping address */}
            <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.1)] p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={15} className="text-[#FF9900]" />
                <h2 className="font-bold text-[#131921] text-sm">
                  Shipping Address
                </h2>
              </div>
              <address className="not-italic text-sm text-gray-600 leading-relaxed space-y-0.5">
                <p className="font-semibold text-[#131921]">
                  {ORDER.shippingAddress.name}
                </p>
                <p>{ORDER.shippingAddress.line1}</p>
                {ORDER.shippingAddress.line2 && (
                  <p>{ORDER.shippingAddress.line2}</p>
                )}
                <p>
                  {ORDER.shippingAddress.city}, {ORDER.shippingAddress.state}{" "}
                  {ORDER.shippingAddress.zip}
                </p>
                <p>{ORDER.shippingAddress.country}</p>
              </address>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.1)] p-5 space-y-3">
              <div className="flex items-start gap-3">
                <Shield size={16} className="text-[#067D62] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#131921]">
                    Secure Transaction
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Your payment info is encrypted and never stored.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw size={16} className="text-[#067D62] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#131921]">
                    Free Returns
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Return eligible items within 30 days for a full refund.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action buttons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#E88B00] text-[#131921] font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-[0_2px_8px_rgba(255,153,0,0.3)] hover:shadow-[0_4px_16px_rgba(255,153,0,0.4)]"
          >
            <Package size={15} />
            Track Your Order
            <ChevronRight size={14} />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#131921] font-semibold text-sm px-5 py-2.5 rounded-full border border-gray-300 transition-all duration-200"
          >
            <ShoppingCart size={15} />
            Continue Shopping
          </Link>
        </motion.div>

        {/* Recommended products */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.1)] p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-[#131921] text-lg">
              Customers Also Bought
            </h2>
            <Link
              href="/products"
              className="flex items-center gap-1 text-[#007185] hover:text-[#C7511F] text-sm font-medium transition-colors duration-200"
            >
              See more
              <ArrowRight size={14} />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {RECOMMENDED.map((product) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100 mb-2">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/images/product-placeholder.jpg";
                      }}
                    />
                  </div>
                  <p className="text-xs text-[#131921] font-medium line-clamp-2 leading-snug group-hover:text-[#C7511F] transition-colors duration-150">
                    {product.title}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-[#007185]">
                      ({(product.reviews ?? 0).toLocaleString("en-US")})
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[#131921] mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-2 w-full text-xs bg-[#FF9900] hover:bg-[#E88B00] text-[#131921] font-semibold py-1.5 rounded-full transition-colors duration-200"
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Help section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-[#131921] rounded-xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h3 className="font-bold text-base">Need help with your order?</h3>
            <p className="text-[#AAAAAA] text-sm mt-1">
              Our support team is available 24/7 to assist you with any questions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/help"
              className="inline-flex items-center gap-1.5 bg-[#37475A] hover:bg-[#485769] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200"
            >
              Help Center
              <ChevronRight size={14} />
            </Link>
            <Link
              href="/returns"
              className="inline-flex items-center gap-1.5 bg-transparent border border-white/20 hover:border-white/40 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200"
            >
              Returns
              <ChevronRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}