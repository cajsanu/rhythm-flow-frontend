export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface CreateUser extends LoginCredentials {
  firstName: string
  lastName: string
}