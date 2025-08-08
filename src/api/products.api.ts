import type { AxiosResponse } from 'axios'
import type { ProductsResponse, ProductResponse, ApiProduct } from '@/types'
import { jrClient } from './client'

class ProductsApi {
  static async getAllProducts(): Promise<ApiProduct[]> {
    const URL = `/api/v2/products`
    const response: AxiosResponse<ProductsResponse> = await jrClient.get(URL)
    return response.data.products
  }

  static async getSingleProduct(id: string): Promise<ApiProduct> {
    const URL = `/api/v2/products/${id}`
    const response: AxiosResponse<ProductResponse> = await jrClient.get(URL)
    return response.data.product
  }
}
export { ProductsApi }
