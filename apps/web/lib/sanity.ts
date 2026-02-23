import { createClient } from "next-sanity"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: true,
})

export const client = sanityClient

// GROQ Queries for marketplace
export const QUERIES = {
  allProducts: `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    description,
    price,
    compareAtPrice,
    images,
    inStock,
    stockQuantity,
    featured,
    categories[]-> {
      _id,
      name,
      slug
    },
    discount-> {
      _id,
      name,
      discountType,
      value,
      isActive
    }
  }`,

  productBySlug: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    price,
    compareAtPrice,
    images,
    inStock,
    stockQuantity,
    sku,
    featured,
    categories[]-> {
      _id,
      name,
      slug,
      description
    },
    discount-> {
      _id,
      name,
      description,
      discountType,
      value,
      startDate,
      endDate,
      isActive
    }
  }`,

  allCategories: `*[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    image,
    parentCategory-> {
      _id,
      name,
      slug
    }
  }`,

  activeDiscounts: `*[_type == "discount" && isActive == true && startDate <= now() && endDate >= now()] {
    _id,
    name,
    description,
    discountType,
    value,
    startDate,
    endDate
  }`,

  featuredProducts: `*[_type == "product" && featured == true && inStock == true] | order(_createdAt desc) [0...8] {
    _id,
    name,
    slug,
    price,
    compareAtPrice,
    images,
    categories[]-> {
      name,
      slug
    },
    discount-> {
      discountType,
      value,
      isActive
    }
  }`,

  allAttractions: `*[_type == "attraction"] | order(order asc, name asc) {
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
  }`,

  attractionBySlug: `*[_type == "attraction" && slug.current == $slug][0] {
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
  }`,

  featuredAttractions: `*[_type == "attraction" && featured == true] | order(order asc) [0...3] {
    _id,
    name,
    slug,
    "category": category->name,
    shortDescription,
    "image": mainImage.asset->url,
    featured
  }`,

  attractionCategories: `array::unique(*[_type == "attraction"].category->name)`,
}
