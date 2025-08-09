<template>
  <PageLoader v-if="store.loading" />
  <v-row v-else no-gutters justify="center" class="mt-4">
    <v-col cols="12" class="page-container">
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="8" class="px-3 px-md-10">
          <v-img
            cover
            rounded
            aspect-ratio="1"
            lazy-src="/images/placeholder.png"
            :src="product?.image"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="grey-lighten-4" indeterminate />
              </div>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="px-3 mt-4 mt-sm-0 px-md-0">
          <v-row no-gutters>
            <v-col cols="12" class="text-caption app-font text-grey">
              {{ product?.vendor }}
            </v-col>

            <v-col cols="12" class="text-h5 text-semibold app-font break-words">
              {{ product?.name }}
            </v-col>

            <v-col cols="12" class="text-caption text-grey app-font my-3">
              {{
                product?.description ||
                'Lorem ipsum dolor sit amet consectetur adipiscing elit molestie class sociosqu inceptos quam.'
              }}
            </v-col>

            <v-col cols="12" class="text-semibold">${{ product?.price }}</v-col>

            <v-col cols="12" class="text-semibold mt-6">
              <v-btn block flat color="primary" :loading="loading" @click="addToCart">
                <span class="text-grey-darken-4">Agregar al carrito</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useStore, useProductsStore } from '@/stores'
import { storeToRefs } from 'pinia'
import PageLoader from '../layout/PageLoader.vue'

const props = defineProps<{
  id: string
}>()

const productsStore = useProductsStore()
const store = useStore()
const { selectedProduct: product, products } = storeToRefs(productsStore)

const loading = ref(false)

onMounted(async () => {
  if (products.value.length === 0) await productsStore.getProducts()
  const product = products.value.find((prod) => prod.id === props.id)
  productsStore.setProduct(product)
})

onUnmounted(() => {
  productsStore.setProduct()
})

const addToCart = () => {
  loading.value = true
  productsStore.addProduct(product.value!)
  setTimeout(() => {
    loading.value = false
  }, 250)
}
</script>

<style scoped>
.break-words {
  overflow-wrap: anywhere;
  word-break: normal;
  hyphens: auto;
}
</style>
