import axios from "axios"
import { getAuthConfig } from "./utils"
import { CreateWorkspace, UpdateWorkspace, Workspace } from "../types/workspace"
import { Role } from "../types/role"
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

const getWorkspaceById = async (workspaceId: string) => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<Workspace>(`${baseURL}/${workspaceId}`, config)
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

const deleteWorkspace = async (workspaceId: string) => {}

const updateWorkspace = async (workspaceId: string, updatedWorkspace: UpdateWorkspace) => {}

const addUserToWorkspace = async (workspaceId: string, userId: string, role: Role) => {
  const config = getAuthConfig()

  try {
    const res = await axios.post(`${baseURL}/${workspaceId}/users/${userId}`, { role }, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default { getMyWorkspaces, getWorkspaceById, createWorkspace, addUserToWorkspace }
