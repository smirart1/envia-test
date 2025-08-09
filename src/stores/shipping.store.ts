import type { Guide, Rate, RateFields, ShipmentPayload, ShippingFields } from '@/types'
import { ShippingApi } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { FEDEX, UPS, ESTAFETA } from '@/utils/constants'

export const useShippingStore = defineStore('shippingStore', () => {
  const guide = ref({} as Guide)
  const rateList = ref([] as Rate[])
  const shipmentInfo = ref({} as ShipmentPayload)
  const shipping = ref(0)
  const shipment = ref({
    carrier: '',
    service: '',
  })
  const shippingFields = ref({} as ShippingFields)
  const rateFields = ref({} as RateFields)
  const generatedGuide = ref(false)
  const loading = ref(false)

  const setRateList = (items: Rate[]) => (rateList.value = items)

  const setGuide = (item: Guide) => (guide.value = item)

  const setShipping = (price: number, carrier: string, service: string) => {
    shipping.value = price
    shipment.value = { carrier, service }
  }

  const setGuideStatus = (status: boolean) => (generatedGuide.value = status)

  const setShipmentInfo = (data: ShipmentPayload) => (shipmentInfo.value = data)

  const getRates = async () => {
    try {
      loading.value = true
      const payload = {
        origin: {
          country: 'MX',
          state: 'NL',
          city: 'San Pedro',
          postalCode: '66236',
          name: 'ENVIA',
          street: 'Vasconcelos',
          number: '1400',
          company: 'envia',
          email: 'test@envia.com',
          phone: '8180808080',
          category: 1,
        },
        destination: {
          name: 'oscar',
          company: 'empresa',
          email: 'noreply@envia.com',
          phone: '8116300800',
          street: 'av vasconcelos',
          number: '1400',
          city: 'monterrey',
          state: 'NL',
          country: 'MX',
          postalCode: '66240',
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
              height: rateFields.value.height,
              width: rateFields.value.width,
              length: rateFields.value.length,
            },
            weight: rateFields.value.weight,
          },
        ],
        shipment: {
          carrier: rateFields.value.carrier,
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
      setRateList(
        rateFields.value.carrier === 'ups'
          ? UPS
          : rateFields.value.carrier === 'fedex'
            ? FEDEX
            : ESTAFETA,
      )
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const getGuide = async () => {
    const payload = {
      origin: {
        country: 'MX',
        state: 'NL',
        city: 'San Pedro',
        postalCode: '66236',
        name: 'ENVIA',
        street: 'Vasconcelos',
        number: '1400',
        company: 'envia',
        email: 'test@envia.com',
        phone: '8180808080',
      },
      destination: {
        name: shippingFields.value.name,
        company: 'empresa',
        email: 'noreply@envia.com',
        phone: shippingFields.value.phone,
        street: shippingFields.value.street,
        number: shippingFields.value.number,
        city: shippingFields.value.city,
        state: shippingFields.value.state,
        country: 'MX',
        postalCode: rateFields.value.postalCode,
      },
      packages: [
        {
          content: 'Productos',
          amount: 1,
          type: 'box',
          dimensions: {
            length: rateFields.value.length,
            width: rateFields.value.width,
            height: rateFields.value.height,
          },
          weight: rateFields.value.weight,
          insurance: 0,
          declaredValue: 400,
          weightUnit: 'KG',
          lengthUnit: 'CM',
        },
      ],
      shipment: {
        carrier: shipment.value.carrier,
        service: shipment.value.service,
        type: 1,
      },
      settings: {
        printFormat: 'PDF',
        printSize: 'STOCK_4X6',
        comments: '',
      },
    }
    try {
      loading.value = true

      console.log(payload)
      const response = await ShippingApi.generateGuide(payload)
      setGuide(response[0])
    } catch (error) {
      setGuideStatus(true)
      setShipmentInfo(payload)
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    shipping,
    rateList,
    shippingFields,
    rateFields,
    generatedGuide,
    loading,
    shipmentInfo,
    setShipping,
    setRateList,
    getRates,
    getGuide,
    setGuide,
    setGuideStatus,
  }
})
