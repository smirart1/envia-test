import type { Alert } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const loading = ref(false)
  const alert = ref({
    message: '',
    type: 'success' as Alert,
    show: false,
  })

  const setLoading = (value: boolean) => (loading.value = value)

  const setAlert = (message: string, type: Alert) => {
    alert.value = {
      message,
      type,
      show: true,
    }
  }

  return { loading, alert, setLoading, setAlert }
})
