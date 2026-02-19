'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react'

export function AdminTemplateManagement() {
  const templates = [
    { id: '1', name: 'Minimalist Business', category: 'Business', status: 'Active', uses: 45 },
    { id: '2', name: 'Bold Typography', category: 'Modern', status: 'Active', uses: 32 },
    { id: '3', name: 'Vintage Frame', category: 'Vintage', status: 'Active', uses: 28 },
    { id: '4', name: 'Abstract Art', category: 'Art', status: 'Draft', uses: 0 },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Design Templates</h2>
          <p className="text-sm text-muted-foreground">
            Manage template library for customers
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="p-4">
            <div className="aspect-square bg-muted rounded-md mb-3" />
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{template.name}</h3>
                <Badge variant={template.status === 'Active' ? 'default' : 'secondary'}>
                  {template.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{template.category}</p>
              <p className="text-sm text-muted-foreground">{template.uses} uses</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  {template.status === 'Active' ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
