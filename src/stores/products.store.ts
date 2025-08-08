import type { ApiProduct, Product } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useStore } from '@/stores'
import { ProductsApi } from '@/api'

export const useProductsStore = defineStore('productsStore', () => {
  const store = useStore()

  const products = ref([] as Product[])
  const selectedProduct = ref<Product | null>(null)
  const cart = ref([] as Product[])
  const discount = ref(0)

  const setProducts = (items: Product[]) => (products.value = items)

  const setProduct = (item?: Product) => (selectedProduct.value = item ? item : null)

  const setDiscount = (value: number) => (discount.value = value)

  const addProduct = (item: Product) => {
    const index = cart.value.findIndex((product) => product.id === item.id)
    if (index === -1) {
      cart.value.push({ ...item, quantity: 1 })
    } else {
      cart.value[index].quantity = (cart.value[index].quantity ?? 0) + 1
    }
  }

  const removeProduct = (id: string) =>
    (cart.value = cart.value.filter((product) => product.id !== id))

  const removeQuantity = (item: Product) => {
    const index = cart.value.findIndex((product) => product.id === item.id)
    if (index === -1) return
    const quantity = cart.value[index].quantity ?? 0
    quantity > 1 ? (cart.value[index].quantity = quantity - 1) : removeProduct(item.id)
  }

  const getProducts = async () => {
    try {
      store.setLoading(true)
      const list = await ProductsApi.getAllProducts()
      const products = await Promise.all(
        list.map(async (prod) => {
          try {
            const completeProduct = await ProductsApi.getSingleProduct(prod.id)
            return formatProduct(completeProduct)
          } catch (err) {
            return formatProduct(prod)
          }
        }),
      )
      setProducts(products)
    } catch (error) {
      console.error(error)
      store.setAlert(
        (error as any).response.data || 'Ocurrió un error, intenta de nuevo más tarde.',
        'error',
      )
    } finally {
      store.setLoading(false)
    }
  }

  const getProduct = async (id: string) => {
    try {
      store.setLoading(true)
      const response = await ProductsApi.getSingleProduct(id)
      const product = formatProduct(response)
      setProduct(product)
    } catch (error) {
      console.error(error)
    } finally {
      store.setLoading(false)
    }
  }

  const formatProduct = (product: ApiProduct) => {
    const priceValue = product.salePrice ?? product.price ?? '0.00'
    const price = priceValue === '0.00' || priceValue === '0' ? '100.00' : priceValue

    const image =
      validImage(product.imageUrl) ||
      validImage(product.images?.[0]?.url) ||
      `/images/${product.id}.jpg`

    return {
      id: product.id,
      name: product.name,
      price,
      currency: product.currency ?? 'MXN',
      image,
      createdAt: product.dates.createdAt,
      vendor: product.vendor,
      description: product.description ?? '',
    }
  }

  const validImage = (url?: string | null) => {
    const invalid =
      'https://cdn.shopify.com/s/files/1/0630/2443/1273/products/logoecartapi.jpg?v=1673245613'
    return url && url !== invalid ? url : null
  }

  const cartTotal = computed(() => {
    let total = 0
    for (const product of cart.value) {
      total = total + (product.quantity ?? 0)
    }
    return total
  })

  const subtotal = computed(() => {
    let total = 0
    for (const product of cart.value) {
      const quantity = product.quantity ?? 0
      const price = Number(product.price) || 0
      total = total + quantity * price
    }
    return total.toFixed(2)
  })

  return {
    products,
    cart,
    cartTotal,
    subtotal,
    discount,
    selectedProduct,
    setProducts,
    addProduct,
    removeProduct,
    removeQuantity,
    setDiscount,
    getProducts,
    getProduct,
    setProduct,
  }
})
