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
        <div className="bg-[#0F2027]">
          <div className="max-w-[1500px] mx-auto px-3 sm:px-4 flex items-center gap-2 h-14">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:border-[#10B981] transition-colors duration-200 focus-visible:outline-none focus-visible:border-[#10B981]"
              aria-label={APP_NAME}
            >
              <span className="text-white font-extrabold text-xl tracking-tight leading-none">
                shop
              </span>
              <span className="text-[#10B981] font-extrabold text-xl tracking-tight leading-none">
                now
              </span>
              <span className="text-[#10B981] text-xs font-bold leading-none">.com</span>
            </Link>

            {/* Deliver to */}
            <button className="hidden lg:flex flex-col items-start px-2 py-1 rounded border border-transparent hover:border-white/40 transition-colors duration-200 flex-shrink-0">
              <span className="text-gray-400 text-[10px] leading-none">Deliver to</span>
              <span className="text-white text-xs font-bold flex items-center gap-0.5 leading-none mt-0.5">
                <MapPin className="w-3 h-3" />
                United States
              </span>
            </button>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className={`flex-1 flex items-center rounded-md overflow-hidden transition-all duration-200 ${
                searchFocused ? "ring-2 ring-[#10B981]" : ""
              }`}
            >
              {/* Category selector */}
              <select
                className="hidden sm:block bg-[#1A3A4A] text-white text-xs px-2 h-10 border-r border-white/20 focus:outline-none cursor-pointer hover:bg-[#234d61] transition-colors"
                aria-label="Search category"
              >
                <option>All</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home &amp; Kitchen</option>
                <option>Books</option>
                <option>Sports</option>
              </select>

              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder={t("nav.searchPlaceholder")}
                className="flex-1 h-10 px-3 text-sm text-gray-900 bg-white focus:outline-none placeholder:text-gray-400"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="bg-[#10B981] hover:bg-[#059669] h-10 px-4 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Language */}
              <button className="hidden md:flex flex-col items-start px-2 py-1 rounded border border-transparent hover:border-white/40 transition-colors duration-200">
                <span className="text-gray-400 text-[10px] leading-none">EN</span>
                <span className="text-white text-xs font-bold leading-none mt-0.5">🌐 Language</span>
              </button>

              {/* Account dropdown */}
              <div ref={accountRef} className="relative">
                <button
                  onClick={() => setAccountOpen((v) => !v)}
                  className="flex flex-col items-start px-2 py-1 rounded border border-transparent hover:border-white/40 transition-colors duration-200"
                  aria-expanded={accountOpen}
                  aria-haspopup="true"
                >
                  <span className="text-gray-400 text-[10px] leading-none hidden sm:block">
                    Hello, sign in
                  </span>
                  <span className="text-white text-xs font-bold flex items-center gap-0.5 leading-none mt-0.5">
                    <User className="w-4 h-4 sm:hidden" />
                    <span className="hidden sm:inline">Account &amp; Lists</span>
                    <ChevronDown className="w-3 h-3 hidden sm:inline" />
                  </span>
                </button>

                <AnimatePresence>
                  {accountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-56 bg-white rounded-md shadow-xl border border-gray-200 z-50 overflow-hidden"
                      role="menu"
                    >
                      <div className="p-3 border-b border-gray-100">
                        <Link
                          href="/account"
                          onClick={() => setAccountOpen(false)}
                          className="block w-full text-center bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold py-1.5 rounded transition-colors duration-200"
                          role="menuitem"
                        >
                          Sign In
                        </Link>
                        <p className="text-xs text-gray-500 text-center mt-2">
                          New customer?{" "}
                          <Link href="/account" className="text-[#10B981] hover:underline">
                            Start here
                          </Link>
                        </p>
                      </div>
                      <div className="p-2">
                        {[
                          { label: "Your Account", href: "/account" },
                          { label: "Your Orders", href: "/orders" },
                          { label: "Your Wishlist", href: "/wishlist" },
                          { label: "Order History", href: "/order-history" },
                          { label: "Returns", href: "/returns" },
                          { label: "Help", href: "/help" },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setAccountOpen(false)}
                            className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#10B981] rounded transition-colors duration-150"
                            role="menuitem"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Orders */}
              <Link
                href="/orders"
                className="hidden md:flex flex-col items-start px-2 py-1 rounded border border-transparent hover:border-white/40 transition-colors duration-200"
              >
                <span className="text-gray-400 text-[10px] leading-none">Returns</span>
                <span className="text-white text-xs font-bold leading-none mt-0.5">&amp; Orders</span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="flex items-end gap-1 px-2 py-1 rounded border border-transparent hover:border-white/40 transition-colors duration-200 relative"
                aria-label={`Cart, ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingCart className="w-7 h-7 text-white" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#10B981] text-white text-[10px] font-extrabold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-0.5 leading-none">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </div>
                <span className="text-white text-xs font-bold leading-none mb-0.5 hidden sm:inline">
                  Cart
                </span>
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden p-2 rounded border border-transparent hover:border-white/40 transition-colors duration-200"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary nav */}
        <div className="bg-[#1A3A4A] hidden md:block">
          <div className="max-w-[1500px] mx-auto px-4 flex items-center gap-1 h-10 overflow-x-auto scrollbar-none">
            <button className="flex items-center gap-1 text-white text-sm font-semibold px-2 py-1 rounded hover:bg-white/10 transition-colors duration-150 whitespace-nowrap flex-shrink-0">
              <Menu className="w-4 h-4" />
              All
            </button>
            {[
              { label: "Today's Deals", href: "#deals" },
              { label: "Electronics", href: "/products?category=electronics" },
              { label: "Fashion", href: "/products?category=clothing" },
              { label: "Home & Kitchen", href: "/products?category=home" },
              { label: "Books", href: "/products?category=books" },
              { label: "Sports", href: "/products?category=sports" },
              { label: "Toys", href: "/products?category=toys" },
              { label: "Beauty", href: "/products?category=beauty" },
              { label: "Sell", href: "/sell" },
              { label: "Help", href: "/help" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white text-sm px-2 py-1 rounded hover:bg-white/10 hover:text-[#10B981] transition-colors duration-150 whitespace-nowrap flex-shrink-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="md:hidden bg-[#1A3A4A] overflow-hidden"
            >
              <nav className="flex flex-col py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.type)}
                    className={`px-4 py-3 text-sm font-medium transition-colors duration-150 border-b border-white/10 last:border-0 ${
                      pathname === item.href
                        ? "text-[#10B981] bg-white/5"
                        : "text-white hover:text-[#10B981] hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-white hover:text-[#10B981] hover:bg-white/5 transition-colors duration-150 border-b border-white/10"
                >
                  Account
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-white hover:text-[#10B981] hover:bg-white/5 transition-colors duration-150 flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                  {cartCount > 0 && (
                    <span className="bg-[#10B981] text-white text-[10px] font-extrabold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-0.5">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
