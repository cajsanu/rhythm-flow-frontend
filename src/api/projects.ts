import { Project } from "@/types/project"
import axios from "axios"
import { getAuthConfig } from "./utils"
const baseURL = "/api/v1/workspaces/:workspaceId/projects"

const getProjectsInWorkspace = async ( workspaceId: string ) => {
  try {
    const res = await axios.get<Project[]>(baseURL.replace(":workspaceId", workspaceId))
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const getProjectById = async ( projectId: string, workspaceId: string ) => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<Project>(baseURL.replace(":workspaceId", workspaceId) + "/" + projectId, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default { getProjectsInWorkspace, getProjectById }
