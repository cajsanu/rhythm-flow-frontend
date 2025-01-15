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
import { AddUserToProject } from "@/components/addUserToProject"
import { Alerts } from "@/components/alert"

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
    <div className="flex flex-col items-center gap-8 px-8 bg-gradient-to-br from-gray-800 to-gray-800 min-h-screen">
      <div className="w-full">
        <div className="flex justify-between"></div>

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

        <div className="flex gap-4 mt-6">
          <Button className="bg-gray-100 text-gray-900 font-bold" onClick={handleCreateTicket}>+ Create Ticket</Button>
          <Button onClick={handleShowAddUsers}>+ Add Users</Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg p-10">
        <div className="pb-8 flex items-center justify-between">
          {project && (
            <h1 className="text-4xl font-bold text-gray-100 tracking-tight">{project.name}</h1>
          )}
        </div>
        <Kanban workspaceId={wsId} />
      </div>
    </div>
  )
}

export default ProjectView
