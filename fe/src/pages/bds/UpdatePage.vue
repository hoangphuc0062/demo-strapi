<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h5 text-primary text-center q-mb-md">
              <q-icon name="edit" class="q-mr-sm" />
              Cập nhật Bất động sản
            </div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <!-- Thông tin cơ bản -->
              <div class="text-h6 text-secondary q-mb-md">
                <q-icon name="info" class="q-mr-sm" />
                Thông tin cơ bản
              </div>

              <q-input
                v-model="bdsEdit.tieuDe"
                label="Tiêu đề"
                outlined
                dense
                :rules="[val => !!val || 'Tiêu đề là bắt buộc']"
              >
                <template v-slot:prepend>
                  <q-icon name="title" />
                </template>
              </q-input>

              <q-input
                v-model="bdsEdit.moTaNgan"
                label="Mô tả ngắn"
                outlined
                dense
                type="textarea"
                rows="2"
              >
                <template v-slot:prepend>
                  <q-icon name="short_text" />
                </template>
              </q-input>

              <q-input
                v-model="bdsEdit.moTaChiTiet"
                label="Mô tả chi tiết"
                outlined
                dense
                type="textarea"
                rows="4"
              >
                <template v-slot:prepend>
                  <q-icon name="description" />
                </template>
              </q-input>

              <q-separator class="q-my-md" />

              <!-- Thông tin giá và diện tích -->
              <div class="text-h6 text-secondary q-mb-md">
                <q-icon name="attach_money" class="q-mr-sm" />
                Thông tin giá và diện tích
              </div>

              <div class="row q-gutter-md">
                <div class="col">
                  <q-input
                    v-model.number="bdsEdit.giaBan"
                    label="Giá bán"
                    outlined
                    dense
                    type="number"
                    :rules="[val => val >= 0 || 'Giá phải lớn hơn 0']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="paid" />
                    </template>
                  </q-input>
                </div>
                <div class="col">
                  <q-input
                    v-model="bdsEdit.donViGia"
                    label="Đơn vị giá"
                    outlined
                    dense
                    placeholder="VND, USD, ..."
                  >
                    <template v-slot:prepend>
                      <q-icon name="monetization_on" />
                    </template>
                  </q-input>
                </div>
              </div>

              <q-input
                v-model.number="bdsEdit.dienTich"
                label="Diện tích (m²)"
                outlined
                dense
                type="number"
                :rules="[val => val > 0 || 'Diện tích phải lớn hơn 0']"
              >
                <template v-slot:prepend>
                  <q-icon name="square_foot" />
                </template>
              </q-input>

              <q-separator class="q-my-md" />

              <!-- Thông tin vị trí -->
              <div class="text-h6 text-secondary q-mb-md">
                <q-icon name="location_on" class="q-mr-sm" />
                Thông tin vị trí
              </div>

              <q-input
                v-model="bdsEdit.diaChi"
                label="Địa chỉ"
                outlined
                dense
                :rules="[val => !!val || 'Địa chỉ là bắt buộc']"
              >
                <template v-slot:prepend>
                  <q-icon name="home" />
                </template>
              </q-input>

              <div class="row q-gutter-md">
                <div class="col">
                  <q-input
                    v-model="bdsEdit.tinh"
                    label="Tỉnh/Thành phố"
                    outlined
                    dense
                  >
                    <template v-slot:prepend>
                      <q-icon name="location_city" />
                    </template>
                  </q-input>
                </div>
                <div class="col">
                  <q-input
                    v-model="bdsEdit.phuongXa"
                    label="Phường/Xã"
                    outlined
                    dense
                  >
                    <template v-slot:prepend>
                      <q-icon name="place" />
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row q-gutter-md">
                <div class="col">
                  <q-input
                    v-model.number="bdsEdit.kinhDo"
                    label="Kinh độ"
                    outlined
                    dense
                    type="number"
                    step="0.000001"
                  >
                    <template v-slot:prepend>
                      <q-icon name="my_location" />
                    </template>
                  </q-input>
                </div>
                <div class="col">
                  <q-input
                    v-model.number="bdsEdit.viDo"
                    label="Vĩ độ"
                    outlined
                    dense
                    type="number"
                    step="0.000001"
                  >
                    <template v-slot:prepend>
                      <q-icon name="my_location" />
                    </template>
                  </q-input>
                </div>
              </div>

              <q-separator class="q-my-md" />

              <!-- Thông tin trạng thái -->
              <div class="text-h6 text-secondary q-mb-md">
                <q-icon name="settings" class="q-mr-sm" />
                Thông tin trạng thái
              </div>

              <q-select
                v-model="bdsEdit.trangThaiGiaoDich"
                :options="trangThaiGiaoDichOptions"
                label="Trạng thái giao dịch"
                outlined
                dense
                emit-value
                map-options
              >
                <template v-slot:prepend>
                  <q-icon name="swap_horiz" />
                </template>
              </q-select>

                <q-select
                 v-model="bdsEdit.danh_muc_bat_dong_san"
                 label="Danh mục bất động sản"
                 outlined
                 dense
                 :options="batDongSanStore.batCategories"
                 emit-value
                 map-options
                 option-value="documentId"
                 option-label="tenDanhMuc"
               >
                 <template v-slot:prepend>
                   <q-icon name="category" />
                 </template>
               </q-select>

              <q-select
                v-model="bdsEdit.bai_viet"
                label="Bài viết"
                outlined
                dense
                :options="blogStore.blogs"
                emit-value
                map-options
                option-value="documentId"
                option-label="tieuDe"
              >
                <template v-slot:prepend>
                  <q-icon name="article" />
                </template>
              </q-select>

              <q-input
                v-model.number="bdsEdit.soLuotXem"
                label="Số lượt xem"
                outlined
                dense
                type="number"
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="visibility" />
                </template>
              </q-input>

              <div class="row q-gutter-md">
                <div class="col">
                  <q-checkbox
                    v-model="bdsEdit.laNoiBat"
                    label="Là nổi bật"
                    color="primary"
                  />
                </div>
                <div class="col">
                  <q-checkbox
                    v-model="bdsEdit.trangThaiHoatDong"
                    label="Trạng thái hoạt động"
                    color="primary"
                  />
                </div>
              </div>

              <q-separator class="q-my-md" />

              <!-- Nút hành động -->
              <div class="row q-gutter-md justify-center">
                <q-btn
                  type="submit"
                  label="Cập nhật"
                  color="primary"
                  icon="save"
                  size="md"
                  :loading="batDongSanStore.loading"
                />
                <q-btn
                  label="Hủy"
                  color="grey-6"
                  icon="cancel"
                  size="md"
                  @click="router.push('/bds/list')"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useBatDongSanStore } from 'src/stores/BatDongSans'
import type { BatDongSanInput } from 'src/types'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useBlogStore } from 'src/stores/Blog'

const $q = useQuasar()
const batDongSanStore = useBatDongSanStore()
const blogStore = useBlogStore()
const router = useRouter()

const bdsEdit = ref<BatDongSanInput>({
  documentId: '',
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
  laNoiBat: false,
  danh_muc_bat_dong_san: "",
  trangThaiHoatDong: false,
  ngayPublic: '',
  khach_hang: '',
  danhSachAnh: [],
  bai_viet: '',
})

const onSubmit = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const data = {
    tieuDe: bdsEdit.value.tieuDe,
    moTaNgan: bdsEdit.value.moTaNgan,
    moTaChiTiet: bdsEdit.value.moTaChiTiet,
    giaBan: bdsEdit.value.giaBan,
    donViGia: bdsEdit.value.donViGia,
    dienTich: bdsEdit.value.dienTich,
    diaChi: bdsEdit.value.diaChi,
    tinh: bdsEdit.value.tinh,
    phuongXa: bdsEdit.value.phuongXa,
    trangThaiGiaoDich: bdsEdit.value.trangThaiGiaoDich,
    soLuotXem: bdsEdit.value.soLuotXem,
    laNoiBat: bdsEdit.value.laNoiBat,
    trangThaiHoatDong: bdsEdit.value.trangThaiHoatDong,
    ngayPublic: bdsEdit.value.ngayPublic,
    khach_hang: user.id,
    danhSachAnh: bdsEdit.value.danhSachAnh,
         danh_muc_bat_dong_san: bdsEdit.value.danh_muc_bat_dong_san,
    bai_viet: bdsEdit.value.bai_viet,
    kinhDo: bdsEdit.value.kinhDo,
    viDo: bdsEdit.value.viDo,
  }
  const res = await batDongSanStore.updateBatDongSan({
    documentId: bdsEdit.value.documentId || '',
    data: data
  })
  if (res) {
    $q.notify({
      message: 'Cập nhật thành công',
      color: 'green',
      icon: 'check_circle',
    })
    localStorage.removeItem('bdsEdit')
    void router.push('/bds/list')
  } else {
    $q.notify({
      message: 'Cập nhật thất bại',
      color: 'red',
      icon: 'error',
    })
  }
}

const trangThaiGiaoDichOptions = [
  { label: 'Đang bán', value: 'Đang bán' },
  { label: 'Đã bán', value: 'Đã bán' },
  { label: 'Đã hủy', value: 'Đã hủy' },
]

onMounted(async () => {
  bdsEdit.value = JSON.parse(localStorage.getItem('bdsEdit') || '{}')
  await batDongSanStore.fetchBatCategories()
  await blogStore.fetchBaiDangs()
})
</script>

<style scoped>
.q-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.text-h5 {
  font-weight: 600;
}

.text-h6 {
  font-weight: 500;
  color: #1976d2;
}

.q-separator {
  background-color: #e0e0e0;
}
</style>
