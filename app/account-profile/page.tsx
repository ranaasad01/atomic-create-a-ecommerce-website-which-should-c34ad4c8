"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Lock, Bell, CreditCard, Shield, Camera, Check, ChevronRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
}

interface AddressForm {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NotificationSettings {
  orderUpdates: boolean;
  promotions: boolean;
  newArrivals: boolean;
  priceDrops: boolean;
  newsletter: boolean;
  smsAlerts: boolean;
}

type ActiveTab = "profile" | "address" | "security" | "notifications" | "payment";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SAVED_CARDS = [
  { id: 1, type: "Visa", last4: "4242", expiry: "08/27", isDefault: true },
  { id: 2, type: "Mastercard", last4: "8888", expiry: "03/26", isDefault: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}

function FormField({
  label,
  id,
  children,
  required,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200";

// ─── Tab: Profile ─────────────────────────────────────────────────────────────

function ProfileTab() {
  const [form, setForm] = useState<ProfileForm>({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 234-5678",
    birthDate: "1990-06-15",
    gender: "prefer-not",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <SectionHeader
        title="Personal Information"
        description="Update your personal details and how we can reach you."
      />

      {/* Avatar */}
      <div className="flex items-center gap-5 mb-8 p-4 bg-[#F0FDF4] rounded-xl border border-[#10B981]/20">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#10B981] to-[#0F2027] flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {form.firstName[0]}{form.lastName[0]}
          </div>
          <button
            type="button"
            className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#10B981] rounded-full flex items-center justify-center shadow-md hover:bg-[#059669] transition-colors"
            aria-label="Change avatar"
          >
            <Camera className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{form.firstName} {form.lastName}</p>
          <p className="text-sm text-gray-500">{form.email}</p>
          <button
            type="button"
            className="text-xs text-[#10B981] hover:text-[#059669] font-medium mt-1 transition-colors"
          >
            Change photo
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="First Name" id="firstName" required>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Last Name" id="lastName" required>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Email Address" id="email" required>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`${inputClass} pl-9`}
            />
          </div>
        </FormField>

        <FormField label="Phone Number" id="phone">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`${inputClass} pl-9`}
            />
          </div>
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Date of Birth" id="birthDate">
            <input
              id="birthDate"
              type="date"
              value={form.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Gender" id="gender">
            <select
              id="gender"
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className={inputClass}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
          </FormField>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold rounded-md transition-colors duration-200 flex items-center gap-2"
          >
            {saved ? (
              <><Check className="w-4 h-4" /> Saved!</>
            ) : (
              "Save Changes"
            )}
          </button>
          <button
            type="button"
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Tab: Address ─────────────────────────────────────────────────────────────

function AddressTab() {
  const [form, setForm] = useState<AddressForm>({
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B",
    city: "San Francisco",
    state: "California",
    zip: "94102",
    country: "United States",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof AddressForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <SectionHeader
        title="Default Shipping Address"
        description="This address will be pre-filled at checkout for faster ordering."
      />

      <div className="flex items-start gap-3 p-4 bg-[#F0FDF4] border border-[#10B981]/30 rounded-lg mb-6">
        <MapPin className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-800">Current default address</p>
          <p className="text-sm text-gray-600 mt-0.5">
            {form.addressLine1}{form.addressLine2 ? `, ${form.addressLine2}` : ""}, {form.city}, {form.state} {form.zip}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <FormField label="Address Line 1" id="addressLine1" required>
          <input
            id="addressLine1"
            type="text"
            value={form.addressLine1}
            onChange={(e) => handleChange("addressLine1", e.target.value)}
            placeholder="Street address, P.O. box"
            className={inputClass}
          />
        </FormField>

        <FormField label="Address Line 2" id="addressLine2">
          <input
            id="addressLine2"
            type="text"
            value={form.addressLine2}
            onChange={(e) => handleChange("addressLine2", e.target.value)}
            placeholder="Apartment, suite, unit, building, floor, etc."
            className={inputClass}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FormField label="City" id="city" required>
            <input
              id="city"
              type="text"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="State" id="state" required>
            <input
              id="state"
              type="text"
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="ZIP Code" id="zip" required>
            <input
              id="zip"
              type="text"
              value={form.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Country" id="country" required>
          <select
            id="country"
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className={inputClass}
          >
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
            <option>Germany</option>
            <option>France</option>
          </select>
        </FormField>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold rounded-md transition-colors duration-200 flex items-center gap-2"
          >
            {saved ? (
              <><Check className="w-4 h-4" /> Saved!</>
            ) : (
              "Save Address"
            )}
          </button>
          <button
            type="button"
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Tab: Security ────────────────────────────────────────────────────────────

function SecurityTab() {
  const [form, setForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof PasswordForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSaved(true);
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setSaved(false), 3000);
  };

  const passwordStrength = (pwd: string): { label: string; color: string; width: string } => {
    if (pwd.length === 0) return { label: "", color: "bg-gray-200", width: "w-0" };
    if (pwd.length < 6) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
    if (pwd.length < 10) return { label: "Fair", color: "bg-yellow-500", width: "w-2/4" };
    if (pwd.length < 14) return { label: "Good", color: "bg-[#10B981]", width: "w-3/4" };
    return { label: "Strong", color: "bg-[#059669]", width: "w-full" };
  };

  const strength = passwordStrength(form.newPassword);

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <SectionHeader
        title="Password & Security"
        description="Keep your account secure by using a strong, unique password."
      />

      <div className="flex items-start gap-3 p-4 bg-[#F0FDF4] border border-[#10B981]/30 rounded-lg mb-6">
        <Shield className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-800">Two-factor authentication</p>
          <p className="text-sm text-gray-600 mt-0.5">Add an extra layer of security to your account.</p>
          <button className="text-xs text-[#10B981] hover:text-[#059669] font-medium mt-1.5 transition-colors">
            Enable 2FA →
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-5 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-2 p-3 bg-[#F0FDF4] border border-[#10B981]/30 rounded-lg mb-5 text-sm text-[#059669]">
          <Check className="w-4 h-4 flex-shrink-0" />
          Password updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <FormField label="Current Password" id="currentPassword" required>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="currentPassword"
              type={showCurrent ? "text" : "password"}
              value={form.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              className={`${inputClass} pl-9 pr-10`}
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowCurrent((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showCurrent ? "Hide password" : "Show password"}
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </FormField>

        <FormField label="New Password" id="newPassword" required>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="newPassword"
              type={showNew ? "text" : "password"}
              value={form.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              className={`${inputClass} pl-9 pr-10`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNew((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {form.newPassword.length > 0 && (
            <div className="mt-2">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Strength: <span className="font-medium">{strength.label}</span></p>
            </div>
          )}
        </FormField>

        <FormField label="Confirm New Password" id="confirmPassword" required>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className={`${inputClass} pl-9 pr-10`}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </FormField>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold rounded-md transition-colors duration-200"
          >
            Update Password
          </button>
          <button
            type="button"
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Tab: Notifications ───────────────────────────────────────────────────────

function NotificationsTab() {
  const [settings, setSettings] = useState<NotificationSettings>({
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    priceDrops: true,
    newsletter: false,
    smsAlerts: true,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const notificationItems: Array<{ key: keyof NotificationSettings; label: string; description: string }> = [
    { key: "orderUpdates", label: "Order Updates", description: "Shipping, delivery, and return status notifications" },
    { key: "promotions", label: "Promotions & Deals", description: "Exclusive offers, flash sales, and discount codes" },
    { key: "newArrivals", label: "New Arrivals", description: "Be the first to know about new products in your categories" },
    { key: "priceDrops", label: "Price Drop Alerts", description: "Get notified when items in your wishlist go on sale" },
    { key: "newsletter", label: "Weekly Newsletter", description: "Curated picks, tips, and shopping guides" },
    { key: "smsAlerts", label: "SMS Alerts", description: "Text message notifications for critical order updates" },
  ];

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <SectionHeader
        title="Notification Preferences"
        description="Choose how and when you want to hear from us."
      />

      <div className="space-y-4">
        {notificationItems.map(({ key, label, description }) => (
          <div
            key={key}
            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-[#10B981]/40 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            </div>
            <button
              type="button"
              onClick={() => toggle(key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 ${
                settings[key] ? "bg-[#10B981]" : "bg-gray-200"
              }`}
              role="switch"
              aria-checked={settings[key]}
              aria-label={label}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  settings[key] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold rounded-md transition-colors duration-200 flex items-center gap-2"
        >
          {saved ? (
            <><Check className="w-4 h-4" /> Saved!</>
          ) : (
            "Save Preferences"
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Tab: Payment ─────────────────────────────────────────────────────────────

function PaymentTab() {
  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <SectionHeader
        title="Payment Methods"
        description="Manage your saved cards and payment options."
      />

      <div className="space-y-3 mb-6">
        {SAVED_CARDS.map((card) => (
          <div
            key={card.id}
            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
              card.isDefault
                ? "border-[#10B981] bg-[#F0FDF4]"
                : "border-gray-200 bg-white hover:border-[#10B981]/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-gradient-to-br from-[#0F2027] to-[#1A3A4A] rounded flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {card.type} ending in {card.last4}
                </p>
                <p className="text-xs text-gray-500">Expires {card.expiry}</p>
              </div>
              {card.isDefault && (
                <span className="text-xs bg-[#10B981] text-white px-2 py-0.5 rounded-full font-medium">
                  Default
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!card.isDefault && (
                <button className="text-xs text-[#10B981] hover:text-[#059669] font-medium transition-colors">
                  Set default
                </button>
              )}
              <button className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full py-3 border-2 border-dashed border-[#10B981]/40 rounded-lg text-sm text-[#10B981] hover:border-[#10B981] hover:bg-[#F0FDF4] transition-all duration-200 font-medium flex items-center justify-center gap-2"
      >
        <CreditCard className="w-4 h-4" />
        Add New Payment Method
      </button>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AccountProfilePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");

  const tabs: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: "profile", label: "Personal Info", icon: <User className="w-4 h-4" /> },
    { id: "address", label: "Address", icon: <MapPin className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "payment", label: "Payment", icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Page header */}
      <div className="bg-[#0F2027] text-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4"
          >
            <motion.div
              variants={scaleIn}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10B981] to-[#1A3A4A] flex items-center justify-center text-white text-2xl font-bold shadow-lg"
            >
              AJ
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h1 className="text-2xl font-bold">Alex Johnson</h1>
              <p className="text-[#10B981] text-sm mt-0.5">alex.johnson@email.com</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded-full border border-[#10B981]/30">
                  Prime Member
                </span>
                <span className="text-xs text-gray-400">Member since 2021</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#10B981] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/account" className="hover:text-[#10B981] transition-colors">Account</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium">Profile Settings</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar tabs */}
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-all duration-150 ${
                    idx !== 0 ? "border-t border-gray-100" : ""
                  } ${
                    activeTab === tab.id
                      ? "bg-[#F0FDF4] text-[#10B981] border-l-4 border-l-[#10B981]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#10B981]"
                  }`}
                >
                  <span className={activeTab === tab.id ? "text-[#10B981]" : "text-gray-400"}>
                    {tab.icon}
                  </span>
                  {tab.label}
                  {activeTab === tab.id && (
                    <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#10B981]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Quick links */}
            <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Links</p>
              <div className="space-y-2">
                {[
                  { label: "Your Orders", href: "/orders" },
                  { label: "Shopping Cart", href: "/cart" },
                  { label: "Order History", href: "/order-history" },
                  { label: "Help Center", href: "/help" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#10B981] transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main panel */}
          <main className="flex-1 bg-white rounded-xl border border-gray-200 p-6 shadow-sm min-h-[500px]">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "address" && <AddressTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "payment" && <PaymentTab />}
          </main>
        </div>
      </div>
    </div>
  );
}
