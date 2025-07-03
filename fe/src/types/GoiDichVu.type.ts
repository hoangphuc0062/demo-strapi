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

export type { GoiDichVu, GoiDichVuResponse }