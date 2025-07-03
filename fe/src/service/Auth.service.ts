const LOGIN_MUTATION = `
mutation LoginKhachHang($input: LoginKhachHangInput!) {
  loginKhachHang(input: $input) {
     jwt
    user {
      ho
      ten
      email
      soDienThoai
      laXacThuc
      laCam
    }
  }
}
`

const REGISTER_MUTATION = `
mutation RegisterKhachHang($input: RegisterKhachHangInput!) {
  registerKhachHang(input: $input) {
    jwt
    user {
      ho
      ten
      email
      soDienThoai
      laXacThuc
      laCam
    }
  }
}
`

const ME_QUERY = `
query MeKhachHang {
  meKhachHang {
    id
    email
    ho
    ten
    soDienThoai
    laXacThuc
    laCam
  }
}
`



export { LOGIN_MUTATION, REGISTER_MUTATION, ME_QUERY }