export interface RateFields {
  postalCode: string
  carrier: string
  weight: number
  height: number
  length: number
  width: number
}

export interface RatePayload {
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
  category: number
  street: string
  number: string
  city: string
  state: string
  postalCode: string
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
  currency: string
}

export interface Shipment {
  carrier: string
  type: number
  import: number
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
  branchType: null
  zone: number
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
  smsCost: number
  whatsappCost: number
  customKey: boolean
  cashOnDeliveryCommission: number
  cashOnDeliveryAmount: number
  calculatedDeclaredValue: number
  isMps: boolean
  shipmentTaxes: any[]
  branches: any[]
  costSummary: CostSummary[]
  packageDetails: PackageDetails
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
  costAdditionalServices: any[]
  costAdditionalCharges: any[]
  currency: string
  customKey: boolean
  cashOnDeliveryCommission: number
  cashOnDeliveryAmount: number
  customKeyCommission: number
  smsCommission: number
  securityDeposit: boolean
  securityWeight: number
  importFee: number
  whatsappCommission: number
  folio: null
  calculatedDeclaredValue: number
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
