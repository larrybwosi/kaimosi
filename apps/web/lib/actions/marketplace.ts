"use server"

import { sanityClient, QUERIES } from "@/lib/sanity"

// Fetch products from Sanity
export async function getProducts(filters?: {
  category?: string
  featured?: boolean
  search?: string
  minPrice?: number
  maxPrice?: number
}) {
  try {
    let query = QUERIES.allProducts

    // Apply filters to GROQ query
    if (filters?.category) {
      query = `*[_type == "product" && references(*[_type=="category" && slug.current=="${filters.category}"]._id)]`
    } else if (filters?.featured) {
      query = QUERIES.featuredProducts
    }

    const products = await sanityClient.fetch(query)

    // Apply client-side filters
    let filteredProducts = products

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      filteredProducts = filteredProducts.filter((p: any) => p.name.toLowerCase().includes(searchLower))
    }

    if (filters?.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p: any) => p.price >= filters.minPrice!)
    }

    if (filters?.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p: any) => p.price <= filters.maxPrice!)
    }

    return { success: true, data: filteredProducts }
  } catch (error) {
    console.error("Error fetching products:", error)
    return { success: false, error: "Failed to fetch products" }
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await sanityClient.fetch(QUERIES.productBySlug, { slug })
    if (!product) {
      return { success: false, error: "Product not found" }
    }
    return { success: true, data: product }
  } catch (error) {
    console.error("Error fetching product:", error)
    return { success: false, error: "Failed to fetch product" }
  }
}

export async function getCategories() {
  try {
    const categories = await sanityClient.fetch(QUERIES.allCategories)
    return { success: true, data: categories }
  } catch (error) {
    console.error("Error fetching categories:", error)
    return { success: false, error: "Failed to fetch categories" }
  }
}

export async function getActiveDiscounts() {
  try {
    const discounts = await sanityClient.fetch(QUERIES.activeDiscounts)
    return { success: true, data: discounts }
  } catch (error) {
    console.error("Error fetching discounts:", error)
    return { success: false, error: "Failed to fetch discounts" }
  }
}

// Cart actions
export async function addToCart(productId: string, quantity = 1) {
  return { success: true, message: "Added to cart (demo mode)" }
}

export async function getCart() {
  return { success: true, data: [] }
}

export async function updateCartQuantity(cartItemId: string, quantity: number) {
  return { success: true }
}

export async function removeFromCart(cartItemId: string) {
  return { success: true }
}

// Calculate discounted price
export async function calculateDiscount(price: number, discount?: any) {
  if (!discount || !discount.isActive) return price

  if (discount.discountType === "percentage") {
    return price - (price * discount.value) / 100
  } else if (discount.discountType === "fixed") {
    return Math.max(0, price - discount.value)
  }

  return price
}
