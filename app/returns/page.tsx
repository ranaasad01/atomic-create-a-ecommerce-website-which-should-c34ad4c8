"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, Package, Truck, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronRight, Search, ArrowRight } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
  question: string;
  answer: string;
}

interface ReturnStep {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RETURN_STEPS: ReturnStep[] = [
  {
    step: 1,
    title: "Start Your Return",
    description: "Go to Your Orders and select the item you want to return. Choose a reason and preferred return method.",
    icon: <Package className="w-6 h-6" />,
  },
  {
    step: 2,
    title: "Pack Your Item",
    description: "Securely pack the item in its original packaging if possible. Include all accessories, manuals, and parts.",
    icon: <RotateCcw className="w-6 h-6" />,
  },
  {
    step: 3,
    title: "Ship It Back",
    description: "Drop off your package at any authorized shipping location. Use the prepaid label we provide for free returns.",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    step: 4,
    title: "Get Your Refund",
    description: "Once we receive and inspect your return, we'll process your refund within 3–5 business days.",
    icon: <CheckCircle className="w-6 h-6" />,
  },
];

const RETURN_POLICIES = [
  {
    category: "Electronics",
    window: "30 days",
    condition: "Unopened or defective",
    notes: "Must include all original accessories and packaging.",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    category: "Clothing & Shoes",
    window: "30 days",
    condition: "Unworn, unwashed, with tags",
    notes: "Items must be in original condition. Swimwear excluded.",
    color: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    category: "Books",
    window: "30 days",
    condition: "Unread, undamaged",
    notes: "Digital content and downloadable software are non-returnable.",
    color: "bg-teal-50 border-teal-200",
    badge: "bg-teal-100 text-teal-700",
  },
  {
    category: "Home & Kitchen",
    window: "30 days",
    condition: "Unused, in original packaging",
    notes: "Hazardous materials and perishables cannot be returned.",
    color: "bg-cyan-50 border-cyan-200",
    badge: "bg-cyan-100 text-cyan-700",
  },
  {
    category: "Jewelry & Watches",
    window: "30 days",
    condition: "Unworn, with tags and certificate",
    notes: "Fine jewelry must be in original condition with all documentation.",
    color: "bg-sky-50 border-sky-200",
    badge: "bg-sky-100 text-sky-700",
  },
  {
    category: "Grocery & Food",
    window: "Non-returnable",
    condition: "N/A",
    notes: "Contact us if your item arrived damaged or defective.",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
  },
];

const FAQS: FaqItem[] = [
  {
    question: "How long do I have to return an item?",
    answer: "Most items can be returned within 30 days of delivery. Some categories like electronics may have shorter windows. Check the product page or your order details for the specific return window.",
  },
  {
    question: "Is return shipping free?",
    answer: "Yes! For most items sold and fulfilled by ShopNow, return shipping is free. We'll provide a prepaid shipping label. Items sold by third-party sellers may have different return shipping policies.",
  },
  {
    question: "How long does it take to get my refund?",
    answer: "Once we receive your return, we'll inspect it and process your refund within 3–5 business days. Refunds to credit cards may take an additional 3–5 business days to appear on your statement.",
  },
  {
    question: "Can I exchange an item instead of returning it?",
    answer: "Currently, we don't offer direct exchanges. To get a different size, color, or item, please return the original item for a refund and place a new order.",
  },
  {
    question: "What if my item arrived damaged or defective?",
    answer: "We're sorry to hear that! If your item arrived damaged or defective, you can return it for a full refund or replacement at no cost to you. Please initiate the return within 30 days of delivery.",
  },
  {
    question: "Can I return a gift?",
    answer: "Yes! You can return a gift even without the order number. Visit our Gift Returns page and enter the order ID from the packing slip, or contact our customer service team for assistance.",
  },
  {
    question: "What items cannot be returned?",
    answer: "The following items are generally non-returnable: digital downloads, gift cards, hazardous materials, perishable goods, and items marked as non-returnable on the product page. Customized or personalized items are also excluded.",
  },
  {
    question: "How do I track my return?",
    answer: "Once you've shipped your return, you can track it using the tracking number on your prepaid label. You'll also receive email updates when we receive and process your return.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150"
            aria-expanded={openIndex === index}
          >
            <span className="font-medium text-[#0F2027] pr-4">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-5 pb-4 bg-white">
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReturnsPage() {
  const [orderSearch, setOrderSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would look up the order
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#0F2027] via-[#1A3A4A] to-[#0F2027] text-white">
        <div className="max-w-5xl mx-auto px-4 py-14 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={fadeInUp} className="flex justify-center">
              <div className="bg-[#10B981]/20 rounded-full p-4">
                <RotateCcw className="w-10 h-10 text-[#10B981]" />
              </div>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold">
              Returns &amp; Replacements
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-300 text-lg max-w-2xl mx-auto">
              Easy, hassle-free returns on most items. Start a return, track your refund, and get help with your order.
            </motion.p>

            {/* Quick Order Search */}
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSearchSubmit}
              className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Enter order number or email…"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-[#0F2027] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 text-sm whitespace-nowrap"
              >
                Find My Order
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Clock className="w-5 h-5" />, label: "30-Day Returns", sub: "On most items" },
              { icon: <Truck className="w-5 h-5" />, label: "Free Return Shipping", sub: "Prepaid label included" },
              { icon: <CheckCircle className="w-5 h-5" />, label: "Fast Refunds", sub: "3–5 business days" },
              { icon: <Package className="w-5 h-5" />, label: "Easy Process", sub: "Just 4 simple steps" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <div className="text-[#10B981]">{stat.icon}</div>
                <p className="font-semibold text-[#0F2027] text-sm">{stat.label}</p>
                <p className="text-gray-500 text-xs">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-14">
        {/* How It Works */}
        <section>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-[#0F2027] mb-8 text-center">
              How Returns Work
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {RETURN_STEPS.map((step) => (
                <motion.div
                  key={step.step}
                  variants={scaleIn}
                  className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-[#10B981]/10 rounded-full p-3 text-[#10B981]">
                      {step.icon}
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#10B981] text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-[#0F2027] mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA — Start a Return */}
        <section className="bg-gradient-to-r from-[#0F2027] to-[#1A3A4A] rounded-2xl p-8 text-white text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl font-bold">
              Ready to Start a Return?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300 max-w-lg mx-auto">
              Go to your orders to initiate a return in just a few clicks. Most returns are processed within 3–5 business days.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/orders"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Go to Your Orders
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 border border-white/20"
              >
                Contact Support
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Return Policies by Category */}
        <section>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-[#0F2027] mb-2">
              Return Policies by Category
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 mb-8">
              Return windows and conditions vary by product category.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RETURN_POLICIES.map((policy) => (
                <motion.div
                  key={policy.category}
                  variants={fadeInUp}
                  className={`rounded-xl border p-5 ${policy.color}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-[#0F2027]">{policy.category}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${policy.badge}`}>
                      {policy.window}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Condition:</span> {policy.condition}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{policy.notes}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Non-Returnable Notice */}
        <section>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4"
          >
            <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Non-Returnable Items</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                The following items cannot be returned: digital downloads, gift cards, hazardous materials,
                perishable goods, customized or personalized items, and any item explicitly marked as
                non-returnable on the product page. If your non-returnable item arrived damaged or defective,
                please contact our support team for assistance.
              </p>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-[#0F2027] mb-2">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 mb-8">
              Everything you need to know about our return process.
            </motion.p>
            <motion.div variants={staggerContainer}>
              <FaqAccordion faqs={FAQS} />
            </motion.div>
          </motion.div>
        </section>

        {/* Help Links */}
        <section>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-[#0F2027] mb-6 text-center">
              Need More Help?
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Track Your Return",
                  description: "Check the status of your return shipment and refund.",
                  href: "/orders",
                  icon: <Package className="w-6 h-6" />,
                },
                {
                  title: "Help Center",
                  description: "Browse articles and guides for common questions.",
                  href: "/help",
                  icon: <AlertCircle className="w-6 h-6" />,
                },
                {
                  title: "Contact Us",
                  description: "Speak with our customer service team directly.",
                  href: "/help",
                  icon: <CheckCircle className="w-6 h-6" />,
                },
              ].map((item) => (
                <motion.div key={item.title} variants={scaleIn}>
                  <Link
                    href={item.href}
                    className="flex flex-col items-center text-center bg-white rounded-xl p-6 border border-gray-200 hover:border-[#10B981] hover:shadow-md transition-all duration-200 group h-full"
                  >
                    <div className="text-[#10B981] mb-3 group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-[#0F2027] mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">{item.description}</p>
                    <span className="inline-flex items-center gap-1 text-[#10B981] text-sm font-medium">
                      Learn more <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
