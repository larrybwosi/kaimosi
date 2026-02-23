# Sanity CMS Schema Documentation

## Overview
This directory contains all Sanity CMS schema definitions for the Maplewood Town application. Schemas are organized following Sanity best practices for scalability and maintainability.

## Directory Structure

```
sanity/
├── schema.ts                 # Central schema export
├── schemas/
│   ├── documents/           # Document type schemas (main content types)
│   │   ├── attraction.ts    # Main attraction schema
│   │   ├── attractionCategory.ts
│   │   ├── amenity.ts
│   │   ├── event.ts
│   │   ├── restaurant.ts
│   │   └── accommodation.ts
│   └── objects/            # Object type schemas (reusable components)
│       ├── location.ts
│       ├── operatingHours.ts
│       ├── contactInfo.ts
│       ├── socialLinks.ts
│       └── seoSettings.ts
└── lib/
    └── client.ts           # Sanity client configuration
```

## Schema Types

### Document Types
Document types are top-level content types that appear in Sanity Studio navigation:

- **attraction**: Main attraction content (parks, museums, etc.)
- **attractionCategory**: Category taxonomy for attractions
- **amenity**: Reusable amenity definitions
- **event**: Community events
- **restaurant**: Restaurant/dining listings
- **accommodation**: Hotels, B&Bs, etc.

### Object Types
Object types are reusable field groups that can be embedded in documents:

- **location**: Address and coordinates
- **operatingHours**: Business hours with special dates
- **contactInfo**: Phone, email, website
- **socialLinks**: Social media profiles
- **seoSettings**: Meta tags and OG data

## Deployment Process

### 1. Initial Setup

Ensure environment variables are set:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
```

### 2. Deploy Schemas to Sanity

Schemas can be deployed using:

**Option A: Sanity Studio (Recommended)**
- Sanity automatically reads from `sanity/schema.ts`
- Studio hot-reloads on schema changes
- Validates schemas in real-time

**Option B: Programmatic Deployment**
- Use `Sanity_deploy_schema` tool for each schema
- Schemas are deployed to Sanity cloud
- Accessible across all Studio instances

### 3. Version Control

**Schema Versioning:**
- Track all schema changes in Git
- Use semantic versioning for breaking changes
- Document changes in migration guide

**Migration Strategy:**
```typescript
// migrations/001_add_status_field.ts
export default {
  title: 'Add status field to attractions',
  documentTypes: ['attraction'],
  migrate: async (doc) => {
    return {
      ...doc,
      status: doc.status || 'open'
    }
  }
}
```

### 4. Best Practices

**Schema Organization:**
- ✅ One schema per file
- ✅ Group by type (documents vs objects)
- ✅ Use TypeScript for type safety
- ✅ Add descriptions to all fields
- ✅ Implement validation rules

**Field Naming:**
- ✅ Use camelCase for field names
- ✅ Use descriptive names (avoid abbreviations)
- ✅ Keep names consistent across schemas

**Validation:**
- ✅ Required fields must have validation
- ✅ Use appropriate constraints (min, max, regex)
- ✅ Add helpful error messages

**Performance:**
- ✅ Use references for relationships
- ✅ Enable hotspot for images
- ✅ Include blurhash for image loading
- ✅ Use appropriate API versioning

## Content Management Workflow

### Creating New Content
1. Open Sanity Studio
2. Navigate to content type
3. Fill required fields (marked with *)
4. Add optional fields as needed
5. Preview changes
6. Publish

### Updating Schemas
1. Modify schema file locally
2. Test in development
3. Deploy to production
4. Run migrations if needed
5. Update TypeScript types

### Schema Relationships
```
attraction
├── category (reference) → attractionCategory
├── amenities (array of references) → amenity
└── related (array of references) → attraction

attractionCategory
└── parent (reference) → attractionCategory
```

## TypeScript Integration

Generate TypeScript types:
```bash
npx sanity schema extract
npx sanity typegen generate
```

Use generated types in your app:
```typescript
import type { Attraction } from '@/sanity/types'
```

## Querying Data

Use GROQ queries with proper projections:

```typescript
// Good: Select only needed fields
const query = `*[_type == "attraction" && featured == true]{
  name,
  slug,
  shortDescription,
  "imageUrl": mainImage.asset->url,
  category->{name, slug}
}[0...6]`

// Avoid: Fetching entire documents
const query = `*[_type == "attraction"]` // Too broad
```

## Maintenance

### Regular Tasks
- Review and update field descriptions
- Audit unused fields
- Optimize query performance
- Update validation rules
- Check for orphaned references

### Schema Deprecation
When removing fields:
1. Mark as deprecated in description
2. Hide from Studio UI
3. Run cleanup migration
4. Remove from schema after grace period

## Support & Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Schema Types Reference](https://www.sanity.io/docs/schema-types)
