"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";
import { Newspaper, Calendar, Download, ExternalLink, Mail, Phone, Globe, Award, TrendingUp, Users, Package } from 'lucide-react';

const PRESS_RELEASES = [
  {
    id: 1,
    date: "July 10, 2025",
    category: "Financial Results",
    title: `${APP_NAME} Announces Record Second Quarter 2025 Results`,
    excerpt:
      "Net sales increased 18% to $187.4 billion in the second quarter, compared with $158.9 billion in the second quarter of 2024.",
    href: "/press/q2-2025-results",
  },
  {
    id: 2,
    date: "June 24, 2025",
    category: "Product Launch",
    title: `${APP_NAME} Introduces Next-Generation Same-Day Delivery Network`,
    excerpt:
      "New fulfillment infrastructure enables same-day delivery to 85% of the US population, expanding from 50 major metro areas to over 200 cities.",
    href: "/press/same-day-delivery-expansion",
  },
  {
    id: 3,
    date: "June 12, 2025",
    category: "Sustainability",
    title: `${APP_NAME} Reaches 50% Renewable Energy Milestone Ahead of Schedule`,
    excerpt:
      "The company has achieved its goal of powering 50% of operations with renewable energy three years ahead of its original 2028 target.",
    href: "/press/renewable-energy-milestone",
  },
  {
    id: 4,
    date: "May 30, 2025",
    category: "Partnership",
    title: `${APP_NAME} and Major Brands Launch Exclusive Co-Branded Storefronts`,
    excerpt:
      "New branded storefronts give customers a curated shopping experience directly from top manufacturers including Sony, Nike, and KitchenAid.",
    href: "/press/branded-storefronts",
  },
  {
    id: 5,
    date: "May 15, 2025",
    category: "Community",
    title: `${APP_NAME} Commits $500M to Small Business Support Program`,
    excerpt:
      "The initiative will provide grants, logistics support, and marketing tools to over 100,000 small and medium-sized businesses over the next three years.",
    href: "/press/small-business-program",
  },
  {
    id: 6,
    date: "April 28, 2025",
    category: "Technology",
    title: `${APP_NAME} Unveils AI-Powered Personalized Shopping Assistant`,
    excerpt:
      "The new AI assistant uses advanced machine learning to provide hyper-personalized product recommendations, deal alerts, and shopping guidance.",
    href: "/press/ai-shopping-assistant",
  },
];

const MEDIA_COVERAGE = [
  {
    id: 1,
    outlet: "The Wall Street Journal",
    date: "July 8, 2025",
    title: `How ${APP_NAME} Is Redefining the Future of Retail`,
    href: "#",
  },
  {
    id: 2,
    outlet: "TechCrunch",
    date: "June 30, 2025",
    title: `${APP_NAME}'s Logistics Network Is Now More Advanced Than FedEx`,
    href: "#",
  },
  {
    id: 3,
    outlet: "Forbes",
    date: "June 18, 2025",
    title: `${APP_NAME} Named One of the World's Most Innovative Companies`,
    href: "#",
  },
  {
    id: 4,
    outlet: "Bloomberg",
    date: "June 5, 2025",
    title: `${APP_NAME}'s Market Cap Surpasses $2 Trillion`,
    href: "#",
  },
];

const STATS = [
  { icon: Users, value: "310M+", label: "Active Customers" },
  { icon: Package, value: "350M+", label: "Products Listed" },
  { icon: TrendingUp, value: "$187B", label: "Q2 2025 Revenue" },
  { icon: Award, value: "#1", label: "E-Commerce Platform" },
];

const MEDIA_CONTACTS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "Head of Global Communications",
    email: `press@${APP_NAME.toLowerCase()}.com`,
    phone: "+1 (206) 555-0142",
    region: "Global",
  },
  {
    id: 2,
    name: "James Thornton",
    title: "Senior PR Manager, Americas",
    email: `americas.press@${APP_NAME.toLowerCase()}.com`,
    phone: "+1 (206) 555-0198",
    region: "Americas",
  },
  {
    id: 3,
    name: "Priya Nair",
    title: "Communications Director, APAC",
    email: `apac.press@${APP_NAME.toLowerCase()}.com`,
    phone: "+65 6555 0123",
    region: "Asia Pacific",
  },
];

const BRAND_ASSETS = [
  { id: 1, name: "Logo Pack (SVG + PNG)", size: "2.4 MB", type: "ZIP" },
  { id: 2, name: "Brand Guidelines PDF", size: "8.1 MB", type: "PDF" },
  { id: 3, name: "Executive Headshots", size: "15.3 MB", type: "ZIP" },
  { id: 4, name: "Product Photography", size: "42.7 MB", type: "ZIP" },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#F0F7F4]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F2027] to-[#1A3A4A] text-white py-20 px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <div className="bg-[#10B981]/20 p-4 rounded-full">
              <Newspaper className="w-10 h-10 text-[#10B981]" />
            </div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold mb-4">
            {APP_NAME} Newsroom
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-gray-300 max-w-2xl mx-auto">
            The latest news, press releases, and media resources from {APP_NAME}.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(STATS ?? []).map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <Icon className="w-7 h-7 text-[#10B981]" />
                  </div>
                  <div className="text-2xl font-extrabold text-[#0F2027]">{stat.value ?? ""}</div>
                  <div className="text-sm text-gray-500">{stat.label ?? ""}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl font-bold text-[#0F2027] mb-8"
        >
          Press Releases
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6"
        >
          {(PRESS_RELEASES ?? []).map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-xs font-semibold bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full">
                  {item.category ?? ""}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date ?? ""}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#0F2027] mb-1">{item.title ?? ""}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.excerpt ?? ""}</p>
              <Link
                href={item.href ?? "#"}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#10B981] hover:underline"
              >
                Read Full Release <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Media Coverage */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl font-bold text-[#0F2027] mb-8"
          >
            In the News
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {(MEDIA_COVERAGE ?? []).map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-[#10B981]" />
                  <span className="text-xs font-semibold text-gray-500">{item.outlet ?? ""}</span>
                  <span className="ml-auto text-xs text-gray-400">{item.date ?? ""}</span>
                </div>
                <h3 className="text-base font-bold text-[#0F2027] mb-3">{item.title ?? ""}</h3>
                <Link
                  href={item.href ?? "#"}
                  className="inline-flex items-center gap-1 text-sm text-[#10B981] font-semibold hover:underline"
                >
                  Read Article <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl font-bold text-[#0F2027] mb-8"
        >
          Brand Assets
        </motion.h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {(BRAND_ASSETS ?? []).map((asset) => (
            <motion.div
              key={asset.id}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <Download className="w-8 h-8 text-[#10B981] mb-3" />
              <div className="font-semibold text-[#0F2027] text-sm mb-1">{asset.name ?? ""}</div>
              <div className="text-xs text-gray-400 mb-3">
                {asset.type ?? ""} &bull; {asset.size ?? ""}
              </div>
              <button className="text-xs font-semibold text-white bg-[#10B981] hover:bg-[#059669] px-4 py-1.5 rounded-full transition-colors">
                Download
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Media Contacts */}
      <section className="bg-[#0F2027] text-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8"
          >
            Media Contacts
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(MEDIA_CONTACTS ?? []).map((contact) => (
              <motion.div
                key={contact.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="font-bold text-lg mb-0.5">{contact.name ?? ""}</div>
                <div className="text-sm text-gray-400 mb-3">{contact.title ?? ""}</div>
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                  <Mail className="w-4 h-4 text-[#10B981]" />
                  <a href={`mailto:${contact.email ?? ""}`} className="hover:text-white hover:underline">
                    {contact.email ?? ""}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                  <Phone className="w-4 h-4 text-[#10B981]" />
                  <span>{contact.phone ?? ""}</span>
                </div>
                <div className="mt-2 text-xs font-semibold bg-[#10B981]/20 text-[#10B981] inline-block px-2 py-0.5 rounded-full">
                  {contact.region ?? ""}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
