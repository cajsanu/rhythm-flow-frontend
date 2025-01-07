import { Ticket } from "@/types/ticket"
import axios from "axios"
const baseURL = "/api/v1/projects/:projectId/tickets"

const getTicketsInProject = async ( projectId: string ) => {
  try {
    const res = await axios.get<Ticket[]>(baseURL.replace(":projectId", projectId))
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default { getTicketsInProject }