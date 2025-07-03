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

const GET_GOI_DICH_VUS_BY_NGUOI_DUNG_QUERY = `
 query Goi_dich_vu($documentId: ID!) {
  khachHang(documentId: $documentId) {
    goi_dich_vu {
      tenGoi
      soLuongPublic
      soLuongDaft
      thoiHanNgay

    }
  }
}
`

const UPDATE_GOI_DICH_VU_MUTATION = `
mutation UpdateKhachHang($documentId: ID!, $data: KhachHangInput!) {
  updateKhachHang(documentId: $documentId, data: $data) {
    goi_dich_vu {
      tenGoi
      thoiHanNgay
      soLuongDaft
      soLuongPublic
      trangThai
    }

  }
}
`
export { GET_GOI_DICH_VUS_QUERY, GET_GOI_DICH_VUS_BY_NGUOI_DUNG_QUERY, UPDATE_GOI_DICH_VU_MUTATION }
