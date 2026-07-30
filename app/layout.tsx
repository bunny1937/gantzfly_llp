import type { Metadata } from "next";
import "./globals.css";
import { QuoteCartProvider } from "@/context/QuoteCartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GiantzFly Exim LLP — Indian Export Catalog",
    template: "%s | GiantzFly Exim LLP",
  },
  description:
    "Farm-direct. Lab-certified. Export-ready for your shelf. GiantzFly Exim LLP supplies Indian spices, makhana, and dry fruits to international buyers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>
        <QuoteCartProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </QuoteCartProvider>
      </body>
    </html>
  );
}
