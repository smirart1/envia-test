<template>
  <v-form v-model="valid" @submit.prevent="generate">
    <v-row no-gutters>
      <v-col cols="12" md="6" class="pb-2 pr-0 pr-md-2">
        <v-text-field
          v-model="shippingFields.name"
          label="Nombre"
          density="comfortable"
          variant="outlined"
          color="primary"
          :rules="[rules.requiredName]"
        />
      </v-col>
      <v-col cols="12" md="6" class="pb-2 pl-0 pl-md-2">
        <v-text-field
          v-model="shippingFields.phone"
          label="Teléfono"
          density="comfortable"
          variant="outlined"
          color="primary"
          :rules="[rules.requiredPhone, rules.validPhone]"
        />
      </v-col>
      <v-col cols="12" md="6" class="pb-2 pr-0 pr-md-2">
        <v-text-field
          v-model="shippingFields.street"
          label="Calle"
          density="comfortable"
          variant="outlined"
          color="primary"
          :rules="[rules.requiredStreet]"
        />
      </v-col>
      <v-col cols="12" md="6" class="pb-2 pl-0 pl-md-2">
        <v-text-field
          v-model="shippingFields.number"
          label="Número"
          density="comfortable"
          variant="outlined"
          color="primary"
          :rules="[rules.requiredNumber]"
        />
      </v-col>
      <v-col cols="12" md="6" class="pb-2 pr-0 pr-md-2">
        <v-text-field
          v-model="shippingFields.city"
          label="Ciudad"
          density="comfortable"
          variant="outlined"
          color="primary"
          :rules="[rules.requiredCity]"
        />
      </v-col>
      <v-col cols="12" md="6" class="pb-2 pl-0 pl-md-2">
        <v-select
          v-model="shippingFields.state"
          label="Estado"
          density="comfortable"
          variant="outlined"
          color="primary"
          :items="STATES"
          :rules="[rules.requiredState]"
        />
      </v-col>
      <v-col cols="12" md="6" class="pb-2 pr-0 pr-md-2">
        <v-text-field
          v-model="rateFields.postalCode"
          label="Código postal"
          density="comfortable"
          variant="outlined"
          color="primary"
          disabled
          :rules="[rules.requiredZip, rules.validZip]"
        />
      </v-col>
      <v-col cols="12" md="6" class="pb-2 pl-0 pl-md-2">
        <v-text-field
          v-model="shippingFields.country"
          label="País"
          density="comfortable"
          variant="outlined"
          color="primary"
          disabled
        />
      </v-col>
    </v-row>

    <v-btn flat block color="secondary" type="submit" :loading="loading"> Generar Guía </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { useStore, useShippingStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { STATES } from '@/utils/constants'
import { rules } from '@/utils/form-rules'
import { storeToRefs } from 'pinia'

const store = useStore()
const shippingStore = useShippingStore()
const { shippingFields, rateFields, loading } = storeToRefs(shippingStore)

const valid = ref(false)

const generate = async () => {
  if (valid.value) {
    await shippingStore.getGuide()
  } else {
    store.setAlert('Completa los campos requeridos', 'error')
  }
}

onMounted(() => (shippingFields.value.country = 'México'))
</script>
