import type { SchemaTypeDefinition } from "sanity"

// Document Types
import attraction from "./schemas/documents/attraction"
import attractionCategory from "./schemas/documents/attractionCategory"
import amenity from "./schemas/documents/amenity"
// import event from "./schemas/documents/event"
// import restaurant from "./schemas/documents/restaurant"
// import accommodation from "./schemas/documents/accommodation"

// Object Types
import location from "./schemas/objects/location"
import operatingHours from "./schemas/objects/operatingHours"
import contactInfo from "./schemas/objects/contactInfo"
import socialLinks from "./schemas/objects/socialLinks"
import seoSettings from "./schemas/objects/seoSettings"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    attraction,
    attractionCategory,
    amenity,
    // event,
    // restaurant,
    // accommodation,

    // Object types (reusable)
    location,
    operatingHours,
    contactInfo,
    socialLinks,
    seoSettings,
  ],
}
