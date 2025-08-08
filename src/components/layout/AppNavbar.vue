<template>
  <v-app-bar color="white" elevation="0" border="b">
    <v-app-bar-title>
      <v-row no-gutters :justify="$vuetify.display.xs ? 'start' : 'center'">
        <v-col cols="auto">
          <v-img
            width="100px"
            class="cursor-pointer"
            src="https://cdn.ecart.com/assets/logo-negro-ONsDDeJl.svg"
            @click="$router.push({ name: 'products' })"
          />
        </v-col>
      </v-row>
    </v-app-bar-title>

    <template v-slot:append>
      <div class="d-flex flex-column align-center">
        <label
          class="font-weight-medium"
          style="font-size: 11px"
          :class="cartTotal ? 'text-primary' : 'text-white'"
        >
          {{ cartTotal > 9 ? '9+' : cartTotal }}
        </label>
        <v-btn
          variant="plain"
          color="primary"
          icon="mdi-cart"
          class="mt-n4"
          @click="$router.push({ name: 'cart' })"
        />
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores'
import { storeToRefs } from 'pinia'

const productsStore = useProductsStore()

const { cartTotal } = storeToRefs(productsStore)
</script>
