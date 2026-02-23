import { client } from "./sanity"

export interface Attraction {
  _id: string
  name: string
  slug: { current: string }
  category: string
  shortDescription: string
  fullDescription: string
  image?: string
  gallery?: string[]
  hours: string
  admission: string
  address: string
  phone: string
  coordinates: {
    lat: number
    lng: number
  }
  amenities: string[]
  featured: boolean
  order?: number
}

const ATTRACTION_FIELDS = `
  _id,
  name,
  slug,
  "category": category->name,
  shortDescription,
  "fullDescription": pt::text(fullDescription),
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  "hours": operatingHours.displayText,
  "admission": admission.displayText,
  "address": location.address,
  "phone": contact.phone,
  "coordinates": location.coordinates,
  "amenities": amenities[]->name,
  featured,
  order
`

export async function getAllAttractions(): Promise<Attraction[]> {
  const query = `*[_type == "attraction"] | order(order asc, name asc) {
    ${ATTRACTION_FIELDS}
  }`

  return await client.fetch(query)
}

export async function getAttractionBySlug(slug: string): Promise<Attraction | null> {
  const query = `*[_type == "attraction" && slug.current == $slug][0] {
    ${ATTRACTION_FIELDS}
  }`

  return await client.fetch(query, { slug })
}

export async function getAttractionsByCategory(category: string): Promise<Attraction[]> {
  if (category === "All") {
    return getAllAttractions()
  }

  const query = `*[_type == "attraction" && category->name == $category] | order(order asc, name asc) {
    ${ATTRACTION_FIELDS}
  }`

  return await client.fetch(query, { category })
}

export async function getFeaturedAttractions(): Promise<Attraction[]> {
  const query = `*[_type == "attraction" && featured == true] | order(order asc) [0...3] {
    ${ATTRACTION_FIELDS}
  }`

  return await client.fetch(query)
}

export async function getAttractionCategories(): Promise<string[]> {
  const query = `array::unique(*[_type == "attraction"].category->name)`
  const categories = await client.fetch<string[]>(query)
  return ["All", ...categories]
}

export async function searchAttractions(searchTerm: string): Promise<Attraction[]> {
  const query = `*[_type == "attraction" && (
    name match $searchTerm + "*" ||
    shortDescription match $searchTerm + "*" ||
    category->name match $searchTerm + "*"
  )] | order(order asc, name asc) {
    ${ATTRACTION_FIELDS}
  }`

  return await client.fetch(query, { searchTerm })
}
