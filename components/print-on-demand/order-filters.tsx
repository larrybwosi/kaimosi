'use client'

import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

export function OrderFilters() {
  const [dateRange, setDateRange] = useState<any>()

  return (
    <div className="flex flex-col gap-6 py-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filter Orders</h3>
      </div>

      <div>
        <Label className="text-sm font-semibold mb-3 block">Order Status</Label>
        <div className="space-y-3">
          {[
            { id: 'pending', label: 'Pending Payment' },
            { id: 'processing', label: 'Processing' },
            { id: 'production', label: 'In Production' },
            { id: 'shipping', label: 'Shipping' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((status) => (
            <div key={status.id} className="flex items-center space-x-2">
              <Checkbox id={status.id} />
              <label
                htmlFor={status.id}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {status.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-semibold mb-3 block">Payment Status</Label>
        <div className="space-y-3">
          {[
            { id: 'paid', label: 'Paid' },
            { id: 'unpaid', label: 'Unpaid' },
            { id: 'refunded', label: 'Refunded' },
          ].map((status) => (
            <div key={status.id} className="flex items-center space-x-2">
              <Checkbox id={status.id} />
              <label
                htmlFor={status.id}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {status.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-semibold mb-3 block">Date Range</Label>
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          className="rounded-md border"
        />
      </div>

      <Separator />

      <div className="flex gap-2">
        <Button className="flex-1">Apply Filters</Button>
        <Button variant="outline" className="flex-1">Clear All</Button>
      </div>
    </div>
  )
}
