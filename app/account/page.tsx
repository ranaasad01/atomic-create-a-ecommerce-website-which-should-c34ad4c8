"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Package, Heart, MapPin, CreditCard, Bell, Shield, LogOut, ChevronRight, Star, Truck, RotateCcw, Edit2, Check, Camera } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 234-5678",
  memberSince: "March 2021",
  avatar: "AJ",
  prime: true,
  addresses: [
    {
      id: 1,
      label: "Home",
      default: true,
      line1: "742 Evergreen Terrace",
      line2: "",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      country: "United States",
    },
    {
      id: 2,
      label: "Work",
      default: false,
      line1: "100 Industrial Ave, Suite 400",
      line2: "Floor 4",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "United States",
    },
  ],
  paymentMethods: [
    { id: 1, type: "Visa", last4: "4242", expiry: "08/27", default: true },
    { id: 2, type: "Mastercard", last4: "8888", expiry: "12/26", default: false },
  ],
};

const RECENT_ORDERS = [
  {
    id: "112-3456789-0123456",
    date: "July 8, 2025",
    status: "Delivered",
    statusColor: "text-green-600",
    total: 189.99,
    items: [
      {
        id: 1,
        title: "Apple AirPods Pro (2nd Generation)",
        image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
        price: 189.99,
        qty: 1,
      },
    ],
  },
  {
    id: "113-9876543-2109876",
    date: "June 25, 2025",
    status: "Delivered",
    statusColor: "text-green-600",
    total: 219.94,
    items: [
      {
        id: 2,
        title: "Kindle Paperwhite (16 GB)",
        image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
        price: 139.99,
        qty: 1,
      },
      {
        id: 3,
        title: "Instant Pot Duo 7-in-1",
        image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
        price: 79.95,
        qty: 1,
      },
    ],
  },
  {
    id: "114-1122334-4556677",
    date: "June 10, 2025",
    status: "Delivered",
    statusColor: "text-green-600",
    total: 699.99,
    items: [
      {
        id: 4,
        title: 'Samsung 65" 4K QLED Smart TV',
        image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
        price: 699.99,
        qty: 1,
      },
    ],
  },
];

const WISHLIST_ITEMS = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 279.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 12847,
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    inStock: true,
  },
  {
    id: 2,
    title: "Ninja AF101 Air Fryer 4 Quart",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviewCount: 41230,
    image: "https://m.media-amazon.com/images/I/71+8uTMDRFL.jpg",
    inStock: true,
  },
  {
    id: 3,
    title: "Levi's Men's 501 Original Fit Jeans",
    price: 39.99,
    originalPrice: 69.5,
    rating: 4.5,
    reviewCount: 23456,
    image: "https://static.wikia.nocookie.net/shingekinokyojin/images/b/b1/Levi_Ackermann_%28Anime%29_character_image.png/revision/latest?cb=20231105181307",
    inStock: false,
  },
];

const SIDEBAR_SECTIONS = [
  { id: "overview", label: "Account Overview", icon: User },
  { id: "orders", label: "Your Orders", icon: Package },
  { id: "wishlist", label: "Wish List", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payment", label: "Payment Methods", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Login & Security", icon: Shield },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rate }: { rate: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
          <polygon
            points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
            fill={i < Math.round(rate) ? "#10B981" : "#D1D5DB"}
          />
        </svg>
      ))}
    </div>
  );
}

// ─── Section: Overview ────────────────────────────────────────────────────────

function OverviewSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  const quickLinks = [
    { id: "orders", icon: Package, label: "Your Orders", desc: "Track, return, or buy again", color: "bg-blue-50 text-blue-600" },
    { id: "wishlist", icon: Heart, label: "Wish List", desc: "Items you've saved", color: "bg-pink-50 text-pink-600" },
    { id: "addresses", icon: MapPin, label: "Addresses", desc: "Manage delivery addresses", color: "bg-emerald-50 text-emerald-600" },
    { id: "payment", icon: CreditCard, label: "Payment", desc: "Cards and payment options", color: "bg-purple-50 text-purple-600" },
    { id: "notifications", icon: Bell, label: "Notifications", desc: "Email and push preferences", color: "bg-yellow-50 text-yellow-600" },
    { id: "security", icon: Shield, label: "Security", desc: "Password and 2FA settings", color: "bg-red-50 text-red-600" },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Profile card */}
      <motion.div variants={fadeInUp} className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-5">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#10B981] to-[#0891B2] flex items-center justify-center text-white text-2xl font-bold">
              {MOCK_USER.avatar}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
              <Camera className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-gray-900">{MOCK_USER.name}</h2>
              {MOCK_USER.prime && (
                <span className="bg-gradient-to-r from-[#0F2027] to-[#1A3A4A] text-white text-xs font-bold px-2 py-0.5 rounded">
                  prime
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-0.5">{MOCK_USER.email}</p>
            <p className="text-gray-400 text-xs mt-1">Member since {MOCK_USER.memberSince}</p>
          </div>
          <button className="flex-shrink-0 flex items-center gap-1.5 text-sm text-[#10B981] hover:text-[#059669] font-medium transition-colors">
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
      </motion.div>

      {/* Quick links grid */}
      <motion.div variants={fadeInUp}>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Account Settings</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-[#10B981] hover:shadow-sm transition-all duration-200 group"
            >
              <div className={`w-10 h-10 rounded-lg ${link.color} flex items-center justify-center mb-3`}>
                <link.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-gray-800 group-hover:text-[#10B981] transition-colors">{link.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Recent order */}
      <motion.div variants={fadeInUp} className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">Recent Order</h3>
          <button onClick={() => onNavigate("orders")} className="text-sm text-[#10B981] hover:text-[#059669] font-medium transition-colors">
            View all orders
          </button>
        </div>
        {RECENT_ORDERS[0] && (
          <div className="flex items-center gap-4">
            <img
              src={RECENT_ORDERS[0].items[0].image}
              alt={RECENT_ORDERS[0].items[0].title}
              className="w-16 h-16 object-contain rounded-lg border border-gray-100 bg-gray-50"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/64x64?text=Item"; }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{RECENT_ORDERS[0].items[0].title}</p>
              <p className="text-xs text-gray-500 mt-0.5">Order #{RECENT_ORDERS[0].id}</p>
              <p className="text-xs text-gray-400">{RECENT_ORDERS[0].date}</p>
            </div>
            <span className="text-sm font-semibold text-green-600 flex-shrink-0">{RECENT_ORDERS[0].status}</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Section: Orders ──────────────────────────────────────────────────────────

function OrdersSection() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Your Orders</h2>
        <Link href="/orders" className="text-sm text-[#10B981] hover:text-[#059669] font-medium transition-colors">
          View full history
        </Link>
      </motion.div>

      {RECENT_ORDERS.map((order) => (
        <motion.div key={order.id} variants={fadeInUp} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Order header */}
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-1">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Order Placed</p>
              <p className="text-sm font-medium text-gray-800">{order.date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
              <p className="text-sm font-medium text-gray-800">${order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="ml-auto">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Order #</p>
              <p className="text-xs font-mono text-gray-600">{order.id}</p>
            </div>
          </div>

          {/* Order items */}
          <div className="p-5 space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain rounded-lg border border-gray-100 bg-gray-50 flex-shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/64x64?text=Item"; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">Qty: {item.qty}</p>
                  <p className={`text-sm font-semibold mt-1 ${order.statusColor}`}>{order.status}</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button className="text-xs bg-[#10B981] hover:bg-[#059669] text-white px-3 py-1.5 rounded-lg font-medium transition-colors">
                    Buy again
                  </button>
                  <Link href="/product-detail" className="text-xs border border-gray-300 hover:border-[#10B981] text-gray-600 hover:text-[#10B981] px-3 py-1.5 rounded-lg font-medium transition-colors text-center">
                    View item
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Order actions */}
          <div className="border-t border-gray-100 px-5 py-3 flex flex-wrap gap-3">
            <button className="flex items-center gap-1.5 text-sm text-[#10B981] hover:text-[#059669] font-medium transition-colors">
              <Truck className="w-4 h-4" />
              Track package
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors">
              <RotateCcw className="w-4 h-4" />
              Return or replace
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Section: Wishlist ────────────────────────────────────────────────────────

function WishlistSection() {
  const [wishlist, setWishlist] = useState(WISHLIST_ITEMS);

  const removeItem = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
      <motion.div variants={fadeInUp}>
        <h2 className="text-xl font-bold text-gray-900">Wish List</h2>
        <p className="text-sm text-gray-500 mt-0.5">{wishlist.length} items saved</p>
      </motion.div>

      {wishlist.length === 0 ? (
        <motion.div variants={fadeInUp} className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Your wish list is empty</p>
          <Link href="/products" className="mt-4 inline-block text-sm text-[#10B981] hover:text-[#059669] font-medium transition-colors">
            Start shopping
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <motion.div key={item.id} variants={scaleIn} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-44 object-contain bg-gray-50 p-4"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/200x176?text=Product"; }}
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </button>
                {!item.inStock && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-500">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">{item.title}</p>
                <StarRating rate={item.rating} />
                <p className="text-xs text-gray-400 mt-0.5">{item.reviewCount.toLocaleString("en-US")} reviews</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-base font-bold text-gray-900">${item.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                </div>
                <button
                  disabled={!item.inStock}
                  className="mt-3 w-full bg-[#10B981] hover:bg-[#059669] disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                >
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Section: Addresses ───────────────────────────────────────────────────────

function AddressesSection() {
  const [addresses, setAddresses] = useState(MOCK_USER.addresses);

  const setDefault = (id: number) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, default: a.id === id })));
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Your Addresses</h2>
        <button className="flex items-center gap-1.5 text-sm bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Add address
        </button>
      </motion.div>

      {addresses.map((addr) => (
        <motion.div key={addr.id} variants={fadeInUp} className={`bg-white rounded-xl border-2 p-5 transition-colors ${
          addr.default ? "border-[#10B981]" : "border-gray-200"
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <MapPin className={`w-5 h-5 mt-0.5 flex-shrink-0 ${addr.default ? "text-[#10B981]" : "text-gray-400"}`} />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-800">{addr.label}</p>
                  {addr.default && (
                    <span className="text-xs bg-[#10B981]/10 text-[#10B981] font-semibold px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{addr.line1}</p>
                {addr.line2 && <p className="text-sm text-gray-600">{addr.line2}</p>}
                <p className="text-sm text-gray-600">{addr.city}, {addr.state} {addr.zip}</p>
                <p className="text-sm text-gray-600">{addr.country}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button className="text-xs text-[#10B981] hover:text-[#059669] font-medium transition-colors">Edit</button>
              {!addr.default && (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  Set default
                </button>
              )}
              {!addr.default && (
                <button className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">Remove</button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Section: Payment ─────────────────────────────────────────────────────────

function PaymentSection() {
  const [methods, setMethods] = useState(MOCK_USER.paymentMethods);

  const setDefault = (id: number) => {
    setMethods((prev) => prev.map((m) => ({ ...m, default: m.id === id })));
  };

  const cardBrandColor: Record<string, string> = {
    Visa: "bg-blue-600",
    Mastercard: "bg-red-600",
    Amex: "bg-green-700",
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
        <button className="flex items-center gap-1.5 text-sm bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Add card
        </button>
      </motion.div>

      {methods.map((method) => (
        <motion.div key={method.id} variants={fadeInUp} className={`bg-white rounded-xl border-2 p-5 transition-colors ${
          method.default ? "border-[#10B981]" : "border-gray-200"
        }`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-8 rounded ${cardBrandColor[method.type] ?? "bg-gray-600"} flex items-center justify-center`}>
                <span className="text-white text-xs font-bold">{method.type.slice(0, 2).toUpperCase()}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-800">{method.type} ending in {method.last4}</p>
                  {method.default && (
                    <span className="text-xs bg-[#10B981]/10 text-[#10B981] font-semibold px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Expires {method.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!method.default && (
                <button
                  onClick={() => setDefault(method.id)}
                  className="text-xs text-[#10B981] hover:text-[#059669] font-medium transition-colors"
                >
                  Set default
                </button>
              )}
              {method.default && <Check className="w-5 h-5 text-[#10B981]" />}
              {!method.default && (
                <button className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">Remove</button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Section: Notifications ───────────────────────────────────────────────────

function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    orderUpdates: true,
    promotions: false,
    newArrivals: true,
    priceDrops: true,
    newsletter: false,
    sms: false,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notifItems: Array<{ key: keyof typeof prefs; label: string; desc: string }> = [
    { key: "orderUpdates", label: "Order Updates", desc: "Shipping, delivery, and return notifications" },
    { key: "promotions", label: "Promotions & Deals", desc: "Exclusive offers and flash sales" },
    { key: "newArrivals", label: "New Arrivals", desc: "Be first to know about new products" },
    { key: "priceDrops", label: "Price Drop Alerts", desc: "Get notified when wish list items go on sale" },
    { key: "newsletter", label: "Newsletter", desc: "Weekly curated picks and tips" },
    { key: "sms", label: "SMS Notifications", desc: "Text alerts for orders and deals" },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
      <motion.div variants={fadeInUp}>
        <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
        <p className="text-sm text-gray-500 mt-0.5">Choose how you'd like to be notified</p>
      </motion.div>

      <motion.div variants={fadeInUp} className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {notifItems.map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-gray-800">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
            <button
              onClick={() => toggle(key)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                prefs[key] ? "bg-[#10B981]" : "bg-gray-200"
              }`}
              role="switch"
              aria-checked={prefs[key]}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  prefs[key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeInUp}>
        <button className="bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors">
          Save preferences
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Section: Security ────────────────────────────────────────────────────────

function SecuritySection() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    phone: MOCK_USER.phone,
    password: "••••••••••",
  });

  const fields: Array<{ key: keyof typeof formValues; label: string; type: string }> = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "phone", label: "Phone Number", type: "tel" },
    { key: "password", label: "Password", type: "password" },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
      <motion.div variants={fadeInUp}>
        <h2 className="text-xl font-bold text-gray-900">Login &amp; Security</h2>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account credentials</p>
      </motion.div>

      <motion.div variants={fadeInUp} className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {fields.map(({ key, label, type }) => (
          <div key={key} className="flex items-center justify-between px-5 py-4 gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
              {editingField === key ? (
                <input
                  type={type}
                  defaultValue={formValues[key]}
                  className="mt-1 w-full text-sm border border-[#10B981] rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#10B981]/30"
                  onChange={(e) => setFormValues((prev) => ({ ...prev, [key]: e.target.value }))}
                />
              ) : (
                <p className="text-sm font-medium text-gray-800 mt-0.5 truncate">
                  {key === "password" ? "••••••••••" : formValues[key]}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {editingField === key ? (
                <>
                  <button
                    onClick={() => setEditingField(null)}
                    className="text-xs bg-[#10B981] hover:bg-[#059669] text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingField(null)}
                    className="text-xs border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditingField(key)}
                  className="text-xs text-[#10B981] hover:text-[#059669] font-medium transition-colors"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* 2FA */}
      <motion.div variants={fadeInUp} className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security to your account</p>
            </div>
          </div>
          <button className="flex-shrink-0 text-sm bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Enable 2FA
          </button>
        </div>
      </motion.div>

      {/* Danger zone */}
      <motion.div variants={fadeInUp} className="bg-white rounded-xl border border-red-200 p-5">
        <h3 className="text-sm font-semibold text-red-600 mb-3">Danger Zone</h3>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-800">Delete Account</p>
            <p className="text-xs text-gray-500 mt-0.5">Permanently delete your account and all data</p>
          </div>
          <button className="flex-shrink-0 text-sm border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors">
            Delete account
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <OverviewSection onNavigate={setActiveSection} />;
      case "orders": return <OrdersSection />;
      case "wishlist": return <WishlistSection />;
      case "addresses": return <AddressesSection />;
      case "payment": return <PaymentSection />;
      case "notifications": return <NotificationsSection />;
      case "security": return <SecuritySection />;
      default: return <OverviewSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-[#0F2027] text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10B981] to-[#0891B2] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {MOCK_USER.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hello, {MOCK_USER.name.split(" ")[0]}</h1>
              <p className="text-gray-300 text-sm mt-0.5">{MOCK_USER.email}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-60 flex-shrink-0">
            <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-20">
              {SIDEBAR_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${
                    activeSection === section.id
                      ? "bg-[#10B981]/10 text-[#10B981] border-r-2 border-[#10B981]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <section.icon className="w-4 h-4 flex-shrink-0" />
                  {section.label}
                  {activeSection === section.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              ))}

              <div className="border-t border-gray-100">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left">
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  Sign Out
                </button>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {renderSection()}
          </main>
        </div>
      </div>
    </div>
  );
}
