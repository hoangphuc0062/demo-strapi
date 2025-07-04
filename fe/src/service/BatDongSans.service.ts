const GET_BAT_DONG_SAN_QUERY = `
query BatDongSans {
  batDongSans {
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
    loaiBatDongSan
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
    loaiBatDongSan
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

export { GET_BAT_DONG_SAN_QUERY, CREATE_BAT_DONG_SAN_MUTATION, GET_BAT_CATEGORY_QUERY }
