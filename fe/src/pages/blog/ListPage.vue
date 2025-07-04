<template>
<q-page class="q-pa-md">
  <div class="q-mb-lg">
    <!-- Header Section -->
    <div class="row items-center justify-between q-mb-md">
      <div class="col-auto">
        <div class="text-h4 text-weight-bold text-primary q-mb-xs">
          <q-icon name="article" class="q-mr-sm" />
          Quản lý bài viết
        </div>
        <div class="text-body2 text-grey-7">
          Quản lý và theo dõi tất cả bài viết trong hệ thống
        </div>
      </div>
      <div class="col-auto">
        <q-btn
          color="primary"
          icon="add"
          label="Thêm bài viết"
          unelevated
          class="q-px-lg"
          @click="addNewBlog"
        />
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg q-mb-md">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-primary text-white">
          <q-card-section class="q-pa-md">
            <div class="text-h6">{{ rows.length }}</div>
            <div class="text-body2">Tổng bài viết</div>
            <q-icon name="article" size="24px" class="absolute-top-right q-pa-md" style="opacity: 0.3" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-positive text-white">
          <q-card-section class="q-pa-md">
            <div class="text-h6">{{ publishedCount }}</div>
            <div class="text-body2">Đã xuất bản</div>
            <q-icon name="check_circle" size="24px" class="absolute-top-right q-pa-md" style="opacity: 0.3" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-orange text-white">
          <q-card-section class="q-pa-md">
            <div class="text-h6">{{ featuredCount }}</div>
            <div class="text-body2">Nổi bật</div>
            <q-icon name="star" size="24px" class="absolute-top-right q-pa-md" style="opacity: 0.3" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-info text-white">
          <q-card-section class="q-pa-md">
            <div class="text-h6">{{ totalViews }}</div>
            <div class="text-body2">Lượt xem</div>
            <q-icon name="visibility" size="24px" class="absolute-top-right q-pa-md" style="opacity: 0.3" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>

  <!-- Table Section -->
  <q-card class="q-mt-md">
    <q-card-section class="q-pa-none">
      <q-table
        :rows="rows"
        :columns="columns"
        :loading="blogStore.loading"
        :pagination="{ rowsPerPage: 10, sortBy: 'publishedAt', descending: true }"
        :rows-per-page-options="[10, 20, 50, 100]"
        :no-data-label="'Không có dữ liệu'"
        :no-results-label="'Không tìm thấy kết quả'"
        :filter="filter"
        flat
        class="blog-table"
      >
        <template v-slot:top>
          <div class="row items-center justify-between full-width">
            <div class="text-h6 text-weight-medium">
              Danh sách bài viết ({{ rows.length }})
            </div>
            <q-input
              v-model="filter"
              placeholder="Tìm kiếm bài viết..."
              outlined
              dense
              clearable
              class="q-ml-md"
              style="min-width: 300px"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>

        <template v-slot:body-cell-tieuDe="props">
          <q-td :props="props">
            <div class="text-weight-medium text-primary cursor-pointer" @click="viewBlog(props.row)">
              {{ formatText(props.value, 40) }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-moTaNgan="props">
          <q-td :props="props">
            <div class="text-grey-7">
              {{ formatText(props.value, 50) }}
            </div>
          </q-td>
        </template>



        <template v-slot:body-cell-laNoiBat="props">
          <q-td :props="props">
            <q-icon
              :name="props.value ? 'star' : 'star_border'"
              :color="props.value ? 'orange' : 'grey'"
              size="20px"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-soLuotXem="props">
          <q-td :props="props">
            <div class="row items-center">
              <q-icon name="visibility" color="grey" size="16px" class="q-mr-xs" />
              <span class="text-weight-medium">{{ (props.value || 0).toLocaleString() }}</span>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-publishedAt="props">
          <q-td :props="props">
            <div class="text-grey-7">
              {{ formatDate(props.value) }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="row items-center q-gutter-xs">
              <q-btn
                size="sm"
                dense
                round
                flat
                color="primary"
                icon="visibility"
                @click="viewBlog(props.row)"
              >
                <q-tooltip>Xem chi tiết</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                dense
                round
                flat
                color="positive"
                icon="edit"
                @click="editBlog(props.row)"
              >
                <q-tooltip>Chỉnh sửa</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                dense
                round
                flat
                color="negative"
                icon="delete"
                @click="deleteBlog(props.row)"
              >
                <q-tooltip>Xóa</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</q-page>
</template>

<script setup lang="ts">
import { useBlogStore } from 'src/stores/Blog'
import type { Blog } from 'src/types'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const blogStore = useBlogStore()
const router = useRouter()
const columns = [
  { name: 'tieuDe', label: 'Tiêu đề', field: 'tieuDe', align: 'left' as const, sortable: true, format: (val: string) => val.substring(0, 50) + '...' },
  {
    name: 'moTaNgan', label: 'Mô tả ngắn',
    field: 'moTaNgan',
    align: 'left' as const,
    sortable: true,
    format: (val: string) => val.substring(0, 50) + '...'
  },
  {
    name: 'trangThai', label: 'Trạng thái', field: 'trangThai', align: 'left' as const, sortable: true,
    format: (val: boolean) => val === true ? 'Đã xuất bản' : 'Nháp',
    classes: 'text-weight-bold text-primary',
  },
  {
    name: 'laNoiBat', label: 'Là nổi bật', field: 'laNoiBat', align: 'left' as const, sortable: true,
    format: (val: boolean) => val === true ? 'Có' : 'Không',
  },
  { name: 'soLuotXem', label: 'Số lượt xem', field: 'soLuotXem', align: 'left' as const, sortable: true },
  { name: 'publishedAt', label: 'Ngày đăng', field: 'publishedAt', align: 'left' as const, sortable: true, format: (val: string) => new Date(val).toLocaleDateString('vi-VN') + ' ' + new Date(val).toLocaleTimeString('vi-VN') },
  { name: 'action', label: 'Hành động', field: 'action', align: 'left' as const, sortable: false },
]
const rows = computed(() => blogStore.blogs)

// State
const filter = ref('')

// Computed stats
const publishedCount = computed(() => {
  return rows.value.filter(blog => blog.trangThai === true ).length
})

const featuredCount = computed(() => {
  return rows.value.filter(blog => blog.laNoiBat).length
})

const totalViews = computed(() => {
  return rows.value.reduce((total, blog) => total + (blog.soLuotXem || 0), 0).toLocaleString()
})

// Helper functions
const formatText = (text: string, maxLength: number) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Chưa có'
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const addNewBlog = async () => {
  await router.push('/blog/create')
}

// Action handlers
const viewBlog = (blog: Blog) => {
 console.log(blog)
}

const editBlog = (blog: Blog) => {
  console.log('Chỉnh sửa blog:', blog)
  // TODO: Navigate to edit page or open edit dialog
  // router.push(`/blog/edit/${blog.documentId}`)
}

const deleteBlog = (blog: Blog) => {
  console.log('Xóa blog:', blog)
  // TODO: Show confirmation dialog and delete blog
  // if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
  //   blogStore.deleteBlog(blog.documentId)
  // }
}

onMounted(async () => {
  await blogStore.fetchBaiDangs()
})
</script>

<style scoped>
.blog-table {
  border-radius: 8px;
}

.blog-table :deep(.q-table__top) {
  padding: 16px 16px 0 16px;
  border-bottom: 1px solid #e0e0e0;
}

.blog-table :deep(.q-table__bottom) {
  padding: 8px 16px;
  border-top: 1px solid #e0e0e0;
}

.blog-table :deep(.q-table thead th) {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #424242;
  border-bottom: 2px solid #e0e0e0;
}

.blog-table :deep(.q-table tbody tr) {
  transition: background-color 0.2s ease;
}

.blog-table :deep(.q-table tbody tr:hover) {
  background-color: #f5f5f5;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-pointer:hover {
  text-decoration: underline;
}

.q-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Stats cards hover effect */
.bg-primary,
.bg-positive,
.bg-orange,
.bg-info {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bg-primary:hover,
.bg-positive:hover,
.bg-orange:hover,
.bg-info:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-h4 {
    font-size: 1.5rem;
  }

  .q-input {
    min-width: 200px !important;
  }
}
</style>
