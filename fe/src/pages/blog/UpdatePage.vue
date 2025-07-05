<template>
  <q-page class="blog-update-page">
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">
          <q-icon name="edit" class="title-icon" />
          Cập nhật bài viết
        </h1>
        <p class="page-subtitle">Chỉnh sửa thông tin bài viết của bạn</p>
      </div>

      <q-card class="form-card">
        <q-card-section class="form-section">
          <q-form @submit="onSubmit" class="blog-form">
            <div class="form-grid">
              <div class="form-group">
                <q-input
                  v-model="blogEdit.tieuDe"
                  label="Tiêu đề"
                  outlined
                  class="custom-input"
                  :rules="[val => !!val || 'Tiêu đề là bắt buộc']"
                >
                  <template v-slot:prepend>
                    <q-icon name="title" color="primary" />
                  </template>
                </q-input>
              </div>

              <div class="form-group">
                <q-input
                  v-model="blogEdit.slug"
                  label="Slug"
                  outlined
                  class="custom-input"
                  :rules="[val => !!val || 'Slug là bắt buộc']"
                >
                  <template v-slot:prepend>
                    <q-icon name="link" color="primary" />
                  </template>
                </q-input>
              </div>

              <div class="form-group full-width">
                <q-input
                  v-model="blogEdit.moTaNgan"
                  label="Mô tả ngắn"
                  outlined
                  type="textarea"
                  rows="3"
                  class="custom-input"
                  :rules="[val => !!val || 'Mô tả ngắn là bắt buộc']"
                >
                  <template v-slot:prepend>
                    <q-icon name="description" color="primary" />
                  </template>
                </q-input>
              </div>

              <div class="form-group full-width">
                <div class="editor-wrapper">
                  <label class="editor-label">
                    <q-icon name="edit_note" color="primary" />
                    Nội dung bài viết
                  </label>
                  <q-editor
                    ref="editorRef"
                    v-model="blogEdit.noiDung"
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

              <div class="form-group">
                <q-select
                  v-model="blogEdit.danh_muc_bai_viet"
                  label="Danh mục bài viết"
                  outlined
                  class="custom-input"
                  :options="blogStore.danhMucBaiViets"
                  emit-value
                  map-options
                  option-value="documentId"
                  option-label="tenDanhMuc"
                >
                  <template v-slot:prepend>
                    <q-icon name="category" color="primary" />
                  </template>
                </q-select>
              </div>

              <div class="form-group">
                <q-input
                  v-model="blogEdit.soLuotXem"
                  label="Số lượt xem"
                  outlined
                  type="number"
                  class="custom-input"
                  :rules="[val => !!val || 'Số lượt xem là bắt buộc']"
                >
                  <template v-slot:prepend>
                    <q-icon name="visibility" color="primary" />
                  </template>
                </q-input>
              </div>

              <div class="form-group full-width">
                <q-input
                  v-model="blogEdit.anhDaiDien"
                  label="Ảnh đại diện (URL)"
                  outlined
                  class="custom-input"
                  :rules="[val => !!val || 'Ảnh đại diện là bắt buộc']"
                >
                  <template v-slot:prepend>
                    <q-icon name="image" color="primary" />
                  </template>
                </q-input>
              </div>
              <div class="form-group full-width">
                <q-select
                  v-model="blogEdit.bat_dong_sans"
                  label="Bất động sản"
                  outlined
                  multiple
                  class="custom-input"
                  :options="batDongSanOptions"
                  use-chips
                  clearable
                >
                  <template v-slot:prepend>
                    <q-icon name="home" color="primary" />
                  </template>
                </q-select>
              </div>
            </div>

            <div class="form-actions">
              <q-btn
                type="submit"
                label="Cập nhật bài viết"
                color="primary"
                size="lg"
                class="action-btn primary-btn"
                icon="save"
                no-caps
              />
              <q-btn
                label="Hủy bỏ"
                color="grey-6"
                size="lg"
                class="action-btn secondary-btn"
                icon="cancel"
                outline
                no-caps
                @click="void router.push('/blog/list')"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useBlogStore } from 'src/stores/Blog'
import { useBatDongSanStore } from 'src/stores/BatDongSans'
import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import type { BlogInput } from 'src/types'

const $q = useQuasar()
const blogStore = useBlogStore()
const router = useRouter()
const batDongSanStore = useBatDongSanStore()
const blogEdit = ref<BlogInput>({
  documentId: '',
  khach_hang: '',
  bat_dong_sans: [],
  tieuDe: '',
  slug: '',
  moTaNgan: '',
  noiDung: '',
  trangThai: false,
  laNoiBat: false,
  soLuotXem: 0,
  danh_muc_bai_viet: '',
  anhDaiDien: '',
})
const user = JSON.parse(localStorage.getItem('user') || '{}')

// Computed property to transform bat dong san data for q-select
const batDongSanOptions = computed(() => {
  return batDongSanStore.batDongSans.map(bds => ({
    label: bds.tieuDe,
    value: bds.documentId
  }))
})

const onSubmit = async () => {
  const data = {
    tieuDe: blogEdit.value.tieuDe,
    slug: blogEdit.value.slug,
    moTaNgan: blogEdit.value.moTaNgan,
    noiDung: blogEdit.value.noiDung,
    trangThai: blogEdit.value.trangThai,
    laNoiBat: blogEdit.value.laNoiBat,
    soLuotXem: blogEdit.value.soLuotXem,
    danh_muc_bai_viet: blogEdit.value.danh_muc_bai_viet,
    anhDaiDien: blogEdit.value.anhDaiDien,
    khach_hang: user.id,
        ...(blogEdit.value.bat_dong_sans && Array.isArray(blogEdit.value.bat_dong_sans) && blogEdit.value.bat_dong_sans.length > 0 && {
      bat_dong_sans: blogEdit.value.bat_dong_sans.map(item =>
        typeof item === 'string' ? item : (item as { value: string }).value
      )
    })
  }
  const res = await blogStore.updateBaiDang({
    documentId: blogEdit.value.documentId || '',
    data: data
  })
  if (res) {
    $q.notify({
      message: 'Cập nhật thành công',
      color: 'green',
      icon: 'check_circle',
    })
    localStorage.removeItem('blogEdit')
    void router.push('/blog/list')
  } else {
    $q.notify({
      message: 'Cập nhật thất bại',
      color: 'red',
      icon: 'error',
    })
  }
}

onMounted(async () => {
  const savedBlog = JSON.parse(localStorage.getItem('blogEdit') || '{}')

  // First load the bat dong san data
  await batDongSanStore.fetchBatDongSans(
    {
      khach_hang: {
        documentId: {
          eq: user.id,
        }
      }
    }
  )

  // Convert bat_dong_sans to proper format for q-select
  if (savedBlog.bat_dong_sans && Array.isArray(savedBlog.bat_dong_sans)) {
    savedBlog.bat_dong_sans = savedBlog.bat_dong_sans.map((itemId: string) => {
      const found = batDongSanStore.batDongSans.find(bds => bds.documentId === itemId)
      return found ? { label: found.tieuDe, value: found.documentId } : null
    }).filter(Boolean)
  } else if (savedBlog.bat_dong_sans && typeof savedBlog.bat_dong_sans === 'string') {
    const found = batDongSanStore.batDongSans.find(bds => bds.documentId === savedBlog.bat_dong_sans)
    savedBlog.bat_dong_sans = found ? [{ label: found.tieuDe, value: found.documentId }] : []
  } else {
    savedBlog.bat_dong_sans = []
  }

  blogEdit.value = savedBlog
  await blogStore.fetchDanhMucBaiViets()
})

</script>

<style scoped>
.blog-update-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem 1rem;
}

.page-container {
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  font-size: 3rem;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.form-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.form-section {
  padding: 3rem;
}

.blog-form {
  max-width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.form-group {
  position: relative;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.custom-input {
  margin-bottom: 0;
}

.custom-input :deep(.q-field__control) {
  height: 60px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.custom-input :deep(.q-field__control:hover) {
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(255, 255, 255, 0.95);
}

.custom-input :deep(.q-field--focused .q-field__control) {
  border-color: #667eea;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
}

.custom-input :deep(.q-field__label) {
  color: #667eea;
  font-weight: 600;
  font-size: 1rem;
}

.custom-input :deep(.q-field__prepend) {
  padding-right: 12px;
}

.custom-input :deep(.q-icon) {
  font-size: 1.5rem;
}

.editor-wrapper {
  position: relative;
}

.editor-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #667eea;
  font-weight: 600;
  font-size: 1rem;
}

.modern-editor {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.modern-editor:hover {
  border-color: rgba(102, 126, 234, 0.3);
}

.modern-editor :deep(.q-editor__toolbar) {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
}

.modern-editor :deep(.q-editor__content) {
  background: white;
  padding: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
}

.form-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  min-width: 180px;
  height: 60px;
  border-radius: 30px;
  font-weight: 600;
  text-transform: none;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.primary-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
}

.secondary-btn {
  background: transparent;
  border: 2px solid #6c757d;
  color: #6c757d;
}

.secondary-btn:hover {
  background: #6c757d;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(108, 117, 125, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-update-page {
    padding: 1rem 0.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .form-section {
    padding: 2rem 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
    align-items: center;
  }

  .action-btn {
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .title-icon {
    font-size: 2rem;
  }

  .form-section {
    padding: 1.5rem 1rem;
  }
}

/* Custom scrollbar for editor */
.modern-editor :deep(.q-editor__content::-webkit-scrollbar) {
  width: 8px;
}

.modern-editor :deep(.q-editor__content::-webkit-scrollbar-track) {
  background: #f1f1f1;
  border-radius: 10px;
}

.modern-editor :deep(.q-editor__content::-webkit-scrollbar-thumb) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

.modern-editor :deep(.q-editor__content::-webkit-scrollbar-thumb:hover) {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

/* Animation for form elements */
.form-group {
  animation: fadeInUp 0.6s ease-out;
}

.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
.form-group:nth-child(3) { animation-delay: 0.3s; }
.form-group:nth-child(4) { animation-delay: 0.4s; }
.form-group:nth-child(5) { animation-delay: 0.5s; }
.form-group:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus animations */
.custom-input :deep(.q-field--focused .q-field__control) {
  animation: focusGlow 0.3s ease-out;
}

@keyframes focusGlow {
  0% {
    box-shadow: 0 0 0 rgba(102, 126, 234, 0);
  }
  100% {
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
  }
}
</style>
