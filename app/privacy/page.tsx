import Link from "next/link";
import { Shield, Lock, Eye, Database, Globe, Mail, Phone, ChevronRight } from 'lucide-react';

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    icon: Database,
    content: [
      {
        subtitle: "Information You Give Us",
        text: "We receive and store any information you enter on our website or give us in any other way. This includes information such as your name, address, phone number, credit card information, and email address when you create an account, place an order, or contact customer service.",
      },
      {
        subtitle: "Automatic Information",
        text: "We automatically receive and store certain types of information whenever you interact with us. For example, like many websites, we use cookies and we obtain certain types of information when your web browser accesses ShopNow. This includes your IP address, browser type, operating system, referring URLs, and pages visited.",
      },
      {
        subtitle: "Information from Other Sources",
        text: "We might receive information about you from other sources and add it to our account information. This includes updated delivery and address information from our carriers, account information, purchase or redemption information, and page-view information from some merchants.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    icon: Eye,
    content: [
      {
        subtitle: "Providing Services",
        text: "We use your personal information to operate, provide, develop, and improve the products and services that we offer our customers. This includes processing and fulfilling orders, sending order confirmations and updates, and providing customer support.",
      },
      {
        subtitle: "Personalization",
        text: "We use your information to recommend features, products, and services that might be of interest to you, identify your preferences, and personalize your experience with ShopNow.",
      },
      {
        subtitle: "Communications",
        text: "We use your email address to send you promotional communications about ShopNow features, products, services, events, and special offers. You can opt out of these communications at any time through your account settings.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    icon: Globe,
    content: [
      {
        subtitle: "What Are Cookies",
        text: "Cookies are unique identifiers that we transfer to your device to enable our systems to recognize your device and to provide features such as personalized advertisements on other websites, saved shopping carts, and account sign-in.",
      },
      {
        subtitle: "How We Use Cookies",
        text: "We use cookies to recognize you when you visit our website, remember your preferences and settings, understand how you use our services, and deliver relevant advertisements. You can manage your cookie preferences through your browser settings.",
      },
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    content: [
      {
        subtitle: "Security Measures",
        text: "We work to protect the security of your information during transmission by using Secure Sockets Layer (SSL) software, which encrypts information you input. We maintain physical, electronic, and procedural safeguards in connection with the collection, storage, and disclosure of personal customer information.",
      },
      {
        subtitle: "Your Responsibility",
        text: "It is important for you to protect against unauthorized access to your password and to your computers, devices, and applications. Be sure to sign off when finished using a shared computer. We cannot guarantee the security of any information you transmit to us.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights & Choices",
    icon: Shield,
    content: [
      {
        subtitle: "Access and Update",
        text: "You can access and update certain information about you from within your ShopNow account. For example, you can update your shipping addresses, payment methods, and communication preferences. You also have the right to request a copy of the personal information we hold about you.",
      },
      {
        subtitle: "Data Deletion",
        text: "You may request deletion of your personal data by contacting our privacy team. Please note that some information may be retained for legal, regulatory, or legitimate business purposes even after account deletion.",
      },
      {
        subtitle: "Opt-Out Options",
        text: "You can opt out of receiving promotional emails by following the unsubscribe instructions in those emails or by adjusting your notification settings in your account. You may also opt out of interest-based advertising by adjusting your advertising preferences.",
      },
    ],
  },
];

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: "privacy@shopnow.com",
    href: "mailto:privacy@shopnow.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "1-800-SHOPNOW",
    href: "tel:18007467669",
  },
  {
    icon: Globe,
    label: "Online",
    value: "Help Center",
    href: "/help",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Hero */}
      <div className="bg-[#0F2027] text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-[#10B981] text-sm font-semibold uppercase tracking-wider">
              Legal
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Privacy Notice</h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl">
            We are committed to protecting your privacy and ensuring you have a
            positive experience on our website.
          </p>
          <p className="text-gray-400 text-sm mt-4">
            Last updated: <span className="text-white font-medium">January 1, 2024</span>
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#10B981] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-800 font-medium">Privacy Notice</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar TOC */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-20">
              <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                Contents
              </h2>
              <nav className="space-y-1">
                {SECTIONS.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#10B981] hover:bg-[#10B981]/5 rounded px-2 py-1.5 transition-colors"
                  >
                    <section.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Intro card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-700 leading-relaxed">
                ShopNow knows that you care how information about you is used and
                shared, and we appreciate your trust that we will do so carefully
                and sensibly. This notice describes our privacy policy. By visiting
                ShopNow, you are accepting the practices described in this Privacy
                Notice.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  "GDPR Compliant",
                  "CCPA Compliant",
                  "SSL Encrypted",
                  "SOC 2 Certified",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 bg-[#10B981]/10 text-[#10B981] text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    <Shield className="w-3 h-3" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Sections */}
            {SECTIONS.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-[#0F2027]/5">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                    <section.icon className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="p-6 space-y-5">
                  {section.content.map((item) => (
                    <div key={item.subtitle}>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
                        {item.subtitle}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Children's Privacy */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Children&apos;s Privacy
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                ShopNow does not sell products for purchase by children. We sell
                children&apos;s products for purchase by adults. If you are under 18,
                you may use ShopNow only with involvement of a parent or guardian.
                We do not knowingly collect personal information from children under
                the age of 13.
              </p>
            </div>

            {/* Changes to policy */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Changes to This Notice
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our business changes constantly, and our Privacy Notice will change
                also. We may email periodic reminders of our notices and conditions,
                unless you have instructed us not to, but you should check our
                website frequently to see recent changes. Unless stated otherwise,
                our current Privacy Notice applies to all information that we have
                about you and your account.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-[#0F2027] rounded-lg p-6 text-white">
              <h2 className="text-lg font-bold mb-2">Questions About Privacy?</h2>
              <p className="text-gray-300 text-sm mb-5">
                If you have questions or concerns about our privacy practices,
                please contact our privacy team.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {CONTACT_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3 transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Related links */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Related Policies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Conditions of Use", href: "/conditions" },
                  { label: "Cookie Policy", href: "/cookies" },
                  { label: "Returns Policy", href: "/returns" },
                  { label: "Help Center", href: "/help" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 hover:border-[#10B981] hover:bg-[#10B981]/5 transition-colors group"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#10B981]">
                      {link.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#10B981]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
