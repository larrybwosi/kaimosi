'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Bed, Bath, Maximize, Heart, ArrowRight, MessageSquare, Star, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SharePropertyPage({ params }: { params: { token: string } }) {
  const [property, setProperty] = useState<any>(null)
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState<number>(0)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  useEffect(() => {
    fetchProperty()
    trackClick()
  }, [params.token])

  const fetchProperty = async () => {
    // Mock data
    const mockProperty = {
      id: '1',
      title: 'Modern 2-Bedroom Apartment in Westlands',
      description: 'Experience luxury living in this beautifully designed 2-bedroom apartment located in the heart of Westlands.',
      type: 'APARTMENT',
      listingType: 'FOR_RENT',
      price: 85000,
      priceUnit: 'KES',
      pricePerUnit: 'month',
      bedrooms: 2,
      bathrooms: 2,
      areaSize: 120,
      featuredImageUrl: '/placeholder.svg?height=600&width=800',
      location: {
        city: 'Nairobi',
        district: 'Westlands',
        country: 'Kenya',
        streetAddress: 'Rhapta Road, Westlands'
      },
      images: [
        { url: '/placeholder.svg?height=400&width=600', caption: 'Living Room' },
        { url: '/placeholder.svg?height=400&width=600', caption: 'Bedroom' },
        { url: '/placeholder.svg?height=400&width=600', caption: 'Kitchen' }
      ],
      amenities: [
        'Gym', 'Swimming Pool', 'Parking', 'Security', 'Elevator'
      ]
    }
    setProperty(mockProperty)
  }

  const trackClick = async () => {
    // Track share click
    console.log('[v0] Tracking share click for token:', params.token)
  }

  const submitFeedback = async () => {
    // Submit feedback
    console.log('[v0] Submitting feedback:', { rating, feedback })
    setFeedbackSubmitted(true)
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading property...</p>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number, pricePerUnit: string) => {
    const formatted = new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price)
    return pricePerUnit === 'total' ? formatted : `${formatted}/${pricePerUnit}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg" />
              <span className="text-xl font-semibold text-foreground">HomeFind</span>
            </div>
            <Badge variant="secondary">Shared Property</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Property Card */}
        <Card className="overflow-hidden mb-8">
          {/* Hero Image */}
          <div className="relative h-96">
            <img
              src={property.featuredImageUrl}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <Badge className="mb-3 bg-primary">{property.listingType === 'FOR_RENT' ? 'For Rent' : 'For Sale'}</Badge>
              <h1 className="text-3xl font-bold mb-2 text-balance">{property.title}</h1>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{property.location.streetAddress}, {property.location.district}, {property.location.city}</span>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="p-8">
            {/* Price & Key Stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(property.price, property.pricePerUnit)}
                </p>
                <p className="text-sm text-muted-foreground">per {property.pricePerUnit}</p>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="font-semibold text-foreground">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="font-semibold text-foreground">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="font-semibold text-foreground">{property.areaSize} m²</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">About this property</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            <Separator className="my-6" />

            {/* Amenities */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Amenities</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {property.amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Image Gallery */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Gallery</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {property.images.map((image: any, index: number) => (
                  <div key={index} className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/properties/${property.id}`} className="flex-1">
                <Button size="lg" className="w-full">
                  View Full Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Save to Favorites
              </Button>
            </div>
          </div>
        </Card>

        {/* Feedback Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Share Your Feedback</h2>
          <p className="text-muted-foreground mb-6">Help us understand what you think about this property</p>

          {feedbackSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Thank you for your feedback!</h3>
              <p className="text-muted-foreground">Your input helps us improve our property listings.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Rating */}
              <div>
                <Label className="text-foreground mb-3 block">How would you rate this property?</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-colors"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating ? 'fill-accent text-accent' : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Interest Level */}
              <div>
                <Label className="text-foreground mb-3 block">Interest Level</Label>
                <RadioGroup defaultValue="interested">
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="very-interested" id="very-interested" />
                    <Label htmlFor="very-interested" className="text-foreground font-normal">
                      Very interested - I want to schedule a viewing
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="interested" id="interested" />
                    <Label htmlFor="interested" className="text-foreground font-normal">
                      Interested - I'd like more information
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="maybe" id="maybe" />
                    <Label htmlFor="maybe" className="text-foreground font-normal">
                      Maybe - Still considering options
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-interested" id="not-interested" />
                    <Label htmlFor="not-interested" className="text-foreground font-normal">
                      Not interested
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Comments */}
              <div>
                <Label htmlFor="feedback" className="text-foreground mb-3 block">
                  Additional Comments (Optional)
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your thoughts about this property..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-32"
                />
              </div>

              <Button size="lg" className="w-full" onClick={submitFeedback}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Powered by HomeFind - Find your perfect home</p>
        </div>
      </main>
    </div>
  )
}
