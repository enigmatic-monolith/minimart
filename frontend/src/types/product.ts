// Type definitions for product
export type Product = {
    id: number
    category: string
    title: string
    description: string | null
    denomination: string | null
    price_sgd: string | null
    approved_by: string | null
    image_url: string
  }