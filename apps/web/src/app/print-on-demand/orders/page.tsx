'use client'

import { useState } from 'react'
import { Package, Search, Filter, Download } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { OrderCard } from '@/components/print-on-demand/order-card'
import { OrderFilters } from '@/components/print-on-demand/order-filters'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: 'POD-123456-ABC',
      status: 'PROCESSING',
      paymentStatus: 'COMPLETED',
      items: [
        {
          designName: 'My Awesome Design',
          productName: 'Premium T-Shirt',
          quantity: 2,
        },
      ],
      totalAmount: 3200,
      createdAt: new Date('2025-02-15'),
      estimatedDelivery: new Date('2025-02-25'),
    },
    {
      id: '2',
      orderNumber: 'POD-123457-DEF',
      status: 'SHIPPING',
      paymentStatus: 'COMPLETED',
      items: [
        {
          designName: 'Coffee Lover',
          productName: 'Ceramic Mug',
          quantity: 1,
        },
      ],
      totalAmount: 1300,
      trackingNumber: 'TRK-9876543',
      createdAt: new Date('2025-02-12'),
      estimatedDelivery: new Date('2025-02-20'),
    },
    {
      id: '3',
      orderNumber: 'POD-123458-GHI',
      status: 'DELIVERED',
      paymentStatus: 'COMPLETED',
      items: [
        {
          designName: 'Abstract Art',
          productName: 'Canvas Poster',
          quantity: 1,
        },
      ],
      totalAmount: 2000,
      createdAt: new Date('2025-02-05'),
      deliveredAt: new Date('2025-02-14'),
    },
  ])

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    processing: orders.filter(o => ['PROCESSING', 'PRODUCTION', 'QUALITY_CHECK'].includes(o.status)).length,
    shipping: orders.filter(o => o.status === 'SHIPPING').length,
    delivered: orders.filter(o => o.status === 'DELIVERED').length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">My Orders</h1>
              <p className="text-sm text-muted-foreground">
                Track and manage your print-on-demand orders
              </p>
            </div>

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Orders
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by order number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <OrderFilters />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">
              All Orders
              {statusCounts.all > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {statusCounts.all}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {statusCounts.pending > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {statusCounts.pending}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="processing">
              Processing
              {statusCounts.processing > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {statusCounts.processing}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="shipping">
              Shipping
              {statusCounts.shipping > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {statusCounts.shipping}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="delivered">
              Delivered
              {statusCounts.delivered > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {statusCounts.delivered}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {orders.length === 0 ? (
              <Card className="p-12 text-center">
                <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                <p className="text-muted-foreground">
                  Your print-on-demand orders will appear here
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                <TabsContent value="all">
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </TabsContent>

                <TabsContent value="pending">
                  {orders
                    .filter((o) => o.status === 'PENDING')
                    .map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                </TabsContent>

                <TabsContent value="processing">
                  {orders
                    .filter((o) => ['PROCESSING', 'PRODUCTION', 'QUALITY_CHECK'].includes(o.status))
                    .map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                </TabsContent>

                <TabsContent value="shipping">
                  {orders
                    .filter((o) => o.status === 'SHIPPING')
                    .map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                </TabsContent>

                <TabsContent value="delivered">
                  {orders
                    .filter((o) => o.status === 'DELIVERED')
                    .map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                </TabsContent>
              </div>
            )}
          </div>
        </Tabs>
      </main>
    </div>
  )
}
