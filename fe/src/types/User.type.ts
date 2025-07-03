interface User {
  id: string
  ho: string
  ten: string
  email: string
  avatar?: string
  soDienThoai: string
}

interface LoginCredentials {
  email: string // email or username
  matKhau: string
}

interface RegisterData {
  email: string
  ho: string
  matKhau: string
  soDienThoai: string
  ten : string
}

interface AuthResponse {
  jwt: string
  user: User
}

export type { User, LoginCredentials, RegisterData, AuthResponse }