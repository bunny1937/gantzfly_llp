import "./globals.css";
import { CartProvider } from "../lib/cart";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LenisProvider from "./components/providers/LenisProvider";

export const metadata = {
  title: "GiantzFly Exim LLP — Premium Indian Export",
  description:
    "Certified bulk and private-label exports of spices, dry fruits and makhana from India to USA, Europe and Africa.",
  keywords:
    "Indian spice exporter, makhana exporter, dry fruit bulk supplier, turmeric export, cumin export, cashew bulk, private label spices India",
  openGraph: {
    title: "GiantzFly Exim LLP — Premium Indian Export",
    description:
      "Export-grade spices, makhana and dry fruits. Bulk supply & private label for retailers, distributors and supermarkets.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fontshare — free commercial use, zero Google Fonts */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=boska@400,400i,500,700,900&f[]=cabinet-grotesk@300,400,500,600,700,800&display=swap"
        />
        {/* Preload showcase product images */}
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=1800&q=80&fit=crop" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1800&q=80&fit=crop" />
      </head>
      <body>
        <CartProvider>
          <LenisProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
