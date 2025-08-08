<template>
  <v-row no-gutters justify="center">
    <v-col cols="auto" class="page-container">
      <v-tabs v-model="tab" fixed-tabs color="primary" density="comfortable">
        <v-tab v-for="item in items" :disabled="item.disabled" :key="item.name">
          <v-row align="center">
            <v-icon :icon="item.icon" size="24" />
            <span v-if="$vuetify.display.smAndUp" class="ml-2"> {{ item.name }} </span>
          </v-row>
        </v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab" class="pa-4">
        <v-tabs-window-item v-for="item in items" :key="item.name">
          <component :is="item.component" :tab="tab" @next="tab++" @cart="tab = 0" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { useProductsStore, useShippingStore } from '@/stores'
import ShoppingCart from './ShoppingCart.vue'
import ShippingGuide from './ShippingGuide.vue'
import ShippingRate from './ShippingRate.vue'

const productsStore = useProductsStore()
const shippingStore = useShippingStore()

const tab = ref(0)

const items = computed(() => [
  { icon: 'mdi-cart-variant', name: 'Carrito de Compras', component: ShoppingCart },
  {
    icon: 'mdi-truck',
    name: 'Cotización de Envío',
    component: ShippingRate,
    disabled: tab.value < 1,
  },
  {
    icon: 'mdi-file-document',
    name: 'Generación de Guía',
    component: ShippingGuide,
    disabled: tab.value < 2,
  },
])

onUnmounted(() => {
  productsStore.setDiscount(0)
  shippingStore.setShipping(0)
  shippingStore.setRateList([])
})
</script>

<style>
.v-stepper-header {
  box-shadow: none !important;
}
</style>
