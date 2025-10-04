import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, Building2, Award } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Registered Patients",
      description: "Trust our platform",
    },
    {
      icon: Heart,
      value: "1,000+",
      label: "Verified Doctors",
      description: "Ready to help you",
    },
    {
      icon: Building2,
      value: "50+",
      label: "Partner Hospitals",
      description: "Across India",
    },
    {
      icon: Award,
      value: "24/7",
      label: "Support Available",
      description: "Always here for you",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our growing community of patients, doctors, and healthcare professionals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center border-border/50">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
