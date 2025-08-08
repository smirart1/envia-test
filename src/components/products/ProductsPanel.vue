<template>
  <v-row no-gutters class="pa-2 pt-4">
    <v-col
      v-for="product in productsStore.products"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      class="pa-2"
      :key="product.id"
    >
      <ProductCard :product="product" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ProductCard from './ProductCard.vue'

const productsStore = useProductsStore()
const { products } = storeToRefs(productsStore)

onMounted(async () => {
  if (products.value.length === 0) await productsStore.getProducts()
})
</script>
