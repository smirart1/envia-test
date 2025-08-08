<template>
  <v-snackbar
    v-model="alert.show"
    color="transparent"
    class="custom-snackbar"
    timeout="5000"
    max-width="400"
    location="top right"
    style="white-space: pre-line"
  >
    <v-alert
      v-model="alert.show"
      closable
      border="top"
      variant="tonal"
      class="pt-5 pb-3 px-2 custom-alert"
      style="background-color: white"
      :type="alert.type"
      :title="alert.type === 'error' ? 'Error' : 'Éxito'"
      :text="alert.message"
    >
      <template v-slot:close>
        <v-icon icon="mdi-close" @click="alert.show = false" />
      </template>
    </v-alert>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'

const store = useStore()
const { alert } = storeToRefs(store)
</script>

<style>
.custom-snackbar .v-snackbar__content {
  padding: 0 !important;
}

.v-snackbar--variant-elevated {
  box-shadow:
    0 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0 4px 5px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0 1px 10px 0 var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12)) !important;
}

.custom-alert .v-alert__prepend {
  margin-inline-end: 5px !important;
}
</style>
