import { useState, useEffect } from "react"
import { Kanban } from "../components/kanban"
import { useParams } from "react-router-dom"
import { Ticket } from "@/types/ticket"
import { useGetProjectById } from "@/hooks/projectManagement"
import { useGetTicketsInProject } from "@/hooks/ticketManagement"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreateTicketForm } from "@/components/createTicket"

export type Column = { id: number; title: string; tickets: Ticket[] }

export const ProjectView = () => {
  const { wsId = "", id = "" } = useParams<{ wsId: string; id: string }>()
  const [showCreateTicket, setShowCreateTicket] = useState(false)

  const { data: project, isLoading: projLoading, error: projError } = useGetProjectById(id, wsId)

  const {
    data: tickets,
    isLoading: ticketsLoading,
    error: ticketsError
  } = useGetTicketsInProject(id, wsId)

  // Initialize columns for the Kanban board (based on your tickets' status)
  const [columns, setColumns] = useState<Column[]>([
    { id: 0, title: "To Do", tickets: [] },
    { id: 1, title: "In Progress", tickets: [] },
    { id: 2, title: "Done", tickets: [] }
  ])

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

  if (projError || ticketsError) {
    return <div>Error loading data...</div>
  }

  const handleCreateTicket = () => setShowCreateTicket((prev) => !prev)

  return (
    <div>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          {project && <h1 className="text-2xl font-bold">Project View: {project.name}</h1>}
          <Button onClick={handleCreateTicket}>Create Ticket</Button>
        </div>
        <Dialog open={showCreateTicket} onOpenChange={handleCreateTicket}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Ticket</DialogTitle>
              <DialogDescription>Fill in the details to create a new ticket.</DialogDescription>
            </DialogHeader>
            <CreateTicketForm />
          </DialogContent>
        </Dialog>
      </div>

      {project && <h1>Project View: {project.name}</h1>}
      <Kanban columns={columns} setColumns={setColumns} />
    </div>
  )
}

export default ProjectView
