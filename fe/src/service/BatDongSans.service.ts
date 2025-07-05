const GET_BAT_DONG_SAN_QUERY = `
query BatDongSans($filters: BatDongSanFiltersInput) {
 batDongSans(filters: $filters) {
    documentId
    tieuDe
    moTaNgan
    moTaChiTiet
    giaBan
    donViGia
    kinhDo
    viDo
    dienTich
    diaChi
    tinh
    phuongXa
    trangThaiGiaoDich
    soLuotXem
    ngayPublic
    khach_hang {
        ho
        ten
    }
    anh {
      thuTuHienThi
    }
    laNoiBat
    danhSachAnh
    danh_muc_bat_dong_san {
      tenDanhMuc
    }
    trangThaiHoatDong
    createdAt
    updatedAt
    publishedAt
  }
}`;

const CREATE_BAT_DONG_SAN_MUTATION = `
mutation CreateBatDongSan($data: BatDongSanInput!) {
  createBatDongSan(data: $data) {
  documentId
    tieuDe
    moTaNgan
    moTaChiTiet
    giaBan
    donViGia
    kinhDo
    viDo
    dienTich
    diaChi
    tinh
    phuongXa
    trangThaiGiaoDich
    soLuotXem
    ngayPublic
    khach_hang {
        ho
        ten
    }
    anh {
      thuTuHienThi
    }
    laNoiBat
    danhSachAnh
    danh_muc_bat_dong_san {
      tenDanhMuc
    }
    trangThaiHoatDong
  }
}
`;

const GET_BAT_CATEGORY_QUERY = `
query DanhMucBatDongSans {
  danhMucBatDongSans {
    documentId
    tenDanhMuc
  }
}
`;

const GET_BLOG_QUERY = `
query BaiDangs {
  baiDangs {
    documentId
    tieuDe
  }
}
`;

const DELETE_BAT_DONG_SAN_MUTATION = `
mutation DeleteBatDongSan($documentId: ID!) {
  deleteBatDongSan(documentId: $documentId) {
    documentId
  }
}
`;

const UPDATE_BAT_DONG_SAN_MUTATION = `
mutation UpdateBatDongSan($documentId: ID!, $data: BatDongSanInput!) {
  updateBatDongSan(documentId: $documentId, data: $data) {
    documentId
  }
}
`;

export { GET_BAT_DONG_SAN_QUERY, CREATE_BAT_DONG_SAN_MUTATION, GET_BAT_CATEGORY_QUERY, GET_BLOG_QUERY, DELETE_BAT_DONG_SAN_MUTATION, UPDATE_BAT_DONG_SAN_MUTATION }
