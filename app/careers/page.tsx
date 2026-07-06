"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { Search, MapPin, Briefcase, Clock, ChevronDown, ChevronRight, Star, Users, Globe, Heart, Zap, Award, ArrowRight, Check, Mail } from 'lucide-react';
import { useTranslations } from "next-intl";

const DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Operations",
  "Finance",
  "Customer Success",
  "Data & Analytics",
  "Legal",
];

const LOCATIONS = [
  "All Locations",
  "Seattle, WA",
  "New York, NY",
  "Austin, TX",
  "San Francisco, CA",
  "Chicago, IL",
  "Remote",
  "London, UK",
  "Toronto, CA",
];

const JOB_TYPES = ["All Types", "Full-time", "Part-time", "Contract", "Internship"];

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  posted: string;
  description: string;
  tags: string[];
  featured: boolean;
}

const JOBS: Job[] = [
  {
    id: 1,
    title: "Senior Software Engineer, Platform",
    department: "Engineering",
    location: "Seattle, WA",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "Build and scale the core infrastructure powering millions of daily transactions. You will own critical systems end-to-end and mentor a team of talented engineers.",
    tags: ["TypeScript", "Node.js", "AWS", "Distributed Systems"],
    featured: true,
  },
  {
    id: 2,
    title: "Product Manager, Checkout Experience",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    posted: "3 days ago",
    description:
      "Define and drive the roadmap for our checkout funnel. Partner with engineering, design, and data teams to ship features that reduce friction and increase conversion.",
    tags: ["Product Strategy", "A/B Testing", "Roadmapping"],
    featured: true,
  },
  {
    id: 3,
    title: "Staff UX Designer, Mobile",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    posted: "5 days ago",
    description:
      "Lead design for our iOS and Android apps used by over 40 million shoppers. Set the visual language and interaction patterns for the next generation of mobile commerce.",
    tags: ["Figma", "iOS", "Android", "Design Systems"],
    featured: true,
  },
  {
    id: 4,
    title: "Data Scientist, Recommendations",
    department: "Data & Analytics",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "1 week ago",
    description:
      "Develop and deploy ML models that personalize the shopping experience for every customer. Work with petabyte-scale datasets and real-time inference pipelines.",
    tags: ["Python", "PyTorch", "Spark", "Recommendation Systems"],
    featured: false,
  },
  {
    id: 5,
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Austin, TX",
    type: "Full-time",
    posted: "1 week ago",
    description:
      "Own paid acquisition channels across search, social, and display. Analyze performance data daily and run rapid experiments to improve CAC and LTV.",
    tags: ["Paid Search", "Meta Ads", "Analytics", "Growth"],
    featured: false,
  },
  {
    id: 6,
    title: "Logistics Operations Analyst",
    department: "Operations",
    location: "Chicago, IL",
    type: "Full-time",
    posted: "2 weeks ago",
    description:
      "Optimize last-mile delivery routes and warehouse workflows. Build dashboards that give leadership real-time visibility into fulfillment performance.",
    tags: ["SQL", "Tableau", "Supply Chain", "Process Improvement"],
    featured: false,
  },
  {
    id: 7,
    title: "Frontend Engineer, Storefront",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    posted: "3 days ago",
    description:
      "Craft pixel-perfect, performant React components for the storefront experience. Champion accessibility and Core Web Vitals across the entire product surface.",
    tags: ["React", "Next.js", "TypeScript", "Accessibility"],
    featured: false,
  },
  {
    id: 8,
    title: "Customer Success Lead",
    department: "Customer Success",
    location: "Toronto, CA",
    type: "Full-time",
    posted: "4 days ago",
    description:
      "Be the voice of our enterprise sellers. Onboard new accounts, resolve escalations, and surface product feedback that shapes our roadmap.",
    tags: ["Account Management", "CRM", "Communication"],
    featured: false,
  },
  {
    id: 9,
    title: "Software Engineering Intern",
    department: "Engineering",
    location: "Seattle, WA",
    type: "Internship",
    posted: "1 week ago",
    description:
      "Join a product team for 12 weeks and ship real features used by millions. Mentorship, structured learning, and a full-time offer pipeline await.",
    tags: ["Internship", "Summer 2025", "Engineering"],
    featured: false,
  },
  {
    id: 10,
    title: "Senior Financial Analyst",
    department: "Finance",
    location: "New York, NY",
    type: "Full-time",
    posted: "5 days ago",
    description:
      "Support FP&A for our marketplace business. Build financial models, own monthly close reporting, and partner with business leaders on strategic decisions.",
    tags: ["FP&A", "Excel", "Financial Modeling", "SQL"],
    featured: false,
  },
];

const VALUES = [
  {
    icon: Users,
    title: "Customer Obsession",
    description:
      "We start with the customer and work backwards. Every decision we make is grounded in what creates the most value for the people we serve.",
  },
  {
    icon: Zap,
    title: "Bias for Action",
    description:
      "Speed matters. We make decisions with 70% of the information we wish we had, knowing that calculated risk-taking is how we stay ahead.",
  },
  {
    icon: Star,
    title: "High Standards",
    description:
      "We have relentlessly high standards. We continuously raise the bar and drive our teams to deliver high-quality products and services.",
  },
  {
    icon: Globe,
    title: "Think Big",
    description:
      "Thinking small is a self-fulfilling prophecy. We create and communicate a bold direction that inspires results and find ways to serve customers at global scale.",
  },
  {
    icon: Heart,
    title: "Earn Trust",
    description:
      "Leaders listen attentively, speak candidly, and treat others respectfully. They are vocally self-critical, even when it is socially awkward to do so.",
  },
  {
    icon: Award,
    title: "Deliver Results",
    description:
      "We focus on the key inputs for our business and deliver them with the right quality and in a timely fashion. Despite setbacks, we rise to the occasion.",
  },
];

const PERKS = [
  { emoji: "🏥", title: "Comprehensive Health", detail: "Medical, dental, and vision for you and your family from day one." },
  { emoji: "💰", title: "Competitive Equity", detail: "RSUs with a 4-year vest schedule and meaningful refresh grants." },
  { emoji: "🌴", title: "Flexible PTO", detail: "Unlimited paid time off with a minimum 15-day encouragement policy." },
  { emoji: "📚", title: "Learning Budget", detail: "$3,000 per year for courses, conferences, and certifications." },
  { emoji: "🏠", title: "Remote-Friendly", detail: "Hybrid and fully remote roles across every team and time zone." },
  { emoji: "👶", title: "Parental Leave", detail: "20 weeks fully paid for all parents, regardless of how you became one." },
  { emoji: "🍽️", title: "Daily Meals", detail: "Free breakfast and lunch at all major office locations." },
  { emoji: "🏋️", title: "Wellness Stipend", detail: "$100/month toward gym, therapy, meditation, or anything that keeps you well." },
];

const STATS = [
  { value: "12,000+", label: "Employees Worldwide" },
  { value: "28", label: "Countries" },
  { value: "94%", label: "Employee Satisfaction" },
  { value: "4.6", label: "Glassdoor Rating" },
];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [alertSubmitted, setAlertSubmitted] = useState(false);

  const filteredJobs = JOBS.filter((job) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDept =
      selectedDept === "All Departments" || job.department === selectedDept;
    const matchesLocation =
      selectedLocation === "All Locations" || job.location === selectedLocation;
    const matchesType =
      selectedType === "All Types" || job.type === selectedType;
    return matchesSearch && matchesDept && matchesLocation && matchesType;
  });

  const featuredJobs = filteredJobs.filter((j) => j.featured);
  const regularJobs = filteredJobs.filter((j) => !j.featured);

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setAlertSubmitted(true);
      setEmailInput("");
    }
  };

  return (
    <main className="min-h-screen bg-[#EAEDED]">
      {/* Hero */}
      <section className="bg-[#131921] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#232F3E] via-[#131921] to-[#0a1018] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF9900]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-4 py-20 md:py-28">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeInUp}
              className="text-[#FF9900] font-semibold text-sm uppercase tracking-widest mb-4"
            >
              Join Our Team
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-tight mb-6"
            >
              Build the Future of Commerce
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 text-pretty"
            >
              At ShopNow, we are reimagining how the world shops. Join 12,000 builders,
              dreamers, and operators who are obsessed with creating the best possible
              experience for every customer.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#e68a00] text-[#131921] font-bold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#FF9900]/30 hover:shadow-xl"
              >
                View Open Roles <ArrowRight size={18} />
              </a>
              <a
                href="#our-values"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-white/5"
              >
                Our Culture
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#232F3E] text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center"
              >
                <div className="text-3xl font-extrabold text-[#FF9900]">{stat.value}</div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section id="our-values" className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <p className="text-[#FF9900] font-semibold text-sm uppercase tracking-widest mb-2">
              What We Believe
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#131921] tracking-tight">
              Our Leadership Principles
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-pretty">
              These six principles guide every decision we make, from how we hire to how
              we build products.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-[#F8F8F8] border border-black/5 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14)] transition-shadow duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FF9900]/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#FF9900]" />
                  </div>
                  <h3 className="font-bold text-[#131921] text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-[#EAEDED] py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12"
          >
            <p className="text-[#FF9900] font-semibold text-sm uppercase tracking-widest mb-2">
              Benefits
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#131921] tracking-tight">
              We Take Care of Our People
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {PERKS.map((perk) => (
              <motion.div
                key={perk.title}
                variants={scaleIn}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-white border border-black/5 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] transition-shadow duration-300"
              >
                <div className="text-3xl mb-3">{perk.emoji}</div>
                <h3 className="font-bold text-[#131921] text-sm mb-1">{perk.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{perk.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <p className="text-[#FF9900] font-semibold text-sm uppercase tracking-widest mb-2">
              Open Positions
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#131921] tracking-tight">
              Find Your Role
            </h2>
            <p className="text-gray-500 mt-2">
              {JOBS.length} open positions across {DEPARTMENTS.length - 1} departments.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#F8F8F8] border border-black/5 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-3"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search roles, skills, or teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-black/10 bg-white text-sm text-[#131921] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900]/40 focus:border-[#FF9900] transition-all duration-200"
              />
            </div>

            {/* Department */}
            <div className="relative">
              <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="appearance-none pl-8 pr-8 py-2.5 rounded-lg border border-black/10 bg-white text-sm text-[#131921] focus:outline-none focus:ring-2 focus:ring-[#FF9900]/40 focus:border-[#FF9900] transition-all duration-200 cursor-pointer"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="appearance-none pl-8 pr-8 py-2.5 rounded-lg border border-black/10 bg-white text-sm text-[#131921] focus:outline-none focus:ring-2 focus:ring-[#FF9900]/40 focus:border-[#FF9900] transition-all duration-200 cursor-pointer"
              >
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Type */}
            <div className="relative">
              <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none pl-8 pr-8 py-2.5 rounded-lg border border-black/10 bg-white text-sm text-[#131921] focus:outline-none focus:ring-2 focus:ring-[#FF9900]/40 focus:border-[#FF9900] transition-all duration-200 cursor-pointer"
              >
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </motion.div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-6">
            Showing <span className="font-semibold text-[#131921]">{filteredJobs.length}</span> role{filteredJobs.length !== 1 ? "s" : ""}
          </p>

          {/* Featured Jobs */}
          {featuredJobs.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Featured Roles
              </h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="space-y-3"
              >
                {featuredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    expanded={expandedJob === job.id}
                    onToggle={() =>
                      setExpandedJob(expandedJob === job.id ? null : job.id)
                    }
                    featured
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* Regular Jobs */}
          {regularJobs.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                All Open Roles
              </h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="space-y-3"
              >
                {regularJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    expanded={expandedJob === job.id}
                    onToggle={() =>
                      setExpandedJob(expandedJob === job.id ? null : job.id)
                    }
                    featured={false}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {filteredJobs.length === 0 && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#131921] mb-2">No roles found</h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your filters or search query.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDept("All Departments");
                  setSelectedLocation("All Locations");
                  setSelectedType("All Types");
                }}
                className="mt-4 text-[#FF9900] font-semibold text-sm hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Hiring Process */}
      <section className="bg-[#131921] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <p className="text-[#FF9900] font-semibold text-sm uppercase tracking-widest mb-2">
              What to Expect
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Our Hiring Process
            </h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto text-pretty">
              We move fast and respect your time. Most candidates complete the full
              process in under three weeks.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 relative"
          >
            {[
              {
                step: "01",
                title: "Apply Online",
                detail:
                  "Submit your resume and a short note about why this role excites you. No cover letter required.",
              },
              {
                step: "02",
                title: "Recruiter Screen",
                detail:
                  "A 30-minute call with a recruiter to align on the role, your background, and compensation expectations.",
              },
              {
                step: "03",
                title: "Technical / Skills Round",
                detail:
                  "One to two focused interviews assessing the core skills for the role. We share the format in advance.",
              },
              {
                step: "04",
                title: "Final Loop",
                detail:
                  "Meet the team in a half-day virtual loop. We make decisions within 48 hours of your final interview.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors duration-200"
              >
                <div className="text-4xl font-extrabold text-[#FF9900]/20 mb-3 leading-none">
                  {item.step}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ChevronRight size={20} className="text-[#FF9900]/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Alert CTA */}
      <section className="bg-[#EAEDED] py-20">
        <div className="max-w-[700px] mx-auto px-4 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={scaleIn} className="text-5xl mb-4">
              📬
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-extrabold text-[#131921] tracking-tight mb-3"
            >
              Stay in the Loop
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 mb-8 text-pretty"
            >
              Not seeing the right role today? Sign up for job alerts and we will notify
              you the moment a matching position opens.
            </motion.p>

            {alertSubmitted ? (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 font-semibold px-6 py-3 rounded-xl"
              >
                <Check size={18} /> You are on the list. We will be in touch!
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleAlertSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-black/10 bg-white text-sm text-[#131921] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900]/40 focus:border-[#FF9900] transition-all duration-200 shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#FF9900] hover:bg-[#e68a00] text-[#131921] font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Get Alerts
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}

interface JobCardProps {
  job: Job;
  expanded: boolean;
  onToggle: () => void;
  featured: boolean;
}

function JobCard({ job, expanded, onToggle, featured }: JobCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      layout
      className={`border rounded-2xl overflow-hidden transition-shadow duration-300 ${
        featured
          ? "border-[#FF9900]/30 bg-[#FFFBF2] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(255,153,0,0.12)]"
          : "border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
      } hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14)]`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]/50 rounded-2xl"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-[#131921] text-base leading-snug">
              {job.title}
            </span>
            {featured && (
              <span className="inline-flex items-center gap-1 bg-[#FF9900]/15 text-[#b36b00] text-xs font-bold px-2 py-0.5 rounded-full">
                <Star size={10} /> Featured
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Briefcase size={12} /> {job.department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {job.type}
            </span>
            <span className="text-gray-400">Posted {job.posted}</span>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-gray-400 mt-0.5 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="px-5 pb-5 border-t border-black/5"
        >
          <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-4">
            {job.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#EAEDED] text-[#131921] text-xs font-medium px-3 py-1 rounded-full border border-black/5"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/careers/${job.id}`}
              className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#e68a00] text-[#131921] font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Apply Now <ArrowRight size={15} />
            </Link>
            <button className="inline-flex items-center gap-2 border border-black/10 hover:border-black/20 text-[#131921] font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#EAEDED]">
              Save Role <Heart size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}