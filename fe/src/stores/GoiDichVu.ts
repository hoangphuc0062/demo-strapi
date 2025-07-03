import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Notify } from 'quasar'
import { GET_GOI_DICH_VUS_QUERY } from 'src/service'
import type { GoiDichVu } from 'src/types'
import { apolloClient } from 'src/boot/apollo'
import gql from 'graphql-tag'

export const useGoiDichVuStore = defineStore('goiDichVu', () => {
  // State
  const goiDichVus = ref<GoiDichVu[]>([])
  const loading = ref(false)

    // Actions
  const fetchGoiDichVus = async (pagination?: { page?: number; pageSize?: number }): Promise<boolean> => {
    loading.value = true
    try {
      const result = await apolloClient.query({
        query: gql(GET_GOI_DICH_VUS_QUERY),
        variables: {
          pagination: pagination || { page: 1, pageSize: 25 }
        },
        fetchPolicy: 'no-cache' // Always fetch fresh data
      })

      if (!result?.data?.goiDichVus) {
        throw new Error('Failed to fetch service packages')
      }

      goiDichVus.value = result.data.goiDichVus

      return true
    } catch (error) {
      console.error('Error fetching goiDichVus:', error)
      const errorMessage = error instanceof Error ? error.message : 'Không thể tải danh sách gói dịch vụ'

      Notify.create({
        type: 'negative',
        message: errorMessage,
        position: 'top'
      })

      return false
    } finally {
      loading.value = false
    }
  }

  const clearGoiDichVus = () => {
    goiDichVus.value = []
  }

  return {
    // State
    goiDichVus,
    loading,

    // Actions
    fetchGoiDichVus,
    clearGoiDichVus,
  }
})
