"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Eye, User, GraduationCap, Award, Phone, Mail, FileText, Loader2 } from "lucide-react"

interface Doctor {
  id: number
  userId: number
  firstName: string
  lastName: string
  email: string
  phone: string
  specialization: string
  qualification: string
  experienceYears: number
  registrationNumber: string
  consultationFee: number
  verificationStatus: "pending" | "approved" | "rejected"
  verifiedAt: string | null
  rejectionReason: string | null
  createdAt: string
}

export function DoctorVerificationPanel() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState("pending")
  const [actionLoading, setActionLoading] = useState<number | null>(null)

  useEffect(() => {
    fetchDoctors()
  }, [selectedStatus])

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/doctors?status=${selectedStatus}`)
      const data = await response.json()

      if (response.ok) {
        setDoctors(data.doctors)
      }
    } catch (error) {
      console.error("Error fetching doctors:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationAction = async (doctorId: number, action: "approve" | "reject", rejectionReason?: string) => {
    try {
      setActionLoading(doctorId)

      const response = await fetch(`/api/admin/doctors/${doctorId}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          rejectionReason,
        }),
      })

      if (response.ok) {
        // Refresh the list
        fetchDoctors()
      }
    } catch (error) {
      console.error("Error updating verification status:", error)
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Doctor Verification</h2>
          <p className="text-muted-foreground">Review and verify doctor profiles</p>
        </div>
      </div>

      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({doctors.filter((d) => d.verificationStatus === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus} className="space-y-4">
          {doctors.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No doctors found for this status.</p>
              </CardContent>
            </Card>
          ) : (
            doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onAction={handleVerificationAction}
                isLoading={actionLoading === doctor.id}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface DoctorCardProps {
  doctor: Doctor
  onAction: (doctorId: number, action: "approve" | "reject", rejectionReason?: string) => void
  isLoading: boolean
}

function DoctorCard({ doctor, onAction, isLoading }: DoctorCardProps) {
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onAction(doctor.id, "reject", rejectionReason)
      setShowRejectionDialog(false)
      setRejectionReason("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Dr. {doctor.firstName} {doctor.lastName}
              </CardTitle>
              <CardDescription>{doctor.specialization}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(doctor.verificationStatus)}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    Dr. {doctor.firstName} {doctor.lastName} - Verification Details
                  </DialogTitle>
                  <DialogDescription>Review all submitted information and documents</DialogDescription>
                </DialogHeader>
                <DoctorDetailsView doctor={doctor} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{doctor.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{doctor.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span>{doctor.registrationNumber}</span>
          </div>
        </div>

        {doctor.verificationStatus === "pending" && (
          <div className="flex gap-2">
            <Button
              onClick={() => onAction(doctor.id, "approve")}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
              Approve
            </Button>

            <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive" disabled={isLoading}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reject Doctor Verification</DialogTitle>
                  <DialogDescription>
                    Please provide a reason for rejecting Dr. {doctor.firstName} {doctor.lastName}'s verification.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rejectionReason">Rejection Reason</Label>
                    <Textarea
                      id="rejectionReason"
                      placeholder="Please specify the reason for rejection..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
                      Reject
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {doctor.verificationStatus === "rejected" && doctor.rejectionReason && (
          <Alert variant="destructive" className="mt-4">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Rejection Reason:</strong> {doctor.rejectionReason}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

function DoctorDetailsView({ doctor }: { doctor: Doctor }) {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Full Name</Label>
            <p>
              Dr. {doctor.firstName} {doctor.lastName}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <p>{doctor.email}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Phone</Label>
            <p>{doctor.phone}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Registration Date</Label>
            <p>{new Date(doctor.createdAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Professional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Specialization</Label>
            <p>{doctor.specialization}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Experience</Label>
            <p>{doctor.experienceYears} years</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Qualification</Label>
            <p>{doctor.qualification}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Registration Number</Label>
            <p>{doctor.registrationNumber}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Consultation Fee</Label>
            <p>₹{doctor.consultationFee}</p>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Uploaded Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <Label className="text-sm font-medium">Government ID</Label>
              <p className="text-sm text-muted-foreground">Click to view document</p>
            </div>
            <div className="p-4 border rounded-lg">
              <Label className="text-sm font-medium">Degree Certificate</Label>
              <p className="text-sm text-muted-foreground">Click to view document</p>
            </div>
            <div className="p-4 border rounded-lg">
              <Label className="text-sm font-medium">Registration Certificate</Label>
              <p className="text-sm text-muted-foreground">Click to view document</p>
            </div>
            <div className="p-4 border rounded-lg">
              <Label className="text-sm font-medium">Experience Certificate</Label>
              <p className="text-sm text-muted-foreground">Click to view document</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>
    default:
      return <Badge variant="secondary">Pending</Badge>
  }
}
