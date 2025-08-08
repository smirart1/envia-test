<template>
  <v-row no-gutters class="mt-5">
    <v-col cols="12" sm="6" md="8" class="px-sm-3 px-md-10 text-center">
      <div class="text-h6 app-font text-semibold mb-6">
        Completa los datos para cotizar tu envío
      </div>
      <RateForm />
      <RateTable />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="mt-4 mt-sm-0">
      <OrderSummary :tab="tab" @next="$emit('next')" @cart="$emit('cart')" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import OrderSummary from './OrderSummary.vue'
import RateForm from './RateForm.vue'
import RateTable from './RateTable.vue'

defineEmits(['next', 'cart'])
defineProps<{
  tab: number
}>()
</script>
