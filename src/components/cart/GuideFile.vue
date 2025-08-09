<template>
  <v-sheet ref="labelRef" class="guide-container">
    <div ref="el" class="px-3">
      <v-row align="start" no-gutters>
        <v-col cols="auto" class="text-caption font-weight-bold">
          <div class="text-uppercase">{{ shipmentInfo.origin.name }}</div>
          <div class="mt-n2 text-uppercase">{{ shipmentInfo.origin.phone }}</div>
          <div class="mt-n2 text-uppercase">{{ shipmentInfo.origin.street }}</div>
          <div class="mt-n2 text-uppercase">{{ shipmentInfo.origin.number }}</div>
          <div class="mt-n2 text-uppercase">
            {{
              `${shipmentInfo.origin.city} ${shipmentInfo.origin.state} ${shipmentInfo.origin.postalCode}`
            }}
          </div>
        </v-col>
        <v-col cols="" class="text-end text-subtitle-2 font-weight-bold">
          <div>1 OF 1</div>
        </v-col>
      </v-row>

      <v-row no-gutters class="mt-4">
        <v-col cols="12" class="text-body-1 font-weight-bold">
          <div class="">SHIP TO:</div>
          <div class="mt-n2 ml-7 text-uppercase">{{ shipmentInfo.destination.name }}</div>
          <div class="mt-n2 ml-7 text-uppercase">{{ shipmentInfo.destination.phone }}</div>
          <div class="mt-n2 ml-7 text-uppercase">{{ shipmentInfo.destination.street }}</div>
          <div class="mt-n2 ml-7 text-uppercase">{{ shipmentInfo.destination.number }}</div>
          <div class="mt-n2 ml-7 text-uppercase">
            {{
              `${shipmentInfo.destination.city} ${shipmentInfo.destination.state} ${shipmentInfo.destination.postalCode}`
            }}
          </div>
        </v-col>
      </v-row>

      <v-divider color="black" class="custom-divider mt-8 mr-n3" thickness="2" />

      <v-row class="" no-gutters>
        <v-col cols="4">
          <v-icon icon="mdi-qrcode" size="130" class="ma-n1 mt-n2" />
        </v-col>
        <v-divider vertical color="black" class="custom-divider ml-2" thickness="2" />
        <v-col cols="" class="d-flex flex-column align-start justify-space-between ml-4">
          <span class="font-weight-bold text-h4 mb-n1 text-uppercase"
            >{{ shipmentInfo.destination.state }} 332 2-8</span
          >
          <img img height="75" src="https://barcode.orcascan.com/?type=code39&data=ECART10" />
        </v-col>
      </v-row>

      <v-divider color="black" class="custom-divider" thickness="6" />

      <v-row no-gutters style="position: relative">
        <v-col cols="12" class="text-h5 font-weight-black text-uppercase">
          {{ `${shipmentInfo.shipment.carrier} ${shipmentInfo.shipment.service}` }}</v-col
        >
        <v-col cols="12" class="text-caption font-weight-black">
          TRACKING #: {{ guideNumber }}
        </v-col>
        <v-icon
          icon="mdi-square"
          size="80"
          class="ma-n1 mt-n2"
          color="black"
          style="position: absolute; right: -18px; top: -8px"
        />
      </v-row>

      <v-divider color="black" class="custom-divider" thickness="2" />

      <v-row class="ml-4" no-gutters>
        <v-col>
          <img img height="100" src="https://barcode.orcascan.com/?type=code39&data=ECART1000000" />
        </v-col>
      </v-row>

      <v-divider color="black" class="custom-divider mr-n3" thickness="6" />

      <v-row class="" no-gutters>
        <v-col cols="12" class="text-caption font-weight-bold">SIGNATURE REQUIRED</v-col>
      </v-row>

      <v-row class="mt-2" no-gutters justify="space-between">
        <v-col cols="auto" class="text-caption font-weight-bold"> Reference No.1: TN </v-col>
        <v-col cols="auto" class="font-weight-medium mt-1" style="font-size: 8px"> TM </v-col>
      </v-row>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import html2pdf from 'html2pdf.js'
import { useShippingStore, useProductsStore } from '@/stores'
import { ref, onMounted, nextTick, computed, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'

const shippingStore = useShippingStore()
const productsStore = useProductsStore()
const { shipmentInfo } = storeToRefs(shippingStore)

const el = ref<HTMLElement | null>(null)

const guideNumber = computed(() => {
  let guide = ''
  for (let i = 0; i < 12; i++) {
    guide += Math.floor(Math.random() * 10)
  }
  return guide
})

const generateGuide = async () => {
  await nextTick()
  if (!el.value) return
  html2pdf()
    .set({
      filename: 'guia.pdf',
      jsPDF: { unit: 'mm', format: [101.6, 152.4], orientation: 'portrait' },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#fff' },
    })
    .from(el.value)
    .save()
}

onMounted(async () => {
  shippingStore.setRateList([])
  shippingStore.setShipping(0, '', '')
  productsStore.setCart()
  productsStore.setDiscount(0)
  await generateGuide()
})

onUnmounted(() => {
  shippingStore.setGuideStatus(false)
})
</script>

<style>
.custom-divider.v-divider {
  opacity: 100;
}

.guide-container {
  width: 101.6mm;
  height: 152.4mm;
  border: 1px #e0e0e0 solid;
  border-radius: 12px;
}
</style>
