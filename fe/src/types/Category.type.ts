import type { Pagination } from "."

interface Category {
  documentId: string
  tenDanhMuc: string
  slug: string
  trangThai: boolean
  moTa: string
}



interface CategoryResponse {
  pagination: Pagination
  danhMucBatDongSans: Category[]
}

export type { Category, CategoryResponse }