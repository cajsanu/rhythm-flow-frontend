import { CreateUser, UpdateUser, User } from "../types/user"
import axios from "axios"
import { getAuthConfig } from "./utils"
const baseURL = "/api/v1/users"

const getUsers = async () => {
  try {
    const res = await axios.get<User[]>(baseURL)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const createUser = async (newUser: CreateUser) => {
  try {
    const res = await axios.post(baseURL, newUser)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const getUserById = async (id: string) => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<User>(`${baseURL}/${id}`, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const getUserByEmail = async (email: string) => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<User>(`${baseURL}/email/${email}`, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const deleteUser = async (id: string) => {
  const config = getAuthConfig()

  try {
    const res = await axios.delete(`${baseURL}/${id}`, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const updateUser = async (id: string, updatedUser: UpdateUser) => {
  const config = getAuthConfig()

  try {
    const res = await axios.put(`${baseURL}/${id}`, updatedUser, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default { getUsers, createUser, getUserById, getUserByEmail, deleteUser, updateUser }
