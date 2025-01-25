import axios from "."
import { getAuthConfig } from "./utils"
import { CreateWorkspace, UpdateWorkspace, UserWorkspace, Workspace } from "../types/workspace"
import { Role } from "../types/role"
import { User } from "@/types/user"
const baseURL = "/api/v1/workspaces"

const getMyWorkspaces = async (userId: string): Promise<Workspace[]> => {
  const config = getAuthConfig()

  const res = await axios.get<Workspace[]>(`${baseURL}/joinedby/${userId}`, config)
  return res.data
}

const getUsersInWorkspace = async (workspaceId: string): Promise<User[]> => {
  const config = getAuthConfig()

  const res = await axios.get<User[]>(`${baseURL}/${workspaceId}/users`, config)
  return res.data
}

const getWorkspaceById = async (workspaceId: string): Promise<Workspace> => {
  const config = getAuthConfig()

  const res = await axios.get<Workspace>(`${baseURL}/${workspaceId}`, config)
  return res.data
}

const createWorkspace = async (newWorkspace: CreateWorkspace): Promise<Workspace> => {
  const config = getAuthConfig()

  const res = await axios.post(baseURL, newWorkspace, config)
  return res.data
}

const deleteWorkspace = async (workspaceId: string) => {
  const config = getAuthConfig()

  await axios.delete(`${baseURL}/${workspaceId}`, config)
}

const updateWorkspace = async (workspaceId: string, updatedWorkspace: UpdateWorkspace) => {}

const addUserToWorkspace = async (
  workspaceId: string,
  userId: string,
  role: Role
): Promise<UserWorkspace> => {
  const config = getAuthConfig()

  const res = await axios.post<UserWorkspace>(
    `${baseURL}/${workspaceId}/users/${userId}`,
    { Role: role },
    config
  )
  return res.data
}

const getUserRoleInWorkspace = async (workspaceId: string, userId: string): Promise<Role> => {
  const config = getAuthConfig()

  const res = await axios.get<Role>(`${baseURL}/${workspaceId}/users/${userId}`, config)
  return res.data
}

export default {
  getMyWorkspaces,
  getUsersInWorkspace,
  getWorkspaceById,
  createWorkspace,
  deleteWorkspace,
  addUserToWorkspace,
  getUserRoleInWorkspace
}
