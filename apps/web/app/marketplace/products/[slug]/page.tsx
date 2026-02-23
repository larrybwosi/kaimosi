import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/actions/marketplace"
import { ProductDetail } from "@/components/marketplace/product-detail"
import type { Metadata } from "next"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getProductBySlug(params.slug)

  if (!result.success || !result.data) {
    return { title: "Product Not Found" }
  }

  return {
    title: `${result.data.name} | Marketplace`,
    description: result.data.description?.[0]?.children?.[0]?.text || "Product details",
  }
}

export default async function ProductPage({ params }: Props) {
  const result = await getProductBySlug(params.slug)

  if (!result.success || !result.data) {
    notFound()
  }

  return <ProductDetail product={result.data} />
}
