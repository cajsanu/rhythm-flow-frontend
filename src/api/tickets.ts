import { Ticket } from "@/types/ticket"
import axios from "axios"
import { getAuthConfig } from "./utils"
const baseURL = "/api/v1/workspaces/:workspaceId/projects/:projectId/tickets"

const getTicketsInProject = async ( projectId: string, workspaceId: string ) => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<Ticket[]>(baseURL.replace(":workspaceId", workspaceId).replace(":projectId", projectId), config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default { getTicketsInProject }