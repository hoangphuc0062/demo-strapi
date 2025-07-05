<template>
  <q-page class="list-page">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <div class="header-text">
          <h3 class="page-title">Quản lý Bất động sản</h3>
          <p class="page-subtitle">Danh sách và quản lý toàn bộ bất động sản</p>
        </div>
        <div class="header-button">
          <div class="header-button-item">
            <q-btn
              color="primary"
              label="Thêm bất động sản"
              icon="add"
              to="/bds/create"
              class="add-btn"
              size="md"
            />
          </div>
        </div>

      </div>
    </div>

    <!-- Quota Section -->
    <div class="quota-section">
      <q-card class="quota-card" flat>
        <q-card-section class="q-pa-lg">
          <div class="row items-center justify-between">
            <div class="col-auto">
              <div class="quota-info">
                <h6 class="quota-title">Giới hạn đăng bài</h6>
                <div class="quota-details">
                  <div class="quota-item">
                    <q-icon name="business_center" size="20px" class="quota-icon" />
                    <span class="quota-label">Gói hiện tại:</span>
                    <q-chip :color="getPackageColor()" text-color="white" class="quota-chip">
                      {{ goiDichVu?.khachHang?.goi_dich_vu?.tenGoi || 'Chưa xác định' }}
                    </q-chip>
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="info"
                      color="grey-6"
                      class="quota-info-btn"
                    >
                      <q-tooltip class="bg-grey-8" anchor="top middle" self="bottom middle">
                        <div class="package-info">
                          <div><strong>Gói Free:</strong> 5 bài đăng</div>
                          <div><strong>Gói Basic:</strong> 100 bài đăng</div>
                          <div><strong>Gói Premium:</strong> 300 bài đăng</div>
                          <div><strong>Gói Enterprise:</strong> 400 bài đăng</div>
                        </div>
                      </q-tooltip>
                    </q-btn>
                  </div>
                  <div class="quota-item">
                    <q-icon name="post_add" size="20px" class="quota-icon" />
                    <span class="quota-label">Đã sử dụng:</span>
                    <span class="quota-value">{{ soLuongBdsDaDang }} / {{ soLuongBdsDuocPhepDang }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="quota-progress">
                <q-circular-progress
                  :value="quotaPercentage"
                  size="80px"
                  :thickness="0.15"
                  color="primary"
                  track-color="grey-3"
                  class="quota-circle"
                >
                  <div class="quota-percentage">{{ Math.round(quotaPercentage) }}%</div>
                </q-circular-progress>
              </div>
            </div>
            <div class="col-auto">
              <q-btn
                @click="refreshData"
                icon="refresh"
                label="Làm mới"
                outline
                color="primary"
                :loading="batDongSanStore.loading"
              />
            </div>
          </div>

          <!-- Warning when quota is nearly full -->
          <div v-if="quotaPercentage >= 80" class="quota-warning q-mt-md">
            <q-banner
              :class="quotaPercentage >= 100 ? 'bg-red-1 text-red' : 'bg-orange-1 text-orange'"
              rounded
            >
              <template v-slot:avatar>
                <q-icon :name="quotaPercentage >= 100 ? 'error' : 'warning'" />
              </template>
              <div v-if="quotaPercentage >= 100">
                <strong>Đã đạt giới hạn!</strong> Bạn đã sử dụng hết quota đăng bài. Vui lòng nâng cấp gói để tiếp tục đăng.
              </div>
              <div v-else>
                <strong>Sắp đạt giới hạn!</strong> Bạn đã sử dụng {{ Math.round(quotaPercentage) }}% quota. Cân nhắc nâng cấp gói.
              </div>
            </q-banner>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Loading State -->
    <div v-if="batDongSanStore.loading" class="loading-section">
      <q-inner-loading showing>
        <q-spinner-grid size="50px" color="primary" />
        <div class="loading-text q-mt-md">Đang tải dữ liệu...</div>
      </q-inner-loading>
    </div>

    <!-- Table Section -->
    <div v-else class="table-section">
      <q-card class="table-card" flat>
        <q-card-section class="q-pa-none">
          <q-table
            :rows="paginatedBatDongSans"
            :columns="tableColumns"
            row-key="documentId"
            flat
            bordered
            separator="cell"
            :rows-per-page-options="[9, 15, 25, 50]"
            :pagination="tablePagination"
            @request="onTableRequest"
            class="real-estate-table"
            :loading="batDongSanStore.loading"
          >
            <!-- Custom column renderers -->
            <template v-slot:body-cell-tieuDe="props">
              <q-td :props="props" class="cursor-pointer title-cell" @click="viewDetail(props.row)">
                <div class="title-content">
                  <div class="title-text">
                    {{ props.value }}
                    <q-badge v-if="props.row.laNoiBat" color="red" class="q-ml-xs featured-badge">
                      <q-icon name="star" size="12px" class="q-mr-xs" />
                      Nổi bật
                    </q-badge>
                  </div>
                  <div class="description-text">
                    {{ props.row.moTaNgan }}
                  </div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-giaBan="props">
              <q-td :props="props">
                <div class="price-content">
                  {{ formatPrice(props.value, props.row.donViGia) }}
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-diaChi="props">
              <q-td :props="props">
                <div class="address-content">
                  <q-icon name="location_on" size="16px" class="address-icon" />
                  <div class="address-text">
                    <div class="address-main">{{ props.row.diaChi }}</div>
                    <div class="address-sub">
                      {{ props.row.phuongXa }}, {{ props.row.tinh }}
                    </div>
                  </div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-dienTich="props">
              <q-td :props="props">
                <div class="area-content">
                  <q-icon name="straighten" size="16px" class="area-icon" />
                  <span class="area-text">{{ formatNumber(props.value) }} m²</span>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-danhMuc="props">
              <q-td :props="props">
                <q-chip
                  color="blue-grey-6"
                  text-color="white"
                  dense
                  size="sm"
                  icon="category"
                  class="category-chip"
                >
                  {{ props.row.danh_muc_bat_dong_san?.tenDanhMuc || 'Chưa phân loại' }}
                </q-chip>
              </q-td>
            </template>
            <template v-slot:body-cell-trangThaiHoatDong="props">
              <q-td :props="props">
                <q-select
                  :model-value="props.row.trangThaiHoatDong"
                  :options="statusOptions"
                  option-value="value"
                  option-label="label"
                  dense
                  outlined
                  emit-value
                  map-options
                  @update:model-value="(value) => confirmStatusChange(props.row, value)"
                  :loading="updatingStatus === props.row.documentId"
                  class="status-select"
                >
                  <template v-slot:selected-item="scope">
                  {{ scope.opt.label }}
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-icon
                          :name="scope.opt.value === true ? 'check_circle' : 'cancel'"
                          :color="scope.opt.value === true ? 'green-6' : 'red-6'"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-td>
            </template>

            <template v-slot:body-cell-soLuotXem="props">
              <q-td :props="props">
                <div class="views-content">
                  <q-icon name="visibility" size="16px" class="views-icon" />
                  <span class="views-text">{{ formatNumber(props.value) }}</span>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-ngayPublic="props">
              <q-td :props="props">
                <div class="date-content">
                  {{ formatDate(props.value) }}
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <div class="actions-content">
                  <q-btn
                    flat
                    round
                    color="blue-6"
                    icon="visibility"
                    size="sm"
                    @click="viewDetail(props.row)"
                    class="action-btn"
                  >
                    <q-tooltip>Xem chi tiết</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="orange-6"
                    icon="edit"
                    size="sm"
                    @click="editDetail(props.row)"
                    class="action-btn"
                  >
                    <q-tooltip>Chỉnh sửa</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="red-6"
                    icon="delete"
                    size="sm"
                    @click="deleteDetail(props.row)"
                    class="action-btn"
                  >
                    <q-tooltip>Xóa</q-tooltip>
                  </q-btn>
                </div>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination-section">
      <q-pagination
        v-model="currentPage"
        :max="totalPages"
        :max-pages="6"
        boundary-numbers
        direction-links
        outline
        color="primary"
        active-design="unelevated"
        active-color="primary"
        active-text-color="white"
        class="pagination-component"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { useBatDongSanStore } from 'src/stores/BatDongSans'
import { onMounted, computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import type { BatDongSan } from 'src/types'
import { useRouter } from 'vue-router'

export default {
  name: 'BlogsListPage',
  setup() {
    const batDongSanStore = useBatDongSanStore()
    const $q = useQuasar()
    const router = useRouter()
    // Reactive data
    const currentPage = ref(1)
    const itemsPerPage = 9
    const updatingStatus = ref<string | null>(null)

    // Status options for dropdown
    const statusOptions = [
      { label: 'Hoạt động', value: true },
      { label: 'Không hoạt động', value: false }
    ]

        // Computed properties
    const filteredBatDongSans = computed(() => {
      return batDongSanStore.batDongSans
    })

    const totalPages = computed(() =>
      Math.ceil(filteredBatDongSans.value.length / itemsPerPage)
    )

    const paginatedBatDongSans = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filteredBatDongSans.value.slice(start, end)
    })
    // Table configuration
    const tableColumns = ref([
      {
        name: 'tieuDe',
        required: true,
        label: 'Tiêu đề',
        align: 'left' as const,
        field: 'tieuDe',
        sortable: true,
        style: 'width: 300px'
      },
      {
        name: 'giaBan',
        label: 'Giá bán',
        align: 'right' as const,
        field: 'giaBan',
        sortable: true,
        style: 'width: 150px'
      },
      {
        name: 'diaChi',
        label: 'Địa chỉ',
        align: 'left' as const,
        field: 'diaChi',
        sortable: true,
        style: 'width: 200px'
      },
      {
        name: 'dienTich',
        label: 'Diện tích',
        align: 'center' as const,
        field: 'dienTich',
        sortable: true,
        style: 'width: 100px'
      },
      {
        name: 'danhMuc',
        label: 'Danh mục',
        align: 'center' as const,
        field: (row: BatDongSan) => row.danh_muc_bat_dong_san?.tenDanhMuc,
        sortable: true,
        style: 'width: 120px'
      },
      {
        name: 'trangThaiHoatDong',
        label: 'Hoạt động',
        align: 'center' as const,
        field: 'trangThaiHoatDong',
        sortable: true,
        style: 'width: 120px'
      },
      {
        name: 'soLuotXem',
        label: 'Lượt xem',
        align: 'center' as const,
        field: 'soLuotXem',
        sortable: true,
        style: 'width: 100px'
      },
      {
        name: 'ngayPublic',
        label: 'Ngày đăng',
        align: 'center' as const,
        field: 'publishedAt',
        sortable: true,
        style: 'width: 120px'
      },
      {
        name: 'actions',
        label: 'Thao tác',
        align: 'center' as const,
        field: '',
        sortable: false,
        style: 'width: 120px'
      }
    ])

    const tablePagination = ref({
      sortBy: 'publishedAt',
      descending: true,
      page: 1,
      rowsPerPage: 9
    })

    const onTableRequest = (props: { pagination: typeof tablePagination.value }) => {
      tablePagination.value = props.pagination
    }

    // Methods
    const formatPrice = (price: number, unit: string) => {
      if (!price) return 'Liên hệ'

      if (price >= 1000000000) {
        return `${(price / 1000000000).toFixed(1)} tỷ ${unit || 'VND'}`
      } else if (price >= 1000000) {
        return `${(price / 1000000).toFixed(0)} triệu ${unit || 'VND'}`
      } else {
        return `${price.toLocaleString('vi-VN')} ${unit || 'VND'}`
      }
    }

    const formatNumber = (num: number) => {
      if (!num) return '0'
      return num.toLocaleString('vi-VN')
    }

    const formatDate = (dateString: string) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('vi-VN')
    }



    const viewDetail = (item: BatDongSan) => {
      // Navigate to detail page or show detail dialog
      $q.notify({
        message: `Xem chi tiết: ${item.tieuDe}`,
        color: 'primary',
        position: 'top'
      })
    }

    const refreshData = async () => {
      await batDongSanStore.fetchBatDongSans()
      currentPage.value = 1
    }

    const editDetail = (item: BatDongSan) => {
      localStorage.setItem('bdsEdit', JSON.stringify(item))
      void router.push('/bds/update')
    }

    const deleteDetail = (item: BatDongSan) => {
      $q.dialog({
        title: 'Xóa bất động sản',
        message: 'Bạn có chắc chắn muốn xóa bất động sản này không?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        void (async () => {
          const result = await batDongSanStore.deleteBatDongSan({ documentId: item.documentId })
          if (result) {
            $q.notify({
              message: 'Bất động sản đã được xóa thành công',
              color: 'positive',
              position: 'top'
            })
            await refreshData()
          } else {
            $q.notify({
              message: 'Có lỗi xảy ra khi xóa bất động sản',
              color: 'negative',
              position: 'top'
            })
          }
        })()
      })
    }

        const confirmStatusChange = (item: BatDongSan, newStatus: boolean) => {
      const currentStatusText = item.trangThaiHoatDong ? 'Hoạt động' : 'Không hoạt động'
      const newStatusText = newStatus ? 'Hoạt động' : 'Không hoạt động'

      $q.dialog({
        title: 'Xác nhận thay đổi trạng thái',
        message: `Bạn có chắc chắn muốn thay đổi trạng thái từ "${currentStatusText}" thành "${newStatusText}" không?`,
        cancel: {
          label: 'Hủy',
          color: 'grey',
          flat: true
        },
        ok: {
          label: 'Xác nhận',
          color: 'primary'
        },
        persistent: true
      }).onOk(() => {
        void toggleStatus(item, newStatus)
      }).onCancel(() => {
        // Do nothing, just close dialog
      })
    }

    const toggleStatus = async (item: BatDongSan, newStatus: boolean) => {
      updatingStatus.value = item.documentId

      try {
        const result = await batDongSanStore.updateBatDongSan({
          documentId: item.documentId,
          data: {
            trangThaiHoatDong: newStatus
          } as any // eslint-disable-line @typescript-eslint/no-explicit-any
        })

        if (result) {
          $q.notify({
            message: `Đã ${newStatus ? 'kích hoạt' : 'tắt'} trạng thái bất động sản`,
            color: 'positive',
            position: 'top'
          })
        } else {
          $q.notify({
            message: 'Có lỗi xảy ra khi cập nhật trạng thái',
            color: 'negative',
            position: 'top'
          })
        }
      } catch (error) {
        console.error('Error updating status:', error)
        $q.notify({
          message: 'Có lỗi xảy ra khi cập nhật trạng thái',
          color: 'negative',
          position: 'top'
        })
      } finally {
        updatingStatus.value = null
      }
    }

    const goiDichVu = computed(() => {
      const goiDichVu = localStorage.getItem('goiDichVu')
      return goiDichVu ? JSON.parse(goiDichVu) : null
    })
    const soLuongBdsDuocPhepDang = computed(() => {
      if (goiDichVu.value.khachHang.goi_dich_vu.tenGoi === 'Gói Free') {
        return 5;
      } else if (goiDichVu.value.khachHang.goi_dich_vu.tenGoi === 'Gói Basic') {
        return 100;
      } else if (goiDichVu.value.khachHang.goi_dich_vu.tenGoi === 'Gói Premium') {
        return 300;
      } else if (goiDichVu.value.khachHang.goi_dich_vu.tenGoi === 'Gói Enterprise') {
        return 400;
      }
      return 0;
    })
    const soLuongBdsDaDang = computed(() => {
      return batDongSanStore.batDongSans.filter(item => item.trangThaiHoatDong === true).length
    })
    localStorage.setItem('soLuongBdsDuocPhepDang', soLuongBdsDuocPhepDang.value.toString())
    const xuLyBds = computed(() => {
      if (soLuongBdsDaDang.value >= soLuongBdsDuocPhepDang.value) {
        return false;
      }
      return true;
    })

    const quotaPercentage = computed(() => {
      if (soLuongBdsDuocPhepDang.value === 0) return 0;
      return (soLuongBdsDaDang.value / soLuongBdsDuocPhepDang.value) * 100;
    })

    const getPackageColor = () => {
      const packageName = goiDichVu.value?.khachHang?.goi_dich_vu?.tenGoi;
      switch (packageName) {
        case 'Gói Free':
          return 'grey-6';
        case 'Gói Basic':
          return 'blue-6';
        case 'Gói Premium':
          return 'purple-6';
        case 'Gói Enterprise':
          return 'green-6';
        default:
          return 'grey-6';
      }
    }
    onMounted(async () => {
      $q.loading.show({
        message: 'Đang tải dữ liệu...'
      })

      try {
        await batDongSanStore.fetchBatDongSans()
      } catch (error) {
        console.error('Error loading data:', error)
        $q.notify({
          message: 'Có lỗi xảy ra khi tải dữ liệu',
          color: 'negative',
          position: 'top'
        })
      } finally {
        $q.loading.hide()
      }
    })

        return {
      batDongSanStore,
      currentPage,
      filteredBatDongSans,
      paginatedBatDongSans,
      totalPages,
      tableColumns,
      tablePagination,
      soLuongBdsDuocPhepDang,
      soLuongBdsDaDang,
      xuLyBds,
      quotaPercentage,
      getPackageColor,
      goiDichVu,
      updatingStatus,
      statusOptions,
      onTableRequest,
      formatPrice,
      formatNumber,
      formatDate,
      viewDetail,
      refreshData,
      editDetail,
      deleteDetail,
      toggleStatus,
      confirmStatusChange
    }
  }
}
</script>

<style scoped>
.list-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 24px;
}

/* Header Section */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: -24px -24px 24px -24px;
  padding: 40px 24px;
  color: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 8px 0 0 0;
}

.add-btn {
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 12px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: rgba(255,255,255,0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.header-button {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-button-item {
  display: flex;
  align-items: center;
}

/* Quota Section */
.quota-section {
  margin-bottom: 24px;
}

.quota-card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid rgba(255,255,255,0.8);
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
}

.quota-title {
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
}

.quota-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quota-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quota-icon {
  color: #6b7280;
}

.quota-label {
  font-weight: 500;
  color: #374151;
  min-width: 100px;
}

.quota-value {
  font-weight: 700;
  color: #1f2937;
  font-size: 1.05rem;
}

.quota-chip {
  font-weight: 600;
  border-radius: 8px;
}

.quota-progress {
  display: flex;
  align-items: center;
  justify-content: center;
}

.quota-circle {
  position: relative;
}

.quota-percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 0.9rem;
  color: #1f2937;
}

.quota-warning {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.quota-info-btn {
  margin-left: 8px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.quota-info-btn:hover {
  opacity: 1;
}

.package-info {
  padding: 8px 0;
  line-height: 1.4;
}

.package-info > div {
  margin-bottom: 4px;
}

.package-info > div:last-child {
  margin-bottom: 0;
}

/* Loading Section */
.loading-section {
  background: white;
  border-radius: 16px;
  min-height: 400px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.loading-text {
  color: #666;
  font-size: 1.1rem;
}

/* Table Section */
.table-section {
  margin-bottom: 24px;
}

.table-card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid rgba(255,255,255,0.8);
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.real-estate-table {
  border-radius: 16px;
}

.real-estate-table :deep(.q-table__top) {
  background: #f8fafb;
}

.real-estate-table :deep(th) {
  background: #f8fafb;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  padding: 16px 12px;
}

.real-estate-table :deep(td) {
  padding: 16px 12px;
  border-bottom: 1px solid #f3f4f6;
}

.real-estate-table :deep(tbody tr:hover) {
  background-color: #f9fafb;
}

/* Table Cell Styles */
.title-cell {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.title-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title-text {
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
}

.description-text {
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.3;
}

.featured-badge {
  border-radius: 8px;
  font-size: 0.7rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.price-content {
  font-weight: 700;
  color: #dc2626;
  font-size: 1.05rem;
}

.address-content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.address-icon {
  color: #6b7280;
  margin-top: 2px;
}

.address-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.address-main {
  font-weight: 500;
  color: #1f2937;
}

.address-sub {
  font-size: 0.8rem;
  color: #6b7280;
}

.area-content {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
}

.area-icon {
  color: #6b7280;
}

.area-text {
  font-weight: 500;
  color: #1f2937;
}

.views-content {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
}

.views-icon {
  color: #6b7280;
}

.views-text {
  font-weight: 500;
  color: #1f2937;
}

.date-content {
  font-weight: 500;
  color: #1f2937;
  text-align: center;
}

/* Chip Styles */
.category-chip,
.activity-chip {
  border-radius: 8px;
  font-weight: 500;
  min-height: 28px;
}

.clickable-chip {
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.clickable-chip:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.clickable-chip:active {
  transform: scale(0.98);
}

/* Status Select */
.status-select {
  min-width: 140px;
}

.status-select :deep(.q-field__control) {
  min-height: 32px;
  border-radius: 8px;
}

.status-select :deep(.q-field__native) {
  padding: 0 8px;
}

/* Actions */
.actions-content {
  display: flex;
  gap: 4px;
  justify-content: center;
}

.action-btn {
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: scale(1.1);
}

/* Pagination */
.pagination-section {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.pagination-component {
  background: white;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

/* Responsive */
@media (max-width: 768px) {
  .list-page {
    padding: 16px;
  }

  .header-section {
    margin: -16px -16px 16px -16px;
    padding: 24px 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .page-title {
    font-size: 2rem;
  }

  .add-btn {
    width: 100%;
    max-width: 300px;
  }

  /* Quota responsive */
  .quota-card .row {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .quota-details {
    align-items: center;
  }

  .quota-item {
    justify-content: center;
  }

  .quota-label {
    min-width: auto;
  }

  .real-estate-table :deep(.q-table__control) {
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 1024px) {
  .real-estate-table :deep(th),
  .real-estate-table :deep(td) {
    padding: 12px 8px;
  }
}
</style>
