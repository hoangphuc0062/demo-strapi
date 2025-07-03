interface GoiDichVu {
  documentId: string
  tenGoi: string
  soLuongPublic: number
  soLuongDaft: number
  gia: number | null
  thoiHanNgay: number | null
  trangThai: boolean | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface GoiDichVuResponse {
  goiDichVu: GoiDichVu[]
}

interface GoiDichVuByNguoiDung {
  tenGoi: string
  soLuongPublic: number
  soLuongDaft: number
  thoiHanNgay: string
}
interface GoiDichVuByNguoiDungResponse {
  khachHang: {
    goi_dich_vu: {
      tenGoi: string
      soLuongPublic: number
      soLuongDaft: number
      thoiHanNgay: string
    }
  }
}

interface UpdateGoiDichVuInput {
  documentId: string
  data: {
    goi_dich_vu: string
  }
}
export type { GoiDichVu, GoiDichVuResponse, GoiDichVuByNguoiDung, GoiDichVuByNguoiDungResponse, UpdateGoiDichVuInput }