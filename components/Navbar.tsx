"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, User, Menu, X, ChevronDown, MapPin, Bell } from 'lucide-react';
import { useTranslations } from "next-intl";
import { APP_NAME } from "@/lib/data";

interface CartState {
  count: number;
}

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCart = () => {
      try {
        const stored = localStorage.getItem("shopnow-cart");
        if (stored) {
          const items = JSON.parse(stored) as Array<{ quantity: number }>;
          const total = items.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
          setCartCount(total);
        } else {
          setCartCount(0);
        }
      } catch {
        setCartCount(0);
      }
    };

    updateCart();
    window.addEventListener("storage", updateCart);
    window.addEventListener("cart-updated", updateCart);
    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("cart-updated", updateCart);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    type: string
  ) => {
    if (type === "anchor") {
      if (pathname === "/") {
        e.preventDefault();
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  const navItems = [
    { label: t("nav.home"), href: "/", type: "route" },
    { label: t("nav.products"), href: "/products", type: "route" },
    { label: t("nav.deals"), href: "#deals", type: "anchor" },
    { label: t("nav.orders"), href: "/orders", type: "route" },
  ];

  return (
    <>
      {/* Top bar */}
      <header
        className={`sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.18)]" : ""
        }`}
      >
        {/* Main nav */}
        <div className="bg-[#131921]">
          <div className="max-w-[1500px] mx-auto px-3 sm:px-4 flex items-center gap-2 h-14">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:border-[#FF9900] transition-colors duration-200 focus-visible:outline-none focus-visible:border-[#FF9900]"
              aria-label={APP_NAME}
            >
              <span className="text-white font-extrabold text-xl tracking-tight leading-none">
                shop
              </span>
              <span className="text-[#FF9900] font-extrabold text-xl tracking-tight leading-none">
                now
              </span>
              <span className="text-[#FF9900] text-xs font-bold leading-none mt-auto mb-0.5">.com</span>
            </Link>

            {/* Deliver to */}
            <button className="hidden lg:flex items-start gap-1 px-2 py-1 rounded border border-transparent hover:border-white transition-colors duration-200 text-white min-w-0 flex-shrink-0">
              <MapPin className="w-4 h-4 mt-1 text-white/70 flex-shrink-0" />
              <div className="text-left">
                <div className="text-[10px] text-white/70 leading-tight">{t("nav.deliverTo")}</div>
                <div className="text-xs font-bold leading-tight">{t("nav.location")}</div>
              </div>
            </button>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="flex-1 flex items-center min-w-0"
            >
              <div
                className={`flex w-full rounded-md overflow-hidden transition-all duration-200 ${
                  searchFocused ? "ring-2 ring-[#FF9900]" : ""
                }`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder={t("nav.searchPlaceholder")}
                  className="flex-1 px-3 py-2 text-sm text-[#131921] bg-white outline-none min-w-0 placeholder:text-gray-400"
                  aria-label={t("nav.searchPlaceholder")}
                />
                <button
                  type="submit"
                  className="bg-[#FF9900] hover:bg-[#e88a00] px-4 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                  aria-label={t("nav.search")}
                >
                  <Search className="w-5 h-5 text-[#131921]" />
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Account */}
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountOpen((v) => !v)}
                  className="hidden sm:flex flex-col items-start px-2 py-1 rounded border border-transparent hover:border-white transition-colors duration-200 text-white"
                  aria-expanded={accountOpen}
                  aria-haspopup="true"
                >
                  <span className="text-[10px] text-white/70 leading-tight">{t("nav.hello")}</span>
                  <span className="text-xs font-bold leading-tight flex items-center gap-0.5">
                    {t("nav.accountLists")} <ChevronDown className="w-3 h-3" />
                  </span>
                </button>
                <AnimatePresence>
                  {accountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-black/5 z-50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-gray-100">
                        <Link
                          href="/account"
                          onClick={() => setAccountOpen(false)}
                          className="block w-full text-center bg-[#FF9900] hover:bg-[#e88a00] text-[#131921] font-bold text-sm py-1.5 rounded transition-colors duration-200"
                        >
                          {t("nav.signIn")}
                        </Link>
                        <p className="text-xs text-center text-gray-500 mt-1.5">
                          {t("nav.newCustomer")}{" "}
                          <Link href="/account" className="text-[#007185] hover:text-[#c7511f] hover:underline">
                            {t("nav.startHere")}
                          </Link>
                        </p>
                      </div>
                      <div className="p-2">
                        {[
                          { label: t("nav.yourAccount"), href: "/account" },
                          { label: t("nav.yourOrders"), href: "/orders" },
                          { label: t("nav.wishlist"), href: "/wishlist" },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setAccountOpen(false)}
                            className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors duration-150"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Returns */}
              <Link
                href="/orders"
                className="hidden md:flex flex-col items-start px-2 py-1 rounded border border-transparent hover:border-white transition-colors duration-200 text-white"
              >
                <span className="text-[10px] text-white/70 leading-tight">{t("nav.returns")}</span>
                <span className="text-xs font-bold leading-tight">{t("nav.orders")}</span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:border-white transition-colors duration-200 text-white"
                aria-label={`${t("nav.cart")} (${cartCount} items)`}
              >
                <div className="relative">
                  <ShoppingCart className="w-7 h-7" />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1 bg-[#FF9900] text-[#131921] text-[10px] font-extrabold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-0.5 leading-none"
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </motion.span>
                  )}
                </div>
                <span className="hidden sm:block text-xs font-bold">{t("nav.cart")}</span>
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="sm:hidden p-2 text-white rounded border border-transparent hover:border-white transition-colors duration-200"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary nav bar */}
        <div className="bg-[#232F3E]">
          <div className="max-w-[1500px] mx-auto px-3 sm:px-4 flex items-center gap-1 h-10 overflow-x-auto scrollbar-hide">
            <button className="flex items-center gap-1.5 text-white text-sm font-medium px-2 py-1 rounded hover:bg-white/10 transition-colors duration-200 whitespace-nowrap flex-shrink-0">
              <Menu className="w-4 h-4" />
              {t("nav.allCategories")}
            </button>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={
                  item.type === "anchor"
                    ? pathname === "/"
                      ? item.href
                      : "/" + item.href
                    : item.href
                }
                onClick={(e) => handleNavClick(e, item.href, item.type)}
                className={`text-white text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                  pathname === item.href ? "font-bold underline underline-offset-2" : "font-normal"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/products?deal=true"
              className="text-white text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors duration-200 whitespace-nowrap flex-shrink-0 font-medium"
            >
              {t("nav.todaysDeals")}
            </Link>
            <Link
              href="/products?category=electronics"
              className="text-white text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            >
              {t("nav.electronics")}
            </Link>
            <Link
              href="/products?category=fashion"
              className="text-white text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            >
              {t("nav.fashion")}
            </Link>
            <Link
              href="/products?category=home"
              className="text-white text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            >
              {t("nav.homeKitchen")}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -280 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -280 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex"
          >
            <div className="w-72 bg-[#131921] h-full overflow-y-auto shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-1">
                  <User className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-sm">{t("nav.hello")}</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white p-1 rounded hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-3">
                <p className="text-[#FF9900] text-xs font-bold uppercase tracking-wider px-2 mb-2">
                  {t("nav.shopBy")}
                </p>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={
                      item.type === "anchor"
                        ? pathname === "/"
                          ? item.href
                          : "/" + item.href
                        : item.href
                    }
                    onClick={(e) => handleNavClick(e, item.href, item.type)}
                    className="flex items-center justify-between text-white text-sm py-2.5 px-2 rounded hover:bg-white/10 transition-colors duration-200 border-b border-white/5"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 -rotate-90 text-white/50" />
                  </Link>
                ))}
              </nav>
              <div className="p-3 border-t border-white/10">
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-white text-sm py-2 px-2 rounded hover:bg-white/10 transition-colors"
                >
                  <User className="w-4 h-4" />
                  {t("nav.yourAccount")}
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-white text-sm py-2 px-2 rounded hover:bg-white/10 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  {t("nav.yourOrders")}
                </Link>
              </div>
            </div>
            <div
              className="flex-1 bg-black/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}