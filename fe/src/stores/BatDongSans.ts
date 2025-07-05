import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apolloClient } from 'src/boot/apollo'
import gql from 'graphql-tag'
import type { BatCategory, BatDongSan, BatDongSanFiltersInput, BatDongSanInput, BlogBDS, DeleteBatDongSanInput, UpdateBatDongSanInput } from 'src/types'
import { CREATE_BAT_DONG_SAN_MUTATION, DELETE_BAT_DONG_SAN_MUTATION, GET_BAT_CATEGORY_QUERY, GET_BAT_DONG_SAN_QUERY, GET_BLOG_QUERY, UPDATE_BAT_DONG_SAN_MUTATION } from 'src/service'

export const useBatDongSanStore = defineStore('batDongSan', () => {
  const batDongSans = ref<BatDongSan[]>([])
  const loading = ref(false)
  const batCategories = ref<BatCategory[]>([])
  const blogs = ref<BlogBDS[]>([])

  const fetchBatDongSans = async (filters?: BatDongSanFiltersInput): Promise<boolean> => {
    loading.value = true
    try {
      const userLocal = localStorage.getItem('user')
      const user = userLocal ? JSON.parse(userLocal) : null
      const result = await apolloClient.query({
        query: gql(GET_BAT_DONG_SAN_QUERY),
        variables: {
          filters: filters || { khach_hang: { documentId: { eq: user.id } } }
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

  const fetchBlogs = async (): Promise<boolean> => {
    try {
      const result = await apolloClient.query({
        query: gql(GET_BLOG_QUERY),
        fetchPolicy: 'no-cache'
      })
      if (!result?.data?.baiDangs) {
        throw new Error('Failed to fetch blogs')
      }
      blogs.value = result.data.baiDangs
      return true
    } catch (error) {
      console.error('Error fetching blogs:', error)
      return false
    }
  }

  const deleteBatDongSan = async (data: DeleteBatDongSanInput): Promise<boolean> => {
    try {
      const result = await apolloClient.mutate({
        mutation: gql(DELETE_BAT_DONG_SAN_MUTATION),
        variables: { documentId: data.documentId }
      })
      await fetchBatDongSans()
      return result.data.deleteBatDongSan
    } catch (error) {
      console.error('Error deleting bat dong san:', error)
      return false
    }
  }

  const updateBatDongSan = async (data: UpdateBatDongSanInput): Promise<boolean> => {
    try {
      const result = await apolloClient.mutate({
        mutation: gql(UPDATE_BAT_DONG_SAN_MUTATION),
        variables: { documentId: data.documentId, data: data.data }
      })
      await fetchBatDongSans()
      return result.data.updateBatDongSan
    } catch (error) {
      console.error('Error updating bat dong san:', error)
      return false
    }
  }

  return {

      batDongSans,
      loading,
      fetchBatDongSans,
      createBatDongSan,
      fetchBatCategories,
      batCategories,
      blogs,
      fetchBlogs,
      deleteBatDongSan,
      updateBatDongSan
    }
  }
)

