// Type definitions for product
export type Product = {
    id: number
    category: string
    title: string
    description: string | null
    denomination: string | null
    pointsRequired: number | null
    approved_by: string | null
    image_url: string
  }