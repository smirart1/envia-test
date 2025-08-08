import type { Rate, RateFields } from '@/types'
import { useStore } from '@/stores'
import { ShippingApi } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShippingStore = defineStore('shippingStore', () => {
  const store = useStore()

  const rateList = ref([] as Rate[])
  const shipping = ref(0)

  const setRateList = (items: Rate[]) => (rateList.value = items)

  const setShipping = (price: number) => (shipping.value = price)

  const getRates = async (data: RateFields) => {
    try {
      store.setLoading(true)
      const payload = {
        origin: {
          country: 'MX',
          state: 'nl',
          city: 'San Pedro Garza García',
          postalCode: '66236',
          name: 'Vasconcelos',
          street: 'Vasconcelos',
          number: '1400',
          company: 'envia',
          email: 'test@envia.com',
          phone: '8180808080',
          category: 1,
        },
        destination: {
          country: 'MX',
          state: 'ja',
          name: 'test',
          company: 'envia landing mx',
          email: 'test@envia.com',
          phone: '8181818181',
          category: 2,
          street: 'belisario dominguez',
          number: '2407',
          city: 'lagos de moreno',
          postalCode: '47420',
        },
        packages: [
          {
            content: 'Productos',
            amount: 1,
            insurance: 0,
            declaredValue: 0,
            weightUnit: 'KG',
            lengthUnit: 'CM',
            type: 'box',
            dimensions: {
              height: data.height,
              width: data.width,
              length: data.length,
            },
            weight: data.weight,
          },
        ],
        shipment: {
          carrier: data.carrier,
          type: 1,
          import: 0,
        },
        settings: {
          comments: '',
          currency: 'MXN',
        },
      }
      const response = await ShippingApi.shippingRate(payload)
      setRateList(response)
    } catch (error) {
      console.error(error)
    } finally {
      store.setLoading(false)
    }
  }

  return {
    shipping,
    rateList,
    setShipping,
    setRateList,
    getRates,
  }
})
