<template>
  <v-card variant="outlined" color="secondary" class="rounded-lg">
    <v-card-text>
      <v-row no-gutters class="ga-4">
        <v-col cols="12" class="d-flex justify-space-between align-center">
          <span class="text-subtitle-1 app-font font-weight-bold">Resumen</span>
          <span
            v-if="tab !== 0"
            class="text-caption app-font text-grey cursor-pointer"
            @click="comebackToCart"
          >
            Regresar al carrito
          </span>
        </v-col>

        <v-col cols="12" v-if="tab === 0">
          <v-row no-gutters>
            <v-col cols="" class="pr-1">
              <v-text-field
                v-model="coupon"
                hide-details
                density="compact"
                variant="outlined"
                color="primary"
                placeholder="Agregar cupón"
              />
            </v-col>
            <v-col cols="auto" class="pl-1">
              <v-btn flat block color="secondary" @click="addCoupon"> Agregar </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" v-else>
          <v-row no-gutters v-for="(product, index) in cart" :key="product.id">
            <v-col cols="auto">
              <v-img
                cover
                height="70"
                width="70"
                class="cursor-pointer"
                :src="product.image"
                @click="$router.push({ name: 'details', params: { id: product.id } })"
              />
            </v-col>
            <v-col class="d-flex flex-column justify-center ml-2" style="min-width: 0">
              <span class="text-semibold text-truncate">{{ product.name }}</span>
              <span class="text-caption text-semibold text-grey app-font">
                ${{ product.price }}
              </span>
              <span class="text-caption text-grey app-font"> Cant. {{ product.quantity }}</span>
            </v-col>

            <v-divider :class="index < cart.length - 1 ? 'my-3' : 'mt-3'" />
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row no-gutters justify="space-between">
            <v-col cols="auto" class="text-caption app-font"> Subtotal </v-col>
            <v-col cols="auto" class="text-caption app-font font-weight-bold">
              ${{ subtotal }}
            </v-col>
          </v-row>
          <v-row no-gutters justify="space-between">
            <v-col cols="auto" class="text-caption app-font"> Descuento </v-col>
            <v-col cols="auto" class="text-caption app-font font-weight-bold text-primary">
              {{ `${discount ? '-' : ''} $${discount}` }}
            </v-col>
          </v-row>
          <v-row no-gutters justify="space-between">
            <v-col cols="auto" class="text-caption app-font"> Envío </v-col>
            <v-col cols="auto" class="text-caption app-font font-weight-bold">
              {{ shipping === 0 ? 'Por cotizar' : shipping }}
            </v-col>
          </v-row>
        </v-col>

        <v-divider />

        <v-col cols="12">
          <v-row no-gutters justify="space-between">
            <v-col cols="auto" class="app-font font-weight-bold"> Total </v-col>
            <v-col cols="auto" class="app-font font-weight-bold"> ${{ total }} </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-btn
            block
            color="primary"
            :disabled="disabledButton"
            :variant="disabledButton ? 'plain' : 'flat'"
            @click="$emit('next')"
          >
            <span class="text-grey-darken-4">Continuar</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStore, useProductsStore, useShippingStore } from '@/stores'

const emit = defineEmits(['next', 'cart'])
const props = defineProps<{
  tab: number
}>()

const store = useStore()
const productsStore = useProductsStore()
const shippingStore = useShippingStore()

const { subtotal, cartTotal, discount, cart } = storeToRefs(productsStore)
const { shipping } = storeToRefs(shippingStore)
const coupon = ref('')

const addCoupon = () => {
  if (!coupon.value) return
  if (coupon.value === 'ECART100') {
    productsStore.setDiscount(100)
    coupon.value = ''
    store.setAlert('Cupón agregado correctamente.', 'success')
    return
  }
  productsStore.setDiscount(0)
  store.setAlert('Ingresa un cupón válido.', 'error')
}

const comebackToCart = () => {
  emit('cart')
  shippingStore.setShipping(0)
  shippingStore.setRateList([])
}

const total = computed(() => {
  const sub = Number(subtotal.value)
  if (sub === 0) return 0
  const result = sub - discount.value + shipping.value
  return result.toFixed(2)
})

const disabledButton = computed(() => {
  if (props.tab === 0) {
    return !cartTotal.value
  }
  if (props.tab === 1) {
    return !cartTotal.value || !shipping.value
  }
  if (props.tab === 2) {
    return false
  }
  return false
})
</script>
