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
import AppNavbar from './components/layout/AppNavbar.vue'
import AppAlert from './components/layout/AppAlert.vue'
</script>
