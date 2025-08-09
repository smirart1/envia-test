<template>
  <v-layout>
    <AppNavbar />
    <v-main>
      <router-view />
    </v-main>
    <AppAlert />
  </v-layout>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores'
import AppNavbar from './components/layout/AppNavbar.vue'
import AppAlert from './components/layout/AppAlert.vue'
import { onMounted } from 'vue'

const productsStore = useProductsStore()

onMounted(() => {
  const cart = sessionStorage.getItem('cart')
  productsStore.setCart(cart ? JSON.parse(cart) : [])
})
</script>
