import { CreateProject, Project } from "@/types/project"
import axios from "axios"
import { getAuthConfig } from "./utils"
const baseURL = "/api/v1/workspaces/:workspaceId/projects"

const getProjectsInWorkspace = async (workspaceId: string): Promise<Project[]> => {
  try {
    const res = await axios.get<Project[]>(baseURL.replace(":workspaceId", workspaceId))
    return res.data
  } catch (err) {
    throw new Error("Failed to fetch projects", { cause: err })
  }
}

const getProjectById = async (projectId: string, workspaceId: string): Promise<Project> => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<Project>(
      baseURL.replace(":workspaceId", workspaceId) + "/" + projectId,
      config
    )
    return res.data
  } catch (err) {
    throw new Error("Failed to fetch project", { cause: err })
  }
}

const createProject = async (project: CreateProject): Promise<Project> => {
  const config = getAuthConfig()

  try {
    const res = await axios.post<Project>(
      baseURL.replace(":workspaceId", project.workspaceId),
      project,
      config
    )
    return res.data
  } catch (err) {
    throw new Error("Failed to create project", { cause: err })
  }
}

export default { getProjectsInWorkspace, getProjectById, createProject }
