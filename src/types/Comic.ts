// src/types/Comic.ts
export interface Comic {
  id: number
  digitalId: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  modified: string
  isbn: string
  upc: string
  diamondCode: string
  ean: string
  issn: string
  format: string
  pageCount: number
  textObjects: unknown[] // You might want to create a specific interface for this
  resourceURI: string
  urls: {
    type: string
    url: string
  }[]
  series: {
    resourceURI: string
    name: string
  }
  variants: unknown[] // You might want to create a specific interface for this
  collections: unknown[] // You might want to create a specific interface for this
  collectedIssues: unknown[] // You might want to create a specific interface for this
  dates: {
    type: string
    date: string
  }[]
  prices: {
    type: string
    price: number
  }[]
  thumbnail: {
    path: string
    extension: string
  }
  images: unknown[] // You might want to create a specific interface for this
  creators: {
    available: number
    collectionURI: string
    items: {
      resourceURI: string
      name: string
      role: string
    }[]
    returned: number
  }
  characters: {
    available: number
    collectionURI: string
    items: unknown[] // You might want to create a specific interface for this
    returned: number
  }
  stories: {
    available: number
    collectionURI: string
    items: {
      type: string
      resourceURI: string
      name: string
    }[]
    returned: number
  }
  events: {
    available: number
    collectionURI: string
    items: unknown[] // You might want to create a specific interface for this
    returned: number
  }
}
