import { useState } from "react"
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
import { Kanban, Alerts, AddUserToProject, CreateTicketForm, UpdateProject } from "@/components"

export type Column = { id: number; title: string; tickets: Ticket[] }

export const ProjectView = () => {
  const { wsId = "", id = "" } = useParams<{ wsId: string; id: string }>()
  const [showCreateTicket, setShowCreateTicket] = useState(false)
  const [showAddUsers, setShowAddUsers] = useState(false)

  const { data: project, isLoading: projLoading, error: projError } = useGetProjectById(id, wsId)

  const handleCreateTicket = () => setShowCreateTicket((prev) => !prev)
  const handleShowAddUsers = () => setShowAddUsers((prev) => !prev)

  const handleSuccessCreate = () => setShowCreateTicket(false)

  const handleSuccessAdd = () => setShowAddUsers(false)

  if (projLoading) return <div>Loading...</div>
  if (projError) return <div>Error loading data...</div>

  return (
    <div className="flex flex-col items-center gap-8 px-8 bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen text-gray-100">
      <Alerts />
      <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg p-8">
        {project && <UpdateProject project={project} onSuccess={handleSuccessCreate} />}

        <div className="flex gap-4 my-6">
          <Button
            className="bg-gray-200 text-gray-900 font-bold hover:bg-gray-100"
            onClick={handleCreateTicket}
          >
            + Create Ticket
          </Button>
          <Button
            className="bg-gray-200 text-gray-900 font-bold hover:bg-gray-100"
            onClick={handleShowAddUsers}
          >
            + Add Users
          </Button>
        </div>

        {/* Kanban Board */}
        <Kanban workspaceId={wsId} />
      </div>

      {/* Create Ticket Dialog */}
      <Dialog open={showCreateTicket} onOpenChange={handleCreateTicket}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader>
            <Alerts />
            <DialogTitle className="text-2xl font-bold text-gray-900">Create Ticket</DialogTitle>
            <DialogDescription>Fill in the details to create a new ticket.</DialogDescription>
          </DialogHeader>
          <CreateTicketForm onSuccess={handleSuccessCreate} />
        </DialogContent>
      </Dialog>

      {/* Add Users Dialog */}
      <Dialog open={showAddUsers} onOpenChange={handleShowAddUsers}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader>
            <Alerts />
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Add Users to Project
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Assign users to the project to collaborate on tickets.
            </DialogDescription>
          </DialogHeader>
          <AddUserToProject onSuccess={handleSuccessAdd} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProjectView
