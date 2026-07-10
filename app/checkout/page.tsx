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
    badgeColor: "bg-teal-100 text-teal-700",
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
          className={`w-3 h-3 ${s <= Math.round(rating) ? "text-[#10B981]" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const steps = [
    { n: 1, label: "Shipping" },
    { n: 2, label: "Payment" },
    { n: 3, label: "Review" },
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, idx) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-200 ${
                step > s.n
                  ? "bg-[#10B981] border-[#10B981] text-white"
                  : step === s.n
                  ? "bg-[#10B981] border-[#10B981] text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {step > s.n ? <Check className="w-4 h-4" /> : s.n}
            </div>
            <span
              className={`text-xs mt-1 font-medium ${
                step >= s.n ? "text-[#10B981]" : "text-gray-400"
              }`}
            >
              {s.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`w-16 sm:w-24 h-0.5 mb-5 mx-1 transition-colors duration-200 ${
                step > s.n ? "bg-[#10B981]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Order Summary Sidebar ────────────────────────────────────────────────────

function OrderSummary({
  items,
  deliveryPrice,
  promoDiscount,
}: {
  items: CartItem[];
  deliveryPrice: number;
  promoDiscount: number;
}) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryPrice + tax - promoDiscount;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
      <h2 className="font-bold text-lg text-[#0F2027] mb-4">Order Summary</h2>

      {/* Items */}
      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/48x48/f3f4f6/9ca3af?text=Img";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-snug">
                {item.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
            </div>
            <span className="text-xs font-semibold text-[#0F2027] flex-shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span className={deliveryPrice === 0 ? "text-[#10B981] font-medium" : ""}>
            {deliveryPrice === 0 ? "FREE" : formatPrice(deliveryPrice)}
          </span>
        </div>
        {promoDiscount > 0 && (
          <div className="flex justify-between text-sm text-[#10B981] font-medium">
            <span>Promo Discount</span>
            <span>-{formatPrice(promoDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Estimated Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-base text-[#0F2027]">
          <span>Order Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
          <span>Secure 256-bit SSL encryption</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Package className="w-4 h-4 text-[#10B981] flex-shrink-0" />
          <span>Free returns within 30 days</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const t = useTranslations();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Shipping
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
  const [shippingErrors, setShippingErrors] = useState<Partial<ShippingForm>>({});

  // Delivery
  const [deliverySpeed, setDeliverySpeed] = useState<DeliverySpeed>("standard");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardForm, setCardForm] = useState<CardForm>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const [cardErrors, setCardErrors] = useState<Partial<CardForm>>({});

  // Promo
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("shopnow-cart");
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        setCartItems(parsed.length > 0 ? parsed : FALLBACK_CART);
      } else {
        setCartItems(FALLBACK_CART);
      }
    } catch {
      setCartItems(FALLBACK_CART);
    }
  }, []);

  const selectedDelivery = DELIVERY_OPTIONS.find((o) => o.id === deliverySpeed)!;

  // ── Validation ──────────────────────────────────────────────────────────────

  function validateShipping(): boolean {
    const errs: Partial<ShippingForm> = {};
    if (!shipping.fullName.trim()) errs.fullName = "Full name is required";
    if (!shipping.addressLine1.trim()) errs.addressLine1 = "Address is required";
    if (!shipping.city.trim()) errs.city = "City is required";
    if (!shipping.state) errs.state = "State is required";
    if (!shipping.zip.trim()) errs.zip = "ZIP code is required";
    else if (!/^\d{5}(-\d{4})?$/.test(shipping.zip.trim())) errs.zip = "Invalid ZIP code";
    if (!shipping.phone.trim()) errs.phone = "Phone number is required";
    setShippingErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateCard(): boolean {
    if (paymentMethod === "cod") return true;
    const errs: Partial<CardForm> = {};
    const raw = cardForm.cardNumber.replace(/\s/g, "");
    if (!raw) errs.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(raw)) errs.cardNumber = "Must be 16 digits";
    if (!cardForm.cardName.trim()) errs.cardName = "Name on card is required";
    if (!cardForm.expiry.trim()) errs.expiry = "Expiry is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardForm.expiry.trim()))
      errs.expiry = "Format: MM/YY";
    if (!cardForm.cvv.trim()) errs.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(cardForm.cvv.trim())) errs.cvv = "3 or 4 digits";
    setCardErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // ── Promo ───────────────────────────────────────────────────────────────────

  function applyPromo() {
    const VALID_CODES: Record<string, number> = {
      SAVE10: 10,
      WELCOME20: 20,
      SHOPNOW15: 15,
    };
    const upper = promoCode.trim().toUpperCase();
    if (VALID_CODES[upper]) {
      setPromoDiscount(VALID_CODES[upper]);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoDiscount(0);
      setPromoApplied(false);
    }
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  function handleContinueShipping() {
    if (validateShipping()) setStep(2);
  }

  function handleContinuePayment() {
    if (validateCard()) setStep(3);
  }

  async function handlePlaceOrder() {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1800));
    try {
      localStorage.removeItem("shopnow-cart");
      window.dispatchEvent(new Event("cart-updated"));
    } catch {
      // ignore
    }
    router.push("/order-confirmation");
  }

  // ── Card number formatter ────────────────────────────────────────────────────

  function formatCardNumber(val: string): string {
    return val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiry(val: string): string {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Header */}
      <div className="bg-[#0F2027] text-white py-4 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            <span className="text-white">shop</span>
            <span className="text-[#10B981]">now</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-sm text-[#10B981] hover:text-[#059669] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        {/* Step indicator */}
        <StepIndicator step={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* ══ STEP 1: SHIPPING ══ */}
            {step === 1 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <MapPin className="w-5 h-5 text-[#10B981]" />
                  <h2 className="font-bold text-lg text-[#0F2027]">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shipping.fullName}
                      onChange={(e) =>
                        setShipping((p) => ({ ...p, fullName: e.target.value }))
                      }
                      placeholder="John Doe"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition ${
                        shippingErrors.fullName ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {shippingErrors.fullName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {shippingErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Address Line 1 */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shipping.addressLine1}
                      onChange={(e) =>
                        setShipping((p) => ({ ...p, addressLine1: e.target.value }))
                      }
                      placeholder="123 Main Street"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition ${
                        shippingErrors.addressLine1 ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {shippingErrors.addressLine1 && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {shippingErrors.addressLine1}
                      </p>
                    )}
                  </div>

                  {/* Address Line 2 */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2 <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={shipping.addressLine2}
                      onChange={(e) =>
                        setShipping((p) => ({ ...p, addressLine2: e.target.value }))
                      }
                      placeholder="Apt, Suite, Unit, etc."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping((p) => ({ ...p, city: e.target.value }))
                      }
                      placeholder="New York"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition ${
                        shippingErrors.city ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {shippingErrors.city && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {shippingErrors.city}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={shipping.state}
                      onChange={(e) =>
                        setShipping((p) => ({ ...p, state: e.target.value }))
                      }
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition bg-white ${
                        shippingErrors.state ? "border-red-400" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select state</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {shippingErrors.state && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {shippingErrors.state}
                      </p>
                    )}
                  </div>

                  {/* ZIP */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shipping.zip}
                      onChange={(e) =>
                        setShipping((p) => ({ ...p, zip: e.target.value }))
                      }
                      placeholder="10001"
                      maxLength={10}
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition ${
                        shippingErrors.zip ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {shippingErrors.zip && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {shippingErrors.zip}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={shipping.phone}
                      onChange={(e) =>
                        setShipping((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+1 (555) 000-0000"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition ${
                        shippingErrors.phone ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {shippingErrors.phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {shippingErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Delivery speed */}
                <div className="mt-6">
                  <h3 className="font-semibold text-sm text-gray-700 mb-3">Delivery Speed</h3>
                  <div className="space-y-2">
                    {DELIVERY_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const selected = deliverySpeed === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDeliverySpeed(opt.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all duration-150 ${
                            selected
                              ? "border-[#10B981] ring-1 ring-[#10B981] bg-emerald-50"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 flex-shrink-0 ${
                              selected ? "text-[#10B981]" : "text-gray-400"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{opt.label}</p>
                            <p className="text-xs text-gray-500">{opt.description}</p>
                          </div>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              opt.id === "standard"
                                ? "bg-green-100 text-green-700"
                                : opt.id === "express"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-teal-100 text-teal-700"
                            }`}
                          >
                            {opt.badge}
                          </span>
                          {selected && (
                            <Check className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={handleContinueShipping}
                  className="mt-6 w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* ══ STEP 2: PAYMENT ══ */}
            {step === 2 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <CreditCard className="w-5 h-5 text-[#10B981]" />
                  <h2 className="font-bold text-lg text-[#0F2027]">Payment Method</h2>
                </div>

                {/* Payment method selector */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {([
                    { id: "card" as PaymentMethod, label: "Credit / Debit Card", icon: CreditCard },
                    { id: "cod" as PaymentMethod, label: "Cash on Delivery", icon: Package },
                  ] as const).map((pm) => {
                    const Icon = pm.icon;
                    const selected = paymentMethod === pm.id;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-150 ${
                          selected
                            ? "border-[#10B981] ring-1 ring-[#10B981] bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            selected ? "text-[#10B981]" : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            selected ? "text-[#10B981]" : "text-gray-600"
                          }`}
                        >
                          {pm.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Card form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardForm.cardNumber}
                        onChange={(e) =>
                          setCardForm((p) => ({
                            ...p,
                            cardNumber: formatCardNumber(e.target.value),
                          }))
                        }
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition font-mono ${
                          cardErrors.cardNumber ? "border-red-400" : "border-gray-300"
                        }`}
                      />
                      {cardErrors.cardNumber && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {cardErrors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardForm.cardName}
                        onChange={(e) =>
                          setCardForm((p) => ({ ...p, cardName: e.target.value }))
                        }
                        placeholder="John Doe"
                        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition ${
                          cardErrors.cardName ? "border-red-400" : "border-gray-300"
                        }`}
                      />
                      {cardErrors.cardName && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {cardErrors.cardName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardForm.expiry}
                          onChange={(e) =>
                            setCardForm((p) => ({
                              ...p,
                              expiry: formatExpiry(e.target.value),
                            }))
                          }
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition ${
                            cardErrors.expiry ? "border-red-400" : "border-gray-300"
                          }`}
                        />
                        {cardErrors.expiry && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {cardErrors.expiry}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardForm.cvv}
                          onChange={(e) =>
                            setCardForm((p) => ({
                              ...p,
                              cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                            }))
                          }
                          placeholder="123"
                          maxLength={4}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition ${
                            cardErrors.cvv ? "border-red-400" : "border-gray-300"
                          }`}
                        />
                        {cardErrors.cvv && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {cardErrors.cvv}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                      <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                      <span>Your payment info is encrypted and never stored on our servers.</span>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
                    <Package className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Cash on Delivery</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Pay with cash when your order arrives. A small COD fee of $2.00 may apply.
                      </p>
                    </div>
                  </div>
                )}

                {/* Promo code */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Promo Code</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter code (e.g. SAVE10)"
                      disabled={promoApplied}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition disabled:bg-gray-50 disabled:text-gray-400"
                    />
                    <button
                      onClick={applyPromo}
                      disabled={promoApplied || !promoCode.trim()}
                      className="px-4 py-2 bg-[#1A3A4A] hover:bg-[#0F2027] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {promoApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {promoError}
                    </p>
                  )}
                  {promoApplied && (
                    <p className="text-xs text-[#10B981] mt-1 flex items-center gap-1 font-medium">
                      <Check className="w-3 h-3" />
                      Promo code applied! You saved ${promoDiscount.toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleContinuePayment}
                    className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    Review Order
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ══ STEP 3: REVIEW ══ */}
            {step === 3 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {/* Shipping summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#10B981]" />
                      <h3 className="font-semibold text-[#0F2027]">Shipping To</h3>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-[#10B981] hover:text-[#059669] font-medium transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">{shipping.fullName}</p>
                  <p className="text-sm text-gray-600">
                    {shipping.addressLine1}
                    {shipping.addressLine2 ? `, ${shipping.addressLine2}` : ""}
                  </p>
                  <p className="text-sm text-gray-600">
                    {shipping.city}, {shipping.state} {shipping.zip}
                  </p>
                  <p className="text-sm text-gray-600">{shipping.country}</p>
                  <p className="text-sm text-gray-600 mt-1">{shipping.phone}</p>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                    {(() => {
                      const Icon = selectedDelivery.icon;
                      return <Icon className="w-4 h-4 text-[#10B981]" />;
                    })()}
                    <span className="text-sm text-gray-700">
                      {selectedDelivery.label} — {selectedDelivery.description}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ml-auto ${
                        selectedDelivery.id === "standard"
                          ? "bg-green-100 text-green-700"
                          : selectedDelivery.id === "express"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-teal-100 text-teal-700"
                      }`}
                    >
                      {selectedDelivery.badge}
                    </span>
                  </div>
                </div>

                {/* Payment summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#10B981]" />
                      <h3 className="font-semibold text-[#0F2027]">Payment</h3>
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-[#10B981] hover:text-[#059669] font-medium transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  {paymentMethod === "card" ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 bg-gradient-to-r from-[#1A3A4A] to-[#0F2027] rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          •••• •••• •••• {cardForm.cardNumber.replace(/\s/g, "").slice(-4) || "????"}
                        </p>
                        <p className="text-xs text-gray-500">{cardForm.cardName || "Cardholder"}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-[#10B981]" />
                      <p className="text-sm text-gray-700">Cash on Delivery</p>
                    </div>
                  )}
                </div>

                {/* Items summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-[#0F2027] mb-3">Items in Your Order</h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center">
                        <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "https://placehold.co/56x56/f3f4f6/9ca3af?text=Img";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 line-clamp-2">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-semibold text-[#0F2027] flex-shrink-0">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Place order */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {placing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Placing Order…
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Place Order
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By placing your order, you agree to {APP_NAME}&apos;s{" "}
                  <Link href="/conditions" className="text-[#10B981] hover:underline">
                    Conditions of Use
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#10B981] hover:underline">
                    Privacy Notice
                  </Link>
                  .
                </p>
              </motion.div>
            )}
          </div>

          {/* ── Right column: Order Summary ── */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={cartItems}
              deliveryPrice={selectedDelivery.price}
              promoDiscount={promoDiscount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
