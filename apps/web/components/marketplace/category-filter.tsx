"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"
import { useRouter, useSearchParams } from "next/navigation"

export function CategoryFilter({ categories }: { categories: any[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (currentCategory === slug) {
      params.delete("category")
    } else {
      params.set("category", slug)
    }
    router.push(`/marketplace?${params.toString()}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {categories.map((category) => (
          <div key={category._id} className="flex items-center space-x-2">
            <Checkbox
              id={category.slug.current}
              checked={currentCategory === category.slug.current}
              onCheckedChange={() => handleCategoryChange(category.slug.current)}
            />
            <Label htmlFor={category.slug.current} className="text-sm font-normal cursor-pointer">
              {category.name}
            </Label>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
