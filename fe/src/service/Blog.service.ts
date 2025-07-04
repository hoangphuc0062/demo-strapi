const GET_BAI_DANG_QUERY = `
query BaiDangs {
  baiDangs {
    documentId
    khach_hang {
      ho
      ten
    }

    bat_dong_sans {
      tieuDe
      documentId
    }
    tieuDe
    slug
    moTaNgan
    noiDung
    trangThai
    laNoiBat
    soLuotXem
    danh_muc_bai_viet {
      tenDanhMuc
    }
    anhDaiDien
    createdAt
    updatedAt
    publishedAt
  }
}`

const CREATE_BAI_DANG_MUTATION = `
mutation CreateBaiDang($data: BaiDangInput!) {
  createBaiDang(data: $data) {
    documentId
    tieuDe
    slug
    moTaNgan
    noiDung
    trangThai
    laNoiBat
    soLuotXem
    danh_muc_bai_viet {
      tenDanhMuc
    }
    anhDaiDien
    createdAt
    updatedAt
    publishedAt
  }
}
`

const GET_DANH_MUC_BAI_VIET_QUERY = `

query DanhMucBaiViets {
  danhMucBaiViets {
    documentId
    tenDanhMuc
  }
}
`


const DELETE_BAI_DANG_MUTATION = `
mutation DeleteBaiDang($documentId: ID!) {
  deleteBaiDang(documentId: $documentId) {
    documentId
  }
}
`

const UPDATE_BAI_DANG_MUTATION = `
mutation UpdateBaiDang($documentId: ID!, $data: BaiDangInput!) {
  updateBaiDang(documentId: $documentId, data: $data) {
    documentId
  }
}
`

export { GET_BAI_DANG_QUERY, CREATE_BAI_DANG_MUTATION, GET_DANH_MUC_BAI_VIET_QUERY, DELETE_BAI_DANG_MUTATION, UPDATE_BAI_DANG_MUTATION }
