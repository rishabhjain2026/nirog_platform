export interface Location {
  lat: number
  lng: number
}

export interface LocationPermission {
  status: "granted" | "denied" | "prompt"
  location?: Location
}

// Get user's current location
export function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  })
}

// Calculate distance between two points using Haversine formula
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in kilometers
  return Math.round(distance * 100) / 100 // Round to 2 decimal places
}

// Get location permission status from localStorage
export function getLocationPermission(): LocationPermission {
  if (typeof window === "undefined") {
    return { status: "prompt" }
  }

  const permission = localStorage.getItem("locationPermission")
  const locationData = localStorage.getItem("userLocation")

  if (permission === "granted" && locationData) {
    try {
      const location = JSON.parse(locationData)
      return { status: "granted", location }
    } catch {
      return { status: "prompt" }
    }
  }

  return { status: (permission as "granted" | "denied" | "prompt") || "prompt" }
}

// Set location permission in localStorage
export function setLocationPermission(status: "granted" | "denied", location?: Location) {
  localStorage.setItem("locationPermission", status)
  if (location) {
    localStorage.setItem("userLocation", JSON.stringify(location))
  }
}

// Get default location (Bhopal, MP)
export function getDefaultLocation(): Location {
  return {
    lat: 23.2599,
    lng: 77.4126,
  }
}

// Format distance for display
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`
  }
  return `${distance}km`
}

// Get location name from coordinates (reverse geocoding)
export async function getLocationName(lat: number, lng: number): Promise<string> {
  try {
    // In a real app, you'd use a geocoding service like Google Maps API
    // For now, return a placeholder
    return "Current Location"
  } catch (error) {
    console.error("Error getting location name:", error)
    return "Unknown Location"
  }
}
