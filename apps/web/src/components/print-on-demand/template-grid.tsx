'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Eye, ShoppingCart } from 'lucide-react'

interface Template {
  id: string
  name: string
  thumbnail?: string
  category: string
  tags?: string[]
  podProduct?: {
    name: string
    basePrice: number
  }
}

interface TemplateGridProps {
  templates: Template[]
  viewMode: 'grid' | 'list'
  loading: boolean
  onTemplateSelect: (templateId: string) => void
}

export function TemplateGrid({ templates, viewMode, loading, onTemplateSelect }: TemplateGridProps) {
  if (loading) {
    return (
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <Eye className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No templates found</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Try adjusting your search or filters to find what you're looking for
        </p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="flex gap-4 p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onTemplateSelect(template.id)}
          >
            <div className="w-32 h-32 bg-muted rounded-md flex-shrink-0">
              <img
                src={template.thumbnail || `/placeholder.svg?height=128&width=128`}
                alt={template.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.podProduct?.name}
                  </p>
                </div>
                {template.podProduct && (
                  <Badge variant="secondary">
                    KES {template.podProduct.basePrice}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 mt-3">
                {template.tags?.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Button size="sm" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button size="sm">
                  Use Template
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {templates.map((template) => (
        <Card
          key={template.id}
          className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all"
          onClick={() => onTemplateSelect(template.id)}
        >
          <div className="relative aspect-square bg-muted">
            <img
              src={template.thumbnail || `/placeholder.svg?height=400&width=400`}
              alt={template.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="sm" variant="secondary">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button size="sm">
                Use Template
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{template.name}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {template.podProduct?.name}
                </p>
              </div>
              {template.podProduct && (
                <Badge variant="secondary" className="ml-2">
                  KES {template.podProduct.basePrice}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-1 mt-2 flex-wrap">
              {template.tags?.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
