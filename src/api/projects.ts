import { CreateProject, Project, UpdateProject } from "@/types/project"
import axios from "."
import { getAuthConfig } from "./utils"
import { User } from "@/types/user"
const baseURL = "/api/v1/workspaces/:workspaceId/projects"

const getProjectsInWorkspace = async (workspaceId: string): Promise<Project[]> => {
  const config = getAuthConfig()

  const res = await axios.get<Project[]>(baseURL.replace(":workspaceId", workspaceId), config)
  return res.data
}

const getUsersInProject = async (projectId: string, workspaceId: string): Promise<User[]> => {
  const config = getAuthConfig()

  const res = await axios.get<User[]>(
    baseURL.replace(":workspaceId", workspaceId) + "/" + projectId + "/users",
    config
  )
  return res.data
}

const getProjectById = async (projectId: string, workspaceId: string): Promise<Project> => {
  const config = getAuthConfig()

  const res = await axios.get<Project>(
    baseURL.replace(":workspaceId", workspaceId) + "/" + projectId,
    config
  )
  return res.data
}

const createProject = async (project: CreateProject): Promise<Project> => {
  const config = getAuthConfig()

  const res = await axios.post<Project>(
    baseURL.replace(":workspaceId", project.workspaceId),
    project,
    config
  )
  return res.data
}

const updateProject = async (project: UpdateProject): Promise<UpdateProject> => {
  const config = getAuthConfig()

  const res = await axios.put<UpdateProject>(
    baseURL.replace(":workspaceId", project.workspaceId) + "/" + project.id,
    project,
    config
  )
  return res.data
}

const deleteProject = async (projectId: string, workspaceId: string): Promise<void> => {
  const config = getAuthConfig()

  await axios.delete(baseURL.replace(":workspaceId", workspaceId) + "/" + projectId, config)
}

const assignUserToProject = async (workspaceId: string, projectId: string, userId: string) => {
  const config = getAuthConfig()

  await axios.post(
    baseURL.replace(":workspaceId", workspaceId) + "/" + projectId + "/users/" + userId,
    {},
    config
  )
}

const unassignUserFromProject = async (workspaceId: string, projectId: string, userId: string) => {
  const config = getAuthConfig()

  await axios.delete(
    baseURL.replace(":workspaceId", workspaceId) + "/" + projectId + "/users/" + userId,
    config
  )
}

export default {
  getProjectsInWorkspace,
  getUsersInProject,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
  assignUserToProject,
  unassignUserFromProject
}
