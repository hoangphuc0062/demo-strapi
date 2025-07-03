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
    createdAt
    updatedAt
    publishedAt
  }
}`

export { GET_BAT_DONG_SAN_QUERY }