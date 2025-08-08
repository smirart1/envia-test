<template>
  <v-row no-gutters>
    <v-col cols="auto">
      <v-img
        cover
        height="100"
        width="100"
        class="cursor-pointer"
        lazy-src="/images/placeholder.png"
        :src="product.image"
        @click="$router.push({ name: 'details', params: { id: product.id } })"
      />
    </v-col>
    <v-col cols="" class="d-flex flex-column justify-space-between ml-4" style="min-width: 0">
      <v-row no-gutters>
        <v-col class="d-flex flex-column mr-4" style="min-width: 0">
          <span
            class="app-font font-weight-bold text-truncate"
            :class="$vuetify.display.smAndUp ? 'text-h6' : ''"
          >
            {{ product.name }}</span
          >
          <span class="app-font text-grey">${{ product.price }}</span>
        </v-col>
        <v-col cols="auto">
          <v-icon
            icon="mdi-trash-can-outline"
            size="20"
            color="red"
            @click="productsStore.removeProduct(product.id)"
          />
        </v-col>
      </v-row>
      <v-spacer />
      <v-row no-gutters justify="end" align="center" class="">
        <v-icon
          icon="mdi-minus"
          size="18"
          color="secondary"
          @click="productsStore.removeQuantity(product)"
        />
        <span class="text-body-1 mx-3 app-font font-weight-bold">
          {{ product.quantity || 0 }}
        </span>
        <v-icon
          icon="mdi-plus"
          size="18"
          color="secondary"
          @click="productsStore.addProduct(product)"
        />
      </v-row>
    </v-col>
    <v-divider class="my-3" v-if="index < cart.length - 1" />
  </v-row>
</template>

<script setup lang="ts">
import type { Product } from '@/types'
import { useProductsStore } from '@/stores'
import { storeToRefs } from 'pinia'

defineProps<{
  product: Product
  index: number
}>()

const productsStore = useProductsStore()

const { cart } = storeToRefs(productsStore)
</script>
