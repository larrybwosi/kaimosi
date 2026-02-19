// Common Sanity queries

// Get all posts
export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "author": author->{name, image},
  mainImage,
  categories[]->{title, slug}
}`;

// Get single post by slug
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  publishedAt,
  "author": author->{name, image, bio},
  mainImage,
  categories[]->{title, slug}
}`;

// Get all attractions
export const allAttractionsQuery = `*[_type == "attraction"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  category,
  location,
  images,
  entryFee,
  featured
}`;

// Get single attraction by slug
export const attractionBySlugQuery = `*[_type == "attraction" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  description,
  category,
  location,
  images,
  entryFee,
  openingHours,
  contactInfo,
  featured
}`;
