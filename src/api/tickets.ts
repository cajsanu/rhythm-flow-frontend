import axios from "."
import { getAuthConfig } from "./utils"
import { CreateTicket, Ticket, UpdateTicket } from "@/types/ticket"
const baseURL = "/api/v1/workspaces/:workspaceId/projects/:projectId/tickets"

const getTicketsInProject = async (projectId: string, workspaceId: string): Promise<Ticket[]> => {
  const config = getAuthConfig()

  const res = await axios.get<Ticket[]>(
    baseURL.replace(":workspaceId", workspaceId).replace(":projectId", projectId),
    config
  )
  return res.data
}

const createTicket = async (workspaceId: string, newTicket: CreateTicket): Promise<Ticket> => {
  const config = getAuthConfig()

  const res = await axios.post<Ticket>(
    baseURL.replace(":workspaceId", workspaceId).replace(":projectId", newTicket.projectId),
    newTicket,
    config
  )
  return res.data
}

const updateTicket = async (workspaceId: string, updatedTicket: UpdateTicket): Promise<Ticket> => {
  const config = getAuthConfig()

  const res = await axios.put<Ticket>(
    baseURL.replace(":workspaceId", workspaceId).replace(":projectId", updatedTicket.projectId) +
      "/" +
      updatedTicket.id,
    updatedTicket,
    config
  )
  return res.data
}

const getTicketById = async (id: string, workspaceId: string): Promise<Ticket> => {
  const config = getAuthConfig()

  const res = await axios.get<Ticket>(
    baseURL.replace(":workspaceId", workspaceId).replace(":projectId", id) + "/" + id,
    config
  )
  return res.data
}

const assignUserToTicket = async (
  workspaceId: string,
  projectId: string,
  ticketId: string,
  userId: string
): Promise<Ticket> => {
  const config = getAuthConfig()

  const res = await axios.post<Ticket>(
    `${baseURL
      .replace(":workspaceId", workspaceId)
      .replace(":projectId", projectId)}/${ticketId}/users/${userId}`,
    {},
    config
  )
  return res.data
}

export default {
  getTicketsInProject,
  createTicket,
  updateTicket,
  getTicketById,
  assignUserToTicket
}
