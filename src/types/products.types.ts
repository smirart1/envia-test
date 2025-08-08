export interface Product {
  name: string
  id: string
  price: string
  currency: string
  image: string
  createdAt: string
  vendor: string
  description: string
  quantity?: number
}

export interface ProductsResponse {
  success: boolean
  products: ApiProduct[]
  page: Page
}

export interface ProductResponse {
  success: boolean
  product: ApiProduct
}

export interface ApiProduct {
  id: string
  productUserId: null
  groupId: null
  sku: null
  name: string
  subName: null
  upc: null
  asin: null
  gtin: null
  description: null | string
  currency: null
  productType: null | string
  quantity: string
  price: string | null
  salePrice: string | null
  cost: string | null
  discount: string | null
  dimensions: Dimensions
  units: Dimensions
  category: Category
  tags: string[]
  status: StatusClass
  variants: any[]
  options: Option[]
  associatedItems: any[]
  logistic: Logistic
  images: Image[]
  imageUrl: null | string
  condition: null
  link: null
  dates: Dates
  vendor: string
  sellOutStock: null
  locations: any[]
  internationalShipment: any[]
}

export interface Page {
  next: number | null
  previous: number | null
}

export interface Category {
  id: null
  name: null | string
  all: string[]
}

export interface Dates {
  createdAt: string
  updatedAt: string
}

export interface Dimensions {
  width: number | null
  height: number | null
  length: number | null
  weight: number | null
}

export interface Image {
  id: string
  url: string
  variantIds: any[]
  ecartapiUrl: string
}

export interface Logistic {
  me1Suported: null
  mode: null
  type: null
  free: string
  direction: null
  dimensions: null
  rates: any[]
  settings: any[]
}

export interface Option {
  id: string
  name: string
  values: string[]
}

export interface StatusClass {
  id: null
  visibility: null
  active: string
  status: StatusEnum
  ecartapiId: null
  hasOptions: string
  inStock: null
}

export enum StatusEnum {
  Active = 'ACTIVE',
}
