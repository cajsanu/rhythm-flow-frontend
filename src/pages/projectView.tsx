import { useState, useEffect } from "react"
import { Kanban } from "../components/kanban"
import { useParams } from "react-router-dom"
import { Ticket } from "@/types/ticket"
import { useGetProjectById } from "@/hooks/projectManagement"
import { useGetTicketsInProject } from "@/hooks/ticketManagement"
import { Button } from "@/components/ui/button"
import { Box, Modal } from "@mui/material"
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
      <div>
        <div>
          <div>
            <Button onClick={handleCreateTicket}>Create Ticket</Button>
          </div>
          <Modal
            open={showCreateTicket}
            onClose={handleCreateTicket}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>
              <CreateTicketForm />
            </Box>
          </Modal>
        </div>
      </div>
      {project && <h1>Project View: {project.name}</h1>}
      <Kanban columns={columns} setColumns={setColumns} />
    </div>
  )
}

export default ProjectView
