import { useState, useEffect } from "react"
import { Kanban } from "../components/kanban"
import { useParams } from "react-router-dom"
import projectRequests from "@/api/projects"
import ticketRequests from "@/api/tickets"
import { useQuery } from "@tanstack/react-query"
import { Project } from "@/types/project"


// Define the type for columns
export type Ticket = { id: string; title: string; status: string }
export type Column = { id: string; title: string; tickets: Ticket[] }

export const ProjectView = () => {
  const { projId } = useParams<{ projId: string }>()

  const { data: project, isLoading: projLoading } = useQuery<Project>({
    queryKey: ["project"],
    queryFn: async () => {
      if (!projId) {
        throw new Error("Project ID is undefined")
      }
      const project = await projectRequests.getProjectById(projId)
      if (!project) {
        throw new Error("Failed to fetch project")
      }

      return project
    }
  })

  const { data: tickets, isLoading: ticketsLoading } = useQuery<Ticket[]>({
    queryKey: ["tickets"],
    queryFn: async () => {
      if (!projId) {
        throw new Error("Project ID is undefined")
      }
      const tickets = await ticketRequests.getTicketsInProject(projId)
      if (!tickets) {
        throw new Error("Failed to fetch tickets")
      }

      return tickets
    }
  })

  // Initialize columns for the Kanban board (based on your tickets' status)
  const [columns, setColumns] = useState<Column[]>([
    { id: "todo", title: "To Do", tickets: [] },
    { id: "in-progress", title: "In Progress", tickets: [] },
    { id: "done", title: "Done", tickets: [] }
  ])

  console.log("Project", project)
  console.log("Tickets:", tickets)

  // Populate columns with tickets based on their status
  useEffect(() => {
    const updatedColumns = columns.map((column) => ({
      ...column,
      tickets: tickets ? tickets.filter((ticket) => ticket.status === column.id) : []
    }))
    setColumns(updatedColumns)
  }, [project, tickets])


  if (projLoading || ticketsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {project && <h1>Project View: {project.name}</h1>}
      <Kanban columns={columns} setColumns={setColumns} />
    </div>
  )
}

export default ProjectView
