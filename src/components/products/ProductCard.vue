<template>
  <v-card
    variant="flat"
    class="mx-auto"
    max-width="400"
    @click="$router.push({ name: 'details', params: { id: product.id } })"
  >
    <v-img cover rounded aspect-ratio="1" :src="product.image" lazy-src="/images/placeholder.png">
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular color="grey-lighten-4" indeterminate />
        </div>
      </template>
    </v-img>
    <v-card-text class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" class="text-caption app-font mt-1 mb-n1 text-grey-darken-1 text-truncate">
          {{ product.vendor }}
        </v-col>
        <v-col cols="12" class="text-subtitle-2 app-font text-truncate"> {{ product.name }} </v-col>
        <v-col cols="12" class="font-weight-bold app-font text-truncate">
          {{ product.price }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Product } from '@/types'
defineProps<{
  product: Product
}>()
</script>
