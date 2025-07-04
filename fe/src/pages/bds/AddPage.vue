<template>
  <div class="add-property-page">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <q-icon name="add_business" size="56px" color="white" />
        </div>
        <h4 class="header-title">Thêm bất động sản mới</h4>
        <p class="header-subtitle">Tạo tin đăng bất động sản của bạn một cách dễ dàng</p>
      </div>
      <div class="header-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="container">
        <q-form @submit="onSubmit" @reset="onReset" class="property-form">

          <!-- Section 1: Thông tin cơ bản & Giá cả -->
          <q-card class="form-section basic-price-section" flat>
            <q-card-section>
              <div class="section-header">
                <q-icon name="info" color="primary" size="24px" />
                <h5 class="section-title">Thông tin cơ bản & Giá cả</h5>
              </div>

              <div class="form-grid">
                <!-- Thông tin cơ bản -->
                <div class="form-row full-width">
                  <q-input
                    v-model="form.tieuDe"
                    label="Tiêu đề bất động sản"
                    outlined
                    required
                    :rules="[val => val && val.length > 0 || 'Vui lòng nhập tiêu đề']"
                    class="modern-input"
                    color="primary"
                  >
                    <template v-slot:prepend>
                      <q-icon name="title" color="primary" />
                    </template>
                  </q-input>
                </div>

                <div class="form-row ">
                  <q-input
                    v-model.number="form.giaBan"
                    label="Giá bán"
                    type="number"
                    suffix="VNĐ"
                    outlined
                    required
                    :rules="[val => val > 0 || 'Giá bán phải lớn hơn 0']"
                    class="modern-input"
                    color="green"
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_money" color="green" />
                    </template>
                  </q-input>
                </div>
                <div class="form-row ">
                  <q-input
                    v-model.number="form.dienTich"
                    label="Diện tích"
                    type="number"
                    suffix="m²"
                    outlined
                    required
                    :rules="[val => val > 0 || 'Diện tích phải lớn hơn 0']"
                    class="modern-input"
                    color="green"
                  >
                    <template v-slot:prepend>
                      <q-icon name="square_foot" color="green" />
                    </template>
                  </q-input>
                </div>
                <div class="form-row ">
                  <q-input
                    v-model="form.moTaNgan"
                    label="Mô tả ngắn gọn"
                    type="textarea"
                    rows="3"
                    outlined
                    required
                    :rules="[val => val && val.length > 0 || 'Vui lòng nhập mô tả ngắn']"
                    class="modern-input"
                    color="primary"
                  >
                    <template v-slot:prepend>
                      <q-icon name="short_text" color="primary" />
                    </template>
                  </q-input>
                </div>
                <div class="form-row ">
                  <q-input
                    v-model="form.moTaChiTiet"
                    label="Mô tả chi tiết (tùy chọn)"
                    type="textarea"
                    rows="4"
                    outlined
                    class="modern-input"
                    color="primary"
                  >
                    <template v-slot:prepend>
                      <q-icon name="description" color="primary" />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Section 2: Thông tin địa chỉ -->
          <q-card class="form-section location-info-section" flat>
            <q-card-section>
              <div class="section-header">
                <q-icon name="location_on" color="orange" size="24px" />
                <h5 class="section-title">Thông tin địa chỉ</h5>
              </div>

              <div class="form-grid">
                <div class="form-row full-width">
                  <q-input
                    v-model="form.diaChi"
                    label="Địa chỉ cụ thể"
                    outlined
                    required
                    :rules="[val => val && val.length > 0 || 'Vui lòng nhập địa chỉ']"
                    class="modern-input"
                    color="orange"
                  >
                    <template v-slot:prepend>
                      <q-icon name="home" color="orange" />
                    </template>
                  </q-input>
                </div>

                <div class="form-row half-width">
                  <q-input
                    v-model="form.tinh"
                    label="Tỉnh/Thành phố"
                    outlined
                    required
                    :rules="[val => val && val.length > 0 || 'Vui lòng nhập tỉnh/thành phố']"
                    class="modern-input"
                    color="orange"
                  >
                    <template v-slot:prepend>
                      <q-icon name="location_city" color="orange" />
                    </template>
                  </q-input>
                </div>

                <div class="form-row half-width">
                  <q-input
                    v-model="form.phuongXa"
                    label="Phường/Xã"
                    outlined
                    required
                    :rules="[val => val && val.length > 0 || 'Vui lòng nhập phường/xã']"
                    class="modern-input"
                    color="orange"
                  >
                    <template v-slot:prepend>
                      <q-icon name="apartment" color="orange" />
                    </template>
                  </q-input>
                </div>

                <!-- Tọa độ GPS -->
                <div class="coordinate-subsection">
                  <div class="subsection-title">
                    <q-icon name="gps_fixed" color="orange" />
                    <span>Tọa độ GPS (không bắt buộc)</span>
                  </div>
                  <div class="coordinate-inputs">
                    <div class="form-row half-width">
                      <q-input
                        v-model.number="form.kinhDo"
                        label="Kinh độ"
                        type="number"
                        step="0.000001"
                        outlined
                        class="modern-input"
                        color="orange"
                      >
                        <template v-slot:prepend>
                          <q-icon name="navigation" color="orange" />
                        </template>
                      </q-input>
                    </div>
                    <div class="form-row half-width">
                      <q-input
                        v-model.number="form.viDo"
                        label="Vĩ độ"
                        type="number"
                        step="0.000001"
                        outlined
                        class="modern-input"
                        color="orange"
                      >
                        <template v-slot:prepend>
                          <q-icon name="explore" color="orange" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Section 3: Phân loại & Đăng tin -->
          <q-card class="form-section category-publish-section" flat>
            <q-card-section>
              <div class="section-header">
                <q-icon name="category" color="purple" size="24px" />
                <h5 class="section-title">Phân loại & Đăng tin</h5>
              </div>

              <div class="form-grid">
                <!-- Phân loại -->
                <div class="form-row half-width">
                  <q-select
                    v-model="form.danh_muc_bat_dong_san"
                    label="Loại bất động sản"
                    :options="loaiBdsOptions"
                    emit-value
                    map-options
                    option-label="label"
                    option-value="value"
                    outlined
                    required
                    :rules="[val => val && val.length > 0 || 'Vui lòng chọn loại bất động sản']"
                    class="modern-input"
                    color="purple"
                  >
                    <template v-slot:prepend>
                      <q-icon name="business" color="purple" />
                    </template>
                  </q-select>
                </div>

                <div class="form-row half-width">
                  <q-select
                    v-model="form.trangThaiGiaoDich"
                    label="Trạng thái giao dịch"
                    :options="trangThaiOptions"
                    outlined
                    required
                    :rules="[val => val && val.length > 0 || 'Vui lòng chọn trạng thái giao dịch']"
                    class="modern-input"
                    color="purple"
                  >
                    <template v-slot:prepend>
                      <q-icon name="swap_horiz" color="purple" />
                    </template>
                  </q-select>
                </div>

                <!-- Separator -->
                <div class="section-divider">
                  <q-separator />
                  <div class="divider-text">
                    <q-icon name="publish" color="indigo" size="20px" />
                    <span>Thông tin đăng tin</span>
                  </div>
                </div>

                <!-- Thông tin đăng tin -->
                <div class="form-row half-width">
                  <q-input
                    v-model="form.ngayPublic"
                    label="Ngày giờ đăng tin"
                    type="datetime-local"
                    outlined
                    class="modern-input"
                    color="indigo"
                    hint="Chọn thời gian đăng bài"
                  >
                    <template v-slot:prepend>
                      <q-icon name="schedule" color="indigo" />
                    </template>
                  </q-input>
                </div>

                <div class="form-row half-width">
                  <q-select
                    v-model="form.bai_viet"
                    label="Bài viết liên quan"
                    :options="blogOptions"
                    emit-value
                    map-options
                    option-label="label"
                    option-value="value"
                    outlined
                    required
                    :rules="[val => val && val.length > 0 || 'Vui lòng chọn bài viết liên quan']"
                    class="modern-input"
                    color="indigo"
                  >
                    <template v-slot:prepend>
                      <q-icon name="article" color="indigo" />
                    </template>
                  </q-select>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Section 4: Cài đặt nâng cao -->
          <q-card class="form-section settings-section" flat>
            <q-card-section>
              <div class="section-header">
                <q-icon name="settings" color="teal" size="24px" />
                <h5 class="section-title">Cài đặt nâng cao</h5>
              </div>

              <div class="toggle-grid">
                <div class="toggle-card featured-toggle">
                  <div class="toggle-content">
                    <div class="toggle-info">
                      <q-icon name="star" color="amber" size="32px" />
                      <div class="toggle-text">
                        <div class="toggle-title">Tin nổi bật</div>
                        <div class="toggle-desc">Hiển thị ưu tiên trên trang chủ</div>
                      </div>
                    </div>
                    <q-toggle
                      v-model="form.laNoiBat"
                      color="amber"
                      size="lg"
                    />
                  </div>
                </div>

                <div class="toggle-card active-toggle">
                  <div class="toggle-content">
                    <div class="toggle-info">
                      <q-icon name="visibility" color="green" size="32px" />
                      <div class="toggle-text">
                        <div class="toggle-title">Trạng thái hoạt động</div>
                        <div class="toggle-desc">Cho phép hiển thị công khai</div>
                      </div>
                    </div>
                    <q-toggle
                      v-model="form.trangThaiHoatDong"
                      color="green"
                      size="lg"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Action Buttons -->
          <div class="action-section">
            <div class="action-buttons">
              <q-btn
                flat
                label="Đặt lại form"
                type="reset"
                color="grey-6"
                size="lg"
                class="reset-btn"
                icon="refresh"
                unelevated
              />
              <q-btn
                label="Thêm bất động sản"
                type="submit"
                color="primary"
                size="lg"
                class="submit-btn"
                :loading="loading"
                :disable="loading"
                icon="add"
                unelevated
                no-caps
              />
            </div>
          </div>

        </q-form>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useBatDongSanStore } from 'src/stores/BatDongSans'
import type {  BatCategory, BatDongSanInput, BlogBDS } from 'src/types'

const router = useRouter()
const $q = useQuasar()
const batDongSanStore = useBatDongSanStore()

const loading = ref(false)

// Form data
const form = reactive({
  tieuDe: '',
  moTaNgan: '',
  moTaChiTiet: '',
  giaBan: 0,
  donViGia: '',
  kinhDo: 0,
  viDo: 0,
  dienTich: 0,
  diaChi: '',
  tinh: '',
  phuongXa: '',
  trangThaiGiaoDich: 'Đang bán',
  soLuotXem: 0,
  ngayPublic: '',
  danh_muc_bat_dong_san: '',
  laNoiBat: false,
  trangThaiHoatDong: true,
  bai_viet: ''
})

const loaiBdsOptions = ref<{ label: string, value: string }[]>([])

const blogOptions = ref<{ label: string, value: string }[]>([])

const trangThaiOptions = [
  'Đang bán',
  'Đã bán',
  'Đang cho thuê',
  'Đã cho thuê',
  'Ngừng giao dịch'
]

const onSubmit = async () => {
  loading.value = true

  try {
    // Prepare data for API
    const user = localStorage.getItem('user')
    const userData = JSON.parse(user || '{}')

    // Format ngayPublic to proper DateTime format
    let formattedNgayPublic = form.ngayPublic
    if (form.ngayPublic && form.ngayPublic.length > 0) {
      // Convert datetime-local format to ISO DateTime
      formattedNgayPublic = form.ngayPublic + ':00.000Z'
    }

    const formData: BatDongSanInput = {
      ...form,
      ngayPublic: formattedNgayPublic,
      donViGia: 'VNĐ',
      khach_hang: userData.id as string,
      danhSachAnh: [],
    }

    const success = await batDongSanStore.createBatDongSan(formData)
    if (success) {
      $q.notify({
        type: 'positive',
        message: 'Thêm bất động sản thành công!',
        position: 'top'
      })

      // Navigate back to list page
      await router.push('/bds/list')
    } else {
      $q.notify({
        type: 'negative',
        message: 'Có lỗi xảy ra khi thêm bất động sản!',
        position: 'top'
      })
    }
  } catch (error) {
    console.error('Error creating bat dong san:', error)
    $q.notify({
      type: 'negative',
      message: 'Có lỗi xảy ra khi thêm bất động sản!',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

const onReset = () => {
  Object.assign(form, {
    tieuDe: '',
    moTaNgan: '',
    moTaChiTiet: '',
    giaBan: 0,
    donViGia: '',
    kinhDo: 0,
    viDo: 0,
    dienTich: 0,
    diaChi: '',
    tinh: '',
    phuongXa: '',
    trangThaiGiaoDich: 'Đang bán',
    soLuotXem: 0,
    ngayPublic: '',
    danh_muc_bat_dong_san: '',
    laNoiBat: false,
    trangThaiHoatDong: true,
    bai_viet: ''
  })
}

onMounted(async () => {
  await batDongSanStore.fetchBatCategories()
  loaiBdsOptions.value = batDongSanStore.batCategories.map((category: BatCategory) => ({
    label: category.tenDanhMuc,
    value: category.documentId
  }))
  await batDongSanStore.fetchBlogs()
  blogOptions.value = batDongSanStore.blogs.map((blog: BlogBDS) => ({
    label: blog.tieuDe,
    value: blog.documentId
  }))
})
</script>

<style scoped>
/* Main Container */
.add-property-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;
}

/* Header Section */
.page-header {
  position: relative;
  padding: 60px 20px;
  text-align: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.header-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
}

.header-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  animation: pulse 2s infinite;
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 16px 0;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
}

.header-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.5px;
}

/* Header Decorations */
.header-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  bottom: -75px;
  left: -75px;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  top: 50%;
  right: 10%;
  animation-delay: 4s;
}

/* Content Wrapper */
.content-wrapper {
  padding: 40px 20px;
  position: relative;
  z-index: 1;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Form Styling */
.property-form {
  animation: fadeInUp 0.8s ease-out;
}

/* Form Sections */
.form-section {
  margin-bottom: 32px;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.form-section:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

/* Section Headers */
.section-header {
  padding: 0;
  background: transparent;
}

.section-title {
  display: flex;
  align-items: center;
  padding: 24px 32px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  margin-right: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.bg-blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.bg-green { background: linear-gradient(135deg, #10b981, #059669); }
.bg-orange { background: linear-gradient(135deg, #f59e0b, #d97706); }
.bg-purple { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
.bg-indigo { background: linear-gradient(135deg, #6366f1, #4f46e5); }

.title-text {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  letter-spacing: -0.01em;
}

/* Section Content */
.section-content {
  padding: 32px;
}

/* Form Elements */
.form-row {
  margin-bottom: 24px;
}

.modern-input {
  transition: all 0.3s ease;
}

:deep(.modern-input .q-field__control) {
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  background: white;
  transition: all 0.3s ease;
}

:deep(.modern-input.q-field--focused .q-field__control) {
  border-color: var(--q-primary);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
}

:deep(.modern-input .q-field__control):hover {
  border-color: #94a3b8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

:deep(.modern-input .q-field__label) {
  font-weight: 500;
  color: #64748b;
}

:deep(.modern-input.q-field--focused .q-field__label) {
  font-weight: 600;
}

/* Subsections */
.coordinate-section,
.settings-section {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  margin-top: 24px;
}

.subsection-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #475569;
}

.subsection-title q-icon {
  margin-right: 8px;
}

/* Toggle Cards */
.toggle-card {
  background: white;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.toggle-card:hover {
  border-color: #94a3b8;
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.toggle-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.toggle-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.toggle-text {
  margin-left: 12px;
}

.toggle-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.toggle-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.4;
}

/* Action Section */
.action-section {
  margin-top: 40px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  align-items: center;
}

.reset-btn {
  padding: 12px 32px;
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
}

.submit-btn {
  padding: 12px 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4);
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.submit-btn:hover::before {
  left: 100%;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-header {
    padding: 40px 16px;
  }

  .header-title {
    font-size: 2rem;
  }

  .header-subtitle {
    font-size: 1rem;
  }

  .header-icon-wrapper {
    width: 80px;
    height: 80px;
  }

  .content-wrapper {
    padding: 24px 16px;
  }

  .section-content {
    padding: 24px;
  }

  .section-title {
    padding: 20px 24px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .reset-btn,
  .submit-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 1.8rem;
  }

  .section-content {
    padding: 20px;
  }

  .coordinate-section,
  .settings-section {
    padding: 20px;
  }

  .toggle-content {
    padding: 16px;
  }
}

/* Enhanced Input Focus States */
:deep(.q-field--outlined.q-field--focused .q-field__control):before {
  border-color: transparent;
}

:deep(.q-field--outlined.q-field--focused .q-field__control):after {
  transform: scale(1);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a6fd8, #6a4190);
}

/* Loading Animation */
.q-btn--loading {
  pointer-events: none;
}

/* Enhanced Toggle Styling */
:deep(.q-toggle__inner) {
  border-radius: 20px;
}

:deep(.q-toggle__track) {
  border-radius: 20px;
}

/* Form Section Entrance Animation */
.info-section {
  animation-delay: 0.1s;
}

.price-section {
  animation-delay: 0.2s;
}

.location-section {
  animation-delay: 0.3s;
}

.category-section {
  animation-delay: 0.4s;
}

.other-section {
  animation-delay: 0.5s;
}
</style>
