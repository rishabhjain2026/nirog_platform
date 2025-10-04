"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    aboutSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/niro-hero-section.jpg"
          alt="Nirog – Hero Section Banner Image"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            <span className="text-foreground">Nirog –</span>{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Your All-in-One HealthTech Platform
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Connect with verified doctors, manage health records, and access quality healthcare services in one digital
            ecosystem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button size="lg" className="text-lg px-8 py-6 h-auto group" asChild>
              <a href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 h-auto group bg-transparent"
              onClick={scrollToAbout}
            >
              <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Explore More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 space-y-4">
            <p className="text-sm text-muted-foreground">Trusted by healthcare professionals</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-sm font-medium">1000+ Verified Doctors</div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <div className="text-sm font-medium">50+ Hospitals</div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <div className="text-sm font-medium">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-5" />
    </section>
  )
}
