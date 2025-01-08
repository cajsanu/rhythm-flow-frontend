import axios from "axios"
import { getAuthConfig } from "./utils"
import { Ticket } from "@/types/ticket"
const baseURL = "/api/v1/workspaces/:workspaceId/projects/:projectId/tickets"

const getTicketsInProject = async (projectId: string, workspaceId: string): Promise<Ticket[]> => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<Ticket[]>(
      baseURL.replace(":workspaceId", workspaceId).replace(":projectId", projectId),
      config
    )
    return res.data
  } catch (err) {
    throw new Error("Failed to fetch tickets", { cause: err })
  }
}

export default { getTicketsInProject }
