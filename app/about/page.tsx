"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { APP_NAME, APP_ACCENT } from "@/lib/data";
import { Sparkles, Truck, ShieldCheck, Users, Globe, Heart, Star, ArrowRight, Package, Headphones, Award, TrendingUp } from 'lucide-react';

const STATS = [
  { label: "Products Listed", value: "2.5M+", icon: Package },
  { label: "Happy Customers", value: "18M+", icon: Users },
  { label: "Countries Served", value: "45+", icon: Globe },
  { label: "5-Star Reviews", value: "9.2M+", icon: Star },
];

const VALUES = [
  {
    icon: Truck,
    title: "Fast, Reliable Delivery",
    description:
      "We partner with top logistics providers to ensure your orders arrive on time, every time. Same-day delivery available in select cities.",
  },
  {
    icon: ShieldCheck,
    title: "Buyer Protection",
    description:
      "Shop with confidence. Every purchase is covered by our comprehensive buyer protection policy, including hassle-free returns within 30 days.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is available around the clock via chat, email, and phone to resolve any issue you may have.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "We believe commerce should empower communities. We actively support small businesses and independent sellers on our platform.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description:
      "Every seller on ShopNow is vetted and every product listing is reviewed. We maintain strict quality standards so you only get the best.",
  },
  {
    icon: TrendingUp,
    title: "Seller Growth",
    description:
      "We provide sellers with powerful analytics, marketing tools, and logistics support to help their businesses grow and thrive.",
  },
];

const TIMELINE = [
  {
    year: "2015",
    title: "Founded in Seattle",
    description:
      "ShopNow launched as a small online bookstore with a vision to become the most customer-centric shopping destination on the internet.",
  },
  {
    year: "2017",
    title: "Expanded to Electronics",
    description:
      "We broadened our catalog to include consumer electronics, becoming a one-stop shop for tech enthusiasts across North America.",
  },
  {
    year: "2019",
    title: "Marketplace Opens",
    description:
      "Third-party sellers joined our platform, multiplying our product selection to over 500,000 items and empowering thousands of small businesses.",
  },
  {
    year: "2021",
    title: "International Expansion",
    description:
      "ShopNow expanded into 20 new countries, bringing fast, affordable shopping to millions of new customers around the globe.",
  },
  {
    year: "2023",
    title: "18 Million Customers",
    description:
      "We crossed the milestone of 18 million active customers and launched same-day delivery in 12 major metropolitan areas.",
  },
  {
    year: "2024",
    title: "The Future of Shopping",
    description:
      "Today we continue to innovate with AI-powered recommendations, sustainable packaging initiatives, and an ever-growing product catalog.",
  },
];

const TEAM = [
  {
    name: "Sarah Mitchell",
    role: "Chief Executive Officer",
    image: "/images/team-ceo-sarah-mitchell.jpg",
    bio: "Former VP at a Fortune 500 retailer, Sarah brings 20 years of e-commerce expertise and a passion for customer experience.",
  },
  {
    name: "David Chen",
    role: "Chief Technology Officer",
    image: "/images/team-cto-david-chen.jpg",
    bio: "A Stanford CS graduate, David leads our engineering teams in building the scalable infrastructure that powers millions of daily transactions.",
  },
  {
    name: "Priya Sharma",
    role: "Chief Operations Officer",
    image: "/images/team-coo-priya-sharma.jpg",
    bio: "Priya oversees our global logistics network and fulfillment centers, ensuring every order reaches customers quickly and safely.",
  },
  {
    name: "Marcus Johnson",
    role: "VP of Seller Relations",
    image: "/images/team-vp-marcus-johnson.jpg",
    bio: "Marcus champions our seller community, developing programs that help businesses of all sizes succeed on the ShopNow platform.",
  },
];

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#131921] text-white py-20 md:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #FF9900 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FF9900 0%, transparent 40%)",
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{ color: APP_ACCENT, borderColor: APP_ACCENT + "55" }}
              >
                Our Story
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance mb-6"
            >
              Shopping, Reimagined for{" "}
              <span style={{ color: APP_ACCENT }}>Everyone</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed text-pretty"
            >
              {APP_NAME} was built on a simple belief: every person deserves
              access to a vast selection of quality products at fair prices,
              delivered with speed and care. Since 2015, we have been working
              every day to make that belief a reality.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: APP_ACCENT, color: "#131921" }}
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border border-white/30 hover:border-white/70 transition-all duration-300 hover:scale-105 text-white"
              >
                Sell With Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#232F3E] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  whileHover={{ scale: 1.04 }}
                  className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <Icon size={24} style={{ color: APP_ACCENT }} />
                  <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: APP_ACCENT }}
              >
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#131921] tracking-tight text-balance mb-5">
                To be Earth's most customer-centric marketplace
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We strive to offer our customers the lowest possible prices, the
                best available selection, and the utmost convenience. Every
                decision we make starts with the customer and works backward.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                From the moment you browse to the moment your package arrives at
                your door, we obsess over every detail of your experience. That
                is not just a promise. It is how we operate every single day.
              </p>
              <div className="flex items-center gap-3">
                <Sparkles size={20} style={{ color: APP_ACCENT }} />
                <span className="text-sm font-semibold text-[#131921]">
                  Trusted by 18 million customers worldwide
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div
                className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
                style={{ backgroundColor: APP_ACCENT }}
              />
              <img
                src="/images/about-mission-warehouse.jpg"
                alt="ShopNow fulfillment center with workers packing orders"
                className="relative rounded-2xl w-full object-cover aspect-[4/3] shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-black/5"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: APP_ACCENT }}
            >
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#131921] tracking-tight text-balance">
              Our Core Values
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-white rounded-2xl p-6 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: APP_ACCENT + "18" }}
                  >
                    <Icon size={22} style={{ color: APP_ACCENT }} />
                  </div>
                  <h3 className="text-base font-bold text-[#131921] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: APP_ACCENT }}
            >
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#131921] tracking-tight text-balance">
              A Decade of Growth
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-10"
            >
              {TIMELINE.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    variants={fadeInUp}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md z-10 mt-1" style={{ backgroundColor: APP_ACCENT }} />

                    {/* Content card */}
                    <div
                      className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                      }`}
                    >
                      <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
                        <span
                          className="inline-block text-xs font-extrabold tracking-widest mb-1"
                          style={{ color: APP_ACCENT }}
                        >
                          {item.year}
                        </span>
                        <h3 className="text-base font-bold text-[#131921] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: APP_ACCENT }}
            >
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#131921] tracking-tight text-balance">
              Meet the Team Behind {APP_NAME}
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-pretty leading-relaxed">
              Our leadership team brings together decades of experience in
              e-commerce, technology, logistics, and customer experience.
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
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role} at ${APP_NAME}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#131921] text-sm">
                    {member.name}
                  </h3>
                  <p
                    className="text-xs font-semibold mb-2"
                    style={{ color: APP_ACCENT }}
                  >
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#131921] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, #FF9900 0%, transparent 55%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp}>
              <Sparkles
                size={36}
                className="mx-auto mb-4"
                style={{ color: APP_ACCENT }}
              />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-extrabold text-white tracking-tight text-balance mb-4"
            >
              Ready to start shopping?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-300 leading-relaxed mb-8 text-pretty"
            >
              Join 18 million customers who trust {APP_NAME} for fast delivery,
              unbeatable prices, and a selection that covers everything you need.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-4 flex-wrap"
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:brightness-110"
                style={{ backgroundColor: APP_ACCENT, color: "#131921" }}
              >
                Browse Products <ArrowRight size={16} />
              </Link>
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm border border-white/30 hover:border-white/70 text-white transition-all duration-300 hover:scale-105"
              >
                Create Account
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}