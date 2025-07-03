import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apolloClient } from 'src/boot/apollo'
import gql from 'graphql-tag'
import type { BatDongSan } from 'src/types'
import { GET_BAT_DONG_SAN_QUERY } from 'src/service'

export const useBatDongSanStore = defineStore('batDongSan', () => {
  const batDongSans = ref<BatDongSan[]>([])
  const loading = ref(false)

  const fetchBatDongSans = async (pagination?: { page?: number; pageSize?: number }): Promise<boolean> => {
    loading.value = true
    try {
      const result = await apolloClient.query({
        query: gql(GET_BAT_DONG_SAN_QUERY),
        variables: {
          pagination: pagination || { page: 1, pageSize: 25 }
        },
        fetchPolicy: 'no-cache' // Always fetch fresh data
      })
      if (!result?.data?.batDongSans) {
        throw new Error('Failed to fetch bat dong san')
      }
      batDongSans.value = result.data.batDongSans
      return true
    } catch (error) {
      console.error('Error fetching bat dong san:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    batDongSans,
    loading,
    fetchBatDongSans
  }
})

