import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "ShopNow — Everything You Need, Delivered Fast",
  description:
    "Shop millions of products across electronics, fashion, home, books, and more. Fast shipping, easy returns, and unbeatable prices.",
  keywords: ["ecommerce", "shopping", "deals", "electronics", "fashion", "home"],
  openGraph: {
    title: "ShopNow — Everything You Need, Delivered Fast",
    description: "Shop millions of products with fast shipping and easy returns.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#F3F3F3] text-[#131921] antialiased min-h-screen flex flex-col">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}