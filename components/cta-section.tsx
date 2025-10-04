import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Heart, Shield, Clock } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-border/50 shadow-xl">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-balance">
                  Ready to Transform Your{" "}
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Healthcare Experience
                  </span>
                  ?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                  Join thousands of patients and healthcare professionals who trust Nirog for their medical needs. Start
                  your journey to better health today.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-8 py-6">
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Verified Doctors</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure Platform</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>24/7 Support</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6 h-auto group" asChild>
                  <a href="/signup">
                    Start Your Health Journey
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto bg-transparent" asChild>
                  <a href="/doctors">Find a Doctor</a>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">No setup fees • Free to join • Cancel anytime</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
