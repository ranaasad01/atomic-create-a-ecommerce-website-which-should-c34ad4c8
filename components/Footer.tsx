"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { APP_NAME, footerLinks } from "@/lib/data";
import { useTranslations } from "next-intl";
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#131921] text-white mt-auto">
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475A] hover:bg-[#485769] text-white text-sm py-3 text-center transition-colors duration-200 font-medium"
        aria-label="Back to top"
      >
        {t("footer.backToTop")}
      </button>

      {/* Main footer links */}
      <div className="max-w-[1500px] mx-auto px-4 py-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          {Object.entries(footerLinks).map(([section, links]) => (
            <motion.div key={section} variants={fadeInUp}>
              <h3 className="text-white font-bold text-sm mb-3">{section}</h3>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={
                        link.href.startsWith("#")
                          ? pathname === "/"
                            ? link.href
                            : "/" + link.href
                          : link.href
                      }
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-[#DDDDDD] hover:text-white text-sm transition-colors duration-150 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Logo + legal */}
      <div className="max-w-[1500px] mx-auto px-4 py-6 flex flex-col items-center gap-4">
        <Link href="/" className="flex items-center gap-1" aria-label={APP_NAME}>
          <span className="text-white font-extrabold text-lg tracking-tight">shop</span>
          <span className="text-[#FF9900] font-extrabold text-lg tracking-tight">now</span>
          <span className="text-[#FF9900] text-xs font-bold">.com</span>
        </Link>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {[
            { label: t("footer.conditions"), href: "/conditions" },
            { label: t("footer.privacy"), href: "/privacy" },
            { label: t("footer.interest"), href: "/interest" },
            { label: t("footer.cookies"), href: "/cookies" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#DDDDDD] hover:text-white text-xs transition-colors duration-150 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <p className="text-[#AAAAAA] text-xs text-center">
          {t("footer.copyright", { year: "2024", name: APP_NAME })}
        </p>
      </div>
    </footer>
  );
}