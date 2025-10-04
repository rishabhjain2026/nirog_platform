"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, X } from "lucide-react"

interface LocationPromptProps {
  onLocationGranted?: (location: { lat: number; lng: number }) => void
  onLocationDenied?: () => void
}

export function LocationPrompt({ onLocationGranted, onLocationDenied }: LocationPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user already gave permission or denied
    const saved = localStorage.getItem("locationPermission")
    if (!saved) {
      // Show prompt after a short delay for better UX
      const timer = setTimeout(() => setShowPrompt(true), 2000)
      return () => clearTimeout(timer)
    } else if (saved === "granted") {
      getLocation()
    }
  }, [])

  const getLocation = () => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          localStorage.setItem("locationPermission", "granted")
          localStorage.setItem("userLocation", JSON.stringify(location))
          setShowPrompt(false)
          setIsLoading(false)
          onLocationGranted?.(location)
        },
        (error) => {
          console.error("Location access denied:", error)
          localStorage.setItem("locationPermission", "denied")
          setShowPrompt(false)
          setIsLoading(false)
          onLocationDenied?.()
        },
      )
    } else {
      console.error("Geolocation not supported.")
      localStorage.setItem("locationPermission", "denied")
      setShowPrompt(false)
      setIsLoading(false)
      onLocationDenied?.()
    }
  }

  const handleMaybeLater = () => {
    localStorage.setItem("locationPermission", "denied")
    setShowPrompt(false)
    onLocationDenied?.()
  }

  if (!showPrompt) return null

  return (
    <div className="fixed top-4 right-4 z-50 w-80 animate-slide-up">
      <Card className="shadow-lg border-primary/20 bg-card/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-lg">Enable Location Access</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={handleMaybeLater} className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-sm">
            We need your location to show nearby doctors, hospitals, and labs for faster appointments.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMaybeLater}
              className="flex-1 bg-transparent"
              disabled={isLoading}
            >
              Maybe Later
            </Button>
            <Button onClick={getLocation} size="sm" className="flex-1" disabled={isLoading}>
              {isLoading ? "Getting Location..." : "Allow"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
