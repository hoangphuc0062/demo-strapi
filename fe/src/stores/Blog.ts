import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apolloClient } from 'src/boot/apollo'
import gql from 'graphql-tag'
import type { Blog, BlogInput, DanhMucBaiViet } from 'src/types'
import { CREATE_BAI_DANG_MUTATION, GET_BAI_DANG_QUERY, GET_DANH_MUC_BAI_VIET_QUERY } from 'src/service'


export const useBlogStore = defineStore('blog', () => {
  const blogs = ref<Blog[]>([])
  const loading = ref(false)
  const danhMucBaiViets = ref<DanhMucBaiViet[]>([])
  const fetchBaiDangs = async (): Promise<boolean> => {
    try {
      const result = await apolloClient.query({
        query: gql(GET_BAI_DANG_QUERY),
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

  return {
    blogs,
    loading,
    danhMucBaiViets,

    fetchBaiDangs,
    createBaiDang,
    fetchDanhMucBaiViets,
  }
})

