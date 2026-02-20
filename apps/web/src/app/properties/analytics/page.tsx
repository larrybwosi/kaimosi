'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown, Eye, Heart, Share2, Search, MapPin, Home, DollarSign, Calendar, BarChart3, PieChart, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30')
  const [marketTrends, setMarketTrends] = useState<any>(null)
  const [topProperties, setTopProperties] = useState<any[]>([])
  const [searchTrends, setSearchTrends] = useState<any>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    // Mock data
    setMarketTrends({
      avgPrice: 95000,
      trend: 'increasing',
      totalProperties: 1245,
      priceRange: { min: 25000, max: 500000 }
    })

    setTopProperties([
      {
        id: '1',
        title: 'Modern 2-Bedroom Apartment',
        location: 'Westlands',
        views: 245,
        favorites: 18,
        shares: 12,
        price: 85000
      },
      {
        id: '2',
        title: 'Luxury Villa',
        location: 'Lavington',
        views: 189,
        favorites: 24,
        shares: 8,
        price: 45000000
      }
    ])

    setSearchTrends({
      totalSearches: 3420,
      topQueries: [
        { query: '2 bedroom Westlands', count: 145 },
        { query: 'apartments Kilimani', count: 123 },
        { query: 'house Karen', count: 98 }
      ],
      avgSearchesPerDay: 114
    })
  }

  const priceHistoryData = [
    { month: 'Jan', price: 90000 },
    { month: 'Feb', price: 88000 },
    { month: 'Mar', price: 92000 },
    { month: 'Apr', price: 94000 },
    { month: 'May', price: 95000 },
    { month: 'Jun', price: 95000 }
  ]

  const propertyTypeData = [
    { name: 'Apartments', value: 65, color: '#0f172a' },
    { name: 'Houses', value: 20, color: '#f97316' },
    { name: 'Villas', value: 10, color: '#6366f1' },
    { name: 'Studios', value: 5, color: '#8b5cf6' }
  ]

  const viewsData = [
    { day: 'Mon', views: 120 },
    { day: 'Tue', views: 145 },
    { day: 'Wed', views: 135 },
    { day: 'Thu', views: 165 },
    { day: 'Fri', views: 180 },
    { day: 'Sat', views: 210 },
    { day: 'Sun', views: 190 }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      notation: price > 1000000 ? 'compact' : 'standard'
    }).format(price)
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
              <Link href="/properties/favorites" className="text-sm text-muted-foreground hover:text-foreground">Favorites</Link>
              <Link href="/properties/analytics" className="text-sm font-medium text-foreground">Analytics</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Market Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights and trends</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {marketTrends && formatPrice(marketTrends.avgPrice)}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {marketTrends?.totalProperties.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12 new listings
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24.5K</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18% from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Searches/Day</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {searchTrends?.avgSearchesPerDay}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Activity className="h-3 w-3 mr-1" />
                Steady activity
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="market" className="space-y-6">
          <TabsList>
            <TabsTrigger value="market">Market Trends</TabsTrigger>
            <TabsTrigger value="properties">Top Properties</TabsTrigger>
            <TabsTrigger value="search">Search Trends</TabsTrigger>
          </TabsList>

          {/* Market Trends Tab */}
          <TabsContent value="market" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Average Price Trends</CardTitle>
                  <CardDescription>Monthly average rental prices</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={priceHistoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatPrice(Number(value))} />
                      <Line type="monotone" dataKey="price" stroke="#0f172a" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Property Types Distribution</CardTitle>
                  <CardDescription>Breakdown by property category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={propertyTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {propertyTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {propertyTypeData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Weekly Views</CardTitle>
                  <CardDescription>Property views over the last week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={viewsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="views" fill="#0f172a" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Price Range Distribution</CardTitle>
                  <CardDescription>Properties by price brackets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Under 50K</span>
                      <span className="font-semibold text-foreground">245 properties</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: '35%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">50K - 100K</span>
                      <span className="font-semibold text-foreground">420 properties</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: '60%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">100K - 200K</span>
                      <span className="font-semibold text-foreground">380 properties</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: '55%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Over 200K</span>
                      <span className="font-semibold text-foreground">200 properties</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: '28%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Top Properties Tab */}
          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Most Popular Properties</CardTitle>
                <CardDescription>Based on views, favorites, and shares</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProperties.map((property, index) => (
                    <div key={property.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Link href={`/properties/${property.id}`}>
                          <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                            {property.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          {property.views}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Heart className="h-4 w-4" />
                          {property.favorites}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Share2 className="h-4 w-4" />
                          {property.shares}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {formatPrice(property.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search Trends Tab */}
          <TabsContent value="search">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Top Search Queries</CardTitle>
                  <CardDescription>Most popular searches in the last {timeRange} days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {searchTrends?.topQueries.map((query: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{query.query}</span>
                          <span className="font-semibold text-muted-foreground">{query.count} searches</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2"
                            style={{ width: `${(query.count / searchTrends.topQueries[0].count) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Search Activity</CardTitle>
                  <CardDescription>Search volume statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Searches</p>
                      <p className="text-2xl font-bold text-foreground">{searchTrends?.totalSearches.toLocaleString()}</p>
                    </div>
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Daily Average</p>
                      <p className="text-2xl font-bold text-foreground">{searchTrends?.avgSearchesPerDay}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Peak Hour</p>
                      <p className="text-2xl font-bold text-foreground">2-4 PM</p>
                    </div>
                    <Activity className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
