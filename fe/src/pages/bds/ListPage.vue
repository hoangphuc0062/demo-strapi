<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <div class="col">
        <h3 class="text-h4 q-mb-md">Danh sách Bất động sản</h3>
        <q-separator class="q-mb-md" />
      </div>
    </div>


    <!-- Loading State -->
    <div v-if="batDongSanStore.loading" class="row justify-center q-py-xl">
      <q-spinner-dots size="50px" color="primary" />
    </div>

    <!-- Table View -->
    <div>
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
      >
        <!-- Custom column renderers -->
        <template v-slot:body-cell-tieuDe="props">
          <q-td :props="props" class="cursor-pointer" @click="viewDetail(props.row)">
            <div class="text-weight-bold text-primary">
              {{ props.value }}
              <q-badge v-if="props.row.laNoiBat" color="red" class="q-ml-xs">
                Nổi bật
              </q-badge>
            </div>
            <div class="text-caption text-grey-6">
              {{ props.row.moTaNgan }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-giaBan="props">
          <q-td :props="props">
            <div class="text-weight-bold text-red">
              {{ formatPrice(props.value, props.row.donViGia) }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-diaChi="props">
          <q-td :props="props">
            <div class="flex items-center">
              <q-icon name="location_on" size="16px" class="q-mr-xs" />
              <div>
                <div>{{ props.row.diaChi }}</div>
                <div class="text-caption text-grey-6">
                  {{ props.row.phuongXa }}, {{ props.row.tinh }}
                </div>
              </div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-dienTich="props">
          <q-td :props="props">
            <div class="flex items-center">
              <q-icon name="straighten" size="16px" class="q-mr-xs" />
              {{ formatNumber(props.value) }} m²
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-danhMuc="props">
          <q-td :props="props">
            <q-chip
              color="blue-grey"
              text-color="white"
              dense
              size="sm"
              icon="category"
            >
              {{ props.row.danh_muc_bat_dong_san?.tenDanhMuc || 'Chưa phân loại' }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-trangThaiGiaoDich="props">
          <q-td :props="props">
            <q-chip
              :color="getStatusColor(props.value)"
              text-color="white"
              dense
              size="sm"
            >
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-trangThaiHoatDong="props">
          <q-td :props="props">
            <q-chip
              :color="props.row.trangThaiHoatDong === true ? 'green' : 'red'"
              text-color="white"
              dense
              size="sm"
            >
              {{ props.row.trangThaiHoatDong === true ? 'Hoạt động' : 'Không hoạt động' }}
            </q-chip>
          </q-td>
          </template>

        <template v-slot:body-cell-soLuotXem="props">
          <q-td :props="props">
            <div class="flex items-center">
              <q-icon name="visibility" size="16px" class="q-mr-xs" />
              {{ formatNumber(props.value) }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-ngayPublic="props">
          <q-td :props="props">
            {{ formatDate(props.value) }}
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              round
              color="primary"
              icon="visibility"
              size="sm"
              @click="viewDetail(props.row)"
            >
              <q-tooltip>Xem chi tiết</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="row justify-center q-mt-lg">
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
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { useBatDongSanStore } from 'src/stores/BatDongSans'
import { onMounted, computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import type { BatDongSan } from 'src/types'

export default {
  name: 'BlogsListPage',
  setup() {
    const batDongSanStore = useBatDongSanStore()
    const $q = useQuasar()

    // Reactive data
    const searchText = ref('')
    const selectedCategory = ref<{label: string, value: string} | null>(null)
    const priceRange = ref<{label: string, value: {min: number, max: number}} | null>(null)
    const currentPage = ref(1)
    const itemsPerPage = 9

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
        name: 'trangThaiGiaoDich',
        label: 'Trạng thái',
        align: 'center' as const,
        field: 'trangThaiGiaoDich',
        sortable: true,
        style: 'width: 120px'
      },
      {
        name: 'trangThaiHoatDong',
        label: 'Trạng thái hoạt động',
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
        style: 'width: 80px'
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

    const getImageUrl = () => {
      // Return a placeholder image or handle the image URL logic
      return '/favicon.ico' // Placeholder for now
    }

    const getStatusColor = (status: string) => {
      switch (status?.toLowerCase()) {
        case 'còn hàng':
        case 'available':
          return 'green'
        case 'đã bán':
        case 'sold':
          return 'red'
        case 'đang đàm phán':
        case 'negotiating':
          return 'orange'
        default:
          return 'grey'
      }
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
      searchText.value = ''
      selectedCategory.value = null
      priceRange.value = null
    }

    // Lifecycle
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
      searchText,
      selectedCategory,
      priceRange,
      currentPage,
      filteredBatDongSans,
      paginatedBatDongSans,
      totalPages,
      tableColumns,
      tablePagination,
      onTableRequest,
      formatPrice,
      formatNumber,
      formatDate,
      getImageUrl,
      getStatusColor,
      viewDetail,
      refreshData
    }
  }
}
</script>

<style scoped>
.blog-card {
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.blog-image-container {
  position: relative;
  overflow: hidden;
}

.blog-image {
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-image {
  transform: scale(1.05);
}

.blog-overlay {
  position: absolute;
  top: 8px;
  right: 8px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.q-card {
  border-radius: 12px;
}

.q-card-section:first-child {
  border-radius: 12px 12px 0 0;
}

/* Table styles */
.real-estate-table {
  border-radius: 8px;
  overflow: hidden;
}

.real-estate-table .q-table__top {
  padding: 16px;
  background: #f5f5f5;
}

.real-estate-table th {
  font-weight: 600;
  background: #fafafa;
  border-bottom: 2px solid #e0e0e0;
}

.real-estate-table td {
  border-bottom: 1px solid #f0f0f0;
}

.real-estate-table tbody tr:hover {
  background-color: #f8f9fa;
}

.real-estate-table .q-chip {
  min-height: 24px;
}
</style>
