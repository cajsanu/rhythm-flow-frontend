import axios from "axios"
import { getAuthConfig } from "./utils"
import { CreateWorkspace, UpdateWorkspace, UserWorkspace, Workspace } from "../types/workspace"
import { Role } from "../types/role"
const baseURL = "/api/v1/workspaces"

const getMyWorkspaces = async (userId: string): Promise<Workspace[]> => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<Workspace[]>(`${baseURL}/joinedby/${userId}`, config)
    return res.data
  } catch (err) {
    throw new Error("Failed to fetch workspaces", { cause: err })
  }
}

const getWorkspaceById = async (workspaceId: string): Promise<Workspace> => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<Workspace>(`${baseURL}/${workspaceId}`, config)
    return res.data
  } catch (err) {
    throw new Error("Failed to fetch workspace", { cause: err })
  }
}

const createWorkspace = async (newWorkspace: CreateWorkspace): Promise<Workspace> => {
  const config = getAuthConfig()

  try {
    const res = await axios.post(baseURL, newWorkspace, config)
    return res.data
  } catch (err) {
    throw new Error("Failed to create workspace", { cause: err })
  }
}

const deleteWorkspace = async (workspaceId: string) => {
  const config = getAuthConfig()

  try {
    await axios.delete(`${baseURL}/${workspaceId}`, config)
  } catch (err) {
    throw new Error("Failed to delete workspace", { cause: err })
  }
}

const updateWorkspace = async (workspaceId: string, updatedWorkspace: UpdateWorkspace) => {}

const addUserToWorkspace = async (
  workspaceId: string,
  userId: string,
  role: Role
): Promise<UserWorkspace> => {
  const config = getAuthConfig()

  try {
    const res = await axios.post(`${baseURL}/${workspaceId}/users/${userId}`, { role }, config)
    return res.data
  } catch (err) {
    throw new Error("Failed to add user to workspace", { cause: err })
  }
}

export default { getMyWorkspaces, getWorkspaceById, createWorkspace, deleteWorkspace, addUserToWorkspace }
