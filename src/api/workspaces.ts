import axios from "axios"
import { getAuthConfig } from "./utils"
import { CreateWorkspace, Workspace } from "../types/workspace"
const baseURL = "/api/v1/workspaces"

const getMyWorkspaces = async (userId: string) => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<Workspace[]>(`${baseURL}/joinedby/${userId}`, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const createWorkspace = async (newWorkspace: CreateWorkspace) => {
  const config = getAuthConfig()

  try {
    const res = await axios.post(baseURL, newWorkspace, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default { getMyWorkspaces, createWorkspace }
