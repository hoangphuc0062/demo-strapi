interface Blog {
  documentId: string
  tieuDe: string
  slug: string
  moTaNgan: string
  noiDung: string
  trangThai: boolean
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


interface BlogsListResponses {
  baiDangs: Blog[]
}


interface BlogInput {
  khach_hang: string,
  bat_dong_sans: string,
  tieuDe: string,
  slug: string,
  moTaNgan: string,
  noiDung: string,
  trangThai: boolean,
  laNoiBat: boolean,
  soLuotXem: number,
  danh_muc_bai_viet: string,
  anhDaiDien: string,
}

interface DanhMucBaiViet {
  documentId: string
  tenDanhMuc: string
}
interface DanhMucBaiVietResponses {
  danhMucBaiViets: DanhMucBaiViet[]
}

export type { Blog, BlogsListResponses, BlogInput, DanhMucBaiViet, DanhMucBaiVietResponses }
