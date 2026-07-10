"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { Users, Globe, Truck, Shield, Award, Heart, Zap, Star, ArrowRight, CheckCircle, Package, Headphones } from 'lucide-react';

const STATS = [
  { label: "Happy Customers", value: "200M+", icon: Users },
  { label: "Countries Served", value: "180+", icon: Globe },
  { label: "Products Listed", value: "350M+", icon: Package },
  { label: "Daily Deliveries", value: "5M+", icon: Truck },
];

const VALUES = [
  {
    icon: Heart,
    title: "Customer Obsession",
    description:
      "We start with the customer and work backwards. Every decision we make is guided by what's best for the people we serve.",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description:
      "We embrace new ideas and technologies to continuously improve the shopping experience and deliver more value.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "We protect every transaction with industry-leading security, ensuring your data and payments are always safe.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards — from product quality to delivery speed to customer support.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "With operations in 180+ countries, we connect buyers and sellers across the world seamlessly.",
  },
  {
    icon: Headphones,
    title: "Always Here",
    description:
      "Our 24/7 customer support team is always ready to help — by chat, phone, or email, whenever you need us.",
  },
];

const TIMELINE = [
  {
    year: "2010",
    title: "Founded",
    description: "ShopNow was founded with a simple mission: make online shopping fast, easy, and affordable for everyone.",
  },
  {
    year: "2013",
    title: "1 Million Customers",
    description: "We reached our first million customers and expanded our product catalog to over 10 million items.",
  },
  {
    year: "2016",
    title: "Global Expansion",
    description: "ShopNow launched in 50 new countries, bringing fast delivery and competitive pricing to a global audience.",
  },
  {
    year: "2019",
    title: "Same-Day Delivery",
    description: "We introduced same-day delivery in major cities, setting a new standard for e-commerce logistics.",
  },
  {
    year: "2022",
    title: "100M Customers",
    description: "ShopNow surpassed 100 million active customers worldwide, cementing our place as a global leader.",
  },
  {
    year: "2024",
    title: "AI-Powered Shopping",
    description: "We launched AI-driven personalization and smart recommendations, making discovery effortless.",
  },
];

const TEAM = [
  {
    name: "Alexandra Chen",
    role: "Chief Executive Officer",
    avatar: "AC",
    bio: "20+ years in e-commerce and technology leadership. Former VP at two Fortune 500 companies.",
  },
  {
    name: "Marcus Johnson",
    role: "Chief Technology Officer",
    avatar: "MJ",
    bio: "Engineering leader with deep expertise in distributed systems, AI, and platform scalability.",
  },
  {
    name: "Priya Sharma",
    role: "Chief Operations Officer",
    avatar: "PS",
    bio: "Supply chain and logistics expert who built our global fulfillment network from the ground up.",
  },
  {
    name: "David Park",
    role: "Chief Marketing Officer",
    avatar: "DP",
    bio: "Brand strategist and growth marketer who has scaled customer acquisition across 180+ markets.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#0F2027] via-[#1A3A4A] to-[#0F2027] text-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#10B981]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 py-24 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-sm font-semibold px-4 py-1.5 rounded-full"
            >
              <Star className="w-4 h-4" />
              Our Story
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
            >
              Shopping,{" "}
              <span className="text-[#10B981]">Reimagined</span>
              <br />
              for Everyone
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-lg text-white/75 leading-relaxed"
            >
              ShopNow was built on a single belief: everyone deserves access to the world's best
              products at fair prices, delivered fast. We've spent over a decade making that
              belief a reality for 200 million customers worldwide.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-7 py-3 rounded-lg transition-colors duration-200"
              >
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3 rounded-lg border border-white/20 transition-colors duration-200"
              >
                Join Our Team
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-14">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-[#10B981]" />
                </div>
                <p className="text-3xl font-extrabold text-[#0F2027]">{stat.value}</p>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="max-w-[1200px] mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-6"
          >
            <span className="text-[#10B981] font-semibold text-sm uppercase tracking-widest">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2027] leading-tight">
              Connecting People with Products They Love
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We believe commerce should be simple, transparent, and empowering. Our platform
              connects millions of buyers with trusted sellers, offering an unmatched selection
              at prices that make sense.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From a single book sold in a garage to 350 million products shipped worldwide,
              our mission has never changed: be the most customer-centric company on Earth.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Free & fast delivery on millions of items",
                "Easy 30-day returns, no questions asked",
                "Secure payments with buyer protection",
                "24/7 customer support, always available",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#0F2027] to-[#1A3A4A] rounded-3xl p-8 text-white flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#10B981]" />
                </div>
                <div>
                  <p className="font-bold text-lg">Rated #1 E-Commerce Platform</p>
                  <p className="text-white/60 text-sm">by Global Retail Index 2024</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Seller Satisfaction", value: "98%" },
                  { label: "On-Time Delivery", value: "99.2%" },
                  { label: "Customer Rating", value: "4.9/5" },
                  { label: "Return Rate", value: "< 2%" },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white/10 rounded-xl p-4">
                    <p className="text-2xl font-extrabold text-[#10B981]">{kpi.value}</p>
                    <p className="text-white/70 text-xs mt-1">{kpi.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-xs">
                Data sourced from independent third-party audits and customer surveys, 2024.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <span className="text-[#10B981] font-semibold text-sm uppercase tracking-widest">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2027] mt-2">
              Our Core Values
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              These principles guide every product decision, every hire, and every customer
              interaction at ShopNow.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeInUp}
                className="bg-[#F3F3F3] rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-[#10B981]" />
                </div>
                <h3 className="font-bold text-[#0F2027] text-lg">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-[1200px] mx-auto px-4 py-20">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-12"
        >
          <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-widest">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2027] mt-2">
            A Decade of Growth
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#10B981] to-[#3B82F6] hidden md:block" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-10"
          >
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={item.year}
                variants={idx % 2 === 0 ? slideInLeft : slideInRight}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <p className="text-[#10B981] font-bold text-sm mb-1">{item.year}</p>
                  <h3 className="font-extrabold text-[#0F2027] text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#3B82F6] items-center justify-center flex-shrink-0 shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <span className="text-[#10B981] font-semibold text-sm uppercase tracking-widest">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2027] mt-2">
              Meet the Team
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Experienced leaders united by a passion for building the world's best shopping
              experience.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TEAM.map((member) => (
              <motion.div
                key={member.name}
                variants={scaleIn}
                className="bg-[#F3F3F3] rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10B981] to-[#3B82F6] flex items-center justify-center text-white font-extrabold text-xl">
                  {member.avatar}
                </div>
                <div>
                  <p className="font-bold text-[#0F2027]">{member.name}</p>
                  <p className="text-[#10B981] text-sm font-medium">{member.role}</p>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-[#0F2027] via-[#1A3A4A] to-[#0F2027] py-20">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col items-center gap-6"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight"
            >
              Ready to Start Shopping?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/70 max-w-lg text-lg">
              Join 200 million customers who trust ShopNow for the best deals, fastest delivery,
              and unbeatable selection.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors duration-200"
              >
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/20 transition-colors duration-200"
              >
                Contact Support
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
