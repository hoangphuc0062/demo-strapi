interface BatDongSan {
  documentId: string
  tieuDe: string
  moTaNgan: string
  moTaChiTiet: string
  giaBan: number
  donViGia: string
  kinhDo: number
  viDo: number
  dienTich: number
  diaChi: string
  tinh: string
  phuongXa: string
  trangThaiGiaoDich: string
  soLuotXem: number
  ngayPublic: string
  khach_hang?: {
  ho: string
  ten: string
}
anh: {
  thuTuHienThi: number
}
laNoiBat: boolean
danhSachAnh: {
  thuTuHienThi: number
}
danh_muc_bat_dong_san: {
  tenDanhMuc: string
}
trangThaiHoatDong: boolean
createdAt: string
updatedAt: string
publishedAt: string
}


interface BatDongSanListResponse {
  batDongSans: BatDongSan[]
}

interface BatCategory {
  documentId: string
  tenDanhMuc: string
}

interface BatCategoryListResponse {
  batCategories: BatCategory[]
}

interface BatDongSanInput {
  tieuDe: string
  moTaNgan: string
  moTaChiTiet: string
  giaBan: number
  donViGia: string
  kinhDo: number
  viDo: number
  dienTich: number
  diaChi: string
  tinh: string
  phuongXa: string
  trangThaiGiaoDich: string
  soLuotXem: number
  ngayPublic: string
  khach_hang: string
  anh: string
  laNoiBat: boolean
  danhSachAnh: string[]
  danh_muc_bat_dong_san: string
  trangThaiHoatDong: boolean
  bai_viet: string[]
}

interface BlogBDS {
  documentId: string
  tieuDe: string
}

interface BlogListResponse {
  baiDangs: BlogBDS[]
}

export type { BatDongSan, BatDongSanListResponse, BatCategory, BatCategoryListResponse, BatDongSanInput, BlogBDS, BlogListResponse }
