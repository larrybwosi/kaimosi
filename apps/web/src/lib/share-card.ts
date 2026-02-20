export interface ShareCard {
  id: string
  type: "product" | "attraction" | "restaurant" | "event" | "custom"
  title: string
  description: string
  image?: string
  deepLink: string
  backgroundColor?: string
  textColor?: string
  accentColor?: string
}

export interface ShareCardTemplate {
  id: string
  name: string
  type: ShareCard["type"]
  backgroundColor: string
  textColor: string
  accentColor: string
  icon: string
}

export const shareCardTemplates: ShareCardTemplate[] = [
  {
    id: "product-default",
    name: "Product Card",
    type: "product",
    backgroundColor: "#ffffff",
    textColor: "#1a1a1a",
    accentColor: "#2d5f3f",
    icon: "ShoppingBag",
  },
  {
    id: "attraction-vibrant",
    name: "Attraction Card",
    type: "attraction",
    backgroundColor: "#2d5f3f",
    textColor: "#ffffff",
    accentColor: "#f9f6f1",
    icon: "MapPin",
  },
  {
    id: "restaurant-elegant",
    name: "Restaurant Card",
    type: "restaurant",
    backgroundColor: "#1a1a1a",
    textColor: "#f9f6f1",
    accentColor: "#ff6b6b",
    icon: "Utensils",
  },
  {
    id: "event-fun",
    name: "Event Card",
    type: "event",
    backgroundColor: "#ff6b6b",
    textColor: "#ffffff",
    accentColor: "#1a1a1a",
    icon: "Calendar",
  },
  {
    id: "custom-minimal",
    name: "Custom Card",
    type: "custom",
    backgroundColor: "#f9f6f1",
    textColor: "#1a1a1a",
    accentColor: "#2d5f3f",
    icon: "Sparkles",
  },
]

export function generateDeepLink(type: string, slug: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const paths: Record<string, string> = {
    product: `/marketplace/products/${slug}`,
    attraction: `/attractions/${slug}`,
    restaurant: `/directory/restaurants/${slug}`,
    event: `/events/${slug}`,
    custom: `/${slug}`,
  }
  return `${baseUrl}${paths[type] || "/"}`
}

export function generateWhatsAppShareUrl(card: ShareCard): string {
  const message = `🎯 *${card.title}*\n\n${card.description}\n\n👉 Check it out: ${card.deepLink}`
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

export async function generateCardImage(card: ShareCard): Promise<string> {
  // This would typically call an API route to generate the image
  // For now, we'll return a placeholder
  return `/api/share-card/generate?id=${card.id}`
}
