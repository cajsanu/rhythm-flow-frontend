import { useState } from "react"
import { Kanban } from "../components/kanban"
import { useParams } from "react-router-dom"
import { Ticket } from "@/types/ticket"
import { useGetProjectById } from "@/hooks/projectManagement"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { CreateTicketForm } from "@/components/createTicket"

export type Column = { id: number; title: string; tickets: Ticket[] }

export const ProjectView = () => {
  const { wsId = "", id = "" } = useParams<{ wsId: string; id: string }>()
  const [showCreateTicket, setShowCreateTicket] = useState(false)

  const { data: project, isLoading: projLoading, error: projError } = useGetProjectById(id, wsId)

  if (projLoading) {
    return <div>Loading...</div>
  }

  if (projError) {
    return <div>Error loading data...</div>
  }

  const handleCreateTicket = () => setShowCreateTicket((prev) => !prev)

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-sky-100 h-screen">
      <div className="w-full">
        <div className="flex justify-between">
          <div className="p-5 bg-sky-900 rounded-lg w-full text-white">
            {project && <h1 className="text-2xl font-bold">Project: {project.name}</h1>}
          </div>
        </div>
        <Dialog open={showCreateTicket} onOpenChange={handleCreateTicket}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-3xl">Create Ticket</DialogTitle>
              <DialogDescription>Fill in the details to create a new ticket.</DialogDescription>
            </DialogHeader>
            <CreateTicketForm />
          </DialogContent>
        </Dialog>
        <Button className="mt-5" onClick={handleCreateTicket}>Create Ticket</Button>
      </div>
      <Kanban workspaceId={wsId} />
    </div>
  )
}

export default ProjectView
