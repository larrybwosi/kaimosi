'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Maximize, Calendar, TrendingUp, Eye, Users, ChevronLeft, ChevronRight, Image as ImageIcon, Layers, Box, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [viewMode, setViewMode] = useState<'photos' | 'floorplan' | '3d'>('photos')

  useEffect(() => {
    // Fetch property details
    fetchProperty()
  }, [params.id])

  const fetchProperty = async () => {
    // Mock data
    const mockProperty = {
      id: params.id,
      title: 'Modern 2-Bedroom Apartment in Westlands',
      description: 'Experience luxury living in this beautifully designed 2-bedroom apartment located in the heart of Westlands. This stunning property features contemporary finishes, an open-plan living area, and breathtaking city views. The spacious master bedroom includes an en-suite bathroom, while the second bedroom is perfect for guests or a home office. The apartment comes with a fully equipped kitchen with modern appliances, ample storage space, and access to premium building amenities including a gym, swimming pool, and 24/7 security.',
      type: 'APARTMENT',
      subType: '2-bed',
      listingType: 'FOR_RENT',
      price: 85000,
      priceUnit: 'KES',
      pricePerUnit: 'month',
      bedrooms: 2,
      bathrooms: 2,
      areaSize: 120,
      furnishingType: 'Semi-furnished',
      yearBuilt: 2020,
      floorNumber: 5,
      totalFloors: 12,
      featuredImageUrl: '/placeholder.svg?height=600&width=800',
      location: {
        city: 'Nairobi',
        district: 'Westlands',
        country: 'Kenya',
        streetAddress: 'Rhapta Road, Westlands'
      },
      status: 'AVAILABLE',
      images: [
        { id: '1', url: '/placeholder.svg?height=600&width=800', caption: 'Living Room', displayOrder: 0 },
        { id: '2', url: '/placeholder.svg?height=600&width=800', caption: 'Master Bedroom', displayOrder: 1 },
        { id: '3', url: '/placeholder.svg?height=600&width=800', caption: 'Kitchen', displayOrder: 2 },
        { id: '4', url: '/placeholder.svg?height=600&width=800', caption: 'Bathroom', displayOrder: 3 },
        { id: '5', url: '/placeholder.svg?height=600&width=800', caption: 'Balcony View', displayOrder: 4 }
      ],
      floorPlans: [
        { id: '1', name: 'Ground Floor', imageUrl: '/placeholder.svg?height=600&width=800', areaSize: 120 }
      ],
      amenities: [
        { amenity: { name: 'Gym', category: 'facility' } },
        { amenity: { name: 'Swimming Pool', category: 'facility' } },
        { amenity: { name: 'Parking', category: 'feature' } },
        { amenity: { name: 'Security', category: 'service' } },
        { amenity: { name: 'Elevator', category: 'feature' } },
        { amenity: { name: 'Backup Generator', category: 'feature' } }
      ],
      priceHistory: [
        { price: 90000, createdAt: new Date('2024-01-01'), changeReason: 'initial' },
        { price: 85000, createdAt: new Date('2024-03-01'), changeReason: 'reduction' }
      ],
      analytics: {
        totalViews: 245,
        totalFavorites: 18,
        totalShares: 12
      },
      _count: {
        userFavorites: 18,
        views: 245,
        shares: 12
      }
    }
    setProperty(mockProperty)
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/properties" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to listings</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsFavorited(!isFavorited)}>
                <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-primary text-primary' : ''}`} />
                {isFavorited ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="relative h-[500px] bg-muted">
        {viewMode === 'photos' && (
          <>
            <img
              src={property.images[currentImageIndex]?.url}
              alt={property.images[currentImageIndex]?.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        {viewMode === 'floorplan' && (
          <div className="flex items-center justify-center h-full">
            <img
              src={property.floorPlans[0]?.imageUrl}
              alt="Floor Plan"
              className="max-h-full object-contain"
            />
          </div>
        )}
        {viewMode === '3d' && (
          <div className="flex items-center justify-center h-full bg-muted">
            <div className="text-center">
              <Box className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-semibold text-foreground mb-2">3D Virtual Tour</p>
              <p className="text-sm text-muted-foreground">Interactive 3D tour coming soon</p>
            </div>
          </div>
        )}

        {/* View Mode Selector */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant={viewMode === 'photos' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('photos')}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Photos
          </Button>
          <Button
            variant={viewMode === 'floorplan' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('floorplan')}
          >
            <Layers className="h-4 w-4 mr-2" />
            Floor Plan
          </Button>
          <Button
            variant={viewMode === '3d' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('3d')}
          >
            <Box className="h-4 w-4 mr-2" />
            3D Tour
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{property.type}</Badge>
                    <Badge variant="outline">{property.listingType === 'FOR_RENT' ? 'For Rent' : 'For Sale'}</Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location.streetAddress}, {property.location.district}, {property.location.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-sm text-muted-foreground">per {property.pricePerUnit}</p>
                </div>
              </div>

              {/* Key Features */}
              <div className="flex flex-wrap gap-6 p-4 bg-muted/50 rounded-lg">
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
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year Built</p>
                    <p className="font-semibold text-foreground">{property.yearBuilt}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="pricing">Price History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">About this property</h3>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Property Details</h4>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Type:</dt>
                        <dd className="font-medium text-foreground">{property.type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Furnishing:</dt>
                        <dd className="font-medium text-foreground">{property.furnishingType}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Floor:</dt>
                        <dd className="font-medium text-foreground">{property.floorNumber} of {property.totalFloors}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Status:</dt>
                        <dd className="font-medium text-green-600">{property.status}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities">
                <div className="grid md:grid-cols-2 gap-4">
                  {property.amenities.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-foreground">{item.amenity.name}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pricing">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Price History</h3>
                  <div className="space-y-3">
                    {property.priceHistory.map((history: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-semibold text-foreground">{formatPrice(history.price)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(history.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={history.changeReason === 'reduction' ? 'default' : 'secondary'}>
                          {history.changeReason}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Actions & Stats */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Interested in this property?</h3>
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Schedule Viewing
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Agent
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </Card>

            {/* Property Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Property Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Views</span>
                  </div>
                  <span className="font-semibold text-foreground">{property.analytics.totalViews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Favorites</span>
                  </div>
                  <span className="font-semibold text-foreground">{property.analytics.totalFavorites}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Shares</span>
                  </div>
                  <span className="font-semibold text-foreground">{property.analytics.totalShares}</span>
                </div>
              </div>
            </Card>

            {/* Market Trend */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Market Trend</h3>
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Properties in this area are in high demand</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Similar Properties</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-muted" />
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">Similar Property {i}</h3>
                  <p className="text-sm text-muted-foreground">Westlands, Nairobi</p>
                  <p className="text-lg font-bold text-primary mt-2">{formatPrice(80000)}/month</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
