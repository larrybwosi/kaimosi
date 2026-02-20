'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight, Package, Truck, CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  items: Array<{
    designName: string
    productName: string
    quantity: number
  }>
  totalAmount: number
  createdAt: Date
  estimatedDelivery?: Date
  deliveredAt?: Date
  trackingNumber?: string
}

interface OrderCardProps {
  order: Order
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: any }> = {
  PENDING: { label: 'Pending Payment', variant: 'outline', icon: Package },
  PAID: { label: 'Paid', variant: 'default', icon: CheckCircle2 },
  PROCESSING: { label: 'Processing', variant: 'secondary', icon: Package },
  PRODUCTION: { label: 'In Production', variant: 'secondary', icon: Package },
  QUALITY_CHECK: { label: 'Quality Check', variant: 'secondary', icon: Package },
  SHIPPING: { label: 'Shipping', variant: 'default', icon: Truck },
  DELIVERED: { label: 'Delivered', variant: 'default', icon: CheckCircle2 },
  CANCELLED: { label: 'Cancelled', variant: 'destructive', icon: Package },
  REFUNDED: { label: 'Refunded', variant: 'destructive', icon: Package },
}

export function OrderCard({ order }: OrderCardProps) {
  const config = statusConfig[order.status] || statusConfig.PENDING
  const StatusIcon = config.icon

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
            <Badge variant={config.variant} className="flex items-center gap-1">
              <StatusIcon className="h-3 w-3" />
              {config.label}
            </Badge>
          </div>

          <div className="space-y-1 text-sm text-muted-foreground mb-4">
            <p>Ordered on {format(order.createdAt, 'MMM dd, yyyy')}</p>
            {order.estimatedDelivery && !order.deliveredAt && (
              <p>Estimated delivery: {format(order.estimatedDelivery, 'MMM dd, yyyy')}</p>
            )}
            {order.deliveredAt && (
              <p>Delivered on {format(order.deliveredAt, 'MMM dd, yyyy')}</p>
            )}
            {order.trackingNumber && (
              <p>Tracking: <span className="font-mono font-medium text-foreground">{order.trackingNumber}</span></p>
            )}
          </div>

          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{item.productName}</span>
                <span className="text-muted-foreground"> - {item.designName}</span>
                <span className="text-muted-foreground"> × {item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-xl font-bold">KES {order.totalAmount.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-2">
              {order.status === 'SHIPPING' && (
                <Button variant="outline" size="sm">
                  Track Order
                </Button>
              )}
              {order.status === 'DELIVERED' && (
                <Button variant="outline" size="sm">
                  Order Again
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/print-on-demand/orders/${order.id}`}>
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
