import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Notify } from 'quasar'
import { LOGIN_MUTATION, REGISTER_MUTATION, ME_QUERY } from 'src/service'
import type { User, LoginCredentials, RegisterData, AuthResponse } from 'src/types'
import { apolloClient } from 'src/boot/apollo'
import gql from 'graphql-tag'


export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userDisplayName = computed(() => {
    if (!user.value) return ''
    return user.value.username
  })


  // Actions
  const setAuthData = (authData: AuthResponse) => {
    token.value = authData.jwt
    user.value = authData.user
    localStorage.setItem('token', authData.jwt)
    localStorage.setItem('user', JSON.stringify(authData.user))
  }

  const clearAuthData = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    loading.value = true
    try {
      const result = await apolloClient.mutate({
        mutation: gql(LOGIN_MUTATION),
        variables: {
          input: credentials
        }
      })

      if (!result?.data?.login) {
        throw new Error('Login failed')
      }

      setAuthData(result.data.login)

      Notify.create({
        type: 'positive',
        message: 'Đăng nhập thành công!',
        position: 'top'
      })

      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại'

      Notify.create({
        type: 'negative',
        message: errorMessage,
        position: 'top'
      })

      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    loading.value = true
    try {
      const result = await apolloClient.mutate({
        mutation: gql(REGISTER_MUTATION),
        variables: {
          input: userData
        }
      })

      if (!result?.data?.register) {
        throw new Error('Registration failed')
      }

      setAuthData(result.data.register)

      Notify.create({
        type: 'positive',
        message: 'Đăng ký thành công!',
        position: 'top'
      })

      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng ký thất bại'

      Notify.create({
        type: 'negative',
        message: errorMessage,
        position: 'top'
      })

      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    clearAuthData()

    Notify.create({
      type: 'info',
      message: 'Đã đăng xuất thành công',
      position: 'top'
    })
  }

  const fetchUserProfile = async (): Promise<boolean> => {
    if (!token.value) return false

    loading.value = true
    try {
      const result = await apolloClient.query({
        query: gql(ME_QUERY)
      })

      if (!result?.data?.me) {
        clearAuthData()
        return false
      }

      user.value = result.data.me
      localStorage.setItem('user', JSON.stringify(result.data.me))

      return true
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      if (error instanceof Error && error.message.includes('401')) {
        clearAuthData()
      }
      return false
    } finally {
      loading.value = false
    }
  }


  const initializeAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser && token.value) {
      try {
        user.value = JSON.parse(savedUser)
        // Optionally validate token by fetching user profile
        void fetchUserProfile()
      } catch (error) {
        console.error('Failed to parse saved user data:', error)
        clearAuthData()
      }
    }
  }

  // Initialize auth on store creation
  initializeAuth()

  return {
    // State
    user,
    token,
    loading,

    // Getters
    isAuthenticated,
    userDisplayName,

    // Actions
    login,
    register,
    logout,
    fetchUserProfile,
    setAuthData,
    clearAuthData,
    initializeAuth,
  }
})
