"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Globe, Shield, Package, BarChart2, ChevronRight, CheckCircle, Star, Truck, Headphones, ArrowRight, Store, Users, Zap } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

// ─── Static Data ─────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: Globe,
    title: "Reach Millions of Customers",
    description:
      "List your products and instantly reach millions of active shoppers across the country and beyond.",
  },
  {
    icon: DollarSign,
    title: "Competitive Seller Fees",
    description:
      "Keep more of what you earn with transparent, low fees and no hidden charges. Pay only when you sell.",
  },
  {
    icon: TrendingUp,
    title: "Powerful Analytics",
    description:
      "Track sales, monitor performance, and grow your business with our intuitive seller dashboard.",
  },
  {
    icon: Shield,
    title: "Seller Protection",
    description:
      "Our A-to-Z Guarantee and fraud detection tools protect you and your customers every step of the way.",
  },
  {
    icon: Truck,
    title: "Fulfillment by ShopNow",
    description:
      "Let us handle storage, packing, and shipping so you can focus on growing your product catalog.",
  },
  {
    icon: Headphones,
    title: "24/7 Seller Support",
    description:
      "Our dedicated seller support team is available around the clock to help you succeed.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Create Your Account",
    description:
      "Sign up for a free seller account in minutes. Provide your business details and verify your identity.",
  },
  {
    step: "02",
    title: "List Your Products",
    description:
      "Add your products with photos, descriptions, and pricing. Use our bulk upload tool for large catalogs.",
  },
  {
    step: "03",
    title: "Start Selling",
    description:
      "Go live and start receiving orders. Manage everything from your seller dashboard in real time.",
  },
  {
    step: "04",
    title: "Get Paid",
    description:
      "Receive payments directly to your bank account on a regular schedule. Fast, reliable, and transparent.",
  },
];

const PLANS = [
  {
    name: "Individual",
    price: "$0",
    period: "/month",
    description: "Perfect for new sellers just getting started.",
    perSale: "+ $0.99 per sale",
    features: [
      "Up to 40 listings/month",
      "Access to all product categories",
      "Basic seller dashboard",
      "Standard customer support",
      "Manual shipping management",
    ],
    cta: "Start for Free",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$39.99",
    period: "/month",
    description: "For growing businesses ready to scale.",
    perSale: "No per-sale fee",
    features: [
      "Unlimited listings",
      "Advanced analytics & reports",
      "Bulk listing tools",
      "Priority seller support",
      "Fulfillment by ShopNow (FBS)",
      "Sponsored product ads",
      "Custom storefront page",
    ],
    cta: "Start 30-Day Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large-scale operations.",
    perSale: "Volume discounts available",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "API access & integrations",
      "Custom fee structures",
      "White-glove onboarding",
      "SLA-backed support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah K.",
    business: "Handmade Jewelry Co.",
    avatar: "S",
    rating: 5,
    quote:
      "Joining ShopNow was the best decision for my small business. My sales tripled in the first six months and the seller tools are incredibly easy to use.",
  },
  {
    name: "Marcus T.",
    business: "TechGadgets Store",
    avatar: "M",
    rating: 5,
    quote:
      "The Fulfillment by ShopNow service changed everything. I no longer worry about shipping logistics — I just focus on sourcing great products.",
  },
  {
    name: "Priya R.",
    business: "Organic Skincare Brand",
    avatar: "P",
    rating: 5,
    quote:
      "The analytics dashboard gives me insights I never had before. I can see exactly what's selling, when, and to whom. Absolutely invaluable.",
  },
];

const STATS = [
  { value: "300M+", label: "Active Customers" },
  { value: "2M+", label: "Active Sellers" },
  { value: "350M+", label: "Products Listed" },
  { value: "99.9%", label: "Platform Uptime" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${
            s <= rating ? "fill-[#10B981] text-[#10B981]" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SellPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    category: "",
    plan: "professional",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#0F2027] via-[#1A3A4A] to-[#0F2027] text-white overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#10B981]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0EA5E9]/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                <Store className="w-4 h-4" />
                Seller Program
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Grow Your Business
              <br />
              <span className="text-[#10B981]">with {APP_NAME}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto"
            >
              Join over 2 million sellers reaching hundreds of millions of
              customers. Start selling today with zero upfront costs.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <a
                href="#get-started"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold px-8 py-3.5 rounded-lg transition-colors duration-200 text-base shadow-lg"
              >
                Start Selling Today
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#plans"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors duration-200 text-base"
              >
                View Plans
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#10B981]">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-16 sm:py-20 bg-[#F0FDF4]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2027] mb-3">
              Why Sell on {APP_NAME}?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Everything you need to launch, manage, and scale your online
              business — all in one place.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {BENEFITS.map((b) => (
              <motion.div
                key={b.title}
                variants={scaleIn}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-[#10B981]" />
                </div>
                <h3 className="font-bold text-[#0F2027] text-lg mb-2">
                  {b.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2027] mb-3">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Getting started is simple. Follow these four steps and you could
              be making sales within 24 hours.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                className="relative text-center"
              >
                {/* connector line */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-0.5 bg-gradient-to-r from-[#10B981] to-[#0EA5E9]" />
                )}
                <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#0EA5E9] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-white font-extrabold text-lg">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-bold text-[#0F2027] text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Plans ── */}
      <section id="plans" className="py-16 sm:py-20 bg-[#F0FDF4]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2027] mb-3">
              Choose Your Plan
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Flexible plans for every stage of your business. Upgrade or
              downgrade at any time.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          >
            {PLANS.map((plan) => (
              <motion.div
                key={plan.name}
                variants={scaleIn}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-[#0F2027] to-[#1A3A4A] text-white shadow-2xl ring-2 ring-[#10B981]"
                    : "bg-white text-[#0F2027] shadow-sm border border-gray-100"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#10B981] text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`text-xl font-extrabold mb-1 ${
                      plan.highlighted ? "text-white" : "text-[#0F2027]"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      plan.highlighted ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="flex items-end gap-1">
                    <span
                      className={`text-4xl font-extrabold ${
                        plan.highlighted ? "text-[#10B981]" : "text-[#0F2027]"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={`text-sm mb-1 ${
                          plan.highlighted ? "text-white/60" : "text-gray-400"
                        }`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      plan.highlighted ? "text-[#10B981]" : "text-[#059669]"
                    }`}
                  >
                    {plan.perSale}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? "text-[#10B981]" : "text-[#10B981]"
                        }`}
                      />
                      <span
                        className={
                          plan.highlighted ? "text-white/85" : "text-gray-700"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#get-started"
                  className={`block text-center font-bold py-3 rounded-xl transition-colors duration-200 ${
                    plan.highlighted
                      ? "bg-[#10B981] hover:bg-[#059669] text-white"
                      : "bg-[#F0FDF4] hover:bg-[#D1FAE5] text-[#059669] border border-[#10B981]/30"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2027] mb-3">
              What Our Sellers Say
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Thousands of businesses trust {APP_NAME} to power their online
              sales. Here are a few of their stories.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className="bg-[#F0FDF4] rounded-2xl p-6 border border-[#10B981]/20"
              >
                <StarRow rating={t.rating} />
                <p className="text-gray-700 text-sm leading-relaxed mt-4 mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#0EA5E9] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-[#0F2027] text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.business}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Get Started Form ── */}
      <section
        id="get-started"
        className="py-16 sm:py-20 bg-gradient-to-br from-[#0F2027] via-[#1A3A4A] to-[#0F2027]"
      >
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Ready to Start Selling?
            </h2>
            <p className="text-white/70">
              Fill in your details and our seller onboarding team will reach out
              within 24 hours.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl p-10 text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F2027] mb-2">
                Application Received!
              </h3>
              <p className="text-gray-600 mb-6">
                Thanks for your interest in selling on {APP_NAME}. Our team
                will contact you at{" "}
                <span className="font-semibold text-[#0F2027]">
                  {formData.email}
                </span>{" "}
                within 24 hours.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200"
              >
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-2xl space-y-5"
            >
              {/* Business Name */}
              <div>
                <label className="block text-sm font-semibold text-[#0F2027] mb-1.5">
                  Business / Store Name
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Acme Electronics"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F2027] mb-1.5">
                    Email Address
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F2027] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-[#0F2027] mb-1.5">
                  Primary Product Category
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition bg-white"
                >
                  <option value="">Select a category…</option>
                  <option>Electronics</option>
                  <option>Clothing &amp; Fashion</option>
                  <option>Home &amp; Kitchen</option>
                  <option>Books &amp; Media</option>
                  <option>Sports &amp; Outdoors</option>
                  <option>Beauty &amp; Personal Care</option>
                  <option>Toys &amp; Games</option>
                  <option>Jewelry &amp; Accessories</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Plan */}
              <div>
                <label className="block text-sm font-semibold text-[#0F2027] mb-1.5">
                  Preferred Plan
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["individual", "professional", "enterprise"] as const).map(
                    (p) => (
                      <label
                        key={p}
                        className={`flex flex-col items-center justify-center border rounded-lg py-3 px-2 cursor-pointer text-xs font-semibold capitalize transition ${
                          formData.plan === p
                            ? "border-[#10B981] bg-[#F0FDF4] text-[#059669]"
                            : "border-gray-200 text-gray-500 hover:border-[#10B981]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="plan"
                          value={p}
                          checked={formData.plan === p}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {p}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-[#0F2027] mb-1.5">
                  Tell Us About Your Business
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Briefly describe your products, current sales volume, and any questions you have…"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-base"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                By submitting, you agree to our{" "}
                <Link
                  href="/conditions"
                  className="text-[#10B981] hover:underline"
                >
                  Seller Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#10B981] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </motion.form>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 bg-[#F0FDF4] border-t border-[#10B981]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2027] mb-3">
              Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our seller support team is here to help you every step of the
              way.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/help"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200"
              >
                <Headphones className="w-4 h-4" />
                Visit Help Center
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-[#10B981] text-[#059669] hover:bg-[#D1FAE5] font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
              >
                Learn About Us
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
