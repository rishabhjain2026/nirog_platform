import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { executeQuery } from "@/lib/database"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const doctorId = Number.parseInt(params.id)
    const body = await request.json()
    const { action, rejectionReason } = body // action: 'approve' or 'reject'

    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    if (action === "reject" && !rejectionReason) {
      return NextResponse.json({ error: "Rejection reason is required" }, { status: 400 })
    }

    // Check if doctor profile exists
    const checkQuery = "SELECT id, user_id FROM doctor_profiles WHERE id = ?"
    const checkResult = await executeQuery(checkQuery, [doctorId])

    if (!Array.isArray(checkResult) || checkResult.length === 0) {
      return NextResponse.json({ error: "Doctor profile not found" }, { status: 404 })
    }

    const doctorProfile = checkResult[0] as any

    // Update verification status
    let updateQuery: string
    let updateParams: any[]

    if (action === "approve") {
      updateQuery = `
        UPDATE doctor_profiles 
        SET verification_status = 'approved', verified_at = NOW(), verified_by = ?, rejection_reason = NULL
        WHERE id = ?
      `
      updateParams = [user.id, doctorId]

      // Also update user verification status
      await executeQuery("UPDATE users SET is_verified = TRUE WHERE id = ?", [doctorProfile.user_id])
    } else {
      updateQuery = `
        UPDATE doctor_profiles 
        SET verification_status = 'rejected', verified_by = ?, rejection_reason = ?
        WHERE id = ?
      `
      updateParams = [user.id, rejectionReason, doctorId]
    }

    await executeQuery(updateQuery, updateParams)

    return NextResponse.json({
      message: `Doctor ${action === "approve" ? "approved" : "rejected"} successfully`,
      status: action === "approve" ? "approved" : "rejected",
    })
  } catch (error) {
    console.error("Doctor verification action error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
