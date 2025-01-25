import { LoginCredentials } from "@/types/user"
import axios from "."
const baseURL = "/api/v1/authentication/login"

export const login = async ({ email, password }: LoginCredentials): Promise<string> => {
  const res = await axios.post(baseURL, { email, password })
  return res.data
}
