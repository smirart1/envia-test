<template>
  <v-form v-model="valid" @submit.prevent="rateShipping">
    <v-row no-gutters>
      <v-col cols="12" md="6" class="pb-2 pr-0 pr-md-2">
        <v-text-field
          v-model="fields.postalCode"
          label="Código Postal"
          density="comfortable"
          variant="outlined"
          color="primary"
          :rules="[rules.requiredZip, rules.validZip]"
        />
      </v-col>
      <v-col cols="12" md="6" class="pb-2 pl-0 pl-md-2">
        <v-select
          v-model="fields.carrier"
          label="Paquetería"
          density="comfortable"
          variant="outlined"
          color="primary"
          :items="CARRIER"
          :rules="[rules.requiredCarrier]"
        />
      </v-col>
      <v-col cols="6" md="3" class="pb-2 pr-2">
        <v-number-input
          v-model="fields.height"
          label="Alto (cm)"
          controlVariant="hidden"
          density="comfortable"
          variant="outlined"
          color="primary"
          :min="1"
          :rules="[rules.requiredHeight]"
        />
      </v-col>
      <v-col cols="6" md="3" class="pb-2 pl-2 px-md-2">
        <v-number-input
          v-model="fields.length"
          label="Largo (cm)"
          controlVariant="hidden"
          density="comfortable"
          variant="outlined"
          color="primary"
          :min="1"
          :rules="[rules.requiredLength]"
        />
      </v-col>
      <v-col cols="6" md="3" class="pb-2 pr-2 px-md-2">
        <v-number-input
          v-model="fields.width"
          label="Ancho (cm)"
          controlVariant="hidden"
          density="comfortable"
          variant="outlined"
          color="primary"
          :min="1"
          :rules="[rules.requiredWidth]"
        />
      </v-col>
      <v-col cols="6" md="3" class="pb-2 pl-2">
        <v-number-input
          v-model="fields.weight"
          label="Peso (kg)"
          controlVariant="hidden"
          density="comfortable"
          variant="outlined"
          color="primary"
          :min="1"
          :rules="[rules.requiredWeight]"
        />
      </v-col>
    </v-row>

    <v-btn flat block color="secondary" type="submit" :loading="store.loading"> Cotizar </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import type { RateFields } from '@/types/shipping.types'
import { useStore, useShippingStore } from '@/stores'
import { ref } from 'vue'
import { CARRIER } from '@/utils/constants'
import { rules } from '@/utils/form-rules'

const store = useStore()
const shippingStore = useShippingStore()

const valid = ref(false)
const fields = ref({} as RateFields)

const rateShipping = async () => {
  if (valid.value) {
    await shippingStore.getRates(fields.value)
  } else {
    store.setAlert('Completa los campos requeridos', 'error')
  }
}
</script>
