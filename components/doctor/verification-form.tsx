"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  GraduationCap,
  Award,
  Briefcase,
  User,
  MapPin,
  Calendar,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface VerificationFormProps {
  userId: number
  onSubmit?: (data: any) => void
}

export function VerificationForm({ userId, onSubmit }: VerificationFormProps) {
  const [formData, setFormData] = useState({
    specialization: "",
    qualification: "",
    experienceYears: "",
    registrationNumber: "",
    consultationFee: "",
    bio: "",
    languagesSpoken: [] as string[],
    availableDays: [] as string[],
    availableHours: {
      start: "09:00",
      end: "17:00",
    },
  })

  const [documents, setDocuments] = useState({
    govtId: null as File | null,
    degreeCertificate: null as File | null,
    registrationCertificate: null as File | null,
    experienceCertificate: null as File | null,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "General Medicine",
    "Gynecology",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Surgery",
    "Urology",
  ]

  const languages = ["English", "Hindi", "Tamil", "Bengali", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam"]

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLanguageToggle = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languagesSpoken: prev.languagesSpoken.includes(language)
        ? prev.languagesSpoken.filter((lang) => lang !== language)
        : [...prev.languagesSpoken, language],
    }))
  }

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }))
  }

  const handleFileChange = (documentType: keyof typeof documents, file: File | null) => {
    setDocuments((prev) => ({
      ...prev,
      [documentType]: file,
    }))
  }

  const handleTimeChange = (timeType: "start" | "end", value: string) => {
    setFormData((prev) => ({
      ...prev,
      availableHours: {
        ...prev.availableHours,
        [timeType]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validation
      if (!formData.specialization || !formData.qualification || !formData.registrationNumber) {
        throw new Error("Please fill in all required fields")
      }

      if (!documents.govtId || !documents.degreeCertificate || !documents.registrationCertificate) {
        throw new Error("Please upload all required documents")
      }

      if (formData.languagesSpoken.length === 0) {
        throw new Error("Please select at least one language")
      }

      if (formData.availableDays.length === 0) {
        throw new Error("Please select at least one available day")
      }

      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append("userId", userId.toString())
      submitData.append("specialization", formData.specialization)
      submitData.append("qualification", formData.qualification)
      submitData.append("experienceYears", formData.experienceYears)
      submitData.append("registrationNumber", formData.registrationNumber)
      submitData.append("consultationFee", formData.consultationFee)
      submitData.append("bio", formData.bio)
      submitData.append("languagesSpoken", JSON.stringify(formData.languagesSpoken))
      submitData.append("availableDays", JSON.stringify(formData.availableDays))
      submitData.append("availableHours", JSON.stringify(formData.availableHours))

      // Append files
      if (documents.govtId) submitData.append("govtId", documents.govtId)
      if (documents.degreeCertificate) submitData.append("degreeCertificate", documents.degreeCertificate)
      if (documents.registrationCertificate)
        submitData.append("registrationCertificate", documents.registrationCertificate)
      if (documents.experienceCertificate) submitData.append("experienceCertificate", documents.experienceCertificate)

      const response = await fetch("/api/doctors/verify", {
        method: "POST",
        body: submitData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Verification submission failed")
      }

      setSuccess(true)
      onSubmit?.(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold">Verification Submitted Successfully!</h3>
            <p className="text-muted-foreground">
              Your verification documents have been submitted for review. Our team will verify your credentials and get
              back to you within 2-3 business days.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm">
                <strong>What happens next?</strong>
                <br />
                1. Our medical team will review your documents
                <br />
                2. We may contact you for additional information
                <br />
                3. Once approved, you'll receive a verified badge
                <br />
                4. You can start accepting patient appointments
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Doctor Verification
          </CardTitle>
          <CardDescription>
            Complete your profile verification to start accepting patients. All information will be reviewed by our
            medical team.
          </CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialization">
                  Specialization <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange("specialization", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceYears">Years of Experience</Label>
                <Input
                  id="experienceYears"
                  name="experienceYears"
                  type="number"
                  min="0"
                  max="50"
                  placeholder="e.g., 10"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification">
                Qualification <span className="text-destructive">*</span>
              </Label>
              <Input
                id="qualification"
                name="qualification"
                placeholder="e.g., MBBS, MD (Cardiology), DM (Cardiology)"
                value={formData.qualification}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">
                  Medical Registration Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  placeholder="e.g., MP12345"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="consultationFee">Consultation Fee (₹)</Label>
                <Input
                  id="consultationFee"
                  name="consultationFee"
                  type="number"
                  min="0"
                  placeholder="e.g., 500"
                  value={formData.consultationFee}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Brief description of your expertise and experience..."
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Languages Spoken <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <Badge
                  key={language}
                  variant={formData.languagesSpoken.includes(language) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleLanguageToggle(language)}
                >
                  {language}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Availability <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base font-medium">Available Days</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {daysOfWeek.map((day) => (
                  <div key={day.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.value}
                      checked={formData.availableDays.includes(day.value)}
                      onCheckedChange={() => handleDayToggle(day.value)}
                    />
                    <Label htmlFor={day.value} className="text-sm">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.availableHours.start}
                  onChange={(e) => handleTimeChange("start", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.availableHours.end}
                  onChange={(e) => handleTimeChange("end", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Upload
            </CardTitle>
            <CardDescription>Upload clear, high-quality images or PDFs of your documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DocumentUpload
              label="Government ID (Aadhaar/PAN/Passport)"
              required
              file={documents.govtId}
              onFileChange={(file) => handleFileChange("govtId", file)}
              icon={<User className="h-4 w-4" />}
            />

            <DocumentUpload
              label="Degree Certificate"
              required
              file={documents.degreeCertificate}
              onFileChange={(file) => handleFileChange("degreeCertificate", file)}
              icon={<GraduationCap className="h-4 w-4" />}
            />

            <DocumentUpload
              label="Medical Registration Certificate"
              required
              file={documents.registrationCertificate}
              onFileChange={(file) => handleFileChange("registrationCertificate", file)}
              icon={<Award className="h-4 w-4" />}
            />

            <DocumentUpload
              label="Experience Certificate (Optional)"
              file={documents.experienceCertificate}
              onFileChange={(file) => handleFileChange("experienceCertificate", file)}
              icon={<Briefcase className="h-4 w-4" />}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isLoading} className="min-w-[200px]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit for Verification
          </Button>
        </div>
      </form>
    </div>
  )
}

interface DocumentUploadProps {
  label: string
  required?: boolean
  file: File | null
  onFileChange: (file: File | null) => void
  icon: React.ReactNode
}

function DocumentUpload({ label, required, file, onFileChange, icon }: DocumentUploadProps) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    onFileChange(selectedFile)
  }

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {icon}
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="flex-1"
          required={required}
        />
        {file && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            {file.name}
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
    </div>
  )
}
