import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apolloClient } from 'src/boot/apollo'
import gql from 'graphql-tag'
import type { BatDongSanFiltersInput, Blog, BlogInput, DanhMucBaiViet, DeleteBaiDangInput, UpdateBaiDangInput } from 'src/types'
import { CREATE_BAI_DANG_MUTATION, DELETE_BAI_DANG_MUTATION, GET_BAI_DANG_QUERY, GET_DANH_MUC_BAI_VIET_QUERY, UPDATE_BAI_DANG_MUTATION } from 'src/service'


export const useBlogStore = defineStore('blog', () => {
  const blogs = ref<Blog[]>([])
  const loading = ref(false)
  const danhMucBaiViets = ref<DanhMucBaiViet[]>([])
  const fetchBaiDangs = async (filters?: BatDongSanFiltersInput): Promise<boolean> => {
    try {
      const userLocal = localStorage.getItem('user')
      const user = userLocal ? JSON.parse(userLocal) : null
      const result = await apolloClient.query({
        query: gql(GET_BAI_DANG_QUERY),
        variables: {
          filters: filters || { khach_hang: { documentId: { eq: user.id } } }
        },
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

  const createBaiDang = async (data: BlogInput): Promise<boolean> => {

    try {
      const result = await apolloClient.mutate({
        mutation: gql(CREATE_BAI_DANG_MUTATION),
        variables: { data }
      })
      if (!result?.data?.createBaiDang) {
        throw new Error('Failed to create blog')
      }
      return true
    } catch (error) {
      console.error('Error creating blog:', error)
      return false
    }
  }

  const fetchDanhMucBaiViets = async (): Promise<boolean> => {
    try {
      const result = await apolloClient.query({
        query: gql(GET_DANH_MUC_BAI_VIET_QUERY),
        fetchPolicy: 'no-cache'
      })
      if (!result?.data?.danhMucBaiViets) {
        throw new Error('Failed to fetch danh muc bai viet')
      }
      danhMucBaiViets.value = result.data.danhMucBaiViets
      return true
    } catch (error) {
      console.error('Error fetching danh muc bai viet:', error)
      return false
    }
  }

  const deleteBaiDang = async (data: DeleteBaiDangInput): Promise<boolean> => {
    try {
      const result = await apolloClient.mutate({
        mutation: gql(DELETE_BAI_DANG_MUTATION),
        variables: { documentId: data.documentId }
      })
      await fetchBaiDangs()
      return result.data.deleteBaiDang
    } catch (error) {
      console.error('Error deleting bai dang:', error)
      return false
    }
  }

  const updateBaiDang = async (data: UpdateBaiDangInput): Promise<boolean> => {
    try {
      const result = await apolloClient.mutate({
        mutation: gql(UPDATE_BAI_DANG_MUTATION),
        variables: { documentId: data.documentId, data: data.data }
      })
      await fetchBaiDangs()
      return result.data.updateBaiDang
    } catch (error) {
      console.error('Error updating bai dang:', error)
      return false
    }
  }

  return {
    blogs,
    loading,
    danhMucBaiViets,

    fetchBaiDangs,
    createBaiDang,
    fetchDanhMucBaiViets,
    deleteBaiDang,
    updateBaiDang
  }
})

