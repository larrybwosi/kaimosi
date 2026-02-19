'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MapPin, Bed, Bath, Maximize, Heart, SlidersHorizontal, Grid3x3, LayoutList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PropertiesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [properties, setProperties] = useState<any[]>([])
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    listingType: 'all',
    minPrice: 0,
    maxPrice: 1000000,
    bedrooms: [] as number[],
    location: 'all',
    sortBy: 'createdAt'
  })

  useEffect(() => {
    // Fetch properties
    fetchProperties()
  }, [filters])

  const fetchProperties = async () => {
    // Mock data
    const mockProperties = [
      {
        id: '1',
        title: 'Modern 2-Bedroom Apartment',
        description: 'Spacious apartment with stunning city views',
        type: 'APARTMENT',
        listingType: 'FOR_RENT',
        price: 85000,
        priceUnit: 'KES',
        pricePerUnit: 'month',
        bedrooms: 2,
        bathrooms: 2,
        areaSize: 120,
        featuredImageUrl: '/placeholder.svg?height=400&width=600',
        location: {
          city: 'Nairobi',
          district: 'Westlands',
          country: 'Kenya'
        },
        status: 'AVAILABLE',
        _count: { userFavorites: 12 }
      },
      {
        id: '2',
        title: 'Luxury Villa in Lavington',
        description: 'Beautiful standalone villa with private garden',
        type: 'VILLA',
        listingType: 'FOR_SALE',
        price: 45000000,
        priceUnit: 'KES',
        pricePerUnit: 'total',
        bedrooms: 4,
        bathrooms: 3,
        areaSize: 350,
        featuredImageUrl: '/placeholder.svg?height=400&width=600',
        location: {
          city: 'Nairobi',
          district: 'Lavington',
          country: 'Kenya'
        },
        status: 'AVAILABLE',
        _count: { userFavorites: 28 }
      },
      {
        id: '3',
        title: 'Cozy Studio in Kilimani',
        description: 'Perfect for young professionals',
        type: 'STUDIO',
        listingType: 'FOR_RENT',
        price: 45000,
        priceUnit: 'KES',
        pricePerUnit: 'month',
        bedrooms: 1,
        bathrooms: 1,
        areaSize: 55,
        featuredImageUrl: '/placeholder.svg?height=400&width=600',
        location: {
          city: 'Nairobi',
          district: 'Kilimani',
          country: 'Kenya'
        },
        status: 'AVAILABLE',
        _count: { userFavorites: 8 }
      }
    ]
    setProperties(mockProperties)
  }

  const formatPrice = (price: number, unit: string, perUnit: string) => {
    const formatted = new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price)
    return perUnit === 'total' ? formatted : `${formatted}/${perUnit}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg" />
              <span className="text-xl font-semibold text-foreground">HomeFind</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/properties" className="text-sm font-medium text-foreground">Properties</Link>
              <Link href="/properties/favorites" className="text-sm text-muted-foreground hover:text-foreground">Favorites</Link>
              <Link href="/properties/analytics" className="text-sm text-muted-foreground hover:text-foreground">Analytics</Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, property type..."
                className="pl-10"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <Select value={filters.listingType} onValueChange={(v) => setFilters({ ...filters, listingType: v })}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Listing Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="FOR_RENT">For Rent</SelectItem>
                <SelectItem value="FOR_SALE">For Sale</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="space-y-6 py-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-foreground">Filter Properties</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-foreground">Property Type</Label>
                    <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="APARTMENT">Apartment</SelectItem>
                        <SelectItem value="HOUSE">House</SelectItem>
                        <SelectItem value="VILLA">Villa</SelectItem>
                        <SelectItem value="STUDIO">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-foreground">Price Range (KES)</Label>
                    <div className="pt-2">
                      <Slider
                        min={0}
                        max={1000000}
                        step={10000}
                        value={[filters.maxPrice]}
                        onValueChange={([max]) => setFilters({ ...filters, maxPrice: max })}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Up to {formatPrice(filters.maxPrice, 'KES', 'month')}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-foreground">Bedrooms</Label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map(num => (
                        <Button
                          key={num}
                          variant={filters.bedrooms.includes(num) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            const newBedrooms = filters.bedrooms.includes(num)
                              ? filters.bedrooms.filter(b => b !== num)
                              : [...filters.bedrooms, num]
                            setFilters({ ...filters, bedrooms: newBedrooms })
                          }}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-foreground">Location</Label>
                    <Select value={filters.location} onValueChange={(v) => setFilters({ ...filters, location: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="westlands">Westlands</SelectItem>
                        <SelectItem value="kilimani">Kilimani</SelectItem>
                        <SelectItem value="lavington">Lavington</SelectItem>
                        <SelectItem value="karen">Karen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" onClick={() => fetchProperties()}>
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Explore Properties</h1>
            <p className="text-muted-foreground">{properties.length} properties available</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={filters.sortBy} onValueChange={(v) => setFilters({ ...filters, sortBy: v })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Newest</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="bedrooms">Bedrooms</SelectItem>
              </SelectContent>
            </Select>
            <Tabs value={view} onValueChange={(v) => setView(v as 'grid' | 'list')}>
              <TabsList>
                <TabsTrigger value="grid">
                  <Grid3x3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <LayoutList className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Properties Grid */}
        <div className={view === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} view={view} />
          ))}
        </div>
      </main>
    </div>
  )
}

function PropertyCard({ property, view }: { property: any; view: 'grid' | 'list' }) {
  const [isFavorited, setIsFavorited] = useState(false)

  const formatPrice = (price: number, unit: string, perUnit: string) => {
    const formatted = new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price)
    return perUnit === 'total' ? formatted : `${formatted}/${perUnit}`
  }

  if (view === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-80 h-60">
            <img
              src={property.featuredImageUrl}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-3 right-3"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-primary text-primary' : ''}`} />
            </Button>
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Badge variant="secondary" className="mb-2">{property.type}</Badge>
                <h3 className="text-xl font-semibold text-foreground mb-1">{property.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.location.district}, {property.location.city}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(property.price, property.priceUnit, property.pricePerUnit)}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{property.description}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                {property.bedrooms} Beds
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                {property.bathrooms} Baths
              </div>
              <div className="flex items-center gap-1">
                <Maximize className="h-4 w-4" />
                {property.areaSize} m²
              </div>
            </div>
            <Link href={`/properties/${property.id}`}>
              <Button className="w-full md:w-auto">View Details</Button>
            </Link>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={`/properties/${property.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={property.featuredImageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3">{property.listingType === 'FOR_RENT' ? 'For Rent' : 'For Sale'}</Badge>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3"
            onClick={(e) => {
              e.preventDefault()
              setIsFavorited(!isFavorited)
            }}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-primary text-primary' : ''}`} />
          </Button>
        </div>
      </Link>
      <div className="p-5">
        <Badge variant="secondary" className="mb-2">{property.type}</Badge>
        <Link href={`/properties/${property.id}`}>
          <h3 className="text-lg font-semibold text-foreground mb-1 hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>
        <div className="flex items-center text-sm text-muted-foreground gap-1 mb-3">
          <MapPin className="h-4 w-4" />
          {property.location.district}, {property.location.city}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {property.bedrooms}
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {property.bathrooms}
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            {property.areaSize}m²
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-primary">
            {formatPrice(property.price, property.priceUnit, property.pricePerUnit)}
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Heart className="h-4 w-4" />
            {property._count.userFavorites}
          </div>
        </div>
      </div>
    </Card>
  )
}
