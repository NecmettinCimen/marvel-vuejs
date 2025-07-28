export interface UserLoginResponse {
  success: boolean
  message: string
  result: Result
}

export interface Result {
  token: string
  user: User
}

export interface User {
  id: number
  createdAt: string
  username: string
  password: string
  email: string
  profilePhoto: string
}

export interface RegisterRequest {
  username: string
  password: string
  email: string
  profilePhoto: string
}

export interface RegisterResponse {
  success: boolean
  message: string
  result: Register
}

export interface Register {
  id: number
  username: string
  password: string
  email: string
  profilePhoto: string
}
