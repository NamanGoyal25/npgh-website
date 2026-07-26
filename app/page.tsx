import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import HeritageGlassSection from "@/components/HeritageGlassSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian">
      <Navbar />
      <Hero />
      <BentoGrid />
      <HeritageGlassSection />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
