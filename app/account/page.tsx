"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Package, Heart, MapPin, CreditCard, Bell, Settings, ChevronRight, Star, ShoppingCart, Edit, Check, X, Lock, Mail, Phone, Calendar, Award, TrendingUp, Clock } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 234-5678",
  memberSince: "March 2021",
  tier: "Prime Member",
  avatar: "/images/user-avatar-profile.jpg",
  points: 4820,
  totalOrders: 47,
  totalSpent: 3241.88,
  savedItems: 12,
};

const mockOrders = [
  {
    id: "112-3456789-0123456",
    date: "Dec 18, 2024",
    status: "Delivered",
    statusColor: "text-green-600 bg-green-50",
    total: 129.99,
    items: [
      { name: "Sony WH-1000XM5 Headphones", image: "/images/sony-headphones-black.jpg", qty: 1, price: 129.99 },
    ],
  },
  {
    id: "113-9876543-2109876",
    date: "Dec 14, 2024",
    status: "In Transit",
    statusColor: "text-blue-600 bg-blue-50",
    total: 249.95,
    items: [
      { name: "Apple AirPods Pro (2nd Gen)", image: "/images/apple-airpods-pro.jpg", qty: 1, price: 199.99 },
      { name: "USB-C Charging Cable 6ft", image: "/images/usb-c-charging-cable.jpg", qty: 2, price: 24.98 },
    ],
  },
  {
    id: "114-1122334-4556677",
    date: "Dec 8, 2024",
    status: "Delivered",
    statusColor: "text-green-600 bg-green-50",
    total: 89.99,
    items: [
      { name: "Kindle Paperwhite 16GB", image: "/images/kindle-paperwhite-ereader.jpg", qty: 1, price: 89.99 },
    ],
  },
  {
    id: "115-5544332-2211009",
    date: "Nov 29, 2024",
    status: "Delivered",
    statusColor: "text-green-600 bg-green-50",
    total: 54.97,
    items: [
      { name: "Organic Cotton T-Shirt Pack", image: "/images/organic-cotton-tshirt.jpg", qty: 3, price: 54.97 },
    ],
  },
];

const mockAddresses = [
  {
    id: 1,
    label: "Home",
    default: true,
    name: "Alex Johnson",
    line1: "1234 Maple Street",
    line2: "Apt 5B",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "United States",
  },
  {
    id: 2,
    label: "Work",
    default: false,
    name: "Alex Johnson",
    line1: "500 Market Street",
    line2: "Suite 1200",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
  },
];

const mockPayments = [
  { id: 1, type: "Visa", last4: "4242", expiry: "09/27", default: true },
  { id: 2, type: "Mastercard", last4: "8888", expiry: "03/26", default: false },
];

const mockWishlist = [
  { id: 1, name: "Samsung 65\" QLED 4K TV", price: 1299.99, rating: 4.7, reviews: 2341, image: "https://bjs.scene7.com/is/image/bjs/345905?$bjs-Zoom$" },
  { id: 2, name: "Dyson V15 Detect Vacuum", price: 649.99, rating: 4.8, reviews: 1876, image: "https://bjs.scene7.com/is/image/bjs/345905?$bjs-Zoom$" },
  { id: 3, name: "Instant Pot Duo 7-in-1", price: 89.95, rating: 4.6, reviews: 45231, image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg" },
  { id: 4, name: "Nike Air Max 270", price: 149.99, rating: 4.5, reviews: 8923, image: "/images/nike-air-max-270-sneakers.jpg" },
];

const TABS = [
  { id: "overview", label: "Overview", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.round(rating) ? "fill-[#FF9900] text-[#FF9900]" : "text-gray-300 fill-gray-200"}
        />
      ))}
    </span>
  );
}

export default function AccountPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("overview");
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(mockUser.name);
  const [profileEmail, setProfileEmail] = useState(mockUser.email);
  const [profilePhone, setProfilePhone] = useState(mockUser.phone);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);
  const [notifPush, setNotifPush] = useState(true);
  const [notifDeals, setNotifDeals] = useState(true);
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const statCards = [
    { label: "Total Orders", value: mockUser.totalOrders.toString(), icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Total Spent", value: `$${(mockUser.totalSpent ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: TrendingUp, color: "bg-green-50 text-green-600" },
    { label: "Reward Points", value: (mockUser.points ?? 0).toLocaleString("en-US"), icon: Award, color: "bg-yellow-50 text-yellow-600" },
    { label: "Saved Items", value: mockUser.savedItems.toString(), icon: Heart, color: "bg-red-50 text-red-600" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-[#131921] text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-[#FF9900] flex items-center justify-center text-2xl font-bold text-white shadow-lg flex-shrink-0">
              {(profileName ?? "A").charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{profileName}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-[#FF9900] text-[#131921] font-bold px-2 py-0.5 rounded-full">
                  {mockUser.tier}
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <Calendar size={13} />
                  Member since {mockUser.memberSince}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <motion.aside
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="lg:w-56 flex-shrink-0"
          >
            <nav className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden">
              {TABS.map((tab, i) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 text-left ${
                      i < TABS.length - 1 ? "border-b border-gray-100" : ""
                    } ${
                      isActive
                        ? "bg-[#FFF3E0] text-[#FF9900] border-l-2 border-l-[#FF9900]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-[#FF9900]" : "text-gray-400"} />
                    {tab.label}
                    {isActive && <ChevronRight size={14} className="ml-auto text-[#FF9900]" />}
                  </button>
                );
              })}
            </nav>
          </motion.aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={card.label}
                        variants={scaleIn}
                        whileHover={{ y: -2, transition: { duration: 0.2 } }}
                        className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border border-black/5"
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                          <Icon size={18} />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 tracking-tight">{card.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent orders */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border border-black/5"
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900">Recent Orders</h2>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-sm text-[#FF9900] hover:underline font-medium"
                    >
                      View all
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="px-5 py-4 flex items-center gap-4">
                        <img
                          src={order.items[0]?.image ?? "/images/product-placeholder.jpg"}
                          alt={order.items[0]?.name ?? "Order item"}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {order.items[0]?.name ?? "Order item"}
                            {(order.items?.length ?? 0) > 1 && (
                              <span className="text-gray-400 font-normal"> +{order.items.length - 1} more</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">{order.date} · #{order.id}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${order.statusColor}`}>
                            {order.status}
                          </span>
                          <p className="text-sm font-bold text-gray-900 mt-1">
                            ${(order.total ?? 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Profile summary */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border border-black/5 p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-900">Profile Information</h2>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className="text-sm text-[#FF9900] hover:underline font-medium flex items-center gap-1"
                    >
                      <Edit size={13} /> Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Mail size={15} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm font-medium text-gray-800 truncate max-w-[160px]">{profileEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                        <Phone size={15} className="text-green-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p className="text-sm font-medium text-gray-800">{profilePhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Clock size={15} className="text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Member Since</p>
                        <p className="text-sm font-medium text-gray-800">{mockUser.memberSince}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <motion.div
                key="orders"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.h2 variants={fadeInUp} className="text-lg font-bold text-gray-900">
                  Your Orders
                </motion.h2>
                {mockOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    variants={fadeInUp}
                    whileHover={{ y: -1, transition: { duration: 0.15 } }}
                    className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>
                          <span className="font-semibold text-gray-700 uppercase tracking-wide">Order placed</span>
                          <br />
                          {order.date}
                        </span>
                        <span>
                          <span className="font-semibold text-gray-700 uppercase tracking-wide">Total</span>
                          <br />
                          <span className="text-gray-900 font-bold">${(order.total ?? 0).toFixed(2)}</span>
                        </span>
                        <span className="hidden sm:block">
                          <span className="font-semibold text-gray-700 uppercase tracking-wide">Order #</span>
                          <br />
                          {order.id}
                        </span>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      {(order.items ?? []).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Qty: {item.qty}</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900 flex-shrink-0">
                            ${(item.price ?? 0).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 py-3 border-t border-gray-100 flex gap-3">
                      <button className="text-xs font-medium text-[#FF9900] hover:underline">
                        Track Package
                      </button>
                      <span className="text-gray-200">|</span>
                      <button className="text-xs font-medium text-[#FF9900] hover:underline">
                        Return or Replace Items
                      </button>
                      <span className="text-gray-200">|</span>
                      <button className="text-xs font-medium text-[#FF9900] hover:underline">
                        Write a Review
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <motion.div
                key="wishlist"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.h2 variants={fadeInUp} className="text-lg font-bold text-gray-900">
                  Saved Items ({wishlist.length})
                </motion.h2>
                {wishlist.length === 0 && (
                  <motion.div variants={fadeInUp} className="bg-white rounded-xl border border-black/5 p-12 text-center">
                    <Heart size={40} className="text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Your wishlist is empty.</p>
                    <Link href="/products" className="mt-3 inline-block text-sm text-[#FF9900] hover:underline font-medium">
                      Browse products
                    </Link>
                  </motion.div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={scaleIn}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden flex"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover flex-shrink-0"
                      />
                      <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">{item.name}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <StarRating rating={item.rating} />
                            <span className="text-xs text-gray-400">({(item.reviews ?? 0).toLocaleString("en-US")})</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-base font-bold text-gray-900">
                            ${(item.price ?? 0).toFixed(2)}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-xs bg-[#FF9900] hover:bg-[#e68900] text-white font-semibold px-2.5 py-1 rounded-lg transition-colors duration-200 flex items-center gap-1"
                            >
                              <ShoppingCart size={11} /> Add
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeFromWishlist(item.id)}
                              className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-lg hover:bg-red-50"
                            >
                              <X size={14} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === "addresses" && (
              <motion.div
                key="addresses"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <motion.h2 variants={fadeInUp} className="text-lg font-bold text-gray-900">
                    Your Addresses
                  </motion.h2>
                  <motion.button
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-sm bg-[#FF9900] hover:bg-[#e68900] text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    + Add Address
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockAddresses.map((addr) => (
                    <motion.div
                      key={addr.id}
                      variants={fadeInUp}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      className={`bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border p-5 relative ${
                        addr.default ? "border-[#FF9900]" : "border-black/5"
                      }`}
                    >
                      {addr.default && (
                        <span className="absolute top-3 right-3 text-xs bg-[#FFF3E0] text-[#FF9900] font-bold px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin size={16} className="text-[#FF9900]" />
                        <span className="font-bold text-gray-900 text-sm">{addr.label}</span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">{addr.name}</p>
                      <p className="text-sm text-gray-500">{addr.line1}</p>
                      {addr.line2 && <p className="text-sm text-gray-500">{addr.line2}</p>}
                      <p className="text-sm text-gray-500">
                        {addr.city}, {addr.state} {addr.zip}
                      </p>
                      <p className="text-sm text-gray-500">{addr.country}</p>
                      <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
                        <button className="text-xs text-[#FF9900] hover:underline font-medium">Edit</button>
                        <span className="text-gray-200">|</span>
                        <button className="text-xs text-[#FF9900] hover:underline font-medium">Remove</button>
                        {!addr.default && (
                          <>
                            <span className="text-gray-200">|</span>
                            <button className="text-xs text-[#FF9900] hover:underline font-medium">Set as Default</button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === "payments" && (
              <motion.div
                key="payments"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <motion.h2 variants={fadeInUp} className="text-lg font-bold text-gray-900">
                    Payment Methods
                  </motion.h2>
                  <motion.button
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-sm bg-[#FF9900] hover:bg-[#e68900] text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    + Add Card
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockPayments.map((card) => (
                    <motion.div
                      key={card.id}
                      variants={fadeInUp}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      className={`bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border p-5 ${
                        card.default ? "border-[#FF9900]" : "border-black/5"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-7 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
                            <CreditCard size={14} className="text-white" />
                          </div>
                          <span className="font-bold text-gray-900 text-sm">{card.type}</span>
                        </div>
                        {card.default && (
                          <span className="text-xs bg-[#FFF3E0] text-[#FF9900] font-bold px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 font-mono text-sm tracking-widest">
                        •••• •••• •••• {card.last4}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Expires {card.expiry}</p>
                      <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
                        <button className="text-xs text-[#FF9900] hover:underline font-medium">Edit</button>
                        <span className="text-gray-200">|</span>
                        <button className="text-xs text-[#FF9900] hover:underline font-medium">Remove</button>
                        {!card.default && (
                          <>
                            <span className="text-gray-200">|</span>
                            <button className="text-xs text-[#FF9900] hover:underline font-medium">Set as Default</button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Security note */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3"
                >
                  <Lock size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Your payment information is encrypted and stored securely. ShopNow never stores your full card number on our servers.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.h2 variants={fadeInUp} className="text-lg font-bold text-gray-900">
                  Account Settings
                </motion.h2>

                {/* Profile section */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border border-black/5 p-5"
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-gray-900">Personal Information</h3>
                    <button
                      onClick={() => setEditingProfile((v) => !v)}
                      className="text-sm text-[#FF9900] hover:underline font-medium flex items-center gap-1"
                    >
                      {editingProfile ? <><X size={13} /> Cancel</> : <><Edit size={13} /> Edit</>}
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        disabled={!editingProfile}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors duration-200 ${
                          editingProfile
                            ? "border-[#FF9900] bg-white focus:outline-none focus:ring-2 focus:ring-[#FF9900]/30"
                            : "border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        disabled={!editingProfile}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors duration-200 ${
                          editingProfile
                            ? "border-[#FF9900] bg-white focus:outline-none focus:ring-2 focus:ring-[#FF9900]/30"
                            : "border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        disabled={!editingProfile}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors duration-200 ${
                          editingProfile
                            ? "border-[#FF9900] bg-white focus:outline-none focus:ring-2 focus:ring-[#FF9900]/30"
                            : "border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                        }`}
                      />
                    </div>
                    {editingProfile && (
                      <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setEditingProfile(false)}
                        className="bg-[#FF9900] hover:bg-[#e68900] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center gap-2"
                      >
                        <Check size={14} /> Save Changes
                      </motion.button>
                    )}
                  </div>
                </motion.div>

                {/* Notifications section */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border border-black/5 p-5"
                >
                  <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <Bell size={16} className="text-[#FF9900]" />
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Email Notifications", desc: "Order updates, shipping alerts, and account activity", value: notifEmail, setter: setNotifEmail },
                      { label: "SMS Notifications", desc: "Text messages for delivery updates and security alerts", value: notifSMS, setter: setNotifSMS },
                      { label: "Push Notifications", desc: "Browser and app notifications for real-time updates", value: notifPush, setter: setNotifPush },
                      { label: "Deals and Promotions", desc: "Personalized offers, flash sales, and exclusive discounts", value: notifDeals, setter: setNotifDeals },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => item.setter((v: boolean) => !v)}
                          className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${
                            item.value ? "bg-[#FF9900]" : "bg-gray-200"
                          }`}
                          aria-checked={item.value}
                          role="switch"
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                              item.value ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Security section */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border border-black/5 p-5"
                >
                  <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <Lock size={16} className="text-[#FF9900]" />
                    Security
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Change Password", desc: "Update your account password" },
                      { label: "Two-Factor Authentication", desc: "Add an extra layer of security" },
                      { label: "Login Activity", desc: "Review recent sign-in history" },
                    ].map((item) => (
                      <motion.button
                        key={item.label}
                        whileHover={{ x: 2, transition: { duration: 0.15 } }}
                        className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-[#FF9900]/30 hover:bg-[#FFF3E0]/30 transition-all duration-200 text-left"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Danger zone */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-xl border border-red-100 p-5"
                >
                  <h3 className="font-bold text-red-600 mb-3 text-sm">Danger Zone</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button className="text-sm text-red-500 border border-red-200 hover:bg-red-50 font-medium px-4 py-2 rounded-lg transition-colors duration-200">
                    Delete Account
                  </button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}