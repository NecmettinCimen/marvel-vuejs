import {
  type UserLoginResponse,
  type Result,
  type RegisterRequest,
  type RegisterResponse,
} from '@/types/User'
import axios from './axiosInstance'
import { defineStore } from 'pinia'

interface AuthState {
  token: string | null
  isLoggedIn: boolean
  user: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem('token'),
    user: localStorage.getItem('user'),
  }),
  getters: {},
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post<UserLoginResponse>(
          '/marvel-java-app/api/users/public/login',
          {
            username,
            password,
          },
        )
        if (!response.data.success) return false

        this.setToken(response.data.result)

        return true
      } catch {
        return false
      }
    },
    async register(body: RegisterRequest) {
      try {
        const response = await axios.post<RegisterResponse>(
          '/marvel-java-app/api/users/public/register',
          body,
        )
        if (!response.data.success) return false

        // this.setToken(response.data.result)

        return true
      } catch {
        return false
      }
    },
    setToken(result: Result) {
      this.token = result.token
      this.isLoggedIn = true
      this.user = JSON.stringify(result.user)
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', this.user)
    },
    clearToken() {
      this.token = null
      this.user = null
      this.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
