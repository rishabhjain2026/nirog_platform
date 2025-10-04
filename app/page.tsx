import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { LocationPrompt } from "@/components/location-prompt"
import { FeaturesSection } from "@/components/features-section"
import { AboutSection } from "@/components/about-section"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LocationPrompt />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
