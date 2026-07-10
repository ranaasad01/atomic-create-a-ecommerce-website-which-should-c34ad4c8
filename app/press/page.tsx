import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";
import { Newspaper, Calendar, Download, ExternalLink, Mail, Phone, Globe, Award, TrendingUp, Users, Package } from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────

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
    title: `The ${APP_NAME} Effect: How One Platform Changed Consumer Expectations Forever`,
    href: "#",
  },
  {
    id: 4,
    outlet: "Bloomberg",
    date: "June 5, 2025",
    title: `${APP_NAME} Stock Hits All-Time High as Profits Surge`,
    href: "#",
  },
];

const STATS = [
  { icon: Users, label: "Active Customers", value: "320M+" },
  { icon: Package, label: "Products Listed", value: "500M+" },
  { icon: TrendingUp, label: "Annual Revenue", value: "$700B+" },
  { icon: Globe, label: "Countries Served", value: "100+" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Financial Results": "bg-blue-100 text-blue-700",
  "Product Launch": "bg-[#10B981]/10 text-[#10B981]",
  Sustainability: "bg-green-100 text-green-700",
  Partnership: "bg-purple-100 text-purple-700",
  Community: "bg-pink-100 text-pink-700",
  Technology: "bg-cyan-100 text-cyan-700",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Hero */}
      <section className="bg-[#0F2027] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-[#10B981]/20 text-[#10B981] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                <Newspaper className="w-4 h-4" />
                Newsroom
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            >
              {APP_NAME} Press Center
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              The latest news, announcements, and media resources from {APP_NAME}.
              Find press releases, media assets, and contact information for our
              communications team.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1A3A4A] text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center"
              >
                <stat.icon className="w-7 h-7 text-[#10B981] mx-auto mb-2" />
                <div className="text-2xl font-extrabold">{stat.value}</div>
                <div className="text-sm text-gray-300 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Press Releases */}
        <section>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-2xl font-bold text-[#0F2027]">Press Releases</h2>
            <Link
              href="/press/archive"
              className="text-sm text-[#10B981] hover:text-[#059669] font-medium flex items-center gap-1 transition-colors"
            >
              View all <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5"
          >
            {PRESS_RELEASES.map((release) => (
              <motion.article
                key={release.id}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          CATEGORY_COLORS[release.category] ??
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {release.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {release.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F2027] mb-2 leading-snug">
                      {release.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {release.excerpt}
                    </p>
                  </div>
                  <Link
                    href={release.href}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
                  >
                    Read More <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* Media Coverage */}
        <section>
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
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {MEDIA_COVERAGE.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleIn}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-[#10B981]/30 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[#10B981] uppercase tracking-wide mb-1">
                      {item.outlet}
                    </p>
                    <h3 className="text-sm font-semibold text-[#0F2027] leading-snug group-hover:text-[#10B981] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#10B981] flex-shrink-0 mt-0.5 transition-colors" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* Media Kit & Resources */}
        <section>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl font-bold text-[#0F2027] mb-8"
          >
            Media Resources
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-5"
          >
            {[
              {
                icon: Download,
                title: "Brand Assets",
                desc: "Logos, color palettes, typography guidelines, and usage rules.",
                cta: "Download Kit",
              },
              {
                icon: Award,
                title: "Fact Sheet",
                desc: "Key statistics, milestones, and company overview for media use.",
                cta: "Download PDF",
              },
              {
                icon: Newspaper,
                title: "Press Archive",
                desc: "Browse all press releases dating back to our founding year.",
                cta: "Browse Archive",
              },
            ].map((resource) => (
              <motion.div
                key={resource.title}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                  <resource.icon className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0F2027] mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{resource.desc}</p>
                </div>
                <button className="mt-auto inline-flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 w-fit">
                  <Download className="w-3.5 h-3.5" />
                  {resource.cta}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Media Contact */}
        <section>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0F2027] to-[#1A3A4A] rounded-2xl p-8 text-white"
          >
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-2">Media Contact</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our communications team is available to assist journalists, analysts,
                and media professionals. We aim to respond to all inquiries within
                one business day.
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Email</p>
                    <a
                      href="mailto:press@shopnow.com"
                      className="text-sm font-semibold hover:text-[#10B981] transition-colors"
                    >
                      press@shopnow.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                    <a
                      href="tel:+18005550199"
                      className="text-sm font-semibold hover:text-[#10B981] transition-colors"
                    >
                      +1 (800) 555-0199
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Press Portal</p>
                    <a
                      href="/press"
                      className="text-sm font-semibold hover:text-[#10B981] transition-colors"
                    >
                      shopnow.com/press
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="mailto:press@shopnow.com"
                  className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  Contact Press Team
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
