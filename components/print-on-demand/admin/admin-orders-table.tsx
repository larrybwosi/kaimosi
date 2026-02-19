'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Eye, CheckCircle, XCircle, Truck } from 'lucide-react'
import { format } from 'date-fns'

export function AdminOrdersTable() {
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: 'POD-123456-ABC',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      status: 'PROCESSING',
      paymentStatus: 'COMPLETED',
      totalAmount: 3200,
      items: 2,
      createdAt: new Date('2025-02-15'),
    },
    {
      id: '2',
      orderNumber: 'POD-123457-DEF',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      status: 'PRODUCTION',
      paymentStatus: 'COMPLETED',
      totalAmount: 1300,
      items: 1,
      createdAt: new Date('2025-02-14'),
    },
    {
      id: '3',
      orderNumber: 'POD-123458-GHI',
      customerName: 'Bob Johnson',
      customerEmail: 'bob@example.com',
      status: 'PAID',
      paymentStatus: 'COMPLETED',
      totalAmount: 2000,
      items: 1,
      createdAt: new Date('2025-02-13'),
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    PENDING: { label: 'Pending', variant: 'outline' },
    PAID: { label: 'Paid', variant: 'default' },
    PROCESSING: { label: 'Processing', variant: 'secondary' },
    PRODUCTION: { label: 'Production', variant: 'secondary' },
    QUALITY_CHECK: { label: 'Quality Check', variant: 'secondary' },
    SHIPPING: { label: 'Shipping', variant: 'default' },
    DELIVERED: { label: 'Delivered', variant: 'default' },
    CANCELLED: { label: 'Cancelled', variant: 'destructive' },
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Order Management</h2>
          <p className="text-sm text-muted-foreground">
            Manage and fulfill customer orders
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const config = statusConfig[order.status] || statusConfig.PENDING
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="font-medium">KES {order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(order.createdAt, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            <DialogDescription>{order.orderNumber}</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4 mt-4">
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Customer Information</h4>
                              <div className="space-y-1 text-sm">
                                <p><span className="text-muted-foreground">Name:</span> {order.customerName}</p>
                                <p><span className="text-muted-foreground">Email:</span> {order.customerEmail}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2">Update Status</h4>
                              <Select
                                value={order.status}
                                onValueChange={(value) => updateOrderStatus(order.id, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="PAID">Paid</SelectItem>
                                  <SelectItem value="PROCESSING">Processing</SelectItem>
                                  <SelectItem value="PRODUCTION">Production</SelectItem>
                                  <SelectItem value="QUALITY_CHECK">Quality Check</SelectItem>
                                  <SelectItem value="SHIPPING">Shipping</SelectItem>
                                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2">Tracking Number</h4>
                              <Input placeholder="Enter tracking number..." />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {order.status === 'PAID' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-600"
                          onClick={() => updateOrderStatus(order.id, 'PROCESSING')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
