"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Lock, Bell, ShoppingCart, Heart, Star, Package, CreditCard, Settings, Edit, Check, X, ChevronRight, Shield, Gift, Truck, AlertCircle } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const MOCK_USER = {
  name: "Alexandra Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 234-7890",
  memberSince: "March 2021",
  avatar: "/images/user-profile-avatar.jpg",
  tier: "Prime Member",
  points: 4820,
  address: {
    line1: "142 Maple Street",
    line2: "Apt 3B",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "United States",
  },
};

const MOCK_ORDERS = [
  {
    id: "ORD-2024-8821",
    date: "Dec 18, 2024",
    status: "Delivered",
    total: 129.99,
    items: 3,
    image: "/images/wireless-noise-cancelling-headphones.jpg",
    product: "Wireless Noise-Cancelling Headphones",
  },
  {
    id: "ORD-2024-8654",
    date: "Dec 10, 2024",
    status: "In Transit",
    total: 54.49,
    items: 2,
    image: "/images/minimalist-leather-watch.jpg",
    product: "Minimalist Leather Watch",
  },
  {
    id: "ORD-2024-8401",
    date: "Nov 29, 2024",
    status: "Delivered",
    total: 239.0,
    items: 1,
    image: "/images/smart-home-speaker.jpg",
    product: "Smart Home Speaker",
  },
  {
    id: "ORD-2024-8102",
    date: "Nov 14, 2024",
    status: "Delivered",
    total: 78.25,
    items: 4,
    image: "/images/kitchen-essentials-set.jpg",
    product: "Kitchen Essentials Set",
  },
];

const MOCK_WISHLIST = [
  {
    id: 1,
    name: "4K Ultra HD Smart TV 55\"",
    price: 499.99,
    rating: 4.6,
    reviews: 2341,
    image: "/images/4k-ultra-hd-smart-tv.jpg",
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 289.0,
    rating: 4.8,
    reviews: 987,
    image: "/images/ergonomic-office-chair.jpg",
  },
  {
    id: 3,
    name: "Stainless Steel Cookware Set",
    price: 149.95,
    rating: 4.5,
    reviews: 1543,
    image: "/images/stainless-steel-cookware-set.jpg",
  },
];

const MOCK_PAYMENT_METHODS = [
  { id: 1, type: "Visa", last4: "4242", expiry: "08/26", isDefault: true },
  { id: 2, type: "Mastercard", last4: "8371", expiry: "03/27", isDefault: false },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, label: "Order updates", enabled: true },
  { id: 2, label: "Promotional emails", enabled: false },
  { id: 3, label: "Price drop alerts", enabled: true },
  { id: 4, label: "New arrivals", enabled: false },
  { id: 5, label: "Review reminders", enabled: true },
];

const STAT_CARDS = [
  { label: "Total Orders", value: "47", icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Wishlist Items", value: "12", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
  { label: "Reward Points", value: "4,820", icon: Gift, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Reviews Given", value: "23", icon: Star, color: "text-purple-500", bg: "bg-purple-50" },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  "In Transit": "bg-blue-100 text-blue-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

type Tab = "overview" | "orders" | "wishlist" | "payments" | "settings";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.round(rating) ? "fill-[#FF9900] text-[#FF9900]" : "text-gray-300"}
        />
      ))}
    </span>
  );
}

export default function AccountProfilePage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    phone: MOCK_USER.phone,
  });
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileSave = () => {
    setEditingProfile(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const toggleNotification = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "overview", label: "Overview", icon: User },
    { key: "orders", label: "Orders", icon: Package },
    { key: "wishlist", label: "Wishlist", icon: Heart },
    { key: "payments", label: "Payments", icon: CreditCard },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <main className="min-h-screen bg-[#EAEDED]">
      {/* Hero banner */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="bg-[#131921] text-white"
      >
        <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col sm:flex-row items-center sm:items-end gap-5">
          {/* Avatar */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative flex-shrink-0"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#FF9900] shadow-lg bg-[#232F3E]">
              <img
                src={MOCK_USER.avatar}
                alt={MOCK_USER.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23232F3E'/%3E%3Ccircle cx='48' cy='36' r='20' fill='%23FF9900'/%3E%3Cellipse cx='48' cy='80' rx='30' ry='20' fill='%23FF9900'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-[#FF9900] text-[#131921] text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
              PRIME
            </span>
          </motion.div>

          {/* Name + meta */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{MOCK_USER.name}</h1>
            <p className="text-[#AAAAAA] text-sm mt-0.5">{MOCK_USER.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs text-[#FF9900] font-semibold">
                <Shield size={13} /> {MOCK_USER.tier}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#AAAAAA]">
                <Gift size={13} /> {MOCK_USER.points.toLocaleString("en-US")} points
              </span>
              <span className="flex items-center gap-1 text-xs text-[#AAAAAA]">
                <Star size={13} /> Member since {MOCK_USER.memberSince}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tab bar */}
      <div className="bg-[#232F3E] sticky top-14 z-30 shadow-md">
        <div className="max-w-[1200px] mx-auto px-4 flex overflow-x-auto scrollbar-hide gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 focus-visible:outline-none ${
                  activeTab === tab.key
                    ? "border-[#FF9900] text-[#FF9900]"
                    : "border-transparent text-[#CCCCCC] hover:text-white hover:border-white/30"
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Stat cards */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {STAT_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    variants={scaleIn}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-black/5 flex flex-col gap-3"
                  >
                    <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                      <Icon size={20} className={card.color} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Profile info + address */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile card */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-black/5 p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-gray-900 text-base">Personal Information</h2>
                  <button
                    onClick={() => setEditingProfile(!editingProfile)}
                    className="flex items-center gap-1.5 text-xs text-[#FF9900] font-semibold hover:underline"
                  >
                    <Edit size={13} /> Edit
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: User, label: "Full Name", field: "name" as const },
                    { icon: Mail, label: "Email", field: "email" as const },
                    { icon: Phone, label: "Phone", field: "phone" as const },
                  ].map(({ icon: Icon, label, field }) => (
                    <div key={field} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={15} className="text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                        {editingProfile ? (
                          <input
                            type="text"
                            value={profileForm[field]}
                            onChange={(e) =>
                              setProfileForm((prev) => ({ ...prev, [field]: e.target.value }))
                            }
                            className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent"
                          />
                        ) : (
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {profileForm[field]}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {editingProfile && (
                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={handleProfileSave}
                      className="flex items-center gap-1.5 bg-[#FF9900] hover:bg-[#e68900] text-[#131921] font-bold text-sm px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <Check size={14} /> Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditingProfile(false);
                        setProfileForm({
                          name: MOCK_USER.name,
                          email: MOCK_USER.email,
                          phone: MOCK_USER.phone,
                        });
                      }}
                      className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </div>
                )}
                {saveSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-xs text-green-600 font-medium flex items-center gap-1"
                  >
                    <Check size={12} /> Profile updated successfully.
                  </motion.p>
                )}
              </motion.div>

              {/* Address card */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-black/5 p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-gray-900 text-base">Default Address</h2>
                  <button className="flex items-center gap-1.5 text-xs text-[#FF9900] font-semibold hover:underline">
                    <Edit size={13} /> Edit
                  </button>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={15} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{MOCK_USER.name}</p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {MOCK_USER.address.line1}
                      {MOCK_USER.address.line2 ? `, ${MOCK_USER.address.line2}` : ""}
                      <br />
                      {MOCK_USER.address.city}, {MOCK_USER.address.state} {MOCK_USER.address.zip}
                      <br />
                      {MOCK_USER.address.country}
                    </p>
                    <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  </div>
                </div>
                <button className="mt-5 w-full text-sm text-[#FF9900] font-semibold border border-[#FF9900]/40 rounded-lg py-2 hover:bg-[#FF9900]/5 transition-colors duration-200">
                  + Add New Address
                </button>
              </motion.div>
            </div>

            {/* Recent orders preview */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-black/5 p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 text-base">Recent Orders</h2>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="flex items-center gap-1 text-xs text-[#FF9900] font-semibold hover:underline"
                >
                  View all <ChevronRight size={13} />
                </button>
              </div>
              <div className="space-y-3">
                {MOCK_ORDERS.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{order.product}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.id} · {order.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-gray-900">${(order.total ?? 0).toFixed(2)}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
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
            <motion.h2 variants={fadeInUp} className="text-xl font-bold text-gray-900">
              Order History
            </motion.h2>
            {MOCK_ORDERS.map((order) => (
              <motion.div
                key={order.id}
                variants={fadeInUp}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-black/5 overflow-hidden"
              >
                {/* Order header */}
                <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Order Placed</p>
                      <p className="text-sm font-semibold text-gray-900">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Total</p>
                      <p className="text-sm font-semibold text-gray-900">${(order.total ?? 0).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Items</p>
                      <p className="text-sm font-semibold text-gray-900">{order.items}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Order ID</p>
                    <p className="text-sm font-mono font-semibold text-gray-700">{order.id}</p>
                  </div>
                </div>

                {/* Order body */}
                <div className="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{order.product}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {order.status}
                      </span>
                      {order.status === "In Transit" && (
                        <span className="flex items-center gap-1 text-xs text-blue-600">
                          <Truck size={12} /> Estimated delivery: Dec 22
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="text-sm text-[#FF9900] font-semibold border border-[#FF9900]/40 rounded-lg px-4 py-1.5 hover:bg-[#FF9900]/5 transition-colors duration-200">
                      Track
                    </button>
                    <button className="text-sm text-gray-600 font-semibold border border-gray-200 rounded-lg px-4 py-1.5 hover:bg-gray-50 transition-colors duration-200">
                      Return
                    </button>
                  </div>
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
            <motion.h2 variants={fadeInUp} className="text-xl font-bold text-gray-900">
              Saved Items
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {MOCK_WISHLIST.map((item) => (
                <motion.div
                  key={item.id}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-black/5 overflow-hidden group"
                >
                  <div className="relative overflow-hidden bg-gray-50 h-44">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='176' viewBox='0 0 200 176'%3E%3Crect width='200' height='176' fill='%23F3F4F6'/%3E%3C/svg%3E";
                      }}
                    />
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-rose-50 transition-colors duration-200">
                      <Heart size={15} className="fill-rose-500 text-rose-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{item.name}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <StarRating rating={item.rating} />
                      <span className="text-xs text-gray-400">({(item.reviews ?? 0).toLocaleString("en-US")})</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-2">${(item.price ?? 0).toFixed(2)}</p>
                    <button className="mt-3 w-full bg-[#FF9900] hover:bg-[#e68900] text-[#131921] font-bold text-sm py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                      <ShoppingCart size={15} /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* PAYMENTS TAB */}
        {activeTab === "payments" && (
          <motion.div
            key="payments"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h2 variants={fadeInUp} className="text-xl font-bold text-gray-900">
              Payment Methods
            </motion.h2>

            <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-4">
              {MOCK_PAYMENT_METHODS.map((pm) => (
                <motion.div
                  key={pm.id}
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-black/5 p-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-md flex items-center justify-center">
                        <CreditCard size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{pm.type} ending in {pm.last4}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Expires {pm.expiry}</p>
                      </div>
                    </div>
                    {pm.isDefault && (
                      <span className="text-xs bg-[#FF9900]/10 text-[#FF9900] font-bold px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="text-xs text-[#FF9900] font-semibold hover:underline">Edit</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-xs text-gray-500 font-semibold hover:underline">Remove</button>
                    {!pm.isDefault && (
                      <>
                        <span className="text-gray-300">|</span>
                        <button className="text-xs text-gray-500 font-semibold hover:underline">Set as Default</button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-black/5 p-5"
            >
              <button className="w-full flex items-center justify-center gap-2 text-sm text-[#FF9900] font-bold border-2 border-dashed border-[#FF9900]/40 rounded-xl py-4 hover:bg-[#FF9900]/5 transition-colors duration-200">
                <CreditCard size={16} /> Add New Payment Method
              </button>
            </motion.div>

            {/* Reward points */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-black/5 p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">ShopNow Reward Points</h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Gift size={24} className="text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-extrabold text-gray-900">
                    {MOCK_USER.points.toLocaleString("en-US")}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">Available points</p>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-[#FF9900] rounded-full"
                      style={{ width: `${Math.min((MOCK_USER.points / 10000) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {(10000 - MOCK_USER.points).toLocaleString("en-US")} points to Gold status
                  </p>
                </div>
              </div>
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
            <motion.h2 variants={fadeInUp} className="text-xl font-bold text-gray-900">
              Account Settings
            </motion.h2>

            {/* Notification preferences */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-black/5 p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <Bell size={18} className="text-[#FF9900]" />
                <h3 className="font-bold text-gray-900">Notification Preferences</h3>
              </div>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">{notif.label}</p>
                    <button
                      onClick={() => toggleNotification(notif.id)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] ${
                        notif.enabled ? "bg-[#FF9900]" : "bg-gray-200"
                      }`}
                      aria-pressed={notif.enabled}
                      aria-label={`Toggle ${notif.label}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                          notif.enabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Security */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-black/5 p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <Lock size={18} className="text-[#FF9900]" />
                <h3 className="font-bold text-gray-900">Security</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Current Password</label>
                  <input
                    type="password"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter current password"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">New Password</label>
                  <input
                    type="password"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter new password"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    value=""
                    onChange={() => {}}
                    placeholder="Confirm new password"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent"
                  />
                </div>
                <button className="bg-[#FF9900] hover:bg-[#e68900] text-[#131921] font-bold text-sm px-5 py-2 rounded-lg transition-colors duration-200">
                  Update Password
                </button>
              </div>
            </motion.div>

            {/* Danger zone */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.1)] border border-red-100 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={18} className="text-red-500" />
                <h3 className="font-bold text-red-600">Danger Zone</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button className="text-sm text-red-600 font-semibold border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50 transition-colors duration-200">
                Delete Account
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}