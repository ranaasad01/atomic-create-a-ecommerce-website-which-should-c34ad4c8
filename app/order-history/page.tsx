"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ChevronRight, Search, Filter, Download, RotateCcw, Star, Truck, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderStatus = "delivered" | "shipped" | "processing" | "cancelled" | "returned";

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
    id: "112-3456789-0123456",
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
        title: "USB-C Charging Cable (3-Pack, 6ft)",
        price: 24.99,
        quantity: 2,
        image: "https://m.media-amazon.com/images/I/61U3jBO3HHL._AC_UF894,1000_QL80_.jpg",
      },
    ],
  },
  {
    id: "114-9876543-2109876",
    date: "July 3, 2025",
    status: "shipped",
    total: 189.99,
    trackingNumber: "1Z999AA10123456784",
    estimatedDelivery: "July 14, 2025",
    address: "123 Main St, San Francisco, CA 94102",
    paymentMethod: "Mastercard ending in 8888",
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
    id: "113-1122334-4556677",
    date: "June 25, 2025",
    status: "processing",
    total: 79.95,
    estimatedDelivery: "July 16, 2025",
    address: "456 Oak Ave, Austin, TX 78701",
    paymentMethod: "ShopNow Gift Card",
    items: [
      {
        id: 4,
        title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
        price: 79.95,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
      },
    ],
  },
  {
    id: "112-5544332-1122334",
    date: "June 10, 2025",
    status: "delivered",
    total: 159.98,
    deliveredDate: "June 15, 2025",
    address: "789 Pine Rd, Seattle, WA 98101",
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: 5,
        title: "Kindle Paperwhite (16 GB) — Waterproof, 6.8\" Display",
        price: 139.99,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
        rating: 4,
      },
      {
        id: 6,
        title: "Kindle Leather Cover — Black",
        price: 19.99,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
      },
    ],
  },
  {
    id: "111-9988776-6554433",
    date: "May 28, 2025",
    status: "cancelled",
    total: 499.99,
    address: "123 Main St, San Francisco, CA 94102",
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: 7,
        title: "Samsung 55\" 4K QLED Smart TV",
        price: 499.99,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
      },
    ],
  },
  {
    id: "113-3344556-7788990",
    date: "May 15, 2025",
    status: "returned",
    total: 39.99,
    address: "123 Main St, San Francisco, CA 94102",
    paymentMethod: "Mastercard ending in 8888",
    items: [
      {
        id: 8,
        title: "Levi's Men's 501 Original Fit Jeans",
        price: 39.99,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number): string {
  return (n ?? 0).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  delivered: {
    label: "Delivered",
    color: "text-green-700",
    bg: "bg-green-100",
    icon: CheckCircle,
  },
  shipped: {
    label: "Shipped",
    color: "text-[#10B981]",
    bg: "bg-[#10B981]/10",
    icon: Truck,
  },
  processing: {
    label: "Processing",
    color: "text-blue-700",
    bg: "bg-blue-100",
    icon: Clock,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-700",
    bg: "bg-red-100",
    icon: XCircle,
  },
  returned: {
    label: "Returned",
    color: "text-gray-600",
    bg: "bg-gray-100",
    icon: RotateCcw,
  },
};

const FILTER_OPTIONS: { label: string; value: string }[] = [
  { label: "All Orders", value: "all" },
  { label: "Last 30 Days", value: "30days" },
  { label: "Last 3 Months", value: "3months" },
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, orderId, itemId }: { rating: number; orderId: string; itemId: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={`${orderId}-${itemId}-star-${s}`}
          className={`w-3.5 h-3.5 ${
            s <= rating ? "text-[#10B981] fill-[#10B981]" : "text-gray-300 fill-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {cfg.label}
    </span>
  );
}

function OrderCard({ order, expanded, onToggle }: { order: Order; expanded: boolean; onToggle: () => void }) {
  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Order Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wide font-medium">Order Placed</p>
            <p className="text-gray-800 font-semibold mt-0.5">{order.date}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wide font-medium">Total</p>
            <p className="text-gray-800 font-semibold mt-0.5">{formatPrice(order.total)}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wide font-medium">Ship To</p>
            <p className="text-[#10B981] font-semibold mt-0.5 cursor-pointer hover:underline text-sm">
              {order.address.split(",")[0]}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-gray-500 text-xs">Order # {order.id}</p>
            <StatusBadge status={order.status} />
          </div>
        </div>
      </div>

      {/* Order Body */}
      <div className="px-5 py-4">
        {/* Status message */}
        {order.status === "delivered" && order.deliveredDate && (
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-700 font-semibold text-sm">
              Delivered {order.deliveredDate}
            </p>
          </div>
        )}
        {order.status === "shipped" && order.estimatedDelivery && (
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5 text-[#10B981] flex-shrink-0" />
            <p className="text-[#10B981] font-semibold text-sm">
              Arriving {order.estimatedDelivery}
            </p>
            {order.trackingNumber && (
              <span className="text-gray-500 text-xs ml-2">
                Tracking: {order.trackingNumber}
              </span>
            )}
          </div>
        )}
        {order.status === "processing" && (
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-blue-700 font-semibold text-sm">
              Preparing your order — estimated delivery {order.estimatedDelivery}
            </p>
          </div>
        )}
        {order.status === "cancelled" && (
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-600 font-semibold text-sm">Order cancelled</p>
          </div>
        )}
        {order.status === "returned" && (
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <p className="text-gray-600 font-semibold text-sm">Return processed — refund issued</p>
          </div>
        )}

        {/* Items preview */}
        <div className="flex gap-3 flex-wrap">
          {order.items.slice(0, expanded ? undefined : 2).map((item) => (
            <div key={item.id} className="flex gap-3 w-full sm:w-auto sm:flex-1 min-w-0">
              <div className="w-16 h-16 flex-shrink-0 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://via.placeholder.com/64x64?text=Item";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href="/product-detail"
                  className="text-sm text-[#10B981] hover:text-[#059669] hover:underline font-medium line-clamp-2 leading-snug"
                >
                  {item.title}
                </Link>
                <p className="text-gray-500 text-xs mt-0.5">Qty: {item.quantity}</p>
                <p className="text-gray-800 text-sm font-semibold mt-0.5">
                  {formatPrice(item.price)}
                </p>
                {item.rating !== undefined && (
                  <div className="mt-1">
                    <StarRating rating={item.rating} orderId={order.id} itemId={item.id} />
                  </div>
                )}
              </div>
            </div>
          ))}
          {!expanded && order.items.length > 2 && (
            <button
              onClick={onToggle}
              className="text-sm text-[#10B981] hover:text-[#059669] hover:underline font-medium self-center"
            >
              +{order.items.length - 2} more item{order.items.length - 2 > 1 ? "s" : ""}
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
          {(order.status === "delivered" || order.status === "shipped") && (
            <Link
              href="/order-confirmation"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold rounded-lg transition-colors duration-200"
            >
              <Package className="w-4 h-4" />
              Track Package
            </Link>
          )}
          {order.status === "delivered" && (
            <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 hover:border-[#10B981] hover:text-[#10B981] text-gray-700 text-sm font-semibold rounded-lg transition-colors duration-200">
              <RotateCcw className="w-4 h-4" />
              Return Items
            </button>
          )}
          {order.status === "processing" && (
            <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-300 hover:border-red-500 text-red-600 hover:text-red-700 text-sm font-semibold rounded-lg transition-colors duration-200">
              <XCircle className="w-4 h-4" />
              Cancel Order
            </button>
          )}
          <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold rounded-lg transition-colors duration-200">
            <Download className="w-4 h-4" />
            Invoice
          </button>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 hover:border-[#10B981] hover:text-[#10B981] text-gray-700 text-sm font-semibold rounded-lg transition-colors duration-200"
          >
            Buy Again
          </Link>
          {expanded && order.items.length > 2 && (
            <button
              onClick={onToggle}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[#10B981] hover:text-[#059669] text-sm font-semibold transition-colors duration-200"
            >
              Show less
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderHistoryPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const toggleExpanded = (orderId: string) => {
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) {
        next.delete(orderId);
      } else {
        next.add(orderId);
      }
      return next;
    });
  };

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSearch;
  });

  const totalSpent = MOCK_ORDERS.filter(
    (o) => o.status !== "cancelled" && o.status !== "returned"
  ).reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Page Header */}
      <div className="bg-[#0F2027] text-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-2">
              <Package className="w-7 h-7 text-[#10B981]" />
              <h1 className="text-2xl sm:text-3xl font-bold">Your Orders</h1>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-gray-300 text-sm">
              {MOCK_ORDERS.length} orders placed • Total spent:{" "}
              <span className="text-[#10B981] font-semibold">{formatPrice(totalSpent)}</span>
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Search + Filter Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by item name or order number…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
              />
            </div>
            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white appearance-none cursor-pointer"
              >
                {FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          {[
            {
              label: "Total Orders",
              value: MOCK_ORDERS.length,
              color: "text-[#0F2027]",
            },
            {
              label: "Delivered",
              value: MOCK_ORDERS.filter((o) => o.status === "delivered").length,
              color: "text-green-600",
            },
            {
              label: "In Transit",
              value: MOCK_ORDERS.filter(
                (o) => o.status === "shipped" || o.status === "processing"
              ).length,
              color: "text-[#10B981]",
            },
            {
              label: "Cancelled / Returned",
              value: MOCK_ORDERS.filter(
                (o) => o.status === "cancelled" || o.status === "returned"
              ).length,
              color: "text-red-500",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm"
          >
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">No orders found</h2>
            <p className="text-gray-500 text-sm mb-6">
              {searchQuery
                ? `No orders match "${searchQuery}". Try a different search term.`
                : "You haven't placed any orders yet."}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-lg transition-colors duration-200"
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
              <OrderCard
                key={order.id}
                order={order}
                expanded={expandedOrders.has(order.id)}
                onToggle={() => toggleExpanded(order.id)}
              />
            ))}
          </motion.div>
        )}

        {/* Help Banner */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 bg-[#1A3A4A] rounded-xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="font-bold text-lg">Need help with an order?</h3>
            <p className="text-gray-300 text-sm mt-1">
              Our customer service team is available 24/7 to assist you.
            </p>
          </div>
          <Link
            href="/help"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Get Help
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
