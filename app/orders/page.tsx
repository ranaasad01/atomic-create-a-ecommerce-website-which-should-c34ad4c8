"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock, ChevronRight, Search, Filter, RotateCcw, Star, Download, MessageCircle } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderStatus = "delivered" | "in-transit" | "processing" | "cancelled";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  rating?: number;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  address: string;
  paymentMethod: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-2025-001847",
    date: "July 8, 2025",
    status: "delivered",
    total: 329.97,
    deliveredDate: "July 12, 2025",
    address: "123 Main St, San Francisco, CA 94102",
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: 1,
        title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        price: 279.99,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
        rating: 5,
      },
      {
        id: 2,
        title: "Anker USB-C Charging Cable (3-Pack)",
        price: 24.99,
        quantity: 2,
        image: "https://m.media-amazon.com/images/I/61N3-jPnxkL._AC_UF894,1000_QL80_.jpg",
      },
    ],
  },
  {
    id: "ORD-2025-001623",
    date: "July 14, 2025",
    status: "in-transit",
    total: 189.99,
    trackingNumber: "1Z999AA10123456784",
    estimatedDelivery: "July 18, 2025",
    address: "123 Main St, San Francisco, CA 94102",
    paymentMethod: "Mastercard ending in 8765",
    items: [
      {
        id: 3,
        title: "Apple AirPods Pro (2nd Generation)",
        price: 189.99,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
      },
    ],
  },
  {
    id: "ORD-2025-001401",
    date: "June 29, 2025",
    status: "delivered",
    total: 139.93,
    deliveredDate: "July 3, 2025",
    address: "123 Main St, San Francisco, CA 94102",
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: 4,
        title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
        price: 79.95,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
        rating: 4,
      },
      {
        id: 5,
        title: "Kindle Paperwhite (16 GB)",
        price: 139.99,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
        rating: 5,
      },
    ],
  },
  {
    id: "ORD-2025-001188",
    date: "June 15, 2025",
    status: "processing",
    total: 59.99,
    estimatedDelivery: "July 20, 2025",
    address: "123 Main St, San Francisco, CA 94102",
    paymentMethod: "PayPal",
    items: [
      {
        id: 6,
        title: "Ninja AF101 Air Fryer 4 Quart",
        price: 59.99,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/71+8uTMDRFL.jpg",
      },
    ],
  },
  {
    id: "ORD-2025-000934",
    date: "May 22, 2025",
    status: "cancelled",
    total: 699.99,
    address: "123 Main St, San Francisco, CA 94102",
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: 7,
        title: 'Samsung 65" 4K QLED Smart TV',
        price: 699.99,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/71pvaYTkKjL._AC_UF894,1000_QL80_.jpg",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const config: Record<OrderStatus, { label: string; className: string; icon: React.ReactNode }> = {
    delivered: {
      label: "Delivered",
      className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
    "in-transit": {
      label: "In Transit",
      className: "bg-blue-100 text-blue-700 border border-blue-200",
      icon: <Truck className="w-3.5 h-3.5" />,
    },
    processing: {
      label: "Processing",
      className: "bg-amber-100 text-amber-700 border border-amber-200",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-600 border border-red-200",
      icon: <RotateCcw className="w-3.5 h-3.5" />,
    },
  };

  const { label, className, icon } = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}>
      {icon}
      {label}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= rating ? "fill-[#10B981] text-[#10B981]" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function OrderProgressBar({ status }: { status: OrderStatus }) {
  const steps = [
    { key: "processing", label: "Order Placed" },
    { key: "in-transit", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
  ];

  const activeIndex =
    status === "cancelled"
      ? -1
      : status === "delivered"
      ? 2
      : status === "in-transit"
      ? 1
      : 0;

  if (status === "cancelled") return null;

  return (
    <div className="flex items-center gap-0 mt-3">
      {steps.map((step, i) => (
        <div key={step.key} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i <= activeIndex
                  ? "bg-[#10B981] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {i < activeIndex ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <span
              className={`text-[10px] mt-1 font-medium whitespace-nowrap ${
                i <= activeIndex ? "text-[#10B981]" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-1 mb-4 transition-colors ${
                i < activeIndex ? "bg-[#10B981]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OrdersPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState("all");

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleExpand = (orderId: string) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  const statusCounts = MOCK_ORDERS.reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      {/* Page Header */}
      <div className="bg-[#0F2027] text-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Your Orders</h1>
            <p className="text-blue-200 text-sm">
              {MOCK_ORDERS.length} orders placed
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Stats Row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          {[
            { label: "Total Orders", value: MOCK_ORDERS.length, color: "text-[#1A3A4A]" },
            { label: "Delivered", value: statusCounts["delivered"] ?? 0, color: "text-[#10B981]" },
            { label: "In Transit", value: statusCounts["in-transit"] ?? 0, color: "text-blue-600" },
            { label: "Processing", value: statusCounts["processing"] ?? 0, color: "text-amber-600" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders or products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {(["all", "delivered", "in-transit", "processing", "cancelled"] as const).map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
                      statusFilter === s
                        ? "bg-[#10B981] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {s === "all" ? "All" : s.replace("-", " ")}
                  </button>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center"
          >
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No orders found</h3>
            <p className="text-gray-500 text-sm mb-4">
              {searchQuery
                ? `No orders match "${searchQuery}"`
                : "You haven't placed any orders yet."}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Start Shopping
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Order Header */}
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Order ID</p>
                        <p className="text-sm font-bold text-[#1A3A4A] font-mono">{order.id}</p>
                      </div>
                      <div className="hidden sm:block w-px h-8 bg-gray-200" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Placed</p>
                        <p className="text-sm font-medium text-gray-700">{order.date}</p>
                      </div>
                      <div className="hidden sm:block w-px h-8 bg-gray-200" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Total</p>
                        <p className="text-sm font-bold text-[#10B981]">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="text-xs text-[#10B981] hover:text-[#059669] font-medium flex items-center gap-1 transition-colors"
                      >
                        {expandedOrder === order.id ? "Hide details" : "View details"}
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            expandedOrder === order.id ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {(order.status === "in-transit" || order.status === "processing" || order.status === "delivered") && (
                    <OrderProgressBar status={order.status} />
                  )}

                  {/* Tracking / Delivery Info */}
                  {order.status === "in-transit" && order.trackingNumber && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                      <Truck className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        Tracking: <span className="font-mono font-semibold">{order.trackingNumber}</span>
                        {order.estimatedDelivery && (
                          <> · Est. delivery: <strong>{order.estimatedDelivery}</strong></>
                        )}
                      </span>
                    </div>
                  )}
                  {order.status === "delivered" && order.deliveredDate && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        Delivered on <strong>{order.deliveredDate}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* Items Preview (always visible) */}
                <div className="px-5 py-3">
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex-shrink-0 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-contain rounded-lg border border-gray-100 bg-gray-50"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/56x56?text=Item";
                          }}
                        />
                        {item.quantity > 1 && (
                          <span className="absolute -top-1 -right-1 bg-[#10B981] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        )}
                      </div>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-gray-100"
                  >
                    {/* Item Details */}
                    <div className="px-5 py-4 space-y-4">
                      <h4 className="text-sm font-semibold text-gray-700">Order Items</h4>
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-contain rounded-lg border border-gray-100 bg-gray-50 flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/64x64?text=Item";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <Link
                              href="/product-detail"
                              className="text-sm font-medium text-[#1A3A4A] hover:text-[#10B981] line-clamp-2 transition-colors"
                            >
                              {item.title}
                            </Link>
                            <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold text-[#10B981] mt-1">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            {item.rating !== undefined && (
                              <div className="mt-1.5">
                                <StarRating rating={item.rating} />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 flex-shrink-0">
                            {order.status === "delivered" && (
                              <>
                                <button className="text-xs text-[#10B981] hover:text-[#059669] font-medium flex items-center gap-1 transition-colors">
                                  <Star className="w-3 h-3" />
                                  Review
                                </button>
                                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors">
                                  <RotateCcw className="w-3 h-3" />
                                  Return
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Meta */}
                    <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Shipping Address</p>
                        <p className="text-sm text-gray-700">{order.address}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Payment</p>
                        <p className="text-sm text-gray-700">{order.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Order Total</p>
                        <p className="text-lg font-bold text-[#10B981]">{formatPrice(order.total)}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap gap-2">
                      <Link
                        href="/order-confirmation"
                        className="inline-flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Package className="w-3.5 h-3.5" />
                        View Invoice
                      </Link>
                      <button className="inline-flex items-center gap-1.5 border border-gray-200 hover:border-[#10B981] hover:text-[#10B981] text-gray-600 px-4 py-2 rounded-lg text-xs font-semibold transition-colors">
                        <Download className="w-3.5 h-3.5" />
                        Download Receipt
                      </button>
                      <button className="inline-flex items-center gap-1.5 border border-gray-200 hover:border-blue-400 hover:text-blue-600 text-gray-600 px-4 py-2 rounded-lg text-xs font-semibold transition-colors">
                        <MessageCircle className="w-3.5 h-3.5" />
                        Contact Support
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Continue Shopping CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-8 text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-md"
          >
            Continue Shopping
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
