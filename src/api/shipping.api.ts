import type { AxiosResponse } from 'axios'
import type { ShipmentPayload, RateResponse, Rate, Guide, GuideResponse } from '@/types'
import { shippingClient } from './client'

class ShippingApi {
  static async shippingRate(data: ShipmentPayload): Promise<Rate[]> {
    const URL = `/ship/rate`
    const response: AxiosResponse<RateResponse> = await shippingClient.post(URL, data)
    return response.data.data
  }

  static async generateGuide(data: ShipmentPayload): Promise<Guide[]> {
    const URL = `/ship/generate`
    const response: AxiosResponse<GuideResponse> = await shippingClient.post(URL, data)
    return response.data.data
  }
}
export { ShippingApi }
