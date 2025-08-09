/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RateFields {
  postalCode: string
  carrier: string
  weight: number
  height: number
  length: number
  width: number
}

export interface ShippingFields {
  name: string
  street: string
  number: string
  city: string
  state: string
  country: string
  phone: string
}

export interface ShipmentPayload {
  origin: Destination
  destination: Destination
  packages: Package[]
  shipment: Shipment
  settings: Settings
}

export interface Destination {
  country: string
  name: string
  company: string
  email: string
  phone: string
  street: string
  number: string
  city: string
  state: string
  postalCode: string
  category?: number
  district?: string
  reference?: string
}

export interface Package {
  content: string
  amount: number
  insurance: number
  declaredValue: number
  weightUnit: string
  lengthUnit: string
  type: string
  dimensions: RateDimensions
  weight: number
}

export interface RateDimensions {
  height: number
  width: number
  length: number
}

export interface Settings {
  comments: string
  currency?: string
  printFormat?: string
  printSize?: string
}

export interface Shipment {
  carrier: string
  type: number
  import?: number
  service?: string
}

export interface RateResponse {
  meta: string
  data: Rate[]
}

export interface Rate {
  carrierId: number
  carrier: string
  carrierDescription: string
  serviceId: number
  service: string
  serviceDescription: string
  dropOff: number
  branchType: number | null
  zone: number | null
  deliveryEstimate: string
  deliveryDate: DeliveryDate
  quantity: number
  basePrice: number
  basePriceTaxes: number
  extendedFare: number
  insurance: number
  additionalServices: number
  additionalServicesTaxes: number
  additionalCharges: number
  additionalChargesTaxes: number
  importFee: number
  customKeyCost: number
  taxes: number
  totalPrice: number
  currency: string
  customKey: boolean
  calculatedDeclaredValue: number
  isMps: boolean
  smsCost?: number
  whatsappCost?: number
  cashOnDeliveryCommission?: number
  cashOnDeliveryAmount?: number
  shipmentTaxes?: ShipmentTax[]
  branches?: Branch[]
  costSummary: CostSummary[]
  packageDetails: PackageDetails
}

export interface ShipmentTax {
  [k: string]: unknown
}

export interface Branch {
  distance: number
  branch_id: string
  branch_code: string
  branch_type: number
  reference: string
  address: BranchAddress
  hours: unknown[]
}

export interface BranchAddress {
  city: string
  state: string
  number: string
  street: string
  country: string
  delivery: boolean
  latitude: string
  locality: string
  admission: boolean
  longitude: string
  postalCode: string
  address: string
  zipcode: string
  province: string
}

export interface CostSummary {
  quantity: number
  basePrice: number
  basePriceTaxes: number
  extendedFare: number
  insurance: number
  additionalServices: number
  additionalServicesTaxes: number
  additionalCharges: number
  additionalChargesTaxes: number
  taxes: number
  totalPrice: number
  costAdditionalServices: unknown[]
  costAdditionalCharges: unknown[]
  currency: string
  customKey: boolean
  calculatedDeclaredValue: number
  cashOnDeliveryCommission?: number
  cashOnDeliveryAmount?: number
  customKeyCommission?: number
  smsCommission?: number
  securityDeposit?: boolean
  securityWeight?: number
  importFee?: number
  whatsappCommission?: number
  folio?: string | null
  insertConcepts?: unknown[]
}

export interface DeliveryDate {
  date: string
  dateDifference: number
  timeUnit: string
  time: string
}

export interface PackageDetails {
  totalWeight: number
  weightUnit: string
  details: Detail[]
}

export interface Detail {
  appliedWeightType: string
  weightUnit: string
  weight: number
  content: string
}

export interface GuideResponse {
  meta: string
  data: Guide[]
}

export interface Guide {
  carrier: string
  service: string
  trackingNumber: string
  trackUrl: string
  label: string
  additionalFiles: any[]
  totalPrice: number
  currentBalance: number
  currency: string
}
