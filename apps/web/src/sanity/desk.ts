import type { StructureBuilder } from "sanity/structure"

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content Management")
    .items([
      S.documentTypeListItem("attraction").title("Attractions").icon("map-pin"),

      S.divider(),

      S.documentTypeListItem("attractionCategory").title("Categories").icon("tag"),

      S.documentTypeListItem("amenity").title("Amenities").icon("checklist"),

      S.divider(),

      S.documentTypeListItem("product").title("Marketplace Products").icon("shopping-bag"),

      S.documentTypeListItem("category").title("Product Categories").icon("folder"),

      S.documentTypeListItem("discount").title("Discounts & Promotions").icon("tag"),
    ])
