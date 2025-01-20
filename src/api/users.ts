import { CreateUser, UpdateUser, User } from "../types/user"
import axios from "axios"
import { getAuthConfig } from "./utils"
const baseURL = "/api/v1/users"

const getUsers = async (): Promise<User[]> => {
  const config = getAuthConfig()

  const res = await axios.get<User[]>(baseURL, config)
  return res.data
}

const createUser = async (newUser: CreateUser): Promise<User> => {
  const res = await axios.post(baseURL, newUser)
  return res.data
}

const getUserById = async (id: string): Promise<User> => {
  const config = getAuthConfig()

  const res = await axios.get<User>(`${baseURL}/${id}`, config)
  return res.data
}

const deleteUser = async (id: string): Promise<void> => {
  const config = getAuthConfig()

  const res = await axios.delete(`${baseURL}/${id}`, config)
  return res.data
}

const updateUser = async (id: string, updatedUser: UpdateUser): Promise<User> => {
  const config = getAuthConfig()

  const res = await axios.put(`${baseURL}/${id}`, updatedUser, config)
  return res.data
}

export default { getUsers, createUser, getUserById, deleteUser, updateUser }
