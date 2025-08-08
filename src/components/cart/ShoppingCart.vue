<template>
  <v-row no-gutters class="mt-5">
    <v-col v-if="cart.length > 0" cols="12" sm="6" md="8" class="px-sm-10">
      <CartItem
        v-for="(product, index) in cart"
        :product="product"
        :index="index"
        :key="product.id"
      />
    </v-col>

    <v-col
      v-else
      cols="12"
      sm="6"
      md="8"
      class="d-flex flex-column align-center mt-4 px-sm-3 pb-7 pb-sm-0"
    >
      <span
        class="text-center app-font text-semibold"
        :class="$vuetify.display.smAndUp ? 'text-h6' : ''"
      >
        No hay productos en tu carrito
      </span>
      <v-btn
        variant="outlined"
        style="width: 200px"
        color="primary"
        class="mx-auto mt-3"
        @click="$router.push({ name: 'products' })"
      >
        <span>Explorar productos</span>
      </v-btn>
    </v-col>

    <v-col cols="12" sm="6" md="4" class="mt-3 mt-sm-0">
      <OrderSummary :tab="tab" @next="$emit('next')" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores'
import CartItem from './CartItem.vue'
import OrderSummary from './OrderSummary.vue'

defineEmits(['next'])
defineProps<{
  tab: number
}>()

const productsStore = useProductsStore()

const { cart } = storeToRefs(productsStore)
</script>
