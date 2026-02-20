'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AdminOrdersTable } from '@/components/print-on-demand/admin/admin-orders-table'
import { AdminStats } from '@/components/print-on-demand/admin/admin-stats'
import { AdminProductManagement } from '@/components/print-on-demand/admin/admin-product-management'
import { AdminTemplateManagement } from '@/components/print-on-demand/admin/admin-template-management'
import { Package, TrendingUp, ShoppingBag, DollarSign } from 'lucide-react'

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      change: '+12.5%',
      icon: Package,
      color: 'text-blue-500',
    },
    {
      title: 'Revenue (This Month)',
      value: 'KES 486,250',
      change: '+23.1%',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'In Production',
      value: '24',
      change: '+3',
      icon: ShoppingBag,
      color: 'text-orange-500',
    },
    {
      title: 'Avg. Order Value',
      value: 'KES 3,120',
      change: '+8.2%',
      icon: TrendingUp,
      color: 'text-purple-500',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Print-on-Demand fulfillment management
              </p>
            </div>

            <Badge variant="secondary" className="text-sm">
              Admin Access
            </Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </Card>
                )
              })}
            </div>

            <AdminStats />
          </TabsContent>

          <TabsContent value="orders">
            <AdminOrdersTable />
          </TabsContent>

          <TabsContent value="products">
            <AdminProductManagement />
          </TabsContent>

          <TabsContent value="templates">
            <AdminTemplateManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Advanced analytics and reporting coming soon
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
