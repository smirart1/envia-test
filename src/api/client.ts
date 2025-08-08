import axios, { type AxiosInstance } from 'axios'

const ENVIA_TOKEN = import.meta.env.VITE_ENVIA_TOKEN
const ECART_TOKEN = import.meta.env.VITE_ECART_TOKEN
const ECART_JR_TOKEN = import.meta.env.VITE_ECART_TOKEN_JR

const productsClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PRODUCT_DETAIL_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: ECART_TOKEN,
  },
})

const jrClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ESHOP_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: ECART_JR_TOKEN,
  },
})

const shippingClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SHIPPING_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: ENVIA_TOKEN,
  },
})

export { productsClient, shippingClient, jrClient }
