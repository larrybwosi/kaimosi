"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Utensils, Store, Bed, MapPin, Calendar, ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth, type Submission } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

type SubmissionType = Submission["type"]

const submissionTypes: { type: SubmissionType; label: string; icon: typeof Utensils; description: string }[] = [
  {
    type: "restaurant",
    label: "Restaurant",
    icon: Utensils,
    description: "Restaurants, cafés, and eateries",
  },
  {
    type: "store",
    label: "Store / Shop",
    icon: Store,
    description: "Retail stores, boutiques, and markets",
  },
  {
    type: "accommodation",
    label: "Accommodation",
    icon: Bed,
    description: "Hotels, B&Bs, hostels, and lodges",
  },
  {
    type: "attraction",
    label: "Attraction",
    icon: MapPin,
    description: "Parks, museums, and landmarks",
  },
  {
    type: "event",
    label: "Event",
    icon: Calendar,
    description: "Festivals, markets, and gatherings",
  },
]

const cuisineOptions = [
  "American",
  "Italian",
  "Mexican",
  "Chinese",
  "Japanese",
  "Indian",
  "Thai",
  "French",
  "Mediterranean",
  "Other",
]

const priceRanges = ["$", "$$", "$$$", "$$$$"]

export function SubmitForm() {
  const router = useRouter()
  const { user, isLoading, addSubmission } = useAuth()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<SubmissionType | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    cuisine: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    hours: "",
    priceRange: "",
    amenities: "",
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login?redirect=/submit")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSubmit = async () => {
    if (!selectedType) return

    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    addSubmission({
      type: selectedType,
      data: {
        ...formData,
        amenities: formData.amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
      },
    })

    setIsSubmitting(false)
    router.push("/dashboard?submitted=true")
  }

  const canProceed = () => {
    if (step === 1) return selectedType !== null
    if (step === 2) return formData.name && formData.description && formData.address
    return true
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-bold text-foreground">Submit a Listing</h1>
        <p className="mt-1 text-muted-foreground">
          Help grow our community directory by submitting a new place or event
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 font-medium transition-colors",
                  step >= s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground",
                )}
              >
                {step > s ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div className={cn("mx-2 h-1 w-16 rounded sm:w-24 md:w-32", step > s ? "bg-primary" : "bg-muted")} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className={step >= 1 ? "text-foreground" : "text-muted-foreground"}>Type</span>
          <span className={step >= 2 ? "text-foreground" : "text-muted-foreground"}>Details</span>
          <span className={step >= 3 ? "text-foreground" : "text-muted-foreground"}>Review</span>
        </div>
      </div>

      {/* Step 1: Select Type */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>What would you like to submit?</CardTitle>
            <CardDescription>Select the category that best fits your listing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {submissionTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => setSelectedType(type.type)}
                  className={cn(
                    "flex items-start gap-4 rounded-lg border-2 p-4 text-left transition-colors hover:border-primary/50",
                    selectedType === type.type ? "border-primary bg-primary/5" : "border-muted",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                      selectedType === type.type ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <type.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">{type.label}</p>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Enter Details */}
      {step === 2 && selectedType && (
        <Card>
          <CardHeader>
            <CardTitle>Enter Details</CardTitle>
            <CardDescription>Provide information about your listing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter the name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {selectedType === "restaurant" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cuisine">Cuisine Type</Label>
                    <Select
                      value={formData.cuisine}
                      onValueChange={(value) => setFormData({ ...formData, cuisine: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        {cuisineOptions.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceRange">Price Range</Label>
                    <Select
                      value={formData.priceRange}
                      onValueChange={(value) => setFormData({ ...formData, priceRange: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe this place or event..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  placeholder="Full street address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Hours of Operation</Label>
                <Input
                  id="hours"
                  placeholder="Mon-Fri: 9AM-5PM"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                />
              </div>

              {(selectedType === "accommodation" || selectedType === "attraction") && (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                  <Input
                    id="amenities"
                    placeholder="WiFi, Parking, Pet Friendly"
                    value={formData.amenities}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review */}
      {step === 3 && selectedType && (
        <Card>
          <CardHeader>
            <CardTitle>Review Your Submission</CardTitle>
            <CardDescription>Please verify all information before submitting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const type = submissionTypes.find((t) => t.type === selectedType)
                    if (!type) return null
                    const Icon = type.icon
                    return (
                      <>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{type.label}</p>
                          <p className="text-lg font-semibold">{formData.name}</p>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>

              <div className="grid gap-4 text-sm sm:grid-cols-2">
                {formData.description && (
                  <div className="sm:col-span-2">
                    <p className="font-medium text-muted-foreground">Description</p>
                    <p className="mt-1">{formData.description}</p>
                  </div>
                )}
                {formData.address && (
                  <div>
                    <p className="font-medium text-muted-foreground">Address</p>
                    <p className="mt-1">{formData.address}</p>
                  </div>
                )}
                {formData.phone && (
                  <div>
                    <p className="font-medium text-muted-foreground">Phone</p>
                    <p className="mt-1">{formData.phone}</p>
                  </div>
                )}
                {formData.email && (
                  <div>
                    <p className="font-medium text-muted-foreground">Email</p>
                    <p className="mt-1">{formData.email}</p>
                  </div>
                )}
                {formData.website && (
                  <div>
                    <p className="font-medium text-muted-foreground">Website</p>
                    <p className="mt-1">{formData.website}</p>
                  </div>
                )}
                {formData.hours && (
                  <div>
                    <p className="font-medium text-muted-foreground">Hours</p>
                    <p className="mt-1">{formData.hours}</p>
                  </div>
                )}
                {formData.cuisine && (
                  <div>
                    <p className="font-medium text-muted-foreground">Cuisine</p>
                    <p className="mt-1">{formData.cuisine}</p>
                  </div>
                )}
                {formData.priceRange && (
                  <div>
                    <p className="font-medium text-muted-foreground">Price Range</p>
                    <p className="mt-1">{formData.priceRange}</p>
                  </div>
                )}
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm">
                <p className="font-medium text-amber-800">What happens next?</p>
                <p className="mt-1 text-amber-700">
                  Your submission will be reviewed by our team. Once approved, it will appear in the directory.
                  You&apos;ll be notified of the status in your dashboard.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Submit for Review
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
