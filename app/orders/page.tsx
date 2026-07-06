"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock, XCircle, ChevronDown, ChevronRight, Search, Filter, Star, RotateCcw, Download, Eye } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

type OrderStatus = "delivered" | "shipped" | "processing" | "cancelled" | "returned";

interface OrderItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  trackingNumber: string;
  estimatedDelivery: string;
  address: string;
  paymentMethod: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "112-4857293-0012345",
    date: "2024-12-10",
    status: "delivered",
    total: 189.97,
    trackingNumber: "TBA123456789000",
    estimatedDelivery: "2024-12-13",
    address: "123 Main St, Seattle, WA 98101",
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: 1,
        title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
        price: 129.99,
        quantity: 1,
        category: "Electronics",
      },
      {
        id: 2,
        title: "Anker USB-C Charging Cable 6ft (2-Pack)",
        image: "/images/anker-usb-c-charging-cable.jpg",
        price: 29.99,
        quantity: 2,
        category: "Electronics",
      },
    ],
  },
  {
    id: "112-7654321-9988776",
    date: "2024-12-05",
    status: "shipped",
    total: 74.95,
    trackingNumber: "TBA987654321000",
    estimatedDelivery: "2024-12-14",
    address: "123 Main St, Seattle, WA 98101",
    paymentMethod: "Mastercard ending in 8888",
    items: [
      {
        id: 3,
        title: "Nike Men's Running Shoes Air Zoom Pegasus 40",
        image: "/images/nike-running-shoes-air-zoom.jpg",
        price: 74.95,
        quantity: 1,
        category: "Sports",
      },
    ],
  },
  {
    id: "112-1122334-5566778",
    date: "2024-11-28",
    status: "delivered",
    total: 312.48,
    trackingNumber: "TBA112233445566",
    estimatedDelivery: "2024-12-01",
    address: "456 Oak Ave, Portland, OR 97201",
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: 4,
        title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
        image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
        price: 89.99,
        quantity: 1,
        category: "Home & Kitchen",
      },
      {
        id: 5,
        title: "Kindle Paperwhite (16 GB) — Now with a 6.8 inch display",
        image: "/images/kindle-paperwhite-ereader.jpg",
        price: 139.99,
        quantity: 1,
        category: "Electronics",
      },
      {
        id: 6,
        title: "Organic Cotton Bath Towel Set (6-Piece)",
        image: "/images/organic-cotton-bath-towel-set.jpg",
        price: 82.50,
        quantity: 1,
        category: "Home & Kitchen",
      },
    ],
  },
  {
    id: "112-9988776-1234567",
    date: "2024-11-15",
    status: "cancelled",
    total: 45.00,
    trackingNumber: "",
    estimatedDelivery: "",
    address: "123 Main St, Seattle, WA 98101",
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: 7,
        title: "The Pragmatic Programmer: 20th Anniversary Edition",
        image: "/images/pragmatic-programmer-book.jpg",
        price: 45.00,
        quantity: 1,
        category: "Books",
      },
    ],
  },
  {
    id: "112-5544332-8877665",
    date: "2024-11-02",
    status: "returned",
    total: 59.99,
    trackingNumber: "TBA556677889900",
    estimatedDelivery: "2024-11-06",
    address: "789 Pine Rd, San Francisco, CA 94102",
    paymentMethod: "Mastercard ending in 8888",
    items: [
      {
        id: 8,
        title: "Levi's Men's 511 Slim Fit Jeans",
        image: "https://static.wikia.nocookie.net/shingekinokyojin/images/b/b1/Levi_Ackermann_%28Anime%29_character_image.png/revision/latest?cb=20231105181307",
        price: 59.99,
        quantity: 1,
        category: "Clothing",
      },
    ],
  },
  {
    id: "112-3344556-7788990",
    date: "2024-10-20",
    status: "delivered",
    total: 228.96,
    trackingNumber: "TBA334455667788",
    estimatedDelivery: "2024-10-23",
    address: "123 Main St, Seattle, WA 98101",
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: 9,
        title: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
        image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
        price: 189.99,
        quantity: 1,
        category: "Electronics",
      },
      {
        id: 10,
        title: "Moleskine Classic Notebook, Hard Cover, Large (5 x 8.25)",
        image: "/images/moleskine-classic-notebook-large.jpg",
        price: 19.99,
        quantity: 1,
        category: "Books",
      },
      {
        id: 11,
        title: "Resistance Bands Set for Exercise (5 Levels)",
        image: "/images/resistance-bands-exercise-set.jpg",
        price: 18.98,
        quantity: 1,
        category: "Sports",
      },
    ],
  },
];

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  delivered: {
    label: "Delivered",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
    icon: <CheckCircle className="w-4 h-4 text-green-600" />,
  },
  shipped: {
    label: "Shipped",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    icon: <Truck className="w-4 h-4 text-blue-600" />,
  },
  processing: {
    label: "Processing",
    color: "text-yellow-700",
    bg: "bg-yellow-50 border-yellow-200",
    icon: <Clock className="w-4 h-4 text-yellow-600" />,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
    icon: <XCircle className="w-4 h-4 text-red-600" />,
  },
  returned: {
    label: "Returned",
    color: "text-gray-700",
    bg: "bg-gray-50 border-gray-200",
    icon: <RotateCcw className="w-4 h-4 text-gray-600" />,
  },
};

const FILTER_OPTIONS = ["All Orders", "Delivered", "Shipped", "Processing", "Cancelled", "Returned"];

function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0] ?? "2024", 10);
  const month = parseInt(parts[1] ?? "1", 10) - 1;
  const day = parseInt(parts[2] ?? "1", 10);
  const d = new Date(year, month, day);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_CONFIG[order.status];

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-xl border border-black/8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      {/* Order header */}
      <div className="bg-[#F7F8F8] border-b border-black/6 px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-2">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Order Placed</p>
          <p className="text-sm font-semibold text-gray-800">{formatDate(order.date)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Total</p>
          <p className="text-sm font-semibold text-gray-800">${(order.total ?? 0).toFixed(2)}</p>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Ship To</p>
          <p className="text-sm font-semibold text-gray-800 truncate">{order.address ?? ""}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Order ID</p>
          <p className="text-xs font-mono text-[#007185] font-semibold">{order.id}</p>
        </div>
      </div>

      {/* Status bar */}
      <div className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-black/5">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${statusCfg.bg} ${statusCfg.color}`}>
          {statusCfg.icon}
          {statusCfg.label}
          {order.status === "shipped" && order.estimatedDelivery && (
            <span className="font-normal ml-1">— Est. {formatDate(order.estimatedDelivery)}</span>
          )}
          {order.status === "delivered" && order.estimatedDelivery && (
            <span className="font-normal ml-1">on {formatDate(order.estimatedDelivery)}</span>
          )}
        </div>
        {order.trackingNumber ? (
          <span className="text-xs text-gray-500 font-mono">
            Tracking: <span className="text-[#007185] font-semibold">{order.trackingNumber}</span>
          </span>
        ) : null}
      </div>

      {/* Items preview */}
      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-4">
          {(order.items ?? []).slice(0, expanded ? order.items.length : 2).map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex gap-3 flex-1 min-w-[260px]"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-black/8 flex-shrink-0 bg-gray-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/product-placeholder.jpg";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  ${(item.price ?? 0).toFixed(2)}
                  {item.quantity > 1 && (
                    <span className="text-xs font-normal text-gray-500 ml-1">x{item.quantity}</span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {(order.items ?? []).length > 2 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 flex items-center gap-1 text-sm text-[#007185] hover:text-[#C7511F] font-medium transition-colors duration-150"
          >
            {expanded ? (
              <>
                <ChevronDown className="w-4 h-4 rotate-180" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show {order.items.length - 2} more item{order.items.length - 2 > 1 ? "s" : ""}
              </>
            )}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 py-3 border-t border-black/5 flex flex-wrap gap-2">
        <Link
          href={`/products`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF9900] hover:bg-[#e68a00] text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Link>
        {order.status === "delivered" && (
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-black/12 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-all duration-200">
            <Star className="w-4 h-4 text-[#FF9900]" />
            Write a Review
          </button>
        )}
        {(order.status === "delivered" || order.status === "shipped") && (
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-black/12 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-all duration-200">
            <RotateCcw className="w-4 h-4" />
            Return or Replace
          </button>
        )}
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-black/12 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-all duration-200">
          <Download className="w-4 h-4" />
          Invoice
        </button>
        {order.status === "processing" && (
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium transition-all duration-200">
            <XCircle className="w-4 h-4" />
            Cancel Order
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function OrdersPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Orders");

  const filteredOrders = (MOCK_ORDERS ?? []).filter((order) => {
    const matchesFilter =
      activeFilter === "All Orders" ||
      order.status === activeFilter.toLowerCase();

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      order.id.toLowerCase().includes(q) ||
      (order.items ?? []).some((item) =>
        (item.title ?? "").toLowerCase().includes(q)
      );

    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: MOCK_ORDERS.length,
    delivered: MOCK_ORDERS.filter((o) => o.status === "delivered").length,
    shipped: MOCK_ORDERS.filter((o) => o.status === "shipped").length,
    totalSpent: MOCK_ORDERS.filter(
      (o) => o.status !== "cancelled" && o.status !== "returned"
    ).reduce((sum, o) => sum + (o.total ?? 0), 0),
  };

  return (
    <main className="min-h-screen bg-[#EAEDED]">
      <div className="max-w-[1100px] mx-auto px-4 py-8">

        {/* Page header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#131921] tracking-tight">
            Your Orders
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Track, return, or buy things again
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        >
          {[
            { label: "Total Orders", value: stats.total.toString(), icon: <Package className="w-5 h-5 text-[#FF9900]" /> },
            { label: "Delivered", value: stats.delivered.toString(), icon: <CheckCircle className="w-5 h-5 text-green-600" /> },
            { label: "In Transit", value: stats.shipped.toString(), icon: <Truck className="w-5 h-5 text-blue-600" /> },
            { label: "Total Spent", value: `$${(stats.totalSpent ?? 0).toFixed(2)}`, icon: <Star className="w-5 h-5 text-[#FF9900]" /> },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl border border-black/8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] px-4 py-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 border border-black/6 flex items-center justify-center flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className="text-lg font-bold text-[#131921] leading-tight">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl border border-black/8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-4 py-4 mb-5 flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders by ID or product name..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-black/12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900]/40 focus:border-[#FF9900] transition-all duration-200"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                  activeFilter === opt
                    ? "bg-[#131921] text-white border-[#131921]"
                    : "bg-white text-gray-600 border-black/12 hover:border-[#131921] hover:text-[#131921]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Orders list */}
        {filteredOrders.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl border border-black/8 shadow-sm px-8 py-16 text-center"
          >
            <Package className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">No orders found</h2>
            <p className="text-gray-500 text-sm mb-6">
              {searchQuery
                ? `No orders match "${searchQuery}". Try a different search.`
                : "You have no orders in this category yet."}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#FF9900] hover:bg-[#e68a00] text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md"
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
            className="flex flex-col gap-4"
          >
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8 bg-white rounded-xl border border-black/8 shadow-sm px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-base font-bold text-[#131921]">Looking for something new?</h3>
            <p className="text-sm text-gray-500 mt-0.5">Browse thousands of products with fast delivery.</p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#FF9900] hover:bg-[#e68a00] text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0"
          >
            Browse Products
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </main>
  );
}