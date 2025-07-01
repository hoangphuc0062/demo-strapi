interface User {
  id: string
  username: string
  email: string
  avatar?: string
  role?: {
    name: string
  }
}

interface LoginCredentials {
  identifier: string // email or username
  password: string
}

interface RegisterData {
  username: string
  email: string
  password: string
}

interface AuthResponse {
  jwt: string
  user: User
}

export type { User, LoginCredentials, RegisterData, AuthResponse }