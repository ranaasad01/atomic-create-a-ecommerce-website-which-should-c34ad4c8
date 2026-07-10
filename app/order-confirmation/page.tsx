"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, MapPin, Clock, Star, ArrowRight, Download, Share2, Home, ShoppingBag } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface OrderDetails {
  orderId: string;
  placedAt: string;
  estimatedDelivery: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    name: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
  deliverySpeed: string;
}

// ─── Mock Order ───────────────────────────────────────────────────────────────

const MOCK_ORDER: OrderDetails = {
  orderId: "SN-2025-847291",
  placedAt: "July 10, 2025 at 2:34 PM",
  estimatedDelivery: "July 15–17, 2025",
  items: [
    {
      id: 1,
      title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
      price: 279.99,
      quantity: 1,
      image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
      category: "Electronics",
    },
    {
      id: 2,
      title: "Anker 65W USB-C Charging Station (4-Port)",
      price: 45.99,
      quantity: 2,
      image: "/images/anker-usb-charging-station.jpg",
      category: "Electronics",
    },
    {
      id: 3,
      title: "Moleskine Classic Hardcover Notebook, Large",
      price: 22.49,
      quantity: 1,
      image: "/images/moleskine-hardcover-notebook.jpg",
      category: "Books",
    },
  ],
  subtotal: 394.46,
  shipping: 0,
  tax: 31.56,
  total: 426.02,
  shippingAddress: {
    name: "Alex Johnson",
    line1: "123 Main Street, Apt 4B",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "United States",
  },
  paymentMethod: "Visa ending in 4242",
  deliverySpeed: "Standard Delivery (5–7 business days)",
};

const RECOMMENDED = [
  {
    id: 10,
    title: "Apple AirPods Pro (2nd Gen)",
    price: 189.99,
    originalPrice: 249.0,
    rating: 4.9,
    reviewCount: 34521,
    image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
  },
  {
    id: 11,
    title: "Kindle Paperwhite 16 GB",
    price: 99.99,
    originalPrice: 139.99,
    rating: 4.8,
    reviewCount: 56789,
    image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 12,
    title: "Ninja AF101 Air Fryer 4 Quart",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviewCount: 41230,
    image: "https://m.media-amazon.com/images/I/71+8uTMDRFL.jpg",
  },
  {
    id: 13,
    title: "Instant Pot Duo 7-in-1, 6 Quart",
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewCount: 89234,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-3 h-3 ${
              s <= Math.round(rating) ? "text-[#10B981] fill-[#10B981]" : "text-gray-300 fill-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">{count.toLocaleString("en-US")}</span>
    </div>
  );
}

// ─── Timeline Step ────────────────────────────────────────────────────────────

function TimelineStep({
  icon: Icon,
  label,
  sublabel,
  active,
  done,
}: {
  icon: React.ElementType;
  label: string;
  sublabel: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          done
            ? "bg-[#10B981] text-white"
            : active
            ? "bg-[#0F2027] text-[#10B981] border-2 border-[#10B981]"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <span
        className={`text-xs font-semibold text-center ${
          done || active ? "text-[#0F2027]" : "text-gray-400"
        }`}
      >
        {label}
      </span>
      <span className="text-[10px] text-gray-400 text-center">{sublabel}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderConfirmationPage() {
  const t = useTranslations();
  const [order] = useState<OrderDetails>(MOCK_ORDER);
  const [confettiDone, setConfettiDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setConfettiDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      {/* ── Hero confirmation banner ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-r from-[#0F2027] via-[#1A3A4A] to-[#0F2027] text-white py-10 px-4"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-4"
          >
            <div className="w-20 h-20 rounded-full bg-[#10B981]/20 border-4 border-[#10B981] flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#10B981]" />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl font-extrabold mb-2"
          >
            Order Confirmed!
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-[#10B981] text-lg font-medium mb-1"
          >
            Thank you for your purchase.
          </motion.p>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-gray-300 text-sm"
          >
            A confirmation email has been sent to your registered address.
          </motion.p>

          {/* Order ID */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-[#10B981]/40 rounded-full px-5 py-2"
          >
            <Package className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-mono font-semibold tracking-wide">
              Order #{order.orderId}
            </span>
          </motion.div>

          <p className="text-gray-400 text-xs mt-2">Placed on {order.placedAt}</p>
        </div>
      </motion.div>

      {/* ── Main content ── */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* ── Delivery timeline ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-bold text-[#0F2027] mb-6">Delivery Status</h2>
          <div className="flex items-start gap-0">
            <TimelineStep
              icon={CheckCircle}
              label="Order Placed"
              sublabel={order.placedAt}
              done
            />
            <div className="flex-1 h-0.5 bg-[#10B981] mt-5" />
            <TimelineStep
              icon={Package}
              label="Processing"
              sublabel="Being prepared"
              active
            />
            <div className="flex-1 h-0.5 bg-gray-200 mt-5" />
            <TimelineStep
              icon={Truck}
              label="Shipped"
              sublabel="On the way"
            />
            <div className="flex-1 h-0.5 bg-gray-200 mt-5" />
            <TimelineStep
              icon={Home}
              label="Delivered"
              sublabel={order.estimatedDelivery}
            />
          </div>

          <div className="mt-5 flex items-center gap-2 bg-[#F0FDF4] border border-[#10B981]/30 rounded-xl px-4 py-3">
            <Clock className="w-4 h-4 text-[#10B981] flex-shrink-0" />
            <p className="text-sm text-[#0F2027]">
              <span className="font-semibold">Estimated Delivery:</span>{" "}
              <span className="text-[#10B981] font-bold">{order.estimatedDelivery}</span>
            </p>
          </div>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Items + Address + Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order items */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-lg font-bold text-[#0F2027] mb-4">
                Items in Your Order ({order.items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://placehold.co/64x64/e2e8f0/94a3b8?text=Item";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F2027] line-clamp-2 leading-snug">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="text-sm font-bold text-[#0F2027]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Shipping address */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#10B981]" />
                <h2 className="text-lg font-bold text-[#0F2027]">Shipping Address</h2>
              </div>
              <div className="text-sm text-gray-600 space-y-0.5">
                <p className="font-semibold text-[#0F2027]">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.line1}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                  Delivery Method
                </p>
                <p className="text-sm text-[#0F2027]">{order.deliverySpeed}</p>
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded bg-[#10B981] flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <h2 className="text-lg font-bold text-[#0F2027]">Payment</h2>
              </div>
              <p className="text-sm text-gray-600">{order.paymentMethod}</p>
              <p className="text-xs text-[#10B981] font-medium mt-1">Payment successful ✓</p>
            </motion.div>
          </div>

          {/* Right: Order summary + actions */}
          <div className="space-y-6">
            {/* Price summary */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-lg font-bold text-[#0F2027] mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-[#10B981] font-medium">
                    {order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between font-bold text-[#0F2027] text-base">
                  <span>Total</span>
                  <span className="text-[#10B981]">{formatPrice(order.total)}</span>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <Link
                href="/orders"
                className="flex items-center justify-center gap-2 w-full bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
              >
                <Package className="w-4 h-4" />
                Track Your Order
              </Link>
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 w-full bg-[#0F2027] hover:bg-[#1A3A4A] text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
              >
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
              </Link>
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 w-full border border-[#10B981] text-[#10B981] hover:bg-[#F0FDF4] font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
              <button
                onClick={() =>
                  navigator.share
                    ? navigator.share({ title: "My Order", text: `Order #${order.orderId}` })
                    : undefined
                }
                className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-3 px-4 rounded-xl transition-colors duration-200"
              >
                <Share2 className="w-4 h-4" />
                Share Order
              </button>
            </motion.div>

            {/* Help card */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-[#F0FDF4] border border-[#10B981]/30 rounded-2xl p-5"
            >
              <p className="text-sm font-semibold text-[#0F2027] mb-1">Need help?</p>
              <p className="text-xs text-gray-500 mb-3">
                Our support team is available 24/7 to assist you.
              </p>
              <Link
                href="/help"
                className="text-sm text-[#10B981] font-semibold hover:underline flex items-center gap-1"
              >
                Visit Help Center <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Recommended products ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-[#0F2027]">You Might Also Like</h2>
            <Link
              href="/products"
              className="text-sm text-[#10B981] font-semibold hover:underline flex items-center gap-1"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
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
              <motion.div key={product.id} variants={scaleIn}>
                <Link
                  href={`/product-detail?id=${product.id}`}
                  className="group block bg-gray-50 rounded-xl border border-gray-100 hover:border-[#10B981]/40 hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="aspect-square bg-white flex items-center justify-center p-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://placehold.co/120x120/e2e8f0/94a3b8?text=Product";
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-[#0F2027] line-clamp-2 leading-snug mb-1">
                      {product.title}
                    </p>
                    <StarRating rating={product.rating} count={product.reviewCount} />
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <span className="text-sm font-bold text-[#0F2027]">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Bottom nav ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 pb-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#10B981] transition-colors"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#10B981] transition-colors"
          >
            <Package className="w-4 h-4" /> My Orders
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#10B981] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" /> Products
          </Link>
          <Link
            href="/help"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#10B981] transition-colors"
          >
            <ArrowRight className="w-4 h-4" /> Help
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
