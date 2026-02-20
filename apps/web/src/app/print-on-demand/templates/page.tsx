'use client'

import { useState, useEffect } from 'react'
import { Search, Grid, List, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TemplateGrid } from '@/components/print-on-demand/template-grid'
import { TemplateFilters } from '@/components/print-on-demand/template-filters'
import { useRouter } from 'next/navigation'

export default function TemplatesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch templates
    // This would call the API
    setTemplates([])
  }, [selectedCategory, searchQuery])

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background p-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Design Templates</h1>
              <p className="text-sm text-muted-foreground">
                Start with a professional template or create from scratch
              </p>
            </div>

            <Button onClick={() => router.push('/print-on-demand/studio')}>
              <Plus className="mr-2 h-4 w-4" />
              Create Blank Design
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Filters */}
        <aside className="w-64 border-r border-border bg-background p-4 overflow-y-auto">
          <TemplateFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </aside>

        {/* Templates Grid */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Templates</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="my-designs">My Designs</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <TemplateGrid
                  templates={templates}
                  viewMode={viewMode}
                  loading={loading}
                  onTemplateSelect={(templateId) => {
                    router.push(`/print-on-demand/studio?template=${templateId}`)
                  }}
                />
              </TabsContent>

              <TabsContent value="popular" className="mt-6">
                <TemplateGrid
                  templates={templates.filter((t: any) => t.popular)}
                  viewMode={viewMode}
                  loading={loading}
                  onTemplateSelect={(templateId) => {
                    router.push(`/print-on-demand/studio?template=${templateId}`)
                  }}
                />
              </TabsContent>

              <TabsContent value="recent" className="mt-6">
                <TemplateGrid
                  templates={templates}
                  viewMode={viewMode}
                  loading={loading}
                  onTemplateSelect={(templateId) => {
                    router.push(`/print-on-demand/studio?template=${templateId}`)
                  }}
                />
              </TabsContent>

              <TabsContent value="my-designs" className="mt-6">
                <TemplateGrid
                  templates={[]}
                  viewMode={viewMode}
                  loading={loading}
                  onTemplateSelect={(templateId) => {
                    router.push(`/print-on-demand/studio?design=${templateId}`)
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
