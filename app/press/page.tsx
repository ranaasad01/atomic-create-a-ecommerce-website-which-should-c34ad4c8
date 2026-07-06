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
import { APP_NAME } from "@/lib/data";
import { FileText, Download, Mail, Calendar, ArrowRight, ExternalLink, Award, TrendingUp, Users, Globe } from 'lucide-react';

const pressReleases = [
  {
    id: 1,
    date: "December 10, 2024",
    category: "Company News",
    title: `${APP_NAME} Surpasses 50 Million Active Customers Worldwide`,
    summary:
      "ShopNow announces a major milestone as its global customer base crosses 50 million active shoppers, driven by rapid expansion in Southeast Asia and Latin America.",
    pdfUrl: "#",
    featured: true,
  },
  {
    id: 2,
    date: "November 22, 2024",
    category: "Product Launch",
    title: "ShopNow Launches Same-Day Delivery in 30 New Cities",
    summary:
      "Expanding its logistics network, ShopNow now offers same-day delivery to customers in 30 additional metropolitan areas, bringing the total to over 120 cities globally.",
    pdfUrl: "#",
    featured: true,
  },
  {
    id: 3,
    date: "October 15, 2024",
    category: "Sustainability",
    title: "ShopNow Commits to Carbon-Neutral Shipping by 2026",
    summary:
      "As part of its Green Commerce Initiative, ShopNow pledges to offset 100% of carbon emissions from all deliveries within two years, partnering with leading environmental organizations.",
    pdfUrl: "#",
    featured: false,
  },
  {
    id: 4,
    date: "September 8, 2024",
    category: "Financial Results",
    title: "ShopNow Reports Record Q3 2024 Revenue of $4.2 Billion",
    summary:
      "Third-quarter results show a 34% year-over-year revenue increase, with strong performance across electronics, home goods, and the ShopNow Prime membership program.",
    pdfUrl: "#",
    featured: false,
  },
  {
    id: 5,
    date: "August 3, 2024",
    category: "Partnership",
    title: "ShopNow Partners with 10,000 Small Businesses in Rural Communities",
    summary:
      "The ShopNow Local initiative onboards thousands of independent sellers from underserved regions, providing them with logistics, marketing, and payment infrastructure.",
    pdfUrl: "#",
    featured: false,
  },
  {
    id: 6,
    date: "July 19, 2024",
    category: "Technology",
    title: "ShopNow Introduces AI-Powered Personalized Shopping Assistant",
    summary:
      "The new ShopNow AI assistant uses advanced machine learning to deliver hyper-personalized product recommendations, reducing search time by an average of 60%.",
    pdfUrl: "#",
    featured: false,
  },
];

const mediaCoverage = [
  {
    id: 1,
    outlet: "The Wall Street Journal",
    logo: "/images/press-wsj-logo.jpg",
    headline: "ShopNow Is Quietly Becoming the World's Most Trusted Marketplace",
    date: "November 2024",
    url: "#",
  },
  {
    id: 2,
    outlet: "TechCrunch",
    logo: "/images/press-techcrunch-logo.jpg",
    headline: "How ShopNow's Logistics Tech Is Rewriting the Rules of E-Commerce",
    date: "October 2024",
    url: "#",
  },
  {
    id: 3,
    outlet: "Forbes",
    logo: "/images/press-forbes-logo.jpg",
    headline: "ShopNow Named One of the World's Most Innovative Companies 2024",
    date: "September 2024",
    url: "#",
  },
  {
    id: 4,
    outlet: "Bloomberg",
    logo: "/images/press-bloomberg-logo.jpg",
    headline: "ShopNow's Seller Program Empowers a New Generation of Entrepreneurs",
    date: "August 2024",
    url: "#",
  },
];

const awards = [
  {
    id: 1,
    year: "2024",
    title: "Best E-Commerce Platform",
    org: "Global Retail Awards",
    icon: Award,
  },
  {
    id: 2,
    year: "2024",
    title: "Top 10 Most Innovative Companies",
    org: "Forbes",
    icon: TrendingUp,
  },
  {
    id: 3,
    year: "2023",
    title: "Customer Experience Excellence",
    org: "CX World Awards",
    icon: Users,
  },
  {
    id: 4,
    year: "2023",
    title: "Best Global Marketplace",
    org: "E-Commerce Europe",
    icon: Globe,
  },
];

const stats = [
  { label: "Active Customers", value: "50M+", sub: "worldwide" },
  { label: "Seller Partners", value: "2.4M+", sub: "independent businesses" },
  { label: "Countries Served", value: "48", sub: "and growing" },
  { label: "Daily Orders", value: "3.8M", sub: "on average" },
];

const categoryColors: Record<string, string> = {
  "Company News": "bg-blue-100 text-blue-800",
  "Product Launch": "bg-green-100 text-green-800",
  Sustainability: "bg-emerald-100 text-emerald-800",
  "Financial Results": "bg-purple-100 text-purple-800",
  Partnership: "bg-orange-100 text-orange-800",
  Technology: "bg-cyan-100 text-cyan-800",
};

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#F3F4F6]">
      {/* Hero */}
      <section className="bg-[#131921] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-block bg-[#FF9900]/20 text-[#FF9900] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#FF9900]/30">
                Newsroom
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5 text-balance"
            >
              {APP_NAME} Press Center
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed text-pretty"
            >
              The latest news, announcements, and media resources from ShopNow. For press
              inquiries, contact our communications team directly.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:press@shopnow.com"
                className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#e68900] text-[#131921] font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Mail size={18} />
                Contact Press Team
              </a>
              <a
                href="#press-kit"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition-all duration-200"
              >
                <Download size={18} />
                Download Press Kit
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#232F3E] text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={scaleIn} className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-[#FF9900]">{stat.value}</span>
                <span className="text-sm font-semibold text-white mt-1">{stat.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{stat.sub}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10"
        >
          <h2 className="text-2xl font-extrabold text-[#131921] tracking-tight">
            Press Releases
          </h2>
          <p className="text-gray-500 mt-1 text-sm">Official announcements from ShopNow</p>
        </motion.div>

        {/* Featured releases */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {pressReleases
            .filter((r) => r.featured)
            .map((release) => (
              <motion.article
                key={release.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 p-6 flex flex-col gap-3 cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      categoryColors[release.category] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {release.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={12} />
                    {release.date}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#131921] leading-snug group-hover:text-[#FF9900] transition-colors duration-200">
                  {release.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{release.summary}</p>
                <a
                  href={release.pdfUrl}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF9900] hover:text-[#e68900] transition-colors duration-150 mt-1"
                >
                  <FileText size={14} />
                  Read Full Release
                  <ArrowRight size={13} />
                </a>
              </motion.article>
            ))}
        </motion.div>

        {/* All other releases */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-3"
        >
          {pressReleases
            .filter((r) => !r.featured)
            .map((release) => (
              <motion.article
                key={release.id}
                variants={fadeInUp}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                className="bg-white rounded-xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 group cursor-pointer"
              >
                <div className="flex-shrink-0 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
                    <Calendar size={12} />
                    {release.date}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full hidden sm:inline-block ${
                      categoryColors[release.category] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {release.category}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#131921] group-hover:text-[#FF9900] transition-colors duration-200 leading-snug">
                    {release.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{release.summary}</p>
                </div>
                <a
                  href={release.pdfUrl}
                  className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-[#FF9900] hover:text-[#e68900] transition-colors duration-150"
                >
                  <Download size={13} />
                  PDF
                </a>
              </motion.article>
            ))}
        </motion.div>
      </section>

      {/* Media Coverage */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <h2 className="text-2xl font-extrabold text-[#131921] tracking-tight">
              In the News
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              What leading publications are saying about ShopNow
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {mediaCoverage.map((item) => (
              <motion.a
                key={item.id}
                href={item.url}
                variants={scaleIn}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="flex gap-4 items-start bg-[#F9FAFB] hover:bg-[#FFF8EE] border border-black/5 rounded-xl p-5 transition-colors duration-200 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-white border border-black/5 shadow-sm">
                  <img
                    src={item.logo}
                    alt={item.outlet}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-[#FF9900] uppercase tracking-wide">
                      {item.outlet}
                    </span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#131921] leading-snug group-hover:text-[#FF9900] transition-colors duration-200">
                    {item.headline}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400 mt-2">
                    Read article <ExternalLink size={11} />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10"
        >
          <h2 className="text-2xl font-extrabold text-[#131921] tracking-tight">
            Awards and Recognition
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Industry honors that reflect our commitment to customers and innovation
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {awards.map((award) => {
            const Icon = award.icon;
            return (
              <motion.div
                key={award.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] p-5 flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF3D6] flex items-center justify-center">
                  <Icon size={22} className="text-[#FF9900]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#FF9900] mb-1">{award.year}</p>
                  <p className="text-sm font-bold text-[#131921] leading-snug">{award.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{award.org}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Press Kit + Contact */}
      <section id="press-kit" className="bg-[#131921] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={slideInLeft}>
              <h2 className="text-2xl font-extrabold tracking-tight mb-4">
                Press Kit and Brand Assets
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Download our official press kit including logos, brand guidelines, executive
                headshots, product screenshots, and approved boilerplate copy for use in
                publications and media.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "High-resolution logos (SVG, PNG)",
                  "Brand color palette and typography guide",
                  "Executive team headshots",
                  "Product and app screenshots",
                  "Company fact sheet and boilerplate",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#e68900] text-[#131921] font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Download size={18} />
                Download Full Press Kit
              </a>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="bg-[#232F3E] rounded-2xl border border-white/10 p-7"
            >
              <h3 className="text-lg font-bold mb-1">Media Inquiries</h3>
              <p className="text-gray-400 text-sm mb-5">
                Our communications team responds to all press inquiries within one business day.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Press Contact
                  </p>
                  <p className="text-white font-semibold text-sm">Sarah Mitchell</p>
                  <p className="text-gray-400 text-xs">Head of Global Communications</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Email</p>
                  <a
                    href="mailto:press@shopnow.com"
                    className="text-[#FF9900] hover:underline text-sm font-medium"
                  >
                    press@shopnow.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Phone</p>
                  <p className="text-white text-sm">+1 (800) 555-0192</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Hours</p>
                  <p className="text-white text-sm">Monday to Friday, 9am to 6pm EST</p>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                    Follow Our Newsroom
                  </p>
                  <div className="flex gap-3">
                    {["Twitter / X", "LinkedIn", "RSS Feed"].map((channel) => (
                      <a
                        key={channel}
                        href="#"
                        className="text-xs text-gray-300 hover:text-[#FF9900] transition-colors duration-150 underline underline-offset-2"
                      >
                        {channel}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Back to home */}
      <div className="max-w-5xl mx-auto px-4 py-8 flex justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#FF9900] transition-colors duration-150 font-medium"
        >
          <ArrowRight size={14} className="rotate-180" />
          Back to ShopNow Home
        </Link>
      </div>
    </main>
  );
}