import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Shield,
  Clock,
  BookOpen,
  Calendar,
  FileText,
  Stethoscope,
  Building2,
  FlaskConical,
  Smartphone,
} from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Heart,
      title: "Verified Doctors",
      description: "Connect with certified healthcare professionals who have been thoroughly verified for your safety.",
      color: "text-red-500",
    },
    {
      icon: Shield,
      title: "Secure Health Records",
      description:
        "Your medical data is encrypted and stored securely, accessible only to authorized healthcare providers.",
      color: "text-green-500",
    },
    {
      icon: Clock,
      title: "24/7 Healthcare Access",
      description: "Get medical consultations and support whenever you need it, day or night.",
      color: "text-blue-500",
    },
    {
      icon: Calendar,
      title: "Easy Appointment Booking",
      description: "Schedule appointments with doctors, hospitals, and labs with just a few clicks.",
      color: "text-purple-500",
    },
    {
      icon: FileText,
      title: "Digital Health Records",
      description: "Upload, store, and share your medical reports and prescriptions digitally.",
      color: "text-orange-500",
    },
    {
      icon: BookOpen,
      title: "Medical Learning Hub",
      description: "Access educational resources, videos, and quizzes for medical students and professionals.",
      color: "text-indigo-500",
    },
  ]

  const services = [
    {
      icon: Stethoscope,
      title: "Find Doctors",
      description: "Search and connect with specialists near you",
      href: "/doctors",
    },
    {
      icon: Building2,
      title: "Hospitals",
      description: "Locate hospitals and medical centers",
      href: "/hospitals",
    },
    {
      icon: FlaskConical,
      title: "Labs & Pharmacy",
      description: "Find diagnostic labs and pharmacies",
      href: "/labs",
    },
    {
      icon: Smartphone,
      title: "Telemedicine",
      description: "Online consultations from home",
      href: "/telemedicine",
    },
  ]

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Nirog
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience healthcare like never before with our comprehensive digital platform designed for patients,
            doctors, and medical students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Services Quick Access */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Services</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Access comprehensive healthcare services all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-md transition-all duration-300 cursor-pointer border-border/50"
              >
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" className="w-full group-hover:bg-primary/10" asChild>
                    <a href={service.href}>Explore</a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
