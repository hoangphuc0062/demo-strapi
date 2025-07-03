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
  khach_hang: {
  ho: string
  ten: string
}
loaiBatDongSan: string
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
createdAt: string
updatedAt: string
publishedAt: string
}


interface BatDongSanListResponse {
  batDongSans: BatDongSan[]
}

export type { BatDongSan, BatDongSanListResponse }