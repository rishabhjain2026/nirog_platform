import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Heart, BookOpen, Building2, FlaskConical, HelpCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/nirog-logo.jpg"
                alt="Nirog – Healthy Life Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground text-pretty">
              Your trusted all-in-one healthcare platform connecting patients, doctors, and medical professionals for
              better health outcomes.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span>Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>24/7</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:support@nirog.com" className="hover:text-primary transition-colors">
                  support@nirog.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+917880113814" className="hover:text-primary transition-colors">
                  +91 7880113814
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">Bhopal, Madhya Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* For Providers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">For Healthcare Providers</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="justify-start p-0 h-auto text-sm" asChild>
                <Link href="/signup?role=doctor" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Join as Doctor
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-sm" asChild>
                <Link href="/verification-process" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Verification Process
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-sm" asChild>
                <Link href="/learning" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Student Resources
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links & Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="justify-start p-0 h-auto text-sm" asChild>
                <Link href="/doctors" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Find Doctors
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-sm" asChild>
                <Link href="/hospitals" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Hospitals
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-sm" asChild>
                <Link href="/labs" className="flex items-center gap-2">
                  <FlaskConical className="h-4 w-4" />
                  Labs & Pharmacy
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-sm" asChild>
                <Link href="/support" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Support & FAQs
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Nirog. All rights reserved. | Built with care for better healthcare.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
