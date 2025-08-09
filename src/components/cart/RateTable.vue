<template>
  <v-row no-gutters class="mt-4">
    <v-data-table
      v-if="rateList.length > 0"
      hide-default-footer
      no-data-text=""
      density="comfortable"
      :headers="headers"
      :items="rateList"
      :header-props="{
        class: 'text-subtitle-2 app-font font-weight-bold',
        align: 'center',
      }"
      :row-props="{ align: 'center' }"
    >
      <template v-slot:[`item.deliveryEstimate`]="{ value }">
        {{ formatDelivery(value) }}
      </template>
      <template v-slot:[`item.service`]="{ item }">
        <v-icon
          :icon="
            shipping === item.totalPrice
              ? 'mdi-check-circle-outline'
              : 'mdi-checkbox-blank-circle-outline'
          "
          size="24"
          :color="shipping === item.totalPrice ? 'primary' : 'grey'"
          @click="shippingStore.setShipping(item.totalPrice, item.carrier, item.service)"
        />
      </template>
    </v-data-table>
  </v-row>
</template>

<script setup lang="ts">
import { useShippingStore } from '@/stores'
import { storeToRefs } from 'pinia'

const shippingStore = useShippingStore()
const { rateList, shipping } = storeToRefs(shippingStore)

const headers = [
  { title: 'Seleccionar', key: 'service', sortable: false },
  { title: 'Servicio', key: 'serviceDescription', sortable: false },
  { title: 'Precio', key: 'totalPrice', sortable: false },
  { title: 'Entrega', key: 'deliveryEstimate', sortable: false },
]

const formatDelivery = (value: string) => {
  if (!value) return '-'
  if (value.toLowerCase() === 'next day') return 'Día siguiente'
  return value.replace(/days/i, 'días')
}
</script>
