"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { Briefcase, MapPin, Clock, ChevronRight, Search, Users, Globe, Heart, Zap, Award, Coffee, Laptop, Shield, TrendingUp, Star } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  { id: "all", label: "All Teams" },
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design" },
  { id: "product", label: "Product" },
  { id: "operations", label: "Operations" },
  { id: "marketing", label: "Marketing" },
  { id: "finance", label: "Finance" },
  { id: "hr", label: "People & HR" },
];

const LOCATIONS = [
  { id: "all", label: "All Locations" },
  { id: "seattle", label: "Seattle, WA" },
  { id: "nyc", label: "New York, NY" },
  { id: "sf", label: "San Francisco, CA" },
  { id: "austin", label: "Austin, TX" },
  { id: "remote", label: "Remote" },
];

const JOBS = [
  {
    id: 1,
    title: "Senior Software Engineer — Payments Platform",
    department: "engineering",
    location: "seattle",
    locationLabel: "Seattle, WA",
    type: "Full-time",
    level: "Senior",
    posted: "2 days ago",
    description:
      "Build and scale the payment infrastructure that powers millions of daily transactions. You'll work on distributed systems, real-time fraud detection, and seamless checkout experiences.",
    tags: ["TypeScript", "Go", "Kubernetes", "PostgreSQL"],
  },
  {
    id: 2,
    title: "Product Designer — Mobile Experience",
    department: "design",
    location: "sf",
    locationLabel: "San Francisco, CA",
    type: "Full-time",
    level: "Mid-level",
    posted: "4 days ago",
    description:
      "Craft intuitive, delightful mobile experiences for our iOS and Android apps used by tens of millions of shoppers worldwide.",
    tags: ["Figma", "iOS", "Android", "User Research"],
  },
  {
    id: 3,
    title: "Principal Product Manager — Search & Discovery",
    department: "product",
    location: "seattle",
    locationLabel: "Seattle, WA",
    type: "Full-time",
    level: "Principal",
    posted: "1 week ago",
    description:
      "Define the strategy for how customers discover products. You'll own the search ranking, recommendations, and personalization roadmap.",
    tags: ["Search", "ML", "A/B Testing", "Analytics"],
  },
  {
    id: 4,
    title: "Data Engineer — Logistics & Supply Chain",
    department: "engineering",
    location: "austin",
    locationLabel: "Austin, TX",
    type: "Full-time",
    level: "Mid-level",
    posted: "3 days ago",
    description:
      "Design and maintain data pipelines that power our logistics network, enabling real-time tracking and predictive delivery estimates.",
    tags: ["Python", "Spark", "Airflow", "Snowflake"],
  },
  {
    id: 5,
    title: "Machine Learning Engineer — Recommendations",
    department: "engineering",
    location: "remote",
    locationLabel: "Remote",
    type: "Full-time",
    level: "Senior",
    posted: "5 days ago",
    description:
      "Build and deploy ML models that personalize the shopping experience for every customer, from homepage recommendations to email campaigns.",
    tags: ["Python", "PyTorch", "AWS SageMaker", "Spark"],
  },
  {
    id: 6,
    title: "Brand Marketing Manager",
    department: "marketing",
    location: "nyc",
    locationLabel: "New York, NY",
    type: "Full-time",
    level: "Manager",
    posted: "1 week ago",
    description:
      "Lead brand campaigns across digital and traditional channels. You'll shape how millions of customers perceive and connect with ShopNow.",
    tags: ["Brand Strategy", "Campaign Management", "Analytics", "Creative"],
  },
  {
    id: 7,
    title: "Fulfillment Center Operations Lead",
    department: "operations",
    location: "austin",
    locationLabel: "Austin, TX",
    type: "Full-time",
    level: "Lead",
    posted: "2 weeks ago",
    description:
      "Oversee day-to-day operations at our Austin fulfillment center, managing a team of 50+ associates and driving efficiency improvements.",
    tags: ["Logistics", "Team Leadership", "Process Improvement", "Safety"],
  },
  {
    id: 8,
    title: "Frontend Engineer — Seller Portal",
    department: "engineering",
    location: "remote",
    locationLabel: "Remote",
    type: "Full-time",
    level: "Mid-level",
    posted: "3 days ago",
    description:
      "Build the tools that empower hundreds of thousands of sellers to manage their storefronts, inventory, and analytics on ShopNow.",
    tags: ["React", "TypeScript", "Next.js", "GraphQL"],
  },
  {
    id: 9,
    title: "Financial Analyst — Corporate FP&A",
    department: "finance",
    location: "seattle",
    locationLabel: "Seattle, WA",
    type: "Full-time",
    level: "Mid-level",
    posted: "6 days ago",
    description:
      "Support financial planning and analysis for ShopNow's core business units, partnering with leadership on budgeting and forecasting.",
    tags: ["Excel", "SQL", "Financial Modeling", "Tableau"],
  },
  {
    id: 10,
    title: "Talent Acquisition Partner — Tech Roles",
    department: "hr",
    location: "sf",
    locationLabel: "San Francisco, CA",
    type: "Full-time",
    level: "Mid-level",
    posted: "1 week ago",
    description:
      "Source, attract, and hire world-class engineering and product talent. You'll own full-cycle recruiting for our fastest-growing teams.",
    tags: ["Recruiting", "Sourcing", "Employer Branding", "ATS"],
  },
];

const PERKS = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description:
      "Comprehensive medical, dental, and vision coverage for you and your family. Plus mental health support and wellness stipends.",
  },
  {
    icon: TrendingUp,
    title: "Equity & Growth",
    description:
      "Competitive salary, RSUs, and annual performance bonuses. We grow together — your success is our success.",
  },
  {
    icon: Laptop,
    title: "Remote-Friendly",
    description:
      "Flexible hybrid and fully remote options. We provide a $1,500 home office setup stipend to keep you productive anywhere.",
  },
  {
    icon: Coffee,
    title: "Time Off",
    description:
      "Unlimited PTO policy, 12 paid holidays, and paid parental leave (16 weeks primary, 8 weeks secondary caregiver).",
  },
  {
    icon: Award,
    title: "Learning & Development",
    description:
      "$3,000 annual learning budget, access to online courses, conference sponsorships, and internal mentorship programs.",
  },
  {
    icon: Shield,
    title: "Financial Security",
    description:
      "401(k) with 4% company match, life insurance, disability coverage, and an employee stock purchase plan.",
  },
];

const STATS = [
  { value: "12,000+", label: "Employees Worldwide" },
  { value: "28", label: "Countries" },
  { value: "4.6★", label: "Glassdoor Rating" },
  { value: "94%", label: "Would Recommend" },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Aisha K.",
    role: "Senior Engineer, Payments",
    avatar: "A",
    tenure: "3 years at ShopNow",
    quote:
      "The scale of problems we solve here is unlike anywhere else. I've grown more in 3 years than in my previous 6 combined. The team is brilliant and genuinely supportive.",
  },
  {
    id: 2,
    name: "Marcus L.",
    role: "Product Designer, Mobile",
    avatar: "M",
    tenure: "2 years at ShopNow",
    quote:
      "Design has a real seat at the table here. My work ships to millions of users every week. The feedback loop is fast and the impact is tangible — it's incredibly motivating.",
  },
  {
    id: 3,
    name: "Priya R.",
    role: "Data Engineer, Logistics",
    avatar: "P",
    tenure: "4 years at ShopNow",
    quote:
      "I came for the technical challenges and stayed for the people. The culture of ownership means I can drive real change without layers of bureaucracy slowing me down.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filteredJobs = JOBS.filter((job) => {
    const matchesDept =
      selectedDept === "all" || job.department === selectedDept;
    const matchesLocation =
      selectedLocation === "all" || job.location === selectedLocation;
    const matchesSearch =
      searchQuery.trim() === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesDept && matchesLocation && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[#0F2027] via-[#1A3A4A] to-[#0F2027] text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block bg-[#10B981]/20 text-[#10B981] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-[#10B981]/30">
                We&apos;re Hiring
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Build the Future of{" "}
              <span className="text-[#10B981]">Commerce</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10"
            >
              Join a team of builders, dreamers, and problem-solvers who are
              reimagining how the world shops. Meaningful work, real impact,
              and a culture that puts people first.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#open-roles"
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors duration-200"
              >
                View Open Roles
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#life-at-shopnow"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/20 transition-colors duration-200"
              >
                Life at ShopNow
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-[#10B981]">{stat.value}</p>
                <p className="text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Life at ShopNow ── */}
      <section id="life-at-shopnow" className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2027] mb-4">
                Why ShopNow?
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                We believe great work happens when talented people are given
                the tools, trust, and freedom to do their best.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PERKS.map((perk) => (
                <motion.div
                  key={perk.title}
                  variants={scaleIn}
                  className="bg-[#F3F3F3] rounded-2xl p-7 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center mb-5">
                    <perk.icon className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F2027] mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {perk.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-[#0F2027] py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Hear From Our Team
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Real stories from the people who make ShopNow tick.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.id}
                  variants={fadeInUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-5"
                >
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 fill-[#10B981] text-[#10B981]"
                      />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-white/50 text-xs">{t.role}</p>
                      <p className="text-[#10B981] text-xs">{t.tenure}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="open-roles" className="py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2027] mb-4">
              Open Positions
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {filteredJobs.length} role{filteredJobs.length !== 1 ? "s" : ""} available
            </p>
          </motion.div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search roles or skills…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                />
              </div>

              {/* Department */}
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>

              {/* Location */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white"
              >
                {LOCATIONS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job list */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No roles match your search.</p>
              <p className="text-sm mt-1">Try adjusting your filters.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="space-y-4"
            >
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#10B981]/30 transition-all duration-200 p-6 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-semibold bg-[#10B981]/10 text-[#10B981] px-2.5 py-0.5 rounded-full">
                          {DEPARTMENTS.find((d) => d.id === job.department)?.label}
                        </span>
                        <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full">
                          {job.level}
                        </span>
                        <span className="text-xs text-gray-400">{job.posted}</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#0F2027] mb-1 group-hover:text-[#10B981] transition-colors duration-200">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.locationLabel}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {job.type}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <Link
                        href={`/careers/${job.id}`}
                        className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
                      >
                        Apply Now
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2027] mb-4">
                Our Values
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                These aren&apos;t just words on a wall — they guide every decision
                we make.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: "Customer Obsession",
                  desc: "We start with the customer and work backwards. Their trust is our most important asset.",
                },
                {
                  icon: Zap,
                  title: "Bias for Action",
                  desc: "Speed matters. We make decisions with the best available information and iterate fast.",
                },
                {
                  icon: Globe,
                  title: "Think Big",
                  desc: "Small thinking is a self-fulfilling prophecy. We aim for solutions that scale globally.",
                },
                {
                  icon: Award,
                  title: "Hire & Develop the Best",
                  desc: "We raise the bar with every hire and invest deeply in the growth of our people.",
                },
              ].map((v) => (
                <motion.div
                  key={v.title}
                  variants={scaleIn}
                  className="text-center p-7 rounded-2xl border border-gray-100 hover:border-[#10B981]/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-14 h-14 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <v.icon className="w-7 h-7 text-[#10B981]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F2027] mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-[#10B981] to-[#0891B2] py-16">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
            >
              Ready to Make an Impact?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/80 max-w-xl mx-auto mb-8"
            >
              Join thousands of talented people building the future of commerce.
              Your next great adventure starts here.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#open-roles"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#10B981] hover:bg-gray-50 font-bold px-8 py-3.5 rounded-lg transition-colors duration-200"
              >
                Browse All Roles
                <ChevronRight className="w-4 h-4" />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/30 transition-colors duration-200"
              >
                Learn About Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
