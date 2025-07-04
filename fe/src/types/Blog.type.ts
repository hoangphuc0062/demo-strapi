interface Blog {
  documentId: string
  tieuDe: string
  slug: string
  moTaNgan: string
  noiDung: string
  trangThai: string
  laNoiBat: boolean
  soLuotXem: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  khach_hang: {
    ho: string
    ten: string
}
  danh_muc_bai_viet: {
    tenDanhMuc: string
  }
  bat_dong_sans: {
    documentId: string
    tieuDe: string
  }
}


interface BlogListResponse {
  baiDangs: Blog[]
}

export type { Blog, BlogListResponse }
