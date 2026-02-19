'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, MapPin, Bed, Bath, Maximize, Trash2, Share2, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [preferences, setPreferences] = useState({
    minPrice: 0,
    maxPrice: 1000000,
    bedrooms: [2, 3],
    propertyTypes: ['APARTMENT'],
    preferredLocations: ['Westlands'],
    notificationsEnabled: true
  })

  useEffect(() => {
    fetchFavorites()
    fetchRecommendations()
  }, [])

  const fetchFavorites = async () => {
    // Mock data
    const mockFavorites = [
      {
        id: '1',
        property: {
          id: '1',
          title: 'Modern 2-Bedroom Apartment',
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
            district: 'Westlands'
          }
        },
        notes: 'Perfect location!',
        createdAt: new Date()
      }
    ]
    setFavorites(mockFavorites)
  }

  const fetchRecommendations = async () => {
    // Mock data
    const mockRecommendations = [
      {
        id: '2',
        title: 'Luxury 3-Bedroom Apartment',
        type: 'APARTMENT',
        listingType: 'FOR_RENT',
        price: 120000,
        priceUnit: 'KES',
        pricePerUnit: 'month',
        bedrooms: 3,
        bathrooms: 2,
        areaSize: 150,
        featuredImageUrl: '/placeholder.svg?height=400&width=600',
        location: {
          city: 'Nairobi',
          district: 'Westlands'
        },
        recommendationScore: 92,
        recommendationReason: 'Matches your preferred location and budget'
      }
    ]
    setRecommendations(mockRecommendations)
  }

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(f => f.id !== id))
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
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg" />
              <span className="text-xl font-semibold text-foreground">HomeFind</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/properties" className="text-sm text-muted-foreground hover:text-foreground">Properties</Link>
              <Link href="/properties/favorites" className="text-sm font-medium text-foreground">Favorites</Link>
              <Link href="/properties/analytics" className="text-sm text-muted-foreground hover:text-foreground">Analytics</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Dashboard</h1>

        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="favorites">
              <Heart className="h-4 w-4 mr-2" />
              Favorites ({favorites.length})
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              Recommendations ({recommendations.length})
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Settings className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            {favorites.length === 0 ? (
              <Card className="p-12 text-center">
                <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No favorites yet</h3>
                <p className="text-muted-foreground mb-6">Start adding properties to your favorites</p>
                <Link href="/properties">
                  <Button>Browse Properties</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((favorite) => (
                  <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/properties/${favorite.property.id}`}>
                      <div className="relative aspect-video overflow-hidden group">
                        <img
                          src={favorite.property.featuredImageUrl}
                          alt={favorite.property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3">
                          {favorite.property.listingType === 'FOR_RENT' ? 'For Rent' : 'For Sale'}
                        </Badge>
                      </div>
                    </Link>
                    <div className="p-5">
                      <Badge variant="secondary" className="mb-2">{favorite.property.type}</Badge>
                      <Link href={`/properties/${favorite.property.id}`}>
                        <h3 className="text-lg font-semibold text-foreground mb-1 hover:text-primary transition-colors">
                          {favorite.property.title}
                        </h3>
                      </Link>
                      <div className="flex items-center text-sm text-muted-foreground gap-1 mb-3">
                        <MapPin className="h-4 w-4" />
                        {favorite.property.location.district}, {favorite.property.location.city}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          {favorite.property.bedrooms}
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          {favorite.property.bathrooms}
                        </div>
                        <div className="flex items-center gap-1">
                          <Maximize className="h-4 w-4" />
                          {favorite.property.areaSize}m²
                        </div>
                      </div>
                      {favorite.notes && (
                        <p className="text-sm text-muted-foreground mb-3 pb-3 border-b italic">
                          {favorite.notes}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-primary">
                          {formatPrice(favorite.property.price, favorite.property.pricePerUnit)}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFavorite(favorite.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Personalized for You</h2>
              <p className="text-muted-foreground">Based on your preferences and browsing history</p>
            </div>
            
            {recommendations.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No recommendations available yet</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/properties/${property.id}`}>
                      <div className="relative aspect-video overflow-hidden group">
                        <img
                          src={property.featuredImageUrl}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3" variant="secondary">
                          {property.recommendationScore}% Match
                        </Badge>
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
                      <p className="text-xs text-accent mb-3">{property.recommendationReason}</p>
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
                      <p className="text-xl font-bold text-primary">
                        {formatPrice(property.price, property.pricePerUnit)}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card className="p-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Search Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-foreground mb-3 block">Price Range (KES/month)</Label>
                  <div className="space-y-3">
                    <Slider
                      min={0}
                      max={1000000}
                      step={10000}
                      value={[preferences.maxPrice]}
                      onValueChange={([max]) => setPreferences({ ...preferences, maxPrice: max })}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatPrice(preferences.minPrice, 'month')}</span>
                      <span>{formatPrice(preferences.maxPrice, 'month')}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-foreground mb-3 block">Preferred Bedrooms</Label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map(num => (
                      <Button
                        key={num}
                        variant={preferences.bedrooms.includes(num) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          const newBedrooms = preferences.bedrooms.includes(num)
                            ? preferences.bedrooms.filter(b => b !== num)
                            : [...preferences.bedrooms, num]
                          setPreferences({ ...preferences, bedrooms: newBedrooms })
                        }}
                      >
                        {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-foreground mb-3 block">Property Types</Label>
                  <Select
                    value={preferences.propertyTypes[0]}
                    onValueChange={(v) => setPreferences({ ...preferences, propertyTypes: [v] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="APARTMENT">Apartment</SelectItem>
                      <SelectItem value="HOUSE">House</SelectItem>
                      <SelectItem value="VILLA">Villa</SelectItem>
                      <SelectItem value="STUDIO">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <Label className="text-foreground mb-3 block">Preferred Locations</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Westlands', 'Kilimani', 'Lavington', 'Karen'].map(location => (
                      <Button
                        key={location}
                        variant={preferences.preferredLocations.includes(location) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          const newLocations = preferences.preferredLocations.includes(location)
                            ? preferences.preferredLocations.filter(l => l !== location)
                            : [...preferences.preferredLocations, location]
                          setPreferences({ ...preferences, preferredLocations: newLocations })
                        }}
                      >
                        {location}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts for new matching properties</p>
                  </div>
                  <Switch
                    checked={preferences.notificationsEnabled}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, notificationsEnabled: checked })
                    }
                  />
                </div>

                <Button className="w-full" size="lg">
                  Save Preferences
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
