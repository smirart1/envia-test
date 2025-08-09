<template>
  <v-row no-gutters class="mt-5" v-if="shippingStore.generatedGuide">
    <v-col cols="12" sm="" md="6" class="px-sm-3 px-md-10 text-center">
      <div class="text-h6 app-font text-semibold mt-4">Guía generada</div>
      <div class="text-h6 app-font text-semibold mb-6">¡Gracias por tu compra!</div>
      <v-btn flat color="secondary" @click="$router.push({ name: 'products' })">
        Volver al inicio
      </v-btn>
    </v-col>
    <v-col cols="12" sm="auto" md="6" class="mt-4 mt-sm-0 mx-auto">
      <GuideFile />
    </v-col>
  </v-row>

  <v-row no-gutters class="mt-5" v-else>
    <v-col cols="12" sm="6" md="8" class="px-sm-3 px-md-10 text-center">
      <div class="text-h6 app-font text-semibold mb-6">Completa tus datos para el envío</div>
      <ShippingForm />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="mt-4 mt-sm-0">
      <OrderSummary :tab="tab" @next="$emit('next')" @cart="$emit('cart')" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useShippingStore } from '@/stores'
import OrderSummary from './OrderSummary.vue'
import ShippingForm from './ShippingForm.vue'
import GuideFile from './GuideFile.vue'

defineEmits(['next', 'cart'])
defineProps<{
  tab: number
}>()

const shippingStore = useShippingStore()
</script>
