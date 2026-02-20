'use client'

import { Card } from '@/components/ui/card'

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
              <div>
                <p className="text-sm font-medium">POD-{123450 + i}-ABC</p>
                <p className="text-xs text-muted-foreground">Customer Name</p>
              </div>
              <p className="text-sm font-medium">KES {(1000 + i * 200).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Production Queue</h3>
        <div className="space-y-3">
          {[
            { product: 'Premium T-Shirt', quantity: 12, priority: 'High' },
            { product: 'Ceramic Mug', quantity: 8, priority: 'Medium' },
            { product: 'Canvas Poster', quantity: 5, priority: 'Medium' },
            { product: 'Hoodie', quantity: 3, priority: 'Low' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
              <div>
                <p className="text-sm font-medium">{item.product}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.priority === 'High'
                    ? 'bg-red-500/10 text-red-600'
                    : item.priority === 'Medium'
                    ? 'bg-yellow-500/10 text-yellow-600'
                    : 'bg-gray-500/10 text-gray-600'
                }`}
              >
                {item.priority}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
