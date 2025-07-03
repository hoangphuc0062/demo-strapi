const GET_GOI_DICH_VUS_QUERY = `
  query GoiDichVus($pagination: PaginationArg) {
    goiDichVus(pagination: $pagination) {
      documentId
      tenGoi
      soLuongPublic
      soLuongDaft
      gia
      thoiHanNgay
      trangThai
      createdAt
      updatedAt
      publishedAt
    }
  }
`

export { GET_GOI_DICH_VUS_QUERY }
