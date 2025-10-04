import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import { calculateDistance } from "@/lib/location"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = Number.parseFloat(searchParams.get("lat") || "0")
    const lng = Number.parseFloat(searchParams.get("lng") || "0")
    const type = searchParams.get("type") || "all" // hospitals, labs, pharmacies, or all
    const radius = Number.parseInt(searchParams.get("radius") || "10") // radius in km
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    if (!lat || !lng) {
      return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
    }

    const results: any[] = []

    // Helper function to fetch and process data
    const fetchNearbyData = async (tableName: string, entityType: string) => {
      const query = `
        SELECT id, name_en as name, address_en as address, phone, email, 
               latitude, longitude, timings_en as timings, services_en as services,
               rating, total_reviews, image_url
        FROM ${tableName}
        WHERE is_active = TRUE AND latitude IS NOT NULL AND longitude IS NOT NULL
        ORDER BY id
        LIMIT ?
      `

      const data = await executeQuery(query, [limit * 2]) // Fetch more to filter by distance

      if (Array.isArray(data)) {
        return data
          .map((item: any) => {
            const distance = calculateDistance(lat, lng, item.latitude, item.longitude)
            return {
              ...item,
              type: entityType,
              distance,
            }
          })
          .filter((item) => item.distance <= radius)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, Math.ceil(limit / 3)) // Distribute limit across types
      }

      return []
    }

    // Fetch data based on type
    if (type === "all" || type === "hospitals") {
      const hospitals = await fetchNearbyData("hospitals", "hospital")
      results.push(...hospitals)
    }

    if (type === "all" || type === "labs") {
      const labs = await fetchNearbyData("labs", "lab")
      results.push(...labs)
    }

    if (type === "all" || type === "pharmacies") {
      const pharmacies = await fetchNearbyData("pharmacies", "pharmacy")
      results.push(...pharmacies)
    }

    // Sort all results by distance and limit
    const sortedResults = results.sort((a, b) => a.distance - b.distance).slice(0, limit)

    return NextResponse.json({
      results: sortedResults,
      total: sortedResults.length,
      location: { lat, lng },
      radius,
    })
  } catch (error) {
    console.error("Nearby search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
