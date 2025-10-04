"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  Menu,
  User,
  LogOut,
  Settings,
  Heart,
  Calendar,
  BookOpen,
  Building2,
  FlaskConical,
  Globe,
} from "lucide-react"

interface HeaderProps {
  isLoggedIn?: boolean
  userRole?: "patient" | "doctor" | "student" | "admin"
  userName?: string
}

export function Header({ isLoggedIn = false, userRole = "patient", userName }: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  ]

  const navigationItems = [
    { href: "/doctors", label: "Find Doctors", icon: Heart },
    { href: "/learning", label: "Learning", icon: BookOpen },
    { href: "/hospitals", label: "Hospitals", icon: Building2 },
    { href: "/labs", label: "Labs/Pharmacy", icon: FlaskConical },
    { href: "/appointments", label: "Appointments", icon: Calendar },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/nirog-logo.jpg"
              alt="Nirog – Healthy Life Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search doctors, hospitals, labs..."
                className={`w-80 pl-10 transition-all duration-200 ${isSearchFocused ? "ring-2 ring-primary/20" : ""}`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                aria-label="Search healthcare services"
              />
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <Globe className="h-4 w-4 mr-2" />
                  {languages.find((lang) => lang.code === currentLanguage)?.flag}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => setCurrentLanguage(language.code)}
                    className={currentLanguage === language.code ? "bg-accent" : ""}
                  >
                    <span className="mr-2">{language.flag}</span>
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu or Auth Buttons */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {userName && <p className="font-medium">{userName}</p>}
                      <p className="w-[200px] truncate text-sm text-muted-foreground capitalize">{userRole}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="lg:hidden" size="sm" aria-label="Toggle navigation">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search healthcare services..."
                      className="pl-10"
                      aria-label="Search healthcare services"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      )
                    })}
                  </nav>

                  {/* Mobile Auth */}
                  {!isLoggedIn && (
                    <div className="space-y-2 pt-4 border-t">
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </div>
                  )}

                  {/* Mobile Language Selector */}
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Language</p>
                    <div className="space-y-1">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => setCurrentLanguage(language.code)}
                          className={`flex items-center space-x-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-accent ${
                            currentLanguage === language.code ? "bg-accent" : ""
                          }`}
                        >
                          <span>{language.flag}</span>
                          <span>{language.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
