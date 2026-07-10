'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/motion';
import { APP_NAME } from '@/lib/data';
import { Newspaper, Calendar, Download, ExternalLink, Mail, Phone, Globe, Award, TrendingUp, Users, Package } from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PRESS_RELEASES = [
  {
    id: 1,
    date: 'July 10, 2025',
    category: 'Financial Results',
    title: `${APP_NAME} Announces Record Second Quarter 2025 Results`,
    excerpt:
      'Net sales increased 18% to $187.4 billion in the second quarter, compared with $158.9 billion in the second quarter of 2024.',
    href: '/press/q2-2025-results',
  },
  {
    id: 2,
    date: 'June 24, 2025',
    category: 'Product Launch',
    title: `${APP_NAME} Introduces Next-Generation Same-Day Delivery Network`,
    excerpt:
      'New fulfillment infrastructure enables same-day delivery to 85% of the US population, expanding from 50 major metro areas to over 200 cities.',
    href: '/press/same-day-delivery-expansion',
  },
  {
    id: 3,
    date: 'June 12, 2025',
    category: 'Sustainability',
    title: `${APP_NAME} Reaches 50% Renewable Energy Milestone Ahead of Schedule`,
    excerpt:
      'The company has achieved its goal of powering 50% of operations with renewable energy three years ahead of its original 2028 target.',
    href: '/press/renewable-energy-milestone',
  },
  {
    id: 4,
    date: 'May 30, 2025',
    category: 'Partnership',
    title: `${APP_NAME} and Major Brands Launch Exclusive Co-Branded Storefronts`,
    excerpt:
      'New branded storefronts give customers a curated shopping experience directly from top manufacturers including Sony, Nike, and KitchenAid.',
    href: '/press/branded-storefronts',
  },
  {
    id: 5,
    date: 'May 15, 2025',
    category: 'Community',
    title: `${APP_NAME} Commits $500M to Small Business Support Program`,
    excerpt:
      'The initiative will provide grants, logistics support, and marketing tools to over 100,000 small and medium-sized businesses over the next three years.',
    href: '/press/small-business-program',
  },
  {
    id: 6,
    date: 'April 28, 2025',
    category: 'Technology',
    title: `${APP_NAME} Unveils AI-Powered Personalized Shopping Assistant`,
    excerpt:
      'The new AI assistant uses advanced machine learning to provide hyper-personalized product recommendations, deal alerts, and shopping guidance.',
    href: '/press/ai-shopping-assistant',
  },
];

const MEDIA_COVERAGE = [
  {
    id: 1,
    outlet: 'The Wall Street Journal',
    date: 'July 8, 2025',
    title: `How ${APP_NAME} Is Redefining the Future of Retail`,
    href: '#',
  },
  {
    id: 2,
    outlet: 'TechCrunch',
    date: 'June 30, 2025',
    title: `${APP_NAME}'s Logistics Network Is Now More Advanced Than FedEx`,
    href: '#',
  },
  {
    id: 3,
    outlet: 'Forbes',
    date: 'June 18, 2025',
    title: `${APP_NAME} Named One of the World's Most Innovative Companies`,
    href: '#',
  },
  {
    id: 4,
    outlet: 'Bloomberg',
    date: 'June 5, 2025',
    title: `Inside ${APP_NAME}'s $10 Billion Sustainability Push`,
    href: '#',
  },
];

const STATS = [
  { icon: Users, label: 'Active Customers', value: '320M+' },
  { icon: Package, label: 'Products Listed', value: '350M+' },
  { icon: TrendingUp, label: 'Annual Revenue', value: '$750B+' },
  { icon: Award, label: 'Countries Served', value: '100+' },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Financial Results': 'bg-blue-100 text-blue-700',
  'Product Launch': 'bg-green-100 text-green-700',
  Sustainability: 'bg-emerald-100 text-emerald-700',
  Partnership: 'bg-purple-100 text-purple-700',
  Community: 'bg-orange-100 text-orange-700',
  Technology: 'bg-cyan-100 text-cyan-700',
};

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#F0F7F4]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F2027] to-[#1A3A4A] text-white py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-sm font-semibold px-4 py-1.5 rounded-full">
              <Newspaper className="w-4 h-4" />
              Newsroom
            </span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold mb-4">
            {APP_NAME ?? 'ShopNow'} Press Center
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-gray-300 max-w-2xl mx-auto">
            The latest news, announcements, and media resources from {APP_NAME ?? 'ShopNow'}.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {(STATS ?? []).map((stat) => {
            const Icon = stat?.icon;
            return (
              <motion.div
                key={stat?.label ?? ''}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-2"
              >
                {Icon && <Icon className="w-7 h-7 text-[#10B981]" />}
                <p className="text-2xl font-extrabold text-[#0F2027]">{stat?.value ?? ''}</p>
                <p className="text-sm text-gray-500">{stat?.label ?? ''}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Press Releases */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-[#0F2027] mb-8">
            Press Releases
          </motion.h2>
          <div className="grid gap-6">
            {(PRESS_RELEASES ?? []).map((item) => (
              <motion.article
                key={item?.id ?? ''}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      CATEGORY_COLORS[item?.category ?? ''] ?? 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item?.category ?? ''}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {item?.date ?? ''}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0F2027] mb-2 hover:text-[#10B981] transition-colors">
                  <Link href={item?.href ?? '#'}>{item?.title ?? ''}</Link>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item?.excerpt ?? ''}</p>
                <Link
                  href={item?.href ?? '#'}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#10B981] hover:text-[#059669] transition-colors"
                >
                  Read Full Release <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Media Coverage */}
      <section className="bg-white border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-[#0F2027] mb-8">
              Media Coverage
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {(MEDIA_COVERAGE ?? []).map((item) => (
                <motion.div
                  key={item?.id ?? ''}
                  variants={fadeInUp}
                  className="border border-gray-100 rounded-xl p-5 hover:border-[#10B981]/40 hover:shadow-sm transition-all duration-200"
                >
                  <p className="text-xs font-bold text-[#10B981] uppercase tracking-wide mb-1">
                    {item?.outlet ?? ''}
                  </p>
                  <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item?.date ?? ''}
                  </p>
                  <h3 className="text-sm font-semibold text-[#0F2027] leading-snug mb-3">
                    {item?.title ?? ''}
                  </h3>
                  <Link
                    href={item?.href ?? '#'}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] hover:text-[#059669]"
                  >
                    Read Article <ExternalLink className="w-3 h-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Kit & Contact */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
        {/* Media Kit */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#0F2027] to-[#1A3A4A] text-white rounded-2xl p-8"
        >
          <Globe className="w-8 h-8 text-[#10B981] mb-4" />
          <h2 className="text-xl font-bold mb-2">Media Kit</h2>
          <p className="text-gray-300 text-sm mb-6">
            Download our official logos, brand guidelines, executive photos, and product imagery for press use.
          </p>
          <button className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
            <Download className="w-4 h-4" /> Download Media Kit
          </button>
        </motion.div>

        {/* Press Contact */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
        >
          <Mail className="w-8 h-8 text-[#10B981] mb-4" />
          <h2 className="text-xl font-bold text-[#0F2027] mb-2">Press Contact</h2>
          <p className="text-gray-500 text-sm mb-6">
            For media inquiries, interview requests, or additional information, please reach out to our communications team.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-[#10B981]" />
              <a href="mailto:press@shopnow.com" className="hover:text-[#10B981] transition-colors">press@shopnow.com</a>
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4 text-[#10B981]" />
              <a href="tel:+18005550199" className="hover:text-[#10B981] transition-colors">+1 (800) 555-0199</a>
            </li>
          </ul>
        </motion.div>
      </section>
    </div>
  );
}
