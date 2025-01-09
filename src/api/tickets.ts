import axios from "axios"
import { getAuthConfig } from "./utils"
import { CreateTicket, Ticket, UpdateTicket } from "@/types/ticket"
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

const createTicket = async (workspaceId: string, newTicket: CreateTicket): Promise<Ticket> => {
  const config = getAuthConfig()

  try {
    const res = await axios.post<Ticket>(
      baseURL.replace(":workspaceId", workspaceId).replace(":projectId", newTicket.projectId),
      newTicket,
      config
    )
    return res.data
  } catch (err) {
    throw new Error("Failed to create ticket", { cause: err })
  }
}

const updateTicket = async (workspaceId: string, updatedTicket: UpdateTicket): Promise<Ticket> => {
  const config = getAuthConfig()

  try {
    const res = await axios.put<Ticket>(
      baseURL.replace(":workspaceId", workspaceId).replace(":projectId", updatedTicket.projectId) + "/" + updatedTicket.id,
      updatedTicket,
      config
    )
    return res.data
  } catch (err) {
    throw new Error("Failed to update ticket", { cause: err })
  }
}

const getTicketById = async (id: string, workspaceId: string): Promise<Ticket> => {
  const config = getAuthConfig()

  try {
    const res = await axios.get<Ticket>(
      baseURL.replace(":workspaceId", workspaceId).replace(":projectId", id) + "/" + id,
      config
    )
    return res.data
  } catch (err) {
    throw new Error("Failed to fetch ticket", { cause: err })
  }
}

export default { getTicketsInProject, createTicket, updateTicket, getTicketById }
