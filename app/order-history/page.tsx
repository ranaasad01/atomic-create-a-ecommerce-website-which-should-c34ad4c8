"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Package, ChevronDown, ChevronRight, Search, Filter, Star, Truck, CheckCircle, Clock, XCircle, RefreshCw, Download, Eye, ShoppingBag, ArrowRight, MapPin, Calendar, CreditCard } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_ACCENT } from "@/lib/data";

// ─── Types ───────────────────────────────────────────────────────────────────

interface OrderProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
  rating: number;
  reviewed: boolean;
}

interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled" | "returned";
  total: number;
  items: OrderProduct[];
  address: string;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
  deliveredDate: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_ORDERS: Order[] = [
  {
    id: "112-4857293-1029384",
    date: "2024-12-10",
    status: "delivered",
    total: 189.97,
    address: "123 Maple Street, Seattle, WA 98101",
    paymentMethod: "Visa ending in 4242",
    trackingNumber: "1Z999AA10123456784",
    estimatedDelivery: "2024-12-14",
    deliveredDate: "2024-12-13",
    items: [
      {
        id: 1,
        name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
        price: 129.99,
        quantity: 1,
        category: "Electronics",
        rating: 5,
        reviewed: true,
      },
      {
        id: 2,
        name: "Anker 65W USB-C Charger, 3-Port Fast Charging",
        image: "/images/anker-usb-c-charger.jpg",
        price: 35.99,
        quantity: 1,
        category: "Electronics",
        rating: 4,
        reviewed: false,
      },
      {
        id: 3,
        name: "USB-C to USB-C Cable 6ft, 2-Pack",
        image: "/images/usb-c-cable-pack.jpg",
        price: 23.99,
        quantity: 1,
        category: "Electronics",
        rating: 0,
        reviewed: false,
      },
    ],
  },
  {
    id: "114-2938471-5647382",
    date: "2024-11-28",
    status: "delivered",
    total: 74.98,
    address: "123 Maple Street, Seattle, WA 98101",
    paymentMethod: "Mastercard ending in 8765",
    trackingNumber: "1Z999AA10123456785",
    estimatedDelivery: "2024-12-02",
    deliveredDate: "2024-12-01",
    items: [
      {
        id: 4,
        name: "Levi's Men's 511 Slim Fit Jeans",
        image: "https://static.wikia.nocookie.net/shingekinokyojin/images/b/b1/Levi_Ackermann_%28Anime%29_character_image.png/revision/latest?cb=20231105181307",
        price: 49.99,
        quantity: 1,
        category: "Clothing",
        rating: 4,
        reviewed: true,
      },
      {
        id: 5,
        name: "Hanes Men's EcoSmart Hoodie Sweatshirt",
        image: "/images/hanes-ecosmart-hoodie.jpg",
        price: 24.99,
        quantity: 1,
        category: "Clothing",
        rating: 5,
        reviewed: false,
      },
    ],
  },
  {
    id: "113-7463829-2938471",
    date: "2024-12-18",
    status: "shipped",
    total: 249.95,
    address: "123 Maple Street, Seattle, WA 98101",
    paymentMethod: "Visa ending in 4242",
    trackingNumber: "1Z999AA10123456786",
    estimatedDelivery: "2024-12-22",
    deliveredDate: "",
    items: [
      {
        id: 6,
        name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Qt",
        image: "/images/instant-pot-pressure-cooker.jpg",
        price: 89.95,
        quantity: 1,
        category: "Home & Kitchen",
        rating: 0,
        reviewed: false,
      },
      {
        id: 7,
        name: "Ninja BL610 Professional 72 Oz Countertop Blender",
        image: "/images/ninja-countertop-blender.jpg",
        price: 99.99,
        quantity: 1,
        category: "Home & Kitchen",
        rating: 0,
        reviewed: false,
      },
      {
        id: 8,
        name: "OXO Good Grips 3-Piece Mixing Bowl Set",
        image: "/images/oxo-mixing-bowl-set.jpg",
        price: 60.01,
        quantity: 1,
        category: "Home & Kitchen",
        rating: 0,
        reviewed: false,
      },
    ],
  },
  {
    id: "111-9283746-3847291",
    date: "2024-12-20",
    status: "processing",
    total: 59.99,
    address: "123 Maple Street, Seattle, WA 98101",
    paymentMethod: "ShopNow Gift Card",
    trackingNumber: "",
    estimatedDelivery: "2024-12-26",
    deliveredDate: "",
    items: [
      {
        id: 9,
        name: "The Pragmatic Programmer: 20th Anniversary Edition",
        image: "/images/pragmatic-programmer-book.jpg",
        price: 39.99,
        quantity: 1,
        category: "Books",
        rating: 0,
        reviewed: false,
      },
      {
        id: 10,
        name: "Clean Code: A Handbook of Agile Software Craftsmanship",
        image: "/images/clean-code-book.jpg",
        price: 19.99,
        quantity: 1,
        category: "Books",
        rating: 0,
        reviewed: false,
      },
    ],
  },
  {
    id: "112-1827364-9283746",
    date: "2024-11-05",
    status: "cancelled",
    total: 399.0,
    address: "123 Maple Street, Seattle, WA 98101",
    paymentMethod: "Visa ending in 4242",
    trackingNumber: "",
    estimatedDelivery: "",
    deliveredDate: "",
    items: [
      {
        id: 11,
        name: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
        image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
        price: 249.0,
        quantity: 1,
        category: "Electronics",
        rating: 0,
        reviewed: false,
      },
      {
        id: 12,
        name: "Apple MagSafe Charger 15W Fast Charging",
        image: "/images/apple-magsafe-charger.jpg",
        price: 39.0,
        quantity: 1,
        category: "Electronics",
        rating: 0,
        reviewed: false,
      },
      {
        id: 13,
        name: "Apple USB-C to MagSafe 3 Cable (2m)",
        image: "/images/apple-usbc-magsafe-cable.jpg",
        price: 49.0,
        quantity: 1,
        category: "Electronics",
        rating: 0,
        reviewed: false,
      },
      {
        id: 14,
        name: "Apple Silicone Case with MagSafe for iPhone 15",
        image: "/images/apple-silicone-case-iphone.jpg",
        price: 49.0,
        quantity: 1,
        category: "Electronics",
        rating: 0,
        reviewed: false,
      },
      {
        id: 15,
        name: "Apple 20W USB-C Power Adapter",
        image: "/images/apple-20w-usbc-adapter.jpg",
        price: 13.0,
        quantity: 1,
        category: "Electronics",
        rating: 0,
        reviewed: false,
      },
    ],
  },
  {
    id: "113-5647382-1928374",
    date: "2024-10-22",
    status: "returned",
    total: 89.99,
    address: "123 Maple Street, Seattle, WA 98101",
    paymentMethod: "Mastercard ending in 8765",
    trackingNumber: "1Z999AA10123456787",
    estimatedDelivery: "2024-10-26",
    deliveredDate: "2024-10-25",
    items: [
      {
        id: 16,
        name: "Fitbit Charge 6 Fitness Tracker with GPS",
        image: "/images/fitbit-charge-6-tracker.jpg",
        price: 89.99,
        quantity: 1,
        category: "Electronics",
        rating: 2,
        reviewed: true,
      },
    ],
  },
];

const STATUS_CONFIG = {
  delivered: {
    label: "Delivered",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-600",
  },
  shipped: {
    label: "Shipped",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: Truck,
    iconColor: "text-blue-600",
  },
  processing: {
    label: "Processing",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: Clock,
    iconColor: "text-amber-600",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: XCircle,
    iconColor: "text-red-600",
  },
  returned: {
    label: "Returned",
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: RefreshCw,
    iconColor: "text-purple-600",
  },
};

const FILTER_OPTIONS = ["All Orders", "Delivered", "Shipped", "Processing", "Cancelled", "Returned"];

// ─── Star Rating Component ────────────────────────────────────────────────────

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? "text-[#FF9900] fill-[#FF9900]" : "text-gray-300 fill-gray-300"}
        />
      ))}
    </div>
  );
}

// ─── Order Card Component ─────────────────────────────────────────────────────

function OrderCard({ order, index }: { order: Order; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_CONFIG[order.status];
  const StatusIcon = statusCfg.icon;

  const formattedDate = (() => {
    try {
      return new Date(order.date + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return order.date;
    }
  })();

  const formattedDelivered = (() => {
    if (!order.deliveredDate) return "";
    try {
      return new Date(order.deliveredDate + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return order.deliveredDate;
    }
  })();

  const formattedEstimated = (() => {
    if (!order.estimatedDelivery) return "";
    try {
      return new Date(order.estimatedDelivery + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return order.estimatedDelivery;
    }
  })();

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      {/* Order Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide font-medium">Order Placed</p>
              <p className="text-gray-800 font-semibold mt-0.5">{formattedDate}</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide font-medium">Total</p>
              <p className="text-gray-800 font-semibold mt-0.5">${(order.total ?? 0).toFixed(2)}</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide font-medium">Ship To</p>
              <p className="text-gray-800 font-semibold mt-0.5 flex items-center gap-1">
                <MapPin size={12} className="text-gray-400" />
                {(order.address ?? "").split(",")[0] ?? ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs hidden md:block">
              Order # {order.id}
            </span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-sm text-[#007185] hover:text-[#C7511F] font-medium transition-colors duration-200"
            >
              {expanded ? "Hide details" : "View details"}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown size={16} />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className={`px-5 py-2.5 flex items-center gap-2 ${statusCfg.bg} border-b ${statusCfg.border}`}>
        <StatusIcon size={16} className={statusCfg.iconColor} />
        <span className={`text-sm font-semibold ${statusCfg.color}`}>
          {statusCfg.label}
          {order.status === "delivered" && formattedDelivered
            ? ` — Arrived ${formattedDelivered}`
            : ""}
          {order.status === "shipped" && formattedEstimated
            ? ` — Expected ${formattedEstimated}`
            : ""}
          {order.status === "processing" && formattedEstimated
            ? ` — Expected ${formattedEstimated}`
            : ""}
        </span>
        {order.trackingNumber ? (
          <span className="ml-auto text-xs text-gray-500 hidden sm:block">
            Tracking: {order.trackingNumber}
          </span>
        ) : null}
      </div>

      {/* Items Preview */}
      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-3 items-start">
          {(order.items ?? []).slice(0, expanded ? order.items.length : 3).map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='%23d1d5db'%3E📦%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              {(item.quantity ?? 1) > 1 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF9900] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {item.quantity}
                </span>
              )}
            </motion.div>
          ))}
          {!expanded && (order.items ?? []).length > 3 && (
            <div className="w-16 h-16 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-medium">
              +{order.items.length - 3}
            </div>
          )}
          <div className="flex-1 min-w-[160px]">
            <p className="text-sm font-semibold text-gray-800 line-clamp-2">
              {(order.items ?? [])[0]?.name ?? ""}
            </p>
            {(order.items ?? []).length > 1 && !expanded && (
              <p className="text-xs text-gray-500 mt-0.5">
                + {order.items.length - 1} more item{order.items.length - 1 > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-5 py-4 space-y-4">
              {/* All Items */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3">Items in this order</h4>
                <div className="space-y-3">
                  {(order.items ?? []).map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <div className="w-14 h-14 rounded-md border border-gray-200 overflow-hidden bg-white flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%23d1d5db'%3E📦%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 leading-snug">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                        <div className="flex items-center justify-between mt-1.5 flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-900">
                              ${(item.price ?? 0).toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-500">Qty: {item.quantity ?? 1}</span>
                          </div>
                          {item.reviewed ? (
                            <div className="flex items-center gap-1">
                              <StarRating rating={item.rating} size={12} />
                              <span className="text-xs text-gray-500">Reviewed</span>
                            </div>
                          ) : order.status === "delivered" ? (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="text-xs text-[#007185] hover:text-[#C7511F] font-medium transition-colors duration-200 flex items-center gap-1"
                            >
                              <Star size={11} />
                              Write a review
                            </motion.button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Shipping Address</span>
                  </div>
                  <p className="text-sm text-gray-700">{order.address}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CreditCard size={14} className="text-gray-400" />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Payment</span>
                  </div>
                  <p className="text-sm text-gray-700">{order.paymentMethod}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    Total: ${(order.total ?? 0).toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Order Info</span>
                  </div>
                  <p className="text-xs text-gray-500">Order #</p>
                  <p className="text-xs font-mono text-gray-700 break-all">{order.id}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {order.status === "delivered" && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#FF9900] hover:bg-[#e68a00] text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-sm"
                    >
                      <RefreshCw size={14} />
                      Buy Again
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors duration-200"
                    >
                      <Download size={14} />
                      Invoice
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors duration-200"
                    >
                      <RefreshCw size={14} />
                      Return Items
                    </motion.button>
                  </>
                )}
                {order.status === "shipped" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#007185] hover:bg-[#005f6e] text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-sm"
                  >
                    <Truck size={14} />
                    Track Package
                  </motion.button>
                )}
                {order.status === "processing" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-200 transition-colors duration-200"
                  >
                    <XCircle size={14} />
                    Cancel Order
                  </motion.button>
                )}
                {order.status === "cancelled" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#FF9900] hover:bg-[#e68a00] text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-sm"
                  >
                    <ShoppingBag size={14} />
                    Reorder Items
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors duration-200"
                >
                  <Eye size={14} />
                  View Full Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Summary Stats ────────────────────────────────────────────────────────────

function SummaryStats({ orders }: { orders: Order[] }) {
  const totalSpent = (orders ?? [])
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.total ?? 0), 0);

  const delivered = (orders ?? []).filter((o) => o.status === "delivered").length;
  const inProgress = (orders ?? []).filter(
    (o) => o.status === "shipped" || o.status === "processing"
  ).length;
  const totalItems = (orders ?? []).reduce(
    (sum, o) => sum + (o.items ?? []).reduce((s, i) => s + (i.quantity ?? 1), 0),
    0
  );

  const stats = [
    {
      label: "Total Orders",
      value: String(orders.length),
      sub: "All time",
      icon: Package,
      color: "text-[#FF9900]",
      bg: "bg-orange-50",
    },
    {
      label: "Total Spent",
      value: `$${totalSpent.toFixed(2)}`,
      sub: "Excl. cancelled",
      icon: CreditCard,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Delivered",
      value: String(delivered),
      sub: "Successfully",
      icon: CheckCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "In Progress",
      value: String(inProgress),
      sub: "Active shipments",
      icon: Truck,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={scaleIn}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_-4px_rgba(0,0,0,0.07)] p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-1 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
              </div>
              <div className={`${stat.bg} rounded-lg p-2`}>
                <Icon size={20} className={stat.color} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OrderHistoryPage() {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredOrders = (MOCK_ORDERS ?? [])
    .filter((order) => {
      const matchesFilter =
        activeFilter === "All Orders" ||
        order.status === activeFilter.toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        order.id.toLowerCase().includes(q) ||
        (order.items ?? []).some((item) =>
          (item.name ?? "").toLowerCase().includes(q)
        );
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === "highest") {
        return (b.total ?? 0) - (a.total ?? 0);
      }
      if (sortBy === "lowest") {
        return (a.total ?? 0) - (b.total ?? 0);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <div className="max-w-[1100px] mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-[#C7511F] transition-colors duration-150">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/account" className="hover:text-[#C7511F] transition-colors duration-150">
              Account
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Order History</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#131921] tracking-tight">
            Your Orders
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {MOCK_ORDERS.length} orders placed across all time
          </p>
        </motion.div>

        {/* Summary Stats */}
        <SummaryStats orders={MOCK_ORDERS} />

        {/* Filters + Search */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-4 mb-5"
        >
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders by product name or order ID..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900]/40 focus:border-[#FF9900] transition-all duration-200 bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={15} className="text-gray-400 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF9900]/40 focus:border-[#FF9900] bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Total</option>
                <option value="lowest">Lowest Total</option>
              </select>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((filter) => {
              const count =
                filter === "All Orders"
                  ? MOCK_ORDERS.length
                  : MOCK_ORDERS.filter(
                      (o) => o.status === filter.toLowerCase()
                    ).length;
              return (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter
                      ? "bg-[#131921] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                  <span
                    className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${
                      activeFilter === filter
                        ? "bg-[#FF9900] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm"
          >
            <Package size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-700 mb-2">No orders found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {searchQuery
                ? `No orders match "${searchQuery}". Try a different search term.`
                : `You have no ${activeFilter.toLowerCase()} orders yet.`}
            </p>
            <Link href="/products">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF9900] hover:bg-[#e68a00] text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm cursor-pointer"
              >
                <ShoppingBag size={16} />
                Start Shopping
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredOrders.map((order, index) => (
              <OrderCard key={order.id} order={order} index={index} />
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8 bg-[#131921] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-white font-bold text-lg">Need help with an order?</h3>
            <p className="text-gray-400 text-sm mt-0.5">
              Our support team is available 24/7 to assist you.
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 bg-[#FF9900] hover:bg-[#e68a00] text-white font-semibold rounded-lg text-sm transition-colors duration-200 shadow-sm"
            >
              Contact Support
            </motion.button>
            <Link href="/products">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg text-sm transition-colors duration-200 cursor-pointer"
              >
                Browse Products
                <ArrowRight size={14} />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}