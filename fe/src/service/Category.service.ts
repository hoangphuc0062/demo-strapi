const GET_CATEGORIES_QUERY = `
  query DanhMucBatDongSans($pagination: PaginationArg) {
  danhMucBatDongSans( pagination: $pagination) {
    documentId
    tenDanhMuc
    slug
    trangThai
    moTa
  }
}`

export { GET_CATEGORIES_QUERY }