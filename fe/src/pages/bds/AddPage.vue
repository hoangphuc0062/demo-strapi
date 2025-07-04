<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h5 q-mb-md">Thêm bất động sản mới</div>
          </q-card-section>

          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-card-section>
              <!-- Thông tin cơ bản -->
              <div class="text-h6 q-mb-md">Thông tin cơ bản</div>

              <q-input
                v-model="form.tieuDe"
                label="Tiêu đề *"
                required
                :rules="[val => val && val.length > 0 || 'Vui lòng nhập tiêu đề']"
              />

              <q-input
                v-model="form.moTaNgan"
                label="Mô tả ngắn *"
                type="textarea"
                rows="2"
                required
                :rules="[val => val && val.length > 0 || 'Vui lòng nhập mô tả ngắn']"
              />

              <q-input
                v-model="form.moTaChiTiet"
                label="Mô tả chi tiết"
                type="textarea"
                rows="4"
              />

              <!-- Thông tin giá và diện tích -->
              <div class="text-h6 q-mb-md q-mt-lg">Thông tin giá và diện tích</div>

              <div class="row q-gutter-md">
                <div class="col">
                  <q-input
                    v-model.number="form.giaBan"
                    label="Giá bán *"
                    type="number"
                    suffix="VNĐ"
                    required
                    :rules="[val => val > 0 || 'Giá bán phải lớn hơn 0']"
                  />
                </div>
                <div class="col">
                  <q-select
                    v-model="form.donViGia"
                    label="Đơn vị giá *"
                    :options="donViGiaOptions"
                    required
                    :rules="[val => val && val.length > 0 || 'Vui lòng chọn đơn vị giá']"
                  />
                </div>
              </div>

              <q-input
                v-model.number="form.dienTich"
                label="Diện tích (m²) *"
                type="number"
                suffix="m²"
                required
                :rules="[val => val > 0 || 'Diện tích phải lớn hơn 0']"
              />

              <!-- Thông tin vị trí -->
              <div class="text-h6 q-mb-md q-mt-lg">Thông tin vị trí</div>

              <q-input
                v-model="form.diaChi"
                label="Địa chỉ *"
                required
                :rules="[val => val && val.length > 0 || 'Vui lòng nhập địa chỉ']"
              />

              <div class="row q-gutter-md">
                <div class="col">
                  <q-input
                    v-model="form.tinh"
                    label="Tỉnh/Thành phố *"
                    required
                    :rules="[val => val && val.length > 0 || 'Vui lòng nhập tỉnh/thành phố']"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="form.phuongXa"
                    label="Phường/Xã *"
                    required
                    :rules="[val => val && val.length > 0 || 'Vui lòng nhập phường/xã']"
                  />
                </div>
              </div>

              <div class="row q-gutter-md">
                <div class="col">
                  <q-input
                    v-model.number="form.kinhDo"
                    label="Kinh độ"
                    type="number"
                    step="0.000001"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model.number="form.viDo"
                    label="Vĩ độ"
                    type="number"
                    step="0.000001"
                  />
                </div>
              </div>

              <!-- Thông tin phân loại -->
              <div class="text-h6 q-mb-md q-mt-lg">Thông tin phân loại</div>

              <q-select
                v-model="form.danh_muc_bat_dong_san"
                label="Loại bất động sản *"
                :options="loaiBdsOptions"
                emit-value
                map-options
                option-label="label"
                option-value="value"
                required
                :rules="[val => val && val.length > 0 || 'Vui lòng chọn loại bất động sản']"
              />

              <q-select
                v-model="form.trangThaiGiaoDich"
                label="Trạng thái giao dịch *"
                :options="trangThaiOptions"
                required
                :rules="[val => val && val.length > 0 || 'Vui lòng chọn trạng thái giao dịch']"
              />

              <!-- Thông tin khác -->
              <div class="text-h6 q-mb-md q-mt-lg">Thông tin khác</div>

              <q-input
                v-model="form.ngayPublic"
                label="Ngày public"
                type="date"
              />

              <div class="row q-gutter-md">
                <div class="col">
                  <q-toggle
                    v-model="form.laNoiBat"
                    label="Là nổi bật"
                  />
                </div>
                <div class="col">
                  <q-toggle
                    v-model="form.trangThaiHoatDong"
                    label="Trạng thái hoạt động"
                  />
                </div>
              </div>
            </q-card-section>

            <q-card-actions align="right" class="q-pa-md">
              <q-btn flat label="Đặt lại" type="reset" color="primary" />
              <q-btn
                label="Thêm bất động sản"
                type="submit"
                color="primary"
                :loading="loading"
                :disable="loading"
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useBatDongSanStore } from 'src/stores/BatDongSans'
import type {  BatCategory, BatDongSanInput } from 'src/types'

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
  ngayPublic: "",
  danh_muc_bat_dong_san: '',
  laNoiBat: false,
  trangThaiHoatDong: true
})

// Options for select fields
const donViGiaOptions = [
  'VNĐ',
  'VNĐ/m²',
  'Triệu VNĐ',
  'Tỷ VNĐ'
]

const loaiBdsOptions = ref<{ label: string, value: string }[]>([])


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
    const formData: BatDongSanInput = {
      ...form,
      khach_hang: userData.id as string,
      anh: '',
      danhSachAnh: [],
    }

    // const success = await batDongSanStore.createBatDongSan(formData as BatDongSan)
    console.log(formData)
    // if (success) {
      $q.notify({
        type: 'positive',
        message: 'Thêm bất động sản thành công!',
        position: 'top'
      })

      // Navigate back to list page
      await router.push('/bds/list')
    // } else {
      $q.notify({
        type: 'negative',
        message: 'Có lỗi xảy ra khi thêm bất động sản!',
        position: 'top'
      })
    // }
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
    trangThaiGiaoDich: '',
    soLuotXem: 0,
    ngayPublic: '',
    loaiBatDongSan: '',
    laNoiBat: false,
    trangThaiHoatDong: true
  })
}

onMounted(async () => {
  await batDongSanStore.fetchBatCategories()
  loaiBdsOptions.value = batDongSanStore.batCategories.map((category: BatCategory) => ({
    label: category.tenDanhMuc,
    value: category.documentId
  }))
})
</script>

<style scoped>
.q-card {
  max-width: 800px;
}
</style>
