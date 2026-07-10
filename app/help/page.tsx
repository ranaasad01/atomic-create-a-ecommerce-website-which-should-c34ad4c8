"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronRight, Package, RotateCcw, CreditCard, Truck, Shield, MessageCircle, Phone, Mail, Clock, CheckCircle, AlertCircle, HelpCircle, Star, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  faqs: FaqItem[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "orders",
    label: "Orders & Tracking",
    icon: Package,
    color: "text-[#10B981]",
    faqs: [
      {
        question: "How do I track my order?",
        answer:
          "You can track your order by going to Your Orders in your account. Click on the order you want to track and select 'Track Package'. You'll see real-time updates on your shipment's location and estimated delivery date.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "You can cancel or modify your order within 30 minutes of placing it. Go to Your Orders, find the order, and click 'Cancel Items'. After 30 minutes, the order may have already been processed for shipping.",
      },
      {
        question: "What if my order hasn't arrived?",
        answer:
          "If your order is past the estimated delivery date, first check the tracking information. If the package shows as delivered but you haven't received it, check with neighbors and your building's mail area. Contact us if you still can't locate it.",
      },
      {
        question: "How do I reorder a previous purchase?",
        answer:
          "Go to Your Orders, find the item you want to reorder, and click 'Buy Again'. This will add the item to your cart with the same specifications as your previous purchase.",
      },
    ],
  },
  {
    id: "returns",
    label: "Returns & Refunds",
    icon: RotateCcw,
    color: "text-[#10B981]",
    faqs: [
      {
        question: "What is the return policy?",
        answer:
          "Most items can be returned within 30 days of delivery for a full refund. Some categories like electronics have a 15-day return window. Items must be in original condition with all packaging and accessories.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Go to Your Orders, select the item you want to return, and click 'Return or Replace Items'. Follow the prompts to select your reason and preferred return method. You'll receive a prepaid return label via email.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Refunds are typically processed within 3-5 business days after we receive your return. The time it takes to appear in your account depends on your payment method — credit cards usually take 5-7 business days.",
      },
      {
        question: "Can I exchange an item instead of returning it?",
        answer:
          "Yes! During the return process, select 'Replace' instead of 'Return'. We'll ship the replacement item once we receive your return, or in some cases, we'll ship it immediately.",
      },
    ],
  },
  {
    id: "payment",
    label: "Payment & Billing",
    icon: CreditCard,
    color: "text-[#10B981]",
    faqs: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, ShopNow Gift Cards, and bank account transfers. Some items may also be eligible for buy-now-pay-later options.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full card number on our servers. All transactions are processed through PCI-DSS compliant payment processors.",
      },
      {
        question: "Why was my payment declined?",
        answer:
          "Payment declines can happen for several reasons: incorrect card details, insufficient funds, or your bank flagging the transaction. Try re-entering your card details, or contact your bank to authorize the transaction.",
      },
      {
        question: "How do I add or update a payment method?",
        answer:
          "Go to Your Account > Payment Methods. Click 'Add a payment method' to add a new card, or click 'Edit' next to an existing card to update its details.",
      },
    ],
  },
  {
    id: "shipping",
    label: "Shipping & Delivery",
    icon: Truck,
    color: "text-[#10B981]",
    faqs: [
      {
        question: "What are the shipping options?",
        answer:
          "We offer Standard Shipping (5-7 business days, free on orders over $25), Express Shipping (2-3 business days, $9.99), and Same-Day Delivery (order before 12 PM, $19.99, available in select areas).",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by destination. Import duties and taxes may apply and are the responsibility of the recipient.",
      },
      {
        question: "What is free shipping?",
        answer:
          "Orders over $25 qualify for free standard shipping. ShopNow Prime members get free two-day shipping on millions of eligible items with no minimum order amount.",
      },
      {
        question: "Can I change my delivery address after ordering?",
        answer:
          "You can change your delivery address within 30 minutes of placing your order. After that, the order may have already been processed. Contact customer service immediately if you need to change the address.",
      },
    ],
  },
  {
    id: "account",
    label: "Account & Security",
    icon: Shield,
    color: "text-[#10B981]",
    faqs: [
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot Password' on the sign-in page and enter your email address. We'll send you a link to reset your password. The link expires after 24 hours for security purposes.",
      },
      {
        question: "How do I enable two-factor authentication?",
        answer:
          "Go to Your Account > Login & Security > Two-Step Verification. You can set up authentication via SMS, authenticator app, or email. We strongly recommend enabling this for added security.",
      },
      {
        question: "How do I close my account?",
        answer:
          "To close your account, go to Your Account > Account Settings > Close Account. Note that this action is permanent and will delete all your order history, saved addresses, and payment methods.",
      },
      {
        question: "Why am I being asked to verify my identity?",
        answer:
          "We may ask you to verify your identity to protect your account from unauthorized access. This is especially common when signing in from a new device or location.",
      },
    ],
  },
];

const POPULAR_TOPICS = [
  { label: "Track my order", href: "/orders", icon: Package },
  { label: "Return an item", href: "/returns", icon: RotateCcw },
  { label: "Cancel an order", href: "/orders", icon: AlertCircle },
  { label: "Update payment", href: "/account", icon: CreditCard },
  { label: "Change address", href: "/account", icon: Truck },
  { label: "Account security", href: "/account", icon: Shield },
];

const CONTACT_OPTIONS = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with a support agent in real time",
    availability: "Available 24/7",
    action: "Start Chat",
    color: "bg-[#10B981]",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with a customer service representative",
    availability: "Mon–Fri, 8 AM – 10 PM EST",
    action: "Call Now",
    color: "bg-[#0EA5E9]",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a message and we'll respond within 24 hours",
    availability: "Response within 24 hours",
    action: "Send Email",
    color: "bg-[#6366F1]",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200">
      {faqs.map((faq, idx) => (
        <div key={idx} className="py-4">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between text-left gap-4 group"
            aria-expanded={openIndex === idx}
          >
            <span className="font-medium text-[#0F2027] group-hover:text-[#10B981] transition-colors duration-150">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                openIndex === idx ? "rotate-180 text-[#10B981]" : ""
              }`}
            />
          </button>
          {openIndex === idx && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-3 text-gray-600 text-sm leading-relaxed pr-8"
            >
              {faq.answer}
              <div className="mt-3 flex items-center gap-3">
                <span className="text-xs text-gray-400">Was this helpful?</span>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#10B981] transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" /> Yes
                </button>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors">
                  <ThumbsDown className="w-3.5 h-3.5" /> No
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("orders");

  const activeCategoryData = FAQ_CATEGORIES.find((c) => c.id === activeCategory);

  const filteredFaqs = searchQuery.trim()
    ? FAQ_CATEGORIES.flatMap((cat) =>
        cat.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F2027] via-[#1A3A4A] to-[#0F2027] text-white py-16 px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-4">
            <div className="bg-[#10B981]/20 p-4 rounded-full">
              <HelpCircle className="w-10 h-10 text-[#10B981]" />
            </div>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold mb-3"
          >
            How can we help you?
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-gray-300 mb-8 text-lg"
          >
            Search our help center or browse topics below
          </motion.p>

          {/* Search */}
          <motion.form
            variants={scaleIn}
            onSubmit={(e) => e.preventDefault()}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-[#0F2027] text-base focus:outline-none focus:ring-2 focus:ring-[#10B981] shadow-lg"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </motion.form>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Search Results */}
        {searchQuery.trim() ? (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h2 className="text-xl font-bold text-[#0F2027] mb-4">
              {filteredFaqs.length > 0
                ? `${filteredFaqs.length} result${filteredFaqs.length !== 1 ? "s" : ""} for "${searchQuery}"`
                : `No results for "${searchQuery}"`}
            </h2>
            {filteredFaqs.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6">
                <FaqAccordion faqs={filteredFaqs} />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">No articles found matching your search.</p>
                <p className="text-sm text-gray-400">
                  Try different keywords or browse the categories below.
                </p>
              </div>
            )}
          </motion.div>
        ) : null}

        {/* Popular Topics */}
        {!searchQuery.trim() && (
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-xl font-bold text-[#0F2027] mb-4"
            >
              Popular Topics
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {POPULAR_TOPICS.map((topic) => {
                const Icon = topic.icon;
                return (
                  <motion.div key={topic.label} variants={scaleIn}>
                    <Link
                      href={topic.href}
                      className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-[#10B981] hover:shadow-md transition-all duration-200 text-center group"
                    >
                      <div className="bg-[#10B981]/10 p-2.5 rounded-full group-hover:bg-[#10B981]/20 transition-colors">
                        <Icon className="w-5 h-5 text-[#10B981]" />
                      </div>
                      <span className="text-xs font-medium text-[#0F2027] group-hover:text-[#10B981] transition-colors">
                        {topic.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* FAQ Section */}
        {!searchQuery.trim() && (
          <motion.section
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h2 className="text-xl font-bold text-[#0F2027] mb-4">Frequently Asked Questions</h2>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Category Tabs */}
              <div className="md:w-56 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {FAQ_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150 border-l-2 ${
                          isActive
                            ? "border-[#10B981] bg-[#10B981]/5 text-[#10B981]"
                            : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-[#0F2027]"
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#10B981]" : "text-gray-400"}`} />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FAQ Content */}
              <div className="flex-1">
                {activeCategoryData && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6">
                    <div className="py-4 border-b border-gray-100 flex items-center gap-2">
                      <activeCategoryData.icon className="w-5 h-5 text-[#10B981]" />
                      <h3 className="font-semibold text-[#0F2027]">{activeCategoryData.label}</h3>
                    </div>
                    <FaqAccordion faqs={activeCategoryData.faqs} />
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* Contact Support */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xl font-bold text-[#0F2027] mb-4"
          >
            Still need help? Contact us
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CONTACT_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.title}
                  variants={scaleIn}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200"
                >
                  <div className={`${option.color} p-3 rounded-full mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#0F2027] mb-1">{option.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{option.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                    <Clock className="w-3.5 h-3.5" />
                    {option.availability}
                  </div>
                  <button className="bg-[#10B981] hover:bg-[#059669] text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors duration-200 w-full">
                    {option.action}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Quick Links */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xl font-bold text-[#0F2027] mb-4"
          >
            Helpful Resources
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Your Orders", description: "View and manage your order history", href: "/orders", icon: Package },
              { label: "Returns & Refunds", description: "Start a return or check refund status", href: "/returns", icon: RotateCcw },
              { label: "Your Account", description: "Manage profile, addresses, and payment", href: "/account", icon: Shield },
              { label: "Shipping Info", description: "Learn about delivery options and rates", href: "/checkout", icon: Truck },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.href} variants={fadeInUp}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:border-[#10B981] hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="bg-[#10B981]/10 p-2.5 rounded-lg group-hover:bg-[#10B981]/20 transition-colors flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#0F2027] group-hover:text-[#10B981] transition-colors">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{item.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#10B981] transition-colors flex-shrink-0" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Satisfaction Banner */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 bg-gradient-to-r from-[#0F2027] to-[#1A3A4A] rounded-2xl p-8 text-white text-center"
        >
          <CheckCircle className="w-10 h-10 text-[#10B981] mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">We're here to help</h3>
          <p className="text-gray-300 mb-5 max-w-md mx-auto">
            Our customer support team is available around the clock to ensure you have the best shopping experience.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: Star, label: "4.9/5 Customer Rating" },
              { icon: Clock, label: "24/7 Support" },
              { icon: CheckCircle, label: "99% Issue Resolution" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#10B981]" />
                  <span>{stat.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
