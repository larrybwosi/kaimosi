import { restaurants, stores, hostels } from "@/lib/data"
import { getAllAttractions } from "@/lib/sanity-queries"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://maplewood.town"

  const attractions = await getAllAttractions()

  // Static pages
  const staticPages = [
    "",
    "/history",
    "/culture",
    "/attractions",
    "/institutions",
    "/events",
    "/contact",
    "/directory/restaurants",
    "/directory/stores",
    "/directory/hostels",
    "/auth/login",
    "/auth/signup",
    "/marketplace",
    "/share",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  const attractionPages = attractions.map((attraction) => ({
    url: `${baseUrl}/attractions/${attraction.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Dynamic restaurant pages
  const restaurantPages = restaurants.map((restaurant) => ({
    url: `${baseUrl}/directory/restaurants/${restaurant.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Dynamic store pages
  const storePages = stores.map((store) => ({
    url: `${baseUrl}/directory/stores/${store.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Dynamic hostel pages
  const hostelPages = hostels.map((hostel) => ({
    url: `${baseUrl}/directory/hostels/${hostel.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...attractionPages, ...restaurantPages, ...storePages, ...hostelPages]
}
