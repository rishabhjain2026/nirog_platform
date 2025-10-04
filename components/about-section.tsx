import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export function AboutSection() {
  const benefits = [
    "Connect with verified healthcare professionals",
    "Secure digital health record management",
    "Easy appointment booking and tracking",
    "Access to medical learning resources",
    "24/7 customer support and assistance",
    "Multi-language support for better accessibility",
  ]

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">
                Revolutionizing Healthcare with{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Digital Innovation
                </span>
              </h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Nirog is more than just a healthcare platform – it's a comprehensive ecosystem that bridges the gap
                between patients, doctors, and medical institutions. Our mission is to make quality healthcare
                accessible, affordable, and convenient for everyone.
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="group" asChild>
                <a href="/signup">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/about">Learn More</a>
              </Button>
            </div>
          </div>

          {/* Right side - Image and Cards */}
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              <Image
                src="/nirog-telemedicine.png"
                alt="Nirog Digital Healthcare Platform"
                width={500}
                height={400}
                className="w-full h-auto rounded-2xl"
                priority
              />

              {/* Floating Cards */}
              <Card className="absolute -top-4 -left-4 w-48 shadow-lg bg-card/95 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Platform Uptime</div>
                </CardContent>
              </Card>

              <Card className="absolute -bottom-4 -right-4 w-48 shadow-lg bg-card/95 backdrop-blur-sm border-secondary/20">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-secondary">4.8★</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
