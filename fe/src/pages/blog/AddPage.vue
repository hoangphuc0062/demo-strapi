<template>
  <q-page class="page-container">
    <div class="main-wrapper">
      <!-- Header Section with gradient background -->
      <div class="hero-header">
        <div class="header-content">
          <div class="header-nav">
            <q-btn
              flat
              round
              icon="arrow_back"
              color="white"
              size="md"
              @click="$router.go(-1)"
              class="back-btn"
            >
              <q-tooltip class="bg-white text-dark">Quay lại</q-tooltip>
            </q-btn>
          </div>
          <div class="header-text">
            <div class="header-icon-wrapper">
              <q-icon name="create" class="header-icon" />
            </div>
            <h1 class="header-title">
              Tạo bài viết mới
            </h1>
            <p class="header-subtitle">
              Chia sẻ những ý tưởng và câu chuyện của bạn với cộng đồng
            </p>
          </div>
        </div>
        <div class="header-decoration">
          <div class="floating-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="content-wrapper">
        <q-card class="main-card" flat>
          <q-card-section class="card-content">
            <q-form @submit="handleSubmit" class="blog-form">
              <!-- Basic Information Section -->
              <div class="form-section">
                <div class="section-header">
                  <div class="section-icon-wrapper">
                    <q-icon name="info" class="section-icon" />
                  </div>
                  <div class="section-title-wrapper">
                    <h3 class="section-title">Thông tin cơ bản</h3>
                    <p class="section-subtitle">Nhập tiêu đề và mô tả cho bài viết của bạn</p>
                  </div>
                </div>

                <div class="fields-grid">
                  <div class="field-group col-span-2">
                    <q-input
                      v-model="form.tieuDe"
                      label="Tiêu đề bài viết"
                      outlined
                      :rules="[val => !!val || 'Vui lòng nhập tiêu đề']"
                      class="modern-input"
                      standout="bg-primary text-white"
                    >
                      <template v-slot:prepend>
                        <q-icon name="title" color="primary" />
                      </template>
                    </q-input>
                  </div>

                  <div class="field-group">
                    <q-input
                      v-model="form.slug"
                      label="Đường dẫn (Slug)"
                      outlined
                      hint="URL thân thiện cho bài viết"
                      class="modern-input"
                      @input="onSlugInput"
                    >
                      <template v-slot:prepend>
                        <q-icon name="link" color="primary" />
                      </template>
                      <template v-slot:append>
                        <q-btn
                          flat
                          round
                          dense
                          icon="refresh"
                          color="primary"
                          @click="regenerateSlug"
                          class="modern-btn-icon"
                        >
                          <q-tooltip>Tạo lại slug từ tiêu đề</q-tooltip>
                        </q-btn>
                      </template>
                    </q-input>
                  </div>

                  <div class="field-group">
                    <q-select
                      v-model="form.danh_muc_bai_viet"
                      :options="danhMucBaiVietOptions"
                      label="Danh mục bài viết"
                      outlined
                      emit-value
                      map-options
                      class="modern-input"
                    >
                      <template v-slot:prepend>
                        <q-icon name="category" color="primary" />
                      </template>
                    </q-select>
                  </div>

                  <div class="field-group col-span-2">
                    <q-input
                      v-model="form.moTaNgan"
                      label="Mô tả ngắn"
                      outlined
                      type="textarea"
                      rows="3"
                      hint="Mô tả ngắn gọn về nội dung bài viết"
                      class="modern-input"
                    >
                      <template v-slot:prepend>
                        <q-icon name="description" color="primary" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>

              <!-- Content Editor Section -->
              <div class="form-section">
                <div class="section-header">
                  <div class="section-icon-wrapper">
                    <q-icon name="article" class="section-icon" />
                  </div>
                  <div class="section-title-wrapper">
                    <h3 class="section-title">Nội dung bài viết</h3>
                    <p class="section-subtitle">Viết nội dung chi tiết cho bài viết của bạn</p>
                  </div>
                </div>

                <div class="editor-wrapper">
                  <q-editor
                    ref="editorRef"
                    v-model="form.noiDung"
                    min-height="20rem"
                    toolbar-bg="grey-1"
                    toolbar-toggle-color="primary"
                    toolbar-text-color="dark"
                    content-class="bg-white editor-content"
                    class="modern-editor"
                    :toolbar="[
                      [
                        {
                          label: $q.lang.editor.align,
                          icon: $q.iconSet.editor.align,
                          fixedLabel: true,
                          list: 'only-icons',
                          options: ['left', 'center', 'right', 'justify']
                        }
                      ],
                      ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                      ['token', 'hr', 'link', 'custom_btn'],
                      ['print', 'fullscreen'],
                      [
                        {
                          label: $q.lang.editor.formatting,
                          icon: $q.iconSet.editor.formatting,
                          list: 'no-icons',
                          options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
                        }
                      ],
                      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                      [
                        {
                          label: $q.lang.editor.fontSize,
                          icon: $q.iconSet.editor.fontSize,
                          fixedLabel: true,
                          fixedIcon: true,
                          list: 'no-icons',
                          options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
                        }
                      ],
                      ['removeFormat'],
                      ['viewsource']
                    ]"
                    :fonts="{
                      arial: 'Arial',
                      arial_black: 'Arial Black',
                      comic_sans: 'Comic Sans MS',
                      courier_new: 'Courier New',
                      impact: 'Impact',
                      lucida_grande: 'Lucida Grande',
                      times_new_roman: 'Times New Roman',
                      verdana: 'Verdana'
                    }"
                  />
                </div>
              </div>

              <!-- Settings & Media Section -->
              <div class="form-section">
                <div class="section-header">
                  <div class="section-icon-wrapper">
                    <q-icon name="tune" class="section-icon" />
                  </div>
                  <div class="section-title-wrapper">
                    <h3 class="section-title">Cài đặt nâng cao</h3>
                    <p class="section-subtitle">Tùy chỉnh các thiết lập cho bài viết</p>
                  </div>
                </div>

                <div class="fields-grid">
                  <div class="field-group">
                    <q-input
                      v-model="form.anhDaiDien"
                      label="URL ảnh đại diện"
                      outlined
                      hint="Đường dẫn đến ảnh đại diện của bài viết"
                      class="modern-input"
                    >
                      <template v-slot:prepend>
                        <q-icon name="image" color="primary" />
                      </template>
                    </q-input>
                  </div>

                  <div class="field-group">
                    <q-input
                      v-model="form.soLuotXem"
                      label="Số lượt xem"
                      outlined
                      type="number"
                      min="0"
                      class="modern-input"
                    >
                      <template v-slot:prepend>
                        <q-icon name="visibility" color="primary" />
                      </template>
                    </q-input>
                  </div>

                  <div class="field-group col-span-2">
                    <q-select
                      v-model="form.bat_dong_sans"
                      :options="batDongSanOptions"
                      label="Bất động sản liên quan"
                      outlined
                      emit-value
                      map-options
                      class="modern-input"
                    >
                      <template v-slot:prepend>
                        <q-icon name="home" color="primary" />
                      </template>
                    </q-select>
                  </div>
                </div>

                <!-- Status Toggles -->
                <div class="toggle-section">
                  <div class="toggle-cards">
                    <div class="toggle-card">
                      <div class="toggle-content">
                        <div class="toggle-info">
                          <q-icon name="visibility" class="toggle-icon" />
                          <div>
                            <h4 class="toggle-title">Kích hoạt bài viết</h4>
                            <p class="toggle-description">Cho phép hiển thị bài viết công khai</p>
                          </div>
                        </div>
                        <q-toggle
                          v-model="form.trangThai"
                          color="positive"
                          size="lg"
                          class="modern-toggle"
                        />
                      </div>
                    </div>

                    <div class="toggle-card">
                      <div class="toggle-content">
                        <div class="toggle-info">
                          <q-icon name="star" class="toggle-icon featured" />
                          <div>
                            <h4 class="toggle-title">Đánh dấu nổi bật</h4>
                            <p class="toggle-description">Hiển thị bài viết trong khu vực nổi bật</p>
                          </div>
                        </div>
                        <q-toggle
                          v-model="form.laNoiBat"
                          color="orange"
                          size="lg"
                          class="modern-toggle"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-section">
                <div class="action-buttons">
                  <q-btn
                    flat
                    label="Hủy bỏ"
                    color="grey-6"
                    @click="$router.go(-1)"
                    class="cancel-btn"
                    size="lg"
                  >
                    <q-icon name="close" class="q-mr-sm" />
                  </q-btn>
                  <q-btn
                    type="submit"
                    label="Tạo bài viết"
                    color="primary"
                    unelevated
                    :loading="loading"
                    class="submit-btn"
                    size="lg"
                  >
                    <q-icon name="add_circle" class="q-mr-sm" />
                  </q-btn>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useBlogStore } from 'src/stores/Blog'
import { useBatDongSanStore } from 'src/stores/BatDongSans'
import { useQuasar } from 'quasar'
import { computed, onMounted, ref, watch } from 'vue'
import type { BlogInput } from 'src/types'
import { useRouter } from 'vue-router'

const router = useRouter()

const blogStore = useBlogStore()
const batDongSanStore = useBatDongSanStore()
const $q = useQuasar()

const loading = ref(false)
const editorRef = ref()
const isSlugManuallyEdited = ref(false)

const danhMucBaiVietOptions = computed(() => {
  return blogStore.danhMucBaiViets.map((danhMucBaiViet) => ({
    label: danhMucBaiViet.tenDanhMuc,
    value: danhMucBaiViet.documentId
  }))
})

const batDongSanOptions = computed(() => {
  return batDongSanStore.batDongSans.map((batDongSan) => ({
    label: batDongSan.tieuDe,
    value: batDongSan.documentId
  }))
})
    const user = localStorage.getItem('user')
    const userData = JSON.parse(user || '{}')

const form = ref<BlogInput>({
  khach_hang: userData.id as string,
  bat_dong_sans: '',
  tieuDe: '',
  slug: '',
  moTaNgan: '',
  noiDung: '',
  trangThai: true,
  laNoiBat: false,
  soLuotXem: 0,
  danh_muc_bai_viet: '',
  anhDaiDien: '',
})

// Function to convert Vietnamese text to slug
const createSlug = (text: string): string => {
  // Replace Vietnamese characters
  const vietnameseMap: { [key: string]: string } = {
    'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
    'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
    'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
    'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
    'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
    'đ': 'd',
    'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
    'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
    'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
    'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
    'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
    'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
    'Đ': 'D'
  }

  let slug = text.toLowerCase()

  // Replace Vietnamese characters
  for (const [vietnamese, latin] of Object.entries(vietnameseMap)) {
    slug = slug.replace(new RegExp(vietnamese, 'g'), latin.toLowerCase())
  }

  // Remove special characters and replace spaces with hyphens
  slug = slug
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens

  return slug
}

// Watch for title changes to auto-generate slug
watch(() => form.value.tieuDe, (newTitle) => {
  if (!isSlugManuallyEdited.value && newTitle) {
    form.value.slug = createSlug(newTitle)
  }
})

// Track manual slug edits
const onSlugInput = () => {
  isSlugManuallyEdited.value = true
}

// Regenerate slug from title
const regenerateSlug = () => {
  if (form.value.tieuDe) {
    form.value.slug = createSlug(form.value.tieuDe)
    isSlugManuallyEdited.value = false
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true

    // Convert soLuotXem to string for BigInt compatibility
    const submitData = {
      ...form.value,
      soLuotXem: Number(form.value.soLuotXem || 0)
    }

    await blogStore.createBaiDang(submitData as BlogInput)

    $q.notify({
      type: 'positive',
      message: 'Bài viết đã được thêm thành công!',
      position: 'top-right'
    })

    await router.push('/blog/list')

    // TODO: Implement actual submit logic

  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: 'Có lỗi xảy ra khi thêm bài viết!',
      position: 'top-right'
    })
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await blogStore.fetchDanhMucBaiViets()
  await batDongSanStore.fetchBatDongSans()
})
</script>

<style scoped>
/* Page Layout */
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.main-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}

/* Hero Header */
.hero-header {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 32px 32px;
  padding: 3rem 2rem 4rem;
  color: white;
  overflow: hidden;
  margin-bottom: 2rem;
}

.header-content {
  position: relative;
  z-index: 2;
}

.header-nav {
  margin-bottom: 2rem;
}

.back-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-2px);
}

.header-text {
  text-align: center;
}

.header-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-icon {
  font-size: 2.5rem;
  color: white;
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Floating Shapes */
.header-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 60px;
  height: 60px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 40px;
  height: 40px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 80%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Content Wrapper */
.content-wrapper {
  padding: 0 2rem 3rem;
}

.main-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.card-content {
  padding: 3rem;
}

/* Form Sections */
.form-section {
  margin-bottom: 3rem;
  animation: slideInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.form-section:nth-child(1) { animation-delay: 0.1s; }
.form-section:nth-child(2) { animation-delay: 0.2s; }
.form-section:nth-child(3) { animation-delay: 0.3s; }

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f4f8;
}

.section-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  flex-shrink: 0;
}

.section-icon {
  font-size: 1.5rem;
  color: white;
}

.section-title-wrapper {
  flex: 1;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  font-size: 0.9rem;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

/* Fields Grid */
.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  align-items: start;
}

.field-group {
  display: flex;
  flex-direction: column;
}

.field-group.col-span-2 {
  grid-column: span 2;
}

/* Modern Input Styling */
:deep(.modern-input) {
  margin-bottom: 0;
}

:deep(.modern-input .q-field__control) {
  border-radius: 12px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  min-height: 56px;
}

:deep(.modern-input .q-field__control:hover) {
  border-color: #667eea;
  background: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
}

:deep(.modern-input.q-field--focused .q-field__control) {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

:deep(.modern-input .q-field__label) {
  color: #4a5568;
  font-weight: 500;
}

:deep(.modern-input .q-field__native) {
  padding: 12px 16px;
  font-size: 0.95rem;
  color: #2d3748;
}

:deep(.modern-input .q-field__prepend) {
  padding-left: 12px;
}

.modern-btn-icon {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.modern-btn-icon:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: scale(1.05);
}

/* Editor Styling */
.editor-wrapper {
  margin-top: 1rem;
}

:deep(.modern-editor) {
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
}

:deep(.modern-editor:hover) {
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
}

:deep(.modern-editor:focus-within) {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

:deep(.modern-editor .q-editor__toolbar) {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem;
}

:deep(.modern-editor .q-editor__content) {
  padding: 1.5rem;
  min-height: 300px;
  font-size: 0.95rem;
  line-height: 1.6;
}

:deep(.editor-content) {
  background: white !important;
}

/* Toggle Section */
.toggle-section {
  margin-top: 2rem;
}

.toggle-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.toggle-card {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.toggle-card:hover {
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.toggle-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.toggle-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.toggle-icon {
  font-size: 1.5rem;
  color: #667eea;
}

.toggle-icon.featured {
  color: #f6ad55;
}

.toggle-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.25rem 0;
}

.toggle-description {
  font-size: 0.85rem;
  color: #718096;
  margin: 0;
  line-height: 1.4;
}

:deep(.modern-toggle) {
  transform: scale(1.1);
}

/* Action Section */
.action-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f4f8;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  align-items: center;
}

.cancel-btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid #e2e8f0;
}

.cancel-btn:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
  transform: translateY(-1px);
}

.submit-btn {
  padding: 12px 32px;
  border-radius: 12px;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-header {
    padding: 2rem 1rem 3rem;
    border-radius: 0 0 24px 24px;
  }

  .header-title {
    font-size: 2rem;
  }

  .content-wrapper {
    padding: 0 1rem 2rem;
  }

  .card-content {
    padding: 2rem 1.5rem;
  }

  .fields-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .field-group.col-span-2 {
    grid-column: span 1;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .section-icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .section-icon {
    font-size: 1.25rem;
  }

  .toggle-cards {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
    width: 100%;
  }

  .cancel-btn,
  .submit-btn {
    width: 100%;
    justify-content: center;
  }

  .shape {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-header {
    padding: 1.5rem 1rem 2.5rem;
  }

  .header-title {
    font-size: 1.75rem;
  }

  .header-subtitle {
    font-size: 1rem;
  }

  .card-content {
    padding: 1.5rem 1rem;
  }

  .toggle-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  :deep(.modern-toggle) {
    align-self: flex-end;
  }
}

/* Loading States */
:deep(.q-btn--loading) {
  pointer-events: none;
}

:deep(.q-btn--loading .q-btn__content) {
  opacity: 0.6;
}

/* Focus Styles for Accessibility */
:deep(.q-btn:focus) {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

:deep(.q-field:focus-within) {
  outline: none;
}

/* Custom Scrollbar */
:deep(.q-editor__content::-webkit-scrollbar) {
  width: 8px;
}

:deep(.q-editor__content::-webkit-scrollbar-track) {
  background: #f1f1f1;
  border-radius: 4px;
}

:deep(.q-editor__content::-webkit-scrollbar-thumb) {
  background: #c1c1c1;
  border-radius: 4px;
}

:deep(.q-editor__content::-webkit-scrollbar-thumb:hover) {
  background: #a8a8a8;
}
</style>

