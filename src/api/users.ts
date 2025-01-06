import { User } from "../types/user"
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

const getUserById = async (id: string) => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<User>(`${baseURL}/${id}`, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default { getUsers, getUserById }
