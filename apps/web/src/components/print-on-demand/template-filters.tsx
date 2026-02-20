'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { X } from 'lucide-react'

interface TemplateFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function TemplateFilters({ selectedCategory, onCategoryChange }: TemplateFiltersProps) {
  const categories = [
    { id: 'all', name: 'All Categories', count: 120 },
    { id: 'apparel', name: 'Apparel', count: 45 },
    { id: 'drinkware', name: 'Drinkware', count: 22 },
    { id: 'home', name: 'Home & Living', count: 31 },
    { id: 'accessories', name: 'Accessories', count: 15 },
    { id: 'stationery', name: 'Stationery', count: 7 },
  ]

  const tags = [
    'Business',
    'Minimalist',
    'Bold',
    'Vintage',
    'Modern',
    'Colorful',
    'Typography',
    'Illustration',
    'Abstract',
    'Nature',
  ]

  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#F59E0B' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-semibold">Categories</Label>
          {selectedCategory !== 'all' && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => onCategoryChange('all')}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
                selectedCategory === category.id
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-semibold mb-3 block">Style Tags</Label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs hover:bg-accent transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-semibold mb-3 block">Colors</Label>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              className="aspect-square rounded-md border-2 border-border hover:border-primary transition-colors"
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-semibold mb-3 block">Price Range</Label>
        <div className="space-y-2">
          {[
            { label: 'Under KES 500', value: '0-500' },
            { label: 'KES 500 - 1000', value: '500-1000' },
            { label: 'KES 1000 - 2000', value: '1000-2000' },
            { label: 'Over KES 2000', value: '2000+' },
          ].map((range) => (
            <div key={range.value} className="flex items-center space-x-2">
              <Checkbox id={range.value} />
              <label
                htmlFor={range.value}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
