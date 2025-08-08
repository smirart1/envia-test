import type { AxiosResponse } from 'axios'
import type { RatePayload, RateResponse, Rate } from '@/types'
import { shippingClient } from './client'

class ShippingApi {
  static async shippingRate(data: RatePayload): Promise<Rate[]> {
    const URL = `/ship/rate`
    const response: AxiosResponse<RateResponse> = await shippingClient.post(URL, data)
    return response.data.data
  }
}
export { ShippingApi }
