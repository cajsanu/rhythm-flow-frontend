import { CreateUser, UpdateUser, User } from "../types/user"
import axios from "axios"
import { getAuthConfig } from "./utils"
const baseURL = "/api/v1/users"

const getUsers = async (): Promise<User[]> => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<User[]>(baseURL, config)
    return res.data
  } catch (err) {
    throw new Error("Failed to fetch users", { cause: err })
  }
}

const createUser = async (newUser: CreateUser): Promise<User> => {
  try {
    const res = await axios.post(baseURL, newUser)
    return res.data
  } catch (err) {
    throw new Error("Failed to create user", { cause: err })
  }
}

const getUserById = async (id: string): Promise<User> => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<User>(`${baseURL}/${id}`, config)
    return res.data
  } catch (err) {
    throw new Error("Failed to fetch user", { cause: err })
  }
}

const getUserByEmail = async (email: string): Promise<User> => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<User>(`${baseURL}/email/${email}`, config)
    return res.data
  } catch (err) {
    throw new Error("Failed to fetch user", { cause: err })
  }
}

const deleteUser = async (id: string): Promise<void> => {
  const config = getAuthConfig()

  try {
    const res = await axios.delete(`${baseURL}/${id}`, config)
    return res.data
  } catch (err) {
    throw new Error("Failed to delete user", { cause: err })
  }
}

const updateUser = async (id: string, updatedUser: UpdateUser): Promise<User> => {
  const config = getAuthConfig()

  try {
    const res = await axios.put(`${baseURL}/${id}`, updatedUser, config)
    return res.data
  } catch (err) {
    throw new Error("Failed to update user", { cause: err })
  }
}

export default { getUsers, createUser, getUserById, getUserByEmail, deleteUser, updateUser }
