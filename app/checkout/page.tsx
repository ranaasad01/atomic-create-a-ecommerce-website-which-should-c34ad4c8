"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, CreditCard, Truck, Zap, Clock, ChevronRight, ShieldCheck, Package, AlertCircle, Check, ArrowLeft } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME, APP_ACCENT } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface ShippingForm {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

interface CardForm {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

type DeliverySpeed = "standard" | "express" | "sameday";
type PaymentMethod = "card" | "cod";

// ─── Mock fallback cart ───────────────────────────────────────────────────────

const FALLBACK_CART: CartItem[] = [
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
];

const DELIVERY_OPTIONS = [
  {
    id: "standard" as DeliverySpeed,
    label: "Standard Delivery",
    description: "5–7 business days",
    price: 0,
    badge: "FREE",
    badgeColor: "bg-green-100 text-green-700",
    icon: Truck,
  },
  {
    id: "express" as DeliverySpeed,
    label: "Express Delivery",
    description: "2–3 business days",
    price: 9.99,
    badge: "$9.99",
    badgeColor: "bg-blue-100 text-blue-700",
    icon: Zap,
  },
  {
    id: "sameday" as DeliverySpeed,
    label: "Same-Day Delivery",
    description: "Order before 12 PM",
    price: 19.99,
    badge: "$19.99",
    badgeColor: "bg-orange-100 text-orange-700",
    icon: Clock,
  },
];

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number): string {
  return (n ?? 0).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3 h-3 ${s <= Math.round(rating) ? "text-[#FF9900]" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Field component ──────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  maxLength?: number;
  required?: boolean;
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder = "",
  error,
  type = "text",
  maxLength,
  required = false,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white transition-all duration-200 outline-none
          focus:ring-2 focus:ring-[#FF9900]/40 focus:border-[#FF9900]
          ${error ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
      />
      {error && (
        <span className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3" />
          {error}
        </span>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const router = useRouter();

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Form state
  const [shipping, setShipping] = useState<ShippingForm>({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
  });

  const [delivery, setDelivery] = useState<DeliverySpeed>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("card");

  const [card, setCard] = useState<CardForm>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  // Load cart from localStorage after mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("shopnow-cart");
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
    setCartItems(FALLBACK_CART);
  }, []);

  // ─── Derived totals ──────────────────────────────────────────────────────

  const subtotal = (cartItems ?? []).reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );
  const deliveryOption = DELIVERY_OPTIONS.find((o) => o.id === delivery) ?? DELIVERY_OPTIONS[0];
  const deliveryCost = deliveryOption.price;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryCost + tax;
  const itemCount = (cartItems ?? []).reduce((sum, item) => sum + (item.quantity ?? 1), 0);

  // ─── Validation ──────────────────────────────────────────────────────────

  function validate(): boolean {
    const newErrors: Partial<Record<string, string>> = {};

    if (!shipping.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!shipping.addressLine1.trim()) newErrors.addressLine1 = "Address is required.";
    if (!shipping.city.trim()) newErrors.city = "City is required.";
    if (!shipping.state) newErrors.state = "Please select a state.";
    if (!shipping.zip.trim()) {
      newErrors.zip = "ZIP code is required.";
    } else if (!/^\d{5}(-\d{4})?$/.test(shipping.zip.trim())) {
      newErrors.zip = "Enter a valid ZIP code (e.g. 10001).";
    }
    if (shipping.phone && !/^[\d\s\-\+\(\)]{7,15}$/.test(shipping.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (payment === "card") {
      const rawCard = card.cardNumber.replace(/\s/g, "");
      if (!rawCard) {
        newErrors.cardNumber = "Card number is required.";
      } else if (!/^\d{16}$/.test(rawCard)) {
        newErrors.cardNumber = "Enter a valid 16-digit card number.";
      }
      if (!card.cardName.trim()) newErrors.cardName = "Name on card is required.";
      if (!card.expiry.trim()) {
        newErrors.expiry = "Expiry date is required.";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry.trim())) {
        newErrors.expiry = "Use MM/YY format.";
      }
      if (!card.cvv.trim()) {
        newErrors.cvv = "CVV is required.";
      } else if (!/^\d{3,4}$/.test(card.cvv.trim())) {
        newErrors.cvv = "CVV must be 3–4 digits.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ─── Submit ───────────────────────────────────────────────────────────────

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // Persist order summary for confirmation page
    try {
      const order = {
        items: cartItems,
        shipping,
        delivery: deliveryOption.label,
        payment,
        subtotal,
        deliveryCost,
        tax,
        total,
        orderId: `SNW-${Math.floor(100000 + Math.random() * 900000)}`,
      };
      localStorage.setItem("shopnow-last-order", JSON.stringify(order));
    } catch {
      // ignore
    }

    setTimeout(() => {
      router.push("/confirmation");
    }, 1200);
  }

  // ─── Card number formatter ────────────────────────────────────────────────

  function formatCardNumber(raw: string): string {
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  }

  function formatExpiry(raw: string): string {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      {/* Page header */}
      <div className="bg-[#131921] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1" aria-label={APP_NAME}>
            <span className="text-white font-extrabold text-2xl tracking-tight">shop</span>
            <span className="text-[#FF9900] font-extrabold text-2xl tracking-tight">now</span>
            <span className="text-[#FF9900] text-sm font-bold">.com</span>
          </Link>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <ShieldCheck className="w-4 h-4 text-[#FF9900]" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-4 pt-4 pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/cart" className="hover:text-[#FF9900] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            Cart
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium">Checkout</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-400">Confirmation</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-2xl font-bold text-gray-900 mb-6"
        >
          Checkout
        </motion.h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* ── Left column ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-5">

              {/* ── Section 1: Shipping Address ── */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base">Shipping Address</h2>
                    <p className="text-xs text-gray-500">Where should we deliver your order?</p>
                  </div>
                  <MapPin className="w-5 h-5 text-gray-400 ml-auto" />
                </div>

                <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field
                      label="Full Name"
                      id="fullName"
                      value={shipping.fullName}
                      onChange={(v) => setShipping((s) => ({ ...s, fullName: v }))}
                      placeholder="Jane Doe"
                      error={errors.fullName}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Address Line 1"
                      id="addressLine1"
                      value={shipping.addressLine1}
                      onChange={(v) => setShipping((s) => ({ ...s, addressLine1: v }))}
                      placeholder="123 Main Street"
                      error={errors.addressLine1}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Address Line 2"
                      id="addressLine2"
                      value={shipping.addressLine2}
                      onChange={(v) => setShipping((s) => ({ ...s, addressLine2: v }))}
                      placeholder="Apt, Suite, Unit (optional)"
                    />
                  </div>
                  <Field
                    label="City"
                    id="city"
                    value={shipping.city}
                    onChange={(v) => setShipping((s) => ({ ...s, city: v }))}
                    placeholder="New York"
                    error={errors.city}
                    required
                  />
                  <div className="flex flex-col gap-1">
                    <label htmlFor="state" className="text-sm font-medium text-gray-700">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="state"
                      value={shipping.state}
                      onChange={(e) => setShipping((s) => ({ ...s, state: e.target.value }))}
                      className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white transition-all duration-200 outline-none
                        focus:ring-2 focus:ring-[#FF9900]/40 focus:border-[#FF9900]
                        ${errors.state ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    >
                      <option value="">Select state</option>
                      {US_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <span className="flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.state}
                      </span>
                    )}
                  </div>
                  <Field
                    label="ZIP Code"
                    id="zip"
                    value={shipping.zip}
                    onChange={(v) => setShipping((s) => ({ ...s, zip: v }))}
                    placeholder="10001"
                    error={errors.zip}
                    maxLength={10}
                    required
                  />
                  <Field
                    label="Phone Number"
                    id="phone"
                    value={shipping.phone}
                    onChange={(v) => setShipping((s) => ({ ...s, phone: v }))}
                    placeholder="+1 (555) 000-0000"
                    error={errors.phone}
                    type="tel"
                  />
                </div>
              </motion.div>

              {/* ── Section 2: Delivery Speed ── */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base">Delivery Speed</h2>
                    <p className="text-xs text-gray-500">Choose how fast you want your items.</p>
                  </div>
                  <Truck className="w-5 h-5 text-gray-400 ml-auto" />
                </div>

                <div className="px-6 py-5 flex flex-col gap-3">
                  {DELIVERY_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const selected = delivery === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setDelivery(opt.id)}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border-2 text-left transition-all duration-200
                          ${selected
                            ? "border-[#FF9900] bg-[#FFF8EE]"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                          }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                          ${selected ? "bg-[#FF9900]" : "bg-gray-100"}`}>
                          <Icon className={`w-5 h-5 ${selected ? "text-white" : "text-gray-500"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-semibold text-sm ${selected ? "text-gray-900" : "text-gray-700"}`}>
                              {opt.label}
                            </span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${opt.badgeColor}`}>
                              {opt.badge}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                          ${selected ? "border-[#FF9900] bg-[#FF9900]" : "border-gray-300"}`}>
                          {selected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* ── Section 3: Payment Method ── */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base">Payment Method</h2>
                    <p className="text-xs text-gray-500">All transactions are encrypted and secure.</p>
                  </div>
                  <CreditCard className="w-5 h-5 text-gray-400 ml-auto" />
                </div>

                {/* Toggle */}
                <div className="px-6 pt-5 flex gap-3">
                  {[
                    { id: "card" as PaymentMethod, label: "Credit / Debit Card", icon: CreditCard },
                    { id: "cod" as PaymentMethod, label: "Pay on Delivery", icon: Package },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const selected = payment === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPayment(opt.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200
                          ${selected
                            ? "border-[#FF9900] bg-[#FFF8EE] text-gray-900"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                      >
                        <Icon className={`w-4 h-4 ${selected ? "text-[#FF9900]" : "text-gray-400"}`} />
                        <span className="hidden sm:inline">{opt.label}</span>
                        <span className="sm:hidden">{opt.id === "card" ? "Card" : "COD"}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Card form */}
                {payment === "card" && (
                  <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div className="sm:col-span-2">
                      <Field
                        label="Card Number"
                        id="cardNumber"
                        value={card.cardNumber}
                        onChange={(v) => setCard((c) => ({ ...c, cardNumber: formatCardNumber(v) }))}
                        placeholder="1234 5678 9012 3456"
                        error={errors.cardNumber}
                        maxLength={19}
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Field
                        label="Name on Card"
                        id="cardName"
                        value={card.cardName}
                        onChange={(v) => setCard((c) => ({ ...c, cardName: v }))}
                        placeholder="Jane Doe"
                        error={errors.cardName}
                        required
                      />
                    </div>
                    <Field
                      label="Expiry Date"
                      id="expiry"
                      value={card.expiry}
                      onChange={(v) => setCard((c) => ({ ...c, expiry: formatExpiry(v) }))}
                      placeholder="MM/YY"
                      error={errors.expiry}
                      maxLength={5}
                      required
                    />
                    <Field
                      label="CVV"
                      id="cvv"
                      value={card.cvv}
                      onChange={(v) => setCard((c) => ({ ...c, cvv: v.replace(/\D/g, "").slice(0, 4) }))}
                      placeholder="123"
                      error={errors.cvv}
                      maxLength={4}
                      required
                    />
                    {/* Card logos */}
                    <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                      {["VISA", "MC", "AMEX", "DISC"].map((brand) => (
                        <span
                          key={brand}
                          className="px-2 py-1 rounded border border-gray-200 text-[10px] font-bold text-gray-500 bg-gray-50"
                        >
                          {brand}
                        </span>
                      ))}
                      <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                        256-bit SSL
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* COD info */}
                {payment === "cod" && (
                  <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="px-6 py-5"
                  >
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                      <Package className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-amber-800">Pay on Delivery</p>
                        <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                          Pay in cash when your order arrives. Please have the exact amount ready.
                          A $2.99 handling fee applies to all Pay on Delivery orders.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Mobile: submit button */}
              <div className="lg:hidden">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  className="w-full py-4 rounded-xl bg-[#FF9900] hover:bg-[#e68900] text-white font-bold text-base
                    transition-all duration-200 shadow-[0_2px_8px_rgba(255,153,0,0.35)]
                    disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      Place Order — {formatPrice(total)}
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* ── Right column: Order Summary ── */}
            <div className="w-full lg:w-[360px] flex-shrink-0">
              <div className="lg:sticky lg:top-[80px]">
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900 text-base">
                      Order Summary
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>

                  {/* Items list */}
                  <div className="px-5 py-4 flex flex-col gap-3 max-h-[320px] overflow-y-auto">
                    {(cartItems ?? []).map((item) => (
                      <div key={item.id} className="flex gap-3 items-start">
                        <div className="w-14 h-14 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0 bg-gray-50">
                          <img
                            src={item.image ?? "/images/product-placeholder.jpg"}
                            alt={item.title ?? "Product"}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/product-placeholder.jpg";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug">
                            {item.title ?? "Product"}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity ?? 1}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                          {formatPrice((item.price ?? 0) * (item.quantity ?? 1))}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="px-5 py-4 border-t border-gray-100 flex flex-col gap-2.5">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal ({itemCount} items)</span>
                      <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Delivery</span>
                      <span className={`font-medium ${deliveryCost === 0 ? "text-green-600" : "text-gray-900"}`}>
                        {deliveryCost === 0 ? "FREE" : formatPrice(deliveryCost)}
                      </span>
                    </div>
                    {payment === "cod" && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>COD Handling Fee</span>
                        <span className="font-medium text-gray-900">{formatPrice(2.99)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Estimated Tax (8%)</span>
                      <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2.5 flex justify-between">
                      <span className="font-bold text-gray-900 text-base">Order Total</span>
                      <span className="font-bold text-[#B12704] text-lg">
                        {formatPrice(total + (payment === "cod" ? 2.99 : 0))}
                      </span>
                    </div>
                  </div>

                  {/* Delivery info */}
                  <div className="px-5 pb-4">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-100">
                      <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-green-800">{deliveryOption.label}</p>
                        <p className="text-xs text-green-700">{deliveryOption.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop submit */}
                  <div className="px-5 pb-5 hidden lg:block">
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      className="w-full py-3.5 rounded-xl bg-[#FF9900] hover:bg-[#e68900] text-white font-bold text-sm
                        transition-all duration-200 shadow-[0_2px_8px_rgba(255,153,0,0.35)]
                        disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Placing Order...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          Place Order
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-gray-400 mt-3 leading-relaxed">
                      By placing your order, you agree to ShopNow's{" "}
                      <Link href="/conditions" className="text-[#0066C0] hover:underline">
                        Conditions of Use
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#0066C0] hover:underline">
                        Privacy Notice
                      </Link>
                      .
                    </p>
                  </div>

                  {/* Security badges */}
                  <div className="px-5 pb-5 flex items-center justify-center gap-4 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </motion.div>

                {/* Promo code */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  className="mt-4 bg-white rounded-xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] px-5 py-4"
                >
                  <p className="text-sm font-semibold text-gray-800 mb-2">Promo Code</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      defaultValue=""
                      onChange={() => {}}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm outline-none
                        focus:ring-2 focus:ring-[#FF9900]/40 focus:border-[#FF9900] hover:border-gray-400 transition-all"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-semibold text-gray-700 transition-colors duration-200"
                    >
                      Apply
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}