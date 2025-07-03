import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Notify } from 'quasar'
import { GET_GOI_DICH_VUS_BY_NGUOI_DUNG_QUERY, GET_GOI_DICH_VUS_QUERY, UPDATE_GOI_DICH_VU_MUTATION } from 'src/service'
import type { GoiDichVu, GoiDichVuByNguoiDungResponse, UpdateGoiDichVuInput } from 'src/types'
import { apolloClient } from 'src/boot/apollo'
import gql from 'graphql-tag'

export const useGoiDichVuStore = defineStore('goiDichVu', () => {
  // State
  const goiDichVus = ref<GoiDichVu[]>([])
  const goiDichVuByNguoiDung = ref<GoiDichVuByNguoiDungResponse>()
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

  const fetchGoiDichVusByNguoiDung = async (documentId: string): Promise<boolean> => {
    loading.value = true
    try {
      const result = await apolloClient.query({
        query: gql(GET_GOI_DICH_VUS_BY_NGUOI_DUNG_QUERY),
        variables: { documentId }
      })
      if (!result?.data?.khachHang?.goi_dich_vu) {
        throw new Error('Failed to fetch service packages')
      }
      goiDichVuByNguoiDung.value = {
        khachHang: {
          goi_dich_vu: {
            tenGoi: result.data.khachHang.goi_dich_vu.tenGoi,
            soLuongPublic: result.data.khachHang.goi_dich_vu.soLuongPublic,
            soLuongDaft: result.data.khachHang.goi_dich_vu.soLuongDaft,
            thoiHanNgay: result.data.khachHang.goi_dich_vu.thoiHanNgay
          }
        }
      };
      return true;
    } catch (error) {
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

  const updateGoiDichVu = async (input: UpdateGoiDichVuInput): Promise<boolean> => {
    try {
      const result = await apolloClient.mutate({
        mutation: gql(UPDATE_GOI_DICH_VU_MUTATION),
        variables: {
          documentId: input.documentId,
          data: {
            goi_dich_vu: input.data.goi_dich_vu
          }
         }
      })
      if (!result?.data) {
        throw new Error('Failed to update service package')
      }
      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Không thể cập nhật gói dịch vụ'
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

  return {
    // State
    goiDichVus,
    goiDichVuByNguoiDung,
    loading,
    // Actions
    fetchGoiDichVus,
    clearGoiDichVus,
    fetchGoiDichVusByNguoiDung,
    updateGoiDichVu,
  }
})
