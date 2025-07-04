import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apolloClient } from 'src/boot/apollo'
import gql from 'graphql-tag'
import type { BatCategory, BatDongSan, BatDongSanInput } from 'src/types'
import { CREATE_BAT_DONG_SAN_MUTATION, GET_BAT_CATEGORY_QUERY, GET_BAT_DONG_SAN_QUERY } from 'src/service'

export const useBatDongSanStore = defineStore('batDongSan', () => {
  const batDongSans = ref<BatDongSan[]>([])
  const loading = ref(false)
  const batCategories = ref<BatCategory[]>([])

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

  const createBatDongSan = async (data: BatDongSanInput): Promise<boolean> => {
    try {
      await apolloClient.mutate({
        mutation: gql(CREATE_BAT_DONG_SAN_MUTATION),
        variables: { data }
      })

      await fetchBatDongSans()
      return true
    } catch (error) {
      console.error('Error creating bat dong san:', error)
      return false
    }
  }

  const fetchBatCategories = async (): Promise<boolean> => {
    try {
      const result = await apolloClient.query({
        query: gql(GET_BAT_CATEGORY_QUERY),
        fetchPolicy: 'no-cache'
      })
      if (!result?.data?.danhMucBatDongSans) {
        throw new Error('Failed to fetch bat categories')
      }
      batCategories.value = result.data.danhMucBatDongSans;
      return true
    } catch (error) {
      console.error('Error fetching bat categories:', error)
      return false
    }
  }

  return {

      batDongSans,
      loading,
      fetchBatDongSans,
      createBatDongSan,
      fetchBatCategories,
      batCategories
    }
  }
)

