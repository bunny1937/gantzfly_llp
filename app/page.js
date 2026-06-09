import HeroSection from "./components/home/HeroSection";
import OriginStatement from "./components/home/OriginStatement";
import MarqueeStrip from "./components/ui/MarqueeStrip";
import ProductShowcase from "./components/home/ProductShowcase";
import ProductTakeover from "./components/home/ProductTakeover";
import ProductCatalog from "./components/home/ProductCatalog";
import ProofRoom from "./components/home/ProofRoom";
import ReachSection from "./components/home/ReachSection";
import QuoteCTA from "./components/home/QuoteCTA";
import FloatingCTA from "./components/ui/FloatingCTA";
import DomeGallery from "./components/bits/DomeGallery";

export const metadata = {
  title:
    "GiantzFly Exim LLP — Premium Indian Export | Spices · Makhana · Dry Fruits",
  description:
    "Export-grade spices, makhana and dry fruits from India. Bulk supply and private-label capability for distributors, retailers and supermarkets in USA, Europe and Africa.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip dark={false} speed={40} />

      <OriginStatement />

      <div style={{ width: "100vw", height: "100vh" }}>
        <DomeGallery
          fit={0.55}
          minRadius={350}
          maxVerticalRotationDeg={10}
          segments={22}
          dragDampening={3.8}
          grayscale
        />
      </div>
      <ProductShowcase />
      <MarqueeStrip dark={true} speed={28} />

      <ProductCatalog />
      <ProofRoom />
      <ReachSection />
      <QuoteCTA />
    </>
  );
}
